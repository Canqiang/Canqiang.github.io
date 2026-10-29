import type { Locale } from '../i18n/config';
import type { Localized } from './site';

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
    en: ['Integrated an oncology knowledge base through RAG, applied LoRA for domain adaptation, and developed intent-recognition and entity-extraction workflows.'],
    zh: ['通过 RAG 接入肿瘤学知识库，使用 LoRA 进行领域适配，并研发意图识别与实体抽取流程。'],
  },
  5: {
    en: ['Designed multimodal agent workflows combining retrieval, function calling, image generation and speech interfaces, with prompt and content-safety controls.'],
    zh: ['设计结合检索、工具调用、图像生成与语音接口的多模态智能体工作流，并建设提示词与内容安全控制。'],
  },
};

const applicationContext: Localized = {
  en: 'Applied agent workflows to structured data processing and Local SEO automation.',
  zh: '将智能体工作流用于结构化数据处理与 Local SEO 自动化。',
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
      en: 'AI systems engineer and Core-AI open-source contributor, working on durable agent execution, recovery consistency and model-protocol integration. Earlier work spans biomedical machine learning; recent competition projects cover LLM inference and policy deployment.',
      zh: 'AI 系统研发工程师、Core-AI 开源贡献者，重点研发智能体持久化执行、恢复一致性与模型协议适配。具备生物医学机器学习背景，近期通过竞赛开展大模型推理与策略部署实验。',
    },
    skills: [
      { label: { en: 'Runtime', zh: '运行时' }, detail: { en: 'Java, Python; agent workflows, pause/resume, state persistence, concurrency', zh: 'Java、Python；智能体工作流、暂停恢复、状态持久化与并发控制' } },
      { label: { en: 'Interfaces & state', zh: '接口与状态' }, detail: { en: 'OpenAI-compatible / Responses APIs, MCP; MongoDB, Redis, execution tracing', zh: 'OpenAI 兼容接口、Responses API、MCP；MongoDB、Redis、执行追踪' } },
      { label: { en: 'Inference', zh: '推理实验' }, detail: { en: 'vLLM, NumPy; tool-augmented inference, sampling, early stopping, policy deployment', zh: 'vLLM、NumPy；工具增强推理、并行采样、早停与策略部署' } },
    ],
    experienceBullets: {
      ...earlyExperience,
      6: {
        en: [
          'Implemented human-input pause/resume and persisted workflow state in the team-built Core-AI framework; serialized snapshot-and-write operations to prevent stale overwrites during cancellation, with a concurrency regression test.',
          'Added Redis heartbeat/TTL-based cross-pod execution-state detection and an unknown-state fallback, fixing erroneous clearing of active chat messages; added recovery and failure-path regression coverage.',
          'Implemented capability-aware Responses routing for reasoning models with tools, preserving other model routes and adding compatibility regression cases.',
          applicationContext.en,
        ],
        zh: [
          '在团队开源框架 Core-AI 中实现人工介入的暂停恢复与工作流状态持久化；串行化快照与写入，修复取消时旧状态覆盖问题，并加入并发回归用例。',
          '加入基于 Redis 心跳与 TTL 的跨 Pod 执行状态识别及未知状态降级，修复运行中消息被误清空的问题，补充恢复与异常路径回归覆盖。',
          '按模型推理能力、工具配置与接口能力选择 Responses 路由，保留其他模型原有路径，并补充兼容性回归场景。',
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
    title: { en: 'Machine Learning & Algorithm R&D', zh: '机器学习与算法研发' },
    summary: {
      en: 'Algorithm engineer with experience in image segmentation, probabilistic modeling and biomedical prediction; co-first author of two peer-reviewed papers. Recent work covers tool-augmented LLM inference, self-play policy experiments and reliable research execution.',
      zh: '算法研发工程师，具备图像分割、概率建模与生物医学预测研究经验，为两篇同行评审论文的共同第一作者。近期工作覆盖大模型工具增强推理、自博弈策略实验及可靠的实验执行。',
    },
    skills: [
      { label: { en: 'Modeling', zh: '算法建模' }, detail: { en: 'Python, PyTorch; U-Net, convolutional features, GMM, feature selection', zh: 'Python、PyTorch；U-Net、卷积特征、GMM、特征选择' } },
      { label: { en: 'LLM methods', zh: '大模型方法' }, detail: { en: 'vLLM; tool-augmented reasoning, self-consistency, answer aggregation; RAG, LoRA adaptation', zh: 'vLLM；工具增强推理、自洽采样、答案聚合；RAG、LoRA 领域适配' } },
      { label: { en: 'Policy experiments', zh: '策略实验' }, detail: { en: 'BC/PPO experimentation, JAX training configuration, paired evaluation, NumPy deployment', zh: 'BC/PPO 实验、JAX 训练配置、配对评测、NumPy 部署' } },
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
          'Contributed to Core-AI workflow persistence and pause/resume; fixed stale state overwrites during cancellation and cross-pod execution-state misclassification, with regression coverage.',
          'Implemented capability-aware model routing for reasoning and tool use across OpenAI-compatible and Responses APIs.',
          applicationContext.en,
        ],
        zh: [
          '参与 Core-AI 工作流持久化与暂停恢复，修复取消时旧状态覆盖及跨 Pod 执行状态误判，并补充回归覆盖。',
          '面向推理与工具调用实现模型能力感知路由，适配 OpenAI 兼容接口与 Responses API。',
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
