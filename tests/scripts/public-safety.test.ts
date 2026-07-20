import { describe, expect, it } from 'vitest';
import { scanText, tokenHash } from '../../scripts/scan-public-safety.mjs';

const findingNames = (text: string, hashes?: Set<string>) => scanText(text, hashes).map(({ name }) => name);

describe('public-safety scanner', () => {
  it.each(['', ' ', '-'])('detects private phone numbers separated with %j', (separator) => {
    const phone = ['138', '1234', '5678'].join(separator);
    expect(findingNames(phone)).toContain('private phone number');
  });

  it('detects restricted identifiers when they are embedded in config-style names', () => {
    const restricted = 'secretmarker';
    const hashes = new Set([tokenHash(restricted)]);

    expect(findingNames(`${restricted}-service ${restricted}_URL`, hashes))
      .toEqual(['restricted internal identifier', 'restricted internal identifier']);
  });

  it('detects constructed credential labels and overclaims', () => {
    const credential = ['a', 'p', 'i', '_', 'key'].join('');
    const overclaim = ['built', ' ', 'alone'].join('');

    expect(findingNames(`${credential} ${overclaim}`))
      .toEqual(['credential-like label', 'sole-authorship overclaim']);
  });

  it('does not flag ordinary public portfolio prose', () => {
    expect(findingNames('Team-built open-source agent framework with public documentation.')).toEqual([]);
  });
});
