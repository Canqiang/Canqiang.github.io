import type { Locale } from '../i18n/config';

export type Localized = Record<Locale, string>;
export type PublicLink = { label: string; href: string };

export const identity = {
  name: 'Xander Xu',
  chineseName: '许灿强',
  role: { en: 'AI Engineer', zh: 'AI 研发工程师' },
  headline: {
    en: 'From algorithms\nto agent runtimes.',
    zh: '从算法建模\n到智能体运行时。',
  },
  introduction: {
    en: 'I build durable agent runtimes and AI systems, spanning cross-pod state recovery, sandbox lifecycle, model-protocol routing, and reproducible LLM inference and evaluation. Core contributor to the open-source Core-AI framework, with earlier biomedical ML and co-first-author research.',
    zh: '我专注智能体运行时与 AI 系统研发，覆盖持久化执行、跨 Pod 状态恢复、沙箱生命周期、模型协议路由，以及可复现的大模型推理与评测。作为开源框架 Core-AI 核心贡献者，兼具早期生物医学机器学习与共一论文研究背景。',
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
  project: string;
  projectLabel: Localized;
  name: Localized;
  scope: Localized;
  startYear: number;
  endYear?: number;
  orgs: Localized;
}

export const fieldCards: FieldCard[] = [
  {
    key: 'bioinformatics',
    project: 'research',
    projectLabel: { en: 'Papers & patents', zh: '论文与专利' },
    name: { en: 'Bioinformatics', zh: '生物信息' },
    scope: { en: 'Graph features, multi-omics data pipelines, cryo-EM object detection.', zh: '图特征建模、多组学数据流程、冷冻电镜目标检测。' },
    startYear: 2017,
    endYear: 2018,
    orgs: { en: 'Tsinghua IIIS', zh: '清华交叉信息院' },
  },
  {
    key: 'medical-ai',
    project: 'medical-ai',
    projectLabel: { en: 'Pathology & spatial omics', zh: '病理影像与空间组学' },
    name: { en: 'Medical AI', zh: '医疗 AI' },
    scope: { en: 'Image segmentation, spatial-omics correction, predictive modeling.', zh: '图像分割、空间组学数据校正、预测建模。' },
    startYear: 2018,
    endYear: 2023,
    orgs: { en: 'Jiyuan · BGI · Fapon', zh: '极元 / 华大 / 菲鹏' },
  },
  {
    key: 'llm-products',
    project: 'applied-ai-products',
    projectLabel: { en: 'RAG & multimodal systems', zh: 'RAG 与多模态应用' },
    name: { en: 'LLM Systems', zh: '大模型系统' },
    scope: { en: 'RAG, LoRA adaptation, multimodal and speech integration.', zh: 'RAG、LoRA 模型适配、多模态与语音集成。' },
    startYear: 2023,
    endYear: 2025,
    orgs: { en: 'Jiyuan · Qudian', zh: '极元 / 趣店' },
  },
  {
    key: 'agent-systems',
    project: 'core-ai',
    projectLabel: { en: 'Core-AI', zh: 'Core-AI' },
    name: { en: 'Agent Systems', zh: '智能体系统' },
    scope: { en: 'Durable execution, cross-pod recovery, sandbox lifecycle, model protocols, observability.', zh: '持久化执行、跨 Pod 恢复、沙箱生命周期、模型协议与可观测性。' },
    startYear: 2025,
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
