import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import TicketCard from "@/components/jobsheet/TicketCard";
import PunchButton from "@/components/jobsheet/PunchButton";
import Stamp from "@/components/jobsheet/Stamp";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: "Lead Generation",
  description:
    "Automated lead generation pipelines for companies that sell to other businesses: corporate teams, construction management firms, and B2B service providers. Verified decision-maker contacts, qualified against your exact ICP, delivered ready for outreach.",
};

const specRows = [
  { label: "Built for", value: "Companies that sell B2B" },
  { label: "Deliverable", value: "Verified, enriched contact lists" },
  { label: "Built on", value: "Enterprise data platforms + custom code" },
  { label: "Engagement", value: "Scoped per ICP and volume" },
  { label: "First step", value: "Free 30-minute audit" },
];

const pipelineStages = [
  {
    code: "STAGE 01",
    label: "Define",
    tone: "rust" as const,
    body: "We sit down and pin your ideal customer to the wall: industry, company size, geography, and the exact roles that sign off on what you sell. The tighter the definition, the better the list.",
  },
  {
    code: "STAGE 02",
    label: "Build",
    tone: "teal" as const,
    body: "The pipeline searches across enterprise data providers, layers our own filtering code on top, and enriches every match: names, titles, verified emails, and company data that is actually current.",
  },
  {
    code: "STAGE 03",
    label: "Deliver",
    tone: "teal" as const,
    body: "You get a list your sales team can act on the same day. No scraping artifacts, no dead inboxes, no interns in the data. Then we tune the next run based on what actually converts.",
  },
];

const deliverableRows = [
  {
    code: "LG-A",
    title: "Decision-makers, not switchboards",
    body: "Every contact is a named person in a role that matters to your sale, with a verified email. Not an info@ address and a prayer.",
  },
  {
    code: "LG-B",
    title: "Qualified against your ICP, not keywords",
    body: "Matches are filtered on the criteria you actually sell against: size, industry, geography, and signals specific to your offer. A long list of wrong companies is worse than a short list of right ones.",
  },
  {
    code: "LG-C",
    title: "Enriched and current",
    body: "Company data is pulled and cross-checked at run time, not resold from a stale database. If a company changed size, moved, or died, the list reflects it.",
  },
  {
    code: "LG-D",
    title: "One run or an ongoing pipeline",
    body: "Some teams need one clean list for a campaign. Others want a steady feed of new matches every month. The pipeline runs either way, and you decide the cadence.",
  },
];

