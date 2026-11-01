// Rotates SOCIAL_PREVIEW_KEY in Vercel production, redeploys, prints the preview URL.
// Run from site/: node scripts/preview-key.mjs
import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";

const key = randomBytes(18).toString("base64url");
const run = (args, input) => spawnSync("vercel", args, { shell: true, input, encoding: "utf8" });

run(["env", "rm", "SOCIAL_PREVIEW_KEY", "production", "-y"]);
const add = run(["env", "add", "SOCIAL_PREVIEW_KEY", "production"], key);
if (add.status !== 0) {
  console.error(add.stderr || add.stdout);
  process.exit(1);
}
console.log("set SOCIAL_PREVIEW_KEY");

const ls = run(["ls", "--prod"]);
const prod = (ls.stdout.match(/https:\/\/\S+\.vercel\.app/) || [])[0];
if (!prod) {
  console.error("No production deployment found to redeploy.");
  process.exit(1);
}
const re = run(["redeploy", prod, "--target", "production"]);
if (re.status !== 0) {
  console.error(re.stderr || re.stdout);
  process.exit(1);
}
console.log("redeployed");
console.log(`\nPreview page (bookmark it, paste it in #ca):\nhttps://currentautomations.ca/queue/${key}\n`);
