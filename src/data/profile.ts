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

interface PublicAchievement {
  checkedOn: string;
  title: Localized;
  metric: Localized;
  detail: Localized;
  href: string;
  work?: { label: Localized; href: string };
}

export const publicAchievements: PublicAchievement[] = [
  {
    checkedOn: '2026-10-29',
    title: { en: 'Kaggle Notebooks Master', zh: 'Kaggle Notebooks Master（代码赛道）' },
    metric: { en: '6 gold · 4 silver notebook medals', zh: '代码奖牌 6 金 · 4 银' },
    detail: {
      en: 'Competitions Expert with 2 silver and 5 bronze medals, including NeuroGolf silver (63/2,963), Orbit Wars silver (112/4,729), AIMO3 and AI Agent Security bronze.',
      zh: '竞赛等级为 Competitions Expert，另获 2 银 5 铜，含 NeuroGolf 银牌（63/2,963）、Orbit Wars 银牌（112/4,729）、AIMO3 与 AI Agent Security 铜牌。',
    },
    href: 'https://www.kaggle.com/canqiang',
  },
  {
    // Bilibili public APIs: x/relation/stat (UID 255230761) and x/web-interface/view.
    checkedOn: '2026-11-18',
    title: { en: '过拟合青年 · Bilibili', zh: 'B 站「过拟合青年」' },
    metric: { en: '24,584 followers', zh: '24,584 名粉丝' },
    detail: {
      en: 'Creates animated explanations of neural networks, Transformers, and LLM inference systems.',
      zh: '通过动画讲解神经网络、Transformer 与大模型推理系统。',
    },
    href: 'https://space.bilibili.com/255230761',
    work: {
      label: {
        en: 'Transformer explainer: 158,221 views · 12,177 saves',
        zh: 'Transformer 代表作：158,221 次播放 · 12,177 次收藏',
      },
      href: 'https://www.bilibili.com/video/BV1A4XWBqEhW',
    },
  },
];
