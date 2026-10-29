---
translationKey: core-ai
locale: zh
title: Core-AI
summary: 团队共同建设的开源智能体框架，涵盖模型与工具执行、状态持久化、运行恢复和可观测性。
period: 2025 — 至今
role: 核心贡献者
category: open-source
technologies: [Java, TypeScript, MCP, OpenTelemetry, MongoDB, Redis, Kubernetes]
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

Core-AI 是团队共同建设的开源智能体框架，提供 Java 执行引擎、CLI、服务端及 Web、桌面客户端。我是核心贡献者，主要参与运行状态管理、模型协议适配、会话恢复与可观测性研发。

## 我的贡献

### 跨实例运行状态与流式恢复

在多 Pod 部署中，会话状态查询可能落到没有本地 SSE 连接的实例，导致仍在执行的轮次被误判为结束，前端随后重载历史并清空正在显示的流式内容。我[加入基于 Redis 的轮次存活注册、心跳与 TTL](https://github.com/chancetop-com/core-ai/commit/51e811e5a8bca04734317684944ea32aa6967f95)，将共享执行状态与本地连接状态分开；Redis 不可用时返回未知状态并保留本地判断。该提交包含服务端状态解析与前端流恢复的回归用例。

### 并发持久化的一致性

取消操作与执行线程可能同时保存同一个节点，旧快照后写入会覆盖较新的状态。我[将状态序列化与持久化写入放入同一临界区](https://github.com/chancetop-com/core-ai/commit/09bffd9198373cdf39985225dd036cdd2eef2d63)，并加入通过线程同步控制执行顺序的并发回归测试，覆盖这一取消与保存竞态。

### 模型能力感知的工具路由

针对部分推理模型不能在 Chat Completions 接口同时使用推理与工具的问题，我[根据模型声明的推理能力、端点支持和本轮工具配置选择 Responses 传输](https://github.com/chancetop-com/core-ai/commit/a3523e06246a2ccb385e32146c6c32b32b0b1d64)。对应回归用例覆盖需要切换的请求，以及非推理模型、仅支持 `none` 的模型、无工具请求和无 Responses 支持等保持原路由的边界。

### 沙箱快照的生命周期与权限

我[实现了可配置的沙箱快照保留周期及独立权限控制](https://github.com/chancetop-com/core-ai/commit/084310c2bd08da8ef81fd9410f0240744e9c1be8)，包括配置持久化、参数校验和设置界面。开发环境验证记录确认：配置参与新快照到期时间计算，既有快照时间不变；指定非管理员可以管理该配置，其他受测身份受到权限限制。

## 其他参与工作

我也参与人工介入、嵌套工作流、运行状态恢复、产物交付和执行追踪，以及[桌面端输入处理修复](https://github.com/chancetop-com/core-ai/commit/5ef35e5e44ccd88d9a755fa248d04dbdad48fb93)、macOS 预览包验证与中英文文档建设。框架整体由团队协作完成；上面的具体修改可通过公开提交查看实现与测试。
