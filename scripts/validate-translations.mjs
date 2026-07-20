import { readFile, readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

function parseFrontmatter(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)^---(?:\r?\n|$)/m);
  if (!match) throw new Error(`${file}: missing YAML frontmatter`);

  const data = parse(match[1]);
  return data && typeof data === 'object' ? data : {};
}

function periodFacts(value) {
  if (typeof value !== 'string') return null;
  return {
    years: value.match(/(?:19|20)\d{2}/g) ?? [],
    ongoing: /\b(?:present|current)\b/i.test(value) || /至今|现在/.test(value),
  };
}

function linkTargets(value) {
  if (!Array.isArray(value)) return [];
  return value.map((link) => link?.href ?? null);
}

const sharedFields = [
  ['translationKey', (data) => data.translationKey ?? null],
  ['category', (data) => data.category ?? null],
  ['period facts', (data) => periodFacts(data.period)],
  ['link targets', (data) => linkTargets(data.links)],
  ['featured', (data) => data.featured ?? false],
  ['order', (data) => data.order ?? 99],
  ['ogImage', (data) => data.ogImage ?? null],
  ['draft', (data) => data.draft ?? false],
];

function sameValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

export async function validateDirectory(directory) {
  const root = directory instanceof URL ? fileURLToPath(directory) : directory;
  const files = (await readdir(root, { recursive: true })).filter((name) => /\.(en|zh)\.md$/.test(name));
  const groups = new Map();

  for (const file of files) {
    const match = file.match(/^(.*)\.(en|zh)\.md$/);
    if (!match) continue;
    const [, key, locale] = match;
    if (!groups.has(key)) groups.set(key, new Map());
    groups.get(key).set(locale, file);
  }

  const errors = [];
  for (const [key, localeFiles] of [...groups.entries()].sort(([left], [right]) => left.localeCompare(right))) {
    for (const locale of ['en', 'zh']) {
      if (!localeFiles.has(locale)) errors.push(`${key}: missing ${locale}`);
    }

    if (!localeFiles.has('en') || !localeFiles.has('zh')) continue;

    const [english, chinese] = await Promise.all(
      ['en', 'zh'].map(async (locale) => {
        const file = localeFiles.get(locale);
        return parseFrontmatter(await readFile(join(root, file), 'utf8'), file);
      }),
    );

    if (english.locale != null && english.locale !== 'en') errors.push(`${key}: English file locale must be en`);
    if (chinese.locale != null && chinese.locale !== 'zh') errors.push(`${key}: Chinese file locale must be zh`);

    const expectedTranslationKey = basename(key);
    for (const [locale, data] of [['en', english], ['zh', chinese]]) {
      if (data.translationKey != null && data.translationKey !== expectedTranslationKey) {
        errors.push(`${key}: ${locale} translationKey must be ${expectedTranslationKey}`);
      }
    }

    for (const [label, select] of sharedFields) {
      if (!sameValue(select(english), select(chinese))) {
        errors.push(`${key}: shared ${label} differs between en and zh`);
      }
    }
  }

  if (errors.length) throw new Error(errors.join('\n'));
  return [...groups.keys()].sort();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const keys = await validateDirectory(new URL('../src/content/projects', import.meta.url));
  console.log(`Validated ${keys.length} bilingual project pairs.`);
}
