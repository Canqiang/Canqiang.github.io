# Portfolio Redesign — "Research Log" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the light "Technical Field Notes" visual system with a dark-default "Research Log" identity (amber accent, serif display titles, numbered homepage flow, and a dark/light theme toggle), keeping every route, bilingual content pair, schema, and public-safety rule unchanged.

**Architecture:** This is a reskin plus a homepage re-sequence, not a rebuild. `src/styles/global.css` moves to a semantic two-theme token set (dark default, `[data-theme="light"]` overrides, print override). A tiny inline `<head>` script sets `data-theme` before first paint (no FOUC). The homepage is rebuilt into a numbered single-page flow (LOG 00 → 01 → 02 → 03 → 04) from new presentational components; all sub-pages are restyled through the shared tokens.

**Tech Stack:** Astro 7.1.1 (static), TypeScript 6.0.3, Vitest 4.1.10, `@fontsource/spectral` (new Latin serif), `@fontsource-variable/ibm-plex-sans` + `@fontsource/ibm-plex-mono` (kept), system CJK serif stack for Chinese titles, Sharp 0.35.3 (OG cards), GitHub Pages.

## Global Constraints

Copied verbatim from the spec; every task implicitly includes these.

- Node ≥ 24.18.0; npm scripts unchanged in name (`dev`, `check`, `test`, `build`, `generate:og`, `scan:public-safety`, `validate:build-output`).
- English is served at `/`; Chinese under `/zh/`; no browser-language redirect. No route, page, nav item, or content entry is added or removed.
- Every required content item keeps both `en` and `zh` variants sharing one `translationKey`; the translation validator must stay green.
- Core-AI is described as a team-built open-source AI Agent framework; Xander is a contributor — never imply sole authorship.
- Kaggle stays one achievement peer — no hero stat, no nav item, no dedicated homepage section.
- No runtime GitHub/Kaggle API calls. Static output only.
- Do not publish a phone number or any private hostname, credential, customer data, or unpublished metric. `npm run scan:public-safety` must stay green.
- Dark is the default/fallback theme; a stored choice wins over `prefers-color-scheme`; both themes must pass WCAG AA for text and for the amber accent used as a link/label.
- Accent hexes: dark `#D6A350`, light `#9A6414`. Dark canvas `#0C0E12`; light canvas `#F6F1E7`.
- Support 360 / 768 / 1024 / 1440 px layouts, keyboard navigation, visible focus, descriptive alt text, and reduced motion.
- Release targets: Lighthouse Performance, Accessibility, Best-Practices, SEO ≥ 0.95 on `/`, `/zh/`, `/projects/core-ai/`, `/zh/projects/core-ai/`.
- Printing any page (from either screen theme) yields ink-on-white output.
- Keep each commit limited to the task being implemented.

**Spec:** `docs/superpowers/specs/2026-07-20-portfolio-redesign-research-log-design.md`

---

## File Map

**Created:**
- `src/components/ThemeToggle.astro` — dark/light toggle button + persistence script
- `src/components/FieldCards.astro` — "01 / Current practice" four field cards
- `src/components/CareerAxis.astro` — "02 / Career axis" horizontal timeline
- `tests/design/theme-system.test.ts` — source assertions for tokens + no-FOUC + toggle
- `tests/design/homepage-flow.test.ts` — source assertions for the numbered homepage
- `tests/data/redesign-data.test.ts` — shape assertions for new `fieldCards` / `careerAxis`

**Modified:**
- `package.json` — add `@fontsource/spectral`, remove `@fontsource/barlow-condensed`
- `src/styles/global.css` — two-theme token system, restyle, print token override
- `src/layouts/BaseLayout.astro` — inline no-FOUC theme script + `theme-color` metas
- `src/components/Header.astro` — mount `ThemeToggle`
- `src/components/Footer.astro` — add build stamp (`build <sha> · astro · <date>`)
- `src/components/Hero.astro` — text-only LOG 00 hero (drop `Picture`/photo)
- `src/components/AchievementIndex.astro` — condensed evidence cells (counts + link)
- `src/components/pages/HomePage.astro` — numbered LOG 00 → 04 flow
- `src/pages/404.astro` — migrate scoped `<style>` to new tokens
- `src/data/site.ts` — add `fieldCards` and `careerAxis` typed bilingual data
- `scripts/generate-og.mjs` — new palette + serif font + "RESEARCH LOG" footer
- `scripts/validate-build-output.mjs` — assert `theme-color` meta on every page

**Retired:**
- `src/components/ExperienceTimeline.astro` — homepage-only; replaced by `CareerAxis`
  (WorkPage does **not** import it; verified). Its `.experience-timeline*` CSS is removed in Task 2.

**Untouched (styled only through shared tokens):** `WorkPage`, `AboutPage`, `ResumePage`, `ProjectLayout`, `ProjectCard`, `ProjectGrid`, `FieldIndexRail` (still used by WorkPage), `ContactLinks`, `SeoHead`.

---

## Token Migration Map (used by Task 2)

The current stylesheet overloads a few tokens; this table is the authoritative old→new mapping. `--carbon` is split by role.

| Old token / value | New token | Dark value | Light value |
| --- | --- | --- | --- |
| `--paper-cool` (page bg) | `--bg` | `#0C0E12` | `#F6F1E7` |
| _(new: card/cell bg)_ | `--bg-raised` | `#0E1016` | `#FBF7EE` |
| `--carbon` **as text/border color** | `--text` | `#E7E3DA` | `#211D17` |
| `--carbon` **as a fill/gutter/hover bg** | `--rule` (gutters) or `--text` (invert blocks) | see Task 2 inversion list | — |
| `--graphite` (supporting text) | `--text-muted` | `#A8A29E` | `#6B6459` |
| _(new: mono captions/stamps)_ | `--text-dim` | `#6F6A60` | `#948B7A` |
| `--signal-blue` (accent) | `--accent` | `#D6A350` | `#9A6414` |
| `--circuit-violet` (2nd accent) | `--accent` | folds into amber | folds into amber |
| `--signal-coral` (rare emphasis) | `--accent` | folds into amber | folds into amber |
| `--rule` (hairline) | `--rule` | `#23262E` | `#E2D9C7` |

`--content-width`, `.shell`, `--font-body`, `--font-mono` are unchanged. `--font-display` changes from Barlow Condensed to the serif stack (Task 1).

---

## Task 1: Fonts and dependencies

**Files:**
- Modify: `package.json` (dependencies)
- Modify: `src/styles/global.css:1-19` (imports + `--font-display`)

**Interfaces:**
- Produces: `--font-display: 'Spectral', <cjk serif stack>, Georgia, serif` available to all later CSS.

- [ ] **Step 1: Install the serif, remove Barlow**

