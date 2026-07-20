# Xander Xu — Personal Portfolio

A bilingual, static portfolio for Xander Xu (Canqiang Xu), built with Astro and deployed to GitHub Pages. It presents selected AI platform work, open-source contributions, research, competitions, and a concise professional history.

## Route model

English is the default language. Every public content page has a Chinese counterpart under `/zh/`.

| English | Chinese |
| --- | --- |
| `/` | `/zh/` |
| `/work/` | `/zh/work/` |
| `/projects/<slug>/` | `/zh/projects/<slug>/` |
| `/about/` | `/zh/about/` |
| `/resume/` | `/zh/resume/` |

Project content files are paired by filename: `src/content/projects/<slug>.en.md` and `src/content/projects/<slug>.zh.md`. The translation validator fails when a pair is missing or when shared route, category, date facts, link targets, featured/order, image, or draft metadata diverges. Titles, summaries, roles, technology labels, and link labels remain localized.

## Local development

Requires Node.js 24.18.0 or newer.

```bash
npm ci
npm run dev
```

The main verification commands are:

```bash
npm test
npm run check
npm run generate:og
npm run build
npm run scan:public-safety
lychee --config lychee.toml \
  --root-dir "${PWD}/dist" \
  --remap "https://canqiang.github.io/ file://${PWD}/dist/" \
  'dist/**/*.html'
npx --no-install lhci autorun
```

The local link command requires Lychee v0.24.2. Its remap checks absolute canonical and alternate-language URLs against the current `dist/` output, including before the first public deployment. `npm run check` validates bilingual content pairs and runs Astro's type/content checks. `npm run generate:og` deterministically regenerates the social cards and favicon. `npm run build` also validates final canonical, hreflang, JSON-LD, social-card, and 404 metadata before scanning tracked and generated files for public-safety regressions. Lighthouse audits the English and Chinese home pages plus both Core-AI detail pages, enforcing a score of at least 0.95 in performance, accessibility, best practices, and SEO.

## Content and public-safety rules

- Add or update both language versions of every project in the same change.
- Keep shared facts, dates, links, featured flags, and image metadata aligned across each pair.
- Publish only information already intended for a public portfolio. Do not add internal URLs, credentials, customer data, private metrics, or proprietary implementation details.
- Describe Core-AI as a team-built open-source framework and Xander as a contributor; do not imply sole authorship.
- Treat Kaggle as one peer achievement among projects, research, open source, and other competitions.

## Release gates and deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. The workflow installs from the lockfile, runs tests and Astro/translation checks, regenerates social images, builds the static site, checks generated links with Lychee, and runs Lighthouse CI. GitHub Pages deployment starts only after every gate succeeds. The workflow can also be started manually with `workflow_dispatch`.

Before the first push to a new repository, enable the GitHub Pages Actions source once:

```bash
gh api --method POST repos/Canqiang/Canqiang.github.io/pages -f build_type=workflow
```

For this repository the setting is already active; the command documents the required bootstrap state for reproducibility.

## License

The website source code is available under the scoped MIT terms in `LICENSE`. Personal writing, résumé content, biographical information, and photography are © Xander Xu and are not granted for reuse by that source-code license.
