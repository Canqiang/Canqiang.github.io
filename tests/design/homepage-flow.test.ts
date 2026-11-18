import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../..', import.meta.url));
const read = (p: string) => readFile(`${root}/${p}`, 'utf8');

describe('NES homepage', () => {
  it('shows localized identity and pixel artwork on the first render', async () => {
    const hero = await read('src/components/Hero.astro');
    expect(hero).toContain('identity.headline[locale]');
    expect(hero).toContain('nes-workstation.png');
    expect(hero).not.toContain('data-hero-terminal');
  });

  it('links from the title screen to portfolio content in the selected language', async () => {
    const hero = await read('src/components/Hero.astro');
    for (const route of ["'projects'", "'competitions'", "'resume'", "'resume-algorithms'"]) {
      expect(hero).toContain(route);
    }
    expect(hero).toMatch(/<a\s[^>]*href=/);
  });
});

describe('career axis', () => {
  it('renders the axis from careerAxis and links onward to Résumé', async () => {
    const axis = await read('src/components/CareerAxis.astro');
    expect(axis).toContain("from '../data/site'");
    expect(axis).toContain('careerAxis');
    expect(axis).toContain('career-axis__stop');
    expect(axis).toContain("localizedPath(locale, 'resume')");
    expect(axis).not.toContain("localizedPath(locale, 'work')");

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
    expect(ai).toMatch(/case 'openSource': return localizedPath\(locale, 'project', 'core-ai'\)/);
    expect(ai).toMatch(/case 'competitions': return localizedPath\(locale, 'project', 'competitions'\)/);
    expect(ai).toMatch(/case 'patents': return localizedPath\(locale, 'project', 'research'\)/);
    expect(ai).toContain('#resume-publications-title');
  });
});

describe('homepage sections', () => {
  it('wires the new sections and drops the retired ones', async () => {
    const home = await read('src/components/pages/HomePage.astro');
    for (const used of ['Hero', 'FieldCards', 'CareerAxis', 'AchievementIndex', 'ContactLinks']) {
      expect(home, `missing ${used}`).toContain(used);
    }
    for (const gone of ['FieldIndexRail', 'ExperienceTimeline', 'ProjectGrid']) {
      expect(home, `should not import ${gone}`).not.toContain(gone);
    }
    expect(home).toContain('id="current-practice"');
    expect(home).toContain('aria-labelledby="record-title"');
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
    const lib = await read('src/lib/contributions.ts');
    expect(lib).toContain('github-contributions-api.jogruber.de');
    expect(component).toContain('fetchFailed');
    expect(component).toContain('hasServerData');
    expect(component).toMatch(/hidden=\{!hasServerData\}/);
    expect(component).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    expect(component).toContain('var(--accent)');
  });

  // The site rebuilds once a day, so a build-time-only grid is always at least a
  // day stale and its newest cell is a partial mid-build count. The client must
  // refetch so the heatmap shows today.
  it('refetches on the client and reuses the same layout helpers as the server render', async () => {
    const component = await read('src/components/GithubActivity.astro');
    expect(component).toContain("import { readSnapshot, toMonthLabels, toWeeks } from '../lib/contributions'");
    expect(component).toContain('data-github-activity');
    expect(component).toContain('data-endpoint');
    expect(component).toMatch(/fetch\(endpoint/);
    expect(component).toContain('root.hidden = false');
    // A failed client fetch must leave the server-rendered grid in place.
    expect(component).toMatch(/\.catch\(\(\) => \{/);
  });

  // Astro scopes this component's styles behind a [data-astro-cid-*] attribute.
  // Client-built cells that lack it match no CSS and collapse to zero height —
  // the grid keeps its DOM nodes and titles but renders invisible.
  it('stamps the Astro scope attribute onto every client-built node', async () => {
    const component = await read('src/components/GithubActivity.astro');
    expect(component).toContain("startsWith('data-astro-cid-')");
    expect(component).toMatch(/node\.setAttribute\(scopeAttr, ''\)/);
    // Exactly one createElement, inside scoped() — any other call would build an
    // unstyled node. Everything in the render path goes through the helper.
    const clientScript = component.slice(component.indexOf('<script>'));
    expect(clientScript.match(/document\.createElement\(/g)).toHaveLength(1);
    expect(clientScript).toContain("scoped('div', 'github-activity__week')");
    expect(clientScript).toContain("scoped('div', 'github-activity__cell')");
    expect(clientScript).toContain("scoped('span')");
  });
});
