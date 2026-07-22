# Project Card Editorial Visuals Design

**Status:** Approved in visual brainstorming on 2026-07-22.

**Scope relationship:** This design extends the Projects index that the
`2026-07-21-terminal-consolidation-design.md` specification left visually
unchanged. It does not alter the site's terminal Hero, navigation, project-detail
content, résumé, or evidence claims.

## Goal

Give each of the five entries on `/projects/` and `/zh/projects/` a distinctive,
content-specific visual while keeping the Projects index consistent with the
site's dark research-log identity. The result should feel like a curated series
of editorial field studies, not five unrelated stock illustrations and not a
generic collection of glowing AI imagery.

The current desktop layout exposes an accidental empty right column: each taxonomy
category contains one entry, while `.project-index__cards` becomes a two-column
grid at `38rem`. This design replaces that empty column with a deliberate full-row
project card whose right side is a visual plate.

## Approved Direction

The user reviewed three directions and selected **Editorial concept art**:

1. Technical field plates — deterministic diagrams and SVG motion.
2. **Editorial concept art — selected.** Five art-directed raster images with a
   shared material language and restrained CSS motion.
3. Hybrid specimen windows — generated textures with denser live overlays.

The approved visual companion then mapped the selected direction across all five
projects. The shared language is:

- charcoal and near-black surfaces;
- warm amber light as the common signal color;
- small amounts of muted cyan, rose, or violet where the domain benefits;
- soft depth, subtle grid texture, and tactile material rather than glossy 3D;
- abstract but content-grounded forms;
- no text, logos, UI screenshots, people, or factual numbers baked into images.

The artwork is intentionally conceptual. It must not claim to depict a real
private architecture, a real patient sample, an unpublished product interface,
or an experimental result.

## Project Art Direction

### 1. Core-AI — execution field

Use concentric execution surfaces, connected signal points, and a warm central
core. The image should suggest a framework that connects an SDK, terminal agent,
self-hosted server, web UI, tools, and traces without presenting a literal system
diagram.

Boundaries:

- Core-AI is team-built open source; do not imply sole authorship.
- Do not invent private components, performance figures, or autonomous-agent
  capabilities.
- Avoid robots, humanoid heads, branded provider marks, and terminal screenshots.

### 2. Applied AI Products — multimodal signal study

Use overlapping ribbons, signal bands, or layered media surfaces to evoke
retrieval, voice, image generation, storytelling, and interaction. The composition
must read as a family of product experiences rather than one fictional unified
product.

Boundaries:

- Do not reproduce or invent an internal product UI.
- Do not use customer logos or confidential product details.
- Do not imply that content-safety work fully eliminated risk.

### 3. Medical AI — synthetic tissue field

Use a clearly synthetic tissue-like field with H&E-adjacent rose and violet tones,
segmentation contours, spatial points, and restrained cyan/amber highlights. The
image may evoke pathology vision and spatial omics but must remain visibly
illustrative.

Boundaries:

- No real or identifiable patient material.
- No diagnostic labels, clinical recommendations, outcome claims, regulatory
  marks, or hospital branding.
- Do not present the artwork as a microscope image or validated model output.

### 4. Research and Patents — evidence folio

Use layered translucent folios, indexing light, data textures, and citation-like
relationships. The composition should evoke publications, datasets, collaboration,
and patent records without copying journal covers or patent drawings.

Boundaries:

- Do not imply that collaborative papers or applications were solo work.
- Do not represent patent applications as granted exclusive rights.
- Do not fabricate figures, charts, journal branding, titles, identifiers, or
  experimental results inside the image.

### 5. Selected Competitions — dual evaluation field

Use two restrained biomedical evaluation tracks or paired fields, reflecting the
two selected results. The imagery may borrow tissue-like and biomarker-like
textures but should remain quieter than the other cards.

Boundaries:

- No trophies, podiums, medals, victory language, or winner symbolism.
- Do not bake `62 / 1,010`, fourth place, Kaggle branding, or PrecisionFDA branding
  into the image; those claims remain verifiable HTML content.
- Competitions remain one peer category in the portfolio, not the page's identity.

## Asset Production

Generate five separate landscape raster assets with the built-in image-generation
tool, one prompt per project. A shared base prompt enforces the material language;
each project prompt adds only the subject-specific composition above.

Generation requirements:

- use case: `stylized-concept`;
- wide landscape composition suitable for a 16:9 crop;
- no embedded text, letters, digits, logos, watermarks, labels, interface chrome,
  or human figures;
- no transparent background;
- preserve useful detail at mobile-card size;
- keep primary forms away from crop edges;
- use the site's existing palette as guidance, not as an exact screenshot match;
- generate each distinct asset with a distinct call rather than variants of one
  prompt.

The selected outputs are inspected for subject clarity, consistency, misleading
details, and accidental text. A single-change follow-up is preferred when an image
needs correction. Final assets are cropped and exported at `1600 × 900` as WebP
under `src/assets/projects/`:

- `core-ai-editorial.webp`
- `applied-ai-products-editorial.webp`
- `medical-ai-editorial.webp`
- `research-editorial.webp`
- `competitions-editorial.webp`

Target encoded size is `80–150 KB` per asset. An individual asset may reach
`180 KB` only if a lower size visibly damages the composition. The five-asset total
must remain at or below `750 KB`.

