import type { Locale } from './config';

export type RouteKey = 'home' | 'projects' | 'project' | 'resume';

const fixedRoutes: Record<Exclude<RouteKey, 'project'>, Record<Locale, string>> = {
  home: { en: '/', zh: '/zh/' },
  projects: { en: '/projects/', zh: '/zh/projects/' },
  resume: { en: '/resume/', zh: '/zh/resume/' },
};

const projectSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function localizedPath(locale: Locale, key: RouteKey, slug?: string): string {
  if (key !== 'project') return fixedRoutes[key][locale];
  if (slug === undefined) throw new Error('project routes require a slug');
  if (!projectSlugPattern.test(slug)) {
    throw new Error('project routes require a lowercase kebab-case slug');
  }
  return locale === 'en' ? `/projects/${slug}/` : `/zh/projects/${slug}/`;
}

export function alternateLocalePath(pathname: string): string {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (normalized === '/zh/') return '/';
  if (normalized.startsWith('/zh/')) return normalized.replace(/^\/zh/, '');
  return normalized === '/' ? '/zh/' : `/zh${normalized}`;
}
