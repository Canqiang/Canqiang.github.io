import type { Locale } from '../i18n/config';

export type Localized = Record<Locale, string>;
export type PublicLink = { label: string; href: string };

export const identity = {
  name: 'Xander Xu',
  chineseName: '许灿强',
  role: { en: 'AI Engineer', zh: 'AI 研发工程师' },
  headline: {
    en: 'From algorithms to agent runtimes.',
    zh: '从算法建模到智能体运行时。',
  },
  introduction: {
    en: 'I develop machine-learning models and AI systems, from image segmentation and probabilistic modeling to tool-augmented LLM inference. As a Core-AI contributor, I work on agent execution, model interfaces, state recovery, and observability.',
    zh: '我从事机器学习建模与 AI 系统研发，经历覆盖图像分割、概率建模和工具增强大模型推理。作为 Core-AI 核心贡献者，我参与智能体执行、模型接口、状态恢复与可观测性研发。',
  },
  photoAlt: {
    en: 'Xander Xu presenting an AI system at a hackathon',
    zh: '许灿强在 AI 黑客松现场介绍智能体系统',
  },
} satisfies Record<string, string | Localized>;

// Kept as a named copy export for page-level consumers in the implementation plan.
export const siteCopy = identity;

export const fieldIndex = [
  { key: 'bioinformatics', en: 'Bioinformatics', zh: '生物信息' },
  { key: 'medical-ai', en: 'Medical AI', zh: '医疗 AI' },
  { key: 'llm-products', en: 'LLM Systems', zh: '大模型系统' },
  { key: 'agent-systems', en: 'Agent Systems', zh: '智能体系统' },
] as const;

export const publicLinks: PublicLink[] = [
  { label: 'GitHub', href: 'https://github.com/Canqiang' },
  { label: 'Core-AI', href: 'https://github.com/chancetop-com/core-ai' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/canqiang' },
  { label: 'Bilibili', href: 'https://space.bilibili.com/255230761' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/canqiang-xu-8510531b3/' },
  { label: 'Email', href: 'mailto:canqiangxu@yeah.net' },
];

export interface FieldCard {
  key: string;
  name: Localized;
  scope: Localized;
  span: string;
  orgs: Localized;
}

export const fieldCards: FieldCard[] = [
  {
    key: 'bioinformatics',
    name: { en: 'Bioinformatics', zh: '生物信息' },
    scope: { en: 'Graph features, multi-omics data pipelines, cryo-EM object detection.', zh: '图特征建模、多组学数据流程、冷冻电镜目标检测。' },
    span: '2017 — 2018',
    orgs: { en: 'Tsinghua IIIS', zh: '清华交叉信息院' },
  },
  {
    key: 'medical-ai',
    name: { en: 'Medical AI', zh: '医疗 AI' },
    scope: { en: 'Image segmentation, spatial-omics correction, predictive modeling.', zh: '图像分割、空间组学数据校正、预测建模。' },
    span: '2018 — 2023',
    orgs: { en: 'Jiyuan · BGI · Fapon', zh: '极元 / 华大 / 菲鹏' },
  },
  {
    key: 'llm-products',
    name: { en: 'LLM Systems', zh: '大模型系统' },
    scope: { en: 'RAG, LoRA adaptation, multimodal and speech integration.', zh: 'RAG、LoRA 模型适配、多模态与语音集成。' },
    span: '2023 — 2025',
    orgs: { en: 'Jiyuan · Qudian', zh: '极元 / 趣店' },
  },
  {
    key: 'agent-systems',
    name: { en: 'Agent Systems', zh: '智能体系统' },
    scope: { en: 'Agent runtimes, model interfaces, durable state, observability.', zh: '智能体运行时、模型接口、状态持久化与可观测性。' },
    span: '2025 — Now',
    orgs: { en: 'ChanceTop · Core-AI', zh: '畅拓 / Core-AI' },
  },
];

export interface CareerStop {
  year: Localized;
  org: Localized;
  role: Localized;
  field: string;
}

export const careerAxis: CareerStop[] = [
  { year: { en: '2017', zh: '2017' }, org: { en: 'Tsinghua IIIS', zh: '清华 IIIS' }, role: { en: 'Research Assistant', zh: '科研助理' }, field: 'bioinformatics' },
  { year: { en: '2021', zh: '2021' }, org: { en: 'BGI Research', zh: '华大研究院' }, role: { en: 'Algorithm Lead', zh: '算法负责人' }, field: 'medical-ai' },
  { year: { en: '2023', zh: '2023' }, org: { en: 'Jiyuan Technology', zh: '极元科技' }, role: { en: 'Medical LLM Lead', zh: '医疗大模型技术负责人' }, field: 'llm-products' },
  { year: { en: 'Now', zh: '现在' }, org: { en: 'ChanceTop', zh: '畅拓科技' }, role: { en: 'AI Engineer', zh: 'AI 研发工程师' }, field: 'agent-systems' },
];
