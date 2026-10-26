// Compiles lib/group-reply with tsc into .group-reply-build/ and checks the linter
// and the draft loop against a fake Claude. No network.
//   node scripts/group-reply-check.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(site, ".group-reply-build");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(
  path.join(out, "tsconfig.json"),
  JSON.stringify({
    compilerOptions: {
      target: "es2022",
      module: "commonjs",
      moduleResolution: "node",
      esModuleInterop: true,
      strict: true,
      skipLibCheck: true,
      outDir: path.join(out, "js"),
      rootDir: site,
    },
    include: [path.join(site, "lib/group-reply").split(path.sep).join("/") + "/*.ts"],
  })
);
execFileSync(process.execPath, [path.join(site, "node_modules/typescript/bin/tsc"), "-p", path.join(out, "tsconfig.json")], { stdio: "inherit" });

const req = createRequire(path.join(site, "package.json"));
const load = (name) => req(path.join(out, "js/lib/group-reply", name + ".js"));
const { lintReply } = load("lint");
const { draftGroupReply } = load("draft");

let passed = 0;
async function check(name, fn) {
  try {
    await fn();
    passed++;
    console.log("ok  ", name);
  } catch (err) {
    console.log("FAIL", name);
    console.log(err);
    process.exitCode = 1;
  }
}

await check("lint: a plain neighbour reply passes", () => {
  const r = lintReply(
    "Most Wi-Fi thermostats want a C wire for steady power, so check the terminals behind the faceplate first. If nothing sits on C, an HVAC tech adds the wire in about an hour. Ontario pays $125 back on an ecobee Enhanced or a Mysa through Home Renovation Savings, and Costco carries the Mysa."
  );
  assert.deepEqual(r.strong, []);
});

await check("lint: the AI tells fire", () => {
  const r = lintReply("It's not just a thermostat, it's a seamless upgrade! Let's dive in. DM me and I'd be happy to help. Smart home? Easy. Fast. Done.");
  const names = r.strong.map((s) => s.split(":")[0]);
  for (const n of ["not just X", "exclamation mark", "staged run-up", "chatbot or sales residue", "three short fragments in a row"]) {
    assert.ok(names.includes(n), `missing ${n} in ${names.join(", ")}`);
  }
  assert.ok(r.weak.some((w) => /seamless/.test(w)), "slop vocab");
});

await check("lint: closers and dashes", () => {
  assert.ok(lintReply("Check the C terminal first. Any wire there?").strong.some((s) => s.startsWith("closes on a question")));
  assert.ok(lintReply("The Mysa is on the list — Costco has it.").strong.some((s) => s.startsWith("dash used")));
  assert.ok(lintReply("Pull the faceplate off and look at the terminals for a wire marked C, since most Wi-Fi thermostats need it. No C wire means an HVAC tech adds it. Then we set it up. Simple job.").strong.some((s) => s.startsWith("paired punchy closer")));
});

await check("lint: nothing specific and too long", () => {
  const vague = "we can help with that kind of thing and make sure it all works together nicely so you get what you want out of it without any of the usual hassle people run into";
  assert.ok(lintReply(vague).strong.some((s) => s.startsWith("nothing specific")));
  const long = Array(30).fill("the Mysa at Costco qualifies for the $125 rebate").join(" and ");
  assert.ok(lintReply(long).strong.some((s) => s.startsWith("too long")));
});

const text = (t) => ({ stop_reason: "end_turn", content: [{ type: "text", text: t }] });

await check("draft: clean first pass returns after one call with cached system and thinking on", async () => {
  const calls = [];
  const claude = async (p) => {
    calls.push(p);
    return text("Most Wi-Fi thermostats need a C wire for steady power, so pull the faceplate and check for a wire on C. If there is none, an HVAC tech adds it. The ecobee Enhanced and the Mysa both get the $125 Home Renovation Savings rebate, and Costco carries the Mysa.");
  };
  const r = await draftGroupReply({ post: "Looking at a Nest, no C wire, any advice?", group: "Our Oshawa" }, claude);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].model, "claude-opus-5-5");
  assert.deepEqual(calls[0].thinking, { type: "adaptive" });
  assert.equal(calls[0].system[0].cache_control.type, "ephemeral");
  assert.match(calls[0].messages[0].content, /^Group: Our Oshawa\n\nThe post or comment to reply to:\nLooking at a Nest/);
  assert.deepEqual(r.flags, []);
  assert.equal(r.passes, 1);
  assert.match(r.draft, /^Most Wi-Fi/);
});

await check("draft: a flagged first pass gets one rewrite and the rest is reported", async () => {
  const calls = [];
  const claude = async (p) => {
    calls.push(p);
    if (calls.length === 1) return text("Great question! Not just any thermostat works — the Mysa does.");
    return text("Pull the faceplate off and check the C terminal before buying anything. Which one? The Mysa from Costco gets the $125 rebate.");
  };
  const r = await draftGroupReply({ post: "which thermostat", note: "they asked about Mysa" }, claude);
  assert.equal(calls.length, 2);
  assert.match(calls[1].messages[2].content, /Rewrite it to clear these.*\n- exclamation mark/s);
  assert.match(calls[0].messages[0].content, /Jarrett's note: they asked about Mysa/);
  assert.equal(r.passes, 2);
  assert.ok(!r.draft.includes("Great question"));
  assert.ok(r.flags.some((f) => f.startsWith("question then its own answer")), r.flags.join("; "));
});

await check("draft: em dashes and wrapping quotes are stripped from the model text", async () => {
  const r = await draftGroupReply({ post: "x" }, async () => text("“Check the C terminal first — most Wi-Fi thermostats need it. The Mysa at Costco gets the $125 rebate.”"));
  assert.equal(r.draft, "Check the C terminal first, most Wi-Fi thermostats need it. The Mysa at Costco gets the $125 rebate.");
});

console.log(`\n${passed} passed${process.exitCode ? ", with failures" : ""}`);
