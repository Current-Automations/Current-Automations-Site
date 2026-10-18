// Run from site/ in a terminal that is not Claude's: node scripts/meta-token.mjs
// In the Graph API Explorer pick the app "Current Automations Publisher", User Token, and
// add every permission in NEEDED below before Generate Access Token (tick the Current
// Automations Page and its Instagram account in the dialog). A token missing any of them
// gets refused here instead of failing at publish time (2026-10-18: the first token had no
// pages_* scope and Meta answered "must be granted before impersonating a user's page").
// Asks for the app secret and a short-lived user token from the Graph API Explorer,
// exchanges it for a long-lived one, reads the Page token and IG account, writes
// META_PAGE_ID, META_IG_USER_ID and META_ACCESS_TOKEN to Vercel production.
import { createInterface } from "node:readline";
import { spawnSync } from "node:child_process";

const APP_ID = "1028862226839537";
const PAGE_NAME = "Current Automations";
const G = "https://graph.facebook.com/v25.0";
const NEEDED = ["pages_show_list", "pages_read_engagement", "pages_manage_posts", "instagram_basic", "instagram_content_publish", "business_management"];

function ask(q) {
  return new Promise((res) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question(q, (a) => { rl.close(); res(a.trim()); });
  }).then((a) => {
    if (!a) { console.error("Nothing entered. Paste the value, then press Enter."); process.exit(1); }
    return a;
  });
}

async function get(path, params) {
  const u = new URL(`${G}/${path}`);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const r = await fetch(u);
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error?.message ?? `HTTP ${r.status} on ${path}`);
  return j;
}

function vercelSet(name, value) {
  spawnSync("vercel", ["env", "rm", name, "production", "-y"], { shell: true, stdio: "ignore" });
  const r = spawnSync("vercel", ["env", "add", name, "production"], { shell: true, input: value, encoding: "utf8" });
  if (r.status !== 0) throw new Error(`vercel env add ${name} failed:\n${r.stderr}`);
  console.log(`set ${name}`);
}

const secret = await ask("App secret (Settings > Basic > Show): ");
const short = await ask("Token from the Explorer (Copy Token): ");

const long = await get("oauth/access_token", { grant_type: "fb_exchange_token", client_id: APP_ID, client_secret: secret, fb_exchange_token: short });
const pages = await get("me/accounts", { fields: "id,name,access_token,instagram_business_account", access_token: long.access_token });
const page = pages.data.find((p) => p.name === PAGE_NAME);
if (!page) throw new Error(`Page "${PAGE_NAME}" not in the token's pages: ${pages.data.map((p) => `${p.name} ${p.id}`).join(", ") || "none"}. Re-generate the token and tick the Current Automations Page.`);
const ig = page.instagram_business_account?.id;
if (!ig) throw new Error(`Page "${page.name}" has no Instagram business account linked. Link @CurrentAutomations to the Page in Business Suite, then re-run.`);

const dbg = await get("debug_token", { input_token: page.access_token, access_token: `${APP_ID}|${secret}` });
const missing = NEEDED.filter((s) => !(dbg.data.scopes ?? []).includes(s));
if (missing.length) throw new Error(`Token is missing: ${missing.join(", ")}. Re-generate it in the Explorer with every permission in NEEDED ticked.`);
console.log(`Page: ${page.name} (${page.id}), IG: ${ig}, token expires: ${dbg.data.expires_at ? new Date(dbg.data.expires_at * 1000).toISOString() : "never"}`);

vercelSet("META_PAGE_ID", page.id);
vercelSet("META_IG_USER_ID", ig);
vercelSet("META_ACCESS_TOKEN", page.access_token);
console.log("Done. Tell Claude to redeploy.");
