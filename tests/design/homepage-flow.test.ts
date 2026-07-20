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
    expect(ai).toContain("localizedPath(locale, 'project', 'core-ai')");
    expect(ai).toContain("localizedPath(locale, 'project', 'competitions')");
  });
});
