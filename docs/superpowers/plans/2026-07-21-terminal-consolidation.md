# Terminal Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut the site from 5 page templates to 3 (Home, Projects, Résumé) and give the Home hero a decorative terminal-shell identity.

**Architecture:** Retarget every internal link that currently points at Work/About to Résumé (Tasks 1-2), redesign the persistent nav to a path-prefix convention (Task 3), rewrite the Hero as a terminal shell with a one-time typewriter reveal (Task 4), then delete the Work/About page templates, routes, and now-dead CSS/tests as a final cleanup once nothing references them anymore (Task 5). This order keeps the build and test suite green after every task — nothing is deleted until every consumer has already stopped pointing at it.

**Tech Stack:** Astro, TypeScript, Vitest. No new dependencies.

## Global Constraints

- No runtime GitHub/Kaggle API calls (build-time only).
- Core-AI must stay framed as team-built/contributor work, not sole authorship.
- No phone numbers, credentials, or internal-only data anywhere in content.
- No overclaiming unproven results.
- Dark-default theme (no `prefers-color-scheme` fallback).
- The amber `--accent` is the terminal's "customized prompt color" — do not introduce a green/phosphor palette.
- The typewriter reveal is decorative only: no real command input, nothing requires typing to navigate. Every actionable element (the two Hero CTAs) is a real `<a href>` present in the server-rendered HTML with or without JS.
- Typewriter animation plays at most once per browser session (`sessionStorage`) and is skipped entirely under `prefers-reduced-motion: reduce`.
- GitHub Pages is static hosting with no server-side redirects — `/work/` and `/about/` (and `/zh/` counterparts) 404 after removal. No redirect pages are in scope.
- After Task 5, `npx astro check`, `npm test`, and `npm run build` must all pass with zero remaining references to the `work`/`about` route keys.

## Content decision: About's bio paragraph

The spec left one item discretionary: About's unique bio sentence ("began in bioinformatics, moved through medical AI and LLM products, now focused on agent systems") has no dedicated home once About is deleted, and the spec said to fold it into Home's Hero introduction or career-axis lede *only if it reads naturally* — not to force a new section for one sentence.

Resolution: no task in this plan touches `identity.introduction` or the career-axis copy. Home's existing Hero introduction ("I build open-source agent frameworks and applied AI systems, with a career spanning bioinformatics, medical vision, LLM products, and workflow infrastructure") already conveys the same cross-field breadth, and the Career Axis section already shows the year-by-year trajectory visually. Adding the About bio's phrasing on top would be redundant, not additive — so this plan deliberately leaves that copy untouched.

---

### Task 1: Retarget AchievementIndex's publications/patents links to Résumé

**Files:**
- Modify: `src/components/AchievementIndex.astro`
- Test: `tests/design/homepage-flow.test.ts:27-38` (the `evidence cells` describe block)

**Interfaces:**
- Consumes: `localizedPath(locale, 'resume')` — already exists in `src/i18n/routes.ts`, returns `/resume/` or `/zh/resume/`.
- Consumes: Résumé's publication/patent heading ids, already rendered by `src/components/pages/ResumePage.astro:121-122` as `id={\`resume-${group.key}-title\`}` — for `group.key === 'publications'` this is `resume-publications-title`, for `'patents'` it's `resume-patents-title`.
- Produces: no new exports. `destination()`'s return value for the `publications`/`patents` groups changes from `${aboutPath}#record` to `${resumePath}#resume-${group.key}-title`.

- [ ] **Step 1: Update the test to expect the Résumé destination**

Replace the `evidence cells` block in `tests/design/homepage-flow.test.ts`:

```ts
describe('evidence cells', () => {
  it('shows condensed counts, each linking to the destination that actually covers it', async () => {
    const ai = await read('src/components/AchievementIndex.astro');
    expect(ai).toContain('achievement-cell__count');
    expect(ai).toContain("localizedPath(locale, 'resume')");
    expect(ai).not.toContain("localizedPath(locale, 'about')");
    // Pin the exact key-to-destination pairing, not just that both strings
    // exist somewhere — a swapped ternary (openSource <-> competitions)
    // would still contain both strings but route to the wrong page.
    expect(ai).toMatch(/group\.key === 'openSource'\s*\?\s*localizedPath\(locale, 'project', 'core-ai'\)/);
    expect(ai).toMatch(/group\.key === 'competitions'\s*\?\s*localizedPath\(locale, 'project', 'competitions'\)/);
    expect(ai).toMatch(/resume-\$\{group\.key\}-title/);
  });
});
```

