# Portfolio Redesign — "Research Log" Visual System

**Date:** 2026-07-20

**Status:** Approved in conversation; awaiting written-spec review

**Repository:** `/Users/xander/git_repo/Canqiang.github.io`

**Target URL:** `https://canqiang.github.io`

**Supersedes:** Section 6 (Homepage Structure) and Section 10 (Visual System) of
[`2026-07-19-personal-portfolio-design.md`](./2026-07-19-personal-portfolio-design.md).
All other sections of that spec remain in force unless explicitly amended here.

## 1. Objective

The site's content, structure, and engineering are sound, but its visual identity —
the light "Technical Field Notes" system (cool paper background, Barlow Condensed
uppercase display, signal-blue/violet accents) — reads as generic and does not
satisfy the owner. This redesign replaces the visual system with a darker, quieter,
more distinctive **"Research Log"** identity that better fits a career spanning
research and engineering, and that makes the Chinese edition look as refined as the
English one.

The redesign is inspired by the reference site `siamrahman29.github.io` (dark,
mono-labelled, numbered single-page flow) but is **not** a clone: it earns its
"geeky" feeling from research-notebook rigour (log stamps, evidence indices, a
career axis) rather than from terminal chrome, and it introduces a serif display
face that the reference site does not use.

This is a **reskin plus a homepage re-sequence**, not a rebuild. No routes, content
entries, schemas, or public-safety rules change.

## 2. Confirmed Decisions (this conversation)

- **Direction:** Option B, "Research Log" (chosen over a faithful terminal-minimal
  reskin and over a full terminal/TUI treatment).
- **Audience balance:** serves recruiters/employers and technical peers equally;
  geek cues are present but never at the expense of recruiter legibility.
- **Theme:** dark is the brand default and the fallback when no signal exists; a light
  theme is available via a user toggle and via `prefers-color-scheme`, with a stored
  choice always winning (precedence defined in §5). Both themes are first-class and
  must pass contrast checks.
