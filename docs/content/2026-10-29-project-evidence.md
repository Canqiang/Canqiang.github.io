# Project evidence and attribution review — 29 October 2026

This review updates public project copy and shared career data for the two résumé variants. It checks source implementation and recorded validation; it does not rerun the underlying competition or Core-AI experiments.

## Core-AI: attributable changes

The following local Git commits identify `xander <canqiangxu@yeah.net>` as author and correspond to the linked public commits:

- [51e811e5](https://github.com/chancetop-com/core-ai/commit/51e811e5a8bca04734317684944ea32aa6967f95): adds Redis-backed turn liveness, heartbeat/TTL, and status resolution separate from pod-local SSE. Includes server and frontend regression cases for cross-pod status and stream recovery. Redis failure yields `UNKNOWN`, which retains local status.
- [09bffd91](https://github.com/chancetop-com/core-ai/commit/09bffd9198373cdf39985225dd036cdd2eef2d63): serializes node snapshot creation and persistence within one lock to prevent a cancel/save race; includes a `CountDownLatch` concurrency regression test.
- [a3523e06](https://github.com/chancetop-com/core-ai/commit/a3523e06246a2ccb385e32146c6c32b32b0b1d64): selects Responses for tool-bearing requests when the model declares reasoning capability and supports that endpoint. Five new cases cover switching and preserving existing routes at compatibility boundaries.
- [084310c2](https://github.com/chancetop-com/core-ai/commit/084310c2bd08da8ef81fd9410f0240744e9c1be8): adds snapshot retention settings, a dedicated permission, input validation, frontend settings, and tests. The committed development-validation report records API/UI permission checks and actual new-snapshot expiry calculation at two retention settings while retaining earlier expiries. It explicitly did not wait for natural expiry or add a restore test.

Public copy states these behavior changes and their recorded validation scope. It does not infer throughput, latency, production-scale adoption, or ownership of the whole framework. This content review did not execute Core-AI tests.

## Competition attribution and corrected claims

- **AIMO3:** [weighted-voting notebook](https://github.com/Canqiang/kaggle-AIMO-3/blob/main/AIMO/weighted-voting-with-python-verification.ipynb). Its vote weighting uses Python-call counts and error rates. Those are confidence proxies, not proof that Python verified the final answer. The implementation uses existing public TIR infrastructure. Removed the 400-to-130-second startup improvement: no comparable 400-second baseline was established, and saved output separates weight preloading from vLLM readiness. Removed the best-of-25 score narrative as a causal or stable improvement; the raw repeated-run table and paired ablation were not established in this review.
- **Orbit Wars:** [patch record](https://github.com/Canqiang/orbit-wars/blob/main/helios/PATCHES.md) identifies an imported RL stack and the added reward, run-configuration, and compilation/cache modifications. The [22 June retrospective](https://github.com/Canqiang/orbit-wars/blob/main/public_release/docs/orbit-wars-approach-writeup.md) supports the BC→PPO, 2P/4P router, and NumPy deployment description, but also records negative experiments. Its interim rank and leaderboard delta do not replace final standings; H800/P100 throughput is not a same-hardware software speedup.
- **NeuroGolf:** local `neuro-golf-v3/README.md` lines 24–55 identifies team infrastructure and incomplete semantic-rule/builder records. `AGENTS.md` lines 88–103 treats synthetic mismatches as risk diagnostics rather than a universal rejection rule. Public copy therefore removes universal hard-gate/full-record claims and does not attribute shared infrastructure to the individual contributor. Personal participation is described as candidate optimization and validation using the team's tools.

The existing dated Kaggle medal/placement snapshot remains the source for final competition results. The present review does not refresh those standings.

## Earlier algorithm work

Shared career copy now exposes methods already present in the reviewed project material: U-Net and convolutional feature extraction, feature selection/classification/geographic interpolation, attention-enhanced segmentation, and GMM correction. Co-first authorship is linked to the two existing publication records, and the GMM method is described as a patent application. No unpublished dataset sizes, accuracy improvements, training settings, or clinical outcomes were added.

## Content checks

- Five bilingual project pairs passed translation validation.
- `git diff --check` passed after the content edits.
- Full site integration, PDF layout, and publication checks are handled with the résumé implementation.
