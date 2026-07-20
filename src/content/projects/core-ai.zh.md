---
translationKey: core-ai
locale: zh
title: Core-AI
summary: 覆盖 SDK、终端 Agent、自托管服务端与 Web UI 的开源 AI Agent 框架。
period: 2025 — 至今
role: 核心贡献者
category: open-source
technologies: [Java, TypeScript, React, MCP, OpenTelemetry, MongoDB, Kubernetes]
links:
  - label: GitHub
    href: https://github.com/chancetop-com/core-ai
  - label: 文档
    href: https://chancetop-com.github.io/core-ai/
featured: true
order: 1
ogImage: /og/core-ai.png
draft: false
---

Core-AI 是一个用于构建和运行 AI 智能体的开源框架，覆盖 Java SDK、终端界面、自托管服务端与 Web 应用。

## 我的贡献

我参与框架与产品界面的多处研发，重点包括持久化工作流、模型供应商集成、可观测性、沙箱恢复，以及将后端能力转化为可用的前端体验。

该项目由团队共同建设。本页记录我参与的工作范围，不表示项目由我独立完成。

## 框架范围

公开项目将 Java SDK、独立终端 Agent、自托管服务端和 React/TypeScript Web UI 组合在一起。其公开能力覆盖智能体与工具执行、MCP 集成、多智能体协作、记忆与知识、工作流、模型选择和链路追踪。

## 代表性工程工作

### 持久化工作流

我参与建设人工介入、嵌套执行、运行状态持久化、断点恢复、产物交付与执行追踪等工作流能力，使较长的智能体任务可以被检查和恢复，而不是把每次运行都当作一次性请求。

### 模型连接

我的贡献包括模型网关与供应商集成，覆盖 OpenAI 兼容接口和 Responses API。这些工作把不同供应商的行为接入一致的框架与产品体验。

### 可靠性与可观测性

我参与会话恢复、链路查看、沙箱快照恢复与部署验证等工作，为跨越多个工具、环境或时间段的智能体会话提供连续性支持。

### 端到端交付

相关贡献经常贯穿 Java 后端、CLI、React/TypeScript 前端、自动化测试与运行环境验证。这种工作跨度体现了我作为 Core-AI 团队贡献者之一的角色。
