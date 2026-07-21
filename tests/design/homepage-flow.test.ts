import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../..', import.meta.url));
const read = (p: string) => readFile(`${root}/${p}`, 'utf8');

describe('terminal hero', () => {
  it('is text-only, carries the terminal shell markers, and has real CTAs with or without JS', async () => {
    const hero = await read('src/components/Hero.astro');
    expect(hero).not.toContain('astro:assets');
    expect(hero).not.toContain('speakingPhoto');
    expect(hero).not.toContain('LOG 00');
    expect(hero).toContain('portfolio-hero__stamp');
    expect(hero).toContain('data-hero-terminal');
    expect(hero).toContain('data-hero-line');
    expect(hero).toContain('data-hero-typed');
    // The two CTAs must be real anchors in the server-rendered markup —
    // not something only the typing script injects.
    expect(hero).toMatch(/<a[^>]+href="#current-practice"/);
    expect(hero).toMatch(/<a[^>]+href=\{localizedPath\(locale, 'resume'\)\}/);
  });

  it('skips the typing animation under reduced motion and after it has already played once', async () => {
    const hero = await read('src/components/Hero.astro');
    expect(hero).toContain('prefers-reduced-motion');
    expect(hero).toContain('sessionStorage');
  });
});

describe('career axis', () => {
  it('renders the axis from careerAxis and links onward to Résumé', async () => {
    const axis = await read('src/components/CareerAxis.astro');
    expect(axis).toContain("from '../data/site'");
    expect(axis).toContain('careerAxis');
    expect(axis).toContain('career-axis__stop');

    const home = await read('src/components/pages/HomePage.astro');
    expect(home).toContain("localizedPath(locale, 'resume')");
    expect(home).not.toContain("localizedPath(locale, 'work')");
  });
});

describe('evidence cells', () => {
  it('shows condensed counts, each linking to the destination that actually covers it', async () => {
    const ai = await read('src/components/AchievementIndex.astro');
    expect(ai).toContain('achievement-cell__count');
    expect(ai).toContain("localizedPath(locale, 'resume')");
    expect(ai).not.toContain("localizedPath(locale, 'about')");
    // Pin the exact key-to-destination pairing, not just that both strings
    // exist somewhere — a swapped ternary (openSource <-> competitions)
    // would still contain both strings but route to the wrong page.
    expect(ai).toMatch(/group\.key === 'openSource'\s*\?\s*localizedPath\(locale, 'project', 'core-ai'\)/);
    expect(ai).toMatch(/group\.key === 'competitions'\s*\?\s*localizedPath\(locale, 'project', 'competitions'\)/);
    expect(ai).toMatch(/resume-\$\{group\.key\}-title/);
  });
});

describe('homepage numbered flow', () => {
  it('wires the new sections and drops the retired ones', async () => {
    const home = await read('src/components/pages/HomePage.astro');
    for (const used of ['Hero', 'FieldCards', 'CareerAxis', 'AchievementIndex', 'ContactLinks']) {
      expect(home, `missing ${used}`).toContain(used);
    }
    for (const gone of ['FieldIndexRail', 'ExperienceTimeline', 'ProjectGrid']) {
      expect(home, `should not import ${gone}`).not.toContain(gone);
    }
    expect(home).toContain('id="current-practice"');
    expect(home).toContain('portfolio-section__index');
  });

  it('renders GitHub activity inside the evidence index, wired for both locales', async () => {
    const home = await read('src/components/pages/HomePage.astro');
    expect(home).toContain("import GithubActivity from '../GithubActivity.astro'");
    expect(home).toContain('<GithubActivity {locale} />');
  });

  it('routes Current Practice cards to Résumé, not Work', async () => {
    const fieldCards = await read('src/components/FieldCards.astro');
    expect(fieldCards).toContain("localizedPath(locale, 'resume')");
    expect(fieldCards).not.toContain("localizedPath(locale, 'work')");
  });
});

describe('GithubActivity', () => {
  it('fetches at build time, fails silently, and never hardcodes a second accent color', async () => {
    const component = await read('src/components/GithubActivity.astro');
    expect(component).toContain('github-contributions-api.jogruber.de');
    expect(component).toContain('fetchFailed');
    expect(component).toMatch(/\{!fetchFailed && contributions\.length > 0/);
    expect(component).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    expect(component).toContain('var(--accent)');
  });
});
