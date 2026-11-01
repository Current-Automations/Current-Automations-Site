"use client";

import { useEffect } from "react";

// The engine files in public/scrollcraft/ are the upstream scroll-craft engine,
// copied unmodified. Its stylesheet carries unscoped body rules, so it is linked
// only while a scroll-craft page is mounted and removed on unmount; the page's
// own CSS restores the site's body values under html.sc-page for that window.

type Api = { destroy: () => void };
type Engine = { mount: (root: Element, opts?: unknown) => Api };

declare global {
  interface Window {
    ScrollCraft?: Engine;
    __scrollcraftLoad?: Promise<void>;
  }
}

const ENGINE_JS = "/scrollcraft/scrollcraft.js";
const ENGINE_CSS = "/scrollcraft/scrollcraft.css";

function loadScript(): Promise<void> {
  if (window.ScrollCraft) return Promise.resolve();
  if (!window.__scrollcraftLoad) {
    window.__scrollcraftLoad = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = ENGINE_JS;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        window.__scrollcraftLoad = undefined;
        reject(new Error("scroll-craft engine failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return window.__scrollcraftLoad;
}

function loadStyles(): { link: HTMLLinkElement; ready: Promise<void> } {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = ENGINE_CSS;
  const ready = new Promise<void>((resolve) => {
    link.onload = () => resolve();
    link.onerror = () => resolve();
  });
  document.head.appendChild(link);
  return { link, ready };
}

const money = (n: number) => `$${n.toFixed(2)}`;

// The running work order. Markers ([data-wo-pass="key"]) sit in the chapters;
// when one crosses the lower third of the viewport its line fills and stays.
function wireWorkOrder(root: HTMLElement) {
  const panel = root.querySelector<HTMLElement>("[data-wo]");
  if (!panel) return () => {};
  const lines = Array.from(panel.querySelectorAll<HTMLElement>("[data-wo-line]"));
  const strip = root.querySelector<HTMLElement>("[data-wo-strip]");
  const filled: string[] = [];

  const set = (sel: string, text: string) => {
    root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      el.textContent = text;
    });
  };

  const render = () => {
    let labour = 0;
    let latest = "";
    lines.forEach((line) => {
      const key = line.dataset.woLine || "";
      const on = filled.includes(key);
      line.classList.toggle("is-filled", on);
      if (on) labour += Number(line.dataset.woAmount || 0);
    });
    const last = filled.filter((k) => k !== "total").at(-1);
    if (last) {
      const line = lines.find((l) => l.dataset.woLine === last);
      latest = line?.querySelector("[data-wo-label]")?.textContent?.trim() || "";
    }
    const totalOn = filled.includes("total");
    const hst = Math.round(labour * 13) / 100;
    panel.classList.toggle("is-total", totalOn);
    panel.classList.toggle("is-live", filled.length > 0);
    set("[data-wo-labour]", money(labour));
    set("[data-wo-hst]", money(hst));
    set("[data-wo-total]", money(labour + hst));
    panel.dataset.scVerifyState = `lines=${filled.length};labour=${labour};total=${totalOn ? 1 : 0}`;
    if (strip) {
      strip.classList.toggle("is-live", filled.length > 0);
      const label = strip.querySelector<HTMLElement>("[data-wo-strip-label]");
      const sum = strip.querySelector<HTMLElement>("[data-wo-strip-sum]");
      if (label) label.textContent = totalOn ? "Sample work order, totalled" : latest;
      if (sum) sum.textContent = totalOn ? `${money(labour + hst)} with HST` : `Labour so far ${money(labour)}`;
    }
  };

  const fill = (key: string) => {
    if (key && !filled.includes(key)) {
      filled.push(key);
      render();
    }
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        fill((e.target as HTMLElement).dataset.woPass || "");
        io.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -30% 0px", threshold: 0 },
  );
  // A marker inside a pinned act can name the act progress it fills at, so the
  // line lands on the beat rather than when the stage first scrolls in.
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const timed: { key: string; at: number; act: HTMLElement }[] = [];
  root.querySelectorAll<HTMLElement>("[data-wo-pass]").forEach((m) => {
    const at = parseFloat(m.dataset.woPassAt || "");
    const act = m.closest<HTMLElement>("[data-sc-act]");
    if (!reduce && !Number.isNaN(at) && act) timed.push({ key: m.dataset.woPass || "", at, act });
    else io.observe(m);
  });
  let frame = 0;
  const tick = () => {
    frame = 0;
    timed.forEach((t) => {
      if (parseFloat(t.act.style.getPropertyValue("--sc-p")) >= t.at) fill(t.key);
    });
  };
  const onScroll = () => {
    if (timed.length && !frame) frame = requestAnimationFrame(tick);
  };
  addEventListener("scroll", onScroll, { passive: true });
  const opener = root.querySelector<HTMLElement>("[data-wo-open]");
  const openIo = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      panel.classList.add("is-open");
      openIo.disconnect();
    },
    { rootMargin: "0px 0px -40% 0px", threshold: 0 },
  );
  if (opener) openIo.observe(opener);
  render();
  return () => {
    io.disconnect();
    openIo.disconnect();
    removeEventListener("scroll", onScroll);
    if (frame) cancelAnimationFrame(frame);
  };
}

