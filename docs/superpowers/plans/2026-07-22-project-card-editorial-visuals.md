# Project Card Editorial Visuals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate five content-specific editorial images and integrate them into full-width, responsive, bilingual project cards with restrained accessible motion.

**Architecture:** Five local WebP assets live under `src/assets/projects/` and are resolved through one `translationKey`-based TypeScript mapping shared by both locales. `ProjectCard.astro` renders real project copy first and a decorative Astro Image second; CSS converts the existing accidental two-column category grid into a full-row card with a 52/48 internal layout, mobile stacking, hover/focus motion, reduced-motion stability, and print hiding.

**Tech Stack:** Astro 7, TypeScript 6, Astro `Image`, Sharp 0.35, CSS Grid, Vitest, built-in image generation, Lighthouse CI.

## Global Constraints

- Generate exactly five separate `stylized-concept` assets, one built-in image-generation call per project.
- Final tracked assets are `1600 × 900` WebP files in `src/assets/projects/`.
- Target each asset at `80–150 KB`; no individual asset may exceed `180 KB`; the total may not exceed `750 KB`.
- Generated images contain no text, letters, digits, logos, watermarks, UI screenshots, people, rankings, patient data, or factual claims.
- Core-AI stays framed as team-built open source; imagery must not imply sole authorship or reveal private architecture.
- Medical imagery is visibly synthetic and must not imply diagnosis, clinical deployment, regulatory approval, or real patient material.
- Competition imagery uses no trophies, podiums, medals, victory symbolism, or baked-in brand/rank details.
- English and Chinese entries share the same asset through `translationKey`; do not duplicate image paths in Markdown frontmatter.
- All assets are local build-time imports; add no runtime image API, video, GIF, Lottie, canvas runtime, or remote media dependency.
- Motion runs only on hover/focus, lasts approximately `1.8s`, does not loop while idle, and is explicitly disabled under `prefers-reduced-motion: reduce`.
- The decorative visual has empty alt text, no interactive descendants, and cannot intercept the existing full-card link.
- Mobile must satisfy `document.documentElement.scrollWidth === clientWidth`; print must hide decorative images.
- Do not modify project-detail pages, project copy, public claims, navigation, Hero, résumé, Home layout, or global typography/theme tokens.
- Preserve unrelated worktree changes and keep each commit limited to its task.

---

## File Structure

### Create

- `src/assets/projects/core-ai-editorial.webp` — Core-AI execution-field artwork.
- `src/assets/projects/applied-ai-products-editorial.webp` — multimodal-product artwork.
- `src/assets/projects/medical-ai-editorial.webp` — synthetic tissue-field artwork.
- `src/assets/projects/research-editorial.webp` — evidence-folio artwork.
- `src/assets/projects/competitions-editorial.webp` — dual-evaluation artwork.
- `scripts/optimize-project-visuals.mjs` — deterministic 1600×900 WebP conversion and size-budget enforcement.
- `src/data/projectVisuals.ts` — typed `translationKey` to local image mapping.
- `tests/data/project-visual-assets.test.ts` — dimensions, format, and byte-budget contract.
- `tests/design/project-card-visuals.test.ts` — mapping, markup, responsive CSS, motion, print, and Lighthouse coverage contract.

### Modify

- `src/components/ProjectCard.astro` — render text and decorative visual as one linked card.
- `src/styles/global.css` — full-row cards, 52/48 internal grid, mobile stacking, scan/scale interaction, reduced-motion and print behavior.
- `.lighthouserc.json` — audit both Projects index locales where the new images actually render.

### Explicitly unchanged

- `src/content.config.ts` and `src/content/projects/*.md` — presentation does not enter content frontmatter.
- `src/components/pages/ProjectsPage.astro` — it continues to supply project, category label, and URL; ProjectCard resolves its own visual from `translationKey`.
- Project-detail layouts and all Home/Resume components.

---

### Task 1: Generate, optimize, and validate the five assets

