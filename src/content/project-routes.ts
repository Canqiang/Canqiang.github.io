import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/config';
import { localizedPath } from '../i18n/routes';

export interface ProjectRouteEntry {
  data: {
    translationKey: string;
    locale: Locale;
    draft: boolean;
  };
}

export function validateProjectRoutePairs(entries: readonly ProjectRouteEntry[]): void {
  const pairs = new Map<string, Set<Locale>>();

  for (const entry of entries.filter(({ data }) => !data.draft)) {
    const { translationKey, locale } = entry.data;
    localizedPath(locale, 'project', translationKey);

    const locales = pairs.get(translationKey) ?? new Set<Locale>();
    if (locales.has(locale)) {
      throw new Error(`Duplicate ${locale} project route: ${translationKey}`);
    }
    locales.add(locale);
    pairs.set(translationKey, locales);
  }

  for (const [translationKey, locales] of pairs) {
    const missing = (['en', 'zh'] as const).filter((locale) => !locales.has(locale));
    if (missing.length > 0) {
      throw new Error(
        `Project route "${translationKey}" requires both en and zh entries (missing ${missing.join(', ')})`,
      );
    }
  }
}

export async function getProjectStaticPaths(locale: Locale) {
  const { getCollection } = await import('astro:content');
  const projects = await getCollection('projects');
  validateProjectRoutePairs(projects);

  return projects
    .filter(({ data }) => data.locale === locale && !data.draft)
    .sort((left, right) => (
      left.data.order - right.data.order ||
      left.data.translationKey.localeCompare(right.data.translationKey)
    ))
    .map((project: CollectionEntry<'projects'>) => ({
      params: { slug: project.data.translationKey },
      props: { project },
    }));
}
