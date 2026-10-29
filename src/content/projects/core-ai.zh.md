---
translationKey: core-ai
locale: zh
title: Core-AI
summary: 团队共同建设的开源智能体平台，覆盖 Java 框架、CLI、服务端、Web UI 与桌面预览客户端。
period: 2025 — 至今
role: 核心贡献者
category: open-source
technologies: [Java, TypeScript, React, Electron, MCP, OpenTelemetry, MongoDB, Kubernetes]
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

Core-AI 是由团队共同建设的开源智能体平台，覆盖 Java 框架、CLI、自托管服务端、Web 应用与 Electron 桌面预览客户端。

## 我的贡献

我参与框架与产品界面的多处研发，重点包括持久化工作流、模型供应商集成、可观测性、沙箱恢复，以及将后端能力转化为可用的前端体验。

该项目由团队共同建设。本页记录我参与的工作范围，不表示项目由我独立完成。

## 框架范围

公开项目将 Java 框架、独立终端 Agent、带 Web UI 的自托管服务端，以及使用 CLI 引擎的桌面预览客户端组合在一起。其公开能力覆盖智能体与工具执行、MCP 集成、多智能体协作、记忆与知识、工作流、模型选择和链路追踪。

## 代表性工程工作

### 持久化工作流

我参与建设人工介入、嵌套执行、运行状态持久化、断点恢复、产物交付与执行追踪等工作流能力，使较长的智能体任务可以被检查和恢复，而不是把每次运行都当作一次性请求。

### 模型连接

我的贡献包括模型网关与供应商集成，覆盖 OpenAI 兼容接口和 Responses API。近期[完善了推理模型携带工具调用时的 Responses 路由](https://github.com/chancetop-com/core-ai/commit/a3523e06246a2ccb385e32146c6c32b32b0b1d64)，并将提示词模板渲染限制在编写的模板内，让传入的提示词片段与用户查询保持原文。

### 可靠性与可观测性

我参与会话恢复、链路查看、沙箱快照恢复与部署验证等工作。2026 年 10 月[加入沙箱快照保留周期配置与权限控制](https://github.com/chancetop-com/core-ai/commit/084310c2bd08da8ef81fd9410f0240744e9c1be8)，配套系统设置界面。

### 桌面交付与文档

我的桌面端贡献包括[修复中文输入法确认回车误发送](https://github.com/chancetop-com/core-ai/commit/5ef35e5e44ccd88d9a755fa248d04dbdad48fb93)、为 macOS 预览包签名并验证打包后的启动行为。我也完善了中英文使用手册与排障文档，将后端和运行时能力落实到安装、日常交互与使用支持。
