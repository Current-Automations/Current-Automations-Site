import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import TicketCard from "@/components/jobsheet/TicketCard";
import Stamp from "@/components/jobsheet/Stamp";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: {
    absolute: "About | Current Automations",
  },
  description:
    "Current Automations is an AI systems company for trades and service businesses across Ontario. We start with a free consultation, find your highest-impact opportunity, and build the systems that recover it.",
};

const leaks = [
  {
    code: "LEAK-01",
    title: "Missed calls",
    description:
      "Most callers will not leave a voicemail or wait for a callback. If no one responds within minutes, they move on to the next business on the list.",
  },
  {
    code: "LEAK-02",
    title: "Slow follow-up",
    description:
      "The longer a lead waits for a response, the colder it gets. Manual follow-up cannot keep pace with how fast buying intent fades.",
  },
  {
    code: "LEAK-03",
    title: "Manual admin",
    description:
      "Quotes, scheduling, reminders, and inbox cleanup eat hours every week that should not require the owner every single time.",
  },
];

export default function AboutPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="COMPANY FILE"
        docCode="FORM AB-01"
        kicker="Who we are"
        title={
          <>
            We find where your business is losing money.
            <br />
            Then we fix it.
          </>
        }
        description="Current Automations is an AI systems company for trades and service businesses across Ontario. We start with a free consultation, find your highest-impact opportunity, and build the systems that recover it."
        side={
          <TicketCard refCode="WHY-01">
            <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#58524a]`}>
              Why this exists
            </p>
            <div className="mt-5 space-y-3">
              {[
                "Built for business owners who are great at their craft and do not have time to figure out technology.",
                "Designed to find where time and money are leaking, then fix it with AI.",
                "Focused on practical systems that run quietly and reliably without adding complexity.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded border border-[rgba(28,36,48,0.16)] bg-[rgba(28,36,48,0.03)] px-4 py-3 text-sm leading-7 text-[#3a352c]"
                >
                  {item}
                </div>
              ))}
            </div>
          </TicketCard>
        }
      />

      <JobSheetSection
        code="AB-02"
        label="Where the money leaks"
        title="Most service businesses are losing revenue in the same three places."
        tone="carbon"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {leaks.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className={i % 2 === 0 ? jobsheet.tiltA : jobsheet.tiltB}>
              <TicketCard refCode={item.code}>
                <h3 className="text-2xl font-semibold tracking-tight text-[#181510]">{item.title}</h3>
                <p className="mt-4 text-base leading-8 text-[#58524a]">{item.description}</p>
              </TicketCard>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="AB-03"
        label="How we fix it"
        title="We audit your business, find the highest-impact opportunity, then build the system that solves it."
        tone="ink"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <Reveal>
            <TicketCard onDark refCode="METHOD">
              <p className="text-base leading-8 text-[rgba(243,237,225,0.72)]">
                Every engagement starts with a free audit. We ask about your business, find where the biggest opportunities are, and recommend one system that would have the most immediate impact.
              </p>
              <p className="mt-5 text-base leading-8 text-[rgba(243,237,225,0.72)]">
                Then we install it, tune it, and hand you a working system. You don&apos;t touch the tech. You just see the results.
              </p>
            </TicketCard>
          </Reveal>

          <Reveal delay={110}>
            <TicketCard onDark refCode="SCOPE">
              <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(243,237,225,0.4)]`}>
                What we handle
              </p>
              <div className="mt-5 space-y-3">
                {[
                  "A free audit to find your highest-impact opportunity",
                  "Full build and configuration, no technical work on your end",
                  "Ongoing maintenance so the system keeps running reliably",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded border border-white/15 bg-white/[0.04] px-4 py-3"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-sm leading-7 text-[rgba(243,237,225,0.82)]">{item}</p>
                  </div>
                ))}
              </div>
            </TicketCard>
          </Reveal>
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="AB-04"
        label="The guy behind it"
        title="About the founder."
        tone="paper"
      >
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-stretch">
          <Reveal className={jobsheet.tiltB}>
            <TicketCard refCode="ID" className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(20,150,118,0.08)] text-[#181510]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path
                    d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 7.5a6 6 0 0 1 12 0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-5 text-lg font-semibold tracking-tight text-[#181510]">
                Jarrett Goodwin
              </p>
              <p className={`${jobsheet.mono} mt-2 text-xs leading-6 text-[#58524a]`}>
                B.Eng. Chemical Engineering &amp; Computer Technology, uOttawa
              </p>
            </TicketCard>
          </Reveal>

          <Reveal delay={110}>
            <TicketCard refCode="STORY">
              <p className="text-base leading-8 text-[#3a352c]">
                I started Current Automations after seeing how often good trades and service businesses were leaking revenue to unanswered phones, forgotten follow&#8209;ups, and manual admin work. With a background in industrial operations and applied AI, I build practical systems that answer every lead, follow up reliably, and keep owners out of the inbox.
              </p>
              <p className="mt-6 text-base leading-8 text-[#3a352c]">
                My approach is hands&#8209;on: we map your real&#8209;world workflow, pick the highest&#8209;impact problem, then build and maintain the automation around it. No buzzwords, no clunky dashboards, just lean systems that pay for themselves in saved time and recovered jobs.
              </p>
            </TicketCard>
          </Reveal>
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="AB-05"
        label="Not a one-time install"
        title="I am not here to sell you a tool and disappear."
        tone="carbon"
      >
        <Reveal>
          <TicketCard refCode="TERMS">
            <div className="mb-5">
              <Stamp label="Ongoing" tone="teal" />
            </div>
            <div className="space-y-6">
              <p className="text-base leading-8 text-[#3a352c]">
                Most software companies hand you a login and leave you to figure it out. I work differently.
              </p>
              <p className="text-base leading-8 text-[#3a352c]">
                Before I build anything, I spend time understanding how your business actually runs day to day: the calls, the estimates, and the spots where work falls through the cracks. From there, we design a system that fits into your existing process instead of forcing you into a generic software workflow.
              </p>
              <p className="text-base leading-8 text-[#3a352c]">
                Every system I build is maintained on my side. If something needs adjusting, you reach out and it gets handled. As your business changes, I review performance with you, spot new bottlenecks, and either refine what is in place or build the next piece. You get one point of contact who knows your setup inside and out.
              </p>
              <p className="border-t-2 border-dashed border-[rgba(28,36,48,0.24)] pt-5 text-base font-semibold leading-8 text-[#181510]">
                The relationship is ongoing, not a one-time transaction.
              </p>
            </div>
          </TicketCard>
        </Reveal>
      </JobSheetSection>

      <JobSheetCTA
        code="AB-06"
        label="Ready to find your leaks?"
        title="Find out where your business is leaving money behind."
        description="We audit your business, find the highest-impact opportunities, and build the systems that fix them."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </div>
  );
}
