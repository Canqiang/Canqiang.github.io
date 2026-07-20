# Xander Xu Bilingual Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish Xander Xu's English-first, fully bilingual personal portfolio at `https://canqiang.github.io`, with Core-AI as the flagship open-source case study and Kaggle as one achievement category.

**Architecture:** Astro generates paired English and Chinese static routes from typed content and locale-aware data. Small, focused Astro components render the Technical Field Notes visual system; build-time validators enforce translation pairs and route integrity. GitHub Actions runs type, content, link, and Lighthouse gates before deploying to GitHub Pages.

**Tech Stack:** Node 24.18.0 LTS in CI, npm 11, Astro 7.1.1, TypeScript 6.0.3, Vitest 4.1.10, Astro Content Collections, CSS custom properties, Sharp 0.35.3, GitHub Pages.

## Global Constraints

- Local repository is `/Users/xander/git_repo/Canqiang.github.io` on branch `main`.
- English is always served at `/`; Chinese is served under `/zh/`; there is no browser-language redirect.
- Every required v1 content item has both `en` and `zh` variants sharing one `translationKey`.
- Core-AI must be described as an open-source AI Agent framework and must not imply sole authorship.
- ChanceTop employment is `2025-07-15 — Present`, with public-facing role `AI Platform Engineer / AI 平台研发工程师`.
- Kaggle is one achievement category and has no primary navigation item or dedicated homepage section.
- No runtime GitHub or Kaggle API calls are allowed.
- Do not publish the supplied April 2025 Chinese résumé PDF or its personal phone number.
- Public copy must exclude private hostnames, deployment topology, customer data, credentials, unpublished metrics, and roadmap details.
- Use the real supplied speaking photo; do not use stock or generated portrait imagery.
- Primary colors are `#F1F4F8`, `#111318`, `#2456E8`, `#6D3AE8`, `#687080`, and `#FF5C35`.
- Support 360, 768, 1024, and 1440 px layouts, keyboard navigation, visible focus, descriptive alt text, and reduced motion.
- Required release targets are Lighthouse Performance, Accessibility, Best Practices, and SEO scores of at least 95.
- Keep each commit limited to the task being implemented.

---

## File Map

### Project and quality configuration

- `package.json` — pinned dependencies and validation scripts
- `package-lock.json` — deterministic dependency graph
- `astro.config.mjs` — static site URL and sitemap integration
- `tsconfig.json` — Astro strict TypeScript baseline
- `vitest.config.ts` — unit-test configuration
- `.gitignore` — build, dependency, and local-tool exclusions
- `.lighthouserc.json` — representative route audits and score thresholds
- `lychee.toml` — link-check behavior
- `.github/workflows/deploy.yml` — Pages build, quality gates, and deploy

### Localization and content contracts

- `src/i18n/config.ts` — `Locale`, labels, and locale metadata
- `src/i18n/routes.ts` — route keys, localized paths, and alternate-locale mapping
- `src/content.config.ts` — project and writing collection schemas
- `scripts/validate-translations.mjs` — required `en`/`zh` pair validator
- `tests/i18n/routes.test.ts` — route and language-switch contract tests
- `tests/content/translation-pairs.test.ts` — filename-pair validator tests

### Reviewed data and content

- `src/data/site.ts` — identity, contact links, navigation, hero, and field-index copy
- `src/data/experience.ts` — bilingual work history
- `src/data/achievements.ts` — publications, patents, open source, and competition results
- `src/content/projects/core-ai.en.md` and `.zh.md` — flagship case study
- `src/content/projects/applied-ai-products.en.md` and `.zh.md` — LLM and multimodal products
- `src/content/projects/medical-ai.en.md` and `.zh.md` — medical vision and omics
- `src/content/projects/research.en.md` and `.zh.md` — publications and patents
- `src/content/projects/competitions.en.md` and `.zh.md` — selected competition work
- `src/content/projects/.gitkeep` — keeps the empty project directory valid before Task 4 content lands
- `src/content/writing/.gitkeep` — writing collection remains empty and hidden from navigation
- `src/assets/xander-speaking.jpg` — real speaking image extracted from the supplied DOCX

### Layout and components

- `src/layouts/BaseLayout.astro` — document shell and locale metadata
- `src/layouts/ProjectLayout.astro` — localized project detail layout
- `src/components/SeoHead.astro` — canonical, hreflang, OG, and JSON-LD metadata
- `src/components/Header.astro` — navigation and contextual language switch
- `src/components/Footer.astro` — contact and public profiles
- `src/components/Hero.astro` — first-viewport thesis and speaking image
- `src/components/FieldIndexRail.astro` — career-progression signature
- `src/components/ProjectCard.astro` and `ProjectGrid.astro` — selected work and project index
- `src/components/ExperienceTimeline.astro` — chronological experience
- `src/components/AchievementIndex.astro` — peer categories for papers, patents, open source, and competitions
- `src/components/ContactLinks.astro` — accessible contact actions
- `src/components/pages/HomePage.astro` — localized homepage composition
- `src/components/pages/WorkPage.astro` — full work-history composition
- `src/components/pages/ProjectsPage.astro` — localized project index
- `src/components/pages/AboutPage.astro` — education, research, interests, and contact
- `src/components/pages/ResumePage.astro` — print-ready current web résumé
- `src/styles/global.css` — tokens, typography, layout primitives, focus, print, and reduced-motion rules

### Routes and public assets

