// Screenshot verification loop. Usage:
//   node scripts/shots.mjs /smart-home /pricing
//   node scripts/shots.mjs --all
// Writes a full-page PNG plus readable tiles per route to .shots/ at 375/768/1440,
// and exits 1 on content past the viewport edge, console errors, or non-200s.
// Read the tiles back before reporting UI work done.
import { chromium } from "playwright";
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const BASE = process.env.SHOTS_BASE ?? "http://localhost:3000";
const WIDTHS = [375, 768, 1440];
const OUT = ".shots";

function allRoutes(dir = "app") {
  const routes = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "api" || name.startsWith("_") || name.startsWith("[")) continue;
      routes.push(...allRoutes(p));
    } else if (name === "page.tsx") {
      const r = relative("app", dir).split(sep).filter((s) => !s.startsWith("(")).join("/");
      routes.push("/" + r);
    }
  }
  return routes.sort();
}

async function up() {
  try {
    await fetch(BASE, { signal: AbortSignal.timeout(3000) });
    return true;
  } catch {
    return false;
  }
}

async function ensureServer() {
  if (await up()) return null;
  console.log(`No server at ${BASE}, starting next dev...`);
  const child = spawn("cmd.exe", ["/c", "npm run dev"], { stdio: "ignore" });
  for (let i = 0; i < 90; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    if (await up()) return child;
  }
  child.kill();
  throw new Error(`Dev server did not come up at ${BASE} within 90s`);
}

const args = process.argv.slice(2);
// Git Bash rewrites "/pricing" to "C:/Program Files/Git/pricing"; undo that and accept bare names.
const normalize = (a) => {
  const r = a.replace(/^[A-Za-z]:\/.*?\/Git(?=\/|$)/, "").replace(/^\/?/, "/");
  return r === "/home" ? "/" : r;
};
const routes = args.includes("--all") ? allRoutes() : args.filter((a) => !a.startsWith("--")).map(normalize);
if (!routes.length) {
  console.error("Pass routes (e.g. /pricing) or --all");
  process.exit(2);
}

const server = await ensureServer();
// next runs under cmd.exe, so kill the whole tree, including when a page throws.
if (server) process.on("exit", () => spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" }));
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const problems = [];

for (const route of routes) {
  const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "_");
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    // Hides the consent banner and keeps GA/leadsy from loading on test runs.
    await page.addInitScript(() => localStorage.setItem("ca-cookie-consent", "denied"));
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));

    const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
    // Scroll through so IntersectionObserver reveals and lazy images render.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);

    // The layout wrapper uses overflow-x-clip, so page scrollWidth never grows:
    // too-wide content gets silently cut. Check real content elements instead.
    const overflow = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const MEDIA = new Set(["IMG", "VIDEO", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "IFRAME"]);
      const hasText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      const exempt = (el) => {
        for (let a = el; a && a !== document.body; a = a.parentElement) {
          if (a.getAttribute("aria-hidden") === "true") return true;
          const ox = getComputedStyle(a).overflowX;
          if (a !== el && (ox === "auto" || ox === "scroll")) return true;
        }
        return false;
      };
      const offenders = [...document.querySelectorAll("body *")]
        .filter((el) => MEDIA.has(el.tagName) || hasText(el))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.right > vw + 1 || r.left < -1);
        })
        .filter((el) => !exempt(el))
        .slice(0, 3)
        .map((el) => {
          const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
          const text = (el.textContent || "").trim().slice(0, 40);
          return `${el.tagName.toLowerCase()}${cls ? "." + cls : ""}${text ? ` "${text}"` : ""}`;
        });
      return offenders.length ? { vw, offenders } : null;
    });

    // A full phone page is ~11000px tall and shrinks to unreadable when read back,
    // so also cut it into tiles about 2.5 screens tall.
    const file = join(OUT, `${slug}@${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const tileH = Math.max(900, Math.round(width * 1.25));
    const tiles = Math.ceil(height / tileH);
    for (let i = 0; i < tiles; i++) {
      const y = i * tileH;
      await page.screenshot({
        path: join(OUT, `${slug}@${width}-${String(i + 1).padStart(2, "0")}of${tiles}.png`),
        fullPage: true,
        clip: { x: 0, y, width, height: Math.min(tileH, height - y) },
      });
    }

    const tag = `${route} @${width}`;
    if (!res || res.status() !== 200) problems.push(`${tag}: HTTP ${res?.status()}`);
    if (overflow) problems.push(`${tag}: content past ${overflow.vw}px viewport edge: ${overflow.offenders.join(", ")}`);
    for (const e of errors) problems.push(`${tag}: console error: ${e.slice(0, 200)}`);
    console.log(`${file} (+${tiles} tiles)`);
    await page.close();
  }
}

await browser.close();

if (problems.length) {
  console.log(`\nFAIL (${problems.length})`);
  for (const p of problems) console.log(`- ${p}`);
  process.exit(1);
}
console.log(`\nPASS: ${routes.length} route(s) x ${WIDTHS.length} widths, no overflow or console errors. Read the tiles before reporting done.`);
// An owned dev server child keeps the event loop alive, so exit explicitly.
process.exit(0);
