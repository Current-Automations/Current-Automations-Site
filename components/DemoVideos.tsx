"use client";

import { useEffect, useRef } from "react";

const GC_BOOKING =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

const featured = {
  src: "/demos/video1.html",
  title: "The Full Overview",
  description:
    "A missed call becomes a booked job in under 60 seconds — watch the complete speed-to-lead sequence.",
  duration: "90s",
};

const secondary = [
  {
    src: "/demos/video2.html",
    title: "Capture Everywhere",
    description:
      "Four lead channels, one system — missed calls, web forms, Google Business, and inbound AI calls all handled automatically.",
    duration: "30s",
  },
  {
    src: "/demos/video3.html",
    title: "Keep The Deal Alive",
    description:
      "Quoted jobs that go quiet get automatically followed up until they book or opt out.",
    duration: "30s",
  },
];

export default function DemoVideos() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
        .duration-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(79,208,173,0.1);
          border: 1px solid rgba(79,208,173,0.2);
          color: #4fd0ad;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 5px 10px;
          border-radius: 999px;
        }
      `}</style>

      {/* Featured video */}
      <div className="container-shell pb-8 pt-16 sm:pt-20">
        <div
          className="fade-up"
          style={{ transitionDelay: "0s" }}
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="pill-label bg-white/[0.06] text-[#4fd0ad]">
              Featured
            </span>
            <span className="duration-pill">{featured.duration}</span>
          </div>
          <h2 className="mb-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {featured.title}
          </h2>
          <p className="mb-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            {featured.description}
          </p>
          <div className="demo-glow overflow-hidden rounded-[1.5rem]">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={featured.src}
                title={featured.title}
                allow="autoplay"
                scrolling="no"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
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
              className="fade-up"
              style={{ transitionDelay: `${(i + 1) * 0.12}s` }}
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="duration-pill">{v.duration}</span>
              </div>
              <h3 className="mb-1.5 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {v.title}
              </h3>
              <p className="mb-5 text-sm leading-7 text-white/55">
                {v.description}
              </p>
              <div className="demo-glow overflow-hidden rounded-[1.25rem]">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={v.src}
                    title={v.title}
                    allow="autoplay"
                    scrolling="no"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
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
            Book a Free Discovery Call
          </a>
          <p className="mt-4 text-sm text-white/40">
            30 minutes. No pitch. No obligation.
          </p>
        </div>
      </div>
    </div>
  );
}
