# Evidence for the two résumé variants

Checked on 29 October 2026. `src/data/resume.ts` selects different evidence for AI systems and algorithm R&D; company names, employment titles and dates remain in `experience.ts`.

## Core-AI: individual contributions

The following commits identify `xander <canqiangxu@yeah.net>` as author. The copy describes implemented behavior and regression coverage; it does not claim that historical tests were rerun for this résumé update or that latency, throughput or failure rates improved by an unmeasured amount.

- [Human input and workflow pause/resume](https://github.com/chancetop-com/core-ai/commit/cf0f0212f5fd818016f7a1807c39da039ecd6df2): human-input nodes, Mongo-backed workflow journal and run lifecycle.
- [Concurrent state persistence](https://github.com/chancetop-com/core-ai/commit/09bffd9198373cdf39985225dd036cdd2eef2d63): serializes snapshot-and-write to prevent stale overwrites between cancellation and execution threads; includes a coordinated concurrency regression test.
- [Cross-pod execution liveness](https://github.com/chancetop-com/core-ai/commit/51e811e5a8bca04734317684944ea32aa6967f95): Redis heartbeat/TTL and unknown-state fallback; separates local stream state from cross-pod execution state to address erroneous clearing of active chat messages.
- [Capability-aware Responses routing](https://github.com/chancetop-com/core-ai/commit/a3523e06246a2ccb385e32146c6c32b32b0b1d64): reasoning capability, tool presence and endpoint support jointly determine the transport; includes compatibility regression cases.

The framework remains a team project. Implementing these mechanisms does not imply sole ownership of the whole framework.

## AIMO3

The [public notebook](https://github.com/Canqiang/kaggle-AIMO-3/blob/main/AIMO/weighted-voting-with-python-verification.ipynb) supports eight attempts, four-vote early stopping, persistent Python execution and dynamic time budgeting on gpt-oss-120B/vLLM. `_select_answer` at lines 1532–1578 assigns voting bonuses by Python-call count and penalizes high error rates.

These are confidence heuristics. Tool use alone does not verify that an answer is correct. The résumé explicitly describes work on a public baseline and does not attribute the entire inference stack to its author.

Omitted: a 400-to-130-second startup improvement, stable accuracy improvement, and the maximum 42/50 score. No comparable baseline or paired ablation was verified; the stored output counts preloading and vLLM startup separately. Final placement (405 / 4,138, bronze) uses the official completed-competition snapshot recorded in `2026-10-29-profile-refresh.md`.

## Orbit Wars

- [PATCHES.md](https://github.com/Canqiang/orbit-wars/blob/main/helios/PATCHES.md) explicitly separates the imported BC/PPO stack from local reward experiments, launch configuration and JAX compilation/cache changes.
- [Campaign write-up](https://github.com/Canqiang/orbit-wars/blob/main/public_release/docs/orbit-wars-approach-writeup.md) supports the 2P/4P router and NumPy deployment. Its 22 June rank snapshot is not the final placement.

No stable reward-shaping gain is claimed. Hardware-dependent throughput figures are omitted. Final placement (112 / 4,729, silver) uses the official completed-competition snapshot. The algorithm résumé describes the rejection of reward candidates that failed evaluation, supported by the campaign write-up's reward-variant results; it does not attribute the overall medal to those reward changes.

## Earlier research and skills

Methods and responsibilities are retained from the reviewed medical-AI, research and employment records. No new clinical performance numbers, dataset sizes, training parameters or sole-inventor claims were added. Co-first authorship is stated only for the two papers already identified in `achievements.ts`. The GMM record remains a patent application.

NeuroGolf is retained in the overall competition record but omitted as a featured résumé project because the reviewed material does not establish individual ownership of its shared optimization infrastructure.
