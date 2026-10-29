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
      en: 'Built multimodal LLM product experiences spanning agents, interactive storybooks, voice interaction, and child-focused content safety.',
      zh: '研发覆盖智能体、交互式故事绘本、语音交互与儿童内容安全的多模态大模型产品体验。',
    },
    highlights: {
      en: [
        'Designed a multimodal agent for search, storytelling, educational content, and other interactive capabilities.',
        'Combined story generation with text-to-image workflows for interactive picture books.',
        'Integrated RAG, function calling, TTS, and ASR while developing prompt and child-safety controls.',
      ],
      zh: [
        '设计支持搜索、故事、科普等交互能力的多模态智能体。',
        '结合故事生成与文生图工作流，研发交互式绘本体验。',
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
      en: 'Core contributor to Core-AI, a team-built open-source agent platform spanning a Java framework, CLI, server, web interface, and desktop preview client. Also develops restaurant menu AI and Local SEO agent workflows.',
      zh: 'Core-AI 核心贡献者，参与团队开源智能体平台的 Java 框架、CLI、服务端、Web 界面与桌面预览客户端研发；同时负责餐饮菜单 AI 与 Local SEO 智能体工作流。',
    },
    highlights: {
      en: [
        'Delivered durable workflows with human-in-the-loop steps, nested execution, run resumption, artifact delivery, and tracing; added configurable sandbox snapshot retention with scoped permissions.',
        'Built model-gateway integrations across OpenAI-compatible and Responses APIs, including routing tool-bearing reasoning turns and preserving user queries when rendering authored prompt templates.',
        'Contributed desktop reliability fixes for Chinese IME input, macOS preview signing and startup verification, alongside bilingual platform guides and troubleshooting documentation.',
        'Delivered menu understanding, data normalization, content completion, and optimization capabilities within an existing restaurant-industry AI product.',
        'Built Local SEO workflows linking keyword research, Google Business Profile and website content, Maps ranking collection, and weekly reviews of content changes and query observations; kept missing results, collection protocols, and location conditions explicit in the analysis.',
      ],
      zh: [
        '交付人工介入、嵌套执行、运行恢复、产物交付与执行追踪等持久化工作流能力，并加入受权限控制的沙箱快照保留周期配置。',
        '建设覆盖 OpenAI 兼容接口与 Responses API 的模型网关，完善推理模型工具调用路由；限制提示词模板渲染范围，保留用户查询原文。',
        '参与桌面端中文输入法交互修复、macOS 预览包签名与启动验证，并完善平台中英文使用手册及排障文档。',
        '为餐饮行业 AI 产品交付菜单理解、数据标准化、内容补全与优化能力，并接入现有产品流程。',
        '建设 Local SEO 工作流，串联关键词研究、Google Business Profile 与官网内容、Maps 排名采集及周度复盘；将内容改动与查询观测关联，明确保留未见结果、采集协议和定位条件。',
      ],
    },
  },
];
