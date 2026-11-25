# Positioning and evidence refresh — 25 November 2026

This update sharpens the portfolio and bilingual résumés around AI Systems Engineering (agent runtimes, cross-pod recovery, sandbox lifecycle, model protocols, and observability) while reframing the secondary résumé track (`/resume/algorithms/` and `/zh/resume/algorithms/`) toward Applied AI, Reasoning, Evaluation & ML without breaking existing routes.

## Newly linked public evidence

- [Cross-pod RPC session ownership (`f58f3d06`)](https://github.com/chancetop-com/core-ai/commit/f58f3d06cd5a14f9c3f179aabe3691829cccf6b2): authored by `xander <canqiangxu@yeah.net>` on 2026-11-23 and pushed to `origin/master`. Wires `SessionOwnershipRegistry` into `MessagingInfrastructureModule`, requires it on `RpcClient`, and adds `MessagingInfrastructureModuleTest` covering real module wiring.
- [Sandbox snapshot retention and permissions (`084310c2`)](https://github.com/chancetop-com/core-ai/commit/084310c2bd08da8ef81fd9410f0240744e9c1be8): already documented in `core-ai.{en,zh}.md` and `2026-10-29-project-evidence.md`; now also surfaced in `src/data/resume.ts`.
- PostgreSQL, TypeScript, Kubernetes, and OpenTelemetry are surfaced in the AI systems résumé skills bar, matching the public Core-AI stack already documented in the repository.

## Content and framing updates

- **Home hero**: promoted `AI Systems Résumé` / `AI 系统简历` to the secondary CTA button and moved `Competitions` alongside the secondary résumé link so first-time engineering reviewers reach the primary résumé in one click.
- **Experience alignment**: expanded Jiyuan (Medical LLM Lead, 2023–2024) and Qudian (LLM Application Engineer, 2024–2025) from one compressed sentence to two bullets each using only already-verified facts from `src/data/experience.ts`; no unverified metrics or team sizes were added.
- **Application workflow framing**: described applied agent workflows as structured data ingestion, automated auditing, and evaluation with execution tracing and regression checks, avoiding operational/customer details.
- **Contact**: kept `canqiangxu@yeah.net` and omitted LinkedIn from the résumé header per owner preference.
- **Secondary résumé track**: reframed display titles and metadata to `AI Reasoning, Evaluation & ML R&D` / `AI 推理、评测与算法研发` while keeping `/resume/algorithms/` and `/zh/resume/algorithms/` URLs and PDF filenames stable.
