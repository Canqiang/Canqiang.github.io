import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const outputDirectory = fileURLToPath(new URL('../public/og/', import.meta.url));
const faviconPath = fileURLToPath(new URL('../public/favicon.png', import.meta.url));
const displayFontPath = fileURLToPath(new URL(
  '../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-800-normal.woff2',
  import.meta.url,
));
const monoFontPath = fileURLToPath(new URL(
  '../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-600-normal.woff2',
  import.meta.url,
));

const [displayFont, monoFont] = await Promise.all([
  readFile(displayFontPath, 'base64'),
  readFile(monoFontPath, 'base64'),
]);

const colors = {
  paper: '#f1f4f8',
  carbon: '#111318',
  blue: '#2456e8',
  graphite: '#687080',
};

function cardSvg({ label, lines, index }) {
  const title = lines
    .map((line, lineIndex) => (
      `<tspan x="64" dy="${lineIndex === 0 ? 0 : 88}">${line}</tspan>`
    ))
    .join('');

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <style>
        @font-face {
          font-family: 'Barlow Embedded';
          src: url(data:font/woff2;base64,${displayFont}) format('woff2');
          font-weight: 800;
        }
        @font-face {
          font-family: 'Plex Mono Embedded';
          src: url(data:font/woff2;base64,${monoFont}) format('woff2');
          font-weight: 600;
        }
        .display { font-family: 'Barlow Embedded', sans-serif; font-weight: 800; }
        .mono { font-family: 'Plex Mono Embedded', monospace; font-weight: 600; }
      </style>
      <rect width="1200" height="630" fill="${colors.paper}"/>
      <rect x="64" y="58" width="1072" height="2" fill="${colors.carbon}"/>
      <rect x="64" y="82" width="14" height="14" fill="${colors.blue}"/>
      <text x="94" y="96" class="mono" font-size="20" letter-spacing="1.6" fill="${colors.blue}">${label}</text>
      <text x="64" y="210" class="display" font-size="96" letter-spacing="-1.5" fill="${colors.carbon}">${title}</text>
      <rect x="64" y="536" width="1072" height="2" fill="${colors.carbon}"/>
      <text x="64" y="580" class="mono" font-size="18" letter-spacing="1.2" fill="${colors.graphite}">CANQIANG.GITHUB.IO / TECHNICAL FIELD NOTES</text>
      <text x="1090" y="580" class="mono" font-size="18" text-anchor="end" fill="${colors.blue}">${index}</text>
    </svg>
  `);
}

async function writeCard(filename, config) {
  await sharp(cardSvg(config), { density: 144 })
    .resize(1200, 630, { fit: 'fill' })
    .png({ compressionLevel: 9, adaptiveFiltering: false, palette: false })
    .toFile(fileURLToPath(new URL(filename, new URL('../public/og/', import.meta.url))));
}

const faviconSvg = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="${colors.blue}"/>
    <path d="M13 14 L36 50 M36 14 L13 50" stroke="${colors.carbon}" stroke-width="7" stroke-linecap="square"/>
    <path d="M50 11 L38 53" stroke="${colors.carbon}" stroke-width="6" stroke-linecap="square"/>
  </svg>
`);

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeCard('home.png', {
    label: 'XANDER XU',
    lines: ['MODELS ARE ONLY', 'USEFUL WHEN THEY', 'SHIP.'],
    index: '01 / 02',
  }),
  writeCard('core-ai.png', {
    label: 'CORE-AI',
    lines: ['OPEN-SOURCE AI', 'AGENT FRAMEWORK'],
    index: '02 / 02',
  }),
  sharp(faviconSvg)
    .png({ compressionLevel: 9, adaptiveFiltering: false, palette: false })
    .toFile(faviconPath),
]);

console.log('Generated public/og/home.png, public/og/core-ai.png, and public/favicon.png.');
