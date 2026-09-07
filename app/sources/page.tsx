import type { Metadata } from "next";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import TicketCard from "@/components/jobsheet/TicketCard";
import { caseStudies } from "@/data/siteContent";

export const metadata: Metadata = {
  alternates: { canonical: "/sources" },
  title: "Sources of Truth",
  description:
    "Every statistic, study and published result referenced anywhere on currentautomations.ca, with its origin.",
};

// Research and third-party statistics quoted elsewhere on the site. Anything
// numeric that did not come from our own operations belongs in this list.
const research = [
  {
    code: "R-01",
    claim:
      "Businesses that responded to inbound leads within five minutes were 21 times more likely to qualify them than businesses that waited thirty minutes.",
    usedOn: "Call & Dispatch",
    source: "MIT and InsideSales Lead Response Management Study",
    href: "https://resources.rework.com/libraries/lead-management/lead-response-time",
  },
  {
    code: "R-02",
    claim: "78% of customers buy from the first business that responds to them.",
    usedOn: "Call & Dispatch",
    source: "MIT and InsideSales Lead Response Management Study",
    href: "https://resources.rework.com/libraries/lead-management/lead-response-time",
  },
  {
    code: "R-03",
    claim:
      "The odds of qualifying a lead fall roughly 62% by the five minute mark and roughly 82% by ten minutes. This is what the decay chart on the Call & Dispatch page plots.",
    usedOn: "Call & Dispatch",
    source: "MIT and InsideSales Lead Response Management Study",
    href: "https://resources.rework.com/libraries/lead-management/lead-response-time",
  },
  {
    code: "R-04",
    claim:
      "55% of B2B invoices go overdue. The underlying finding is that 55% of B2B invoiced sales in the United States are currently overdue. We quote it as a general figure because the pattern holds broadly, not because the survey covered every market.",
    usedOn: "Back-Office & Admin",
    source: "Atradius Payment Practices Barometer, North America 2025",
    href: "https://group.atradius.com/knowledge-and-research/reports/b2b-payment-practices-trends-in-north-america-2025",
  },
];

// Numbers we publish about our own service. Nobody else measures these, so the
// source is us and the page says so rather than implying outside validation.
const ourOwn = [
  {
    code: "O-01",
    claim: "Most clients are live within 48 hours of signing.",
    note: "Our own delivery record. Complex builds and number ports take longer, and we say so before you sign.",
  },
  {
    code: "O-02",
    claim: "Missed-call text back fires within 60 seconds.",
    note: "Measured from our own systems. Carrier delivery time is outside our control and adds a few seconds.",
  },
  {
    code: "O-03",
    claim: "Most clients see measurable impact within 30 days.",
    note: "Our own observation across the systems we run. It depends on your call volume, so it is a pattern rather than a promise.",
  },
  {
    code: "O-04",
    claim: "Support responds within 1 to 2 business days.",
    note: "Our own service standard during regular Ontario business hours. The binding wording is clause 2.6 of the Terms of Service.",
  },
];

export default function SourcesPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="REFERENCE FILE"
        docCode="FORM SR-01"
        kicker="Sources of truth"
        title="Where every number on this site comes from."
        description="If we quote a statistic, a study, or someone else's published result anywhere on this site, it is listed here with its origin. Numbers we measure ourselves are listed separately and labelled as ours."
      />

      <JobSheetSection
        code="SR-02"
        label="Third-party research"
        title="Studies and statistics."
        description="Quoted elsewhere on the site. Each entry names the study it came from and links to it."
        tone="paper"
      >
        <div
          className={`${jobsheet.ticket} divide-y divide-[rgba(28,36,48,0.14)] overflow-hidden p-0`}
        >
          <div className="hidden border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-6 py-3 lg:grid lg:grid-cols-[5rem_minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-6">
            {["Ref", "Claim", "Source"].map((h) => (
              <span
                key={h}
                className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}
              >
                {h}
              </span>
            ))}
          </div>

          {research.map((item) => (
            <div
              key={item.code}
              className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-3 px-6 py-6 sm:px-8 lg:grid-cols-[5rem_minmax(0,1.6fr)_minmax(0,1fr)] lg:items-baseline lg:gap-6`}
            >
              <span className={`${jobsheet.mono} text-xs font-semibold text-[#a8452f]`}>
                {item.code}
              </span>
              <div>
                <p className="text-base leading-7 text-[#181510]">{item.claim}</p>
                <p className={`${jobsheet.mono} mt-2 text-xs uppercase tracking-[0.14em] text-[#58524a]`}>
                  Used on {item.usedOn}
                </p>
              </div>
              <p className="text-sm leading-7 text-[#58524a]">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--color-brand-strong)] underline underline-offset-4"
                >
                  {item.source}
                </a>
              </p>
            </div>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="SR-03"
        label="Published results from other companies"
        title="Industry examples."
        description="The case studies shown on the home page are published results from companies that are not Current Automations clients. They are included because they document what these systems do when they run properly, and each one is listed below with the publication it came from."
        tone="carbon"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((item, i) => (
            <TicketCard key={item.company} refCode={`REF-${i + 1}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-[#181510]">
                  {item.company}
                </h3>
                <span className={`${jobsheet.mono} text-xs uppercase tracking-[0.14em] text-[#58524a]`}>
                  {item.industry}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#58524a]">{item.result}</p>
              <p className="mt-4 border-t-2 border-dashed border-[rgba(28,36,48,0.24)] pt-4 text-sm leading-7 text-[#3a352c]">
                <span className="font-semibold">Source:</span> {item.source}
                {item.isClient ? null : (
                  <>
                    <br />
                    <span className="text-[#58524a]">
                      Not a Current Automations client. Published by the source above.
                    </span>
                  </>
                )}
              </p>
            </TicketCard>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="SR-04"
        label="Our own numbers"
        title="Things only we measure."
        description="These come from our own operations and contracts, so there is no outside study behind them. Listed here so the difference is obvious."
        tone="paper"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {ourOwn.map((item) => (
            <TicketCard key={item.code} refCode={item.code}>
              <p className="text-base leading-7 text-[#181510]">{item.claim}</p>
              <p className="mt-3 text-sm leading-7 text-[#58524a]">{item.note}</p>
            </TicketCard>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="SR-05"
        label="Corrections"
        title="Found something wrong?"
        description="If a number here is out of date, misattributed, or you are the owner of a study listed above and want it handled differently, tell us and we will correct or remove it."
        tone="ink"
      >
        <TicketCard onDark refCode="SR-05">
          <p className="text-base leading-8 text-[rgba(243,237,225,0.72)]">
            Email{" "}
            <a
              href="mailto:info@currentautomations.ca"
              className="font-medium text-[var(--color-brand)] underline underline-offset-4"
            >
              info@currentautomations.ca
            </a>{" "}
            with the reference number and what is wrong with it.
          </p>
        </TicketCard>
      </JobSheetSection>
    </div>
  );
}
