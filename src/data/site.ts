import type { Locale } from '../i18n/config';

export type Localized = Record<Locale, string>;
export type PublicLink = { label: string; href: string };

export const identity = {
  name: 'Xander Xu',
  chineseName: '许灿强',
  role: { en: 'AI Platform Engineer', zh: 'AI 平台研发工程师' },
  headline: {
    en: 'Models are only useful when they ship.',
    zh: '模型只有真正落地，才有价值。',
  },
  introduction: {
    en: 'I build open-source agent frameworks and applied AI systems, with a career spanning bioinformatics, medical vision, LLM products, and workflow infrastructure.',
    zh: '我专注于开源智能体框架与应用型 AI 系统研发，经历覆盖生物信息、医疗视觉、大模型产品与工作流基础设施。',
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
  { key: 'llm-products', en: 'LLM Products', zh: '大模型产品' },
  { key: 'agent-systems', en: 'Agent Systems', zh: '智能体系统' },
] as const;

export const publicLinks: PublicLink[] = [
  { label: 'GitHub', href: 'https://github.com/Canqiang' },
  { label: 'Core-AI', href: 'https://github.com/chancetop-com/core-ai' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/canqiang' },
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
    scope: { en: 'Drug-target prediction, multi-omics data systems, cryo-EM detection.', zh: '药物靶点、多组学数据系统、冷冻电镜识别。' },
    span: '2017 — 2018',
    orgs: { en: 'Tsinghua IIIS', zh: '清华交叉信息院' },
  },
  {
    key: 'medical-ai',
    name: { en: 'Medical AI', zh: '医疗 AI' },
    scope: { en: 'Pathology imaging, spatial omics, prognostic risk stratification.', zh: '病理图像、时空组学、预后风险分层。' },
    span: '2018 — 2023',
    orgs: { en: 'Jiyuan · BGI · Fapon', zh: '极元 / 华大 / 菲鹏' },
  },
  {
    key: 'llm-products',
    name: { en: 'LLM Products', zh: '大模型产品' },
    scope: { en: 'Medical RAG, multimodal agents, child-content safety.', zh: '医疗 RAG、多模态智能体、儿童内容安全。' },
    span: '2023 — 2025',
    orgs: { en: 'Jiyuan · Qudian', zh: '极元 / 趣店' },
  },
  {
    key: 'agent-systems',
    name: { en: 'Agent Systems', zh: '智能体系统' },
    scope: { en: 'Core-AI durable workflows and platform delivery.', zh: 'Core-AI 持久化工作流与平台交付。' },
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
  { year: { en: 'Now', zh: '现在' }, org: { en: 'ChanceTop', zh: '畅拓科技' }, role: { en: 'AI Platform Engineer', zh: 'AI 平台研发工程师' }, field: 'agent-systems' },
];
