import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../..', import.meta.url));
const read = (p: string) => readFile(`${root}/${p}`, 'utf8');

describe('two-theme token system', () => {
  it('defines dark defaults and a light override with the approved hexes', async () => {
    const css = await read('src/styles/global.css');
    expect(css).toMatch(/:root\s*\{[^}]*--bg:\s*#0C0E12/i);
    expect(css).toMatch(/--accent:\s*#D6A350/i);
    expect(css).toMatch(/:root\[data-theme="light"\]\s*\{[^}]*--bg:\s*#F6F1E7/i);
    expect(css).toMatch(/:root\[data-theme="light"\][^{]*\{[^}]*--accent:\s*#9A6414/i);
  });

  it('drops every legacy token name', async () => {
    const css = await read('src/styles/global.css');
    for (const legacy of ['--paper-cool', '--carbon', '--signal-blue', '--circuit-violet', '--signal-coral', '--graphite']) {
      expect(css, `legacy token ${legacy} still present`).not.toContain(legacy);
    }
  });

  it('forces ink-on-white tokens inside the print block', async () => {
    const css = await read('src/styles/global.css');
    const printBlock = css.slice(css.indexOf('@media print'));
    expect(printBlock).toMatch(/--bg:\s*#fff/i);
    expect(printBlock).toMatch(/--text:\s*#000/i);
  });
});

describe('no-FOUC boot', () => {
  it('sets data-theme from localStorage/OS before paint, dark fallback', async () => {
    const layout = await read('src/layouts/BaseLayout.astro');
    expect(layout).toContain('is:inline');
    expect(layout).toContain("localStorage.getItem('theme')");
    expect(layout).toContain('prefers-color-scheme: light');
    expect(layout).toContain('document.documentElement.dataset.theme');
  });

  it('emits per-scheme theme-color metas with the approved canvases', async () => {
    const layout = await read('src/layouts/BaseLayout.astro');
    expect(layout).toMatch(/theme-color"[^>]*prefers-color-scheme: dark[^>]*#0C0E12/i);
    expect(layout).toMatch(/theme-color"[^>]*prefers-color-scheme: light[^>]*#F6F1E7/i);
  });
});
