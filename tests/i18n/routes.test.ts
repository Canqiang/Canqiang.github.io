import { describe, expect, it } from 'vitest';
import { alternateLocalePath, localizedPath } from '../../src/i18n/routes';

describe('localizedPath', () => {
  it('keeps English at the root and Chinese under /zh', () => {
    expect(localizedPath('en', 'home')).toBe('/');
    expect(localizedPath('zh', 'home')).toBe('/zh/');
    expect(localizedPath('en', 'resume')).toBe('/resume/');
    expect(localizedPath('zh', 'resume')).toBe('/zh/resume/');
  });

  it('preserves project context across locales', () => {
    expect(localizedPath('en', 'project', 'core-ai')).toBe('/projects/core-ai/');
    expect(localizedPath('zh', 'project', 'core-ai')).toBe('/zh/projects/core-ai/');
  });

  it('requires a project slug', () => {
    expect(() => localizedPath('en', 'project')).toThrow('project routes require a slug');
  });

  it.each(['../resume', 'a/b', 'Core-AI', '-core-ai', 'core-ai-', ''])(
    'rejects invalid project slug %j',
    (slug) => {
      expect(() => localizedPath('en', 'project', slug)).toThrow(
        'project routes require a lowercase kebab-case slug',
      );
    },
  );
});

describe('alternateLocalePath', () => {
  it.each([
    ['/', '/zh/'],
    ['/zh/', '/'],
    ['/resume/', '/zh/resume/'],
    ['/zh/projects/core-ai/', '/projects/core-ai/'],
  ])('maps %s to %s', (input, expected) => {
    expect(alternateLocalePath(input)).toBe(expected);
  });
});
