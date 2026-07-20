import { readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const distRoot = resolve(root, 'dist');
const siteOrigin = 'https://canqiang.github.io';

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([:\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => attributes(match[0]));
}

function routeFor(path) {
  const outputPath = relative(distRoot, path).split(sep).join('/');
  if (outputPath === '404.html') return '/404.html';
  if (outputPath === 'index.html') return '/';
  return `/${outputPath.replace(/index\.html$/, '')}`;
}

function expectedAlternates(route) {
  const english = route.startsWith('/zh/') ? route.slice(3) || '/' : route;
  const chinese = route.startsWith('/zh/') ? route : `/zh${route}`;
  return {
    en: `${siteOrigin}${english}`,
    'zh-CN': `${siteOrigin}${chinese}`,
    'x-default': `${siteOrigin}${english}`,
  };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function metaContent(html, key, value) {
  return tags(html, 'meta').find((tag) => tag[key] === value)?.content;
}

function jsonLdBlocks(html, route) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      throw new Error(`${route}: invalid JSON-LD (${error.message})`);
    }
  });
}

const htmlFiles = await walk(distRoot);
assert(htmlFiles.length === 21, `expected 21 built HTML files, found ${htmlFiles.length}`);

for (const path of htmlFiles) {
  const html = await readFile(path, 'utf8');
  const route = routeFor(path);
  const links = tags(html, 'link');
  const canonicals = links.filter((link) => link.rel === 'canonical');
  const alternates = links.filter((link) => link.rel === 'alternate');
  const jsonLd = jsonLdBlocks(html, route);
  const expectedCanonical = `${siteOrigin}${route}`;

  assert(canonicals.length === 1, `${route}: expected exactly one canonical link`);
  assert(canonicals[0].href === expectedCanonical, `${route}: unexpected canonical ${canonicals[0].href}`);
  assert(canonicals[0].href.startsWith(`${siteOrigin}/`), `${route}: canonical must be absolute`);

  if (route === '/404.html') {
    assert(alternates.length === 0, `${route}: must not emit hreflang alternates`);
  } else {
    const expected = expectedAlternates(route);
    assert(alternates.length === 3, `${route}: expected exactly three hreflang alternates`);
    for (const [language, href] of Object.entries(expected)) {
      const matches = alternates.filter((alternate) => alternate.hreflang === language);
      assert(matches.length === 1, `${route}: expected exactly one ${language} alternate`);
      assert(matches[0].href === href, `${route}: unexpected ${language} alternate ${matches[0].href}`);
    }
  }

  if (route === '/' || route === '/zh/') {
    assert(metaContent(html, 'property', 'og:type') === 'profile', `${route}: home must use og:type profile`);
    assert(metaContent(html, 'property', 'og:image') === `${siteOrigin}/og/home.png`, `${route}: home image mismatch`);
    assert(jsonLd.length === 1 && jsonLd[0]['@type'] === 'Person', `${route}: home must emit one Person JSON-LD block`);
    const expectedLang = route === '/' ? 'en' : 'zh-CN';
    assert(attributes(html.match(/<html\b[^>]*>/i)?.[0] ?? '').lang === expectedLang, `${route}: html language mismatch`);
  }

  if (route === '/projects/core-ai/' || route === '/zh/projects/core-ai/') {
    assert(metaContent(html, 'property', 'og:type') === 'article', `${route}: project must use og:type article`);
    assert(metaContent(html, 'property', 'og:image') === `${siteOrigin}/og/core-ai.png`, `${route}: Core-AI image mismatch`);
    assert(jsonLd.length === 1 && jsonLd[0]['@type'] === 'Article', `${route}: Core-AI must emit one Article JSON-LD block`);
    assert(jsonLd[0].inLanguage === (route.startsWith('/zh/') ? 'zh-CN' : 'en'), `${route}: Article language mismatch`);
  }

  if (route === '/about/' || route === '/zh/about/') {
    assert(metaContent(html, 'property', 'og:type') === 'website', `${route}: about must use og:type website`);
    assert(metaContent(html, 'property', 'og:image') === undefined, `${route}: about must not emit an image`);
    assert(jsonLd.length === 0, `${route}: about must not emit JSON-LD`);
  }

  if (route === '/404.html') {
    assert(metaContent(html, 'name', 'robots') === 'noindex,follow', `${route}: must be noindex,follow`);
    assert((html.match(/<h1\b/gi) ?? []).length === 1, `${route}: expected exactly one h1`);
    assert(metaContent(html, 'property', 'og:image') === undefined, `${route}: must not emit an image`);
    assert(jsonLd.length === 0, `${route}: must not emit JSON-LD`);
  }
}

console.log(`Build-output validation passed (${htmlFiles.length} HTML files).`);
