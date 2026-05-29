"use client";

import { useEffect, useState } from "react";

const CAL_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-[rgba(7,17,29,0.94)] px-4 py-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
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
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1 justify-center"
        >
          Book Free Audit
        </a>
      </div>
    </div>
  );
}
