import type { Metadata } from "next";
import DemoVideos from "@/components/DemoVideos";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import PunchButton from "@/components/jobsheet/PunchButton";
import Stamp from "@/components/jobsheet/Stamp";
import FormTab from "@/components/jobsheet/FormTab";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: { absolute: "See It In Action | Current Automations" },
  description:
    "Call the live demo line and watch the text come back within seconds, plus three short demos of the full lead-capture system.",
};

const testSteps = [
  { time: "0:00", label: "Call +1 365 601 7474" },
  { time: "0:00", label: "Say something if you want, or just let it ring" },
  { time: "~0:30", label: "A text lands on the number you called from" },
  { time: "any time", label: "Reply and the qualifying questions start" },
];

export default function DemoPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="TEST SLIP"
        docCode="FORM DM-01"
        kicker="Proof you can dial right now"
        title="Call it yourself. The text you get back is the product."
        description="No signup, no form, no sales call. Say something if you want, or just let it ring. Either way, watch what your customers would see after hours."
        side={
          <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                LIVE LINE
              </span>
              <span className="inline-flex">
                <Stamp label="Active" tone="teal" />
              </span>
            </div>
            <div className="px-6 py-7 text-center">
              <a
                href="tel:+13656017474"
                className={`${jobsheet.mono} block text-[clamp(1.7rem,4vw,2.3rem)] font-semibold text-[#181510] transition-colors hover:text-[var(--color-brand-strong)]`}
                aria-label="Call the demo line at 1 365 601 7474"
              >
                +1 365 601 7474
              </a>
              <p className="mt-1.5 text-xs text-[#58524a]">Tap to call on mobile</p>
              <div className="mt-6 flex flex-col gap-3">
                <PunchButton href="tel:+13656017474" label="Call Now" />
                <PunchButton href={BOOK_URL} label="Book Free Audit" variant="ghost" external />
              </div>
            </div>
            <div className="divide-y divide-[rgba(28,36,48,0.1)] border-t-2 border-dashed border-[rgba(28,36,48,0.24)]">
              {testSteps.map((step) => (
                <div
                  key={step.label}
                  className={`${jobsheet.ledgerRow} grid grid-cols-[4rem_1fr] items-baseline gap-3 px-5 py-3`}
                >
                  <span className={`${jobsheet.mono} text-[0.7rem] text-[#58524a]`}>{step.time}</span>
                  <span className="text-sm leading-6 text-[#3a352c]">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* Video demos keep their existing dark treatment and built-in intro copy for
          continuity with the site's dark chrome; just file it under a form code
          so it still reads as part of the same paperwork system. */}
      <div className={`${jobsheet.root} ${jobsheet.inkTexture} relative pt-14 sm:pt-16`}>
        <div className="container-shell relative">
          <FormTab code="DM-02" label="Three demos, three minutes" onDark />
        </div>
      </div>
      <DemoVideos />

      <JobSheetCTA
        code="DM-03"
        label="Ready to see your own numbers?"
        title="Want to see this running on your business's own call flow?"
        description="Book a free audit and we will map exactly where your calls, quotes, and admin are leaking, then show you what running the system on your line would look like."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </div>
  );
}
