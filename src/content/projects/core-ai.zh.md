---
translationKey: core-ai
locale: zh
title: Core-AI
summary: 团队共同建设的开源智能体框架，涵盖模型与工具执行、状态持久化、运行恢复和可观测性。
period: 2025 — 至今
role: 核心贡献者
category: open-source
technologies: [Java, TypeScript, MCP, OpenTelemetry, MongoDB, Kubernetes]
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

Core-AI 是由团队共同建设的开源框架，支持模型与工具执行、智能体工作流和运行状态管理，并通过 Java 框架、CLI、服务端、Web 与桌面客户端提供这些能力。

## 我的贡献

我的贡献集中在智能体执行与状态持久化、模型供应商接口、工具调用路由、会话与沙箱恢复，以及可观测性。

该项目由团队共同建设。本页记录我参与的工作范围，不表示项目由我独立完成。

## 框架范围

框架能力覆盖智能体与工具执行、MCP 集成、多智能体协作、记忆与知识、工作流、模型供应商选择和链路追踪。CLI 与桌面客户端共用执行引擎，自托管服务端提供独立的服务接口。

## 代表性工程工作

### 智能体执行与状态持久化

我参与建设人工介入、嵌套执行、运行状态持久化、断点恢复、产物交付与执行追踪等机制，使长时间运行的智能体任务保留可检查、可恢复的中间状态。

### 模型接口与工具调用路由

我的贡献包括模型网关与供应商集成，覆盖 OpenAI 兼容接口和 Responses API。近期[完善了推理模型携带工具调用时的 Responses 路由](https://github.com/chancetop-com/core-ai/commit/a3523e06246a2ccb385e32146c6c32b32b0b1d64)，并将提示词模板渲染限制在编写的模板内，让传入的提示词片段与用户查询保持原文。

### 运行恢复与可观测性

我参与会话恢复、链路查看、沙箱快照恢复与运行时验证等工作。2026 年 10 月[加入沙箱快照保留周期配置与权限控制](https://github.com/chancetop-com/core-ai/commit/084310c2bd08da8ef81fd9410f0240744e9c1be8)，并配套系统设置界面。

### 配套交付工作

我也参与[桌面端输入处理修复](https://github.com/chancetop-com/core-ai/commit/5ef35e5e44ccd88d9a755fa248d04dbdad48fb93)、macOS 预览包验证及中英文技术文档建设。
