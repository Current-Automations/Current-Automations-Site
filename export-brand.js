// Export brand assets as PNG files.
//
// First run once:
//   npm install puppeteer --no-save
//
// Then:
//   node export-brand.js

const path = require("path");
const fs   = require("fs");

async function main() {
  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch {
    console.error("Puppeteer not found. Run this first:\n\n  npm install puppeteer --no-save\n");
    process.exit(1);
  }

  const browser = await puppeteer.launch();
  const page    = await browser.newPage();

  const publicDir = path.join(__dirname, "public");
  const outDir    = path.join(__dirname, "brand-exports");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  // ── LinkedIn banner (1584 × 396) ────────────────────
  await page.setViewport({ width: 1584, height: 396, deviceScaleFactor: 2 });
  await page.goto("file://" + path.join(publicDir, "linkedin-banner.html"));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(outDir, "linkedin-banner.png"),
    clip: { x: 0, y: 0, width: 1584, height: 396 },
  });
  console.log("Saved: brand-exports/linkedin-banner.png");

  // ── Logo lockup sheet (full page) ───────────────────
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });
  await page.goto("file://" + path.join(publicDir, "logo-lockup.html"));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, "logo-lockup.png"), fullPage: true });
  console.log("Saved: brand-exports/logo-lockup.png");

  // ── Individual lockups (full page) ──────────────────
  const lockups = [
    "lockup-primary-dark",
    "lockup-stacked",
    "lockup-compact",
    "lockup-on-light",
    "lockup-with-descriptor",
  ];
  for (const name of lockups) {
    await page.goto("file://" + path.join(publicDir, `${name}.html`));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true });
    console.log(`Saved: brand-exports/${name}.png`);
  }

  // ── Banners (full page) ──────────────────────────────
  const banners = ["banner-A-hero", "banner-B-centered", "banner-C-split"];
  for (const name of banners) {
    await page.goto("file://" + path.join(publicDir, `${name}.html`));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true });
    console.log(`Saved: brand-exports/${name}.png`);
  }

  // ── Reference sheets (full page) ────────────────────
  const refs = ["Color palette", "Typography", "Icon at small sizes"];
  for (const name of refs) {
    await page.goto("file://" + path.join(publicDir, `${name}.html`));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true });
    console.log(`Saved: brand-exports/${name}.png`);
  }

  await browser.close();
  console.log("\nDone. Open the brand-exports/ folder.");
}

main().catch(console.error);