**Files:**
- Create: `scripts/optimize-project-visuals.mjs`
- Create: `src/assets/projects/core-ai-editorial.webp`
- Create: `src/assets/projects/applied-ai-products-editorial.webp`
- Create: `src/assets/projects/medical-ai-editorial.webp`
- Create: `src/assets/projects/research-editorial.webp`
- Create: `src/assets/projects/competitions-editorial.webp`
- Test: `tests/data/project-visual-assets.test.ts`

**Interfaces:**
- Consumes: five raw PNG outputs copied to `.superpowers/project-visuals/raw/` under the exact basenames `core-ai`, `applied-ai-products`, `medical-ai`, `research`, and `competitions`.
- Produces: five verified `1600 × 900` WebPs named exactly as listed above; Task 2 imports these paths.

- [ ] **Step 1: Write the failing asset-contract test**

Create `tests/data/project-visual-assets.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify the assets are absent**

Run:

```bash
npm test -- --run tests/data/project-visual-assets.test.ts
```

Expected: FAIL with `ENOENT` for `src/assets/projects/core-ai-editorial.webp`.

- [ ] **Step 3: Generate the Core-AI raw asset with the built-in image tool**

Use one built-in image-generation call with this complete prompt:

```text
Use case: stylized-concept
Asset type: wide editorial project-card artwork
Primary request: Create an abstract execution field for Core-AI, a team-built open-source AI Agent framework spanning an SDK, terminal agent, self-hosted server, web UI, tools, workflows, and traces. Suggest concentric execution surfaces, connected signal points, and one warm central core without drawing a literal architecture diagram.
Scene/backdrop: deep charcoal instrument-like surface with quiet depth and faint technical grid texture
Subject: layered circular execution field, sparse connected signal points, restrained directional flow
Style/medium: refined editorial concept art, tactile matte material, softly luminous, abstract, precise rather than sci-fi cinematic
Composition/framing: wide 16:9 landscape, strongest form centered, useful edge space, forms must survive card cropping and small mobile display
Lighting/mood: controlled amber core light with small muted-cyan accents, calm and engineered
Color palette: #0C0E12 charcoal, #E7E3DA ivory traces, #D6A350 amber, restrained #75AAA9 cyan
Constraints: conceptual public-facing artwork only; do not imply sole authorship; do not depict real or private architecture; no UI screenshot; no terminal screenshot; no provider branding
Avoid: text, letters, digits, logos, watermarks, robots, humanoid heads, glowing brains, people, glossy stock-3D look, clutter
```

Inspect the output at full size. Reject it if it contains accidental text, a robot/head silhouette, provider marks, or a literal/private-looking architecture. Copy the accepted output to:

```text
.superpowers/project-visuals/raw/core-ai.png
```

- [ ] **Step 4: Generate the Applied AI Products raw asset**

Use one separate built-in image-generation call:

```text
Use case: stylized-concept
Asset type: wide editorial project-card artwork
Primary request: Create an abstract multimodal signal study representing a family of applied AI product work across retrieval, voice, image generation, interactive storytelling, and safety. Use overlapping ribbons, signal bands, and layered media-like surfaces; it must not look like one fictional unified product interface.
Scene/backdrop: deep charcoal editorial field with subtle grain and faint technical grid texture
Subject: several distinct but connected ribbons and wave-like surfaces suggesting retrieval, voice, image, and interaction
Style/medium: refined editorial concept art, matte translucent material, softly luminous, abstract and product-minded
Composition/framing: wide 16:9 landscape, balanced multi-center composition, detail readable at small card size, safe crop margins
Lighting/mood: warm amber mixed with restrained violet and muted cyan, exploratory but controlled
Color palette: #0C0E12 charcoal, #E7E3DA ivory, #D6A350 amber, #77719A violet, #75AAA9 cyan
Constraints: represent multiple product experiences, not a single invented product; no internal interface; no customer details; no claim that safety is solved
Avoid: text, letters, digits, logos, watermarks, UI screens, chat bubbles, app mockups, people, children, robots, glowing brains, glossy stock-3D look
```

Inspect for accidental interface chrome or readable glyphs. Copy the accepted output to:

```text
.superpowers/project-visuals/raw/applied-ai-products.png
```

- [ ] **Step 5: Generate the Medical AI raw asset**

Use one separate built-in image-generation call:

```text
Use case: stylized-concept
Asset type: wide editorial project-card artwork
Primary request: Create a clearly synthetic tissue field that evokes pathology segmentation and spatial omics through organic cell-like regions, contour boundaries, and sparse spatial points. It must remain illustrative and must not look like a real patient slide or validated model output.
Scene/backdrop: dark synthetic microscopy-inspired field with subtle grid and instrument texture
Subject: abstract tissue-like island, layered segmentation contours, spatial point field, no anatomical body part
Style/medium: refined biomedical editorial concept art, matte translucent layers, synthetic scientific abstraction
Composition/framing: wide 16:9 landscape, one organic field spanning the frame, mobile-readable structure, safe crop margins
Lighting/mood: rose and violet tissue tones with restrained cyan and amber measurement light, analytical and calm
Color palette: #0C0E12 charcoal, muted #A9677E rose, restrained violet, #75AAA9 cyan, #D6A350 amber
Constraints: visibly synthetic; no real patient material; no diagnosis; no treatment recommendation; no clinical outcome; no regulatory implication; no hospital context
Avoid: text, letters, digits, logos, watermarks, identifiable organs, human bodies, realistic microscope labels, diagnostic annotations, red warning marks, glossy stock-3D look
```

Inspect for realistic patient imagery, diagnostic markers, or accidental labels. Copy the accepted output to:

```text
.superpowers/project-visuals/raw/medical-ai.png
```

- [ ] **Step 6: Generate the Research and Patents raw asset**

Use one separate built-in image-generation call:

```text
Use case: stylized-concept
Asset type: wide editorial project-card artwork
Primary request: Create an abstract evidence folio representing collaborative publications, datasets, citation relationships, and patent records. Use layered translucent document-like planes, indexing light, and data textures without copying or inventing journal covers, patent drawings, charts, or paper titles.
Scene/backdrop: deep charcoal archive-like surface with subtle grain and faint indexing grid
Subject: layered translucent folios and sparse relationship lines, suggesting a research record rather than office paperwork
Style/medium: refined editorial concept art, matte paper-glass material, abstract archival composition
Composition/framing: wide 16:9 landscape, layered diagonal depth, central evidence cluster, safe crop margins, clear at mobile size
Lighting/mood: quiet ivory and cyan indexing light with one restrained amber focal edge, rigorous and reflective
Color palette: #0C0E12 charcoal, #E7E3DA ivory, #75AAA9 cyan, #D6A350 amber
Constraints: collaborative record; do not imply solo authorship; do not imply patent grant or exclusivity; do not fabricate scientific results
Avoid: text, letters, digits, logos, watermarks, journal branding, patent seals, charts with values, certificates, people, trophy imagery, glossy stock-3D look
```

Inspect for fake glyphs, journal-like mastheads, seals, or chart values. Copy the accepted output to:

```text
.superpowers/project-visuals/raw/research.png
```

- [ ] **Step 7: Generate the Selected Competitions raw asset**

Use one separate built-in image-generation call:

```text
Use case: stylized-concept
Asset type: wide editorial project-card artwork
Primary request: Create a restrained dual evaluation field for two biomedical modeling competition results. Use two balanced abstract tracks or paired analytical surfaces, one tissue-adjacent and one biomarker-adjacent, without winner symbolism and without making competitions the dominant portfolio identity.
Scene/backdrop: deep charcoal evaluation surface with faint grid and quiet material depth
Subject: two distinct elliptical or linear evaluation fields in balance, sparse points and measurement light, no literal scoreboard
Style/medium: refined biomedical editorial concept art, matte translucent material, disciplined and understated
Composition/framing: wide 16:9 landscape split into two related fields, equal visual weight, safe crop margins, readable at mobile size
Lighting/mood: muted rose on one field, muted cyan on the other, very restrained amber measurement points
Color palette: #0C0E12 charcoal, #A9677E rose, #75AAA9 cyan, #D6A350 amber, #E7E3DA ivory traces
Constraints: represent selected participation evidence only; no claim of winning; no brand marks; no ranking numbers in the image
Avoid: text, letters, digits, logos, watermarks, Kaggle branding, PrecisionFDA branding, trophies, podiums, medals, laurel wreaths, confetti, people, glossy stock-3D look
```

Inspect for victory symbolism, scoreboards, rank-like text, or brand marks. Copy the accepted output to:

```text
.superpowers/project-visuals/raw/competitions.png
```

- [ ] **Step 8: Write the deterministic optimizer**

Create `scripts/optimize-project-visuals.mjs`:

```js
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

