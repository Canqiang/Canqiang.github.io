import type { Locale } from '../i18n/config';

type Localized = Record<Locale, string>;

export type AchievementGroupKey = 'publications' | 'patents' | 'openSource' | 'competitions';

export interface AchievementItem {
  title: Localized;
  detail: Localized;
  href?: string;
}

export interface AchievementGroup {
  key: AchievementGroupKey;
  label: Localized;
  items: AchievementItem[];
}

export const publications: AchievementGroup = {
  key: 'publications',
  label: { en: 'Publications', zh: '论文' },
  items: [
    {
      title: {
        en: 'Ratio of the interferon-γ signature to the immunosuppression signature predicts anti-PD-1 therapy response in melanoma',
        zh: '干扰素-γ 特征与免疫抑制特征之比预测黑色素瘤 anti-PD-1 治疗响应',
      },
      detail: { en: 'npj Genomic Medicine 6, 7 (2021) · Co-first author', zh: 'npj Genomic Medicine 6, 7（2021）· 共同第一作者' },
      href: 'https://doi.org/10.1038/s41525-021-00169-w',
    },
    {
      title: {
        en: 'A machine learning framework to determine geolocations from metagenomic profiling',
        zh: '基于微生物宏基因组特征确定地理位置的机器学习框架',
      },
      detail: { en: 'Biology Direct 15, 27 (2020) · Co-first author', zh: 'Biology Direct 15, 27（2020）· 共同第一作者' },
      href: 'https://doi.org/10.1186/s13062-020-00278-z',
    },
    {
      title: {
        en: 'Inconsistent prediction capability of ImmuneCells.Sig across different RNA-seq datasets',
        zh: 'ImmuneCells.Sig 在不同 RNA-seq 数据集上的预测能力不一致',
      },
      detail: { en: 'Nature Communications 12, 4167 (2021) · Co-author', zh: 'Nature Communications 12, 4167（2021）· 共同作者' },
      href: 'https://doi.org/10.1038/s41467-021-24303-5',
    },
  ],
};

export const patents: AchievementGroup = {
  key: 'patents',
  label: { en: 'Patents', zh: '专利' },
  items: [
    {
      title: {
        en: 'Method for geolocating an unknown sample through microbial metagenomics',
        zh: '一种通过微生物宏基因组对未知样本进行地理定位的方法',
      },
      detail: { en: 'Chinese invention patent application · CN110827915A', zh: '中国发明专利申请 · CN110827915A' },
      href: 'https://patents.google.com/patent/CN110827915A/zh',
    },
    {
      title: {
        en: 'GMM-based algorithm for Stereo-seq data bias correction',
        zh: '基于高斯混合模型的 Stereo-seq 数据偏差校正算法',
      },
      detail: {
        en: 'PCT application · WO2024000313A1 / PCT/CN2022/102505',
        zh: 'PCT 专利申请 · WO2024000313A1 / PCT/CN2022/102505',
      },
      href: 'https://patents.google.com/patent/WO2024000313A1/zh',
    },
    {
      title: {
        en: 'Multi-modal transfer learning framework for predicting the efficacy of tumor immune checkpoint inhibitors',
        zh: '用于肿瘤免疫检查点抑制剂疗效预测的多模态迁移学习框架',
      },
      detail: { en: 'Chinese invention patent application · CN112634985A', zh: '中国发明专利申请 · CN112634985A' },
      href: 'https://patents.google.com/patent/CN112634985A/zh',
    },
  ],
};

export const openSource: AchievementGroup = {
  key: 'openSource',
  label: { en: 'Open source', zh: '开源' },
  items: [
    {
      title: { en: 'Core-AI', zh: 'Core-AI' },
      detail: {
        en: 'A team-built open-source AI Agent framework; Xander contributes across durable workflows, model integration, observability, sandbox recovery, and end-to-end platform delivery.',
        zh: '由团队共同建设的开源 AI Agent 框架；许灿强作为贡献者参与持久化工作流、模型集成、可观测性、沙箱恢复与端到端平台交付。',
      },
      href: 'https://github.com/chancetop-com/core-ai',
    },
  ],
};

export const competitions: AchievementGroup = {
  key: 'competitions',
  label: { en: 'Competitions', zh: '竞赛' },
  items: [
    {
      title: { en: 'Prostate cANcer graDe Assessment (PANDA) Challenge', zh: '前列腺癌分级评估（PANDA）挑战赛' },
      detail: { en: 'Kaggle · Rank 62 of 1,010', zh: 'Kaggle · 1,010 支队伍中排名第 62' },
      href: 'https://www.kaggle.com/canqiang',
    },
    {
      title: {
        en: 'Brain Cancer Predictive Modeling and Biomarker Discovery Challenge',
        zh: '脑癌预测建模与生物标志物发现挑战赛',
      },
      detail: {
        en: 'PrecisionFDA and Georgetown ICBI · Member of the fourth-place team',
        zh: 'PrecisionFDA 与 Georgetown ICBI · 第四名团队成员',
      },
      href: 'https://precision.fda.gov/challenges/8/results',
    },
  ],
};

export const achievementGroups: AchievementGroup[] = [publications, patents, openSource, competitions];
