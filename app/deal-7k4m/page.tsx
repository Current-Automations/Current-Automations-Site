import type { Metadata } from "next";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import TicketCard from "@/components/jobsheet/TicketCard";
import PunchButton from "@/components/jobsheet/PunchButton";
import Stamp from "@/components/jobsheet/Stamp";
import { siteContact, demoLine } from "@/data/siteContent";

// Unlisted page. Not in Navbar, Footer, sitemap, or any other route, and noindexed
// below. Two ways in: scanning the QR on a card, or a link Jarrett sends after a call.
// The slug carries a random suffix on purpose — the reader this page must never reach
// is a paying client discovering the offer they didn't get. If it leaks, change the
// four characters and reprint.
//
// See site/CLAUDE.md's CTA convention note for why this page skips the booking link:
// the reader may be standing in a driveway, not browsing.

const DEMO_NUMBER_DISPLAY = `+${demoLine.display}`;
const DEMO_NUMBER_HREF = demoLine.href;

export const metadata: Metadata = {
  title: { absolute: "The Offer | Current Automations" },
  robots: { index: false, follow: false },
  description:
    "Jarrett Goodwin, founder of Current Automations. Call the line, hear it work, and here's what it costs to start.",
};

const testSteps = [
  { time: "0:00", label: `Call ${DEMO_NUMBER_DISPLAY}` },
  { time: "0:00", label: "Say something, or just let it ring" },
  { time: "~0:30", label: "A text lands on the number you called from" },
];

export default function DealPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="OFFER SHEET"
        docCode="FORM OF-01"
        kicker="Twenty seconds to see if it's real"
        title="Call the number. Hang up. Watch what happens."
        description="I'm Jarrett. I'm local, and I build systems that stop trades and service businesses from losing jobs to missed calls and slow follow-up. Whether you got my card or we just spoke, don't take my word for any of it. The line below is live right now."
        sideAlign="start"
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
              <p className="text-sm leading-6 text-[#58524a]">
                Call this number and hang up. Watch what happens.
              </p>
              <a
                href={DEMO_NUMBER_HREF}
                className={`${jobsheet.mono} mt-3 block text-[clamp(1.6rem,4vw,2.1rem)] font-semibold text-[#181510] transition-colors hover:text-[var(--color-brand-strong)]`}
                aria-label={`Call the demo line at ${DEMO_NUMBER_DISPLAY}`}
              >
                {DEMO_NUMBER_DISPLAY}
              </a>
              <p className="mt-1.5 text-xs text-[#58524a]">Tap to call on mobile</p>
              <div className="mt-6">
                <PunchButton href={DEMO_NUMBER_HREF} label="Call the Demo Line" />
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
        code="OF-02"
        label="Get me directly"
        title="Text or call, whichever's easier."
        description="No booking widget here on purpose. If you want to talk, this is faster than a scheduler."
        tone="paper"
      >
        <TicketCard refCode="CONTACT">
          <p className="text-base leading-8 text-[#3a352c]">
            <a
              href={siteContact.phoneHref}
              className="font-semibold text-[#181510] hover:text-[var(--color-brand-strong)]"
            >
              {siteContact.phoneDisplay}
            </a>
            <span className="mx-2 text-[#a39b8c]">&middot;</span>
            <a
              href={`mailto:${siteContact.email}`}
              className="font-semibold text-[#181510] hover:text-[var(--color-brand-strong)]"
            >
              {siteContact.email}
            </a>
          </p>
          <p className="mt-4 text-sm leading-7 text-[#58524a]">
            {siteContact.directContactNote}
          </p>
        </TicketCard>
      </JobSheetSection>

      <JobSheetSection
        code="OF-03"
        label="Who's asking"
        title="One founder. Not an agency."
        tone="carbon"
      >
        <TicketCard refCode="FOUNDER">
          <p className="text-base leading-8 text-[#3a352c]">
            I&apos;m a chemical engineering and computer technology grad, uOttawa, with AI and
            machine learning coursework from an exchange at Florida International University.
            I don&apos;t know your business yet. Give me fifteen minutes to learn it, and I can
            usually tell you where it&apos;s leaking.
          </p>
          <p className={`${jobsheet.mono} mt-5 border-t border-dashed border-[rgba(255,255,255,0.18)] pt-4 text-xs leading-6 text-[#a39b8c]`}>
            B.Eng. Chemical Engineering &amp; Computer Technology, uOttawa
            <br />
            AI &amp; Machine Learning, Florida International University
          </p>
        </TicketCard>
      </JobSheetSection>

      <JobSheetSection
        code="OF-04"
        label="What it costs to start"
        title="Normally $350 to start. Yours is $50."
        description="Setup is $150, and building and training the AI on your business is another $200. I'm waiving the setup and doing the build for $50. It's not a sale price, it's a trade: I need a case study more than I need your three hundred dollars."
        tone="paper"
      >
        <TicketCard refCode="OFFER">
          <p className="text-base leading-8 text-[#3a352c]">
            Nothing touches your real line until you&apos;ve approved it yourself, in writing. I
            build it, you call a test number and hear your own system answer, and it goes live
            when you say it&apos;s ready and not before. Month to month after that, cancel whenever
            you want.
          </p>
          <p className="mt-4 text-base leading-8 text-[#3a352c]">
            The trade is the whole reason for the price. Once it&apos;s running and it&apos;s
            working, you let me write up what it did for your shop and use your name when I talk
            to other businesses. If it doesn&apos;t work, you owe me nothing, and I don&apos;t get
            to use you either way unless you&apos;re actually happy with it. Fifteen minutes,
            whenever things are dead for you.
          </p>
        </TicketCard>
      </JobSheetSection>
    </div>
  );
}
