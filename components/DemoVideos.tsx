"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const GC_BOOKING =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

const featured = {
  src: "/demos/video1.html",
  title: "The Full Overview",
  description:
    "A missed call becomes a booked job in under 60 seconds. Watch the complete speed-to-lead sequence.",
};

const secondary = [
  {
    src: "/demos/video2.html",
    title: "Capture Everywhere",
    description:
      "Four lead channels, one system: missed calls, web forms, Google Business, and inbound AI calls all handled automatically.",
  },
  {
    src: "/demos/video3.html",
    title: "Keep The Deal Alive",
    description:
      "Quoted jobs that go quiet get automatically followed up until they book or opt out.",
  },
];

type ExpandedVideo = { src: string; title: string } | null;

export default function DemoVideos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<ExpandedVideo>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".fade-up");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "none";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setExpanded(null), []);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [expanded, close]);

  return (
    <div ref={sectionRef} className="bg-[#07111d]">
      <style>{`
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .demo-glow {
          box-shadow:
            0 0 0 1px rgba(79,208,173,0.18),
            0 0 48px rgba(79,208,173,0.07),
            0 28px 72px rgba(4,9,26,0.55);
          transition: box-shadow 0.35s ease;
        }
        .demo-glow:hover {
          box-shadow:
            0 0 0 1px rgba(79,208,173,0.38),
            0 0 64px rgba(79,208,173,0.14),
            0 32px 80px rgba(4,9,26,0.6);
        }
        .expand-btn {
          position: absolute;
          bottom: 12px;
          right: 12px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(7,17,29,0.72);
          border: 1px solid rgba(79,208,173,0.25);
          color: rgba(255,255,255,0.75);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          backdrop-filter: blur(8px);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .expand-btn:hover {
          background: rgba(79,208,173,0.15);
          border-color: rgba(79,208,173,0.55);
          color: #4fd0ad;
        }
        .cinema-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9000;
          background: rgba(4,9,26,0.88);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: backdropIn 0.2s ease;
        }
        @keyframes backdropIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        .cinema-panel {
          position: relative;
          width: 100%;
          max-width: 1200px;
          animation: panelIn 0.22s ease;
        }
        @keyframes panelIn {
          from { opacity: 0; transform: scale(0.97) }
          to   { opacity: 1; transform: scale(1) }
        }
        .cinema-close {
          position: absolute;
          top: -44px;
          right: 0;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .cinema-close:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
      `}</style>

      {/* Featured video */}
      <div className="container-shell pb-8 pt-16 sm:pt-20">
        <div className="fade-up" style={{ transitionDelay: "0s" }}>
          <h2 className="mb-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {featured.title}
          </h2>
          <p className="mb-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            {featured.description}
          </p>
          <div className="demo-glow relative overflow-hidden rounded-[1.5rem]">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={featured.src}
                title={featured.title}
                allow="autoplay"
                scrolling="no"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <button
              type="button"
              className="expand-btn sm:hidden"
              onClick={() => setExpanded(featured)}
              aria-label={`Expand ${featured.title}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
              Expand
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-shell">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* Secondary videos */}
      <div className="container-shell py-8 pb-16 sm:pb-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {secondary.map((v, i) => (
            <div
              key={v.src}
              className="fade-up flex flex-col"
              style={{ transitionDelay: `${(i + 1) * 0.12}s` }}
            >
              <div className="mb-5 flex-1">
                <h3 className="mb-1.5 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {v.title}
                </h3>
                <p className="text-sm leading-7 text-white/55">
                  {v.description}
                </p>
              </div>
              <div className="demo-glow relative overflow-hidden rounded-[1.25rem]">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={v.src}
                    title={v.title}
                    allow="autoplay"
                    scrolling="no"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <button
                  type="button"
                  className="expand-btn"
                  onClick={() => setExpanded(v)}
                  aria-label={`Expand ${v.title}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                  Expand
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div className="border-t border-white/[0.07] bg-[#060e19]">
        <div className="container-shell py-16 text-center fade-up" style={{ transitionDelay: "0.24s" }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/40">
            Ready to stop losing jobs?
          </p>
          <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            See what leaks exist in your business.
          </h2>
          <a
            href={GC_BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book Free Audit
          </a>
          <p className="mt-4 text-sm text-white/40">
            30 minutes. No pitch. No obligation.
          </p>
        </div>
      </div>

      {/* Cinema modal */}
      {expanded && (
        <div
          className="cinema-backdrop"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={expanded.title}
        >
          <div
            className="cinema-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="cinema-close"
              onClick={close}
              aria-label="Close expanded view"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Close
            </button>
            <div
              className="demo-glow overflow-hidden rounded-[1.5rem]"
              style={{ boxShadow: "0 0 0 1px rgba(79,208,173,0.3), 0 0 80px rgba(79,208,173,0.12), 0 40px 100px rgba(4,9,26,0.7)" }}
            >
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={expanded.src}
                  title={expanded.title}
                  allow="autoplay"
                  scrolling="no"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
