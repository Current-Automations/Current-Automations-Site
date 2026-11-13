// Compiles lib/demo-booking with tsc into .demo-booking-build/ and runs the Rowan
// Plumbing calendar against an in-memory store. No network.
//   node scripts/demo-booking-check.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(site, ".demo-booking-build");
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
    files: [path.join(site, "lib/demo-booking/shop.ts")],
  })
);
execFileSync(process.execPath, [path.join(site, "node_modules/typescript/bin/tsc"), "-p", path.join(out, "tsconfig.json")], { stdio: "inherit" });

const req = createRequire(path.join(site, "package.json"));
const shop = req(path.join(out, "js/lib/demo-booking/shop.js"));
const time = req(path.join(out, "js/lib/sms-bot/time.js"));

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

function memStore() {
  const m = new Map();
  return {
    m,
    list: async () => [...m.values()],
    put: async (b) => void m.set(b.start, b),
    remove: async (start) => void m.delete(start),
  };
}

const T = (y, m, d, h, mi = 0) => time.torontoToUtc({ y, m, d, h, mi });
// Friday 2026-11-13, 8:00 local.
const NOW = T(2026, 11, 13, 8);
const A = "4165550101";
const B = "9055550102";

async function openings(store, date, now = NOW) {
  const r = await shop.checkAvailability(store, now, { date });
  return r.ok ? r.openings.map((o) => o.start) : [];
}

await check("soonest: offers a few openings, all two hours out, none on a Sunday", async () => {
  const r = await shop.checkAvailability(memStore(), NOW, {});
  assert.ok(r.ok);
  assert.ok(r.openings.length >= 2 && r.openings.length <= 6);
  for (const o of r.openings) {
    const t = time.parseIsoLocal(o.start);
    assert.ok(t >= NOW + 2 * 3600000);
    assert.notEqual(time.torontoParts(t).dow, 0);
    assert.match(o.label, /\d/);
  }
});

await check("standing work: some slots are gone on an empty store, never a whole fortnight", async () => {
  let open = 0;
  let total = 0;
  for (let d = 16; d <= 20; d++) {
    open += (await openings(memStore(), `2026-11-${d}`)).length;
    total += 9;
  }
  assert.ok(open < total, "some taken");
  assert.ok(open > total / 3, "most still open");
});

await check("hours: weekday 8 to 4 starts, Saturday 9 to 12 starts", async () => {
  const mon = await openings(memStore(), "2026-11-16");
  assert.ok(mon.every((s) => s.slice(11) >= "08:00" && s.slice(11) <= "16:00"));
  const sat = await openings(memStore(), "2026-11-14");
  assert.ok(sat.every((s) => s.slice(11) >= "09:00" && s.slice(11) <= "12:00"));
});

await check("Sunday: closed, and it offers the next open day", async () => {
  const r = await shop.checkAvailability(memStore(), NOW, { date: "2026-11-15" });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "closed");
  assert.ok(r.openings.length > 0);
  assert.ok(r.openings.every((o) => o.start > "2026-11-15"));
});

await check("morning and afternoon filter", async () => {
  const am = await shop.checkAvailability(memStore(), NOW, { date: "2026-11-17", time_of_day: "morning" });
  const pm = await shop.checkAvailability(memStore(), NOW, { date: "2026-11-17", time_of_day: "afternoon" });
  if (am.ok) assert.ok(am.openings.every((o) => o.start.slice(11) < "12:00"));
  if (pm.ok) assert.ok(pm.openings.every((o) => o.start.slice(11) >= "12:00"));
  assert.ok(am.ok || pm.ok);
});

await check("book: takes the slot, and the next caller cannot have it", async () => {
  const store = memStore();
  const [first, second] = await openings(store, "2026-11-17");
  const r = await shop.book(store, NOW, { start: first, name: "Dana", phone: "(416) 555-0101", address: "12 Maple St", issue: "leak" }, "call_1");
  assert.ok(r.ok);
  assert.equal(r.booking.start, first);
  assert.ok(!(await openings(store, "2026-11-17")).includes(first));
  const again = await shop.book(store, NOW, { start: first, name: "Sam", phone: B }, "call_2");
  assert.equal(again.ok, false);
  assert.equal(again.reason, "taken");
  assert.ok(again.openings.some((o) => o.start === second));
});

await check("book: a standing-work slot is refused with the closest open ones", async () => {
  const store = memStore();
  const open = await openings(store, "2026-11-18");
  const all = [8, 9, 10, 11, 12, 13, 14, 15, 16].map((h) => `2026-11-18T${String(h).padStart(2, "0")}:00`);
  const gone = all.find((s) => !open.includes(s));
  assert.ok(gone, "this day has standing work");
  const r = await shop.book(store, NOW, { start: gone, name: "Dana", phone: A }, "c");
  assert.equal(r.reason, "taken");
  assert.ok(r.openings.length > 0 && r.openings.every((o) => open.includes(o.start)));
});

