"use client";

import { useEffect, useState } from "react";
import { booking } from "@/data/siteContent";


/**
 * Mobile-only sticky booking bar. Slides up after the user scrolls past the
 * hero so the primary CTA stays reachable without scrolling back up.
 * Hidden on lg+ where the navbar CTA is always visible.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-[rgba(7,17,29,0.94)] px-4 py-3 backdrop-blur-md transition-transform duration-300 xl:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <a
          href="tel:+13655137474"
          className="btn-secondary shrink-0 border-white/[0.16] text-white"
          aria-label="Call 365 513 7474"
        >
          Call
        </a>
        <a
          href={booking.path}
          className="btn-primary flex-1 justify-center"
        >
          Book a Free Walkthrough
        </a>
      </div>
    </div>
  );
}
