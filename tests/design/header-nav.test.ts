import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../..', import.meta.url));
const read = (p: string) => readFile(`${root}/${p}`, 'utf8');

describe('persistent nav', () => {
  it('links only to Projects and Résumé, path-styled, not Work or About', async () => {
    const header = await read('src/components/Header.astro');
    expect(header).toContain("key: 'projects'");
    expect(header).toContain("key: 'resume'");
    expect(header).not.toContain("key: 'work'");
    expect(header).not.toContain("key: 'about'");
    expect(header).toContain('~/projects');
    expect(header).toContain('~/resume');
  });

  it('does not uppercase nav labels, so the path-prefix style renders lowercase', async () => {
    const css = await read('src/styles/global.css');
    const navLinkRule = css.match(/\.site-header__nav-link\s*\{[^}]*\}/);
    expect(navLinkRule).not.toBeNull();
    expect(navLinkRule?.[0]).not.toMatch(/text-transform:\s*uppercase/);
  });

  it('renders the mobile nav closed without hiding desktop or no-script navigation', async () => {
    const [header, css] = await Promise.all([
      read('src/components/Header.astro'),
      read('src/styles/global.css'),
    ]);
    const navStartTag = header.match(/<nav\b[^>]*id="site-navigation"[^>]*>/)?.[0];
    const noscript = header.match(/<noscript>[\s\S]*?<\/noscript>/)?.[0];
    const desktopMedia = css.slice(
      css.indexOf('@media (min-width: 48rem)'),
      css.indexOf('@media (min-width: 56rem)'),
    );

    expect(navStartTag).toMatch(/\bhidden\b/);
    expect(noscript).toMatch(/\.site-header__nav\[hidden\]\s*\{[^}]*display:\s*block\s*!important;/);
    expect(desktopMedia).toMatch(
      /\.site-header__nav,\s*\.site-header__nav\[hidden\]\s*\{[^}]*display:\s*block\s*!important;/,
    );
    expect(header).toContain("const desktop = window.matchMedia('(min-width: 48rem)');");
    expect(header).toContain('const expanded = desktop.matches;');
    expect(header).toContain("desktop.addEventListener('change', syncMenu);");
    expect(header).not.toContain('47.99rem');
    expect(header).toContain('navigation.hidden = !expanded;');
    expect(header).toContain('navigation.hidden = expanded;');
  });
});