await check("book: one booking per phone number", async () => {
  const store = memStore();
  const [first, second] = await openings(store, "2026-11-17");
  await shop.book(store, NOW, { start: first, name: "Dana", phone: A }, "c");
  const r = await shop.book(store, NOW, { start: second, name: "Dana", phone: "+1 416 555 0101" }, "c");
  assert.equal(r.reason, "already_booked");
  assert.equal(store.m.size, 1);
});

await check("book: bad time, missing name, short phone, Sunday, past, too far out", async () => {
  const store = memStore();
  const [first] = await openings(store, "2026-11-17");
  assert.equal((await shop.book(store, NOW, { start: "Tuesday at nine", name: "D", phone: A }, "c")).reason, "bad_time");
  assert.equal((await shop.book(store, NOW, { start: first, phone: A }, "c")).reason, "missing");
  assert.equal((await shop.book(store, NOW, { start: first, name: "D", phone: "555-0101" }, "c")).reason, "missing");
  assert.equal((await shop.book(store, NOW, { start: "2026-11-15T10:00", name: "D", phone: A }, "c")).reason, "taken");
  assert.equal((await shop.book(store, NOW, { start: "2026-11-12T10:00", name: "D", phone: A }, "c")).reason, "taken");
  assert.equal((await shop.book(store, NOW, { start: "2026-11-13T09:00", name: "D", phone: A }, "c")).reason, "taken");
  assert.equal((await shop.book(store, NOW, { start: "2026-12-21T10:00", name: "D", phone: A }, "c")).reason, "taken");
  assert.equal((await shop.book(store, NOW, { start: "2026-11-17T10:30", name: "D", phone: A }, "c")).reason, "taken");
  assert.equal(store.m.size, 0);
});

await check("reschedule: moves it, frees the old time, keeps the details", async () => {
  const store = memStore();
  const [first, second] = await openings(store, "2026-11-17");
  await shop.book(store, NOW, { start: first, name: "Dana", phone: A, address: "12 Maple St", issue: "leak" }, "c1");
  const r = await shop.reschedule(store, NOW, { phone: A, new_start: second }, "c2");
  assert.ok(r.ok);
  assert.equal(store.m.size, 1);
  assert.equal(store.m.get(second).address, "12 Maple St");
  assert.ok((await openings(store, "2026-11-17")).includes(first));
});

await check("reschedule: onto a taken time fails and keeps the original; unknown number is not_found", async () => {
  const store = memStore();
  const [first, second] = await openings(store, "2026-11-17");
  await shop.book(store, NOW, { start: first, name: "Dana", phone: A }, "c");
  await shop.book(store, NOW, { start: second, name: "Sam", phone: B }, "c");
  const r = await shop.reschedule(store, NOW, { phone: A, new_start: second }, "c");
  assert.equal(r.reason, "taken");
  assert.ok(store.m.has(first) && store.m.get(second).name === "Sam");
  assert.equal((await shop.reschedule(store, NOW, { phone: "6475550000", new_start: second }, "c")).reason, "not_found");
  assert.ok((await shop.reschedule(store, NOW, { phone: A, new_start: first }, "c")).ok, "same time is a no-op");
});

await check("cancel: frees the slot; nothing to cancel is not_found", async () => {
  const store = memStore();
  const [first] = await openings(store, "2026-11-17");
  await shop.book(store, NOW, { start: first, name: "Dana", phone: A }, "c");
  assert.ok((await shop.cancel(store, NOW, { phone: A })).ok);
  assert.equal(store.m.size, 0);
  assert.equal((await shop.cancel(store, NOW, { phone: A })).reason, "not_found");
});

await check("a test booking frees itself after 24 hours", async () => {
  const store = memStore();
  const [first] = await openings(store, "2026-11-19");
  await shop.book(store, NOW, { start: first, name: "Dana", phone: A }, "c");
  assert.ok(!(await openings(store, "2026-11-19", NOW + 23 * 3600000)).includes(first));
  assert.ok((await openings(store, "2026-11-19", NOW + 25 * 3600000)).includes(first));
  assert.equal(store.m.size, 0);
});

await check("clock change: slots on and after a DST switch keep their wall time", async () => {
  const now = T(2027, 3, 12, 8);
  const mon = await openings(memStore(), "2027-03-15", now);
  assert.ok(mon.length > 0 && mon.every((s) => /T(0[89]|1[0-6]):00$/.test(s)));
});

console.log(`\n${passed} passed`);
