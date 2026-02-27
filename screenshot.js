const puppeteer = require('puppeteer');
const path = require('path');

const URL = 'http://localhost:3000';
const OUT = path.join(__dirname, '_screenshots');

const SCROLL_POSITIONS = [
  { name: '01-hero', scroll: 0 },
  { name: '02-video1-entering', scrollVh: 50 },
  { name: '03-video1-frontal', scrollVh: 120 },
  { name: '04-video1-exit-video2-enter', scrollVh: 250 },
  { name: '05-video2-frontal', scrollVh: 400 },
];

(async () => {
  const fs = require('fs');
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // Wait for videos to load
  await new Promise(r => setTimeout(r, 1000));

  for (const pos of SCROLL_POSITIONS) {
    const scrollPx = pos.scroll ?? Math.round((pos.scrollVh / 100) * 900);
    await page.evaluate(y => window.scrollTo(0, y), scrollPx);
    // Let lerp animation settle
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(OUT, `${pos.name}.png`),
      fullPage: false,
    });
    console.log(`✓ ${pos.name} (scroll: ${scrollPx}px)`);
  }

  await browser.close();
  console.log(`\nDone — screenshots in _screenshots/`);
})();
