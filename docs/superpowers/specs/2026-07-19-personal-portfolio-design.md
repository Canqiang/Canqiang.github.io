# Xander Xu Bilingual Personal Portfolio Design

**Date:** 2026-07-19

**Status:** Approved in conversation; awaiting written-spec review

**Repository:** `/Users/xander/git_repo/Canqiang.github.io`

**Target URL:** `https://canqiang.github.io`

## 1. Objective

Build a bilingual personal portfolio that serves two goals equally:

1. Help recruiters and prospective collaborators understand Xander Xu's experience and current positioning quickly.
2. Maintain a durable, evidence-backed public record of engineering work, open-source contributions, research, products, and selected competition results.

The page's single job is to establish, within the first viewport, that Xander is an experienced AI platform engineer who turns models and research into usable systems.

The site must not be a visual clone of the reference portfolio. It may reuse the reference site's successful technical pattern—Astro, static generation, Markdown content, and GitHub Pages—but it will use Xander's own editorial visual identity and career narrative.

## 2. Confirmed Decisions

- The site serves job-search and technical-reputation goals equally.
- The site is fully bilingual.
- English is the default language at `/`.
- Chinese pages live under `/zh/`.
- The visual direction is **Technical Field Notes**.
- Kaggle is one category of achievement, not a primary navigation item or dominant homepage feature.
- Core-AI is described accurately as an **open-source AI Agent framework**, not an internal company platform.
- ChanceTop employment begins on **2025-07-15** and continues to the present.
- The public-facing ChanceTop role label is **AI Platform Engineer / AI 平台研发工程师**.
- The implementation uses Astro and deploys to GitHub Pages.
- The local repository is `Canqiang.github.io` under `/Users/xander/git_repo`.

## 3. Audience

### Primary audiences

- AI engineering recruiters and hiring managers
- Open-source collaborators and technical peers
- Product and engineering leaders evaluating applied AI experience

### Secondary audiences

- Researchers reviewing Xander's biomedical AI work
- Readers discovering technical writing or project case studies
- Competition peers following selected Kaggle work

## 4. Positioning and Narrative

### English hero

**Label:** AI Platform Engineer

**Headline:** Models are only useful when they ship.

**Supporting copy:**

> I build open-source agent frameworks and applied AI systems, with a career spanning bioinformatics, medical vision, LLM products, and workflow infrastructure.

### Chinese hero

**Label:** AI 平台研发工程师

**Headline:** 模型只有真正落地，才有价值。

**Supporting copy:**

> 我专注于开源智能体框架与应用型 AI 系统研发，经历覆盖生物信息、医疗视觉、大模型产品与工作流基础设施。

### Career narrative

The site presents a continuous progression rather than a list of unrelated jobs:

`Bioinformatics → Medical AI → LLM Products → Agent Systems`

Chinese:

`生物信息 → 医疗 AI → 大模型产品 → 智能体系统`

This progression becomes the site's signature field-index rail and the organizing principle for the Work page.

## 5. Information Architecture

### English routes

- `/` — Home
- `/work/` — Full experience timeline
- `/projects/` — Selected project index
- `/projects/core-ai/` — Core-AI flagship case study
- `/about/` — Education, research, patents, interests, and contact
- `/resume/` — Current printable web résumé
- `/404.html` — English-first bilingual not-found page

### Chinese routes

- `/zh/` — 首页
- `/zh/work/` — 工作经历
- `/zh/projects/` — 项目索引
- `/zh/projects/core-ai/` — Core-AI 案例页
- `/zh/about/` — 关于、教育、科研、专利与兴趣
- `/zh/resume/` — 可打印的最新中文 Web 简历

### Writing

The codebase will include a localized writing content collection. Writing will not appear in the primary navigation until at least one substantive article is published. The first writing route must not ship as an empty page.

### Navigation

English navigation:

`XANDER / CANQIANG · Work · Projects · About · 中文`