```bash
npm install @fontsource/spectral@5
npm uninstall @fontsource/barlow-condensed
```

Expected: `package.json` gains `"@fontsource/spectral"` and loses `"@fontsource/barlow-condensed"`; `package-lock.json` updates.

- [ ] **Step 2: Swap the font imports and display token in `global.css`**

Replace lines 1–19 (the `@import`s and `:root` font block through `--font-mono`) so the Barlow imports become Spectral and the display token is the serif stack. Exact new top-of-file:

```css
@import '@fontsource/spectral/500.css';
@import '@fontsource/spectral/600.css';
@import '@fontsource-variable/ibm-plex-sans';
@import '@fontsource/ibm-plex-mono/400.css';
@import '@fontsource/ibm-plex-mono/600.css';

:root {
  --content-width: 73.75rem;
  --font-display: 'Spectral', 'Songti SC', 'STSong', 'Noto Serif SC', 'SimSun', Georgia, serif;
  --font-body: 'IBM Plex Sans Variable', 'PingFang SC', 'Noto Sans CJK SC', 'Microsoft YaHei', sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}
```

Note: the color tokens that were in this `:root` move into the theme blocks added in Task 2. Leaving them out here is intentional — Task 2 adds them back, per theme.

- [ ] **Step 3: Verify the dev server boots and fonts resolve**

Run: `npm run dev` then open `http://localhost:4321/` briefly; confirm no missing-import error in the terminal. Stop the server.
Expected: no "Failed to resolve import '@fontsource/barlow-condensed'".

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/styles/global.css
git commit -m "build: swap Barlow Condensed for Spectral serif display face"
```

---

## Task 2: Two-theme token system in `global.css`

This is the core reskin. Add the semantic tokens (dark default + light + print), migrate every existing rule via the mapping table, fix the hardcoded-inversion rules listed below, and delete the retired `.experience-timeline*` block.

**Files:**
- Modify: `src/styles/global.css` (throughout)
- Test: `tests/design/theme-system.test.ts`

**Interfaces:**
- Produces: CSS custom properties `--bg`, `--bg-raised`, `--text`, `--text-muted`, `--text-dim`, `--accent`, `--rule` resolved per `:root` / `:root[data-theme="light"]`, consumed by every component.

- [ ] **Step 1: Write the failing test**

Create `tests/design/theme-system.test.ts`:

```ts
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../..', import.meta.url));
const read = (p: string) => readFile(`${root}/${p}`, 'utf8');

