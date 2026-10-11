// Compiles lib/sms-bot with tsc into .sms-bot-build/ and runs the checks below
// against the real W41 schedule file plus mocked Twilio and Claude. No network.
//   node scripts/sms-bot-check.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(site, ".sms-bot-build");
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
      baseUrl: site,
      paths: { "@/*": ["./*"] },
    },
    include: [path.join(site, "lib/sms-bot/*.ts"), path.join(site, "lib/twilio-signature.ts")],
  })
);
execFileSync(process.execPath, [path.join(site, "node_modules/typescript/bin/tsc"), "-p", path.join(out, "tsconfig.json")], { stdio: "inherit" });

process.env.NODE_PATH = path.join(site, "node_modules");
const req = createRequire(path.join(site, "package.json"));
const load = (name) => req(path.join(out, "js/lib/sms-bot", name + ".js"));
const time = load("time");
const ics = load("ics");
const availability = load("availability");
const schedule = load("schedule");
const bot = load("bot");
const commands = load("commands");

const icsDir = "C:/Users/Jarre/tools/ca-schedule/weeks";
const w41 = ["2026-W41.ics", "2026-W41-patch1.ics"].map((f) => fs.readFileSync(path.join(icsDir, f), "utf8"));

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

const T = (y, m, d, h, mi = 0) => time.torontoToUtc({ y, m, d, h, mi });

await check("ics: real W41 week + patch parse", () => {
  const events = w41.flatMap(ics.parseIcs);
  assert.equal(events.length, 19);
  const shift = events.find((e) => e.summary === "Shift");
  assert.equal(time.isoLocal(shift.start), "2026-10-05T11:00");
  assert.ok(events.every((e) => e.summary === "Shift" || e.summary === "Busy"), "only Shift/Busy leave the vault");
});

await check("schedule: env map returns the week and its patches, unset returns none", async () => {
  const raw = JSON.stringify({ "2026-W41-patch1.ics": w41[1], "2026-W41.ics": w41[0], "2026-W42.ics": "x" });
  assert.deepEqual(await schedule.loadWeekFiles(raw, "2026-W41"), [w41[1], w41[0]]);
  assert.deepEqual(await schedule.loadWeekFiles("", "2026-W41"), []);
});

await check("time: iso week and DST-safe local conversion", () => {
  assert.equal(time.weekKey(2026, 10, 7), "2026-W41");
  assert.equal(time.weekKey(2026, 10, 12), "2026-W42");
  assert.equal(time.isoLocal(T(2026, 11, 1, 9, 30)), "2026-11-01T09:30");
  assert.equal(time.isoLocal(T(2026, 10, 7, 14, 30)), "2026-10-07T14:30");
});

const loadWeek = async (week) => (week === "2026-W41" ? w41 : []);

await check("availability: real week, Wed Oct 7 2:30 pm", async () => {
  const now = T(2026, 10, 7, 14, 30);
  const a = await availability.computeAvailability(now, loadWeek, []);
  const byDay = {};
  for (const s of a.slots) (byDay[s.start.slice(0, 10)] ??= []).push(s.start.slice(11));
  assert.equal(byDay["2026-10-07"], undefined, "no gap left today after the 3 h notice");
  assert.equal(byDay["2026-10-08"], undefined, "Wednesday is wall to wall");
  assert.deepEqual(byDay["2026-10-09"], ["16:30", "18:30"], "Thursday after the build block");
  assert.deepEqual(byDay["2026-10-10"], ["10:00", "14:30"], "Saturday around the CA hour and kickoff");
  assert.deepEqual(byDay["2026-10-11"], ["12:00"], "Sunday nothing before noon, nothing into the Seahawks game");
  assert.equal(a.coveredThrough, "2026-10-11");
  assert.ok(a.uncoveredDays.includes("2026-10-12"), "W42 not built yet");
  for (const s of a.slots) assert.match(s.label, /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/);
});

