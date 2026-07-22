import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const rawDirectory = process.argv[2];
if (!rawDirectory) {
  throw new Error('Usage: node scripts/optimize-project-visuals.mjs RAW_IMAGE_DIRECTORY');
}

const projectRoot = resolve(import.meta.dirname, '..');
const outputDirectory = resolve(projectRoot, 'src/assets/projects');
const keys = [
  'core-ai',
  'applied-ai-products',
  'medical-ai',
  'research',
  'competitions',
];
const qualities = [82, 78, 74, 70, 66, 62, 58, 54];
const targetBytes = 150 * 1024;
const maximumBytes = 180 * 1024;

let totalBytes = 0;
const outputs = [];
for (const key of keys) {
  const sourcePath = resolve(rawDirectory, `${key}.png`);
  const outputPath = resolve(outputDirectory, `${key}-editorial.webp`);
  const resized = sharp(sourcePath)
    .rotate()
    .resize(1600, 900, { fit: 'cover', position: 'centre' });

  let selected;
  for (const quality of qualities) {
    const candidate = await resized.clone().webp({ quality, effort: 6 }).toBuffer();
    selected = { candidate, quality };
    if (candidate.byteLength <= targetBytes) break;
  }

  if (!selected || selected.candidate.byteLength > maximumBytes) {
    throw new Error(`${key}: cannot meet the 180 KB asset limit`);
  }

  totalBytes += selected.candidate.byteLength;
  outputs.push({ key, outputPath, ...selected });
  console.log(`${key}: ${selected.candidate.byteLength} bytes at quality ${selected.quality}`);
}

if (totalBytes > 750 * 1024) {
  throw new Error(`project visuals total ${totalBytes} bytes exceeds 750 KB`);
}

await mkdir(outputDirectory, { recursive: true });
await Promise.all(outputs.map(({ outputPath, candidate }) => writeFile(outputPath, candidate)));

console.log(`project visuals total: ${totalBytes} bytes`);
