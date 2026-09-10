import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import HomeDemoVideo from "@/components/HomeDemoVideo";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetFAQ from "@/components/jobsheet/JobSheetFAQ";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import TicketCard from "@/components/jobsheet/TicketCard";
import Link from "next/link";
import { everydayAutomationsPricing } from "@/data/homePricing";
import { booking } from "@/data/siteContent";


export const metadata: Metadata = {
  alternates: { canonical: "/everyday-automations" },
  title: "Everyday Automations",
  description:
    "Phone shortcuts, NFC tags, Focus modes and location routines that make a tap or an arrival do the work of ten. Built with you over a screen share, anywhere in Canada. No hardware to buy.",
};

const heroFacts = [
  { label: "Setup", value: "Remote screen share" },
  { label: "Coverage", value: "Anywhere in Canada" },
  { label: "Hardware", value: "None needed" },
  { label: "Typical job", value: "One session" },
  { label: "From", value: everydayAutomationsPricing.from },
];

const capabilities = [
  {
    code: "01",
    label: "Shortcuts and automations",
    body: "Arrive, leave, bedtime, morning. Chains of steps that fire on a trigger instead of a tap, so one action does the work of ten.",
  },
  {
    code: "02",
    label: "NFC tags",
    body: "A sticker by the door, the bed, or in the car. Tap the phone to it and a whole routine runs. Nothing to open first.",
  },
  {
    code: "03",
    label: "Focus and Screen Time",
    body: "Work, sleep and family modes that silence the right apps and people at the right times. Limits for the kids that hold without a fight every night.",
  },
  {
    code: "04",
    label: "Location and proximity",
    body: "Things happen because the phone arrived or left. Heat drops when the house empties, the porch light is on before you pull in.",
  },
  {
    code: "05",
    label: "Voice routines",
    body: "One phrase to Siri, Alexa or Google runs the whole chain. Say goodnight and it locks up, kills the lights, and sets the alarm.",
  },
];

const remoteSteps = [
  {
    code: "01",
    title: "You book a time",
    body: "Pick a slot and tell us roughly what you want the phone to handle: mornings, leaving the house, the kids' screen time, all of it.",
  },
  {
    code: "02",
    title: "We build it with you on the call",
    body: "Screen share on. We set up the shortcuts, tags and Focus modes on your phone while you watch, so you know how to change them later.",
  },
  {
    code: "03",
    title: "It runs from then on",
    body: "The routines fire on their own. If you want one changed or a new one added, that is a quick call, not a rebuild.",
  },
];

const demos = [
  {
    src: "/demos/video8.html",
    title: "One tag, and the house is set for the night",
    description:
      "A tag by the bed. Tap it on the way in and the downstairs lights, the locks, the thermostat and the phone all settle for the night.",
  },
  {
    src: "/demos/video9.html",
    title: "You leave, and it locks up behind you",
    description:
      "The phone crosses the driveway. Lights off, heat to eco, garage checked, doors locked. No checklist, no going back to look.",
  },
];

const faqItems = [
  {
    question: "Do I need an iPhone?",
    answer:
      "Most of this is strongest on iPhone, where Shortcuts and Focus modes go deepest. Android has its own version through Google and Samsung routines, and we build on whatever you carry. If the house has both, we set up each phone.",
  },
  {
    question: "Is this the same as the smart home installs?",
    answer:
      "No. Smart home is hardware we come out and fit: lights, locks, thermostats. This is the phone side, the shortcuts and routines that tie things together or run on their own. You can have one without the other, and they work well together.",
  },
  {
    question: "What can actually run without any smart devices?",
    answer:
      "Plenty. Focus and Screen Time, location reminders, morning and commute routines, NFC tags that open apps or send a text, backup and photo cleanup. The phone alone does a lot before a single bulb is involved.",
  },
  {
    question: "Will these break when my phone updates?",
    answer:
      "Rarely, and when a big update moves something we tell you and it is a quick call to fix. We do not leave you to find out a routine stopped firing.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most setups are one session. A big one, whole-family screen time plus every daily routine, might run to two.",
  },
  {
    question: "Can you set up my parent's phone if I am not there?",
    answer:
      "Yes. We do it over a screen share with whoever holds the phone. Same remote setup, just on their device instead of yours.",
  },
];

