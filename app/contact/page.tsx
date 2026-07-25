import type { Metadata } from "next";
import { siteContact, siteContacts } from "@/data/siteContent";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the right person at Current Automations: general questions, client support, or billing.",
};

const desks = [
  {
    code: "CN-01",
    label: "General",
    email: siteContacts.general,
    body: "Questions about what we do, whether it fits your business, or where to start.",
  },
  {
    code: "CN-02",
    label: "Support",
    email: siteContacts.support,
    body: "Already working with us and need something adjusted? This is the fast lane.",
  },
  {
    code: "CN-03",
    label: "Billing",
    email: siteContacts.billing,
    body: "Invoices, refunds, card changes, or any question about what you're charged.",
  },
];

export default function ContactPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="CONTACT SLIP"
        docCode="FORM CN-01"
        kicker="Reach the right desk"
        title="Get in touch."
        description={`${siteContact.responseExpectation}. Route yourself to the right inbox below, or just call.`}
        side={
          <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                CALL DIRECT
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                FASTEST ROUTE
              </span>
            </div>
            <div className="px-6 py-7 text-center">
              <a
                href={`tel:${siteContact.phoneHref}`}
                className={`${jobsheet.mono} block text-[clamp(1.7rem,4vw,2.2rem)] font-semibold text-[#181510] transition-colors hover:text-[var(--color-brand-strong)]`}
              >
                {siteContact.phoneDisplay}
              </a>
              <p className="mt-3 text-sm leading-7 text-[#58524a]">{siteContact.directContactNote}</p>
            </div>
          </div>
        }
      />

      <section className={`${jobsheet.root} ${jobsheet.paperTexture} relative py-16 sm:py-20`}>
        <div className="container-shell relative">
          <div className="mb-1">
            <span className={jobsheet.formTab}>
              <span className={`${jobsheet.mono} ${jobsheet.formTabCode}`}>CN-02</span>
              <span className={jobsheet.formTabLabel}>Filed by department</span>
            </span>
          </div>
          <div className="max-w-3xl border-t-2 border-[rgba(28,36,48,0.28)] pt-6">
            <h2 className={`${jobsheet.display} text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.04]`}>
              Three inboxes, routed correctly.
            </h2>
          </div>

          <div className={`${jobsheet.ticket} mt-12 divide-y divide-[rgba(28,36,48,0.14)] overflow-hidden p-0`}>
            <div className="hidden border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-6 py-3 lg:grid lg:grid-cols-[6rem_10rem_minmax(0,1fr)] lg:gap-6">
              <span className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}>
                Desk
              </span>
              <span className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}>
                Address
              </span>
              <span className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}>
                What goes here
              </span>
            </div>

            {desks.map((desk) => (
              <a key={desk.email} href={`mailto:${desk.email}`} className="block">
                <div
                  className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-2 px-6 py-6 transition-colors sm:px-8 lg:grid-cols-[6rem_10rem_minmax(0,1fr)] lg:items-baseline lg:gap-6 lg:py-6`}
                >
                  <span className={`${jobsheet.mono} text-xs font-semibold text-[#a8452f]`}>{desk.code}</span>
                  <p className="text-lg font-semibold tracking-tight text-[#181510]">{desk.label}</p>
                  <div>
                    <p className={`${jobsheet.mono} break-all text-sm font-medium text-[var(--color-brand-strong)]`}>
                      {desk.email}
                    </p>
                    <p className="mt-1.5 text-sm leading-7 text-[#58524a]">{desk.body}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-6 text-sm text-[#58524a]">
            Not sure which one? Send it to General and we&apos;ll route it internally.
          </p>
        </div>
      </section>

      <JobSheetCTA
        code="CN-03"
        label="Not sure where to start?"
        title="Not sure where to start?"
        description="Book a free 30-minute audit and we will map exactly where your business is losing time and money."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/how-it-works"
        secondaryLabel="See How It Works"
      />
    </div>
  );
}