No generated asset may remain referenced from `$CODEX_HOME` or a temporary folder;
every selected project asset must be copied into the repository before integration.

## Data and Component Architecture

### Asset mapping

Add `src/data/projectVisuals.ts` as the single mapping from the existing
`translationKey` to imported local image metadata. English and Chinese entries use
the same asset automatically. Do not duplicate asset paths in ten Markdown files
and do not add a content-schema field solely for presentation.

The mapping carries only presentation data needed by the component, such as the
image import and an optional object-position override. Facts, dates, rankings,
titles, and visible descriptions continue to come from the existing content
collection.

### ProjectCard

Extend `ProjectCard.astro` with a visual region after the textual region. The DOM
order remains:

1. project meta;
2. linked title;
3. summary;
4. decorative visual.

The current full-card link overlay remains the only interactive target. The visual
region is non-interactive and uses `pointer-events: none`, so it cannot intercept
clicks or add a second focus stop.

Because the image reinforces content already stated in the card, it is decorative:
use an empty `alt` value and hide any CSS-only chrome from assistive technology. Do
not create speculative descriptive alt text that converts an abstract image into a
technical claim.

Use Astro's image pipeline with explicit dimensions, `loading="lazy"`, and
`decoding="async"`. All five cards are below the page introduction, so none needs
eager loading or fetch priority.

## Layout

### Desktop and tablet

- Every project card spans the full project-index row.
- At a suitable wide breakpoint, the card becomes a two-column internal grid:
  approximately `52%` copy and `48%` visual.
- The text stays on the left for every category to create a calm repeated rhythm.
- The image plate uses `aspect-ratio: 16 / 9`, fills its grid area, and crops with
  `object-fit: cover`.
- The entire card remains clickable and retains the existing hover/focus rule.

### Mobile

- The card stacks into one column with copy first and image second.
- The visual is `max-inline-size: 100%`, `min-width: 0`, `overflow: hidden`, and
  `aspect-ratio: 16 / 9`.
- Fixed intrinsic artwork dimensions must never contribute to document-level
  horizontal overflow.
- Replace the current large meta-to-title margin with internal grid/flex spacing so
  the added image does not make each mobile card unnecessarily tall.

### Light theme and print

The generated art remains a fixed dark editorial plate in both themes. In light
mode it is framed as an instrument/specimen surface rather than recolored, avoiding
the need for a second generated asset set.

Print hides the decorative visual region. Project text retains the existing
ink-on-white print treatment.

## Motion

Motion is a small presentation layer over the still image, not an animated asset:

- on `:hover` and `:focus-within`, play one scan pass and a very small image scale or
  parallax shift;
- the sequence lasts approximately `1.8s` and does not loop while idle;
- leaving and re-entering the card may replay it;
- no GIF, Lottie, canvas runtime, autoplay video, or continuous ambient motion;
- motion never conveys facts or hides content.

Under `prefers-reduced-motion: reduce`, explicitly disable the scan animation and
transform, leaving the complete still composition visible. Do not rely only on the
global `0.01ms` override because an animation frozen at its initial frame can still
produce an unintended visual state.

## Failure and Fallback Behavior

- All images are local build-time imports; there is no runtime image API or remote
  asset dependency.
- A missing mapped import must fail the build rather than deploy a broken image URL.
- The component's content remains readable and navigable if CSS or image decoding
  fails.
- If a future project intentionally ships before an image is designed, it may use
  the text-only card layout only after the mapping/test contract is updated
  explicitly; it must not render an empty second column.

## Testing and Verification

Automated checks:

- assert that all five current `translationKey` values resolve to visual assets;
- assert that both locales use the same mapping rather than duplicated paths;
- assert that ProjectCard renders an image with explicit dimensions, lazy loading,
  empty alt text, and no additional interactive element;
- assert that the project-index layout no longer creates an empty second column;
- run translation validation, Astro type/check, the full test suite, build-output
  validation, and public-safety scan.

Manual/browser checks:

- capture `/projects/` and `/zh/projects/` at approximately `390`, `768`, and
  `1440px` widths;
- verify dark and light themes;
- verify mouse hover and keyboard focus produce equivalent visual treatment;
- verify reduced-motion mode shows a stable still image with no scan or transform;
- verify print preview contains project text but no decorative images;
- verify every visual area still activates the same full-card project link;
- verify `document.documentElement.scrollWidth === clientWidth` at mobile width;
- inspect network output to confirm local lazy-loaded optimized assets and the
  agreed size budget.

## Acceptance Criteria

The design is complete when:

1. all five project cards have visually distinct but clearly related editorial
   images;
2. no artwork introduces unverifiable or misleading claims;
3. desktop cards use the previous empty space deliberately, while mobile cards
   remain compact and overflow-free;
4. the interaction works for pointer, keyboard, reduced motion, both themes, and
   print;
5. the page adds no runtime media dependency and stays within the asset budget;
6. English and Chinese pages share the same visual system without duplicated
   content configuration.

## Out of Scope

- No redesign of project-detail pages.
- No rewrite of project copy or public claims.
- No new project categories or navigation routes.
- No generated portraits, product screenshots, logos, or real clinical imagery.
- No server-side image generation, runtime personalization, or interactive canvas.
- No global typography, theme-token, Header, Hero, résumé, or Home layout changes.
