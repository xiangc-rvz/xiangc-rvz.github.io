import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://www.helenazhang.com';
const OUT = join(__dirname, '..', 'public');

const assets = [
  // Images
  '/images/avatar-1-1@2x.png',
  '/images/article-7-principles-16-9@2x.png',
  '/images/article-3-classic-16-9@2x.png',
  '/images/article-icon-grids-16-9@2x.png',
  '/images/article-foundations-16-9@2x.png',
  '/images/design-phosphor-2-1@2x.png',
  '/images/design-tri-2-1@2x.png',
  '/images/design-waze-3-2@2x.png',
  '/images/design-paypal-3-2@2x.png',
  '/images/design-soulcycle-1-1@2x.png',
  '/images/design-phosphor-android-2-1@2x.png',
  '/images/design-prolific-1-1@2x.png',
  '/images/phosphor-for-android-6-1@2x.png',
  '/images/dribbble-stop-asian-hate-16-9@2x.png',
  '/images/dribbble-numbers-16-9@2x.png',
  '/images/dribbble-bunnimoji-16-9@2x.png',
  // Icons
  '/icons/article-medium.svg',
  '/icons/arrow-circle-up-right-fill.svg',
  '/icons/pen-nib.svg',
  '/icons/dribbble-logo.svg',
  // Fonts
  '/fonts/CooperBTLight.woff2',
  '/fonts/CooperBTLight.woff',
  '/fonts/MaisonNeueWEB-Mono.woff2',
  '/fonts/MaisonNeueWEB-Mono.woff',
  // Favicons
  '/favicon.ico',
  '/icons/favicon/apple-touch-icon.png',
  '/icons/favicon/favicon-32x32.png',
  '/icons/favicon/favicon-16x16.png',
];

async function download(path) {
  const url = BASE + path;
  const outPath = join(OUT, path);
  mkdirSync(dirname(outPath), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) { console.error(`SKIP ${path} (${res.status})`); return; }
    const buf = await res.arrayBuffer();
    writeFileSync(outPath, Buffer.from(buf));
    console.log(`OK   ${path}`);
  } catch (e) {
    console.error(`ERR  ${path}: ${e.message}`);
  }
}

// Download in batches of 4
for (let i = 0; i < assets.length; i += 4) {
  await Promise.all(assets.slice(i, i + 4).map(download));
}
console.log('Done.');
