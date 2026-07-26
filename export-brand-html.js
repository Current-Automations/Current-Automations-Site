// Export public/brand/*.html → outputs/*.png
//
// Prerequisites (run once):
//   npm install puppeteer --no-save
//
// Usage:
//   node export-brand-html.js

const path = require("path");
const fs   = require("fs");

async function main() {
  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch {
    console.error("Puppeteer not found. Run:\n\n  npm install puppeteer --no-save\n");
    process.exit(1);
  }

  const brandDir = path.join(__dirname, "public", "brand");
  const outDir   = path.join(__dirname, "outputs");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const files = fs.readdirSync(brandDir).filter(f => f.endsWith(".html"));
  if (!files.length) { console.error("No HTML files found in public/brand/"); process.exit(1); }

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page    = await browser.newPage();

  for (const file of files) {
    const htmlPath = path.join(brandDir, file);
    const html     = fs.readFileSync(htmlPath, "utf8");

    // Parse dimensions from body style="width:Xpx;height:Ypx;..."
    const w = parseInt((html.match(/width:(\d+)px/)  || [])[1] || "1584");
    const h = parseInt((html.match(/height:(\d+)px/) || [])[1] || "396");

    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await page.goto("file://" + htmlPath.replace(/\\/g, "/"), { waitUntil: "networkidle0" });
    await new Promise(r => setTimeout(r, 800)); // allow web fonts to paint

    const outFile = path.join(outDir, file.replace(/\.html$/, ".png"));
    await page.screenshot({ path: outFile, clip: { x: 0, y: 0, width: w, height: h } });
    console.log(`Saved: outputs/${file.replace(/\.html$/, ".png")}  (${w}×${h})`);
  }

  await browser.close();
  console.log("\nDone.");
}

main().catch(err => { console.error(err); process.exit(1); });