- `src/pages/index.astro`, `work.astro`, `about.astro`, `resume.astro` — English routes
- `src/pages/projects/index.astro`, `[slug].astro` — English project routes
- `src/pages/zh/index.astro`, `work.astro`, `about.astro`, `resume.astro` — Chinese routes
- `src/pages/zh/projects/index.astro`, `[slug].astro` — Chinese project routes
- `src/pages/404.astro` — bilingual not-found page
- `scripts/generate-og.mjs` — deterministic raster social-card generator
- `public/og/home.png`, `public/og/core-ai.png` — 1200 × 630 cards
- `public/favicon.png` — raster favicon derived from the Xander wordmark

---

### Task 1: Scaffold the pinned Astro project and quality scripts

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Modify: `.gitignore`
- Create: `src/env.d.ts`

**Interfaces:**
- Consumes: the approved repository and global constraints
- Produces: npm scripts `dev`, `check`, `test`, `validate:translations`, `generate:og`, `build`, and `preview`

- [ ] **Step 1: Write the package contract**

Create `package.json` with exact pinned versions:

```json
{
  "name": "canqiang-github-io",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=24.18.0" },
  "scripts": {
    "dev": "astro dev",
    "check": "npm run validate:translations && astro check",
    "test": "vitest run",
    "validate:translations": "node scripts/validate-translations.mjs",
    "generate:og": "node scripts/generate-og.mjs",
    "build": "npm run validate:translations && astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/check": "0.9.9",
    "@astrojs/sitemap": "3.7.3",
    "@fontsource-variable/ibm-plex-sans": "5.3.0",
    "@fontsource/barlow-condensed": "5.3.0",
    "@fontsource/ibm-plex-mono": "5.3.0",
    "astro": "7.1.1",
    "sharp": "0.35.3",
    "typescript": "6.0.3"
  },
  "devDependencies": {
    "vitest": "4.1.10"
  }
}
```

- [ ] **Step 2: Install dependencies and create the lockfile**

Run:

```bash
npm install
```

Expected: `package-lock.json` is created, Node engine warnings are absent under Node 24.18.0 or newer 24.x, and the audit command exits successfully.

- [ ] **Step 3: Add Astro and test configuration**

Create `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://canqiang.github.io',
  output: 'static',
  integrations: [sitemap()],
});
```

Create `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
```

Create `src/env.d.ts`:

```ts
/// <reference types="astro/client" />
```

- [ ] **Step 4: Add repository exclusions**

Create `.gitignore`:

```gitignore
.worktrees/
.superpowers/
node_modules/
dist/
.astro/
.DS_Store
*.log
```

- [ ] **Step 5: Verify the scaffold**

Run:

```bash
npm exec astro -- --version
npm test -- --passWithNoTests
```

Expected: Astro prints `7.1.1`; Vitest exits successfully with no test files.

- [ ] **Step 6: Commit the scaffold**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts .gitignore src/env.d.ts
git diff --cached --check
git commit -m "build: scaffold Astro portfolio"
```

### Task 2: Implement locale routing contracts with tests

**Files:**
- Create: `tests/i18n/routes.test.ts`
- Create: `src/i18n/config.ts`
- Create: `src/i18n/routes.ts`

**Interfaces:**
- Produces: `Locale`, `RouteKey`, `localizedPath(locale, key, slug?)`, and `alternateLocalePath(pathname)`
- Consumed by: layouts, header, page routes, and SEO metadata

- [ ] **Step 1: Write failing route tests**

Create `tests/i18n/routes.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { alternateLocalePath, localizedPath } from '../../src/i18n/routes';

describe('localizedPath', () => {
  it('keeps English at the root and Chinese under /zh', () => {
    expect(localizedPath('en', 'home')).toBe('/');
    expect(localizedPath('zh', 'home')).toBe('/zh/');
    expect(localizedPath('en', 'work')).toBe('/work/');
    expect(localizedPath('zh', 'work')).toBe('/zh/work/');
  });

  it('preserves project context across locales', () => {
    expect(localizedPath('en', 'project', 'core-ai')).toBe('/projects/core-ai/');
    expect(localizedPath('zh', 'project', 'core-ai')).toBe('/zh/projects/core-ai/');
  });
});

describe('alternateLocalePath', () => {
  it.each([
    ['/', '/zh/'],
    ['/zh/', '/'],
    ['/work/', '/zh/work/'],
    ['/zh/projects/core-ai/', '/projects/core-ai/'],
  ])('maps %s to %s', (input, expected) => {
    expect(alternateLocalePath(input)).toBe(expected);
  });
});
```

- [ ] **Step 2: Run the test and verify failure**

Run:

```bash
npm test -- tests/i18n/routes.test.ts
```

Expected: FAIL because `src/i18n/routes.ts` does not exist.

- [ ] **Step 3: Implement locale metadata and route helpers**

Create `src/i18n/config.ts`:

```ts
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const localeMeta = {
  en: { lang: 'en', hreflang: 'en', label: 'EN', switchLabel: '中文' },
  zh: { lang: 'zh-CN', hreflang: 'zh-CN', label: '中文', switchLabel: 'EN' },
} as const;
```

Create `src/i18n/routes.ts`:

```ts
import type { Locale } from './config';

export type RouteKey = 'home' | 'work' | 'projects' | 'project' | 'about' | 'resume';

const fixedRoutes: Record<Exclude<RouteKey, 'project'>, Record<Locale, string>> = {
  home: { en: '/', zh: '/zh/' },
  work: { en: '/work/', zh: '/zh/work/' },
  projects: { en: '/projects/', zh: '/zh/projects/' },
  about: { en: '/about/', zh: '/zh/about/' },
  resume: { en: '/resume/', zh: '/zh/resume/' },
};

export function localizedPath(locale: Locale, key: RouteKey, slug?: string): string {
  if (key !== 'project') return fixedRoutes[key][locale];
  if (!slug) throw new Error('project routes require a slug');
  return locale === 'en' ? `/projects/${slug}/` : `/zh/projects/${slug}/`;
}