Chinese navigation:

`XANDER / CANQIANG · 经历 · 项目 · 关于 · EN`

The language switch preserves page context. For example, `/projects/core-ai/` switches to `/zh/projects/core-ai/`, not `/zh/`.

## 6. Homepage Structure

The homepage follows this order:

1. **Hero** — role, headline, concise positioning, real speaking photo, résumé and work actions
2. **Field-index rail** — the four-stage career progression
3. **Selected work** — Core-AI first, then representative work across medical AI, applied AI products, research, and other engineering projects
4. **Experience preview** — condensed timeline with a link to the full Work page
5. **Achievement index** — publications, patents, open-source work, and competitions shown as peer categories
6. **Contact** — GitHub, Kaggle, email, and résumé links

Kaggle does not receive a homepage hero statistic, a dedicated navigation item, or a separate homepage section. It appears as one achievement source and as relevant project evidence.

## 7. ChanceTop and Core-AI Public Copy

### English

**ChanceTop — AI Platform Engineer**

**Jul 15, 2025 — Present**

> Core contributor to Core-AI, an open-source AI Agent framework integrating an SDK, terminal agent, self-hosted server, and web UI.

- Designed and shipped durable agent workflow capabilities, including human-in-the-loop steps, nested workflows, run resumption, artifact delivery, and execution tracing.
- Built model-gateway and multi-provider runtime integrations across OpenAI-compatible and Responses APIs.
- Strengthened reliability through session recovery, observability, sandbox snapshot and restore, and deployment validation.
- Delivered features end to end across the Java backend, React and TypeScript frontend, CLI, tests, and cloud runtime.

### Chinese

**畅拓科技 — AI 平台研发工程师**

**2025 年 7 月 15 日 — 至今**

> Core-AI 核心贡献者。Core-AI 是集成 SDK、终端 Agent、自托管服务端与 Web UI 的开源 AI Agent 框架。

- 设计并交付智能体工作流的关键能力，包括人工介入、嵌套工作流、运行恢复、产物交付与执行追踪。
- 建设模型网关与多供应商运行时集成，覆盖 OpenAI 兼容接口与 Responses API。
- 通过会话恢复、可观测链路、沙箱快照恢复和部署验证提升系统可靠性。
- 贯通 Java 后端、React/TypeScript 前端、CLI、自动化测试与云端运行环境，完成端到端交付。

### Public-safety rule

The public copy may describe capabilities already visible in the public Core-AI repository. It must exclude:

- customer identities and private use cases
- private hostnames, clusters, namespaces, or deployment topology
- credentials, tokens, account identifiers, and internal URLs
- unpublished performance, revenue, adoption, or reliability metrics
- confidential roadmap items and private architecture details

## 8. Project Taxonomy

Projects are organized by subject, not by prestige ranking:

- **Open Source** — Core-AI and other public repositories
- **Applied AI Products** — LLM applications, multimodal interaction, RAG, and agent products
- **Medical AI** — pathology vision, spatial transcriptomics, immunotherapy response, and biomedical data systems
- **Research** — publications, patents, and research engineering
- **Competitions** — selected Kaggle and PrecisionFDA results

Core-AI is the flagship project because it best represents current work and end-to-end platform scope. Kaggle remains one category within the overall record.

## 9. Core-AI Case Study

The Core-AI page contains:

1. Open-source status and repository link
2. Concise framework definition
3. Public architecture overview: SDK, terminal agent, server, Web UI
4. Xander's contribution areas
5. Selected public-safe engineering stories:
   - durable agent workflows
   - model gateway and provider integrations
   - traces and observability
   - sandbox snapshot and recovery
   - session lifecycle and reliability
6. Technology index
7. Links to GitHub source and public documentation

The case study must distinguish clearly between project-wide capability and Xander's individual contribution. It must not claim sole authorship.

## 10. Visual System

### Direction

