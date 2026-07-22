import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const source = (relativePath: string) => readFile(`${projectRoot}/${relativePath}`, 'utf8');
const projectKeys = ['core-ai', 'applied-ai-products', 'medical-ai', 'research', 'competitions'];

describe('project visual mapping', () => {
  it('maps every current translation key to one local editorial image', async () => {
    const mapping = await source('src/data/projectVisuals.ts');

    for (const key of projectKeys) {
      expect(mapping, `missing ${key}`).toContain(`'${key}':`);
      expect(mapping, `missing asset import for ${key}`).toContain(`${key}-editorial.webp`);
    }

    expect(mapping).toContain('getProjectVisual');
    expect(mapping.match(/\.webp'/g)).toHaveLength(5);
  });
});
