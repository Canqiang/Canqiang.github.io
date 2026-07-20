import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { validateDirectory } from '../../scripts/validate-translations.mjs';

vi.mock('astro:content', () => ({ defineCollection: <T>(collection: T) => collection }));

import { projectSchema, writingSchema } from '../../src/content.config';

describe('validateDirectory', () => {
  it('accepts paired locale files', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await writeFile(join(root, 'core-ai.en.md'), '---\n---\n');
    await writeFile(join(root, 'core-ai.zh.md'), '---\n---\n');
    await expect(validateDirectory(root)).resolves.toEqual(['core-ai']);
  });

  it('accepts localized metadata when shared facts remain aligned', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await writeFile(
      join(root, 'core-ai.en.md'),
      `---\ntranslationKey: core-ai\nlocale: en\nperiod: 2025 — Present\ncategory: open-source\nlinks:\n  - label: GitHub\n    href: https://github.com/example/repo\nfeatured: true\norder: 1\nogImage: /og/core-ai.png\ndraft: false\n---\n`,
    );
    await writeFile(
      join(root, 'core-ai.zh.md'),
      `---\ntranslationKey: core-ai\nlocale: zh\nperiod: 2025 — 至今\ncategory: open-source\nlinks:\n  - label: GitHub 代码仓库\n    href: https://github.com/example/repo\nfeatured: true\norder: 1\nogImage: /og/core-ai.png\ndraft: false\n---\n`,
    );

    await expect(validateDirectory(root)).resolves.toEqual(['core-ai']);
  });

  it('rejects divergent shared metadata', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await writeFile(
      join(root, 'core-ai.en.md'),
      `---\ntranslationKey: core-ai\nlocale: en\nperiod: 2025 — Present\ncategory: open-source\nlinks:\n  - href: https://github.com/example/repo\nfeatured: true\norder: 1\ndraft: false\n---\n`,
    );
    await writeFile(
      join(root, 'core-ai.zh.md'),
      `---\ntranslationKey: core-ai\nlocale: zh\nperiod: 2026 — 至今\ncategory: research\nlinks:\n  - href: https://github.com/example/other\nfeatured: false\norder: 2\ndraft: true\n---\n`,
    );

    await expect(validateDirectory(root)).rejects.toThrow('core-ai: shared category differs between en and zh');
    await expect(validateDirectory(root)).rejects.toThrow('core-ai: shared period facts differs between en and zh');
    await expect(validateDirectory(root)).rejects.toThrow('core-ai: shared link targets differs between en and zh');
    await expect(validateDirectory(root)).rejects.toThrow('core-ai: shared featured differs between en and zh');
    await expect(validateDirectory(root)).rejects.toThrow('core-ai: shared order differs between en and zh');
    await expect(validateDirectory(root)).rejects.toThrow('core-ai: shared draft differs between en and zh');
  });

  it('rejects locale and translation-key metadata that disagree with filenames', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await writeFile(join(root, 'core-ai.en.md'), '---\ntranslationKey: wrong\nlocale: zh\n---\n');
    await writeFile(join(root, 'core-ai.zh.md'), '---\ntranslationKey: core-ai\nlocale: zh\n---\n');

    await expect(validateDirectory(root)).rejects.toThrow('core-ai: English file locale must be en');
    await expect(validateDirectory(root)).rejects.toThrow('core-ai: en translationKey must be core-ai');
  });

  it('rejects a missing Chinese translation', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await mkdir(root, { recursive: true });
    await writeFile(join(root, 'medical-ai.en.md'), '---\n---\n');
    await expect(validateDirectory(root)).rejects.toThrow('medical-ai: missing zh');
  });

  it('rejects a missing English translation', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await writeFile(join(root, 'medical-ai.zh.md'), '---\n---\n');
    await expect(validateDirectory(root)).rejects.toThrow('medical-ai: missing en');
  });

  it('accepts paired locale files in nested directories', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await mkdir(join(root, 'research'), { recursive: true });
    await writeFile(join(root, 'research', 'core-ai.en.md'), '---\n---\n');
    await writeFile(join(root, 'research', 'core-ai.zh.md'), '---\n---\n');
    await expect(validateDirectory(root)).resolves.toEqual(['research/core-ai']);
  });

  it('rejects a missing nested translation with its relative path', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await mkdir(join(root, 'research'), { recursive: true });
    await writeFile(join(root, 'research', 'medical-ai.en.md'), '---\n---\n');
    await expect(validateDirectory(root)).rejects.toThrow('research/medical-ai: missing zh');
  });

  it('accepts an empty directory', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await expect(validateDirectory(root)).resolves.toEqual([]);
  });
});

describe('content schemas', () => {
  const project = {
    translationKey: 'core-ai',
    locale: 'en',
    title: 'Core AI',
    summary: 'A project summary.',
    period: '2026',
    role: 'Developer',
    category: 'open-source',
  };

  it('rejects unknown project frontmatter metadata', () => {
    expect(projectSchema.safeParse({ ...project, unreviewed: true }).success).toBe(false);
  });

  it('rejects unknown metadata in project links', () => {
    expect(
      projectSchema.safeParse({
        ...project,
        links: [{ label: 'Repository', href: 'https://example.com', unreviewed: true }],
      }).success,
    ).toBe(false);
  });

  it('rejects unknown writing frontmatter metadata', () => {
    expect(
      writingSchema.safeParse({
        translationKey: 'first-post',
        locale: 'en',
        title: 'First Post',
        summary: 'A writing summary.',
        publishedAt: '2026-07-19',
        unreviewed: true,
      }).success,
    ).toBe(false);
  });
});
