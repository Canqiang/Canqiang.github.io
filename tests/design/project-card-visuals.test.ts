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
