import { describe, expect, it } from 'vitest';
import { fieldCards, careerAxis } from '../../src/data/site';

describe('fieldCards', () => {
  it('covers the four career fields in order with bilingual scope + orgs', () => {
    expect(fieldCards.map((c) => c.key)).toEqual([
      'bioinformatics', 'medical-ai', 'llm-products', 'agent-systems',
    ]);
    for (const card of fieldCards) {
      expect(card.name.en && card.name.zh).toBeTruthy();
      expect(card.scope.en && card.scope.zh).toBeTruthy();
      expect(card.orgs.en && card.orgs.zh).toBeTruthy();
      expect(card.span).toMatch(/\d{4}/);
    }
  });
});

describe('careerAxis', () => {
  it('lists chronological stops with year, org, role, and a field anchor', () => {
    expect(careerAxis.length).toBeGreaterThanOrEqual(4);
    for (const stop of careerAxis) {
      expect(stop.year.en && stop.year.zh).toBeTruthy();
      expect(stop.org.en && stop.org.zh).toBeTruthy();
      expect(stop.role.en && stop.role.zh).toBeTruthy();
      expect(['bioinformatics', 'medical-ai', 'llm-products', 'agent-systems']).toContain(stop.field);
    }
  });
});