describe('two-theme token system', () => {
  it('defines dark defaults and a light override with the approved hexes', async () => {
    const css = await read('src/styles/global.css');
    expect(css).toMatch(/:root\s*\{[^}]*--bg:\s*#0C0E12/i);
    expect(css).toMatch(/--accent:\s*#D6A350/i);
    expect(css).toMatch(/:root\[data-theme="light"\]\s*\{[^}]*--bg:\s*#F6F1E7/i);
    expect(css).toMatch(/:root\[data-theme="light"\][^{]*\{[^}]*--accent:\s*#9A6414/i);
  });

  it('drops every legacy token name', async () => {
    const css = await read('src/styles/global.css');
    for (const legacy of ['--paper-cool', '--carbon', '--signal-blue', '--circuit-violet', '--signal-coral', '--graphite']) {
      expect(css, `legacy token ${legacy} still present`).not.toContain(legacy);
    }
  });

  it('forces ink-on-white tokens inside the print block', async () => {
    const css = await read('src/styles/global.css');
    const printBlock = css.slice(css.indexOf('@media print'));
    expect(printBlock).toMatch(/--bg:\s*#fff/i);
    expect(printBlock).toMatch(/--text:\s*#000/i);
  });
});
```

- [ ] **Step 2: Run it to verify failure**

Run: `npx vitest run tests/design/theme-system.test.ts`
Expected: FAIL (legacy tokens still present, no `--bg`).

- [ ] **Step 3: Add the theme token blocks**

Directly after the `:root { … --font-mono … }` block from Task 1, insert the color themes:

```css
:root {
  --bg: #0C0E12;
  --bg-raised: #0E1016;
  --text: #E7E3DA;
  --text-muted: #A8A29E;
  --text-dim: #6F6A60;
  --accent: #D6A350;
  --rule: #23262E;
  color-scheme: dark;
}

:root[data-theme="light"] {
  --bg: #F6F1E7;
  --bg-raised: #FBF7EE;
  --text: #211D17;
  --text-muted: #6B6459;
  --text-dim: #948B7A;
  --accent: #9A6414;
  --rule: #E2D9C7;
  color-scheme: light;
}
```

Then update the base element rules near the top: `html`/`body` `background` and `color` must reference `var(--bg)`/`var(--text)`; delete the old `color-scheme: light;` on `html` (now theme-driven). `:focus-visible` outline → `var(--accent)`.

- [ ] **Step 4: Mechanically migrate every remaining rule via the map**

Apply the Token Migration Map to the rest of the file. Concretely:
- `var(--paper-cool)` → `var(--bg)` for page-level backgrounds; → `var(--bg-raised)` for grid **cells** (`.project-card`, `.achievement-cell`, `.about-evidence`, `.field-index__link::before`).
- `var(--graphite)` → `var(--text-muted)`; where it labels mono captions/`small`/detail text, → `var(--text-dim)`.
- `var(--signal-blue)`, `var(--circuit-violet)`, `var(--signal-coral)` → `var(--accent)`.
- `var(--carbon)` used as **text or border color** → `var(--text)`.
- `var(--carbon)` used as a **grid gutter fill** (`.project-grid`, `.achievement-grid`, `.project-index__cards`, `.about-evidence-grid` — the `gap:1px; background:` containers, and any `border: 1px solid var(--carbon)`) → `var(--rule)`.

- [ ] **Step 5: Fix the hardcoded-inversion rules (verbatim)**

These rules assumed a light theme (dark bg + `white` text on hover/active). Replace each with:

```css
::selection { color: var(--bg); background: var(--accent); }

.skip-link { color: var(--bg); background: var(--text); }

.site-header__menu-button[aria-expanded='true'] { color: var(--bg); background: var(--text); }

.project-card:hover,
.project-card:focus-within { color: var(--text); background: var(--bg-raised); box-shadow: inset 0 0 0 1px var(--accent); }
.project-card:hover .project-card__meta,
.project-card:focus-within .project-card__meta { color: var(--text-muted); }

.portfolio-hero__action--primary { color: var(--bg); border-color: var(--accent); background: var(--accent); }
.portfolio-hero__action:hover { color: var(--bg); border-color: var(--accent); background: var(--accent); }

.project-detail__status { color: var(--bg); background: var(--accent); }

.portfolio-contact__resume { color: var(--bg); background: var(--accent); }
.portfolio-contact__resume:hover { background: var(--text); color: var(--bg); }

.resume-print-button { color: var(--bg); border-color: var(--accent); background: var(--accent); }
.resume-print-button:hover { border-color: var(--text); background: var(--text); }
```

- [ ] **Step 6: Redefine `.display` and delete retired CSS**

- Change `.display { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; }` to drop `text-transform: uppercase` and use `font-weight: 600` (serif titles are mixed-case, not uppercase). Keep the class name.
- Remove the entire `.experience-timeline`, `.experience-timeline__item`, `.experience-timeline__period`, `.experience-timeline__heading`, `.experience-timeline__summary`, `.experience-timeline__highlights` rule set and the `.experience-timeline` line inside the `@media (min-width: 38rem)` grid block and the `@media print` `.experience-timeline__item` reference (CareerAxis replaces it).

- [ ] **Step 7: Add the print token override**

At the very top of the existing `@media print { … }` block, add a `:root` override so all `var()` resolve to ink-on-white regardless of `data-theme`:

```css
@media print {
  :root, :root[data-theme="light"], :root[data-theme="dark"] {
    --bg: #fff; --bg-raised: #fff; --text: #000;
    --text-muted: #333; --text-dim: #555; --accent: #000; --rule: #000;
    color-scheme: light;
  }
  /* …existing print rules remain… */
}
```

- [ ] **Step 8: Run the test + type check**

Run: `npx vitest run tests/design/theme-system.test.ts && npx astro check`
Expected: PASS; astro check reports 0 errors.

- [ ] **Step 9: Commit**

```bash
git add src/styles/global.css tests/design/theme-system.test.ts
git commit -m "feat: dark-default two-theme token system in global.css"
```

---

## Task 3: No-FOUC theme boot + theme-color metas

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (`<head>`)
- Test: `tests/design/theme-system.test.ts` (extend)

**Interfaces:**
- Consumes: `data-theme` tokens from Task 2.
- Produces: `document.documentElement.dataset.theme` set before first paint; `localStorage` key `theme` ∈ `{'light','dark'}` as the source of truth for Task 4's toggle.

- [ ] **Step 1: Extend the test (failing)**

Append to `tests/design/theme-system.test.ts`:

```ts
describe('no-FOUC boot', () => {
  it('sets data-theme from localStorage/OS before paint, dark fallback', async () => {
    const layout = await read('src/layouts/BaseLayout.astro');
    expect(layout).toContain('is:inline');
    expect(layout).toContain("localStorage.getItem('theme')");
    expect(layout).toContain('prefers-color-scheme: light');
    expect(layout).toContain('document.documentElement.dataset.theme');
  });

  it('emits per-scheme theme-color metas with the approved canvases', async () => {
    const layout = await read('src/layouts/BaseLayout.astro');
    expect(layout).toMatch(/theme-color"[^>]*prefers-color-scheme: dark[^>]*#0C0E12/i);
    expect(layout).toMatch(/theme-color"[^>]*prefers-color-scheme: light[^>]*#F6F1E7/i);
  });
});
```

Run: `npx vitest run tests/design/theme-system.test.ts` → Expected: FAIL.

- [ ] **Step 2: Add the inline boot script + metas**

In `BaseLayout.astro`, inside `<head>`, immediately after `<meta charset="UTF-8" />`, add (order matters — this must be the first executable thing):

```astro
    <script is:inline>
      (function () {
        try {
          var stored = localStorage.getItem('theme');
          var theme = stored === 'light' || stored === 'dark'
            ? stored
            : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
          document.documentElement.dataset.theme = theme;
        } catch (e) {
          document.documentElement.dataset.theme = 'dark';
        }
      })();
    </script>
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0C0E12" />
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F6F1E7" />
```

- [ ] **Step 3: Verify no flash for a light-preferring visit**

Run: `npm run dev`. In the browser devtools, set Rendering → emulate `prefers-color-scheme: light`, hard-reload `/`. Confirm the page paints light immediately (no dark flash). Toggle back to dark; reload; paints dark. Stop server.
Expected: no flash of the wrong theme on reload in either emulation.

- [ ] **Step 4: Run test + commit**

Run: `npx vitest run tests/design/theme-system.test.ts` → Expected: PASS.

```bash
git add src/layouts/BaseLayout.astro tests/design/theme-system.test.ts
git commit -m "feat: no-FOUC theme boot script and per-scheme theme-color"
```

---

## Task 4: Site chrome — ThemeToggle, Header mount, Footer build stamp

**Files:**
- Create: `src/components/ThemeToggle.astro`
- Modify: `src/components/Header.astro` (import + place toggle)
- Modify: `src/components/Footer.astro` (build stamp)
- Test: `tests/design/theme-system.test.ts` (extend)

**Interfaces:**
- Consumes: `localStorage` key `theme` and `data-theme` from Task 3.
- Produces: a header control that flips and persists the theme.

- [ ] **Step 1: Extend the test (failing)**

Append to `tests/design/theme-system.test.ts`:

```ts
describe('theme toggle + build stamp', () => {
  it('ships an accessible, persisting toggle mounted in the header', async () => {
    const [toggle, header] = await Promise.all([
      read('src/components/ThemeToggle.astro'),
      read('src/components/Header.astro'),
    ]);
    expect(toggle).toContain('data-theme-toggle');
    expect(toggle).toContain('aria-label');
    expect(toggle).toContain("localStorage.setItem('theme'");
    expect(header).toContain("import ThemeToggle from './ThemeToggle.astro'");
    expect(header).toContain('<ThemeToggle');
  });

  it('shows a build stamp in the footer', async () => {
    const footer = await read('src/components/Footer.astro');
    expect(footer).toContain('site-footer__build');
    expect(footer).toContain('GITHUB_SHA');
  });
});
```

Run: `npx vitest run tests/design/theme-system.test.ts` → Expected: FAIL.

- [ ] **Step 2: Create `ThemeToggle.astro`**

```astro
---
import type { Locale } from '../i18n/config';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const label = locale === 'en' ? 'Toggle color theme' : '切换配色主题';
---

<button class="theme-toggle no-print" type="button" data-theme-toggle aria-label={label}>
  <span class="theme-toggle__glyph" aria-hidden="true">◐</span>
</button>

<script>
  const button = document.querySelector('[data-theme-toggle]');
  if (button instanceof HTMLButtonElement) {
    button.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    });
  }
</script>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.75rem;
    min-height: 2.75rem;
    padding: 0;
    border: 1px solid var(--rule);
    border-radius: 0;
    color: var(--text-muted);
    background: transparent;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
  }
  .theme-toggle:hover { color: var(--accent); border-color: var(--accent); }
</style>
```

- [ ] **Step 3: Mount it in `Header.astro`**

Add `import ThemeToggle from './ThemeToggle.astro';` to the frontmatter imports. Inside the primary `<nav>`'s `<ul class="site-header__nav-list">`, add a final list item after the language link:

```astro
        <li class="site-header__nav-toggle"><ThemeToggle {locale} /></li>
```

(No change to the mobile menu script; the toggle is a normal nav child.)

- [ ] **Step 4: Add the Footer build stamp**

In `Footer.astro` frontmatter, after `const currentYear = …`, add:

```astro
const shortSha = (import.meta.env.GITHUB_SHA ?? process.env.GITHUB_SHA ?? '').slice(0, 7);
const buildDate = new Date().toISOString().slice(0, 10);
const buildStamp = `build ${shortSha || 'local'} · astro · ${buildDate}`;
```

Then inside `<div class="site-footer__inner shell">`, add as the last child:

```astro
    <p class="site-footer__build">{buildStamp}</p>
```

Add to `global.css` (near the other `.site-footer__*` rules):

```css
.site-footer__build {
  margin: 0;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.06em;
}
```

- [ ] **Step 5: Run tests, type check, manual toggle**

Run: `npx vitest run tests/design/theme-system.test.ts && npx astro check`
Then `npm run dev`, click the header toggle, confirm the whole page flips dark↔light and the choice survives a reload. Stop server.
Expected: tests PASS; toggle persists.

- [ ] **Step 6: Commit**

```bash
git add src/components/ThemeToggle.astro src/components/Header.astro src/components/Footer.astro src/styles/global.css tests/design/theme-system.test.ts
git commit -m "feat: theme toggle in header and build stamp in footer"
```

---

## Task 5: Text-only LOG 00 hero

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/styles/global.css` (`.portfolio-hero*` — drop photo rules, add log stamp)
- Test: `tests/design/homepage-flow.test.ts`

**Interfaces:**
- Consumes: `identity.role`, `identity.headline`, `identity.introduction` from `src/data/site.ts` (unchanged).
- Produces: a photo-free hero with a mono `LOG 00 · EST. 2017 · <role>` stamp and a serif headline.

- [ ] **Step 1: Write the failing test**

Create `tests/design/homepage-flow.test.ts`:

```ts
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../..', import.meta.url));
const read = (p: string) => readFile(`${root}/${p}`, 'utf8');

describe('LOG 00 hero', () => {
  it('is text-only and carries the log stamp', async () => {
    const hero = await read('src/components/Hero.astro');
    expect(hero).not.toContain('astro:assets');
    expect(hero).not.toContain('speakingPhoto');
    expect(hero).toContain('LOG 00');
    expect(hero).toContain('portfolio-hero__stamp');
  });
});
```

Run: `npx vitest run tests/design/homepage-flow.test.ts` → Expected: FAIL.

- [ ] **Step 2: Rewrite `Hero.astro`**

Replace the whole file with:

```astro
---
import { identity } from '../data/site';
import type { Locale } from '../i18n/config';
import { localizedPath } from '../i18n/routes';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const copy = locale === 'en'
  ? { work: 'View selected work', resume: 'View résumé', tagline: identity.headline.en }
  : { work: '查看精选工作', resume: '查看简历', tagline: identity.headline.en };
const stamp = `LOG 00 · EST. 2017 · ${identity.role[locale]}`;
const showEnglishSubline = locale === 'zh';
---

<section class="portfolio-hero shell" aria-labelledby="hero-title">
  <div class="portfolio-hero__copy">
    <p class="portfolio-hero__stamp mono">{stamp}</p>
    <h1 id="hero-title" class="portfolio-hero__title">{identity.headline[locale]}</h1>
    {showEnglishSubline && <p class="portfolio-hero__subline">{identity.headline.en}</p>}
    <p class="portfolio-hero__summary">{identity.introduction[locale]}</p>
    <div class="portfolio-hero__actions no-print">
      <a class="portfolio-hero__action portfolio-hero__action--primary" href="#current-practice">{copy.work}</a>
      <a class="portfolio-hero__action" href={localizedPath(locale, 'resume')}>{copy.resume}</a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update hero CSS in `global.css`**

- Delete `.portfolio-hero__visual`, `.portfolio-hero__visual img`, `.portfolio-hero__event-label`, and the `@keyframes field-image-reveal` / `field-label-slide` and their references; delete the `.portfolio-hero { grid-template-columns … }` two-column rule in `@media (min-width: 56rem)` and the `.portfolio-hero__visual { order: 2 }` line.
- Make `.portfolio-hero` a single column: `display: grid; gap: 0; padding-block: clamp(3.5rem, 8vw, 7.5rem); min-height: calc(100vh - 4.5rem);`
- Change `.portfolio-hero__title` to serif: `font-family: var(--font-display); font-weight: 600; text-transform: none; font-size: clamp(2.6rem, 7vw, 4.6rem); line-height: 1.28; letter-spacing: 0;` (keep the existing `field-note-reveal` animation).
- Add:

```css
.portfolio-hero__stamp {
  margin: 0 0 1.25rem;
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.portfolio-hero__subline {
  margin: 0.85rem 0 0;
  color: var(--text-muted);
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1rem, 2.2vw, 1.25rem);
}
```

- [ ] **Step 4: Run test + type check, then commit**

Run: `npx vitest run tests/design/homepage-flow.test.ts && npx astro check` → Expected: PASS, 0 errors.

```bash
git add src/components/Hero.astro src/styles/global.css tests/design/homepage-flow.test.ts
git commit -m "feat: text-only LOG 00 serif hero"
```

---

## Task 6: FieldCards (01 / Current practice) + data

**Files:**
- Modify: `src/data/site.ts` (add `fieldCards`)
- Create: `src/components/FieldCards.astro`
- Test: `tests/data/redesign-data.test.ts`

**Interfaces:**
- Consumes: `localizedPath(locale, 'work')` and `fieldIndex` keys for `#anchor` targets.
- Produces: `export const fieldCards: FieldCard[]` where `FieldCard = { key: string; name: Localized; scope: Localized; span: string; orgs: Localized }`.

- [ ] **Step 1: Write the failing data test**

Create `tests/data/redesign-data.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { fieldCards, careerAxis } from '../../src/data/site';

describe('fieldCards', () => {
  it('covers the four career fields in order with bilingual scope + orgs', () => {
    expect(fieldCards.map((c) => c.key)).toEqual([
      'bioinformatics', 'medical-ai', 'llm-products', 'agent-systems',
    ]);
    for (const card of fieldCards) {
      expect(card.name.en && card.name.zh).toBeTruthy();
      expect(card.scope.en && card.scope.zh).toBeTruthy();
      expect(card.orgs.en && card.orgs.zh).toBeTruthy();
      expect(card.span).toMatch(/\d{4}/);
    }
  });
});

describe('careerAxis', () => {
  it('lists chronological stops with year, org, role, and a field anchor', () => {
    expect(careerAxis.length).toBeGreaterThanOrEqual(4);
    for (const stop of careerAxis) {
      expect(stop.year.en && stop.year.zh).toBeTruthy();
      expect(stop.org.en && stop.org.zh).toBeTruthy();
      expect(stop.role.en && stop.role.zh).toBeTruthy();
      expect(['bioinformatics', 'medical-ai', 'llm-products', 'agent-systems']).toContain(stop.field);
    }
  });
});
```

Run: `npx vitest run tests/data/redesign-data.test.ts` → Expected: FAIL (no such exports).

- [ ] **Step 2: Add `fieldCards` and `careerAxis` to `site.ts`**

Append to `src/data/site.ts` (types reuse the existing `Localized`):

```ts
export interface FieldCard {
  key: string;
  name: Localized;
  scope: Localized;
  span: string;
  orgs: Localized;
}

export const fieldCards: FieldCard[] = [
  {
    key: 'bioinformatics',
    name: { en: 'Bioinformatics', zh: '生物信息' },
    scope: { en: 'Drug-target prediction, multi-omics data systems, cryo-EM detection.', zh: '药物靶点、多组学数据系统、冷冻电镜识别。' },
    span: '2017 — 2018',
    orgs: { en: 'Tsinghua IIIS', zh: '清华交叉信息院' },
  },
  {
    key: 'medical-ai',
    name: { en: 'Medical AI', zh: '医疗 AI' },
    scope: { en: 'Pathology imaging, spatial omics, prognostic risk stratification.', zh: '病理图像、时空组学、预后风险分层。' },
    span: '2018 — 2023',
    orgs: { en: 'Jiyuan · BGI · Fapon', zh: '极元 / 华大 / 菲鹏' },
  },
  {
    key: 'llm-products',
    name: { en: 'LLM Products', zh: '大模型产品' },
    scope: { en: 'Medical RAG, multimodal agents, child-content safety.', zh: '医疗 RAG、多模态智能体、儿童内容安全。' },
    span: '2023 — 2025',
    orgs: { en: 'Jiyuan · Qudian', zh: '极元 / 趣店' },
  },
  {
    key: 'agent-systems',
    name: { en: 'Agent Systems', zh: '智能体系统' },
    scope: { en: 'Core-AI durable workflows and platform delivery.', zh: 'Core-AI 持久化工作流与平台交付。' },
    span: '2025 — Now',
    orgs: { en: 'ChanceTop · Core-AI', zh: '畅拓 / Core-AI' },
  },
];

export interface CareerStop {
  year: Localized;
  org: Localized;
  role: Localized;
  field: string;
}

export const careerAxis: CareerStop[] = [
  { year: { en: '2017', zh: '2017' }, org: { en: 'Tsinghua IIIS', zh: '清华 IIIS' }, role: { en: 'Research Assistant', zh: '科研助理' }, field: 'bioinformatics' },
  { year: { en: '2021', zh: '2021' }, org: { en: 'BGI Research', zh: '华大研究院' }, role: { en: 'Algorithm Lead', zh: '算法负责人' }, field: 'medical-ai' },
  { year: { en: '2023', zh: '2023' }, org: { en: 'Jiyuan Technology', zh: '极元科技' }, role: { en: 'Medical LLM Lead', zh: '医疗大模型技术负责人' }, field: 'llm-products' },
  { year: { en: 'Now', zh: '现在' }, org: { en: 'ChanceTop', zh: '畅拓科技' }, role: { en: 'AI Platform Engineer', zh: 'AI 平台研发工程师' }, field: 'agent-systems' },
];
```

Public-safety note: all values above are already-public résumé facts; no private data. Core-AI stays "Core-AI durable workflows and platform delivery" (contributor framing, not sole authorship).

- [ ] **Step 3: Run the data test**

Run: `npx vitest run tests/data/redesign-data.test.ts` → Expected: PASS.

- [ ] **Step 4: Create `FieldCards.astro`**

```astro
---
import { fieldCards } from '../data/site';
import type { Locale } from '../i18n/config';
import { localizedPath } from '../i18n/routes';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const workPath = localizedPath(locale, 'work');
---

<ol class="field-cards">
  {fieldCards.map((card, i) => (
    <li class="field-card">
      <a class="field-card__link" href={`${workPath}#${card.key}`}>
        <span class="field-card__tag mono">[{String(i + 1).padStart(2, '0')}]</span>
        <span class="field-card__name">{card.name[locale]}</span>
        <span class="field-card__scope">{card.scope[locale]}</span>
        <span class="field-card__meta mono">{card.span} · {card.orgs[locale]}</span>
      </a>
    </li>
  ))}
</ol>

<style>
  .field-cards {
    display: grid;
    gap: 1px;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid var(--rule);
    background: var(--rule);
  }
  .field-card { min-width: 0; }
  .field-card__link {
    display: grid;
    gap: 0.4rem;
    min-height: 100%;
    padding: clamp(1.1rem, 3vw, 1.6rem);
    background: var(--bg-raised);
    text-decoration: none;
    transition: box-shadow 160ms ease;
  }
  .field-card__link:hover,
  .field-card__link:focus-visible { box-shadow: inset 0 0 0 1px var(--accent); }
  .field-card__tag { color: var(--accent); font-size: 0.64rem; letter-spacing: 0.1em; }
  .field-card__name { font-family: var(--font-display); font-size: 1.15rem; font-weight: 600; color: var(--text); }
  .field-card__scope { color: var(--text-muted); font-size: 0.9rem; }
  .field-card__meta { margin-top: 0.35rem; color: var(--text-dim); font-size: 0.66rem; }
  @media (min-width: 38rem) { .field-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 56rem) { .field-cards { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
</style>
```

- [ ] **Step 5: Type check + commit**

Run: `npx astro check` → Expected: 0 errors.

```bash
git add src/data/site.ts src/components/FieldCards.astro tests/data/redesign-data.test.ts
git commit -m "feat: current-practice field cards and career data"
```

---

## Task 7: CareerAxis (02) + retire ExperienceTimeline

**Files:**
- Create: `src/components/CareerAxis.astro`
- Delete: `src/components/ExperienceTimeline.astro`
- Test: `tests/design/homepage-flow.test.ts` (extend)

**Interfaces:**
- Consumes: `careerAxis` (Task 6), `localizedPath(locale, 'work')`.
- Produces: a horizontal axis section; `<CareerAxis locale={locale} />`.

- [ ] **Step 1: Extend the test (failing)**

Append to `tests/design/homepage-flow.test.ts`:

```ts
describe('career axis', () => {
  it('renders the axis from careerAxis and links to full work', async () => {
    const axis = await read('src/components/CareerAxis.astro');
    expect(axis).toContain("from '../data/site'");
    expect(axis).toContain('careerAxis');
    expect(axis).toContain('career-axis__stop');
  });
});
```

Run: `npx vitest run tests/design/homepage-flow.test.ts` → Expected: FAIL.

- [ ] **Step 2: Create `CareerAxis.astro`**

```astro
---
import { careerAxis } from '../data/site';
import type { Locale } from '../i18n/config';
import { localizedPath } from '../i18n/routes';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const workPath = localizedPath(locale, 'work');
---

<div class="career-axis">
  <ol class="career-axis__track">
    {careerAxis.map((stop) => (
      <li class="career-axis__stop">
        <a class="career-axis__link" href={`${workPath}#${stop.field}`}>
          <span class="career-axis__year mono">{stop.year[locale]}</span>
          <span class="career-axis__org">{stop.org[locale]}</span>
          <span class="career-axis__role mono">{stop.role[locale]}</span>
        </a>
      </li>
    ))}
  </ol>
</div>

<style>
  .career-axis__track {
    display: grid;
    gap: 1.5rem 0;
    margin: 0;
    padding: 1.2rem 0 0;
    list-style: none;
    border-top: 1px solid var(--rule);
  }
  .career-axis__stop { position: relative; }
  .career-axis__stop::before {
    content: '';
    position: absolute;
    inset-block-start: -1.2rem;
    inset-inline-start: 0;
    width: 1px;
    height: 8px;
    background: var(--accent);
  }
  .career-axis__link { display: grid; gap: 0.15rem; text-decoration: none; }
  .career-axis__year { color: var(--accent); font-size: 0.7rem; }
  .career-axis__org { color: var(--text); font-size: 0.95rem; }
  .career-axis__role { color: var(--text-dim); font-size: 0.7rem; }
  @media (min-width: 48rem) {
    .career-axis__track { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; }
    .career-axis__stop { padding-inline-end: 1rem; }
  }
</style>
```

- [ ] **Step 3: Delete the retired component**

```bash
git rm src/components/ExperienceTimeline.astro
```

(Its CSS was removed in Task 2 Step 6. HomePage's import is removed in Task 9.)

- [ ] **Step 4: Run test + commit**

Run: `npx vitest run tests/design/homepage-flow.test.ts` → Expected: PASS (CareerAxis assertions; HomePage still references the old import until Task 9, so do not run `astro check` here — it is exercised in Task 9).

```bash
git add src/components/CareerAxis.astro tests/design/homepage-flow.test.ts
git commit -m "feat: horizontal career axis; retire vertical timeline"
```

---

## Task 8: Condensed evidence cells (03)

**Files:**
- Modify: `src/components/AchievementIndex.astro`
- Modify: `src/styles/global.css` (`.achievement-*` → evidence-cell look; keep grid)
- Test: `tests/design/homepage-flow.test.ts` (extend)

**Interfaces:**
- Consumes: `achievementGroups` (unchanged data), `localizedPath(locale, 'about')` for the "full record" link.
- Produces: four condensed count cells (papers / patents / open source / competitions) linking to the About evidence section.

- [ ] **Step 1: Extend the test (failing)**

Append to `tests/design/homepage-flow.test.ts`:

```ts
describe('evidence cells', () => {
  it('shows condensed counts and links to the About record', async () => {
    const ai = await read('src/components/AchievementIndex.astro');
    expect(ai).toContain('achievement-cell__count');
    expect(ai).toContain("localizedPath(locale, 'about')");
  });
});
```

Run: `npx vitest run tests/design/homepage-flow.test.ts` → Expected: FAIL.

- [ ] **Step 2: Rewrite `AchievementIndex.astro` to count cells**

```astro
---
import { achievementGroups, type AchievementGroup } from '../data/achievements';
import type { Locale } from '../i18n/config';
import { localizedPath } from '../i18n/routes';

interface Props {
  locale: Locale;
  groups?: AchievementGroup[];
}

const { locale, groups = achievementGroups } = Astro.props;
const expectedOrder = ['publications', 'patents', 'openSource', 'competitions'];
const ordered = expectedOrder.map((key) => {
  const group = groups.find((g) => g.key === key);
  if (!group) throw new Error(`Missing achievement group: ${key}`);
  return group;
});
const aboutPath = localizedPath(locale, 'about');
// Headline figure per group: a count, or a signature value for singletons.
const figure = (group: AchievementGroup) =>
  group.key === 'openSource' ? 'Core-AI'
  : group.key === 'competitions' ? '62 / 1,010'
  : String(group.items.length).padStart(2, '0');
const source = (group: AchievementGroup) => group.items[0].detail[locale];
---

<ul class="achievement-grid">
  {ordered.map((group) => (
    <li class="achievement-cell">
      <a class="achievement-cell__record" href={`${aboutPath}#record`}>
        <span class="achievement-cell__label mono">{group.label[locale]}</span>
        <span class="achievement-cell__count">{figure(group)}</span>
        <span class="achievement-cell__source mono">{source(group)}</span>
      </a>
    </li>
  ))}
</ul>
```

- [ ] **Step 3: Restyle the cells in `global.css`**

Replace the `.achievement-cell__label`, `.achievement-cell__title`, `.achievement-cell__list`, `.achievement-cell__item`, `.achievement-cell__link`, `.achievement-cell__detail` rules with:

```css
.achievement-cell { min-width: 0; min-height: 11rem; background: var(--bg-raised); }
.achievement-cell__record { display: grid; gap: 0.5rem; min-height: 100%; padding: clamp(1.1rem, 3vw, 1.6rem); text-decoration: none; transition: box-shadow 160ms ease; }
.achievement-cell__record:hover,
.achievement-cell__record:focus-visible { box-shadow: inset 0 0 0 1px var(--accent); }
.achievement-cell__label { color: var(--accent); font-size: 0.62rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
.achievement-cell__count { margin-top: 1.1rem; font-family: var(--font-display); font-size: clamp(1.7rem, 4vw, 2.4rem); font-weight: 600; color: var(--text); }
.achievement-cell__source { color: var(--text-dim); font-size: 0.66rem; line-height: 1.5; }
```

Confirm the About page has an anchor to receive `#record`: in `src/components/pages/AboutPage.astro`, ensure the record/evidence section element has `id="record"` (add it to the existing evidence section wrapper if absent).

- [ ] **Step 4: Run test + type check + commit**

Run: `npx vitest run tests/design/homepage-flow.test.ts && npx astro check` → Expected: PASS.

```bash
git add src/components/AchievementIndex.astro src/components/pages/AboutPage.astro src/styles/global.css tests/design/homepage-flow.test.ts
git commit -m "feat: condensed evidence cells linking to the About record"
```

---

## Task 9: Homepage numbered flow

**Files:**
- Modify: `src/components/pages/HomePage.astro`
- Modify: `src/styles/global.css` (numbered section header rule)
- Test: `tests/design/homepage-flow.test.ts` (extend)

**Interfaces:**
- Consumes: `Hero`, `FieldCards`, `CareerAxis`, `AchievementIndex`, `ContactLinks`.
- Produces: the LOG 00 → 01 → 02 → 03 → 04 page. No `ProjectGrid`, `FieldIndexRail`, or `ExperienceTimeline` on the homepage.

- [ ] **Step 1: Extend the test (failing)**

Append to `tests/design/homepage-flow.test.ts`:

```ts
describe('homepage numbered flow', () => {
  it('wires the new sections and drops the retired ones', async () => {
    const home = await read('src/components/pages/HomePage.astro');
    for (const used of ['Hero', 'FieldCards', 'CareerAxis', 'AchievementIndex', 'ContactLinks']) {
      expect(home, `missing ${used}`).toContain(used);
    }
    for (const gone of ['FieldIndexRail', 'ExperienceTimeline', 'ProjectGrid']) {
      expect(home, `should not import ${gone}`).not.toContain(gone);
    }
    expect(home).toContain('id="current-practice"');
    expect(home).toContain('portfolio-section__index');
  });
});
```

Run: `npx vitest run tests/design/homepage-flow.test.ts` → Expected: FAIL.

- [ ] **Step 2: Rewrite `HomePage.astro`**

```astro
---
import { achievementGroups } from '../../data/achievements';
import type { Locale } from '../../i18n/config';
import { localizedPath } from '../../i18n/routes';
import AchievementIndex from '../AchievementIndex.astro';
import CareerAxis from '../CareerAxis.astro';
import ContactLinks from '../ContactLinks.astro';
import FieldCards from '../FieldCards.astro';
import Hero from '../Hero.astro';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const copy = locale === 'en'
  ? {
      practice: 'Current practice', practiceLede: 'Four fields, from bioinformatics to agent systems.',
      axis: 'Career axis', axisLede: 'Eight years, condensed.', fullExperience: 'View full experience',
      record: 'Evidence index', recordLede: 'Publications, patents, open source, and competitions as peers.',
      contact: 'Contact', contactLede: 'For engineering roles, open-source collaboration, and research.', resume: 'View résumé',
    }
  : {
      practice: '当前实践', practiceLede: '四个领域，从生物信息到智能体系统。',
      axis: '生涯轴', axisLede: '八年，浓缩于此。', fullExperience: '查看完整经历',
      record: '证据索引', recordLede: '论文、专利、开源与竞赛，同等权重。',
      contact: '联系', contactLede: '欢迎就工程岗位、开源协作与研究交流联系我。', resume: '查看简历',
    };
---

<Hero {locale} />

<section id="current-practice" class="portfolio-section shell" aria-labelledby="practice-title">
  <header class="portfolio-section__header">
    <div>
      <p class="portfolio-section__index mono">01 /</p>
      <h2 id="practice-title" class="portfolio-section__title">{copy.practice}</h2>
    </div>
    <p class="portfolio-section__lede">{copy.practiceLede}</p>
  </header>
  <FieldCards {locale} />
</section>

<section class="portfolio-section shell" aria-labelledby="axis-title">
  <header class="portfolio-section__header">
    <div>
      <p class="portfolio-section__index mono">02 /</p>
      <h2 id="axis-title" class="portfolio-section__title">{copy.axis}</h2>
    </div>
    <div>
      <p class="portfolio-section__lede">{copy.axisLede}</p>
      <a class="portfolio-section__text-link" href={localizedPath(locale, 'work')}>{copy.fullExperience}</a>
    </div>
  </header>
  <CareerAxis {locale} />
</section>

<section class="portfolio-section shell" aria-labelledby="record-title">
  <header class="portfolio-section__header">
    <div>
      <p class="portfolio-section__index mono">03 /</p>
      <h2 id="record-title" class="portfolio-section__title">{copy.record}</h2>
    </div>
    <p class="portfolio-section__lede">{copy.recordLede}</p>
  </header>
  <AchievementIndex {locale} groups={achievementGroups} />
</section>

<section class="portfolio-section shell" aria-labelledby="contact-title">
  <header class="portfolio-section__header">
    <div>
      <p class="portfolio-section__index mono">04 /</p>
      <h2 id="contact-title" class="portfolio-section__title">{copy.contact}</h2>
    </div>
    <p class="portfolio-section__lede">{copy.contactLede}</p>
  </header>
  <div class="portfolio-contact">
    <ContactLinks {locale} />
    <a class="portfolio-contact__resume" href={localizedPath(locale, 'resume')}>{copy.resume}</a>
  </div>
</section>
```

- [ ] **Step 3: Add the numbered-index style in `global.css`**

Add near `.portfolio-section__eyebrow` (and keep `.portfolio-section__eyebrow` for other pages):

```css
.portfolio-section__index {
  margin: 0 0 0.75rem;
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
}
```

Also change `.portfolio-section__title` to serif mixed-case: `font-family: var(--font-display); font-weight: 600; text-transform: none; letter-spacing: 0;` (leave the existing `clamp()` size).

- [ ] **Step 4: Run tests + type check**

Run: `npx vitest run && npx astro check`
Expected: all suites PASS; astro check 0 errors (the retired-import references are now gone, so `astro check` is clean).

- [ ] **Step 5: Commit**

```bash
git add src/components/pages/HomePage.astro src/styles/global.css tests/design/homepage-flow.test.ts
git commit -m "feat: numbered LOG 00 to 04 homepage flow"
```

---

## Task 10: 404 page token migration

**Files:**
- Modify: `src/pages/404.astro` (scoped `<style>`)

**Interfaces:** none new.

- [ ] **Step 1: Migrate the scoped style tokens**

In `src/pages/404.astro`'s `<style>`, replace `var(--carbon)` → `var(--text)` where it is a border/text color, `background: var(--carbon)` (the grid gutter) → `var(--rule)`, `background: var(--paper-cool)` → `var(--bg-raised)`, and `background: var(--signal-blue)` → `var(--accent)`. Also change the `.display` heading reliance on uppercase if present (the class is now serif mixed-case from Task 2).

- [ ] **Step 2: Grep proves no legacy tokens remain anywhere**

Run: `! grep -rn 'var(--carbon\|var(--paper-cool\|var(--signal-blue\|var(--circuit-violet\|var(--graphite\|var(--signal-coral' src/`
Expected: exit 0 (no matches).

- [ ] **Step 3: Build the 404 and eyeball it**

Run: `npm run dev`, open `http://localhost:4321/404`, confirm dark theme + amber, then toggle to light. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/404.astro
git commit -m "style: migrate 404 page to the Research Log tokens"
```

---

## Task 11: Regenerate OG cards + validate theme-color

**Files:**
- Modify: `scripts/generate-og.mjs`
- Modify: `scripts/validate-build-output.mjs`

**Interfaces:**
- Produces: `public/og/home.png`, `public/og/core-ai.png`, `public/favicon.png` in the new palette; a build-time assertion that every page emits a `theme-color` meta.

- [ ] **Step 1: Update the OG generator palette and font**

In `scripts/generate-og.mjs`:
- Change `displayFontPath` to the Spectral 600 file: `'../node_modules/@fontsource/spectral/files/spectral-latin-600-normal.woff2'`. Update the `@font-face` `font-family` to `'Spectral Embedded'` and `.display { font-family: 'Spectral Embedded', serif; font-weight: 600; }` (remove `text-transform`/uppercase reliance; pass mixed-case lines).
- Replace `colors` with the dark palette:

```js
const colors = { paper: '#0C0E12', carbon: '#E7E3DA', blue: '#D6A350', graphite: '#6F6A60' };
```

- In the footer text of `cardSvg`, change `CANQIANG.GITHUB.IO / TECHNICAL FIELD NOTES` → `CANQIANG.GITHUB.IO / RESEARCH LOG`.
- Update the two `writeCard` calls to mixed-case serif lines: home `['Models are only', 'useful when', 'they ship.']`; core-ai `['Open-source AI', 'agent framework']`. Keep labels and indices.
- Update the favicon SVG: `<rect … fill="${colors.blue}"/>` stays amber; the stroke `${colors.carbon}` now resolves to the warm off-white — verify the mark still reads on amber (it does; off-white on amber has sufficient contrast).

- [ ] **Step 2: Regenerate and inspect**

Run: `npm run generate:og`
Expected: "Generated public/og/home.png, public/og/core-ai.png, and public/favicon.png." Open the two PNGs; confirm dark canvas, amber label, serif headline.

- [ ] **Step 3: Add the theme-color assertion to the build validator**

In `scripts/validate-build-output.mjs`, inside the per-file loop that already asserts canonical/hreflang, add:

```js
const themeColorDark = tags(html, 'meta').find(
  (t) => t.name === 'theme-color' && (t.media || '').includes('dark'),
);
assert(themeColorDark?.content === '#0C0E12', `${route}: missing dark theme-color meta`);
```

(Place it alongside the existing `assert(...)` calls; `tags`/`attributes`/`assert` already exist in the file.)

- [ ] **Step 4: Full build proves the gate**

Run: `npm run build`
Expected: `validate:translations`, `astro build`, `validate:build-output` (now including theme-color), and `scan:public-safety` all pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-og.mjs scripts/validate-build-output.mjs public/og/home.png public/og/core-ai.png public/favicon.png
git commit -m "feat: regenerate OG cards in Research Log palette; assert theme-color"
```

---

## Task 12: Full verification and release gates

**Files:** none (verification only).

- [ ] **Step 1: Unit + type + content**

Run: `npm test && npm run check`
Expected: all Vitest suites pass (existing translation/route/public-safety/profile tests + new design/data tests); `validate:translations` passes; `astro check` 0 errors.

- [ ] **Step 2: Build + output + public-safety**

Run: `npm run build`
Expected: green through `validate-build-output` and `scan:public-safety`.

- [ ] **Step 3: Link check (Lychee v0.24.2)**

Run:
```bash
lychee --config lychee.toml --root-dir "${PWD}/dist" \
  --remap "https://canqiang.github.io/ file://${PWD}/dist/" 'dist/**/*.html'
```
Expected: no broken links (anchors `#current-practice`, `#<field>`, `#record` resolve).

- [ ] **Step 4: Lighthouse ≥ 95 (the font-budget gate)**

Run: `npx --no-install lhci autorun`
Expected: Performance / Accessibility / Best-Practices / SEO ≥ 0.95 on `/`, `/zh/`, `/projects/core-ai/`, `/zh/projects/core-ai/`.
If Performance dips below 0.95 due to serif webfont weight, apply the spec §4.3 fallback: drop `@fontsource/spectral` weight 500 (keep 600 only) and/or remove Latin serif from body and rely on system serif for CJK titles; re-run.

- [ ] **Step 5: Manual dual-theme + print pass**

Run `npm run dev` and confirm on `/` and `/zh/`:
- dark by default; toggle flips and persists across reload; `prefers-color-scheme: light` first-visit starts light with no flash.
- serif Chinese title on `/zh/` reads cleanly.
- `Cmd/Ctrl+P` print preview of `/resume/` (from both themes) is ink-on-white.

- [ ] **Step 6: Final commit (if any manual fixes were needed)**

```bash
git add -A
git commit -m "chore: verification fixes for Research Log redesign"
```

---

## Self-Review

**Spec coverage:**
- §4.1 direction, §4.2 tokens (both themes), §4.4 layout, §4.5 log apparatus (stamp T5 / build stamp T4 / field tags T6) + career axis (T7): covered.
- §4.3 typography (serif display, kept sans/mono, CJK system-serif fallback + Lighthouse budget): T1, T5, T12 Step 4.
- §4.6 motion (kept hero reveal, reduced-motion via existing block): T2/T5 keep `field-note-reveal`; the global `prefers-reduced-motion` rule is untouched.
- §4.7 photo retired, asset kept, no generated portrait: T5 (removes usage; file not deleted).
- §5 theme system (dark default, stored>OS, no-FOUC, accessible toggle, print): T3, T4, T2 Step 7.
- §6 homepage flow: T5–T9.
- §7 component deltas: T4–T9; `FieldIndexRail` kept for WorkPage (File Map).
- §8 print ink-on-white from either theme: T2 Step 7, T12 Step 5.
- §9 gates (both-theme contrast, Lighthouse, no-FOUC, theme-color, regenerated OG, existing suites): T11, T12.
- §10 out-of-scope respected: no new routes/content; ProjectGrid retained for `/projects/` only.
- §11 success criteria map to T12 checks.

**Placeholder scan:** No TBD/TODO; every code step carries full code; token migration specified by an explicit map + enumerated inversion rules rather than prose.

**Type consistency:** `FieldCard`/`CareerStop` exports (T6) match `redesign-data.test.ts` (T6) and `FieldCards`/`CareerAxis` consumers (T6/T7). `localStorage` key `'theme'` and `data-theme` values `'light'|'dark'` are identical across T3 (boot), T4 (toggle). New CSS tokens `--bg/--bg-raised/--text/--text-muted/--text-dim/--accent/--rule` are defined once in T2 and consumed everywhere after. Anchor ids `#current-practice` (T5 target, T9 section), `#<field>` (T6/T7 → WorkPage existing anchors), `#record` (T8 link → T8 About id) are consistent.