- [ ] **Step 2: Run the test, confirm it fails**

Run: `npx vitest run tests/design/homepage-flow.test.ts -t "evidence cells"`
Expected: FAIL — `AchievementIndex.astro` still contains `localizedPath(locale, 'about')`, not `'resume'`.

- [ ] **Step 3: Update AchievementIndex.astro**

In `src/components/AchievementIndex.astro`, replace:

```astro
const aboutPath = localizedPath(locale, 'about');
// Each group routes to wherever it is actually shown in full — About's
// record section covers publications/patents only; open source and
// competitions have their own project detail pages.
const destination = (group: AchievementGroup) =>
  group.key === 'openSource' ? localizedPath(locale, 'project', 'core-ai')
  : group.key === 'competitions' ? localizedPath(locale, 'project', 'competitions')
  : `${aboutPath}#record`;
```

with:

```astro
const resumePath = localizedPath(locale, 'resume');
// Each group routes to wherever it is actually shown in full — Résumé has
// its own publications/patents sections with stable heading ids; open
// source and competitions have their own project detail pages.
const destination = (group: AchievementGroup) =>
  group.key === 'openSource' ? localizedPath(locale, 'project', 'core-ai')
  : group.key === 'competitions' ? localizedPath(locale, 'project', 'competitions')
  : `${resumePath}#resume-${group.key}-title`;
```

- [ ] **Step 4: Run the test, confirm it passes**

Run: `npx vitest run tests/design/homepage-flow.test.ts -t "evidence cells"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/AchievementIndex.astro tests/design/homepage-flow.test.ts
git commit -m "refactor: point evidence-index publications/patents links at Résumé"
```

---

### Task 2: Retarget FieldCards and the Home career-axis link to Résumé

**Files:**
- Modify: `src/components/FieldCards.astro`
- Modify: `src/components/pages/HomePage.astro:53`
- Test: `tests/design/homepage-flow.test.ts:18-25` (the `career axis` describe block)

**Interfaces:**
- Consumes: `localizedPath(locale, 'resume')` (same as Task 1).
- Produces: no new exports. Every `FieldCards` card link and the Home "View full experience" link now point at `/resume/` (or `/zh/resume/`) instead of `/work/#<field>` and `/work/`.

- [ ] **Step 1: Update the career-axis test to assert the new destination**

Replace the `career axis` block in `tests/design/homepage-flow.test.ts`:

```ts
describe('career axis', () => {
  it('renders the axis from careerAxis and links onward to Résumé', async () => {
    const axis = await read('src/components/CareerAxis.astro');
    expect(axis).toContain("from '../data/site'");
    expect(axis).toContain('careerAxis');
    expect(axis).toContain('career-axis__stop');

    const home = await read('src/components/pages/HomePage.astro');
    expect(home).toContain("localizedPath(locale, 'resume')");
    expect(home).not.toContain("localizedPath(locale, 'work')");
  });
});
```

Also add a new `it` in the same file's `describe('homepage numbered flow', ...)` block (after the existing assertion loop) to cover `FieldCards`:

```ts
  it('routes Current Practice cards to Résumé, not Work', async () => {
    const fieldCards = await read('src/components/FieldCards.astro');
    expect(fieldCards).toContain("localizedPath(locale, 'resume')");
    expect(fieldCards).not.toContain("localizedPath(locale, 'work')");
  });
```

- [ ] **Step 2: Run the tests, confirm they fail**

Run: `npx vitest run tests/design/homepage-flow.test.ts -t "career axis"`
Expected: FAIL — `HomePage.astro` still links to `localizedPath(locale, 'work')`.

Run: `npx vitest run tests/design/homepage-flow.test.ts -t "routes Current Practice cards"`
Expected: FAIL — `FieldCards.astro` still uses `workPath`.

- [ ] **Step 3: Update FieldCards.astro**

Replace:

```astro
const { locale } = Astro.props;
const workPath = localizedPath(locale, 'work');
---

<ol class="field-cards">
  {fieldCards.map((card, i) => (
    <li class="field-card">
      <a class="field-card__link" href={`${workPath}#${card.key}`}>
