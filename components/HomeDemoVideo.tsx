"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title?: string;
};

/**
 * 16:9 demo-video embed with an expand button that opens a cinema-style
 * modal. Shared by the homepage and every lane page, so there is one
 * implementation of the view-triggered play, focus trap, and modal
 * behaviour instead of several near-copies.
 */
type FullscreenEl = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
type FullscreenDoc = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

export default function HomeDemoVideo({
  src,
  title = "Current Automations - demo",
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const close = useCallback(() => setExpanded(false), []);

  // Real fullscreen, not a big modal. Falls back to the modal only where the
  // Fullscreen API is missing or refuses (notably iOS Safari, which allows it
  // on <video> but not arbitrary elements).
  const expand = useCallback(() => {
    const el = shellRef.current as FullscreenEl | null;
    const request = el?.requestFullscreen ?? el?.webkitRequestFullscreen;
    if (!el || !request) {
      setExpanded(true);
      return;
    }
    // Called straight from the click so the user gesture is not lost.
    Promise.resolve(request.call(el)).catch(() => setExpanded(true));
  }, []);

  const exitFullscreen = useCallback(() => {
    const doc = document as FullscreenDoc;
    const exit = doc.exitFullscreen ?? doc.webkitExitFullscreen;
    if (doc.fullscreenElement ?? doc.webkitFullscreenElement) exit?.call(doc);
  }, []);

  // Esc and the browser's own exit affordance both fire this, so it is the one
  // place that syncs state back when fullscreen ends.
  useEffect(() => {
    const onChange = () => {
      const doc = document as FullscreenDoc;
      const active =
        (doc.fullscreenElement ?? doc.webkitFullscreenElement) === shellRef.current;
      setIsFullscreen(active);
      if (active) {
        iframeRef.current?.contentWindow?.postMessage(
          { type: "ca-demo-play" },
          window.location.origin,
        );
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  // Demos loop from page load, so a video embedded below the fold is often
  // mid-scene (or sitting in its dead tail) by the time anyone scrolls to
  // it. Ask it to restart once it actually comes into view, one time.
  useEffect(() => {
    const el = iframeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const frame = entry.target as HTMLIFrameElement;
            frame.contentWindow?.postMessage({ type: "ca-demo-play" }, window.location.origin);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    lastFocusedRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus();
    };
  }, [expanded, close]);

  return (
    <>
      <div
        ref={shellRef}
        className={`relative w-full ${isFullscreen ? "h-full bg-[#07111d]" : ""}`}
        style={isFullscreen ? undefined : { paddingTop: "56.25%" }}
      >
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          allow="autoplay; fullscreen"
          loading="lazy"
          scrolling="no"
          className="absolute inset-0 h-full w-full border-0"
        />
        {isFullscreen && (
          <button
            type="button"
            onClick={exitFullscreen}
            aria-label="Exit fullscreen"
            className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-[rgba(7,17,29,0.72)] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/75 backdrop-blur-sm transition-colors hover:border-[var(--color-brand)]/55 hover:text-[var(--color-brand)]"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="14" y1="10" x2="21" y2="3" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            Exit
          </button>
        )}
        <button
          type="button"
          onClick={expand}
          aria-label="Expand demo video to fullscreen"
          hidden={isFullscreen}
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
            ref={dialogRef}
            className="relative w-full max-w-[1200px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
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
                  loading="lazy"
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
