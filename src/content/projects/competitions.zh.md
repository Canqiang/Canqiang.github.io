---
translationKey: competitions
locale: zh
title: 精选竞赛
summary: 四枚 Kaggle 奖牌与一项 PrecisionFDA 名次，作为整体工程与科研记录中的一个同级成果类别呈现。
period: 精选成绩
role: 竞赛参与者
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

竞赛是我的经历证据来源之一，与开源工程、产品交付、论文和专利并列。在 Kaggle 上我目前是 Competitions Expert，共获两银两铜四枚竞赛奖牌，覆盖程序合成、强化学习、大模型推理与生物医学建模四个方向。

## 精选成绩

### 2026 NeuroGolf 锦标赛

Kaggle · Research · 银牌 · 2,963 支队伍中排名第 63

NeuroGolf 要求为每个 ARC-AGI 任务找到*最小*的网络：在 400 个任务上分别提交 ONNX 计算图，既要在测试样例上输出正确，又要压低 `cost = params + memory`，单任务得分为 `max(1, 25 − ln(cost))`。我们的方案与其说是一个模型，不如说是一座解法工厂。多个 worker agent 各自认领独立的 track，共同工作在一套在线底座上——带 pgvector 的 Postgres、内容寻址的 blob 存储，以及统一在前的 FastAPI 服务——在全局的单任务锁下领取任务，并把候选计算图推入固定的验证状态机。所有 agent 与 Kaggle 之间只隔着一条受控的提交队列；只要解法在生成的任务变体上还有任何一处不匹配，硬门禁就会拒绝它，这正是筛掉"本地看着对、其实是错的"计算图的关键。每个被接受的任务都保留完整记录：人类可读的变换规则、ONNX 模型、能复现出同样字节的 Python 构建脚本，以及数据集自带的种子元信息。

### Orbit Wars

Kaggle · Featured · 仿真竞赛 · 银牌 · 4,729 支队伍中排名第 112

一款实时策略游戏：二人或四人在连续二维空间中争夺绕恒星公转的行星。最终沉淀下来的成果是一个路由器，而不是单一策略——2P 对局交给行为克隆并经 PPO 自博弈精调的策略，4P 对局交给另一条以压制为导向的分支，两者都导出为不依赖 torch 的 NumPy 部署包，使整个 agent 能以单文件提交。大范围奖励塑形和只做监督的重跑都试过，但没能通过各自的门禁；真正留下来的做法，是在任何规模化训练之前，先把工程投入放在与官方环境的一致性、产物 manifest 和成对评测面板上。

### AI 数学奥林匹克 — Progress Prize 3

Kaggle · Featured · Code · 铜牌 · 4,138 支队伍中排名第 405

50 道答案为整数的奥赛题，需要在单张 H100 上离线求解并控制在五小时内。我向公开的开源方案谱系贡献了两部分。其一是构建在 gpt-oss-120b 上的自洽性加工具集成推理脚手架：使用模型原生的 Harmony 对话模板并开到高推理强度，为每个线程维持一个常驻 Jupyter 内核，以八路并行采样配合流式答案扫描与多数提前终止，再用多线程页缓存预热把 vLLM 启动时间从约 400 秒压到 130 秒。这份 notebook 公开发布后，成为若干更强的下游 fork 的起点。其二是对投票逻辑二十行的改动：按每次尝试是否真的用 Python 自我验证来加权，调用达三次以上加权，多数调用报错则降权。它把同一份代码 25 次提交的最高分推到 42/50（均值 38.4，σ 1.6）——这是真实但有限的提升，且建立在其他参赛者搭好的基础设施之上，方案报告中已逐一署名致谢。

### 前列腺癌分级评估（PANDA）挑战赛

Kaggle · Featured · Code · 铜牌 · 1,010 支队伍中排名第 62

一项基于 Gleason 分级体系、聚焦前列腺癌分级的医学影像竞赛。

### 脑癌预测建模与生物标志物发现挑战赛

PrecisionFDA 与 Georgetown ICBI · 第四名团队成员

## 在整体记录中的位置

这些成绩体现了经过竞赛检验的建模实践，但 Kaggle 不被单独塑造成一种职业身份。它只是以科研、应用型 AI 与平台工程为主线的职业记录中的一个同级成果类别。
