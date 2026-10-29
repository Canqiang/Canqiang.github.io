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

The restaurant-AI summary now includes implemented Local SEO research, content, collection and review workflows. It does not disclose merchant details or private metrics, or claim that observed ranking movements establish causal SEO or revenue gains.

The existing web résumé remains the maintained source; this update does not replace separate historical documents or video production assets.

## Validation

- 69 tests passed; Astro reported zero errors, warnings or hints; all five bilingual project pairs validated.
- All 17 static pages built successfully; metadata and public-safety checks passed.
- Lychee checked 438 link occurrences with zero errors.
- Lighthouse CI passed the existing performance, accessibility, best-practices and SEO thresholds across six URLs and 18 runs.
- Browser checks covered English/Chinese home, résumé and competition pages at 1440px and 390px with no horizontal overflow or page errors.
- Both résumé PDFs contain two pages; all four rendered pages were inspected for layout and legibility. Exports stay in the ignored local `output/pdf/` directory.
