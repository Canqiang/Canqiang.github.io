---
translationKey: core-ai
locale: en
title: Core-AI
summary: A team-built open-source agent platform spanning a Java framework, CLI, server, web UI, and desktop preview client.
period: 2025 — Present
role: Core contributor
category: open-source
technologies: [Java, TypeScript, React, Electron, MCP, OpenTelemetry, MongoDB, Kubernetes]
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

Core-AI is a team-built open-source platform for building and operating AI agents across a Java framework, CLI, self-hosted server, web application, and Electron desktop preview client.

## My contribution

I contribute across the framework and product surface, with a focus on durable workflows, model-provider integration, observability, sandbox recovery, and the path from backend capability to usable frontend experience.

The project is built by a team. This page documents only the areas where I contributed.

## Framework scope

The public project brings together a Java framework, a standalone terminal agent, a self-hosted server with a web UI, and a desktop preview client that uses the CLI engine. Its public surface covers agent and tool execution, MCP integration, multi-agent coordination, memory and knowledge, workflows, provider selection, and traces.

## Selected engineering work

### Durable workflows

I worked on workflow capabilities including human-in-the-loop steps, nested execution, persisted run state, resumption, artifact delivery, and execution tracing. The goal was to make longer agent processes inspectable and recoverable rather than treating every run as a disposable request.

### Model connectivity

My contributions include model-gateway and provider integrations across OpenAI-compatible interfaces and the Responses API. Recent work [routes tool-bearing turns from reasoning models to the appropriate Responses endpoint](https://github.com/chancetop-com/core-ai/commit/a3523e06246a2ccb385e32146c6c32b32b0b1d64). I also restricted prompt-template rendering to authored templates so that supplied prompt sections and user queries pass through unchanged.

### Reliability and observability

I contributed to session recovery, trace inspection, sandbox snapshot and restore, and deployment validation. In October 2026, I [added configurable snapshot retention with scoped permissions](https://github.com/chancetop-com/core-ai/commit/084310c2bd08da8ef81fd9410f0240744e9c1be8) and a system-settings interface.

### Desktop delivery and documentation

My desktop contributions include [fixing Chinese IME confirmation so Enter does not prematurely send a message](https://github.com/chancetop-com/core-ai/commit/5ef35e5e44ccd88d9a755fa248d04dbdad48fb93), signing macOS preview bundles, and verifying packaged startup. I also expanded the bilingual usage guides and troubleshooting documentation. These changes connect backend and runtime capabilities to installation, everyday interaction, and support.