await mkdir(outputDirectory, { recursive: true });

let totalBytes = 0;
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

  await writeFile(outputPath, selected.candidate);
  totalBytes += selected.candidate.byteLength;
  console.log(`${key}: ${selected.candidate.byteLength} bytes at quality ${selected.quality}`);
}

if (totalBytes > 750 * 1024) {
  throw new Error(`project visuals total ${totalBytes} bytes exceeds 750 KB`);
}

console.log(`project visuals total: ${totalBytes} bytes`);
```

- [ ] **Step 9: Optimize the accepted raw images**

Run:

```bash
node scripts/optimize-project-visuals.mjs .superpowers/project-visuals/raw
```

Expected: five per-file byte/quality lines, followed by `project visuals total:` and a numeric byte count, with no thrown error.

- [ ] **Step 10: Inspect the final WebPs and run the asset contract**

Open all five tracked WebPs with the local image viewer and verify:

- no accidental text or watermark was introduced by cropping;
- the focal subject remains inside the 16:9 crop;
- all five share the approved material language;
- each remains distinguishable at approximately 400px display width.

Then run:

```bash
npm test -- --run tests/data/project-visual-assets.test.ts
```

Expected: PASS, one test.

- [ ] **Step 11: Commit the asset pipeline and assets**

```bash
git add scripts/optimize-project-visuals.mjs tests/data/project-visual-assets.test.ts src/assets/projects
git diff --cached --check
git commit -m "feat: add editorial artwork for project cards"
```

---

### Task 2: Add the shared visual mapping

**Files:**
- Create: `src/data/projectVisuals.ts`
- Create: `tests/design/project-card-visuals.test.ts`

**Interfaces:**
- Consumes: the five exact WebP paths produced by Task 1.
- Produces: `ProjectVisual`, `projectVisuals`, and `getProjectVisual(translationKey: string): ProjectVisual | undefined`; Task 3 consumes `getProjectVisual`.

- [ ] **Step 1: Write the failing mapping test**

Create `tests/design/project-card-visuals.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the mapping test to verify it fails**

