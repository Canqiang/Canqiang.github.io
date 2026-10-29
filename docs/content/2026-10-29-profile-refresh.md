# Profile refresh — 29 October 2026

The English and Chinese home pages and printable résumés share the public achievement snapshot in `src/data/profile.ts`. Audience and profile figures are dated snapshots, not live counters.

## Public evidence

Checked on 29 October 2026, approximately 11:15–11:16 Asia/Shanghai:

| Claim | Verified value | Public source |
| --- | --- | --- |
| Kaggle notebook tier | Notebooks Master | [Kaggle profile](https://www.kaggle.com/canqiang) |
| Notebook medals | 6 gold, 4 silver | Same profile, Notebooks achievement card |
| Competition tier and medals | Competitions Expert; 2 silver, 5 bronze | [Completed competitions](https://www.kaggle.com/canqiang/competitions) |
| Bilibili followers | 24,091 | [Official relation API](https://api.bilibili.com/x/relation/stat?vmid=255230761), successful response, `data.follower` |
| Transformer explainer | 157,527 views; 12,152 saves | [Video](https://www.bilibili.com/video/BV1A4XWBqEhW), [official video API](https://api.bilibili.com/x/web-interface/view?bvid=BV1A4XWBqEhW) |

Kaggle's current profile was read directly; older search snippets still carried the former notebook tier. The Master title refers specifically to Notebooks, not Competitions. Notebook medals and competition medals remain separate throughout the site.

The three newly included competition bronze medals were verified on the completed-competition list: AI Agent Security — Multi-Step Tool Attacks (268 / 4,186), Kaggriculture (628 / 10,148), and PTCG AI Battle Challenge Simulation (671 / 6,807). The four existing medal placements were also checked against that list. Current global ranks are intentionally omitted because they change frequently.

The Bilibili video API identifies the same channel owner, UID 255230761. Channel-wide cumulative views and video counts are omitted because a current, comparable snapshot was not established.

## Engineering and product scope

Core-AI remains a team-built project. Its public README now includes the desktop preview client alongside the Java framework, CLI, server and web interface. The project page links specific contributions to public commits covering model routing, sandbox retention and desktop IME behavior. It also describes macOS preview-package verification and bilingual documentation work without attributing the entire desktop client to one contributor.

The profile emphasizes machine-learning algorithms and AI infrastructure: deep-learning modeling, RAG, LoRA adaptation, model interfaces, tool execution, durable state and recovery. Work experience precedes public achievements in the résumé. Business domains are supporting context; Local SEO is summarized in one application-experience sentence per relevant page. This positioning describes established contributions and does not add claims of foundation-model pretraining, distributed training or inference-kernel optimization.

The existing web résumé remains the maintained source; this update does not replace separate historical documents or video production assets.

## Initial refresh validation

- 69 tests passed; Astro reported zero errors, warnings or hints; all five bilingual project pairs validated.
- All 17 static pages built successfully; metadata and public-safety checks passed.
- Lychee checked 438 link occurrences with zero errors.
- Lighthouse CI passed the existing performance, accessibility, best-practices and SEO thresholds across six URLs and 18 runs.
- Browser checks covered English/Chinese home, résumé and competition pages at 1440px and 390px with no horizontal overflow or page errors.
- Both résumé PDFs contain two pages; all four rendered pages were inspected for layout and legibility. Exports stay in the ignored local `output/pdf/` directory.

## Technical positioning revision validation

The revised copy passed all 69 tests, Astro checks, five bilingual-pair checks, the 17-page build and public-safety checks. Link validation again reported 438 occurrences with zero errors. Browser inspection at 1440px and 390px found no overflow or page errors; home pages contain no Local SEO references, while each résumé and LLM-system page contains one. Both regenerated PDFs remain two pages, with work experience before public achievements; all four rendered pages and the revised social card were inspected. The deployment workflow continues to require Lighthouse CI before publication.

## Role-specific résumés and evidence corrections

The maintained résumé now has two focuses in both languages: AI systems at `/resume/` and `/zh/resume/`, and algorithm R&D at `/resume/algorithms/` and `/zh/resume/algorithms/`. Language switching preserves the selected focus. Both variants share source career dates and public-achievement snapshots, while `src/data/resume.ts` selects role-specific summaries, skills, projects and contribution bullets.

The systems version leads with runtime consistency, cross-pod state recovery and model-protocol work. The algorithm version leads with AIMO inference/answer-selection experiments and Orbit Wars policy experiments, and expands earlier image-modeling, GMM and co-first-author research. Both preserve a one-sentence Local SEO application context. Bilibili is a compact technical-communication entry; interests and the full patent list remain outside the targeted résumé.

The project pages now link attributable Core-AI commits and distinguish inherited competition infrastructure from personal changes. Unsupported AIMO startup and stable-score improvements and NeuroGolf universal-gate/full-record claims have been removed. See `2026-10-29-project-evidence.md` and `2026-10-29-resume-evidence.md` for source boundaries.

### PDF regeneration

Four PDFs are served from `public/resumes/` and copied to the ignored `output/pdf/` folder. After changing résumé content or print styles:

1. Build the site and run its preview server on port 4321.
2. Run `node scripts/export-resumes.mjs` with Playwright available. For a bundled runtime, set `PLAYWRIGHT_MODULE` to its absolute `playwright/index.mjs` path. Google Chrome is the default browser; `RESUME_BROWSER_CHANNEL` can select another installed Playwright channel.
3. Render and inspect every PDF page, then rebuild so the public PDF copies are included in `dist/`.

`RESUME_PREVIEW_URL` can select a different preview origin. The export does not run model experiments or alter public-profile metrics.

### Role-specific release validation

- 71 tests passed; Astro reported zero errors, warnings or hints; five bilingual project pairs validated.
- 19 static pages built; metadata and public-safety validation passed.
- Lychee checked 514 link occurrences with zero errors.
- Ten affected pages were checked at 1440px and 390px, with no horizontal overflow or JavaScript page errors. All four résumé pages preserved focus across language switching; the PDF responses matched the corresponding public files byte for byte.
- All four PDFs contain two A4 pages. All eight rendered pages were inspected; text and clickable project/paper references were checked, and public/local copies matched by SHA-256.
- Lighthouse passed the existing 95-point thresholds for all four résumé routes. The English mobile navigation labels were shortened to prevent a font-loading wrap from shifting the document. Accessibility, best practices and SEO scored 100 in these local runs.
- The deployment workflow now includes the four résumé routes in its regular Lighthouse checks (ten URLs, three runs each).