- **Accent color:** amber/gold — `#D6A350` on dark, deepened to `#9A6414` on light.
- **Display typeface:** serif for large titles and section names (this is the source
  of the edition's refinement, especially for Chinese). Confirmed acceptable.
- **Structure scope:** re-sequence the **homepage** into a numbered single-page flow;
  **keep all sub-pages and routes** (Work, Projects + detail, About, Resume, and all
  `/zh/` mirrors). Content and SEO routes are preserved.
- **Hero imagery:** text-only. The hero drops the speaking photo; the homepage is
  typographic. (See §7 for what happens to the existing photo asset.)

## 3. Explicitly Unchanged (guard against scope creep)

The following carry over from the 2026-07-19 spec **without modification**:

- Information architecture and every English/Chinese route (§5 of the prior spec).
- Bilingual content model, `translationKey` pairing, and the translation validator.
- All editorial copy, résumé data, experience, achievements, and project taxonomy.
- ChanceTop / Core-AI public copy and the public-safety rules (§7 prior spec).
- Astro static output, no runtime GitHub/Kaggle API calls, GitHub Pages deployment.
- Résumé and personal-data policy, including no published phone number (§13 prior).
- SEO, hreflang, and social-sharing behavior (§14 prior) — except OG card colors,
  which are regenerated to match the new palette (see §9).
- Accessibility commitments and responsive breakpoints (360 / 768 / 1024 / 1440 px).

## 4. New Visual System — "Research Log"

### 4.1 Direction

A dark editorial "engineering logbook": ink-black canvas, a single warm amber accent,
serif display titles, and monospace metadata used as structural apparatus (log
numbers, build stamps, category tags, an evidence ledger). Restrained and authored —
the amber and the serif do the work; there is no terminal chrome, no neon, no
scattered ornament.

### 4.2 Color tokens

Tokens are defined per theme and consumed only through CSS custom properties. No
component hard-codes a hex value. Names are theme-neutral so components read the same
in both themes.

**Dark (default):**

- `--bg: #0C0E12` — page canvas
- `--bg-raised: #0E1016` — cards, grid cells
- `--text: #E7E3DA` — primary (warm off-white)
- `--text-muted: #A8A29E` — supporting copy
- `--text-dim: #6F6A60` — captions, stamps, disabled
- `--accent: #D6A350` — amber; links, current state, section numbers, small emphasis
- `--rule: #23262E` — hairline borders and grid gutters

**Light (toggle / `prefers-color-scheme: light`):**

- `--bg: #F6F1E7` — warm paper
- `--bg-raised: #FBF7EE`
- `--text: #211D17`
- `--text-muted: #6B6459`
- `--text-dim: #948B7A`
- `--accent: #9A6414` — deepened amber for AA contrast on paper
- `--rule: #E2D9C7`

**Contrast requirement:** In *both* themes, `--text` on `--bg`, `--text-muted` on
`--bg`, and `--accent` on `--bg` must meet WCAG AA for their text sizes. `--accent`
is verified specifically as a link/label color on both backgrounds. `--text-dim` is
used only for non-essential captions and must still clear AA at the size used.

### 4.3 Typography

Three families, each with one job (this division *is* the design):

- **Display / serif** — large hero title and section titles. Latin: a refined serif
  (e.g. Spectral or Newsreader). CJK: a serif that renders "模型只有真正落地，才有价值。"
  with weight and elegance. Serif is what makes the Chinese edition feel premium.
- **Body / sans** — running copy. Keep **IBM Plex Sans** (already self-hosted); CJK
  fallback PingFang SC → Noto Sans SC → Microsoft YaHei.
- **Mono** — labels, section numbers, `LOG 00`, build stamp, evidence figures, nav.
  Keep **IBM Plex Mono** (already self-hosted).

**CJK serif loading is the one real performance risk** (CJK webfonts are large, and
the release gate requires Lighthouse Performance ≥ 95). Resolution, in priority order:

1. Prefer a **self-hosted, subset, single-weight** CJK serif (only the ~weight used
   for titles), with `unicode-range` sharding and `font-display: swap`, so body text
   never blocks on it.
2. If subsetting cannot hold the Lighthouse budget, fall back to **system CJK serif**
   (`Songti SC`, `STSong`, `SimSun`) for titles — zero network cost, at the price of
   cross-device consistency.

The implementation plan must measure Lighthouse on the zh home page and both Core-AI
detail pages before committing the font choice. Latin serif is self-hosted, subset to
the used weights, `font-display: swap`.

### 4.4 Layout

- Preserve the existing `--content-width` (~1180px) and centered `.shell` container.
- Single-column measure for reading; multi-column grids only for the field cards and
  the evidence ledger.
- **Hairline rules (`--rule`) and mono section headers** encode boundaries — the same
  structural-honesty principle as before, now on a dark canvas.
- Section numbering (`01 /`, `02 /`) is meaningful wayfinding for the numbered
  homepage flow, not decoration; sub-pages keep plain section headers.

### 4.5 Signature elements

Two deliberate signatures; everything else stays quiet:

- **The log apparatus** — a mono `LOG 00 · EST. 2017 · <role>` stamp under the hero,
  a build stamp in the footer (`build <shortsha> · astro · <date>`), and `[01]…[04]`
  tags on field cards. It frames the page as a versioned research record.
- **The career axis** — a horizontal timeline (bioinformatics → agent systems) with
  amber tick marks, replacing the old vertical field-index rail as the one
  interactive visual signature. Hover/focus accents only; no scroll-tracking JS.

### 4.6 Motion

- One coordinated hero entrance: log-stamp fade, serif headline rise, axis draw-in.
- Subtle card hover (raise `--bg-raised`, amber rule).
- No scattered scroll animations.
- All non-essential motion disabled under `prefers-reduced-motion: reduce`.

### 4.7 Existing hero photo asset

The homepage hero becomes text-only. The speaking photo
(`src/assets/xander-speaking.jpg`) is used **only** by `Hero` today, so a text-only
hero leaves it unused. The asset and its `photoAlt` copy are **kept in the repo, not
deleted**, so a later page can reuse it. No generated portrait or stock image is
introduced to fill the hero. The prior spec's "real photo only, no stock/generated
portraits" rule still holds wherever a photo later appears.

## 5. Theme System

- **Default:** dark. Light applies when the user toggles it or when the stored
  preference is light; a first visit with `prefers-color-scheme: light` and no stored
  choice starts light. Stored choice always wins over the OS signal.
- **No flash (FOUC):** a tiny **inline** `<head>` script sets `data-theme` on
  `<html>` from `localStorage` (or the OS query) **before** first paint. Theme tokens
  are selected by `:root[data-theme="dark"]` / `[data-theme="light"]`. CSS ships a
  sensible default so the pre-hydration document is never unstyled.
- **Toggle control:** a `ThemeToggle` in the header, keyboard reachable, with an
  accessible name that states the action/target theme; persists to `localStorage`.
- **Reduced-motion & print:** the toggle does not animate under reduced motion. Print
  always renders light/ink-on-white regardless of theme (see §8).
- **No dependency:** vanilla inline JS only; no framework, consistent with "no React
  runtime for v1."

## 6. Homepage Structure (replaces §6 of prior spec)

A numbered single-page flow. Same content and evidence as before, re-sequenced:

1. **LOG 00 — Hero.** Mono log stamp (`LOG 00 · EST. 2017 · <role>`); serif headline
   (`Models are only useful when they ship.` / `模型只有真正落地，才有价值。`); italic
   serif English sub-line on the zh page; one sans positioning paragraph; two actions
   (View selected work → / Résumé). Text-only.
2. **01 / Current practice.** Four field cards — Bioinformatics, Medical AI, LLM
   Products, Agent Systems — each with `[0n]` tag, name, one-line scope, and
   years/employers. These anchor to the corresponding Work sections (the old
   field-index rail's job, restated as cards).
3. **02 / Career axis.** Condensed horizontal timeline with a link to the full Work
   page.
4. **03 / Evidence index.** Publications, patents, open source, competitions as peer
   cells (`03 papers`, `03 patents`, `Core-AI`, `Kaggle 62/1010`). Kaggle stays one
   peer cell — no hero stat, no nav item, no dedicated section.
5. **04 / Contact.** GitHub, Core-AI, Kaggle, LinkedIn, Email; résumé link.
6. **Footer.** Build stamp, copyright, language, source-repo link.

## 7. Component Changes (delta to §12 prior spec)

Component boundaries are preserved; the visual layer changes. Specifics:

- **New `ThemeToggle`** — header control + inline head script for no-FOUC theming.
- **`BaseLayout`** — adds the inline theme script and `data-theme` handling; swaps in
  the new global token stylesheet and font imports (serif added; Barlow Condensed
  removed).
- **`Header`** — restyled; hosts `ThemeToggle`; nav becomes mono. Same links/behavior,
  including context-preserving language switch.
- **`Hero`** — drops the `Picture`/photo and event label; renders the LOG 00 typographic
  hero. Props shrink accordingly.
- **`FieldIndexRail`** — repurposed (or replaced) as the "01 / Current practice" field
  **cards** and the "02 / Career axis" timeline. If cleaner, split into
  `FieldCards` + `CareerAxis`; keep each single-responsibility.
- **`ProjectCard` / `ProjectGrid` / `ExperienceTimeline` / `AchievementIndex` /
  `Footer` / `SeoHead`** — restyled to the new tokens; **no API/prop changes**.
- **All page components** (`HomePage`, `WorkPage`, `ProjectsPage`, `AboutPage`,
  `ResumePage`, `ProjectLayout`) — consume new tokens; homepage re-sequenced per §6.

CSS strategy: `src/styles/global.css` is migrated to the new two-theme token set and
component rules. This is a substantial rewrite of that file's values; the class
structure and selectors are reused where they still fit. Print styles (§8) are kept.

## 8. Print / Résumé

The résumé's existing `@media print` block (white page, ink-on-black-text, hidden
chrome) is preserved and must be re-verified against the dark theme: printing any
page — in either screen theme — produces the current light, ink-on-white output. The
theme toggle must not leak dark backgrounds into print.

## 9. Validation and Release-Gate Impact

All existing gates from §16 of the prior spec still apply. New/affected checks:

- **Contrast** — verify `--text`, `--text-muted`, `--accent` on `--bg` for **both**
  themes (dark and light) meet WCAG AA. This is a new two-theme obligation.
- **Lighthouse ≥ 95 (Perf/A11y/Best-Practices/SEO)** on the en + zh home pages and
  both Core-AI detail pages — the serif/CJK font budget (§4.3) is validated here.
- **No-FOUC** — the theme is correct on first paint; no flash on reload in either
  stored preference.
- **`theme-color` meta** and the regenerated **OG social cards / favicon** match the
  new palette (dark canvas, amber accent). `npm run generate:og` is updated and re-run.
- **Existing suites unchanged in intent** — `npm test`, `npm run check` (translation
  pairs + Astro checks), Lychee link check, and `npm run scan:public-safety` must all
  still pass.

## 10. Out of Scope for this Redesign

- No new routes, pages, content entries, or nav items (Writing stays unshipped until
  it has a real article, per prior spec).
- No copy rewrites beyond what the new layout requires (e.g. a section eyebrow label).
- No CMS, analytics, comments, or client framework.
- No generated portrait or stock imagery to replace the retired hero photo.
- No change to deployment topology or the public-safety policy.

## 11. Success Criteria

1. The homepage presents the LOG 00 → 01 → 02 → 03 → 04 numbered flow, text-only hero,
   in the Research Log identity, in both languages.
2. Dark is the default; the light toggle works, persists, respects
   `prefers-color-scheme` on first visit, and produces **no** flash of the wrong theme.
3. Both themes pass WCAG AA contrast for text and for the amber accent as a link/label.
4. The Chinese edition's serif titles read as refined as the English — the redesign's
   headline goal — without breaking the Lighthouse ≥ 95 performance gate.
5. All sub-pages and every route are preserved and restyled; no route or content
   regression; translation, link, public-safety, and Lighthouse gates stay green.
6. Printing the résumé yields the existing ink-on-white output from either theme.
