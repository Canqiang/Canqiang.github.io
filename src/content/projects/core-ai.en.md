---
translationKey: core-ai
locale: en
title: Core-AI
summary: An open-source AI Agent framework spanning an SDK, terminal agent, self-hosted server, and web UI.
period: 2025 — Present
role: Core contributor
category: open-source
technologies: [Java, TypeScript, React, MCP, OpenTelemetry, MongoDB, Kubernetes]
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

Core-AI is an open-source framework for building and operating AI agents across an SDK, terminal interface, self-hosted server, and web application.

## My contribution

I contribute across the framework and product surface, with a focus on durable workflows, model-provider integration, observability, sandbox recovery, and the path from backend capability to usable frontend experience.

The project is built by a team. This page documents only the areas where I contributed.

## Framework scope

The public project brings together an SDK, a standalone terminal agent, a self-hosted server, and a web UI. Its public surface covers agent and tool execution, MCP integration, multi-agent coordination, memory and knowledge, workflows, provider selection, and traces.

## Selected engineering work

### Durable workflows

I worked on workflow capabilities including human-in-the-loop steps, nested execution, persisted run state, resumption, artifact delivery, and execution tracing. The goal was to make longer agent processes inspectable and recoverable rather than treating every run as a disposable request.

### Model connectivity

My contributions include model-gateway and provider integrations across OpenAI-compatible interfaces and the Responses API. This work connects provider-specific behavior to a consistent framework and product experience.

### Reliability and observability

I contributed to session recovery, trace inspection, sandbox snapshot and restore, and deployment validation. These areas support continuity when an agent session spans multiple tools, environments, or periods of activity.

### End-to-end delivery

The contribution path often crosses the backend, CLI, frontend, automated tests, and runtime validation. That breadth reflects my role as one contributor within the team that builds and maintains Core-AI.
