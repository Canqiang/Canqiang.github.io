---
translationKey: competitions
locale: en
title: Selected Competitions
summary: Four Kaggle medals and one PrecisionFDA placement, presented as one peer category within a broader engineering and research record.
period: Selected results
role: Competition participant
category: competitions
technologies: [Program Synthesis, Reinforcement Learning, LLM Reasoning, Medical Imaging]
links:
  - label: Kaggle profile
    href: https://www.kaggle.com/canqiang
  - label: AIMO3 solution write-up
    href: https://www.kaggle.com/competitions/ai-mathematical-olympiad-progress-prize-3/writeups/self-consistency-tir-with-python-verification
  - label: Official results
    href: https://precision.fda.gov/challenges/8/results
featured: false
order: 5
draft: false
---

Competitions are one source of evidence in my record, alongside open-source engineering, product delivery, publications, and patents. On Kaggle I hold Competitions Expert standing, with two silver and two bronze competition medals across program synthesis, reinforcement learning, LLM reasoning, and biomedical modeling.

## Selected results

### The 2026 NeuroGolf Championship

Kaggle · Research · Silver medal · 63rd of 2,963 teams

NeuroGolf asks for the *smallest* network that solves each ARC-AGI task: across 400 tasks you ship an ONNX graph that must produce correct outputs while minimizing `cost = params + memory`, scored `max(1, 25 − ln(cost))` per task. Our entry was less a model than a solver factory. Worker agents own separate tracks against a shared online substrate — Postgres with pgvector, a content-addressable blob store, and a FastAPI service fronting both — claim tasks under a global per-task lock, and push candidate graphs through a fixed verification state machine. One guarded submit queue stands between the agents and Kaggle, and a hard gate rejects any solution with a non-zero mismatch count on generated task variants, which is what filters out graphs that are locally correct but actually wrong. Every accepted task carries its full record: the human-readable transform rule, the ONNX model, the Python builder that reproduces those exact bytes, and the dataset's own seed metadata.

### Orbit Wars

Kaggle · Featured · Simulation · Silver medal · 112th of 4,729 teams

A real-time strategy game in which two or four players contest planets orbiting a sun in continuous 2D space. The durable result was a router rather than a single policy: two-player games are handled by a behaviour-cloned policy refined with PPO self-play, four-player games by a separate pressure-oriented branch, both exported as torch-free NumPy bundles so the agent submits as a single file. Broad reward shaping and supervision-only reruns were tried and did not survive their gates. What did survive was spending the engineering effort on official-environment parity, artifact manifests, and paired evaluation panels before any scale run.

### AI Mathematical Olympiad — Progress Prize 3

Kaggle · Featured · Code · Bronze medal · 405th of 4,138 teams

Fifty olympiad problems with integer answers, solved offline on a single H100 within a five-hour limit. I contributed two pieces to the public open-source lineage. The first is a self-consistency plus tool-integrated-reasoning scaffold on gpt-oss-120b: the model's native Harmony chat template at high reasoning effort, one persistent Jupyter kernel per thread, eight parallel attempts with in-stream answer scanning and a majority early-stop, and a threaded page-cache weight preloader that cut vLLM startup from roughly 400 seconds to 130. Published openly, it became the notebook that several stronger downstream forks were built from. The second is a twenty-line change to how those attempts vote: each vote is weighted by whether the attempt actually verified itself in Python, up-weighted for three or more tool calls and down-weighted when most of its calls errored. That moved the peak to 42/50 across 25 identical-code submissions (mean 38.4, σ 1.6) — a real but modest gain, resting on infrastructure other competitors built, which the write-up credits by name.

### Prostate cANcer graDe Assessment (PANDA) Challenge

Kaggle · Featured · Code · Bronze medal · 62nd of 1,010 teams

A medical-imaging competition on prostate-cancer grading under the Gleason system.

### Brain Cancer Predictive Modeling and Biomarker Discovery Challenge

PrecisionFDA and Georgetown ICBI · Member of the fourth-place team

## Place in the record

These results demonstrate competition-tested modeling work, but Kaggle is not presented as a separate career identity. It remains one peer achievement category within a career centered on research, applied AI, and platform engineering.
