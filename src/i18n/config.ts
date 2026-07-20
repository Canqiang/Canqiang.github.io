export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const localeMeta = {
  en: { lang: 'en', hreflang: 'en', label: 'EN', switchLabel: '中文' },
  zh: { lang: 'zh-CN', hreflang: 'zh-CN', label: '中文', switchLabel: 'EN' },
} as const;
