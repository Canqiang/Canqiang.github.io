# Terminal Consolidation Design

**Supersedes:** [2026-07-20-portfolio-redesign-research-log-design.md](2026-07-20-portfolio-redesign-research-log-design.md) on page structure (drops the Work and About pages) and on the Hero's visual treatment (adds the terminal-shell presentation). All other decisions from that spec — dark-default theme, amber accent, the Projects and Resume page designs, the WCAG/contrast baseline, the public-safety constraints — carry forward unchanged.

**Goal:** Cut the site from 5 page templates to 3 (Home, Projects, Résumé), and give the Home hero a decorative terminal-shell identity so the site reads as more distinctly "geek and technical," without introducing a real command-driven navigation surface.

**Architecture:** Delete the Work and About page templates and routes; retarget every internal link that pointed at them to Résumé (or, for in-page anchors, to Home's own sections); re-skin the Home hero as a terminal window with a one-time typewriter reveal; restyle the persistent nav with a path-prefix convention. Résumé and Projects keep their current document-style layouts untouched — the terminal identity is confined to the Home hero and the nav chrome, not applied to long-form reading content.

**Tech Stack:** No new dependencies. Typewriter animation is small vanilla JS (progressive enhancement — full content is present in the DOM without it), respecting `prefers-reduced-motion`.

## Global Constraints

- No runtime GitHub/Kaggle API calls (build-time only) — unchanged from the original spec.
- Core-AI must stay framed as team-built/contributor work, not sole authorship — unchanged.
- No phone numbers, credentials, or internal-only data anywhere in content — unchanged.
- No overclaiming unproven results — unchanged.
- Dark-default theme (no `prefers-color-scheme` fallback) — unchanged.
- The amber accent (`--accent`) is the terminal's "customized prompt color" — do not switch to a generic green/phosphor palette.
- The typewriter reveal is decorative only: it must not gate content availability (all text is real DOM content, not JS-injected-only) and must not require typing to navigate anywhere. Every actionable element it reveals is a real `<a>`/`<button>` from first paint.
- Animation plays at most once per browser session (`sessionStorage`), and is skipped entirely under `prefers-reduced-motion: reduce`.
- GitHub Pages is static hosting with no server-side redirects. Removing `/work/` and `/about/` (and their `/zh/` counterparts) will 404 for anyone with an old bookmark or external link. This is accepted — no redirect pages are in scope.

## Page structure: 5 templates → 3

| Route | Disposition |
|---|---|
| `/`, `/zh/` (Home) | Kept. Hero gets the terminal-shell treatment (below). All four sections (Current practice, Career axis, Evidence index, Contact) keep their current content and components. |
| `/work/`, `/zh/work/` | **Removed.** `WorkPage.astro`, `work.astro`, `zh/work.astro` deleted. |
| `/projects/`, `/zh/projects/`, `/projects/[slug]/`, `/zh/projects/[slug]/` | Unchanged. |
| `/about/`, `/zh/about/` | **Removed.** `AboutPage.astro`, `about.astro`, `zh/about.astro` deleted. |
| `/resume/`, `/zh/resume/` | Kept, unchanged in content — it already renders the full `experience` (with highlights), `education`, `publications`, `patents`, and `interests` data that Work and About were duplicating. |

### Content migration

Both removed pages turn out to be near-total duplicates of data already rendered on Home or Résumé:

- **Work's** per-field grouping and role highlights: the highlights come from the same `experience` data Résumé already renders in full; the field-level grouping/summary is already covered by Home's "Current practice" `FieldCards`. Nothing unique is lost.
- **About's** Education, Publications+Patents, and Interests sections: byte-for-byte the same `education`/`publications`/`patents`/`interests` data Résumé already renders. Its Contact section renders the same `ContactLinks` component Home's section 04 already shows.
- **About's one unique element** — the bio paragraph (`copy.bio`, a "began in bioinformatics, moved through medical AI and LLM products, now focused on agent systems" trajectory sentence) — has no dedicated home. Fold its trajectory framing into the Home Hero's `identity.introduction` copy or the Career Axis lede (`copy.axisLede`) if it reads naturally; do not create a new section for one sentence.

### Interface updates required

These are the concrete call sites that reference the removed routes, identified by reading the current source:

| File | Current behavior | New behavior |
|---|---|---|
| `src/i18n/routes.ts` | `RouteKey` includes `'work' \| 'about'`; `fixedRoutes` has entries for both | Remove both from the type and the map |
| `src/components/Header.astro` | Nav renders Work/Projects/About (`copy.work`, `copy.about`); Resume is not in the nav at all | Nav becomes Projects/Résumé only, styled with the path-prefix convention (below); drop the `work`/`about` copy keys and nav entries |
| `src/components/AchievementIndex.astro` | `destination()` sends `publications`/`patents` cells to `${aboutPath}#record` | Point at the matching Résumé anchor (Résumé's `<h2>` elements already have stable ids: `resume-publications-title`, `resume-patents-title`) |
| `src/components/CareerAxis.astro` (rendered from `HomePage.astro`) | "View full experience" (`copy.fullExperience`) links to `localizedPath(locale, 'work')` | Link to `localizedPath(locale, 'resume')` |
| `src/components/FieldCards.astro` (Home's "Current practice" cards) | Each card links to `${workPath}#${card.key}` | Link to `localizedPath(locale, 'resume')` (Résumé isn't field-grouped, so this is a page-level link, not an anchor) |
| `src/components/FieldIndexRail.astro` | Only ever rendered by `WorkPage.astro`, as that page's own in-page jump nav | Dead once Work is deleted — delete the component file too |
| `tests/i18n/routes.test.ts` | Asserts `work`/`about` resolve to `/work/`, `/about/` | Remove those assertions |
| `tests/design/homepage-flow.test.ts` | Has assertions referencing the About route | Remove/update those assertions |
| `scripts/validate-build-output.mjs:63` | Asserts `htmlFiles.length === 21` | Update to `17` (21 minus the 4 removed HTML files) |
| `scripts/validate-build-output.mjs:108-111` | Dedicated `/about/`/`/zh/about/` assertion block (og:type, no og:image, no JSON-LD) | Delete this block; no other route needs it |

`lychee.toml` globs `dist/**/*.html` and the sitemap integration derives its list from the actual build output — neither hard-codes route paths, so neither needs a change.

## Visual direction: decorative terminal shell

Confirmed via the visual-companion mockups during brainstorming (three directions compared: full terminal roleplay, evolved-Research-Log-with-geek-accents, systems/infra-monitoring aesthetic — full terminal roleplay was chosen, then scoped down from "real CLI navigation" to "decorative shell only" after discussing the accessibility/recruiter-legibility risk of requiring typed commands).

### Home Hero (`src/components/Hero.astro`)

- Wrap the existing hero copy in a terminal window: title-bar row with three traffic-light dots (red/yellow/green, decorative, `aria-hidden`) and a `xander@canqiang:~ — 80×24`-style label, framing a bordered "terminal body" panel using the existing dark surface tokens.
- On first visit this session, the existing stamp/headline/summary reveal via a typewriter effect styled as a sequence of commands. Every current text element keeps its content and visual weight — this is a re-skin, not a rewrite:
  - `$ whoami` → a small mono identity line absorbing today's stamp (`identity.name`/`chineseName` + `identity.role`, plus the existing "EST. 2017"), the same visual weight as today's `.portfolio-hero__stamp`
  - `$ cat mission.md` → the headline (`identity.headline`) **and** the summary (`identity.introduction`) together, as one file's title + body — the headline keeps today's large serif treatment (it's still the visually dominant element on the page; terminal "output" doesn't have to be monospace-small, a rendered file can look like anything)
  - `$ ls ./` → the two existing action buttons, restyled as `ls -l`-style rows (e.g. `drwxr-xr-x  projects/`, `-rw-r--r--  resume.pdf`) — **these remain the same real `<a>` elements as today**, just re-skinned; their destinations (`#current-practice`, résumé) do not change.
  - (The early brainstorming mockup shown to the user sized these backwards — identity line big, mission statement small. This spec corrects that: the mission statement is the headline and must stay dominant.)
- A blinking-cursor block follows the last revealed line while typing, then settles at rest after the sequence completes.
- No live input field. Nothing on the page invites the visitor to type a command that does nothing — that trap is explicitly out of scope.
- Progressive enhancement: with JS disabled, all lines render immediately and fully, unanimated — the DOM contains the real headline/summary/links either way, so this costs nothing for SEO or no-JS visitors.
- `prefers-reduced-motion: reduce` disables the typing effect; content appears at rest immediately.
- Plays once per `sessionStorage` flag; repeat page loads within the same session render at rest.

### Persistent nav (`src/components/Header.astro`)

- Nav items become path-styled: `~/projects`, `~/resume` (mono, matching the existing `--font-mono` label convention already used elsewhere for eyebrows/stamps — not a new font).
- The identity mark (`Xander / Canqiang`) keeps its current position and normal-case styling (already normalized this session); no titlebar chrome added to the persistent header itself — the window-chrome treatment is a Hero-only device, not repeated on every page, so it doesn't compete with page content.

### Everything else (Projects, Résumé, Home's non-hero sections)

- Unchanged in structure and typography. No terminal-output cosplay applied to prose, project write-ups, or the résumé document — those need to stay scannable and, for Résumé, printable. The existing monospace eyebrows/labels/stamps already carry enough of the "technical" signal there.

## Testing

- `tests/i18n/routes.test.ts`: remove `work`/`about` route assertions.
- `tests/design/homepage-flow.test.ts`: remove/update About-route assertions; add coverage that Hero's real CTAs (`#current-practice`, résumé link) are present in the server-rendered HTML regardless of JS (progressive enhancement check — fetch the built HTML and assert the anchors exist).
- New test: typewriter script does not block or hide the CTA links from the DOM (i.e., assert they're real `<a href>` elements in the static markup, not injected only by the animation script).
- New test: `AchievementIndex`, `CareerAxis`, `FieldCards` destinations point at `resume`, not `work`/`about`, after the route type no longer has those keys (this should also just be a compile-time guarantee once `RouteKey` drops them — any lingering `localizedPath(locale, 'work')` call fails to typecheck).
- `scripts/validate-build-output.mjs`: update the hardcoded `21` count to `17` and delete the now-dead `/about/`/`/zh/about/`-specific assertion block.

## Out of scope

- No real command-line-driven navigation (explicitly rejected during brainstorming).
- No visual changes to Projects index/detail pages or the Résumé document layout beyond what's already shipped.
- No redirect pages for the removed `/work/` and `/about/` routes.
- No change to the GitHub Activity heatmap, achievement grid data, or dark/light theme mechanics.
