import { describe, expect, it } from 'vitest';
import {
  validateProjectRoutePairs,
  type ProjectRouteEntry,
} from '../../src/content/project-routes';

function entry(
  translationKey: string,
  locale: 'en' | 'zh',
  draft = false,
): ProjectRouteEntry {
  return { data: { translationKey, locale, draft } };
}

describe('project route pairing', () => {
  it('accepts exactly one English and Chinese entry per translation key', () => {
    expect(() => validateProjectRoutePairs([
      entry('core-ai', 'en'),
      entry('core-ai', 'zh'),
      entry('medical-ai', 'en'),
      entry('medical-ai', 'zh'),
    ])).not.toThrow();
  });

  it('rejects a translation key missing either locale', () => {
    expect(() => validateProjectRoutePairs([entry('core-ai', 'en')]))
      .toThrow('Project route "core-ai" requires both en and zh entries (missing zh)');
  });

  it('rejects duplicate locale routes for one translation key', () => {
    expect(() => validateProjectRoutePairs([
      entry('core-ai', 'en'),
      entry('core-ai', 'en'),
      entry('core-ai', 'zh'),
    ])).toThrow('Duplicate en project route: core-ai');
  });

  it('rejects translation keys that are not valid route slugs', () => {
    expect(() => validateProjectRoutePairs([
      entry('Core AI', 'en'),
      entry('Core AI', 'zh'),
    ])).toThrow('project routes require a lowercase kebab-case slug');
  });

  it('does not require locale pairs for drafts', () => {
    expect(() => validateProjectRoutePairs([
      entry('core-ai', 'en'),
      entry('core-ai', 'zh'),
      entry('future-note', 'en', true),
    ])).not.toThrow();
  });
});
