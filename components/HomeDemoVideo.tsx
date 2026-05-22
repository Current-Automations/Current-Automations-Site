"use client";

import { useCallback, useEffect, useState } from "react";

type Props = {
  src: string;
  title?: string;
};

/**
 * 16:9 demo-video embed with an expand button that opens a cinema-style
 * modal. Mirrors the expand pattern used in DemoVideos.tsx so the homepage
 * embed behaves consistently.
 */
export default function HomeDemoVideo({
  src,
  title = "Current Automations — demo",
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const close = useCallback(() => setExpanded(false), []);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [expanded, close]);

  return (
    <>
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={src}
          title={title}
          allow="autoplay"
          scrolling="no"
          className="absolute inset-0 h-full w-full border-0"
        />
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="Expand demo video"
          className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-brand)]/25 bg-[rgba(7,17,29,0.72)] px-3 py-1.5 text-[0.72rem] font-semibold tracking-wide text-white/75 backdrop-blur-sm transition-colors hover:border-[var(--color-brand)]/55 hover:bg-[var(--color-brand)]/[0.15] hover:text-[var(--color-brand)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          Expand
        </button>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-[rgba(4,9,26,0.88)] p-6 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close expanded view"
              className="absolute -top-11 right-0 inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.07] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/70 transition-colors hover:bg-white/[0.12] hover:text-white"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Close
            </button>
            <div
              className="overflow-hidden rounded-card-lg"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(79,208,173,0.3), 0 0 80px rgba(79,208,173,0.12), 0 40px 100px rgba(4,9,26,0.7)",
              }}
            >
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={src}
                  title={title}
                  allow="autoplay"
                  scrolling="no"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