Run:

```bash
npm test -- --run tests/design/project-card-visuals.test.ts
```

Expected: FAIL with `ENOENT` for `src/data/projectVisuals.ts`.

- [ ] **Step 3: Implement the typed mapping**

Create `src/data/projectVisuals.ts`:

```ts
import type { ImageMetadata } from 'astro';
import appliedAiProducts from '../assets/projects/applied-ai-products-editorial.webp';
import competitions from '../assets/projects/competitions-editorial.webp';
import coreAi from '../assets/projects/core-ai-editorial.webp';
import medicalAi from '../assets/projects/medical-ai-editorial.webp';
import research from '../assets/projects/research-editorial.webp';

export interface ProjectVisual {
  image: ImageMetadata;
}

export const projectVisuals = {
  'core-ai': { image: coreAi },
  'applied-ai-products': { image: appliedAiProducts },
  'medical-ai': { image: medicalAi },
  'research': { image: research },
  'competitions': { image: competitions },
} as const satisfies Record<string, ProjectVisual>;

export function getProjectVisual(translationKey: string): ProjectVisual | undefined {
  return projectVisuals[translationKey as keyof typeof projectVisuals];
}
```

- [ ] **Step 4: Run focused tests and type checks**

Run:

```bash
npm test -- --run tests/design/project-card-visuals.test.ts tests/data/project-visual-assets.test.ts
npm run check
```

Expected: both test files PASS; Astro reports `0 errors`.

- [ ] **Step 5: Commit the mapping**

```bash
git add src/data/projectVisuals.ts tests/design/project-card-visuals.test.ts
git diff --cached --check
git commit -m "feat: map project entries to editorial artwork"
```

---

### Task 3: Render the visual in ProjectCard

