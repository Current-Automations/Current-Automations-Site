import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import DemoVideos from "@/components/DemoVideos";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import TicketCard from "@/components/jobsheet/TicketCard";
import PunchButton from "@/components/jobsheet/PunchButton";
import Stamp from "@/components/jobsheet/Stamp";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: { absolute: "See It In Action | Current Automations" },
  description:
    "Three demos. Under three minutes. Watch how Current Automations captures missed calls, covers every lead channel, and keeps deals alive, automatically.",
};

const steps = [
  {
    number: "STEP 01",
    step: "Call the number",
    description:
      "Dial +1 365 601 7474 from any phone. Let it ring and go to voicemail. Do not leave a message.",
  },
  {
    number: "STEP 02",
    step: "Wait 60 seconds",
    description:
      "Within seconds of the missed call, the automation fires. You will receive a text to the number you called from.",
  },
  {
    number: "STEP 03",
    step: "Reply to the text",
    description:
      "The system will ask a few qualifying questions: name, address, what you need. This is the lead capture flow your customers will go through.",
  },
  {
    number: "STEP 04",
    step: "That is the full experience",
    description:
      "Every caller who misses your business goes through this same flow. You get a notification with their details so your team can follow up prepared.",
  },
];

export default function DemoPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="LIVE DEMO"
        docCode="FORM DM-01"
        kicker="Watch it happen"
        title="See it in action."
        description="Three demos. Under three minutes. You'll know exactly what we do."
      />

      {/* Video demos keep their existing dark treatment for continuity with the site's dark chrome */}
      <DemoVideos />

      <JobSheetSection
        code="DM-02"
        label="Proof you can dial right now"
        title="The demo line is live right now."
        description="Call, let it go to voicemail, and watch what happens next. The text you get back is the product."
        tone="paper"
      >
        <div className="mx-auto max-w-2xl">
          <Reveal variant="scale">
            <TicketCard refCode="CALL-ME" className="text-center">
              <div className="mb-3 inline-block">
                <Stamp label="Live demo line" tone="teal" />
              </div>
              <a
                href="tel:+13656017474"
                className={`${jobsheet.mono} block text-[clamp(2rem,4vw,2.8rem)] font-semibold text-[#181510] transition-colors hover:text-[var(--color-brand-strong)]`}
                aria-label="Call the demo line at 1 365 601 7474"
              >
                +1 365 601 7474
              </a>
              <p className="mt-2 text-xs text-[#58524a]">Tap to call on mobile</p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <PunchButton href="tel:+13656017474" label="Call Now" />
                <PunchButton href={BOOK_URL} label="Book Free Audit" variant="ghost" external />
              </div>
              <p className="mt-5 text-sm text-[#58524a]">
                No signup required. Works on any phone. Takes 30 seconds.
              </p>
            </TicketCard>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, i) => (
              <Reveal key={item.step} delay={i * 90} className={i % 2 === 0 ? jobsheet.tiltA : jobsheet.tiltC}>
                <TicketCard refCode={item.number}>
                  <h3 className="mt-2 text-base font-semibold tracking-tight text-[#181510]">
                    {item.step}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#58524a]">{item.description}</p>
                </TicketCard>
              </Reveal>
            ))}
          </div>
        </div>
      </JobSheetSection>
    </div>
  );
}