Technical Field Notes: a cool, precise editorial system inspired by engineering notebooks, research indexes, and conference materials. It must feel authored and personal, not like a generic newspaper template.

### Color tokens

- `paper-cool: #F1F4F8` — primary background
- `carbon: #111318` — primary text and structural rules
- `signal-blue: #2456E8` — actions, current state, and links
- `circuit-violet: #6D3AE8` — secondary technical accent
- `graphite: #687080` — supporting text
- `signal-coral: #FF5C35` — rare emphasis only; never used for long text

Signal blue on the cool paper background must meet WCAG AA contrast for normal text. Coral is reserved for small non-text accents or large, contrast-safe labels.

### Typography

- Display: Barlow Condensed, heavy weights, restrained to hero and major section titles
- Body: IBM Plex Sans
- Technical and metadata: IBM Plex Mono
- Chinese fallback: PingFang SC, Source Han Sans SC/Noto Sans CJK SC, Microsoft YaHei, sans-serif
- Fonts are self-hosted where practical and use `font-display: swap`

### Layout

- Maximum content width: 1180 px
- Desktop: asymmetric split hero with text and speaking photo
- Mobile: single column; headline precedes photo
- Strong horizontal rules encode content boundaries
- Grid cells represent project categories and evidence types
- Structural labels must communicate real taxonomy; decorative numbering is avoided

### Signature element

The field-index rail tracks the progression from bioinformatics to agent systems and provides direct anchors to the corresponding Work sections. Hover and keyboard-focus accents expose its interactive state without requiring scroll-tracking JavaScript. It is the one deliberate visual signature; surrounding components remain restrained.

### Image treatment

- Use the real AI hackathon speaking photo from the supplied Word document
- Crop for subject focus, preserve the original aspect ratio source, and generate responsive variants
- Apply a subtle grayscale treatment with a signal-blue event label
- Do not use stock imagery or generated portraits
- Provide accurate bilingual alt text

### Motion

- One coordinated hero entrance: headline reveal, image crop reveal, and event-label slide
- Subtle project-card hover state
- No scattered scroll animations
- All nonessential motion is disabled under `prefers-reduced-motion: reduce`

## 11. Responsive and Accessible Behavior

- Supported layout widths include 360 px, 768 px, 1024 px, and 1440 px
- The primary navigation collapses into an accessible menu on narrow screens
- Every interactive control is keyboard reachable
- Focus states are visible and use signal blue
- Semantic landmarks and heading order are valid
- Images include meaningful alternative text
- Link meaning is understandable without color alone
- Target sizes support touch interaction
- The language switch exposes the destination language to assistive technology

## 12. Technical Architecture

### Stack

- Astro with TypeScript
- Astro content collections with schema validation
- CSS custom properties and component-scoped styles
- Markdown or MDX for projects and future writing
- Static output only
- GitHub Actions deployment to GitHub Pages

No React runtime is required for v1. Astro components and minimal browser JavaScript are preferred.

### Component boundaries

- `BaseLayout` — metadata, canonical links, locale, global shell
- `Header` — navigation and contextual language switch
- `Footer` — contact and public profile links
- `Hero` — positioning, actions, and speaking image
- `FieldIndexRail` — career-domain progression
- `ProjectCard` and `ProjectGrid` — project index and selected work
- `ExperienceTimeline` — career entries
- `AchievementIndex` — publications, patents, open source, and competitions
- `LocaleLink` — route-aware language pairing
- `SeoHead` — canonical, hreflang, Open Graph, and social metadata

Each component has one public responsibility and receives typed data rather than reading arbitrary global state.

### Content schema

Localized content entries include:

- `translationKey`
- `locale`
- `title`
- `summary`
- `period`
- `role`
- `category`
- `technologies`
- `links`
- `featured`
- `order`
- `ogImage`
- `draft`

Every required v1 entry has both `en` and `zh` variants. A build-time validation script fails if a required translation or route pair is missing.