**Files:**
- Modify: `src/components/ProjectCard.astro:1-22`
- Modify: `tests/design/project-card-visuals.test.ts`

**Interfaces:**
- Consumes: `getProjectVisual(project.data.translationKey)` from Task 2.
- Produces: `.project-card__copy`, `.project-card__visual`, and `.project-card__image` markup consumed by Task 4 CSS.

- [ ] **Step 1: Extend the test with the markup contract**

Append this suite to `tests/design/project-card-visuals.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the markup test to verify it fails**

Run:

```bash
npm test -- --run tests/design/project-card-visuals.test.ts
```

Expected: FAIL because `ProjectCard.astro` does not import `Image` or render `.project-card__visual`.

- [ ] **Step 3: Replace ProjectCard with the visual-aware markup**

Update `src/components/ProjectCard.astro` to:

```astro
---
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import { getProjectVisual } from '../data/projectVisuals';

interface Props {
  project: CollectionEntry<'projects'>;
  categoryLabel: string;
  url: string;
}

const { project, categoryLabel, url } = Astro.props;
const visual = getProjectVisual(project.data.translationKey);
---

<article class:list={['project-card', { 'project-card--with-visual': Boolean(visual) }]}>
  <div class="project-card__copy">
    <div class="project-card__meta">
      <span>{categoryLabel}</span>
      <span>{project.data.period}</span>
    </div>
    <h3 class="project-card__title">
      <a class="project-card__link" href={url}>{project.data.title}</a>
    </h3>
    <p class="project-card__summary">{project.data.summary}</p>
  </div>
  {visual && (
    <div class="project-card__visual" aria-hidden="true">
      <Image
        class="project-card__image"
        src={visual.image}
        alt=""
        widths={[400, 640, 960, 1200]}
        sizes="(min-width: 48rem) 48vw, calc(100vw - 2rem)"
        loading="lazy"
        decoding="async"
      />
    </div>
  )}
</article>
```

- [ ] **Step 4: Run focused tests and Astro checks**

Run:

```bash
npm test -- --run tests/design/project-card-visuals.test.ts
npm run check
```

Expected: focused tests PASS; Astro reports `0 errors`.

- [ ] **Step 5: Commit ProjectCard markup**

```bash
git add src/components/ProjectCard.astro tests/design/project-card-visuals.test.ts
git diff --cached --check
git commit -m "feat: render editorial artwork in project cards"
```

---

### Task 4: Implement responsive layout, motion, and print behavior

**Files:**
- Modify: `src/styles/global.css:456-509`
- Modify: `src/styles/global.css:1100-1112`
- Modify: `src/styles/global.css:1208-1262`
- Modify: `tests/design/project-card-visuals.test.ts`

**Interfaces:**
- Consumes: `.project-card__copy`, `.project-card__visual`, and `.project-card__image` from Task 3.
- Produces: full-row responsive layout and complete interaction/accessibility presentation behavior.

- [ ] **Step 1: Add the failing CSS contract**

Append to `tests/design/project-card-visuals.test.ts`:

```ts
describe('ProjectCard visual presentation', () => {
  it('uses full-row responsive cards without a fixed two-column category grid', async () => {
    const css = await source('src/styles/global.css');

    expect(css).not.toMatch(/\.project-index__cards\s*\{\s*grid-template-columns:\s*repeat\(2/);
    expect(css).toContain('.project-card__copy');
    expect(css).toContain('.project-card__visual');
    expect(css).toContain('aspect-ratio: 16 / 9');
    expect(css).toContain('max-inline-size: 100%');
    expect(css).toContain('overflow: hidden');
    expect(css).toContain('grid-template-columns: minmax(0, 13fr) minmax(18rem, 12fr)');
  });

  it('supports pointer, keyboard, reduced motion, and print', async () => {
    const css = await source('src/styles/global.css');

    expect(css).toContain('.project-card:focus-within .project-card__visual::after');
    expect(css).toContain('@keyframes project-card-scan');
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*\.project-card__visual::after/);
    expect(css).toMatch(/@media print[\s\S]*\.project-card__visual\s*\{[^}]*display:\s*none\s*!important/);
    expect(css).toMatch(/\.project-card__visual\s*\{[^}]*pointer-events:\s*none/);
  });
});
```

- [ ] **Step 2: Run the CSS test to verify it fails**

Run:

```bash
npm test -- --run tests/design/project-card-visuals.test.ts
```

Expected: FAIL on the missing visual selectors and the existing `repeat(2, ...)` category grid.

- [ ] **Step 3: Replace the ProjectCard foundation styles**

Replace the existing `.project-card` through `.project-card__link::after` block with:

```css
.project-card {
  position: relative;
  display: grid;
  min-width: 0;
  overflow: hidden;
  background: var(--bg-raised);
  transition: background-color 180ms ease, color 180ms ease;
}

.project-card:hover,
.project-card:focus-within {
  color: var(--text);
  background: var(--bg-raised);
  box-shadow: inset 0 0 0 1px var(--accent);
}

.project-card__copy {
  display: flex;
  min-width: 0;
  min-height: 18rem;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1.4rem, 3vw, 2rem);
}

