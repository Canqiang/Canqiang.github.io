---
translationKey: core-ai
locale: en
title: Core-AI
summary: Agent runtime infrastructure for model and tool execution, durable state, recovery, and observability in a team-built open-source framework.
period: 2025 — Present
role: Core contributor
category: open-source
technologies: [Java, TypeScript, MCP, OpenTelemetry, MongoDB, Kubernetes]
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

Core-AI is a team-built open-source framework for model and tool execution, agent workflows, and runtime state management. A Java framework, CLI, server, and web and desktop clients provide access to these capabilities.

## My contribution

My contributions focus on agent execution and durable state, model-provider interfaces, tool-call routing, session and sandbox recovery, and observability.

The project is built by a team. This page documents only the areas where I contributed.

## Framework scope

The framework covers agent and tool execution, MCP integration, multi-agent coordination, memory and knowledge, workflows, model-provider selection, and traces. The CLI and desktop client share an execution engine; the self-hosted server provides a separate service interface.

## Selected engineering work

### Agent execution and durable state

I worked on human-in-the-loop steps, nested execution, persisted run state, resumption, artifact delivery, and execution tracing. These mechanisms make the intermediate state of long-running agent processes available for inspection and recovery.

### Model interfaces and tool-call routing

My contributions include model-gateway and provider integrations across OpenAI-compatible interfaces and the Responses API. Recent work [routes tool-bearing turns from reasoning models to the appropriate Responses endpoint](https://github.com/chancetop-com/core-ai/commit/a3523e06246a2ccb385e32146c6c32b32b0b1d64). I also restricted prompt-template rendering to authored templates so that supplied prompt sections and user queries pass through unchanged.

### Runtime recovery and observability

I contributed to session recovery, trace inspection, sandbox snapshot and restore, and runtime validation. In October 2026, I [added configurable snapshot retention with scoped permissions](https://github.com/chancetop-com/core-ai/commit/084310c2bd08da8ef81fd9410f0240744e9c1be8), including the corresponding system-settings interface.

### Supporting delivery work

I also contributed [desktop input handling fixes](https://github.com/chancetop-com/core-ai/commit/5ef35e5e44ccd88d9a755fa248d04dbdad48fb93), macOS preview-package verification, and bilingual technical documentation.
