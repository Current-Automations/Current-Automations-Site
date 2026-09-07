import Link from "next/link";
import type { Metadata } from "next";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import PunchButton from "@/components/jobsheet/PunchButton";
import { siteContact } from "@/data/siteContent";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Current Automations" },
  description: "That page is not on file. Here is where to go instead.",
  robots: { index: false, follow: true },
};

const routes = [
  { href: "/", code: "NF-01", label: "Home", body: "Start at the front desk." },
  {
    href: "/how-it-works",
    code: "NF-02",
    label: "How It Works",
    body: "Free walkthrough, we build it, we maintain it.",
  },
  {
    href: "/pricing",
    code: "NF-03",
    label: "Pricing",
    body: "Bundles and individual scenarios, with the numbers shown.",
  },
  {
    href: "/demo",
    code: "NF-04",
    label: "See It In Action",
    body: "Call the live line and watch the reply come back.",
  },
  {
    href: "/contact",
    code: "NF-05",
    label: "Contact",
    body: "Message the right desk, or just call.",
  },
];

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export default function NotFound() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="FILE STATUS"
        docCode="404 / NOT ON FILE"
        kicker="Missing paperwork"
        title="This page is not on file."
        description="The link is dead, mistyped, or pointed at something we have since retired. Nothing is broken on your end. Pick a route below and carry on."
        side={
          <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                STUCK?
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                CALL DIRECT
              </span>
            </div>
            <div className="px-6 py-7 text-center">
              <a
                href={`tel:${siteContact.phoneHref}`}
                className={`${jobsheet.mono} block text-[clamp(1.6rem,4vw,2.1rem)] font-semibold text-[#181510] transition-colors hover:text-[var(--color-brand-strong)]`}
              >
                {siteContact.phoneDisplay}
              </a>
              <p className="mt-3 text-sm leading-7 text-[#58524a]">
                Or email{" "}
                <a
                  href={`mailto:${siteContact.email}`}
                  className="font-medium text-[var(--color-brand-strong)] hover:underline"
                >
                  {siteContact.email}
                </a>
                .
              </p>
            </div>
          </div>
        }
      >
        <div className="mt-9 flex flex-wrap gap-4">
          <PunchButton href="/" label="Back to Home" />
          <PunchButton href={BOOK_URL} label="Book a Free Walkthrough" variant="ghost" external />
        </div>
      </JobSheetPageHero>

      <section className={`${jobsheet.root} ${jobsheet.paperTexture} relative pb-20 pt-4 sm:pb-24`}>
        <div className="container-shell relative">
          <div className="mb-1">
            <span className={jobsheet.formTab}>
              <span className={`${jobsheet.mono} ${jobsheet.formTabCode}`}>NF-00</span>
              <span className={jobsheet.formTabLabel}>Where you probably meant to go</span>
            </span>
          </div>

          <div
            className={`${jobsheet.ticket} mt-6 divide-y divide-[rgba(28,36,48,0.14)] overflow-hidden p-0`}
          >
            {routes.map((route) => (
              <Link key={route.href} href={route.href} className="block">
                <div
                  className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-2 px-6 py-6 transition-colors sm:px-8 lg:grid-cols-[6rem_14rem_minmax(0,1fr)] lg:items-baseline lg:gap-6`}
                >
                  <span className={`${jobsheet.mono} text-xs font-semibold text-[#a8452f]`}>
                    {route.code}
                  </span>
                  <p className="text-lg font-semibold tracking-tight text-[#181510]">
                    {route.label}
                  </p>
                  <p className="text-sm leading-7 text-[#58524a]">{route.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
