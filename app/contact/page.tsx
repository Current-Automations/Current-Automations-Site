import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { siteContact, siteContacts } from "@/data/siteContent";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import TicketCard from "@/components/jobsheet/TicketCard";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the right person at Current Automations — general questions, client support, or billing.",
};

const contacts = [
  {
    code: "CN-DESK-1",
    label: "General",
    email: siteContacts.general,
    description: "Questions about what we do, or where to start.",
  },
  {
    code: "CN-DESK-2",
    label: "Support",
    email: siteContacts.support,
    description:
      "Already working with us and need a hand? Email support. Live chat is coming.",
  },
  {
    code: "CN-DESK-3",
    label: "Billing",
    email: siteContacts.billing,
    description: "Invoices, refunds, card changes, or any billing question.",
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
        description={`${siteContact.responseExpectation}. Use the right address below and we will get back to you fast.`}
      />

      <JobSheetSection
        code="CN-02"
        label="Filed by department"
        title="Three inboxes, routed correctly."
        tone="paper"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {contacts.map((contact, i) => (
            <Reveal key={contact.email} delay={i * 70} className={i % 2 === 0 ? jobsheet.tiltA : jobsheet.tiltB}>
              <a href={`mailto:${contact.email}`} className="block h-full">
                <TicketCard refCode={contact.code} className="h-full transition-shadow hover:shadow-lg">
                  <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-strong)]`}>
                    {contact.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-tight text-[#181510]">
                    {contact.email}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#58524a]">{contact.description}</p>
                </TicketCard>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6 border-t-2 border-dashed border-[rgba(28,36,48,0.24)] pt-8">
          <a
            href={`tel:${siteContact.phoneHref}`}
            className={`${jobsheet.mono} text-sm font-semibold text-[#181510] hover:text-[var(--color-brand-strong)]`}
          >
            {siteContact.phoneDisplay}
          </a>
          <span className="text-sm text-[#58524a]">{siteContact.responseExpectation}.</span>
        </div>
      </JobSheetSection>

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
