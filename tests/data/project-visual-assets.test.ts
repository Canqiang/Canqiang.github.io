import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const filenames = [
  'core-ai-editorial.webp',
  'applied-ai-products-editorial.webp',
  'medical-ai-editorial.webp',
  'research-editorial.webp',
  'competitions-editorial.webp',
] as const;

describe('project editorial assets', () => {
  it('ships five 1600x900 WebP images within the approved byte budget', async () => {
    let totalBytes = 0;

    for (const filename of filenames) {
      const path = `${projectRoot}/src/assets/projects/${filename}`;
      const [metadata, file] = await Promise.all([sharp(path).metadata(), stat(path)]);

      expect(metadata.format, filename).toBe('webp');
      expect(metadata.width, filename).toBe(1600);
      expect(metadata.height, filename).toBe(900);
      expect(file.size, filename).toBeLessThanOrEqual(180 * 1024);
      totalBytes += file.size;
    }

    expect(totalBytes).toBeLessThanOrEqual(750 * 1024);
  });
});
