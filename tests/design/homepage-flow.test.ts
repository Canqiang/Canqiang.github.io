import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../..', import.meta.url));
const read = (p: string) => readFile(`${root}/${p}`, 'utf8');

describe('LOG 00 hero', () => {
  it('is text-only and carries the log stamp', async () => {
    const hero = await read('src/components/Hero.astro');
    expect(hero).not.toContain('astro:assets');
    expect(hero).not.toContain('speakingPhoto');
    expect(hero).toContain('LOG 00');
    expect(hero).toContain('portfolio-hero__stamp');
  });
});

describe('career axis', () => {
  it('renders the axis from careerAxis and links to full work', async () => {
    const axis = await read('src/components/CareerAxis.astro');
    expect(axis).toContain("from '../data/site'");
    expect(axis).toContain('careerAxis');
    expect(axis).toContain('career-axis__stop');
  });
});

describe('evidence cells', () => {
  it('shows condensed counts, each linking to the destination that actually covers it', async () => {
    const ai = await read('src/components/AchievementIndex.astro');
    expect(ai).toContain('achievement-cell__count');
    expect(ai).toContain("localizedPath(locale, 'about')");
    // Pin the exact key-to-destination pairing, not just that both strings
    // exist somewhere — a swapped ternary (openSource <-> competitions)
    // would still contain both strings but route to the wrong page.
    expect(ai).toMatch(/group\.key === 'openSource'\s*\?\s*localizedPath\(locale, 'project', 'core-ai'\)/);
    expect(ai).toMatch(/group\.key === 'competitions'\s*\?\s*localizedPath\(locale, 'project', 'competitions'\)/);
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
