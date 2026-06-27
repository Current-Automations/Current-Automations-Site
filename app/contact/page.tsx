import type { Metadata } from "next";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import { siteContact, siteContacts } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the right person at Current Automations — general questions, client support, or billing.",
};

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

const contacts = [
  {
    label: "General",
    email: siteContacts.general,
    description: "Questions about what we do, or where to start.",
  },
  {
    label: "Support",
    email: siteContacts.support,
    description:
      "Already working with us and need a hand? Email support. Live chat is coming.",
  },
  {
    label: "Billing",
    email: siteContacts.billing,
    description: "Invoices, refunds, card changes, or any billing question.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(145deg,#07111d_0%,#0d1b30_58%,#16334e_100%)] pb-18 pt-24 sm:pb-20 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_42%)]" />
        <div className="container-shell">
          <p className="pill-label bg-white/[0.08] text-white/70">Contact</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Get in touch
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
            {siteContact.responseExpectation}. Use the right address below and
            we will get back to you fast.
          </p>
        </div>
      </section>

      <Section tone="muted">
        <div className="grid gap-5 sm:grid-cols-3">
          {contacts.map(({ label, email, description }) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="surface-card flex flex-col gap-3 rounded-[2rem] p-7 transition-shadow hover:shadow-lg sm:p-8"
            >
              <p className="pill-label">{label}</p>
              <p className="font-medium text-[var(--color-brand-strong)]">
                {email}
              </p>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {description}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-[var(--color-line)] pt-8">
          <a
            href={`tel:${siteContact.phoneHref}`}
            className="text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-brand-strong)]"
          >
            {siteContact.phoneDisplay}
          </a>
          <span className="text-sm text-[var(--color-muted)]">
            {siteContact.responseExpectation}.
          </span>
        </div>
      </Section>

      <CTASection
        title="Not sure where to start?"
        description="Book a free 30-minute audit and we will map exactly where your business is losing time and money."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/how-it-works"
        secondaryLabel="See how it works"
      />
    </>
  );
}
