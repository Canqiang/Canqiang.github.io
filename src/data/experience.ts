import type { Locale } from '../i18n/config';

type Localized = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

export type ExperienceField = 'bioinformatics' | 'medical-ai' | 'llm-products' | 'agent-systems';

export interface ExperienceEntry {
  field: ExperienceField;
  company: Localized;
  role: Localized;
  period: Localized;
  location: Localized;
  summary: Localized;
  highlights: LocalizedList;
}

export const experience: ExperienceEntry[] = [
  {
    field: 'bioinformatics',
    company: {
      en: 'Tsinghua University, Institute for Interdisciplinary Information Sciences',
      zh: '清华大学交叉信息研究院',
    },
    role: { en: 'Research Assistant', zh: '科研助理' },
    period: { en: 'Jul 2017 — Oct 2018', zh: '2017 年 7 月 — 2018 年 10 月' },
    location: { en: 'Beijing, China', zh: '中国北京' },
    summary: {
      en: 'Worked across drug-target prediction, multi-omics data systems, and cryo-EM particle detection.',
      zh: '参与药物靶点预测、多维组学数据系统与冷冻电镜生物颗粒识别研发。',
    },
    highlights: {
      en: [
        'Built heterogeneous-network features for drug-target interaction ranking.',
        'Collected, structured, and retrieved public genomics records for a multi-omics data interface.',
        'Applied deep-learning object detection to low-signal cryo-EM imagery.',
      ],
      zh: [
        '基于异构网络学习特征，用于药物靶点相互作用排序。',
        '面向多维组学数据界面采集、结构化并检索公开基因组记录。',
        '将深度学习目标检测应用于低信噪比冷冻电镜图像。',
      ],
    },
  },
  {
    field: 'medical-ai',
    company: { en: 'Jiyuan Technology', zh: '极元科技' },
    role: { en: 'Algorithm Engineer', zh: '算法工程师' },
    period: { en: 'Oct 2018 — Apr 2021', zh: '2018 年 10 月 — 2021 年 4 月' },
    location: { en: 'Xiamen, China', zh: '中国厦门' },
    summary: {
      en: 'Developed biomedical machine-learning methods for pathology, metagenomic geolocation, and immunotherapy-response research.',
      zh: '研发面向病理图像、微生物宏基因组城市定位和免疫治疗响应研究的生物医学机器学习方法。',
    },
    highlights: {
      en: [
        'Developed cell segmentation, classification, and feature-extraction pipelines for H&E pathology images.',
        'Built a metagenomic geolocation framework combining classification, feature selection, and geographic interpolation.',
        'Applied expression-signature analysis and machine learning to anti-PD-1 response research.',
      ],
      zh: [
        '研发 HE 染色病理图像的细胞分割、分类与特征提取流程。',
        '结合分类、特征选择与地理插值，构建微生物宏基因组城市定位框架。',
        '将表达特征分析与机器学习用于 anti-PD-1 治疗响应研究。',
      ],
    },
  },
  {
    field: 'medical-ai',
    company: { en: 'BGI Research', zh: '华大生命科学研究院' },
    role: { en: 'Algorithm Engineer and Team Lead', zh: '算法工程师、团队负责人' },
    period: { en: 'Apr 2021 — Apr 2022', zh: '2021 年 4 月 — 2022 年 4 月' },
    location: { en: 'Shenzhen, China', zh: '中国深圳' },
    summary: {
      en: 'Led spatial clinical algorithm work spanning analysis design, cell-image segmentation, and Stereo-seq data correction.',
      zh: '负责时空临床算法工作，覆盖分析框架设计、细胞图像分割与 Stereo-seq 数据校正。',
    },
    highlights: {
      en: [
        'Coordinated spatial clinical analysis work and cross-team delivery.',
        'Developed attention-enhanced semantic segmentation for ssDNA-stained tissue images.',
        'Proposed a GMM-based correction approach using spatial and expression information.',
      ],
      zh: [
        '协调时空临床分析研发与跨团队交付。',
        '面向 ssDNA 染色组织图像研发结合注意力机制的语义分割方法。',
        '提出融合空间信息与表达信息的 GMM 数据校正方法。',
      ],
    },
  },
  {
    field: 'medical-ai',
    company: { en: 'Fapon Biotech', zh: '菲鹏生物' },
    role: { en: 'Algorithm Engineer and Project Lead', zh: '算法工程师、项目负责人' },
    period: { en: 'Apr 2022 — Mar 2023', zh: '2022 年 4 月 — 2023 年 3 月' },
    location: { en: 'Shenzhen, China', zh: '中国深圳' },
    summary: {
      en: 'Led research on whole-slide-image methods for prognostic risk stratification.',
      zh: '负责基于全切片图像的预后风险分层算法研究。',
    },
    highlights: {
      en: [
        'Designed an algorithmic approach for stratifying recurrence risk from whole-slide pathology images.',
        'Connected modeling choices with the clinical research question and project delivery plan.',
      ],
      zh: [
        '设计基于全切片病理图像的复发风险分层算法方案。',
        '围绕临床研究问题统筹建模方案与项目交付计划。',
      ],
    },
  },
  {
    field: 'llm-products',
    company: { en: 'Jiyuan Technology', zh: '极元科技' },
    role: { en: 'Technical Lead, Medical LLM R&D', zh: '技术负责人、医疗大模型研发' },
    period: { en: 'Mar 2023 — Jun 2024', zh: '2023 年 3 月 — 2024 年 6 月' },
    location: { en: 'Xiamen, China', zh: '中国厦门' },
    summary: {
      en: 'Led medical LLM research and product design across RAG, NLP, efficient fine-tuning, and enterprise workflows.',
      zh: '负责医疗大模型研发与产品设计，覆盖 RAG、NLP、高效微调与企业级工作流。',
    },
    highlights: {
      en: [
        'Integrated large language models with a specialist oncology knowledge base through RAG.',
        'Applied intent recognition, entity extraction, and sentiment analysis to product interactions.',
        'Designed supporting product workflows and used LoRA for domain-focused model adaptation.',
      ],
      zh: [
        '通过 RAG 将大语言模型与专业肿瘤学知识库结合。',
        '将意图识别、实体提取和情感分析应用于产品交互。',
        '设计配套产品工作流，并使用 LoRA 进行领域适配。',
      ],
    },
  },
  {
    field: 'llm-products',
    company: { en: 'Qudian Technology', zh: '趣店科技' },
    role: { en: 'LLM Application Engineer', zh: '大语言模型应用研发工程师' },
    period: { en: 'Sep 2024 — Jul 2025', zh: '2024 年 9 月 — 2025 年 7 月' },
    location: { en: 'Xiamen, China', zh: '中国厦门' },
    summary: {
      en: 'Developed multimodal LLM systems combining retrieval, tool calling, text-to-image generation, and speech interaction.',
      zh: '研发结合检索、工具调用、文生图与语音交互的多模态大模型系统。',
    },
    highlights: {
      en: [
        'Designed multimodal agent workflows connecting retrieval and content-generation capabilities.',
        'Combined language-model generation with text-to-image workflows for interactive content.',
        'Integrated RAG, function calling, TTS, and ASR while developing prompt and child-safety controls.',
      ],
      zh: [
        '设计多模态智能体工作流，连接检索与内容生成能力。',
        '结合语言模型生成与文生图工作流，支持交互式内容生成。',
        '集成 RAG、Function Calling、TTS 与 ASR，并建设提示词和儿童内容安全控制。',
      ],
    },
  },
  {
    field: 'agent-systems',
    company: { en: 'ChanceTop', zh: '畅拓科技' },
    role: { en: 'AI Engineer', zh: 'AI 研发工程师' },
    period: { en: 'Jul 15, 2025 — Present', zh: '2025 年 7 月 15 日 — 至今' },
    location: { en: 'China', zh: '中国' },
    summary: {
      en: 'Core contributor to Core-AI, a team-built open-source agent framework, focusing on runtime execution, model integration, persistent state, and recovery.',
      zh: '团队开源智能体框架 Core-AI 的核心贡献者，重点参与运行时执行、模型集成、状态持久化与恢复机制研发。',
    },
    highlights: {
      en: [
        'Developed durable agent workflows with human-in-the-loop steps, nested execution, persisted run state, resumption, artifact delivery, and execution tracing.',
        'Built model-gateway integrations across OpenAI-compatible and Responses APIs, including routing tool-bearing reasoning turns and preserving user queries when rendering authored prompt templates.',
        'Built session-recovery and sandbox snapshot mechanisms, including configurable retention and scoped permissions, to support long-running task recovery and diagnosis.',
        'Applied agent workflows to menu data processing and Local SEO automation, spanning data collection, structured transformation, and evaluation.',
      ],
      zh: [
        '研发持久化智能体工作流，支持人工介入、嵌套执行、运行状态保存、断点恢复、产物交付与执行追踪。',
        '建设覆盖 OpenAI 兼容接口与 Responses API 的模型网关，完善推理模型工具调用路由；限制提示词模板渲染范围，保留用户查询原文。',
        '建设会话恢复与沙箱快照机制，加入保留周期配置和权限控制，支持长任务的运行恢复与故障排查。',
        '将 Agent 技术用于菜单数据处理与 Local SEO 自动化，覆盖数据采集、结构化处理和结果评估。',
      ],
    },
  },
];