.project-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: space-between;
  margin-bottom: auto;
  padding-bottom: clamp(2.5rem, 7vw, 5rem);
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.project-card:hover .project-card__meta,
.project-card:focus-within .project-card__meta {
  color: var(--text-muted);
}

.project-card__title {
  max-width: 20ch;
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.3;
}

.project-card__summary {
  max-width: 36rem;
  margin: 1rem 0 0;
}

.project-card__visual {
  position: relative;
  min-width: 0;
  max-inline-size: 100%;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  pointer-events: none;
  background: #0C0E12;
  isolation: isolate;
}

.project-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.001);
  transition: transform 1.8s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.project-card__visual::before {
  position: absolute;
  z-index: 1;
  inset: 0;
  opacity: 0.14;
  background-image:
    linear-gradient(rgb(231 227 218 / 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgb(231 227 218 / 0.08) 1px, transparent 1px);
  background-size: 1.75rem 1.75rem;
  content: '';
}

.project-card__visual::after {
  position: absolute;
  z-index: 2;
  inset-inline: 0;
  top: -24%;
  height: 24%;
  opacity: 0;
  background: linear-gradient(transparent, rgb(231 227 218 / 0.12), transparent);
  content: '';
}

.project-card:hover .project-card__image,
.project-card:focus-within .project-card__image {
  transform: scale(1.025);
}

.project-card:hover .project-card__visual::after,
.project-card:focus-within .project-card__visual::after {
  animation: project-card-scan 1.8s ease-out 1;
}

.project-card__link::after {
  position: absolute;
  z-index: 3;
  inset: 0;
  content: '';
}

@keyframes project-card-scan {
  0% { opacity: 0; transform: translateY(0); }
  12% { opacity: 1; }
  100% { opacity: 0; transform: translateY(520%); }
}
```

- [ ] **Step 4: Remove the accidental category two-column rule**

Inside `@media (min-width: 38rem)`, delete only:

```css
.project-index__cards {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

Do not change `.project-grid` or `.achievement-grid`; they intentionally remain two-column grids.

- [ ] **Step 5: Add the wide internal card grid**

Inside the existing `@media (min-width: 48rem)` block, add:

```css
.project-card--with-visual {
  grid-template-columns: minmax(0, 13fr) minmax(18rem, 12fr);
  min-height: 20rem;
}

.project-card__copy {
  min-height: 20rem;
}

.project-card__visual {
  max-inline-size: none;
  min-height: 100%;
  aspect-ratio: auto;
}
```

- [ ] **Step 6: Add explicit reduced-motion behavior**

Extend the existing top-level `@media (prefers-reduced-motion: reduce)` block with:

```css
.project-card__image {
  transform: none !important;
  transition: none !important;
}

.project-card__visual::after {
  display: none !important;
  animation: none !important;
}
```

- [ ] **Step 7: Hide visuals and remove visual-layout padding in print**

Inside the existing `@media print` block, after the `.project-index__cards` rule, add:

```css
.project-card__copy {
  min-height: 0;
  padding: 0;
}

.project-card__visual {
  display: none !important;
}
```

- [ ] **Step 8: Run focused tests and checks**

Run:

```bash
npm test -- --run tests/design/project-card-visuals.test.ts tests/data/project-visual-assets.test.ts
npm run check
```

Expected: all focused tests PASS; Astro reports `0 errors`.

- [ ] **Step 9: Commit layout and motion**

```bash
git add src/styles/global.css tests/design/project-card-visuals.test.ts
git diff --cached --check
git commit -m "style: add responsive project artwork panels"
```

---

### Task 5: Extend release gates and perform end-to-end verification

**Files:**
- Modify: `.lighthouserc.json`
- Modify: `tests/design/project-card-visuals.test.ts`

**Interfaces:**
- Consumes: complete project-card assets, mapping, markup, and CSS from Tasks 1–4.
- Produces: ongoing Lighthouse coverage for `/projects/` and `/zh/projects/`, plus final verified release evidence.

- [ ] **Step 1: Add a failing Lighthouse-route assertion**

Append to `tests/design/project-card-visuals.test.ts`:

```ts
describe('project visual release gates', () => {
  it('runs Lighthouse on both project-index locales', async () => {
    const config = JSON.parse(await source('.lighthouserc.json'));
    expect(config.ci.collect.url).toContain('http://localhost/projects/');
    expect(config.ci.collect.url).toContain('http://localhost/zh/projects/');
  });
});
```

- [ ] **Step 2: Run the assertion to verify it fails**

Run:

```bash
npm test -- --run tests/design/project-card-visuals.test.ts
```

Expected: FAIL because the Lighthouse URL list does not contain the Projects index routes.

- [ ] **Step 3: Add the two index routes to Lighthouse CI**

In `.lighthouserc.json`, make the `collect.url` array exactly:

```json
[
  "http://localhost/",
  "http://localhost/zh/",
  "http://localhost/projects/",
  "http://localhost/zh/projects/",
  "http://localhost/projects/core-ai/",
  "http://localhost/zh/projects/core-ai/"
]
```

- [ ] **Step 4: Run the complete automated verification suite**

Run:

```bash
npm run check
npm test
npm run build
npx --no-install lhci autorun
```

Expected:

- translation validation and Astro check report no errors;
- all Vitest tests pass;
- build-output validation passes for 17 HTML files;
- public-safety scan passes;
- Lighthouse reports performance, accessibility, best practices, and SEO scores of at least `0.95` for all configured routes.

- [ ] **Step 5: Verify final asset bytes**

Run:

```bash
du -ck src/assets/projects/*.webp
```

Expected: each file is no more than approximately `180 KB`, and the final `total` is no more than approximately `750 KB`. Treat the exact byte assertions in `project-visual-assets.test.ts` as authoritative because `du` rounds blocks.

- [ ] **Step 6: Perform browser QA at 390, 768, and 1440 pixels**

Serve the built site and inspect both locales:

```bash
npm run preview -- --host 127.0.0.1
```

For `/projects/` and `/zh/projects/`, verify at each target width:

- five full-row cards appear in the existing taxonomy order;
- desktop text/image balance is approximately 52/48;
- mobile copy precedes a 16:9 image and remains compact;
- each artwork matches its approved subject and all text remains HTML;
- dark and light themes both frame the fixed-dark artwork deliberately;
- clicking anywhere on text or artwork follows the one project-detail link;
- keyboard focus produces the same artwork treatment as hover;
- reduced-motion mode shows no scan or scale transform;
- print preview contains text and no project artwork;
- `document.documentElement.scrollWidth === document.documentElement.clientWidth` at 390px.

Capture comparison screenshots for 390px and 1440px in both themes as review evidence. Do not commit diagnostic screenshots.

- [ ] **Step 7: Commit the release-gate update**

```bash
git add .lighthouserc.json tests/design/project-card-visuals.test.ts
git diff --cached --check
git commit -m "test: cover project artwork release gates"
```

- [ ] **Step 8: Confirm a clean scoped worktree**

Run:

```bash
git status --short
git log -5 --oneline
```

Expected: no uncommitted files from this feature; the latest task-scoped commits cover assets, mapping, markup, styling, and release gates. If unrelated user changes appeared during execution, leave them uncommitted and report them explicitly instead of absorbing them.
