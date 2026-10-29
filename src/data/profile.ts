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

// Public profile snapshot, checked against Kaggle and Bilibili on this date.
export const profileUpdatedAt = '2026-10-29';
export const profileUpdatedLabel: Localized = { en: '29 Oct 2026', zh: '2026 年 10 月 29 日' };

interface PublicAchievement {
  title: Localized;
  metric: Localized;
  detail: Localized;
  href: string;
  work?: { label: Localized; href: string };
}

export const publicAchievements: PublicAchievement[] = [
  {
    title: { en: 'Kaggle Notebooks Master', zh: 'Kaggle Notebooks Master（代码赛道）' },
    metric: { en: '6 gold · 4 silver notebook medals', zh: '代码奖牌 6 金 · 4 银' },
    detail: {
      en: 'Competitions Expert, with a further 2 silver and 5 bronze competition medals across modeling and agent challenges.',
      zh: '竞赛等级为 Competitions Expert，另获 2 银 5 铜竞赛奖牌，覆盖建模与智能体挑战。',
    },
    href: 'https://www.kaggle.com/canqiang',
  },
  {
    title: { en: '过拟合青年 · Bilibili', zh: 'B 站「过拟合青年」' },
    metric: { en: '24,091 followers', zh: '24,091 名粉丝（2.4 万）' },
    detail: {
      en: 'Creates animated explanations of neural networks, Transformers, and LLM inference systems.',
      zh: '通过动画讲解神经网络、Transformer 与大模型推理系统。',
    },
    href: 'https://space.bilibili.com/255230761',
    work: {
      label: {
        en: 'Transformer explainer: 157,527 views · 12,152 saves',
        zh: 'Transformer 代表作：157,527 次播放 · 12,152 次收藏',
      },
      href: 'https://www.bilibili.com/video/BV1A4XWBqEhW',
    },
  },
];
