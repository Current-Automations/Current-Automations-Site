import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import HomeDemoVideo from "@/components/HomeDemoVideo";
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
  title: "Auto-Replies & Follow-Up",
  description:
    "No lead goes cold. Automatic replies and follow-up sequences that answer every inquiry and keep quotes moving toward a yes, without anyone on your team chasing.",
};

const quietPlaces = [
  {
    code: "FU-A",
    title: "The quote you sent Tuesday",
    body: "You priced the job, sent it over, and meant to follow up. Then the week happened. The customer was not cold, just waiting for a nudge that never came.",
  },
  {
    code: "FU-B",
    title: "The web form from last weekend",
    body: "Someone filled out your contact form Saturday morning. By the time Monday arrives, they have already heard back from two competitors.",
  },
  {
    code: "FU-C",
    title: "The job you finished and never mentioned again",
    body: "Happy customer, clean install, and then silence. No review ask, no check-in, no reason for them to remember your name next season.",
  },
];

const systems = [
  {
    code: "SYS-01",
    heading: "Instant replies to every inquiry",
    body: "Web forms, texts, and voicemails get an answer in seconds, written to sound like your business and matched to what the customer actually asked. First reply wins the job more often than best price does.",
  },
  {
    code: "SYS-02",
    heading: "Multi-touch follow-up sequences",
    body: "Leads that go quiet get a polite nudge, then another, spaced out over days. The sequence stops the moment they reply or book. Nobody on your team keeps a list.",
  },
  {
    code: "SYS-03",
    heading: "Quote chasing",
    body: "Every open estimate gets followed up automatically until it closes or the customer says no. The quotes you already wrote become the cheapest revenue you will ever recover.",
  },
  {
    code: "SYS-04",
    heading: "Post-job review requests",
    body: "A few hours after the job closes, the customer gets one text with a review link. Asked while the good impression is fresh, not three weeks later.",
  },
];

export default function FollowUpPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="SERVICE FILE"
        docCode="FORM FU-01"
        kicker="Pillar 02 · Auto-replies & follow-up"
        title={
          <>
            No lead goes cold.
            <br />
            No quote goes quiet.
          </>
        }
        description="Automatic replies and follow-up sequences that answer every inquiry in seconds and keep open quotes moving toward a decision. Tuned to sound like your business, not a robot with your logo. The sequence stops the moment they book or say no."
        side={
          <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                FOLLOW-UP LOG
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                QUOTE #214
              </span>
            </div>
            <div className="divide-y divide-[rgba(28,36,48,0.1)]">
              {[
                { time: "DAY 0", event: "Quote sent, $4,800 deck rebuild" },
                { time: "DAY 2", event: "Nudge 1: any questions on the quote?" },
                { time: "DAY 5", event: "Nudge 2: happy to walk through options" },
                { time: "DAY 6", event: "Customer replies: let's go ahead" },
              ].map((row, i, arr) => (
                <div
                  key={row.time}
                  className={`${jobsheet.ledgerRow} grid grid-cols-[4.5rem_1fr] items-baseline gap-4 px-5 py-3.5`}
                >
                  <span className={`${jobsheet.mono} text-[0.7rem] text-[#58524a]`}>{row.time}</span>
                  <span
                    className={`text-sm leading-6 ${
                      i === arr.length - 1
                        ? "font-semibold text-[var(--color-brand-strong)]"
                        : "text-[#3a352c]"
                    }`}
                  >
                    {row.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* Where leads go quiet */}
      <JobSheetSection
        code="FU-02"
        label="Where leads go quiet"
        title="Nobody loses a job on purpose. It leaks out in the quiet spots."
        description="Follow-up is the work everyone agrees matters and nobody has time to do. So it happens sometimes, for some leads, when the week allows. That inconsistency is the leak."
        tone="carbon"
      >
        <div className={`${jobsheet.ticket} divide-y divide-[rgba(28,36,48,0.14)] p-0`}>
          {quietPlaces.map((row) => (
            <Reveal key={row.code} variant="fade">
              <div
                className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-3 px-6 py-6 sm:px-8 lg:grid-cols-[7rem_minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-baseline lg:gap-8`}
              >
                <span className={`${jobsheet.mono} text-xs font-semibold text-[#a8452f]`}>{row.code}</span>
                <h3 className="text-lg font-semibold tracking-tight text-[#181510] sm:text-xl">{row.title}</h3>
                <p className="text-base leading-8 text-[#58524a]">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      {/* What runs in this lane */}
      <JobSheetSection
        code="FU-03"
        label="What runs in this lane"
        title="Four systems that never forget to follow up."
        description="Each one runs on its own or alongside the others. Start with the one that maps to where your leads actually go quiet."
        tone="paper"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {systems.map((card, i) => (
            <Reveal key={card.code} delay={i * 70} className={i % 2 === 0 ? jobsheet.tiltC : jobsheet.tiltB}>
              <TicketCard refCode={card.code}>
                <h3 className="text-2xl font-semibold tracking-tight text-[#181510]">{card.heading}</h3>
                <p className="mt-4 text-base leading-8 text-[#58524a]">{card.body}</p>
              </TicketCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm leading-7 text-[#58524a]">
          These systems run from $49 to $79/month each, or bundled in the Pro tier.{" "}
          <Link href="/pricing#a-la-carte" className="font-medium text-[var(--color-brand-strong)] hover:underline">
            See pricing &#8594;
          </Link>
        </p>
      </JobSheetSection>

      {/* Proof: the follow-up demo */}
      <JobSheetSection
        code="FU-04"
        label="Watch it chase"
        title="A quoted job goes quiet. The system does not."
        description="This demo shows exactly what happens to a quote that stops getting answered: polite, spaced-out follow-ups that keep the deal alive until it books or opts out."
        tone="ink"
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className={`${jobsheet.ticket} !border-white/15 overflow-hidden p-0`}>
              <HomeDemoVideo src="/demos/video3.html" />
            </div>
          </Reveal>
          <p className="mt-6 text-center text-sm leading-7 text-[rgba(243,237,225,0.72)]">
            Every message is written to sound like you. And if you want the final say,{" "}
            <span className="text-[#f3ede1]">you can start with approvals on</span>: nothing sends
            until you tap yes, and you hand over control when you&apos;re ready.
          </p>
        </div>
      </JobSheetSection>

      {/* Proof: the database reactivation demo */}
      <JobSheetSection
        code="FU-05"
        label="Old list, new jobs"
        title="A dormant customer list, quietly turned back into booked work."
        description="No cold-call script, no manual outreach. A steady drip to names already in your system, until a few of them reply."
        tone="ink"
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className={`${jobsheet.ticket} !border-white/15 overflow-hidden p-0`}>
              <HomeDemoVideo src="/demos/video6.html" />
            </div>
          </Reveal>
        </div>
      </JobSheetSection>

      <JobSheetCTA
        code="FU-06"
        label="Stop the quiet losses"
        title="Find out which follow-ups you're missing."
        description="A free 30-minute audit. We look at where your leads and quotes actually go quiet, and tell you which system would recover the most."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </div>
  );
}
