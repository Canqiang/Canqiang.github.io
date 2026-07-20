import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const restrictedTokenHashes = new Set([
  'b84d68d5eb22a2208a1d7e0923f7a1262bdb123ba0e17c18e0350c71ba06a1b1',
  '39c6dc09f59c30fa3621be2ac26a2679713f1efa85bc338b578f2b4f3e42caab',
  'c8de739e14c97e09b289ed9fa17f9fb4ff834cb40c90ba9f8fb3ed0939b69572',
  '737c149aaaab953354c776e1d47e32790da0a8e06e0c3e5364c36a5b2fbc8589',
  'aeb02163299aa716e7854b9f23f99a72c482f0ee7a6cb8b22f1f9e7170d23400',
]);

const joined = (...parts) => parts.join('');
const rules = [
  { name: 'private phone number', pattern: /\b1[3-9](?:[ \t-]*[0-9]){9}\b/giu },
  {
    name: 'internal environment identifier',
    pattern: new RegExp(`\\b(?:${['dev', 'uat', 'prod'].join('|')})-${joined('a', 'i')}\\b`, 'giu'),
  },
  {
    name: 'credential-like label',
    pattern: new RegExp(`\\b(?:${joined('a', 'p', 'i')}[_-]?${joined('k', 'e', 'y')}|${joined('pass', 'word')})\\b`, 'giu'),
  },
  {
    name: 'sole-authorship overclaim',
    pattern: new RegExp(`\\b(?:${joined('sole', '\\s+', 'author')}|${joined('built', '\\s+', 'alone')})\\b|${joined('独立', '开发', '全部')}`, 'giu'),
  },
];

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

function lineNumber(text, index) {
  return text.slice(0, index).split('\n').length;
}

export function tokenHash(token) {
  return createHash('sha256').update(token.toLowerCase()).digest('hex');
}

export function scanText(text, hashes = restrictedTokenHashes) {
  const findings = [];
  for (const { name, pattern } of rules) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      findings.push({ index: match.index, name });
    }
  }

  for (const match of text.matchAll(/[A-Za-z][A-Za-z0-9_-]{2,}/g)) {
    const candidates = new Set([match[0], ...match[0].split(/[-_]/).filter(Boolean)]);
    if ([...candidates].some((candidate) => hashes.has(tokenHash(candidate)))) {
      findings.push({ index: match.index, name: 'restricted internal identifier' });
    }
  }

  return findings;
}

async function main() {
  const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root })
    .toString()
    .split('\0')
    .filter(Boolean)
    .map((path) => resolve(root, path));
  const distRoot = resolve(root, 'dist');
  let distFiles = [];
  try {
    distFiles = await walk(distRoot);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  const files = [...new Set([...tracked, ...distFiles])];
  const findings = [];

  for (const path of files) {
    const buffer = await readFile(path);
    if (buffer.includes(0)) continue;

    const text = buffer.toString('utf8');
    const displayPath = relative(root, path);
    for (const finding of scanText(text)) {
      findings.push(`${displayPath}:${lineNumber(text, finding.index)}:${finding.name}`);
    }
  }

  if (findings.length > 0) {
    console.error('Public-safety scan failed:');
    for (const finding of findings) console.error(`- ${finding}`);
    process.exitCode = 1;
  } else {
    const distCount = files.filter((path) => path.startsWith(`${distRoot}/`)).length;
    console.log(`Public-safety scan passed (${files.length - distCount} tracked files, ${distCount} generated files).`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