export function alternateLocalePath(pathname: string): string {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (normalized === '/zh/') return '/';
  if (normalized.startsWith('/zh/')) return normalized.replace(/^\/zh/, '');
  return normalized === '/' ? '/zh/' : `/zh${normalized}`;
}
```

- [ ] **Step 4: Run route tests**

Run:

```bash
npm test -- tests/i18n/routes.test.ts
```

Expected: 6 assertions pass.

- [ ] **Step 5: Commit locale routing**

```bash
git add src/i18n tests/i18n
git diff --cached --check
git commit -m "feat: add bilingual route contracts"
```

### Task 3: Enforce translation pairs and content schemas

**Files:**
- Create: `tests/content/translation-pairs.test.ts`
- Create: `scripts/validate-translations.mjs`
- Create: `src/content.config.ts`
- Create: `src/content/projects/.gitkeep`
- Create: `src/content/writing/.gitkeep`

**Interfaces:**
- Produces: `validateDirectory(directory)` and Astro collections `projects` and `writing`
- Consumed by: npm `check`, `build`, project routes, and content-loading components

- [ ] **Step 1: Write failing validator tests**

Create `tests/content/translation-pairs.test.ts`:

```ts
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { validateDirectory } from '../../scripts/validate-translations.mjs';

describe('validateDirectory', () => {
  it('accepts paired locale files', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await writeFile(join(root, 'core-ai.en.md'), '---\n---\n');
    await writeFile(join(root, 'core-ai.zh.md'), '---\n---\n');
    await expect(validateDirectory(root)).resolves.toEqual(['core-ai']);
  });

  it('rejects a missing Chinese translation', async () => {
    const root = await mkdtemp(join(tmpdir(), 'portfolio-pairs-'));
    await mkdir(root, { recursive: true });
    await writeFile(join(root, 'medical-ai.en.md'), '---\n---\n');
    await expect(validateDirectory(root)).rejects.toThrow('medical-ai: missing zh');
  });
});
```

- [ ] **Step 2: Run the validator test and verify failure**

Run:

```bash
npm test -- tests/content/translation-pairs.test.ts
```

Expected: FAIL because the validator module does not exist.

- [ ] **Step 3: Implement the translation validator**

Create `scripts/validate-translations.mjs`:

```js
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export async function validateDirectory(directory) {
  const files = (await readdir(directory)).filter((name) => /\.(en|zh)\.md$/.test(name));
  const groups = new Map();

  for (const file of files) {
    const match = file.match(/^(.*)\.(en|zh)\.md$/);
    if (!match) continue;
    const [, key, locale] = match;
    if (!groups.has(key)) groups.set(key, new Set());
    groups.get(key).add(locale);
  }

  const errors = [];
  for (const [key, localeSet] of groups) {
    for (const locale of ['en', 'zh']) {
      if (!localeSet.has(locale)) errors.push(`${key}: missing ${locale}`);
    }
  }

  if (errors.length) throw new Error(errors.join('\n'));
  return [...groups.keys()].sort();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const keys = await validateDirectory(new URL('../src/content/projects', import.meta.url));
  console.log(`Validated ${keys.length} bilingual project pairs.`);
}
```

- [ ] **Step 4: Define Astro content schemas**

Create `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const locale = z.enum(['en', 'zh']);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{en,zh}.md', base: './src/content/projects' }),
  schema: z.object({
    translationKey: z.string().min(1),
    locale,
    title: z.string().min(1),
    summary: z.string().min(1),
    period: z.string().min(1),
    role: z.string().min(1),
    category: z.enum(['open-source', 'applied-ai', 'medical-ai', 'research', 'competitions']),
    technologies: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().default(99),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{en,zh}.md', base: './src/content/writing' }),
  schema: z.object({
    translationKey: z.string().min(1),
    locale,
    title: z.string().min(1),
    summary: z.string().min(1),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };
```

- [ ] **Step 5: Run tests and validation**

Run:

```bash
npm test -- tests/content/translation-pairs.test.ts
```

Expected: both validator tests pass.

- [ ] **Step 6: Commit content contracts**

```bash
git add src/content.config.ts src/content/projects/.gitkeep src/content/writing/.gitkeep scripts/validate-translations.mjs tests/content
git diff --cached --check
git commit -m "feat: validate bilingual content pairs"
```

### Task 4: Add reviewed identity, experience, achievements, project content, and speaking image

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/achievements.ts`
- Create: ten project Markdown files under `src/content/projects/`
- Create: `src/assets/xander-speaking.jpg`

**Interfaces:**
- Produces: `siteCopy`, `experience`, `achievementGroups`, and five bilingual project pairs
- Consumed by: Home, Work, Projects, About, Resume, Header, Footer, and project detail routes

- [ ] **Step 1: Extract only the approved photo asset**

Run:

```bash
mkdir -p /tmp/xander-portfolio-photo
unzip -j "/Users/xander/Documents/Xander Xu.docx" word/media/image1.jpg -d /tmp/xander-portfolio-photo
cp /tmp/xander-portfolio-photo/image1.jpg src/assets/xander-speaking.jpg
```

Expected: `src/assets/xander-speaking.jpg` is an 84 KB JPEG showing Xander speaking at the AI hackathon. Do not copy the DOCX or the résumé PDF into the repository.

- [ ] **Step 2: Create typed site identity copy**

Create `src/data/site.ts` with these exported interfaces and values:

```ts
import type { Locale } from '../i18n/config';

type Localized = Record<Locale, string>;
export type PublicLink = { label: string; href: string };

export const identity = {
  name: 'Xander Xu',
  chineseName: '许灿强',
  role: { en: 'AI Platform Engineer', zh: 'AI 平台研发工程师' },
  headline: {
    en: 'Models are only useful when they ship.',
    zh: '模型只有真正落地，才有价值。',
  },
  introduction: {
    en: 'I build open-source agent frameworks and applied AI systems, with a career spanning bioinformatics, medical vision, LLM products, and workflow infrastructure.',
    zh: '我专注于开源智能体框架与应用型 AI 系统研发，经历覆盖生物信息、医疗视觉、大模型产品与工作流基础设施。',
  },
  photoAlt: {
    en: 'Xander Xu presenting an AI system at a hackathon',
    zh: '许灿强在 AI 黑客松现场介绍智能体系统',
  },
} satisfies Record<string, string | Localized>;

export const fieldIndex = [
  { key: 'bioinformatics', en: 'Bioinformatics', zh: '生物信息' },
  { key: 'medical-ai', en: 'Medical AI', zh: '医疗 AI' },
  { key: 'llm-products', en: 'LLM Products', zh: '大模型产品' },
  { key: 'agent-systems', en: 'Agent Systems', zh: '智能体系统' },
] as const;

export const publicLinks: PublicLink[] = [
  { label: 'GitHub', href: 'https://github.com/Canqiang' },
  { label: 'Core-AI', href: 'https://github.com/chancetop-com/core-ai' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/canqiang' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/canqiang-xu-8510531b3/' },
  { label: 'Email', href: 'mailto:canqiangxu@yeah.net' },
];
```

- [ ] **Step 3: Create the bilingual experience dataset**

Create `src/data/experience.ts` with `ExperienceEntry` containing `company`, `role`, `period`, `location`, `summary`, and `highlights`, each localized where needed. Add exactly these chronological entries:

1. Tsinghua University Institute for Interdisciplinary Information Sciences — Research Assistant — Jul 2017 to Oct 2018 — drug-target prediction, multi-omics data systems, cryo-EM particle detection.
2. Jiyuan Technology — Algorithm Engineer — Oct 2018 to Apr 2021 — pathology segmentation/classification, metagenomic geolocation, immunotherapy response.
3. BGI Research — Algorithm Engineer and Team Lead — Apr 2021 to Apr 2022 — spatial clinical analysis, cell-image segmentation, Stereo-seq correction.
4. Fapon Biotech — Algorithm Engineer and Project Lead — Apr 2022 to Mar 2023 — WSI prognostic stratification research.
5. Jiyuan Technology — Technical Lead, Medical LLM R&D — Mar 2023 to Jun 2024 — RAG, NLP, LoRA, and enterprise AI product design.
6. Qudian Technology — LLM Application Engineer — Sep 2024 to Jul 2025 — multimodal agents, interactive storybooks, prompt engineering, content safety, TTS and ASR integration.
7. ChanceTop — AI Platform Engineer — Jul 15 2025 to Present — Core-AI open-source framework, durable workflows, model gateway, observability, sandbox recovery, and end-to-end platform delivery.

Use neutral, public-safe summaries and omit private metrics, customer names, and infrastructure identifiers.

- [ ] **Step 4: Create the achievement dataset**

Create `src/data/achievements.ts` exporting four peer groups in this order: `publications`, `patents`, `openSource`, `competitions`.

Include these reviewed items:

- Publications: the 2021 npj Genomic Medicine anti-PD-1 paper; the 2020 Biology Direct metagenomic geolocation paper; the 2021 Nature Communications ImmuneCells.Sig paper.
- Patents: `CN110827915A`, the Stereo-seq GMM correction PCT application, and `CN112634985A`.
- Open source: Core-AI with source link and accurate shared-contributor wording.
- Competitions: Kaggle PANDA rank 62 of 1010 and PrecisionFDA/Georgetown brain-cancer challenge fourth place.

- [ ] **Step 5: Add complete bilingual project pairs**

Create each `.en.md` and `.zh.md` file with matching `translationKey`, matching category, reviewed summary, public-safe body, and links:

- `core-ai` — `featured: true`, `order: 1`, open-source definition, architecture scope, and individual contribution boundaries; link GitHub and public docs.
- `applied-ai-products` — `featured: true`, `order: 2`, multimodal agent, interactive storybook, RAG, TTS/ASR, and child-safety experience without unpublished metrics.
- `medical-ai` — `featured: true`, `order: 3`, pathology segmentation/classification and spatial omics without unpublished metrics.
- `research` — `featured: true`, `order: 4`, three publications and patent work.
- `competitions` — `featured: false`, `order: 5`, PANDA 62/1010 and PrecisionFDA fourth place; do not describe Kaggle as a separate career identity.

For `core-ai.en.md`, use this opening:

```md
---
translationKey: core-ai
locale: en
title: Core-AI
summary: An open-source AI Agent framework spanning an SDK, terminal agent, self-hosted server, and web UI.
period: 2025 — Present
role: Core contributor
category: open-source
technologies: [Java, TypeScript, React, MCP, OpenTelemetry, MongoDB, Kubernetes]
links:
  - label: GitHub
    href: https://github.com/chancetop-com/core-ai
  - label: Documentation
    href: https://chancetop-com.github.io/core-ai/
featured: true
order: 1
ogImage: /og/core-ai.png
draft: false
---

Core-AI is an open-source framework for building and operating AI agents across a Java SDK, terminal interface, self-hosted server, and web application.

## My contribution

I contribute across the framework and product surface, with a focus on durable workflows, model-provider integration, observability, sandbox recovery, and the path from backend capability to usable frontend experience.

The project is built by a team. This page documents the areas I worked on without implying sole authorship.
```

Write the Chinese pair as a faithful translation with the same claims and section order.

- [ ] **Step 6: Validate content and schema**

Run:

```bash
npm run validate:translations
npm test
npm run check
```

Expected: five bilingual project pairs validate; route and pair tests pass; Astro accepts every frontmatter field.

- [ ] **Step 7: Commit reviewed content**

```bash
git add src/assets src/data src/content/projects
git diff --cached --check
git commit -m "content: add bilingual portfolio record"
```

### Task 5: Build the visual system, metadata shell, and locale-aware navigation

**Files:**
- Create: `src/styles/global.css`
- Create: `src/components/SeoHead.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/ContactLinks.astro`
- Create: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: `Locale`, route helpers, `identity`, and `publicLinks`
- Produces: `BaseLayout` props `{ locale, title, description, pathname, image? }` and shared responsive shell

- [ ] **Step 1: Implement exact global tokens and accessibility baselines**

Create `src/styles/global.css` beginning with:

```css
@import '@fontsource/barlow-condensed/700.css';
@import '@fontsource/barlow-condensed/800.css';
@import '@fontsource-variable/ibm-plex-sans';
@import '@fontsource/ibm-plex-mono/400.css';
@import '@fontsource/ibm-plex-mono/600.css';

:root {
  --paper-cool: #f1f4f8;
  --carbon: #111318;
  --signal-blue: #2456e8;
  --circuit-violet: #6d3ae8;
  --graphite: #687080;
  --signal-coral: #ff5c35;
  --rule: #c8cdd7;
  --content-width: 73.75rem;
  --font-display: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  --font-body: 'IBM Plex Sans Variable', 'PingFang SC', 'Noto Sans CJK SC', 'Microsoft YaHei', sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

* { box-sizing: border-box; }
html { color-scheme: light; background: var(--paper-cool); scroll-behavior: smooth; }
body { margin: 0; color: var(--carbon); background: var(--paper-cool); font-family: var(--font-body); }
a { color: inherit; text-underline-offset: 0.2em; }
img { display: block; max-width: 100%; height: auto; }
:focus-visible { outline: 3px solid var(--signal-blue); outline-offset: 3px; }
.shell { width: min(calc(100% - 2rem), var(--content-width)); margin-inline: auto; }
.display { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; }
.mono { font-family: var(--font-mono); }
.rule-top { border-top: 1px solid var(--carbon); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}

@media print {
  header, footer, .no-print { display: none !important; }
  body { background: white; color: black; }
  a { text-decoration: none; }
}
```

Extend the same file with the approved responsive grid, hero, project cards, timeline, achievement cells, mobile navigation, and print rules. Use structural selectors scoped to component classes; do not use broad selectors that override CTA padding or section spacing.

- [ ] **Step 2: Implement SEO metadata**

Create `src/components/SeoHead.astro` with props:

```ts
interface Props {
  locale: 'en' | 'zh';
  title: string;
  description: string;
  pathname: string;
  image?: string;
}
```

Render canonical URL from `Astro.site`, paired `hreflang` links using `alternateLocalePath`, `x-default` pointing to English, translated Open Graph metadata, Twitter summary-large-image metadata when `image` exists, and Person JSON-LD with `sameAs` for GitHub, LinkedIn, Kaggle, and Core-AI.

- [ ] **Step 3: Implement route-aware header and accessible mobile menu**

`Header.astro` receives `locale` and `pathname`, uses `localizedPath` for Work, Projects, and About, and uses `alternateLocalePath(pathname)` for the language switch. The mobile control must be a real `<button>` with `aria-expanded` and `aria-controls`; a minimal inline script only toggles those attributes and the menu's `hidden` state.

- [ ] **Step 4: Implement footer and contact links**

`ContactLinks.astro` renders Email, GitHub, Core-AI, LinkedIn, and Kaggle as text links. Kaggle uses the same visual weight as the other links. `Footer.astro` includes copyright, the current year, and source attribution without exposing the phone number.

- [ ] **Step 5: Compose the base layout**

`BaseLayout.astro` imports `global.css`, sets `<html lang>` to `en` or `zh-CN`, renders `SeoHead`, includes a skip link, and wraps `Header`, `<main id="main-content">`, and `Footer`.

- [ ] **Step 6: Add a temporary route and run checks**

Create a minimal `src/pages/index.astro` using `BaseLayout`, then run:

```bash
npm run check
npm run build
```

Expected: `dist/index.html` exists; canonical is `https://canqiang.github.io/`; no type or CSS import errors.

- [ ] **Step 7: Commit the shell**

```bash
git add src/styles src/components src/layouts src/pages/index.astro
git diff --cached --check
git commit -m "feat: add editorial portfolio shell"
```

### Task 6: Build the bilingual homepage and shared presentation components

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/FieldIndexRail.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/ProjectGrid.astro`
- Create: `src/components/ExperienceTimeline.astro`
- Create: `src/components/AchievementIndex.astro`
- Create: `src/components/pages/HomePage.astro`
- Modify: `src/pages/index.astro`
- Create: `src/pages/zh/index.astro`

**Interfaces:**
- Consumes: locale, identity, field index, featured project collection entries, experience, achievements, and speaking image
- Produces: identical English/Chinese section structure with localized content

- [ ] **Step 1: Implement the hero thesis**

`Hero.astro` accepts `locale`. Render the role label, exact approved headline, supporting copy, `View selected work / 查看精选工作`, `View résumé / 查看简历`, and the optimized Astro `<Image>` for `xander-speaking.jpg`. Use `widths={[480, 720, 960]}`, `formats={['avif', 'webp']}`, and the reviewed localized alt text.

- [ ] **Step 2: Implement the career field-index rail**

`FieldIndexRail.astro` renders the four real career stages in order and exposes each stage as a link to the matching Work-page anchor. Use the same DOM order on mobile and desktop. The visual line and active-color accents are CSS-only so the component remains useful without JavaScript.

- [ ] **Step 3: Implement project and evidence components**

`ProjectCard.astro` accepts one project collection entry, category label, and URL. `ProjectGrid.astro` accepts a sorted list and renders the first four featured projects. `ExperienceTimeline.astro` accepts locale plus a compact/full mode. `AchievementIndex.astro` renders four peer category cells; the competitions cell must not be larger or earlier than publications, patents, or open source.

- [ ] **Step 4: Compose the Home page**

`HomePage.astro` accepts `locale`, fetches non-draft project entries matching the locale, sorts by `order`, and renders:

```text
Hero
FieldIndexRail
Selected Work
Experience Preview
Achievement Index
Contact Links
```

Use section headings `Selected field notes`, `Experience`, `Record`, and `Contact` in English; `精选现场笔记`, `经历`, `成果索引`, and `联系` in Chinese.

- [ ] **Step 5: Wire both home routes**

English `src/pages/index.astro` renders `<HomePage locale="en" />`. Chinese `src/pages/zh/index.astro` renders `<HomePage locale="zh" />`. Provide translated titles and descriptions to `BaseLayout`.

- [ ] **Step 6: Verify both outputs**

Run:

```bash
npm run check
npm run build
test -f dist/index.html
test -f dist/zh/index.html
rg -n "Models are only useful|模型只有真正落地" dist/index.html dist/zh/index.html
```

Expected: both pages build and each contains only its own primary-language hero copy.

- [ ] **Step 7: Commit the bilingual homepage**

```bash
git add src/components src/pages/index.astro src/pages/zh/index.astro src/styles/global.css
git diff --cached --check
git commit -m "feat: build bilingual portfolio homepage"
```

### Task 7: Build Work, About, and printable Web Résumé pages

**Files:**
- Create: `src/components/pages/WorkPage.astro`
- Create: `src/components/pages/AboutPage.astro`
- Create: `src/components/pages/ResumePage.astro`
- Create: `src/pages/work.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/resume.astro`
- Create: `src/pages/zh/work.astro`
- Create: `src/pages/zh/about.astro`
- Create: `src/pages/zh/resume.astro`
- Create: `src/data/profile.ts`
- Modify: `src/data/experience.ts`
- Modify: `src/styles/global.css`
- Create: `tests/pages/profile-pages.test.ts`

**Interfaces:**
- Consumes: typed field-keyed experience, shared education/interests, achievements, identity, locale, and contact links
- Produces: three paired route sets and a print-ready résumé without publishing the legacy PDF

- [ ] **Step 1: Build the full Work page**

`WorkPage.astro` renders the career narrative, the four field anchors, and all seven experience entries. Each experience entry carries an explicit field key; filter by that key and preserve chronological order rather than relying on positional slices. Each role includes company, role, dates, public-safe summary, and focused highlights. Core-AI links to the flagship project page.

- [ ] **Step 2: Build the About page**

Create one typed `src/data/profile.ts` source for the approved education and interest facts, then consume it from both About and Resume. `AboutPage.astro` includes:

- Fujian Medical University, BSc in Bioinformatics, 2013–2017
- short biography connecting research, engineering, and product work
- three publications and three patent items
- interests: ball sports, board/chess games, and computer games
- public contact links

Do not display phone number, home address, or private company details.

- [ ] **Step 3: Build the printable résumé**

`ResumePage.astro` uses the same reviewed data as Work and About, with compact typography, no hero image, a visible `Print / 打印` button calling `window.print()`, and print CSS hiding navigation and interactive controls. Printed contact links include their actual email address or public destination, not labels alone. Print CSS hides the skip link, sets both `html` and `body` to white, and preserves content headings. The English and Chinese pages are current through ChanceTop and contain no claim that a separate PDF exists.

- [ ] **Step 4: Wire all six routes**

Each route passes its locale and translated metadata through `BaseLayout`. Use paired canonical and hreflang output. Work-page field anchors use stable IDs: `bioinformatics`, `medical-ai`, `llm-products`, `agent-systems`.

- [ ] **Step 5: Build and inspect route matrix**

Run:

```bash
npm run check
npm run build
for route_name in work about resume zh/work zh/about zh/resume; do test -f "dist/$route_name/index.html"; done
npm run scan:public-safety
```

Expected: all six route files exist; the public-safety scanner passes across tracked public files and `dist/`.

- [ ] **Step 6: Commit résumé and profile pages**

```bash
git add src/components/pages src/pages src/data/profile.ts src/data/experience.ts src/styles/global.css tests/pages/profile-pages.test.ts
git diff --cached --check
git commit -m "feat: add work about and web resume pages"
```

### Task 8: Build the project index and localized project details

**Files:**
- Create: `src/components/pages/ProjectsPage.astro`
- Create: `src/layouts/ProjectLayout.astro`
- Create: `src/content/project-routes.ts`
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/[slug].astro`
- Create: `src/pages/zh/projects/index.astro`
- Create: `src/pages/zh/projects/[slug].astro`
- Modify: `src/styles/global.css`
- Create: `tests/content/project-routes.test.ts`

**Interfaces:**
- Consumes: `projects` content collection, locale, and `translationKey`
- Produces: paired project index pages, a tested frontmatter pairing contract, and five paired project detail routes

- [ ] **Step 1: Build the localized project index**

`ProjectsPage.astro` fetches non-draft projects for its locale, sorts them by `order`, groups them by category, and renders Core-AI first. Categories appear in the taxonomy order: Open Source, Applied AI Products, Medical AI, Research, Competitions.

- [ ] **Step 2: Build the project detail layout**

`ProjectLayout.astro` renders title, summary, role, period, technologies, public links, article body, contextual language switch, and a return link. Keep the link's accessible label in the source-page language; apply `lang` only to visible destination-language text. The Core-AI page displays an `Open source / 开源` label and shared-contributor wording.

- [ ] **Step 3: Implement English static project paths**

Create a shared route helper that validates every non-draft `translationKey` as a valid slug with exactly one English and one Chinese entry, rejecting duplicates and missing translations. In `src/pages/projects/[slug].astro`, `getStaticPaths()` consumes that helper for `locale === 'en'`, uses `translationKey` as `params.slug`, and passes the entry to `ProjectLayout`.

- [ ] **Step 4: Implement Chinese static project paths**

In `src/pages/zh/projects/[slug].astro`, use the same `translationKey` slug and filter `locale === 'zh'`. This guarantees contextual switching between matching route paths.

- [ ] **Step 5: Verify project route pairing**

Run:

```bash
npm run check
npm run build
for slug in core-ai applied-ai-products medical-ai research competitions; do
  test -f "dist/projects/$slug/index.html"
  test -f "dist/zh/projects/$slug/index.html"
done
rg -n "open-source AI Agent framework" dist/projects/core-ai/index.html
rg -n "开源 AI Agent 框架" dist/zh/projects/core-ai/index.html
```

Expected: ten project detail pages exist; Core-AI positioning is correct in both languages.

- [ ] **Step 6: Commit project routes**

```bash
git add src/components/pages/ProjectsPage.astro src/layouts/ProjectLayout.astro src/content/project-routes.ts src/pages/projects src/pages/zh/projects src/styles/global.css tests/content/project-routes.test.ts
git diff --cached --check
git commit -m "feat: add bilingual project case studies"
```

### Task 9: Add raster social cards, favicon, bilingual 404, and machine-readable SEO

**Files:**
- Create: `scripts/generate-og.mjs`
- Create: `public/og/home.png`
- Create: `public/og/core-ai.png`
- Create: `public/favicon.png`
- Create: `src/pages/404.astro`
- Modify: `src/components/SeoHead.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: approved visual tokens and headline copy
- Produces: social images, favicon, bilingual error recovery, and Person structured data

- [ ] **Step 1: Implement deterministic PNG generation**

Create `scripts/generate-og.mjs` using Sharp. Render a 1200 × 630 cool-paper background with carbon rules, signal-blue labels, and these exact cards:

- Home: `XANDER XU` and `MODELS ARE ONLY USEFUL WHEN THEY SHIP.`
- Core-AI: `CORE-AI` and `OPEN-SOURCE AI AGENT FRAMEWORK`

Generate a 64 × 64 PNG favicon with a carbon `X/` mark on signal blue. The script writes only PNG files; no SVG is shipped to `public/`.

- [ ] **Step 2: Generate and inspect dimensions**

Run:

```bash
npm run generate:og
file public/og/home.png public/og/core-ai.png public/favicon.png
```

Expected: home and Core-AI images are 1200 × 630 PNG; favicon is 64 × 64 PNG.

- [ ] **Step 3: Add bilingual 404 recovery**

Create `src/pages/404.astro` with English and Chinese headings, short explanations, and visible links to `/`, `/zh/`, `/projects/`, and `/zh/projects/`. The page uses `BaseLayout` but does not guess the visitor's language.

- [ ] **Step 4: Finish structured metadata**

Add favicon link in `BaseLayout`. Ensure `SeoHead` outputs `og:image` only when provided, uses absolute URLs, emits Person JSON-LD on home pages, and emits project/article metadata on project routes.

- [ ] **Step 5: Build and verify metadata**

Run:

```bash
npm run build
test -f dist/404.html
rg -n "hreflang=\"zh-CN\"|application/ld\+json|og:image" dist/index.html dist/projects/core-ai/index.html
```

Expected: 404 exists; home and Core-AI contain paired hreflang, JSON-LD, and absolute social image URLs.

- [ ] **Step 6: Commit error and social assets**

```bash
git add scripts/generate-og.mjs public src/pages/404.astro src/components/SeoHead.astro src/layouts/BaseLayout.astro
git diff --cached --check
git commit -m "feat: add social metadata and error page"
```

### Task 10: Add CI, link checks, Lighthouse gates, and project documentation

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `.lighthouserc.json`
- Create: `lychee.toml`
- Create: `README.md`

**Interfaces:**
- Consumes: npm scripts and static `dist/`
- Produces: repeatable quality-gated GitHub Pages deployment

- [ ] **Step 1: Configure Lighthouse routes and thresholds**

Create `.lighthouserc.json` auditing `/`, `/zh/`, `/projects/core-ai/`, and `/zh/projects/core-ai/`, with `staticDistDir: "./dist"`, three runs per URL, and error-level minimum scores of `0.95` for performance, accessibility, best-practices, and SEO.

- [ ] **Step 2: Configure link checking**

Create `lychee.toml` with `root_dir = "dist"`, accepted status codes `200`, `204`, `301`, `302`, `307`, and `308`, retries `2`, timeout `20`, and exclusions only for `mailto:` and authenticated LinkedIn responses that reject CI bots. Internal link failures remain fatal.

- [ ] **Step 3: Create the GitHub Pages workflow**

Create `.github/workflows/deploy.yml` with:

- triggers: pushes to `main` and manual dispatch
- permissions: `contents: read`, `pages: write`, `id-token: write`
- concurrency group `pages`
- `actions/checkout@v7`
- `actions/setup-node@v7` using Node `24.18.0` and npm cache
- `npm ci`, `npm test`, `npm run check`, `npm run generate:og`, `npm run build`
- `lycheeverse/lychee-action@v2.9.0` against `dist/`
- `npx @lhci/cli@0.15.1 autorun`
- `actions/upload-pages-artifact@v5`
- `actions/deploy-pages@v5`

Keep deployment after every required gate; do not use `continue-on-error` for Lighthouse or link failures.

- [ ] **Step 4: Write the repository README**

Document the site's purpose, bilingual route model, exact local commands, content-pair filename convention, public-safety rules, build gates, and GitHub Pages deployment flow. State that source code may be MIT-licensed while personal content and photography remain © Xander Xu.

- [ ] **Step 5: Run the full local gate**

Run:

```bash
npm ci
npm test
npm run check
npm run generate:og
npm run build
npx @lhci/cli@0.15.1 autorun
```

Expected: all tests pass, all translation pairs validate, the build succeeds, and every Lighthouse category meets 0.95.

- [ ] **Step 6: Commit CI and documentation**

```bash
git add .github .lighthouserc.json lychee.toml README.md
git diff --cached --check
git commit -m "ci: add portfolio release gates"
```

### Task 11: Perform visual, content, privacy, and responsive release review

**Files:**
- Modify only files implicated by review findings

**Interfaces:**
- Consumes: the complete local site
- Produces: a reviewed release candidate with no known content, accessibility, privacy, or visual defects

- [ ] **Step 1: Start the local preview**

Run `npm run dev` in a retained session and record the exact local URL printed by Astro.

- [ ] **Step 2: Review representative pages at four widths**

Inspect English and Chinese home, Work, Projects, Core-AI, About, Resume, and 404 pages at 360, 768, 1024, and 1440 px. Confirm no clipping, overlap, horizontal overflow, broken CJK glyphs, weak contrast, or inconsistent section spacing.

- [ ] **Step 3: Review behavior and accessibility**

Keyboard through navigation, language switch, project cards, external links, mobile menu, and print control. Confirm focus is always visible, the language switch preserves page context, the mobile menu exposes correct ARIA state, and reduced-motion mode removes the coordinated hero animation.

- [ ] **Step 4: Run privacy and claim scans**

Run:

```bash
npm run scan:public-safety
```

Expected: no private phone, restricted internal identifier, credential-like label, or sole-authorship claim appears in tracked public files or `dist/`.

- [ ] **Step 5: Re-run the complete gate after corrections**

Run:

```bash
npm test
npm run check
npm run generate:og
npm run build
npx @lhci/cli@0.15.1 autorun
git diff --check
```

Expected: all commands pass after the final visual/content corrections.

- [ ] **Step 6: Commit review corrections if any**

```bash
git diff --name-only -z | xargs -0 git add --
git diff --cached --check
git commit -m "fix: polish bilingual portfolio release"
```

If review required no file changes, do not create an empty commit.

### Task 12: Create the GitHub repository, deploy Pages, and verify the live site

**Files:**
- No source changes expected unless live verification finds a defect

**Interfaces:**
- Consumes: reviewed local `main` branch and authenticated GitHub CLI account `Canqiang`
- Produces: public repository `Canqiang/Canqiang.github.io` and live Pages URL

- [ ] **Step 1: Reconfirm remote target is absent**

Run:

```bash
gh auth status
gh repo view Canqiang/Canqiang.github.io --json nameWithOwner,url,visibility
```

Expected before creation: authenticated as `Canqiang`; repository lookup reports that the repository does not exist. If a repository exists, stop and inspect it rather than overwriting or force-pushing.

- [ ] **Step 2: Create the public GitHub repository and push main**

Run:

```bash
gh repo create Canqiang/Canqiang.github.io --public --source=. --remote=origin --push
```

Expected: `origin` is `https://github.com/Canqiang/Canqiang.github.io.git`, and `main` tracks `origin/main`.

- [ ] **Step 3: Enable GitHub Pages through Actions**

Run:

```bash
gh api --method POST repos/Canqiang/Canqiang.github.io/pages -f build_type=workflow
```

If Pages is already initialized by the workflow, verify its current configuration with:

```bash
gh api repos/Canqiang/Canqiang.github.io/pages
```

Expected: `build_type` is `workflow` and the site URL is `https://canqiang.github.io/`.

- [ ] **Step 4: Wait for deployment workflow completion**

Run:

```bash
gh run list --repo Canqiang/Canqiang.github.io --workflow deploy.yml --limit 1
gh run watch --repo Canqiang/Canqiang.github.io --exit-status
```

Expected: build, tests, link check, Lighthouse, artifact upload, and Pages deploy all complete successfully.

- [ ] **Step 5: Verify live route and metadata matrix**

Run:

```bash
for url in \
  https://canqiang.github.io/ \
  https://canqiang.github.io/zh/ \
  https://canqiang.github.io/projects/core-ai/ \
  https://canqiang.github.io/zh/projects/core-ai/ \
  https://canqiang.github.io/resume/ \
  https://canqiang.github.io/zh/resume/ \
  https://canqiang.github.io/does-not-exist; do
  curl -L --fail-with-body --max-time 20 -o /dev/null -w "%{http_code} %{url_effective}\n" "$url"
done
```

Expected: all real routes return 200; the missing route resolves to the custom Pages 404 behavior without exposing a server error.

- [ ] **Step 6: Verify public content and contextual language switching manually**

Open the live English home, Chinese home, and Core-AI case study. Confirm the hero, speaking photo, current ChanceTop dates, open-source wording, project language switch, social cards, and mobile navigation all match the reviewed local release.

- [ ] **Step 7: Record final provenance**

Run:

```bash
git status --short --branch
git rev-parse HEAD
gh run list --repo Canqiang/Canqiang.github.io --workflow deploy.yml --limit 1
gh api repos/Canqiang/Canqiang.github.io/pages --jq '{html_url, status, build_type}'
```

Expected: clean `main` tracking `origin/main`, a successful workflow run, and live Pages metadata pointing to `https://canqiang.github.io/`.
