import type { ImageMetadata } from 'astro';
import appliedAiProducts from '../assets/projects/applied-ai-products-editorial.webp';
import competitions from '../assets/projects/competitions-editorial.webp';
import coreAi from '../assets/projects/core-ai-editorial.webp';
import medicalAi from '../assets/projects/medical-ai-editorial.webp';
import research from '../assets/projects/research-editorial.webp';

export interface ProjectVisual {
  image: ImageMetadata;
}

export const projectVisuals = {
  'core-ai': { image: coreAi },
  'applied-ai-products': { image: appliedAiProducts },
  'medical-ai': { image: medicalAi },
  'research': { image: research },
  'competitions': { image: competitions },
} as const satisfies Record<string, ProjectVisual>;

export function getProjectVisual(translationKey: string): ProjectVisual | undefined {
  return projectVisuals[translationKey as keyof typeof projectVisuals];
}
