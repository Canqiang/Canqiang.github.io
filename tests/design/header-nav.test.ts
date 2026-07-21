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
});