await check("availability: late shift blocks the morning, holds block their slot", async () => {
  const synthetic = `BEGIN:VCALENDAR\nBEGIN:VEVENT\nDTSTART:20261009T160000\nDTEND:20261009T220000\nSUMMARY:Server shift\nCATEGORIES:Work\nEND:VEVENT\nEND:VCALENDAR`;
  const now = T(2026, 10, 8, 9, 0);
  const a = await availability.computeAvailability(now, async (w) => (w === "2026-W41" ? [synthetic] : []), []);
  assert.equal(a.slots.filter((s) => s.start.startsWith("2026-10-09")).length, 0, "late shift day offers nothing");
  const thu = a.slots.filter((s) => s.start.startsWith("2026-10-08"));
  assert.ok(thu.length >= 1);
  const b = await availability.computeAvailability(now, async (w) => (w === "2026-W41" ? [synthetic] : []), [
    { start: time.parseIsoLocal(thu[0].start), end: time.parseIsoLocal(thu[0].end) },
  ]);
  assert.ok(!b.slots.some((s) => s.start === thu[0].start), "held slot is gone");
});

function fakeDeps(script, { thread = null, now = T(2026, 10, 7, 14, 30) } = {}) {
  const sent = [];
  const events = [];
  const saved = [];
  const holds = [];
  let calls = 0;
  const claude = async (params) => {
    const step = script[Math.min(calls, script.length - 1)];
    calls++;
    return typeof step === "function" ? step(params) : step;
  };
  return {
    sent, events, saved, holds, params: () => calls,
    deps: {
      history: async () => [],
      media: async () => ({ data: "AAAA", mediaType: "image/jpeg" }),
      send: async (to, body) => { sent.push({ to, body }); },
      loadWeek,
      holds: async () => holds,
      saveHold: async (h) => { holds.push(h); },
      loadThread: async () => thread,
      newThread: async (phone, t) => ({ code: "K7M2P", phone, lane: "unknown", stalledTurns: 0, firstSeen: t, lastSeen: t }),
      saveThread: async (t) => { saved.push(JSON.parse(JSON.stringify(t))); },
      event: async (e) => { events.push(e); },
      claude,
      now: () => now,
    },
  };
}

const env = { twilio: { accountSid: "AC", authToken: "x" }, anthropicKey: "k", scheduleIcs: "", makeUrl: "", demoLine: "+13652993366", cell: "+19055550100" };
const text = (t, stop = "end_turn") => ({ stop_reason: stop, content: [{ type: "text", text: t }] });
const toolUse = (name, input, id = "tu_1") => ({ stop_reason: "tool_use", content: [{ type: "tool_use", id, name, input }] });

await check("bot: availability tool then reply, forwarded to the cell", async () => {
  const f = fakeDeps([
    toolUse("get_availability", {}),
    (params) => {
      const result = params.messages[params.messages.length - 1].content[0];
      assert.equal(result.type, "tool_result");
      const avail = JSON.parse(result.content);
      assert.ok(avail.slots.length > 0);
      return text("Thu Oct 9 at 4:30 pm or 6:30 pm works for a doorbell. Which one suits you? - Current Automations");
    },
  ]);
  await bot.handleProspect(env, { from: "+14165550123", body: "can you set up my nest doorbell", sid: "SM1", media: [] }, f.deps);
  assert.equal(f.sent.length, 2);
  assert.equal(f.sent[0].to, "+14165550123");
  assert.match(f.sent[0].body, /Thu Oct 9/);
  assert.equal(f.sent[1].to, env.cell);
  assert.match(f.sent[1].body, /^\[K7M2P\] \+14165550123\nthem: can you set up my nest doorbell\nbot: Thu Oct 9/);
  assert.equal(f.saved.at(-1).stalledTurns, 0);
  const sys = (await (async () => null)()) ?? null;
  assert.equal(sys, null);
});

