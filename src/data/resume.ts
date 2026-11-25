import type { Locale } from '../i18n/config';
import type { Localized } from './site';

export const resumeUpdatedOn = '2026-11-25';

export type ResumeVariant = 'systems' | 'algorithms';
type LocalizedList = Record<Locale, string[]>;

export interface ResumeProject {
  title: Localized;
  href: string;
  period: Localized;
  bullets: LocalizedList;
}

export interface ResumeContent {
  title: Localized;
  summary: Localized;
  skills: Array<{ label: Localized; detail: Localized }>;
  projects: ResumeProject[];
  experienceBullets: Record<number, LocalizedList>;
}

// Source chronology stays in experience.ts. These entries select the evidence
// most relevant to each target role; they do not replace employment titles.
const earlyExperience: Record<number, LocalizedList> = {
  0: {
    en: ['Built heterogeneous-network features for drug–target ranking and applied deep-learning detection to low-signal cryo-EM images.'],
    zh: ['基于异构网络构建药物靶点排序特征，并将深度学习目标检测应用于低信噪比冷冻电镜图像。'],
  },
  1: {
    en: ['Developed pathology-image pipelines with U-Net and convolutional features; co-first author of studies on metagenomic geolocation and anti-PD-1 response.'],
    zh: ['使用 U-Net 与卷积特征研发病理图像处理流程；为宏基因组城市定位及 anti-PD-1 响应研究论文的共同第一作者。'],
  },
  2: {
    en: ['Developed attention-enhanced ssDNA image segmentation and proposed GMM-based Stereo-seq correction using spatial and expression information.'],
    zh: ['研发结合注意力机制的 ssDNA 图像分割，提出融合空间与表达信息的 GMM Stereo-seq 数据校正方法。'],
  },
  3: {
    en: ['Led algorithm design for recurrence-risk stratification from whole-slide pathology images.'],
    zh: ['负责基于全切片病理图像的复发风险分层算法设计。'],
  },
  4: {
    en: [
      'Led medical LLM R&D integrating an oncology knowledge base via RAG and LoRA domain adaptation.',
      'Built intent-recognition, entity-extraction, and sentiment pipelines for structured clinical interactions.',
    ],
    zh: [
      '负责医疗大模型应用研发，通过 RAG 接入专业肿瘤学知识库，并采用 LoRA 完成领域模型适配。',
      '研发意图识别、实体抽取与情感分析流程，支撑医疗场景交互中的结构化信息提取与路由。',
    ],
  },
  5: {
    en: [
      'Designed multimodal agent workflows orchestrating retrieval, function calling, and text-to-image generation.',
      'Integrated ASR, LLM, and TTS voice pipelines with prompt and child-facing content-safety controls.',
    ],
    zh: [
      '设计多模态智能体工作流，编排知识检索、Function Calling 与文生图以支持交互式内容生成。',
      '集成 ASR、大模型交互与 TTS 对话语音链路，结合检索与工具调用，并建设提示词与儿童内容安全控制。',
    ],
  },
};

const applicationContext: Localized = {
  en: 'Built agent workflows and skill pipelines for structured data ingestion, automated auditing, and evaluation, with end-to-end execution tracing and regression checks.',
  zh: '将智能体工作流与技能编排落地于结构化数据采集、自动化审计与评估流程，补齐端到端执行追踪与质量回归检查。',
};

const aimo = {
  title: { en: 'AIMO3 · Tool-augmented mathematical reasoning', zh: 'AIMO3 · 工具增强数学推理' },
  href: 'https://github.com/Canqiang/kaggle-AIMO-3',
  period: { en: '2026 · Kaggle bronze · 405 / 4,138 teams', zh: '2026 · Kaggle 铜牌 · 405 / 4,138 支队伍' },
};

const orbit = {
  title: { en: 'Orbit Wars · Self-play policy experiments', zh: 'Orbit Wars · 自博弈策略实验' },
  href: 'https://github.com/Canqiang/orbit-wars',
  period: { en: '2026 · Kaggle silver · 112 / 4,729 teams', zh: '2026 · Kaggle 银牌 · 112 / 4,729 支队伍' },
};