```

with:

```astro
const { locale } = Astro.props;
const resumePath = localizedPath(locale, 'resume');
---

<ol class="field-cards">
  {fieldCards.map((card, i) => (
    <li class="field-card">
      <a class="field-card__link" href={resumePath}>
```

- [ ] **Step 4: Update HomePage.astro**

In `src/components/pages/HomePage.astro:53`, replace:

```astro
      <a class="portfolio-section__text-link" href={localizedPath(locale, 'work')}>{copy.fullExperience}</a>
```

with:

```astro
      <a class="portfolio-section__text-link" href={localizedPath(locale, 'resume')}>{copy.fullExperience}</a>
```

- [ ] **Step 5: Run the tests, confirm they pass**

Run: `npx vitest run tests/design/homepage-flow.test.ts`
Expected: PASS (all tests in the file)

- [ ] **Step 6: Commit**

```bash
git add src/components/FieldCards.astro src/components/pages/HomePage.astro tests/design/homepage-flow.test.ts
git commit -m "refactor: point Current Practice cards and career-axis link at Résumé"
```

---

### Task 3: Redesign the persistent nav — path-prefix labels, Projects/Résumé only

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/styles/global.css:231-243` (the `.site-header__nav-link` rule)
- Test: create `tests/design/header-nav.test.ts`

**Interfaces:**
- Consumes: `localizedPath(locale, 'projects' | 'resume')` from `src/i18n/routes.ts` (both already exist).
- Produces: `Header.astro`'s `navigation` array now has exactly two entries (`projects`, `resume`); no other file consumes this array.

- [ ] **Step 1: Write the new test file**

Create `tests/design/header-nav.test.ts`:

```ts
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../..', import.meta.url));
const read = (p: string) => readFile(`${root}/${p}`, 'utf8');

describe('persistent nav', () => {
  it('links only to Projects and Résumé, path-styled, not Work or About', async () => {
    const header = await read('src/components/Header.astro');
    expect(header).toContain("key: 'projects'");
    expect(header).toContain("key: 'resume'");
    expect(header).not.toContain("key: 'work'");
    expect(header).not.toContain("key: 'about'");
    expect(header).toContain('~/projects');
    expect(header).toContain('~/resume');
  });

  it('does not uppercase nav labels, so the path-prefix style renders lowercase', async () => {
    const css = await read('src/styles/global.css');
    const navLinkRule = css.match(/\.site-header__nav-link\s*\{[^}]*\}/);
    expect(navLinkRule).not.toBeNull();
    expect(navLinkRule?.[0]).not.toMatch(/text-transform:\s*uppercase/);
  });
});
```

- [ ] **Step 2: Run the test, confirm it fails**

Run: `npx vitest run tests/design/header-nav.test.ts`
Expected: FAIL — `Header.astro` still has `key: 'work'`/`key: 'about'` and no `~/` labels; the CSS rule still has `text-transform: uppercase`.

- [ ] **Step 3: Update Header.astro**

Replace:

```astro
const copy = locale === 'en'
  ? { work: 'Work', projects: 'Projects', about: 'About', menu: 'Menu', switchLabel: '切换至中文' }
  : { work: '经历', projects: '项目', about: '关于', menu: '菜单', switchLabel: 'Switch to English' };
const navigation: Array<{ key: Exclude<RouteKey, 'home' | 'project' | 'resume'>; label: string }> = [
  { key: 'work', label: copy.work },
  { key: 'projects', label: copy.projects },
  { key: 'about', label: copy.about },
];
```

with:

```astro
const copy = locale === 'en'
  ? { projects: '~/projects', resume: '~/resume', menu: 'Menu', switchLabel: '切换至中文' }
  : { projects: '~/projects', resume: '~/resume', menu: '菜单', switchLabel: 'Switch to English' };
const navigation: Array<{ key: Exclude<RouteKey, 'home' | 'project'>; label: string }> = [
  { key: 'projects', label: copy.projects },
  { key: 'resume', label: copy.resume },
];
```

(Path labels are deliberately identical across locales — real filesystem paths aren't translated, and that's part of the terminal conceit.)

- [ ] **Step 4: Update the nav-link CSS**

In `src/styles/global.css`, within `.site-header__nav-link` (currently lines 231-243), remove the `text-transform: uppercase;` declaration:

```css
.site-header__nav-link {
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  padding-inline: 0.15rem;
  border-bottom: 1px solid var(--rule);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.045em;
  text-decoration: none;
}
```

(`font-family: var(--font-mono)` was already there — no change needed for the path-prefix look. The language-switch label (`EN`/`中文`) is literal-cased data already, so removing this rule doesn't affect it.)

- [ ] **Step 5: Run the test, confirm it passes**

Run: `npx vitest run tests/design/header-nav.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.astro src/styles/global.css tests/design/header-nav.test.ts
git commit -m "feat: restyle nav as path-prefixed ~/projects ~/resume, drop Work/About"
```

---

### Task 4: Rewrite the Home Hero as a decorative terminal shell

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/styles/global.css` (Hero rules, currently lines 290-369, plus removing the now-unused `field-note-reveal` keyframe at line 1309)
- Modify: `tests/design/homepage-flow.test.ts:8-16` (the `LOG 00 hero` describe block)

**Interfaces:**
- Consumes: `identity.name`, `identity.chineseName`, `identity.role`, `identity.headline`, `identity.introduction` from `src/data/site.ts` (all already exist, unchanged shape).
- Produces: no new exports. `Hero.astro`'s rendered markup changes structurally (terminal chrome + typing sequence); its two action links keep their existing `href`s (`#current-practice`, `localizedPath(locale, 'resume')`).

- [ ] **Step 1: Update the Hero test**

Replace the `LOG 00 hero` describe block in `tests/design/homepage-flow.test.ts` with:

```ts
describe('terminal hero', () => {
  it('is text-only, carries the terminal shell markers, and has real CTAs with or without JS', async () => {
    const hero = await read('src/components/Hero.astro');
    expect(hero).not.toContain('astro:assets');
    expect(hero).not.toContain('speakingPhoto');
    expect(hero).not.toContain('LOG 00');
    expect(hero).toContain('portfolio-hero__stamp');
    expect(hero).toContain('data-hero-terminal');
    expect(hero).toContain('data-hero-line');
    expect(hero).toContain('data-hero-typed');
    // The two CTAs must be real anchors in the server-rendered markup —
    // not something only the typing script injects.
    expect(hero).toMatch(/<a[^>]+href="#current-practice"/);
    expect(hero).toMatch(/<a[^>]+href=\{localizedPath\(locale, 'resume'\)\}/);
  });

  it('skips the typing animation under reduced motion and after it has already played once', async () => {
    const hero = await read('src/components/Hero.astro');
    expect(hero).toContain('prefers-reduced-motion');
    expect(hero).toContain('sessionStorage');
  });
});
```

- [ ] **Step 2: Run the test, confirm it fails**

Run: `npx vitest run tests/design/homepage-flow.test.ts -t "terminal hero"`
Expected: FAIL — current `Hero.astro` still contains `LOG 00` and has none of the `data-hero-*` markers.

- [ ] **Step 3: Rewrite Hero.astro**

Replace the entire contents of `src/components/Hero.astro`:

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
  ? { work: 'View selected work', resume: 'View résumé' }
  : { work: '查看精选工作', resume: '查看简历' };
const whoami = locale === 'en'
  ? `${identity.name} — ${identity.role.en} — est. 2017`
  : `${identity.chineseName} / ${identity.name} — ${identity.role.zh} — est. 2017`;
const showEnglishSubline = locale === 'zh';
---

<section class="portfolio-hero shell" aria-labelledby="hero-title">
  <div class="portfolio-hero__terminal" data-hero-terminal>
    <div class="portfolio-hero__titlebar" aria-hidden="true">
      <span class="portfolio-hero__dot portfolio-hero__dot--red"></span>
      <span class="portfolio-hero__dot portfolio-hero__dot--yellow"></span>
      <span class="portfolio-hero__dot portfolio-hero__dot--green"></span>
      <span class="portfolio-hero__titlebar-label mono">xander@canqiang:~ — 80×24</span>
    </div>

    <div class="portfolio-hero__body">
      <p class="portfolio-hero__line mono" data-hero-line><span class="portfolio-hero__prompt">$</span> <span data-hero-typed>whoami</span></p>
      <p class="portfolio-hero__stamp mono" data-hero-output>{whoami}</p>

      <p class="portfolio-hero__line mono" data-hero-line><span class="portfolio-hero__prompt">$</span> <span data-hero-typed>cat mission.md</span></p>
      <div data-hero-output>
        <h1 id="hero-title" class="portfolio-hero__title">{identity.headline[locale]}</h1>
        {showEnglishSubline && <p class="portfolio-hero__subline">{identity.headline.en}</p>}
        <p class="portfolio-hero__summary">{identity.introduction[locale]}</p>
      </div>

      <p class="portfolio-hero__line mono" data-hero-line><span class="portfolio-hero__prompt">$</span> <span data-hero-typed>ls ./</span></p>
      <div class="portfolio-hero__actions no-print" data-hero-output>
        <a class="portfolio-hero__action portfolio-hero__action--primary" href="#current-practice">
          <span class="portfolio-hero__action-mode mono">drwxr-xr-x</span> {copy.work}
        </a>
        <a class="portfolio-hero__action" href={localizedPath(locale, 'resume')}>
          <span class="portfolio-hero__action-mode mono">-rw-r--r--</span> {copy.resume}
        </a>
      </div>
    </div>
  </div>
</section>

<script>
  const terminal = document.querySelector('[data-hero-terminal]');
  const lines = terminal ? Array.from(terminal.querySelectorAll('[data-hero-line]')) : [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadyPlayed = sessionStorage.getItem('hero-terminal-played') === '1';

  if (terminal instanceof HTMLElement && lines.length > 0 && !reduceMotion && !alreadyPlayed) {
    terminal.dataset.state = 'typing';
    const typedSpans = lines.map((line) => line.querySelector('[data-hero-typed]'));
    const fullTexts = typedSpans.map((span) => span?.textContent ?? '');
    typedSpans.forEach((span) => {
      if (span) span.textContent = '';
    });

    let lineIndex = 0;
    let charIndex = 0;

    const typeNextChar = () => {
      const line = lines[lineIndex];
      const span = typedSpans[lineIndex];
      const text = fullTexts[lineIndex];
      line.dataset.heroActive = 'true';

      if (span && charIndex < text.length) {
        span.textContent = text.slice(0, charIndex + 1);
        charIndex += 1;
        window.setTimeout(typeNextChar, 28);
        return;
      }

      delete line.dataset.heroActive;
      const output = line.nextElementSibling;
      if (output instanceof HTMLElement) output.dataset.heroRevealed = 'true';
      lineIndex += 1;
      charIndex = 0;

      if (lineIndex < lines.length) {
        window.setTimeout(typeNextChar, 260);
      } else if (terminal instanceof HTMLElement) {
        terminal.dataset.state = 'settled';
        sessionStorage.setItem('hero-terminal-played', '1');
      }
    };

    window.setTimeout(typeNextChar, 260);
  }
</script>
```

- [ ] **Step 4: Replace the Hero CSS**

In `src/styles/global.css`, replace the block currently spanning `.portfolio-hero` through `.portfolio-hero__subline` (currently lines 290-369+, ending right before the next unrelated rule) — specifically replace this existing text:

```css
.portfolio-hero {
  display: grid;
  gap: 0;
  padding-block: clamp(3.5rem, 8vw, 7.5rem);
}

.portfolio-hero__role {
  margin: 0 0 1.25rem;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.portfolio-hero__title {
  max-width: 20ch;
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 1.3;
  letter-spacing: -0.01em;
  text-transform: none;
  text-wrap: balance;
  animation: field-note-reveal 560ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

with (dropping the now-superseded `field-note-reveal` animation from the title — the typing sequence is its replacement — and adding the terminal chrome rules):

```css
.portfolio-hero {
  display: grid;
  gap: 0;
  padding-block: clamp(3.5rem, 8vw, 7.5rem);
}

.portfolio-hero__terminal {
  border: 1px solid var(--rule);
  background: var(--bg-raised);
}

.portfolio-hero__titlebar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid var(--rule);
}

.portfolio-hero__dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
}
.portfolio-hero__dot--red { background: #ff5f56; }
.portfolio-hero__dot--yellow { background: #ffbd2e; }
.portfolio-hero__dot--green { background: #27c93f; }

.portfolio-hero__titlebar-label {
  margin-inline-start: 0.6rem;
  color: var(--text-dim);
  font-size: 0.7rem;
}

.portfolio-hero__body {
  padding: clamp(1.75rem, 5vw, 3rem);
}

.portfolio-hero__line {
  margin: 1.75rem 0 0;
  color: var(--text-muted);
  font-size: 0.78rem;
}
.portfolio-hero__line:first-child { margin-top: 0; }

.portfolio-hero__prompt {
  margin-inline-end: 0.4rem;
  color: var(--accent);
}

.portfolio-hero__line[data-hero-active='true']::after {
  content: '';
  display: inline-block;
  width: 0.5em;
  height: 1em;
  margin-inline-start: 2px;
  vertical-align: text-bottom;
  background: var(--accent);
  animation: hero-cursor-blink 1s step-end infinite;
}

@keyframes hero-cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.portfolio-hero__terminal[data-state='typing'] [data-hero-output] {
  opacity: 0;
}
.portfolio-hero__terminal[data-state='typing'] [data-hero-output][data-hero-revealed='true'] {
  opacity: 1;
  transition: opacity 200ms ease;
}

.portfolio-hero__action-mode {
  margin-inline-end: 0.6rem;
  color: var(--text-dim);
  font-size: 0.7rem;
}

.portfolio-hero__title {
  max-width: 20ch;
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 1.3;
  letter-spacing: -0.01em;
  text-transform: none;
  text-wrap: balance;
}
```

Leave `.portfolio-hero__summary`, `.portfolio-hero__actions`, `.portfolio-hero__action`, `.portfolio-hero__action--primary`, `.portfolio-hero__action:hover`, `.portfolio-hero__stamp`, and `.portfolio-hero__subline` exactly as they are today — none of their declarations change. (`.portfolio-hero__role` is pre-existing dead CSS unrelated to this change — leave it alone; it's out of scope.)

Then delete the now-unused keyframe (originally at line 1309, only ever referenced by the animation just removed):

```css
@keyframes field-note-reveal {
  from { opacity: 0; transform: translateY(1.25rem); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 5: Run the test, confirm it passes**

Run: `npx vitest run tests/design/homepage-flow.test.ts -t "terminal hero"`
Expected: PASS

- [ ] **Step 6: Build and manually verify in a browser**

Run: `npm run build && npm run preview -- --port 4321`

Load `http://localhost:4321/` and `http://localhost:4321/zh/`. Confirm: the terminal window renders with three dots and a titlebar label; the whoami/mission.md/ls sequence types out once; reloading within the same tab session does not replay the animation; both CTA buttons are clickable throughout (they're real links, so this works even mid-animation); with browser dev tools set to emulate `prefers-reduced-motion: reduce`, the content appears immediately at rest, no typing.

- [ ] **Step 7: Commit**

```bash
git add src/components/Hero.astro src/styles/global.css tests/design/homepage-flow.test.ts
git commit -m "feat: rebuild the Home hero as a decorative terminal shell"
```

---

### Task 5: Delete Work and About — pages, routes, dead CSS, and their tests

**Files:**
- Delete: `src/components/pages/WorkPage.astro`
- Delete: `src/components/pages/AboutPage.astro`
- Delete: `src/components/FieldIndexRail.astro`
- Delete: `src/pages/work.astro`, `src/pages/zh/work.astro`
- Delete: `src/pages/about.astro`, `src/pages/zh/about.astro`
- Modify: `src/i18n/routes.ts`
- Modify: `src/styles/global.css` (remove the dead `.work-*`/`.about-*` rules, lines 784-1072)
- Modify: `tests/i18n/routes.test.ts`
- Modify: `tests/pages/profile-pages.test.ts`
- Modify: `scripts/validate-build-output.mjs`

**Interfaces:**
- Consumes: nothing new. By this point (Tasks 1-3 complete), no component references `localizedPath(locale, 'work' | 'about')` anymore — this task's first verification step confirms that.
- Produces: `RouteKey` in `src/i18n/routes.ts` becomes `'home' | 'projects' | 'project' | 'resume'`. Any remaining reference to `'work'`/`'about'` as a `RouteKey` now fails to typecheck — this is the mechanical safety net for this task.

- [ ] **Step 1: Confirm no remaining consumers before deleting anything**

Run: `grep -rln "'work'\|\"work\"\|'about'\|\"about\"" src/ --include="*.astro" --include="*.ts"`
Expected output: only `src/components/FieldIndexRail.astro` (only ever used by `WorkPage.astro`, being deleted in this same task), `src/components/pages/WorkPage.astro`, `src/components/pages/AboutPage.astro`, `src/i18n/routes.ts`, `src/pages/work.astro`, `src/pages/zh/work.astro`, `src/pages/about.astro`, `src/pages/zh/about.astro`. If any other file appears, stop — Tasks 1-3 must be complete and committed first.

- [ ] **Step 2: Update routes.test.ts**

Replace the full contents of `tests/i18n/routes.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { alternateLocalePath, localizedPath } from '../../src/i18n/routes';

describe('localizedPath', () => {
  it('keeps English at the root and Chinese under /zh', () => {
    expect(localizedPath('en', 'home')).toBe('/');
    expect(localizedPath('zh', 'home')).toBe('/zh/');
    expect(localizedPath('en', 'resume')).toBe('/resume/');
    expect(localizedPath('zh', 'resume')).toBe('/zh/resume/');
  });

  it('preserves project context across locales', () => {
    expect(localizedPath('en', 'project', 'core-ai')).toBe('/projects/core-ai/');
    expect(localizedPath('zh', 'project', 'core-ai')).toBe('/zh/projects/core-ai/');
  });

  it('requires a project slug', () => {
    expect(() => localizedPath('en', 'project')).toThrow('project routes require a slug');
  });

  it.each(['../resume', 'a/b', 'Core-AI', '-core-ai', 'core-ai-', ''])(
    'rejects invalid project slug %j',
    (slug) => {
      expect(() => localizedPath('en', 'project', slug)).toThrow(
        'project routes require a lowercase kebab-case slug',
      );
    },
  );
});

describe('alternateLocalePath', () => {
  it.each([
    ['/', '/zh/'],
    ['/zh/', '/'],
    ['/resume/', '/zh/resume/'],
    ['/zh/projects/core-ai/', '/projects/core-ai/'],
  ])('maps %s to %s', (input, expected) => {
    expect(alternateLocalePath(input)).toBe(expected);
  });
});
```

Note: this test will pass immediately against the *current* `routes.ts` too — `resume` already exists today, so there's no red state to observe here (unlike Tasks 1-4, this task is deletion, not new behavior). The real verification is the full-suite run in Step 8; proceed directly to updating `routes.ts`.

- [ ] **Step 3: Update routes.ts**

Replace the top of `src/i18n/routes.ts`:

```ts
export type RouteKey = 'home' | 'work' | 'projects' | 'project' | 'about' | 'resume';

const fixedRoutes: Record<Exclude<RouteKey, 'project'>, Record<Locale, string>> = {
  home: { en: '/', zh: '/zh/' },
  work: { en: '/work/', zh: '/zh/work/' },
  projects: { en: '/projects/', zh: '/zh/projects/' },
  about: { en: '/about/', zh: '/zh/about/' },
  resume: { en: '/resume/', zh: '/zh/resume/' },
};
```

with:

```ts
export type RouteKey = 'home' | 'projects' | 'project' | 'resume';

const fixedRoutes: Record<Exclude<RouteKey, 'project'>, Record<Locale, string>> = {
  home: { en: '/', zh: '/zh/' },
  projects: { en: '/projects/', zh: '/zh/projects/' },
  resume: { en: '/resume/', zh: '/zh/resume/' },
};
```

- [ ] **Step 4: Delete the Work and About files**

```bash
git rm src/components/pages/WorkPage.astro
git rm src/components/pages/AboutPage.astro
git rm src/components/FieldIndexRail.astro
git rm src/pages/work.astro src/pages/zh/work.astro
git rm src/pages/about.astro src/pages/zh/about.astro
```

- [ ] **Step 5: Remove the dead CSS**

In `src/styles/global.css`, delete the entire block from `.work-ledger` through the second `.about-interest-list li, .resume-inline-list li` rule (currently lines 784-1072 inclusive), and replace it with only the declarations that `.resume-*` selectors still need (the `.resume-role__meta { ... }` and `.resume-role__title { ... }` rules in that range are untouched — they're not shared with any deleted selector — but the *shared* rules need their `.work-*`/`.about-*` half of the selector list removed while keeping the declaration block for the surviving `.resume-*` selector). Replace the full 784-1072 range with:

```css
.resume-section > h2 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.3;
  text-transform: none;
}

.resume-role__meta {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.5;
}

.resume-role__meta p {
  margin: 0;
}

.resume-role__title {
  margin: 0.35rem 0 0;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
}

.resume-record-list {
  display: grid;
  gap: 1rem;
  margin: 2rem 0 0;
  padding-inline-start: 1.25rem;
}

.resume-record-list li {
  padding-inline-start: 0.3rem;
}

.resume-record-list a {
  font-weight: 600;
  text-decoration-color: var(--rule);
}

.resume-record-list small {
  display: block;
  margin-top: 0.35rem;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  line-height: 1.45;
}

.resume-inline-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.resume-inline-list li {
  padding: 0.45rem 0.65rem;
  border: 1px solid var(--text);
  font-family: var(--font-mono);
  font-size: 0.7rem;
}
```

Verify afterward with: `grep -n "work-\|about-" src/styles/global.css` — expected output: empty (no matches anywhere in the file, including the `@media print` block).

- [ ] **Step 6: Update profile-pages.test.ts**

This file directly reads `AboutPage.astro` and `WorkPage.astro` source in three places — all three need to change since those files no longer exist.

Replace the `profile page shared data` test's page-reading section — currently:

```ts
    const [aboutPage, resumePage] = await Promise.all([
      source('src/components/pages/AboutPage.astro'),
      source('src/components/pages/ResumePage.astro'),
    ]);
    for (const page of [aboutPage, resumePage]) {
      expect(page).toContain("from '../../data/profile'");
      expect(page).not.toContain('Fujian Medical University');
      expect(page).not.toContain('Ball sports');
    }
```

with:

```ts
    const resumePage = await source('src/components/pages/ResumePage.astro');
    expect(resumePage).toContain("from '../../data/profile'");
    expect(resumePage).not.toContain('Fujian Medical University');
    expect(resumePage).not.toContain('Ball sports');
```

Delete the entire `it('filters Work by explicit field without positional or reverse ordering', ...)` test (its subject, `WorkPage.astro`'s field filter, no longer exists) but keep the `it('assigns the reviewed field sequence while keeping source chronology', ...)` test right above it in the same `describe('explicit experience fields', ...)` block — that one tests the `experience` data directly, unrelated to Work/About.

Delete the entire `it('uses sibling labelled sections for interests and contact', ...)` test in the `describe('print and profile semantics', ...)` block (its subject, `AboutPage.astro`'s section structure, no longer exists). Keep the other two tests in that `describe` block (`hides the complete screen shell...` and `renders print-only contact destinations...`) — both test `global.css`/`ResumePage.astro`, unrelated to Work/About.

- [ ] **Step 7: Update validate-build-output.mjs**

In `scripts/validate-build-output.mjs:63`, replace:

```js
assert(htmlFiles.length === 21, `expected 21 built HTML files, found ${htmlFiles.length}`);
```

with:

```js
assert(htmlFiles.length === 17, `expected 17 built HTML files, found ${htmlFiles.length}`);
```

Delete the dedicated About assertion block (currently lines 108-111):

```js
  if (route === '/about/' || route === '/zh/about/') {
    assert(metaContent(html, 'property', 'og:type') === 'website', `${route}: about must use og:type website`);
    assert(metaContent(html, 'property', 'og:image') === undefined, `${route}: about must not emit an image`);
    assert(jsonLd.length === 0, `${route}: about must not emit JSON-LD`);
  }
```

- [ ] **Step 8: Run the full verification suite**

```bash
npx astro check
npm test
npm run build
```

Expected: all three succeed with no errors. `npm run build` should report `17 page(s) built` and pass `validate:build-output` and `scan:public-safety`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "refactor: remove Work and About pages, routes, dead CSS, and their tests"
```

---

## Final Verification (after all 5 tasks)

- [ ] Run `npm test` — full suite green.
- [ ] Run `npx astro check` — zero type errors.
- [ ] Run `npm run build` — succeeds, 17 pages.
- [ ] Manually browse (via `npm run preview`) both locales of Home, Projects, Projects/core-ai, and Résumé; confirm `/work/` and `/about/` (and `/zh/` variants) 404 as expected.
- [ ] Confirm Résumé's on-screen and print rendering are both unaffected (this plan touched no Résumé-specific CSS or markup, only removed the `.about-evidence`/`.work-*` half of shared selectors).