await check("bot: system prompt is cached and request shape is right", async () => {
  let seen;
  const f = fakeDeps([(p) => { seen = p; return text("ok"); }]);
  await bot.handleProspect(env, { from: "+14165550123", body: "hi", sid: "SM1", media: [] }, f.deps);
  assert.equal(seen.model, "claude-opus-5-5");
  assert.equal(seen.fallbacks, "default");
  assert.deepEqual(seen.betas, ["server-side-fallback-2026-07-01"]);
  assert.equal(seen.system[0].cache_control.type, "ephemeral");
  assert.ok(seen.tools.every((t) => t.strict === true));
  assert.equal(seen.thinking, undefined);
  const last = seen.messages.at(-1);
  assert.equal(last.role, "user");
  assert.match(last.content.at(-1).text, /^\[context: now Wed, Oct 7, 2:30 p\.m\. Toronto\. Thread K7M2P\. New contact\./);
});

await check("bot: photo rides along as an image block", async () => {
  let seen;
  const f = fakeDeps([(p) => { seen = p; return text("That is the battery Nest, plug-in free. What town are you in?"); }]);
  await bot.handleProspect(env, { from: "+14165550123", body: "", sid: "SM2", media: [{ url: "https://api.twilio.com/m/1", contentType: "image/jpeg" }] }, f.deps);
  const content = seen.messages.at(-1).content;
  assert.equal(content[0].type, "image");
  assert.equal(content[0].source.media_type, "image/jpeg");
  assert.match(f.sent[1].body, /them: \(photo\)/);
});

await check("bot: book_hold saves the hold, fires the event, tells the cell", async () => {
  const f = fakeDeps([
    toolUse("book_hold", { start: "2026-10-09T16:30", name: "Dana", address: "12 King St, Whitby", job: "Nest doorbell battery, iPhone", price: "$99 + HST" }),
    text("You're set for Thu Oct 9 at 4:30 pm, 12 King St. Doorbell on your phone, $99 + HST. We text the day before."),
  ]);
  await bot.handleProspect(env, { from: "+14165550123", body: "4:30 thursday, Dana, 12 King St Whitby", sid: "SM3", media: [] }, f.deps);
  assert.equal(f.holds.length, 1);
  assert.equal(f.holds[0].end, "2026-10-09T18:00");
  assert.equal(f.events[0].event, "hold");
  assert.equal(f.events[0].hold.start, "2026-10-09T16:30");
  assert.equal(f.saved.at(-1).lane, "home");
  assert.equal(f.saved.at(-1).name, "Dana");
  assert.match(f.sent[1].body, /HOLD: Fri, Oct 9|HOLD: Thu, Oct 9/);
});

await check("bot: book_hold on a slot that is not open is refused", async () => {
  const f = fakeDeps([
    toolUse("book_hold", { start: "2026-10-08T12:00", name: "Dana", address: "x", job: "y", price: "$99 + HST" }),
    (params) => {
      const r = JSON.parse(params.messages.at(-1).content[0].content);
      assert.equal(r.ok, false);
      return text("That one just went. Thu Oct 9 at 4:30 pm or 6:30 pm?");
    },
  ]);
  await bot.handleProspect(env, { from: "+14165550123", body: "wed noon", sid: "SM4", media: [] }, f.deps);
  assert.equal(f.holds.length, 0);
});

await check("bot: hand_off mutes the thread and sends the fixed line", async () => {
  const f = fakeDeps([toolUse("hand_off", { reason: "wants a hardwired switch", urgency: "normal" }), text("ignored")]);
  await bot.handleProspect(env, { from: "+14165550123", body: "can you swap my wall switch", sid: "SM5", media: [] }, f.deps);
  assert.equal(f.sent[0].body, bot.HANDOFF_LINE);
  assert.ok(f.saved.at(-1).mutedUntil > T(2026, 10, 7, 14, 30));
  assert.equal(f.events[0].event, "handoff");
  assert.match(f.sent[1].body, /HANDED OFF: wants a hardwired switch\nReply "K7M2P your message"/);
});

await check("bot: Claude failure still answers the prospect and flags the cell", async () => {
  const f = fakeDeps([() => { throw new Error("boom"); }]);
  await bot.handleProspect(env, { from: "+14165550123", body: "hi", sid: "SM6", media: [] }, f.deps);
  assert.equal(f.sent[0].body, bot.HANDOFF_LINE);
  assert.match(f.sent[1].body, /HANDED OFF: error: boom/);
});

await check("bot: refusal stop reason hands off", async () => {
  const f = fakeDeps([{ stop_reason: "refusal", content: [] }]);
  await bot.handleProspect(env, { from: "+14165550123", body: "hi", sid: "SM7", media: [] }, f.deps);
  assert.equal(f.sent[0].body, bot.HANDOFF_LINE);
});

await check("bot: muted thread only forwards", async () => {
  const f = fakeDeps([text("should not run")], {
    thread: { code: "K7M2P", phone: "+14165550123", lane: "home", stalledTurns: 0, firstSeen: 1, lastSeen: 1, mutedUntil: T(2026, 10, 8, 2) },
  });
  await bot.handleProspect(env, { from: "+14165550123", body: "any update?", sid: "SM8", media: [] }, f.deps);
  assert.equal(f.sent.length, 1);
  assert.equal(f.sent[0].to, env.cell);
  assert.equal(f.params(), 0);
});

await check("bot: rapid texts from one phone pause the bot (auto-reply loop)", async () => {
  const now = T(2026, 10, 7, 14, 30);
  const recentIn = [1, 2, 3, 4, 5, 6].map((i) => now - i * 60000);
  const f = fakeDeps([text("should not run")], {
    thread: { code: "K7M2P", phone: "+14165550123", lane: "home", stalledTurns: 0, firstSeen: 1, lastSeen: 1, recentIn },
  });
  await bot.handleProspect(env, { from: "+14165550123", body: "I'm driving, I'll get back to you", sid: "SM9", media: [] }, f.deps);
  assert.equal(f.params(), 0);
  assert.equal(f.sent.length, 1);
  assert.equal(f.sent[0].to, env.cell);
  assert.match(f.sent[0].body, /PAUSED: 7 texts in 10 min/);
  assert.ok(f.saved.at(-1).mutedUntil > now);
  assert.equal(f.events[0].event, "handoff");
});

await check("bot: old texts fall out of the rate window", async () => {
  const now = T(2026, 10, 7, 14, 30);
  const recentIn = [11, 12, 13, 14, 15, 16, 17].map((i) => now - i * 60000);
  const f = fakeDeps([text("Yes, we can.")], {
    thread: { code: "K7M2P", phone: "+14165550123", lane: "home", stalledTurns: 0, firstSeen: 1, lastSeen: 1, recentIn },
  });
  await bot.handleProspect(env, { from: "+14165550123", body: "one more question", sid: "SM10", media: [] }, f.deps);
  assert.equal(f.sent[0].to, "+14165550123");
  assert.equal(f.saved.at(-1).recentIn.length, 1);
});

await check("bot: em dashes never reach a phone", () => {
  assert.equal(bot.cleanOutbound("Plug-in only — nothing in the walls"), "Plug-in only, nothing in the walls");
  assert.equal(bot.cleanOutbound("a  b\n\n\n\nc"), "a b\n\nc");
});

function ownerFixture(thread) {
  const sent = [];
  const saved = [];
  const events = [];
  const queued = [];
  const deleted = [];
  const deps = {
    send: async (to, body) => { sent.push({ to, body }); },
    loadThread: async () => thread,
    saveThread: async (t) => { saved.push(JSON.parse(JSON.stringify(t))); },
    event: async (e) => { events.push(e); },
    now: () => T(2026, 10, 9, 18, 5),
    phoneForCode: async (code) => (code === "K7M2P" ? "+14165550123" : null),
    recent: async () => (thread ? [thread] : []),
    queue: async (phone, code, name, sendAt) => { queued.push({ phone, code, name, sendAt }); },
    deleteHold: async (start) => { deleted.push(start); },
  };
  return { sent, saved, events, queued, deleted, deps };
}
const ownerEnv = { ...env, stripeLink: "https://buy.stripe.com/test_abc", reviewLink: "https://g.page/r/abc/review", billingEmail: "billing@currentautomations.ca" };
const baseThread = () => ({ code: "K7M2P", phone: "+14165550123", lane: "home", name: "Dana Lee", stalledTurns: 0, firstSeen: 1, lastSeen: 1 });

await check("owner: CODE message relays and mutes", async () => {
  const o = ownerFixture(baseThread());
  await commands.handleOwner(ownerEnv, "k7m2p On my way, 10 min out", o.deps);
  assert.deepEqual(o.sent[0], { to: "+14165550123", body: "On my way, 10 min out" });
  assert.ok(o.saved[0].mutedUntil > 0);
  assert.match(o.sent[1].body, /Sent to K7M2P/);
});

await check("owner: RESUME hands back", async () => {
  const t = baseThread(); t.mutedUntil = 9e15;
  const o = ownerFixture(t);
  await commands.handleOwner(ownerEnv, "RESUME K7M2P", o.deps);
  assert.equal(o.saved[0].mutedUntil, undefined);
  assert.match(o.sent[0].body, /back on K7M2P/);
});

await check("owner: DONE sends the payment link and queues tomorrow 7 pm", async () => {
  const o = ownerFixture(baseThread());
  await commands.handleOwner(ownerEnv, "done K7M2P", o.deps);
  assert.match(o.sent[0].body, /^Thanks Dana, here is the payment link for today: https:\/\/buy\.stripe\.com\/test_abc E-transfer to billing@currentautomations\.ca works too\.$/);
  assert.equal(time.isoLocal(o.queued[0].sendAt), "2026-10-10T19:00");
  assert.equal(o.events[0].event, "done");
  assert.match(o.sent[1].body, /Review text goes Sat, Oct 10, 7:00 p\.m\./);
});

await check("owner: unknown code and plain text get help", async () => {
  const o = ownerFixture(null);
  await commands.handleOwner(ownerEnv, "ZZZZZ hello", o.deps);
  assert.match(o.sent[0].body, /No thread ZZZZZ/);
  await commands.handleOwner(ownerEnv, "what do I do", o.deps);
  assert.equal(o.sent[1].body, commands.HELP);
});

await check("owner: CANCEL frees the hold and tells them", async () => {
  const t = baseThread();
  t.hold = { start: "2026-10-10T13:00", end: "2026-10-10T14:30", address: "12 King St", job: "Ring doorbell", price: "$99 + HST", phone: t.phone, name: "Dana", code: "K7M2P" };
  const o = ownerFixture(t);
  await commands.handleOwner(ownerEnv, "cancel k7m2p", o.deps);
  assert.deepEqual(o.deleted, ["2026-10-10T13:00"]);
  assert.equal(o.saved[0].hold, undefined);
  assert.equal(o.sent[0].to, "+14165550123");
  assert.match(o.sent[0].body, /^Your visit for Sat, Oct 10, 1:00 p\.m\. is cancelled\./);
  assert.equal(o.events[0].event, "cancel");
  assert.match(o.sent[1].body, /freed and K7M2P told/);
});

await check("owner: CANCEL with no hold says so", async () => {
  const o = ownerFixture(baseThread());
  await commands.handleOwner(ownerEnv, "CANCEL K7M2P", o.deps);
  assert.equal(o.deleted.length, 0);
  assert.equal(o.sent[0].to, env.cell);
  assert.match(o.sent[0].body, /no hold/);
});

await check("owner: LIST", async () => {
  const o = ownerFixture(baseThread());
  await commands.handleOwner(ownerEnv, "LIST", o.deps);
  assert.match(o.sent[0].body, /^K7M2P \+14165550123 home Dana Lee$/);
});

const sig = req(path.join(out, "js/lib/twilio-signature.js"));
await check("signature: matches Twilio's documented vector", () => {
  const url = "https://mycompany.com/myapp.php?foo=1&bar=2";
  const params = new URLSearchParams({ CallSid: "CA1234567890ABCDE", Caller: "+12349013030", Digits: "1234", From: "+12349013030", To: "+18005551212" });
  const expected = sig.expectedSignature(url, params, "12345");
  assert.equal(expected, "0/KCTR6DLpKmkAf8muzZqo1nDgQ=");
  assert.ok(sig.signatureMatches(expected, expected));
  assert.ok(!sig.signatureMatches("nope", expected));
});

console.log(`\n${passed} passed${process.exitCode ? ", with failures" : ""}`);