### Data flow

1. Astro loads typed content collections at build time.
2. Locale-aware page helpers select the correct entry set.
3. Pages pass typed content into presentational components.
4. Static HTML, CSS, images, and metadata are emitted to `dist/`.
5. GitHub Actions validates and deploys the artifact.

The production site does not fetch GitHub or Kaggle APIs at runtime. Public profile links remain useful even if those services are temporarily unavailable.

## 13. Résumé and Personal Data

The supplied Chinese résumé is an April 2025 source document and does not include the current ChanceTop chapter. It also contains a personal phone number.

For v1:

- `/resume/` and `/zh/resume/` render current, printable web résumés from the site's reviewed content.
- The old PDF is used as a content source but is **not copied into the public repository** by default.
- The public site shows email, GitHub, and Kaggle links.
- A phone number is not published unless Xander explicitly opts in later.
- A separate English PDF is not invented. It can be generated later from the approved web résumé.

## 14. SEO and Sharing

- English root pages use self-referencing canonical URLs
- Chinese pages use their own canonical URLs
- Every paired page emits `hreflang="en"`, `hreflang="zh-CN"`, and `x-default`
- XML sitemap includes both locales
- Metadata is translated, not duplicated mechanically
- The home page and Core-AI case study have dedicated 1200 × 630 social cards
- Social cards reuse the cool-paper, carbon, and signal-blue visual system
- Structured data identifies the site as a Person portfolio and links public profiles through `sameAs`

## 15. Error Handling

- Missing required translations fail the build
- Invalid content frontmatter fails schema validation
- Broken internal routes fail link checking
- Unknown routes display a bilingual 404 with clear paths back to Home and Projects
- External links open safely with `noopener noreferrer` where a new tab is used
- Missing optional imagery falls back to typography and layout, not a generic stock image
- The site remains functional without JavaScript except for optional navigation enhancement

## 16. Validation and Release Gates

Local validation:

- `astro check`
- production build
- translation-pair validation
- internal and external link checking
- responsive review at 360, 768, 1024, and 1440 px
- keyboard navigation and visible-focus review
- reduced-motion review
- social metadata and route inspection

CI validation:

- clean dependency install
- Astro type and content checks
- production build
- link checker against `dist/`
- Lighthouse CI on representative English and Chinese pages

Targets:

- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95
- zero missing required translations
- zero broken internal links

Completion requires a successful GitHub Pages deployment and direct verification of the live English home page, Chinese home page, Core-AI case study, locale switching, and 404 behavior.

## 17. Repository and Publishing Policy

- Local repository: `/Users/xander/git_repo/Canqiang.github.io`
- Branch: `main`
- Expected GitHub repository: `Canqiang/Canqiang.github.io`
- Expected public URL: `https://canqiang.github.io`
- Site source may use the MIT License
- Personal writing, biography, résumé content, photography, and project case-study prose remain © Xander Xu unless explicitly licensed otherwise

Creating the remote GitHub repository and enabling GitHub Pages happen only after the local build and content review are complete.

## 18. Explicitly Out of Scope for v1

- backend services or databases
- runtime GitHub or Kaggle API integrations
- authentication or private content
- contact forms
- analytics
- search
- automatic browser-language redirects
- dark-mode toggle
- a CMS
- an empty Writing page
- fabricated metrics, claims, or résumé files

## 19. Success Criteria

The first release is successful when:

1. A first-time visitor understands Xander's current AI platform positioning within ten seconds.
2. The career progression from bioinformatics to agent systems is clear.
3. Core-AI is presented as an open-source framework and Xander's contributions are specific without implying sole authorship.
4. English and Chinese routes are complete, paired, and easy to switch.
5. Kaggle is visible as one valid achievement source without dominating the portfolio.
6. Public copy contains no private company or personal data that was not approved for publication.
7. The site passes the validation gates and is reachable at `https://canqiang.github.io`.