export default function EverydayAutomationsPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="HOME FILE"
        docCode="FORM EA-01"
        kicker="Everyday automations, remote anywhere in Canada"
        title="Your phone already runs your house. It just needs setting up."
        description="Shortcuts, tags and routines that make a tap or an arrival do the work of ten. We build them with you over a screen share, anywhere in Canada. No hardware to buy."
        sideAlign="start"
        side={
          <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                JOB SUMMARY
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                NO VISIT
              </span>
            </div>
            <div className="divide-y divide-[rgba(28,36,48,0.1)]">
              {heroFacts.map((row) => (
                <div
                  key={row.label}
                  className={`${jobsheet.ledgerRow} grid grid-cols-[7rem_1fr] items-baseline gap-4 px-5 py-3.5`}
                >
                  <span className={`${jobsheet.mono} text-[0.7rem] uppercase tracking-[0.14em] text-[#58524a]`}>
                    {row.label}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-[#181510]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <JobSheetSection
        code="EA-02"
        label="What we set up"
        title="Five things the phone can do on its own."
        description="None of this needs a smart home behind it. It is the phone doing what it is already capable of, wired up so it actually happens."
        tone="carbon"
      >
        <div
          className={`${jobsheet.ticket} divide-y divide-[rgba(28,36,48,0.14)] overflow-hidden p-0`}
        >
          <div className="hidden border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-6 py-3 lg:grid lg:grid-cols-[5rem_16rem_minmax(0,1fr)] lg:gap-6">
            {["Ref", "What", "What it does"].map((h) => (
              <span
                key={h}
                className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}
              >
                {h}
              </span>
            ))}
          </div>

          {capabilities.map((item) => (
            <div
              key={item.code}
              className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-2 px-6 py-6 sm:px-8 lg:grid-cols-[5rem_16rem_minmax(0,1fr)] lg:items-baseline lg:gap-6`}
            >
              <span className={`${jobsheet.mono} text-xs font-semibold text-[#a8452f]`}>
                {item.code}
              </span>
              <p className="text-lg font-semibold tracking-tight text-[#181510]">{item.label}</p>
              <p className="text-sm leading-7 text-[#58524a]">{item.body}</p>
            </div>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="EA-03"
        label="See one run"
        title="A tap, and the house catches up."
        description="Two of the routines we set up most, running start to finish. Real phone-shot versions replace these as we film them."
        tone="ink"
      >
        <div className="grid gap-8 sm:grid-cols-2">
          {demos.map((demo, i) => (
            <Reveal key={demo.src} delay={i * 100}>
              <div className="flex flex-col">
                <div className="mb-4">
                  <h3 className={`${jobsheet.display} mb-1.5 text-xl text-[#f3ede1] sm:text-2xl`}>
                    {demo.title}
                  </h3>
                  <p className="text-sm leading-7 text-[rgba(243,237,225,0.62)]">{demo.description}</p>
                </div>
                <div className={`${jobsheet.ticket} !border-white/15 overflow-hidden p-0`}>
                  <HomeDemoVideo src={demo.src} title={demo.title} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="EA-04"
        label="How it goes"
        title="It is done over a screen share. No one comes to the house."
        description="This is the one home offering we do anywhere in Canada. You book a time, we get on a call, and we build the routines with you on your own phone while you watch."
        tone="paper"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {remoteSteps.map((step) => (
            <TicketCard key={step.code} refCode={step.code}>
              <div className="flex items-baseline gap-3">
                <span className={`${jobsheet.mono} text-sm font-semibold text-[#a8452f]`}>
                  {step.code}
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-[#181510]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#58524a]">{step.body}</p>
            </TicketCard>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="EA-05"
        label="For someone else"
        title="Set it up on someone else's phone, not just yours."
        description="Set up a parent's or a partner's phone so the automation just happens for them, no learning curve, nothing new to remember. We do it once, over a screen share, and it is done."
        tone="carbon"
      >
        <TicketCard refCode="GIFT">
          <p className="max-w-3xl text-base leading-8 text-[#3a352c]">
            It is the same remote session, run with whoever holds the phone. The routines fire on their own from then on, so there is nothing for them to learn and nothing for you to keep fixing on visits.
          </p>
        </TicketCard>
      </JobSheetSection>

      <JobSheetFAQ
        code="EA-06"
        label="Before you ask"
        title="The questions people actually have."
        items={faqItems}
        tone="paper"
      />

      <div className="container-shell py-12 text-center">
        <p className="text-sm leading-7 text-[#58524a]">
          Most setups run {everydayAutomationsPricing.range} one-time, {everydayAutomationsPricing.note}.{" "}
          <Link href="/pricing#home-pricing" className="font-medium text-[var(--color-brand-strong)] hover:underline">
            See full pricing&nbsp;&#8594;
          </Link>
        </p>
      </div>

      <JobSheetCTA
        code="EA-07"
        label="Book it"
        title="Tell us what the phone should be handling."
        description={`A quick screen-share, no visit needed. Most setups run ${everydayAutomationsPricing.range} one-time, ${everydayAutomationsPricing.note}.`}
        primaryHref={booking.path}
        primaryLabel="Book a Free Walkthrough"
        secondaryHref="/smart-home"
        secondaryLabel="See Smart Home Setup"
      />
    </div>
  );
}