export default function LeadGenerationPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="SERVICE FILE"
        docCode="FORM LG-01"
        kicker="Lead generation"
        title={
          <>
            We find the decision-makers
            <br />
            your sales team should be talking to.
          </>
        }
        description="Automated lead generation pipelines for companies that sell to other businesses: corporate teams, construction management firms, B2B service providers. You define the ideal customer. The system finds matching companies, identifies the decision-makers, verifies their contact data, and delivers it ready for outreach. Built on the same enterprise-grade data tooling agencies charge five figures for, run and maintained for you."
        side={
          <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                PIPELINE SPEC
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                PAGE 1/1
              </span>
            </div>
            <div className="divide-y divide-[rgba(28,36,48,0.1)]">
              {specRows.map((row) => (
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

      {/* Audience gate: say who this is NOT for before selling who it is for */}
      <JobSheetSection
        code="LG-02"
        label="Read this first"
        title="This is a different service for a different audience."
        description="Most of this site is built for trades and service businesses chasing local jobs. This page is not. Lead generation pipelines work when your customers are other companies with a real digital footprint."
        tone="carbon"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className={`${jobsheet.ticket} h-full !bg-[#e8f6f1] !border-[var(--color-brand-strong)] p-7 pl-10 sm:p-8 sm:pl-11 relative`}>
              <span className={jobsheet.ticketHole} aria-hidden="true" />
              <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-strong)]`}>
                This is for you if
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "You sell to other companies, not homeowners",
                  "Corporate, construction management, or B2B services",
                  "Your sales team needs conversations, not clicks",
                  "Your current list is stale, thin, or bought from a broker",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-8 text-[#3a352c]">
                    <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-strong)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className={`${jobsheet.ticket} h-full p-7 pl-10 sm:p-8 sm:pl-11 relative`}>
              <span className={jobsheet.ticketHole} aria-hidden="true" />
              <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#58524a]`}>
                This is not for
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "Trades businesses looking for more local jobs",
                  "Anyone whose customers are individual homeowners",
                  "Teams hoping a bigger list fixes a broken offer",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-8 text-[#58524a]">
                    <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#a39a86]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-dashed border-[rgba(28,36,48,0.24)] pt-4 text-sm leading-7 text-[#58524a]">
                Running a trades business? The systems that fill your calendar
                are over here:{" "}
                <Link href="/" className="font-medium text-[var(--color-brand-strong)] hover:underline">
                  what we automate for trades
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </JobSheetSection>

      {/* Pipeline: same 3-stage ticket grammar as the homepage lifecycle */}
      <JobSheetSection
        code="LG-03"
        label="How it runs"
        title="One pipeline. Three stages. Your list at the end."
        description="No portal to learn and no software to buy. We build and run the pipeline; your team just gets the output."
        tone="ink"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {pipelineStages.map((stage, i) => (
            <Reveal key={stage.code} delay={i * 90} className={i % 2 === 0 ? jobsheet.tiltA : jobsheet.tiltB}>
              <TicketCard onDark refCode={stage.code}>
                <div className="mb-4">
                  <Stamp label={stage.label} tone={stage.tone} />
                </div>
                <p className="text-base leading-8 text-[rgba(243,237,225,0.72)]">{stage.body}</p>
              </TicketCard>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      {/* Deliverables ledger */}
      <JobSheetSection
        code="LG-04"
        label="What you get"
        title="A list your sales team will actually use."
        description="The output is not a spreadsheet of scraped names. It is a working asset, qualified and verified before it reaches you."
        tone="paper"
      >
        <div className={`${jobsheet.ticket} divide-y divide-[rgba(28,36,48,0.14)] p-0`}>
          {deliverableRows.map((row) => (
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

      {/* Where it stands + engagement terms: honest capability framing, no invented results */}
      <JobSheetSection
        code="LG-05"
        label="Where this stands"
        title="We built it for ourselves first."
        tone="carbon"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <TicketCard refCode="PROOF" className="h-full">
              <div className="mb-5">
                <Stamp label="Field-tested" tone="teal" />
              </div>
              <p className="text-base leading-8 text-[#3a352c]">
                This pipeline runs our own prospecting. We built it, tested it
                on real searches, and learned exactly where it shines and where
                it does not: it is excellent at finding decision-makers at
                established companies with a real digital footprint, and wrong
                for sole-proprietor local trades. That testing is why this page
                is aimed at companies that sell to other businesses and nothing
                else.
              </p>
              <p className="mt-6 border-t-2 border-dashed border-[rgba(28,36,48,0.24)] pt-5 text-base leading-8 text-[#3a352c]">
                No client logos on this page yet, and we will not invent any.
                What we will do is scope your ICP on a call and tell you
                honestly whether the pipeline can find your market.
              </p>
            </TicketCard>
          </Reveal>
          <Reveal delay={110}>
            <TicketCard refCode="TERMS" className="h-full">
              <div className="mb-5">
                <Stamp label="Scoped per engagement" tone="rust" />
              </div>
              <p className="text-base leading-8 text-[#3a352c]">
                Lead generation is not priced like our trades automations.
                Every pipeline is scoped to your ICP, target volume, and
                whether you want a one-time list or an ongoing feed. You get a
                fixed quote before anything is built.
              </p>
              <p className="mt-6 text-base leading-8 text-[#3a352c]">
                The scoping call is the same free 30-minute audit we run for
                every engagement. Bring a description of your ideal customer
                and we will tell you what the pipeline can do with it.
              </p>
              <div className="mt-8">
                <PunchButton href={BOOK_URL} label="Book Free Audit" external />
              </div>
            </TicketCard>
          </Reveal>
        </div>
      </JobSheetSection>

      <JobSheetCTA
        code="LG-06"
        label="Open a file"
        title="Tell us who you sell to. We will find them."
        description="A free 30-minute call. You describe the ideal customer, we scope the pipeline, and you get an honest read on whether it fits your market."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/about"
        secondaryLabel="Who You're Dealing With"
      />
    </div>
  );
}
