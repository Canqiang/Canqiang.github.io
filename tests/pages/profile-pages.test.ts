import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { experience } from '../../src/data/experience';

const repositoryRoot = fileURLToPath(new URL('../..', import.meta.url));
const source = (relativePath: string) => readFile(`${repositoryRoot}/${relativePath}`, 'utf8');

describe('profile page shared data', () => {
  it('stores approved education and interests in one typed shared module', async () => {
    const { education, interests } = await import('../../src/data/profile');

    expect(education).toEqual({
      institution: { en: 'Fujian Medical University', zh: '福建医科大学' },
      degree: { en: 'BSc in Bioinformatics', zh: '生物信息学学士' },
      period: '2013 — 2017',
    });
    expect(interests.map((interest) => interest.en)).toEqual([
      'Ball sports',
      'Board and chess games',
      'Computer games',
    ]);
    expect(interests.map((interest) => interest.zh)).toEqual(['球类运动', '棋牌类游戏', '电脑游戏']);

    const resumePage = await source('src/components/pages/ResumePage.astro');
    expect(resumePage).toContain("from '../../data/profile'");
    expect(resumePage).not.toContain('Fujian Medical University');
    expect(resumePage).not.toContain('Ball sports');
  });
});

describe('explicit experience fields', () => {
  it('assigns the reviewed field sequence while keeping source chronology', () => {
    expect(experience.map((entry) => entry.field)).toEqual([
      'bioinformatics',
      'medical-ai',
      'medical-ai',
      'medical-ai',
      'llm-products',
      'llm-products',
      'agent-systems',
    ]);
    expect(experience.map((entry) => entry.period.en)).toEqual([
      'Jul 2017 — Oct 2018',
      'Oct 2018 — Apr 2021',
      'Apr 2021 — Apr 2022',
      'Apr 2022 — Mar 2023',
      'Mar 2023 — Jun 2024',
      'Sep 2024 — Jul 2025',
      'Jul 15, 2025 — Present',
    ]);
  });
});

describe('print and profile semantics', () => {
  it('hides the complete screen shell and prints on white without hiding content headings', async () => {
    const css = await source('src/styles/global.css');

    expect(css).toMatch(
      /\.site-header,\s*\.site-footer,\s*\.skip-link,\s*\.no-print\s*\{\s*display:\s*none\s*!important;/,
    );
    expect(css).toMatch(/@page\s*\{[^}]*size:\s*A4;/);
    expect(css).toMatch(/@media print[\s\S]*html,\s*body\s*\{[^}]*background:\s*white;/);
    expect(css).not.toMatch(/@media print[\s\S]*\bheader,\s*footer,\s*\.no-print/);
  });

  it('renders print-only contact destinations with wrapping-safe styling', async () => {
    const [resumePage, css] = await Promise.all([
      source('src/components/pages/ResumePage.astro'),
      source('src/styles/global.css'),
    ]);

    expect(resumePage).toContain('printDestination');
    expect(resumePage).toContain('resume-link__destination print-only');
    expect(resumePage).toContain("href.startsWith('mailto:')");
    expect(css).toMatch(/\.print-only\s*\{[^}]*display:\s*none;/);
    expect(css).toMatch(/\.resume-link__destination\s*\{[^}]*overflow-wrap:\s*anywhere;/);
    expect(css).toMatch(/@media print[\s\S]*\.print-only\s*\{\s*display:\s*inline/);
  });
});