export const resumeVariants: Record<ResumeVariant, ResumeContent> = {
  systems: {
    title: { en: 'AI Systems R&D', zh: 'AI 系统研发' },
    summary: {
      en: 'AI systems engineer and Core-AI open-source contributor focused on durable agent execution, cross-pod recovery, sandbox lifecycle, and model-protocol routing, pairing backend concurrency and observability with LLM inference and evaluation rigor.',
      zh: 'AI 系统研发工程师、Core-AI 开源贡献者，专注智能体持久化执行、跨 Pod 状态恢复、沙箱生命周期与模型协议路由，兼具分布式并发、可观测工程与大模型推理评测实践。',
    },
    skills: [
      { label: { en: 'Runtime & infra', zh: '运行时与设施' }, detail: { en: 'Java, Python, TypeScript; durable workflows, pause/resume, concurrency, sandbox lifecycle, Kubernetes', zh: 'Java、Python、TypeScript；智能体持久化工作流、暂停恢复、并发控制、沙箱生命周期、Kubernetes' } },
      { label: { en: 'Protocols & state', zh: '协议与可观测' }, detail: { en: 'OpenAI-compatible / Responses APIs, MCP; MongoDB, Redis, PostgreSQL, OpenTelemetry tracing', zh: 'OpenAI 兼容接口、Responses API、MCP；MongoDB、Redis、PostgreSQL、OpenTelemetry 执行追踪' } },
      { label: { en: 'Inference & eval', zh: '推理与评测' }, detail: { en: 'vLLM, PyTorch, NumPy; tool-augmented reasoning, parallel sampling, paired evaluation, policy deployment', zh: 'vLLM、PyTorch、NumPy；工具增强推理、并行采样、配对评测门禁与策略部署' } },
    ],
    experienceBullets: {
      ...earlyExperience,
      6: {
        en: [
          'Implemented human-input pause/resume and MongoDB workflow persistence in team-built Core-AI; serialized snapshot-and-write to prevent cancel/save overwrites with a concurrency regression test.',
          'Added Redis heartbeat/TTL cross-pod turn liveness with unknown-state fallback and wired session-ownership into cross-pod RPC dispatch, with module-wiring and recovery regression tests.',
          'Built capability-aware Responses routing for reasoning models with tools and configurable sandbox snapshot retention with scoped permissions, with routing and expiry validation.',
          applicationContext.en,
        ],
        zh: [
          '在团队开源框架 Core-AI 中实现人工介入暂停恢复与基于 MongoDB 的工作流状态持久化；串行化快照与写入，修复取消与保存竞态覆盖，并加入并发回归用例。',
          '实现基于 Redis 心跳与 TTL 的跨 Pod 轮次存活识别及未知状态降级，修复运行中流式输出被误清空；补齐跨 Pod RPC 调度的会话归属注入，补充模块装配与异常路径回归覆盖。',
          '实现面向推理模型与工具调用的 Responses API 能力感知路由，以及可配置的沙箱快照保留周期与独立权限控制，并补充兼容性与到期逻辑校验。',
          applicationContext.zh,
        ],
      },
    },
    projects: [
      {
        ...aimo,
        bullets: {
          en: [
            'Configured gpt-oss-120B/vLLM on a public tool-integrated reasoning baseline with eight parallel attempts, persistent Python execution, four-vote early stopping and a dynamic time budget.',
            'Modified answer aggregation to weight Python-call counts and error rates as confidence heuristics; published the inspectable inference notebook.',
          ],
          zh: [
            '基于公开工具集成推理方案，配置 gpt-oss-120B/vLLM 的 8 路采样、持久 Python 执行环境、4 票共识早停与动态时间预算。',
            '改写答案聚合逻辑，以 Python 调用次数与错误率作为置信度启发式进行加权投票，并公开推理 Notebook。',
          ],
        },
      },
      {
        ...orbit,
        bullets: {
          en: [
            'Worked on an existing BC→PPO self-play stack, adding reward experiments, JAX runtime configuration and persistent compilation caching.',
            'Integrated separate 2P/4P policies into a router with a NumPy deployment path requiring no PyTorch; used official-environment and paired-seed evaluation gates for candidate acceptance.',
          ],
          zh: [
            '基于已有 BC→PPO 自博弈训练栈，加入奖励实验、JAX 运行配置与持久编译缓存。',
            '整合 2P/4P 策略路由及不依赖 PyTorch 的 NumPy 部署，以官方环境一致性与配对种子评测作为候选接受条件。',
          ],
        },
      },
    ],
  },
  algorithms: {
    title: { en: 'AI Reasoning, Evaluation & ML R&D', zh: 'AI 推理、评测与算法研发' },
    summary: {
      en: 'Applied AI and algorithm engineer bridging tool-augmented LLM inference, self-play policy evaluation, and biomedical machine learning (two co-first-author papers, PCT patent application). Experienced in paired evaluation gates, agent runtime reliability, and reproducible experimentation.',
      zh: '应用算法与 AI 研发工程师，连接工具增强大模型推理、自博弈策略评测与生物医学机器学习（两篇共一论文、PCT 专利申请）。注重配对评测门禁、智能体运行时可靠性与可复现实验工程。',
    },
    skills: [
      { label: { en: 'LLM & eval', zh: '推理与评测' }, detail: { en: 'vLLM, Python; tool-augmented reasoning, self-consistency, weighted aggregation, paired-seed eval gates', zh: 'vLLM、Python；工具增强推理、自洽采样、加权聚合、配对种子评测门禁' } },
      { label: { en: 'Policy & ML', zh: '策略与建模' }, detail: { en: 'PyTorch, JAX, NumPy; BC/PPO self-play, U-Net, CNNs, GMM, feature selection, RAG & LoRA adaptation', zh: 'PyTorch、JAX、NumPy；BC/PPO 自博弈、U-Net、卷积特征、GMM、特征选择、RAG 与 LoRA 适配' } },
      { label: { en: 'Agent systems', zh: '智能体系统' }, detail: { en: 'Java, TypeScript; durable workflows, cross-pod recovery, OpenAI/Responses APIs, MCP, sandbox lifecycle, PostgreSQL, Redis', zh: 'Java、TypeScript；持久化工作流、跨 Pod 恢复、OpenAI/Responses API、MCP、沙箱生命周期、PostgreSQL、Redis' } },
    ],
    experienceBullets: {
      ...earlyExperience,
      1: {
        en: [
          'Developed H&E cell segmentation and classification using U-Net and convolutional features including ResNet, DenseNet and Siamese networks.',
          'Built metagenomic geolocation with feature selection, classification and interpolation; contributed expression-feature and machine-learning analysis to anti-PD-1 response research. Co-first author on both studies.',
        ],
        zh: [
          '使用 U-Net 及 ResNet、DenseNet、Siamese Network 等卷积特征方法，研发 HE 图像细胞分割与分类。',
          '结合特征选择、分类与插值构建宏基因组城市定位框架，并参与 anti-PD-1 响应的表达特征与机器学习分析；两项研究均为共同第一作者。',
        ],
      },
      2: {
        en: [
          'Developed attention-enhanced semantic segmentation for ssDNA-stained tissue images.',
          'Proposed GMM-based Stereo-seq correction combining spatial and expression information; contributed to the associated PCT patent application.',
        ],
        zh: [
          '面向 ssDNA 染色组织图像，研发结合注意力机制的语义分割方法。',
          '提出融合空间与表达信息的 GMM Stereo-seq 数据校正方法，参与相关 PCT 专利申请。',
        ],
      },
      6: {
        en: [
          'Contributed to Core-AI durable workflow persistence, pause/resume, cancel/save concurrency fixes, and cross-pod execution-state and RPC ownership recovery with regression coverage.',
          'Implemented capability-aware model routing for reasoning with tools across OpenAI-compatible and Responses APIs, plus configurable sandbox snapshot retention and permissions.',
          applicationContext.en,
        ],
        zh: [
          '参与 Core-AI 持久化工作流与暂停恢复，修复取消竞态覆盖、跨 Pod 执行状态误判及跨 Pod RPC 会话归属问题，并补充回归覆盖。',
          '面向推理与工具调用实现 OpenAI 兼容接口与 Responses API 的能力感知路由，并实现可配置沙箱快照保留周期与权限控制。',
          applicationContext.zh,
        ],
      },
    },
    projects: [
      {
        ...aimo,
        bullets: {
          en: [
            'Modified a public tool-integrated reasoning baseline with weighted answer voting, using Python-call counts and error rates as confidence heuristics.',
            'Ran inference experiments with gpt-oss-120B/vLLM, eight parallel attempts, persistent Python execution, consensus early stopping and dynamic time allocation.',
          ],
          zh: [
            '在公开工具集成推理方案上改写答案选择策略，以 Python 调用次数与错误率作为置信度启发式进行加权投票。',
            '基于 gpt-oss-120B/vLLM 开展推理实验，结合 8 路采样、持久 Python 执行、共识早停与动态时间分配。',
          ],
        },
      },
      {
        ...orbit,
        bullets: {
          en: [
            'Designed a comeback-gated dense-reward experiment on an existing BC→PPO self-play stack; adjusted JAX training configuration and compilation caching.',
            'Combined 2P/4P policy routing, NumPy deployment and paired evaluation, rejecting reward candidates that failed evaluation gates.',
          ],
          zh: [
            '基于已有 BC→PPO 自博弈栈，设计落后状态触发的密集奖励实验，并调整 JAX 训练配置与编译缓存。',
            '结合 2P/4P 策略路由、NumPy 部署与配对评测，筛除未通过评测的奖励候选。',
          ],
        },
      },
    ],
  },
};
