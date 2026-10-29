---
translationKey: competitions
locale: zh
title: Kaggle 与精选竞赛
summary: Kaggle Notebooks Master，获 6 金 4 银代码奖牌、7 枚竞赛奖牌及一项 PrecisionFDA 名次。
period: 精选成绩
role: Notebook 作者、竞赛参与者
category: competitions
technologies: [程序合成, 强化学习, 大模型推理, 医学影像]
links:
  - label: Kaggle 主页
    href: https://www.kaggle.com/canqiang
  - label: AIMO3 方案报告
    href: https://www.kaggle.com/competitions/ai-mathematical-olympiad-progress-prize-3/writeups/self-consistency-tir-with-python-verification
  - label: 官方结果
    href: https://precision.fda.gov/challenges/8/results
featured: false
order: 5
draft: false
---

竞赛与公开 Notebook 是我的经历证据来源之一，与开源工程、产品交付、论文和专利并列。截至 2026 年 10 月 29 日，我已获得 **Kaggle Notebooks Master（代码赛道大师）**称号，拥有 **6 金 4 银代码奖牌**。竞赛赛道等级为 **Competitions Expert**，累计 **2 银 5 铜竞赛奖牌**，覆盖程序合成、策略智能体、智能体安全、大模型推理与生物医学建模。

## 精选成绩

### 2026 NeuroGolf 锦标赛

Kaggle · Research · 银牌 · 2,963 支队伍中排名第 63

NeuroGolf 要求为 400 个 ARC-AGI 任务分别提交 ONNX 计算图，在输出正确的前提下降低参数与中间张量内存成本。我参与候选图的优化与验证，使用团队已有的工具检查静态形状、ONNX Runtime 兼容性及图成本，并区分本地验证结果与 Kaggle 隐藏集结果。

团队基础设施提供任务认领、模型与构建产物存储、验证状态转换和提交队列。生成样本上的差异用于风险诊断，不等同于隐藏集判定；规则说明、构建脚本与种子记录也尚未覆盖全部任务。这些基础模块属于团队工程，不作为个人独立研发成果。[Kaggle 成绩](https://www.kaggle.com/canqiang/competitions)

### Orbit Wars

Kaggle · Featured · 仿真竞赛 · 银牌 · 4,729 支队伍中排名第 112

我基于已有的 BC→PPO 自博弈训练栈开展策略、奖励与训练配置实验，并整合按二人／四人对局选择策略的路由及不依赖 PyTorch 的 NumPy 部署。个人修改记录包括落后状态下的奖励塑形实验、运行配置，以及 JAX 编译参数和持久编译缓存；训练栈的来源与修改边界见 [PATCHES](https://github.com/Canqiang/orbit-wars/blob/main/helios/PATCHES.md)。

评测使用官方环境与配对种子，检查候选策略是否能迁移到外部对手。复盘保留了奖励塑形、扩大自博弈和监督实验的负结果，未将它们写成稳定增益。[方案与实验复盘](https://github.com/Canqiang/orbit-wars/blob/main/public_release/docs/orbit-wars-approach-writeup.md)

### AI 数学奥林匹克 — Progress Prize 3

Kaggle · Featured · Code · 铜牌 · 4,138 支队伍中排名第 405

比赛要求在单张 H100、五小时预算内离线回答 50 道整数答案奥赛题。我在已有工具集成推理（TIR）方案上开展答案聚合实验，并公开了基于 gpt-oss-120B／vLLM 的 [Notebook](https://github.com/Canqiang/kaggle-AIMO-3/blob/main/AIMO/weighted-voting-with-python-verification.ipynb)：包含八路采样、四票共识早停、持久 Python 执行环境、动态时间预算，以及 FP8 KV cache、前缀缓存和异步调度配置。

我的实验重点是以 Python 调用次数和错误率调整候选答案票重。这是工具使用信号构成的置信度启发式，不能证明最终答案已被正确验证。公开实现沿用其他参赛者的推理基础设施，来源与致谢见[方案报告](https://www.kaggle.com/competitions/ai-mathematical-olympiad-progress-prize-3/writeups/self-consistency-tir-with-python-verification)。

### 前列腺癌分级评估（PANDA）挑战赛

Kaggle · Featured · Code · 铜牌 · 1,010 支队伍中排名第 62

一项基于 Gleason 分级体系、聚焦前列腺癌分级的医学影像竞赛。

### AI Agent Security — Multi-Step Tool Attacks

Kaggle · 铜牌 · 4,186 支队伍中排名第 268

[竞赛页面](https://www.kaggle.com/competitions/ai-agent-security-multi-step-tool-attacks)

### Kaggriculture

Kaggle · 铜牌 · 10,148 支队伍中排名第 628

[竞赛页面](https://www.kaggle.com/competitions/kaggriculture)

### The Pokémon Company — PTCG AI Battle Challenge Simulation

Kaggle · 铜牌 · 6,807 支队伍中排名第 671

[竞赛页面](https://www.kaggle.com/competitions/pokemon-tcg-ai-battle)

### 脑癌预测建模与生物标志物发现挑战赛

PrecisionFDA 与 Georgetown ICBI · 第四名团队成员

## 在整体记录中的位置

这些成绩体现了经过竞赛检验的建模实践，但 Kaggle 不被单独塑造成一种职业身份。它只是以科研、应用型 AI 与平台工程为主线的职业记录中的一个同级成果类别。
