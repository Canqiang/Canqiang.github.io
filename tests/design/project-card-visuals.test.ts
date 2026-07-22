import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import appliedAiProducts from '../../src/assets/projects/applied-ai-products-editorial.webp';
import competitions from '../../src/assets/projects/competitions-editorial.webp';
import coreAi from '../../src/assets/projects/core-ai-editorial.webp';
import medicalAi from '../../src/assets/projects/medical-ai-editorial.webp';
import research from '../../src/assets/projects/research-editorial.webp';
import { getProjectVisual, projectVisuals } from '../../src/data/projectVisuals';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const projectContentDirectory = `${projectRoot}/src/content/projects`;
const expectedImages = {
  'core-ai': coreAi,
  'applied-ai-products': appliedAiProducts,
  'medical-ai': medicalAi,
  research,
  competitions,
} as const;

async function currentProjectKeys() {
  const filenames = await readdir(projectContentDirectory);
  const translationKeys = await Promise.all(
    filenames
      .filter((filename) => /\.(en|zh)\.md$/.test(filename))
      .map(async (filename) => {
        const content = await readFile(`${projectContentDirectory}/${filename}`, 'utf8');
        return content.match(/^translationKey:\s*(.+)$/m)?.[1]?.trim();
      }),
  );

  return [...new Set(translationKeys.filter((key): key is string => Boolean(key)))].sort();
}

async function source(path: string) {
  return readFile(`${projectRoot}/${path}`, 'utf8');
}

describe('project visual mapping', () => {
  it('maps every current project content key to its exact editorial image', async () => {
    expect(await currentProjectKeys()).toEqual(Object.keys(expectedImages).sort());

    for (const [translationKey, image] of Object.entries(expectedImages)) {
      expect(projectVisuals[translationKey as keyof typeof projectVisuals]).toEqual({ image });
      expect(getProjectVisual(translationKey)).toEqual({ image });
    }
  });

  it('returns undefined for a translation key without an editorial image', () => {
    expect(getProjectVisual('unknown')).toBeUndefined();
  });
});

describe('ProjectCard visual markup', () => {
  it('renders copy first and one non-interactive lazy decorative image second', async () => {
    const card = await source('src/components/ProjectCard.astro');

    expect(card).toContain("import { Image } from 'astro:assets'");
    expect(card).toContain('getProjectVisual(project.data.translationKey)');
    expect(card).toContain('class="project-card__copy"');
    expect(card).toContain("'project-card--with-visual': Boolean(visual)");
    expect(card).toContain('class="project-card__visual"');
    expect(card).toContain('class="project-card__image"');
    expect(card).toContain('alt=""');
    expect(card).toContain('loading="lazy"');
    expect(card).toContain('decoding="async"');
    expect(card).toContain('aria-hidden="true"');
    expect(card.indexOf('project-card__summary')).toBeLessThan(card.indexOf('project-card__visual'));
    expect(card.match(/<a\b/g)).toHaveLength(1);
  });
});
