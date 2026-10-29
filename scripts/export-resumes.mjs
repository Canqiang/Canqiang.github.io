import { mkdir, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Use an installed Playwright package or the caller's bundled authoring runtime.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('..', import.meta.url));
const baseUrl = process.env.RESUME_PREVIEW_URL || 'http://127.0.0.1:4321';
const output = resolve(root, 'output/pdf');
const publicOutput = resolve(root, 'public/resumes');
await mkdir(output, { recursive: true });
await mkdir(publicOutput, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: process.env.RESUME_BROWSER_CHANNEL || 'chrome' });
try {
  for (const locale of ['zh', 'en']) {
    for (const variant of ['systems', 'algorithms']) {
      const route = `${locale === 'zh' ? '/zh' : ''}/resume/${variant === 'algorithms' ? 'algorithms/' : ''}`;
      const page = await browser.newPage();
      const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: 'networkidle' });
      if (!response?.ok()) throw new Error(`Cannot export ${route}: HTTP ${response?.status()}`);
      await page.evaluate(() => document.fonts.ready);
      const renderedVariant = await page.locator('[data-resume-variant]').getAttribute('data-resume-variant');
      if (renderedVariant !== variant) throw new Error(`Unexpected résumé variant at ${route}`);
      const path = resolve(output, `Xander-Xu-AI-${variant}-${locale}.pdf`);
      const label = variant === 'systems' ? 'AI Systems' : 'Algorithm R&D';
      await page.pdf({
        path, format: 'A4', printBackground: true, preferCSSPageSize: true,
        displayHeaderFooter: true, headerTemplate: '<span></span>',
        footerTemplate: `<div style="font-size:8px;color:#666;width:100%;margin:0 14mm;display:flex;justify-content:space-between"><span>Xander Xu | ${label}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
      });
      await copyFile(path, resolve(publicOutput, `xander-xu-ai-${variant}-${locale}.pdf`));
      console.log(`Exported ${route} -> ${path}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