// Margin folio: chapter code and title follow whichever chapter owns the middle
// of the viewport.
function wireFolio(root: HTMLElement) {
  const code = root.querySelector<HTMLElement>("[data-folio-code]");
  const title = root.querySelector<HTMLElement>("[data-folio-title]");
  if (!code || !title) return () => {};
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        code.textContent = el.dataset.chapter || "";
        title.textContent = el.dataset.chapterTitle || "";
      });
    },
    { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
  );
  root.querySelectorAll<HTMLElement>("[data-chapter]").forEach((s) => io.observe(s));
  return () => io.disconnect();
}

// The pinned chapters are drawn by page CSS from --sc-p, which the verification
// harness cannot see, so each stage publishes the phases it actually paints.
// data-sh-phases="name:from:length,..." on the act names them.
function wirePhases(root: HTMLElement) {
  const acts = Array.from(root.querySelectorAll<HTMLElement>("[data-sh-phases]"))
    .map((act) => ({
      act,
      stage: act.querySelector<HTMLElement>("[data-sc-stage]"),
      phases: (act.dataset.shPhases || "")
        .split(",")
        .map((s) => s.split(":"))
        .map(([name, from, len]) => ({ name, from: parseFloat(from), len: parseFloat(len) })),
    }))
    .filter((a) => a.stage);
  if (!acts.length) return () => {};
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;
  const phase = (p: number, from: number, len: number) => Math.min(1, Math.max(0, (p - from) / len));
  const publish = () => {
    frame = 0;
    acts.forEach(({ act, stage, phases }) => {
      if (!stage) return;
      const p = reduce ? 1 : parseFloat(act.style.getPropertyValue("--sc-p")) || 0;
      stage.dataset.scVerifyState = phases.map((ph) => `${ph.name}=${phase(p, ph.from, ph.len).toFixed(2)}`).join(";");
      const done = phases.every((ph) => p >= ph.from + ph.len);
      if (done) stage.dataset.scVerifyHold = "true";
      else delete stage.dataset.scVerifyHold;
    });
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(publish);
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  publish();
  return () => {
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", onScroll);
    if (frame) cancelAnimationFrame(frame);
  };
}

export default function ScrollCraftMount({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    let api: Api | null = null;
    let gone = false;
    document.documentElement.classList.add("sc-page");
    const { link, ready } = loadStyles();
    const cleanups = [wireWorkOrder(root), wireFolio(root), wirePhases(root)];

    Promise.all([loadScript(), ready])
      .then(() => {
        if (gone || !window.ScrollCraft) return;
        api = window.ScrollCraft.mount(root);
      })
      .catch(() => {
        // Without the engine the stylesheet would leave every data-sc-in block
        // hidden, so the page falls back to plain document flow.
        link.remove();
      });

    return () => {
      gone = true;
      api?.destroy();
      cleanups.forEach((fn) => fn());
      link.remove();
      document.documentElement.classList.remove("sc-page");
    };
  }, [rootId]);

  return null;
}
