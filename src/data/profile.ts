import type { Locale } from '../i18n/config';

type Localized = Record<Locale, string>;

export interface Education {
  institution: Localized;
  degree: Localized;
  period: string;
}

export const education: Education = {
  institution: { en: 'Fujian Medical University', zh: '福建医科大学' },
  degree: { en: 'BSc in Bioinformatics', zh: '生物信息学学士' },
  period: '2013 — 2017',
};

export const interests: Localized[] = [
  { en: 'Ball sports', zh: '球类运动' },
  { en: 'Board and chess games', zh: '棋牌类游戏' },
  { en: 'Computer games', zh: '电脑游戏' },
];
