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
