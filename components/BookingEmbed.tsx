"use client";

import { useState } from "react";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import { booking } from "@/data/siteContent";

/**
 * Google's appointment schedule, embedded so nobody has to leave the site to
 * pick a slot.
 *
 * Click-to-load on purpose. The iframe is Google's and sets Google's cookies,
 * and everything else on this site that sets a cookie is gated behind the
 * consent banner (privacy clause 11). Gating this one the same way would mean
 * anyone who pressed Decline could not book at all, which is the wrong trade on
 * the only conversion path. So it waits for a deliberate click instead: nothing
 * third-party loads until someone asks for it, and nobody is ever blocked.
 *
 * The direct link stays visible in both states. If the iframe is blocked by an
 * extension or a locked-down browser, the booking page is still one tap away.
 */
export default function BookingEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
      <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
        <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
          APPOINTMENT SLIP
        </span>
        <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
          30 MIN
        </span>
      </div>

      {loaded ? (
        <iframe
          src={booking.embedUrl}
          title="Book a free walkthrough"
          className="block h-[clamp(46rem,90vh,58rem)] w-full border-0"
          loading="lazy"
        />
      ) : (
        <div className="px-6 py-14 text-center sm:px-10">
          <p className={`${jobsheet.display} text-[clamp(1.4rem,3vw,1.9rem)] text-[#181510]`}>
            Pick a time that suits you.
          </p>
          <p className="mx-auto mt-4 max-w-md text-base leading-8 text-[#58524a]">
            Real openings, straight from our calendar. Choose a slot and the
            confirmation lands in your inbox with the meeting link.
          </p>

          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setLoaded(true)} className={jobsheet.punchButton}>
              Load the booking calendar
            </button>
          </div>

          <p className="mx-auto mt-6 max-w-md text-xs leading-6 text-[#58524a]">
            The calendar is Google&apos;s and sets Google&apos;s cookies. Nothing
            from them loads until you press the button.
          </p>
        </div>
      )}

      <div className="border-t-2 border-dashed border-[rgba(28,36,48,0.24)] px-6 py-4 text-center">
        <p className="text-xs leading-6 text-[#58524a]">
          Trouble loading it?{" "}
          <a
            href={booking.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--color-brand-strong)] hover:underline"
          >
            Open the booking page in a new tab
          </a>
          .
        </p>
      </div>
    </div>
  );
}
