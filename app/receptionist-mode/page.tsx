import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import PunchButton from "@/components/jobsheet/PunchButton";
import {
  AI_VOICE_OVERAGE_RATE,
  FAILOVER_TIMEOUT_SECONDS,
  RECEPTIONIST_MODE_PRICE,
  VOICE_CONFIG_FEE,
  VOICE_CONFIG_FEE_RECEPTIONIST,
  VOICE_MINUTES_A_LA_CARTE,
  VOICE_MINUTES_RECEPTIONIST,
} from "@/data/pricing";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

// Deliberately unlinked from the nav, the footer and every sitemap surface.
// Receptionist Mode is sold in a conversation with a client who already runs
// AI voice, and this page is the link that conversation ends with.
export const metadata: Metadata = {
  title: { absolute: "Receptionist Mode | Current Automations" },
  description:
    "Upgrade your AI voice from overflow cover to a full front desk: 1,500 pooled minutes, a deeper agent build, and hard failover to a real number.",
  robots: { index: false, follow: false },
};

const included = [
  {
    code: "RM-01",
    heading: `${VOICE_MINUTES_RECEPTIONIST.toLocaleString()} pooled minutes a month`,
    body: `Up from ${VOICE_MINUTES_A_LA_CARTE}. Minutes are shared across your whole account no matter how many voice scenarios run. Anything past the pool bills at $${AI_VOICE_OVERAGE_RATE.toFixed(2)} CAD a minute on your next invoice, same rate as before.`,
  },
  {
    code: "RM-02",
    heading: "A deeper agent, rebuilt for a front desk",
    body: "Overflow agents are built to catch a call and take a message. A front desk has to hold a real conversation: quote the right service, know your hours and coverage area, handle the caller who changes their mind halfway through. That is a different build, done against your business rather than a template.",
  },
  {
    code: "RM-03",
    heading: `Hard failover after ${FAILOVER_TIMEOUT_SECONDS} seconds`,
    body: "If the AI does not pick up, the call forwards to a real number you nominate. When the AI is a backstop behind your team, a failure is invisible and mostly harmless. When it is the front desk, there is nothing behind it, so we put something there.",
  },
  {
    code: "RM-04",
    heading: "System Anomaly Alert monitoring, included",
    body: "The alarm that tells us the phone stopped working properly is bundled at no extra charge. If you already pay for it separately, we take that charge off.",
  },
];

export default function ReceptionistModePage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="UPGRADE"
        docCode="RM"
        kicker="For clients already running AI voice"
        title="Let it answer the phone, not just catch what you miss."
        description="Your AI voice today is overflow. Someone on your team is first to the phone and the AI picks up what they cannot get to. Receptionist Mode flips that: the AI answers, and a human is the fallback."
        side={
          <div className={`${jobsheet.ticket} p-7`}>
            <span className={`${jobsheet.mono} text-xs uppercase tracking-wider text-[#58524a]`}>
              Receptionist Mode
            </span>
            <p className={`${jobsheet.mono} mt-2 text-4xl font-semibold text-[#181510]`}>
              +${RECEPTIONIST_MODE_PRICE}
              <span className="text-base font-normal text-[#58524a]">/mo</span>
            </p>
            <p className="mt-3 text-sm leading-6 text-[#58524a]">
              Added on top of your current plan. One-time configuration is $
              {VOICE_CONFIG_FEE_RECEPTIONIST}, and the $
              {VOICE_CONFIG_FEE} you already paid comes off at checkout, so you owe $
              {VOICE_CONFIG_FEE_RECEPTIONIST - VOICE_CONFIG_FEE}.
            </p>
            <div className="mt-6">
              <PunchButton href={BOOK_URL} label="Talk to Us About Upgrading" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[#58524a]">
              We set this up with you rather than through a checkout page, so the credit for what
              you have already paid is applied correctly and your failover number is captured
              before the agent goes live.
            </p>
          </div>
        }
        sideAlign="start"
      />

      <JobSheetSection
        code="RM-02"
        label="What changes"
        title="What you actually get for the extra $350."
        description="Four things, and the reason each one exists."
        tone="carbon"
      >
        <div className={`${jobsheet.ticket} divide-y divide-[rgba(28,36,48,0.14)] p-0`}>
          {included.map((row) => (
            <Reveal key={row.code} variant="fade">
              <div
                className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-3 px-6 py-6 sm:px-8 lg:grid-cols-[7rem_minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-baseline lg:gap-8`}
              >
                <span className={`${jobsheet.mono} text-xs text-[#58524a]`}>{row.code}</span>
                <h3 className="text-lg font-semibold tracking-tight text-[#181510]">
                  {row.heading}
                </h3>
                <p className="text-base leading-8 text-[#58524a]">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="RM-03"
        label="Before you switch"
        title="This is worth doing later, not sooner."
        description="We do not sell Receptionist Mode at first checkout, and that is on purpose."
        tone="paper"
      >
        <div className={`${jobsheet.ticket} p-8`}>
          <p className="text-base leading-8 text-[#58524a]">
            Handing your phone to software is a decision worth making after you have watched it
            work, not on the strength of a sales page. Run the overflow version first. Read the call
            summaries. When you get to the point where you are letting it ring through on purpose
            because it handles the call better than a rushed pickup would, that is the signal.
          </p>
          <p className="mt-5 text-base leading-8 text-[#58524a]">
            The other honest signal is your invoice. If you are regularly paying overage on top of
            your pool, you are already using it as a receptionist and paying per-minute rates to do
            it. The upgrade is cheaper than the overage at that point.
          </p>
          <p className="mt-5 text-base leading-8 text-[#58524a]">
            Receptionist Mode does not make the AI perfect, and nothing here promises it answers
            every call correctly. That is exactly why the failover number is part of the product
            rather than an option.
          </p>
        </div>
      </JobSheetSection>
    </div>
  );
}
