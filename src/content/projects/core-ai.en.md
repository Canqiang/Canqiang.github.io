---
translationKey: core-ai
locale: en
title: Core-AI
summary: Agent runtime infrastructure for model and tool execution, durable state, recovery, and observability in a team-built open-source framework.
period: 2025 — Present
role: Core contributor
category: open-source
technologies: [Java, TypeScript, MCP, OpenTelemetry, MongoDB, Redis, Kubernetes]
links:
  - label: GitHub
    href: https://github.com/chancetop-com/core-ai
  - label: Documentation
    href: https://chancetop-com.github.io/core-ai/
featured: true
order: 1
ogImage: /og/core-ai.png
draft: false
---

Core-AI is a team-built open-source agent framework with a Java execution engine, CLI, server, and web and desktop clients. As a core contributor, I work on runtime state, model-protocol integration, session recovery, and observability.

## My contributions

### Cross-instance execution state and stream recovery

In a multi-pod deployment, a session-status request can reach an instance without the local SSE connection. A running turn could then appear finished, causing the frontend to reload history and clear its in-progress output. I [added Redis-backed turn liveness with heartbeats and TTLs](https://github.com/chancetop-com/core-ai/commit/51e811e5a8bca04734317684944ea32aa6967f95), separating shared execution state from local connection state. When Redis is unavailable, the resolver returns an unknown liveness state and retains the local status. The commit includes regression cases for server-side status resolution and frontend stream recovery.

### Consistent concurrent persistence

Cancellation and the execution thread can save the same node concurrently, allowing a stale snapshot to overwrite newer state. I [placed state serialization and persistence within one critical section](https://github.com/chancetop-com/core-ai/commit/09bffd9198373cdf39985225dd036cdd2eef2d63) and added a concurrency regression test that controls thread ordering to reproduce the cancel/save race.

### Capability-aware tool routing

Some reasoning models cannot combine reasoning and tools on the Chat Completions interface. I [select Responses transport using the model's declared reasoning capability, supported endpoints, and the current request's tools](https://github.com/chancetop-com/core-ai/commit/a3523e06246a2ccb385e32146c6c32b32b0b1d64). Regression cases cover the intended switch and preserve existing routing for non-reasoning models, models declaring only `none`, requests without tools, and models without Responses support.

### Sandbox snapshot lifecycle and permissions

I [implemented configurable snapshot retention and a dedicated permission](https://github.com/chancetop-com/core-ai/commit/084310c2bd08da8ef81fd9410f0240744e9c1be8), including persisted settings, input validation, and the settings interface. Development-environment checks confirmed that the setting changes expiry calculation for new snapshots while leaving existing expiries unchanged. An authorized non-admin could manage the setting; other tested identities were restricted.

## Other contributions

I also worked on human-in-the-loop steps, nested workflows, runtime-state recovery, artifact delivery, and execution traces, alongside [desktop input handling fixes](https://github.com/chancetop-com/core-ai/commit/5ef35e5e44ccd88d9a755fa248d04dbdad48fb93), macOS preview-package verification, and bilingual documentation. The framework is collaborative work; the linked commits expose the implementation and tests for the specific changes above.
