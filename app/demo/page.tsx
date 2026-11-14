import type { Metadata } from "next";
import DemoVideos from "@/components/DemoVideos";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import TicketCard from "@/components/jobsheet/TicketCard";
import PunchButton from "@/components/jobsheet/PunchButton";
import Stamp from "@/components/jobsheet/Stamp";
import { demoLine, booking } from "@/data/siteContent";


export const metadata: Metadata = {
  alternates: { canonical: "/demo" },
  title: { absolute: "See It In Action | Current Automations" },
  description:
    "Call the live demo line and book a visit with the front desk of a made-up plumbing shop, plus six short demos: three of the lead-capture system, three of a house running itself.",
};

const testSteps = [
  { time: "0:00", label: `Call +${demoLine.display}` },
  { time: "0:05", label: "It answers as Demo Plumbing and tells you it is an AI" },
  { time: "~1:00", label: "Book a visit. The slot you take is gone for the next caller" },
  { time: "after", label: "A text lands on the number you called from" },
];

const shopFacts = [
  ["Shop", "Demo Plumbing. We made it up."],
  ["Hours", "Mon to Fri 8 to 5, Sat 9 to 1, closed Sunday"],
  ["Work", "Leaks, clogs, toilets, taps, water heaters, sump pumps, burst pipes"],
  ["Visits", "One hour, starting on the hour"],
  ["Prices", "None by phone. The plumber quotes on site before any work starts"],
  ["Calendar", "A real one. About a third of it is already booked"],
];

const agentRules = [
  "Look at the calendar before offering any time",
  "Offer two or three times, never the whole day",
  "Read the booking back once, then book it",
  "Water pouring out: shut the main valve first, then the soonest visit",
  "Never quote a price",
  "Say it is an AI when asked",
];

const thingsToTry = [
  "Ask for Sunday",
  "Pick a time, then change your mind halfway through",
  "Ask what it will cost, then push for a ballpark",
  "Tell it water is pouring out from under the sink",
  "Book a visit, call back, and move it to another day",
  "Ask if you are talking to a robot",
];

export default function DemoPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="TEST SLIP"
        docCode="FORM DM-01"
        kicker="Proof you can watch, or dial"
        title="Watch it run. Then dial the line and test it yourself."
        description="Six short demos below, three for a business and three for a house. The line is also live. It answers as the front desk of Demo Plumbing, a made-up shop with a real calendar. Book a visit, change your mind, try to trip it up. No signup, no form, no sales call."
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
                href={demoLine.href}
                className={`${jobsheet.mono} block text-[clamp(1.7rem,4vw,2.3rem)] font-semibold text-[#181510] transition-colors hover:text-[var(--color-brand-strong)]`}
                aria-label={`Call the demo line at ${demoLine.display}`}
              >
                +{demoLine.display}
              </a>
              <p className="mt-1.5 text-xs text-[#58524a]">Tap to call on mobile</p>
              <div className="mt-6 flex flex-col gap-3">
                <PunchButton href={demoLine.href} label="Call Now" />
                <PunchButton href={booking.path} label="Book a Free Walkthrough" variant="ghost" />
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

      <JobSheetSection
        id="the-brief"
        code="DM-01A"
        label="The brief"
        title="This is everything we gave the agent."
        description="Demo Plumbing is not a real shop. We wrote it one page of facts and a short list of rules, then connected it to a calendar. Yours would be your hours, your services and your calendar."
        tone="carbon"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <TicketCard refCode="DM-01B">
            <p className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>THE SHOP</p>
            <dl className="mt-3 divide-y divide-dashed divide-[rgba(28,36,48,0.2)]">
              {shopFacts.map(([label, value]) => (
                <div key={label} className="py-2.5">
                  <dt className={`${jobsheet.mono} text-[0.7rem] tracking-[0.14em] text-[#58524a]`}>{label.toUpperCase()}</dt>
                  <dd className="mt-0.5 text-sm leading-6 text-[#1c2430]">{value}</dd>
                </div>
              ))}
            </dl>
          </TicketCard>
          <TicketCard refCode="DM-01C">
            <p className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>THE RULES</p>
            <ul className="mt-3 divide-y divide-dashed divide-[rgba(28,36,48,0.2)]">
              {agentRules.map((rule) => (
                <li key={rule} className="py-2.5 text-sm leading-6 text-[#1c2430]">{rule}</li>
              ))}
            </ul>
          </TicketCard>
          <TicketCard refCode="DM-01D">
            <p className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>TRY TO BREAK IT</p>
            <ul className="mt-3 divide-y divide-dashed divide-[rgba(28,36,48,0.2)]">
              {thingsToTry.map((item) => (
                <li key={item} className="py-2.5 text-sm leading-6 text-[#1c2430]">{item}</li>
              ))}
            </ul>
          </TicketCard>
        </div>
        <p className="mt-6 text-sm leading-6 text-[#3a352c]">
          Use a made-up name and address if you like. A test booking clears itself after 24 hours.
        </p>
      </JobSheetSection>

      <DemoVideos />

      <JobSheetCTA
        code="DM-06"
        label="Ready to see it on yours?"
        title="Want to see this running on your line, or in your house?"
        description="Book a free walkthrough and we will find the thing worth fixing first, then show you what it would actually look like running for you. Calls, quotes and admin on the business side; lights, locks and routines on the home side."
        primaryHref={booking.path}
        primaryLabel="Book a Free Walkthrough"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </div>
  );
}
