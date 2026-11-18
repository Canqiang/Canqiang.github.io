import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDirectory = new URL('../public/', import.meta.url);
const workstationPath = fileURLToPath(new URL('../src/assets/nes-workstation.png', import.meta.url));
const navy = '#151728';
const ivory = '#fff5dc';
const amber = '#ffd36c';
const teal = '#83e1d5';

// Five-column bitmap capitals keep the generated art independent of system fonts.
// Each hex value is one horizontal row, with the leftmost pixel in bit 4.
const glyphs = {
  A: '0e 11 11 1f 11 11 11', B: '1e 11 11 1e 11 11 1e',
  C: '0f 10 10 10 10 10 0f', D: '1e 11 11 11 11 11 1e',
  E: '1f 10 10 1e 10 10 1f', F: '1f 10 10 1e 10 10 10',
  G: '0f 10 10 17 11 11 0f', H: '11 11 11 1f 11 11 11',
  I: '1f 04 04 04 04 04 1f', J: '01 01 01 01 11 11 0e',
  K: '11 12 14 18 14 12 11', L: '10 10 10 10 10 10 1f',
  M: '11 1b 15 15 11 11 11', N: '11 19 19 15 13 13 11',
  O: '0e 11 11 11 11 11 0e', P: '1e 11 11 1e 10 10 10',
  Q: '0e 11 11 11 15 12 0d', R: '1e 11 11 1e 14 12 11',
  S: '0f 10 10 0e 01 01 1e', T: '1f 04 04 04 04 04 04',
  U: '11 11 11 11 11 11 0e', V: '11 11 11 11 11 0a 04',
  W: '11 11 11 15 15 1b 11', X: '11 11 0a 04 0a 11 11',
  Y: '11 11 0a 04 04 04 04', Z: '1f 01 02 04 08 10 1f',
  '.': '00 00 00 00 00 00 04', '-': '00 00 00 1f 00 00 00',
};

function lettering(text, x, y, scale, color) {
  const pixels = [];
  for (const [index, char] of Array.from(text).entries()) {
    if (char === ' ') continue;
    const rows = glyphs[char].split(' ');
    for (const [row, hex] of rows.entries()) {
      const bits = Number.parseInt(hex, 16);
      for (let column = 0; column < 5; column++) {
        if (bits & (1 << (4 - column))) pixels.push(`M${index * 6 + column} ${row}h1v1h-1z`);
      }
    }
  }
  return `<path transform="translate(${x} ${y}) scale(${scale})" d="${pixels.join('')}" fill="${color}"/>`;
}

const gamepad = `
  <path d="M2 0h30v2h2v16h-2v2H2v-2H0V2h2z" fill="#73c5ba"/>
  <path d="M2 0h30v2h2v13h-2v2H2v-2H0V2h2z" fill="#f4e9c7"/>
  <path d="M2 0h30v2H2z" fill="#fff6db"/>
  <path d="M8 5h3v3h3v3h-3v3H8v-3H5V8h3z" fill="#22263c"/>
  <path d="M20 9h4v4h-4zM26 7h4v4h-4z" fill="#bd4051"/>`;

function svg(width, height, contents) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" shape-rendering="crispEdges">${contents}</svg>`);
}

async function writeCard(filename, titleBlock, art) {
  const image = await art.resize(480, 360, {kernel: sharp.kernel.nearest}).png().toBuffer();
  const background = svg(1200, 630, `
    <rect width="1200" height="630" fill="${navy}"/>
    <g transform="translate(64 44) scale(2)">${gamepad}</g>
    ${lettering('XANDER XU', 156, 50, 4, ivory)}
    <path d="M64 106h1072v4H64zM64 524h1072v4H64z" fill="#515470"/>
    ${titleBlock}
    <rect x="646" y="132" width="494" height="374" fill="#0b0c19"/>
    <rect x="640" y="126" width="496" height="376" fill="#515470"/>
    ${lettering('CANQIANG.GITHUB.IO', 64, 554, 3, teal)}
  `);
  const output = fileURLToPath(new URL('og/' + filename, publicDirectory));
  await sharp(background).composite([{input: image, left: 648, top: 134}]).png().toFile(output);
}

await mkdir(new URL('og/', publicDirectory), {recursive: true});
await Promise.all([
  writeCard('home.png', [
    lettering('AI ENGINEER', 64, 154, 3, amber),
    lettering('FROM ALGORITHMS', 64, 220, 6, ivory),
    lettering('TO AGENT', 64, 296, 6, ivory),
    lettering('RUNTIMES.', 64, 372, 6, ivory),
  ].join(''), sharp(workstationPath)),
  writeCard('core-ai.png', [
    lettering('CORE CONTRIBUTOR', 64, 154, 3, amber),
    lettering('CORE-AI', 64, 224, 11, ivory),
    lettering('OPEN-SOURCE AGENT', 64, 350, 4, teal),
    lettering('FRAMEWORK', 64, 398, 4, teal),
  ].join(''), sharp(workstationPath).extract({left: 32, top: 25, width: 132, height: 99})),
  sharp(svg(64, 64, `
    <rect width="64" height="64" fill="${navy}"/>
    <g transform="translate(6.5 17) scale(1.5)">${gamepad}</g>
  `)).png().toFile(fileURLToPath(new URL('favicon.png', publicDirectory))),
]);

console.log('Generated public/og/home.png, public/og/core-ai.png, and public/favicon.png.');
