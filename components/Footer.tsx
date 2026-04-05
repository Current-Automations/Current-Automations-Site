import Image from "next/image";
import Link from "next/link";
import { siteContact } from "@/data/siteContent";

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/book-a-demo#demo-request", label: "Book a Free 15-Min Call" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[var(--color-ink)] text-white">
      <div className="container-shell py-12 sm:py-14">
        <div className="mb-10 grid gap-5 rounded-[1.9rem] border border-white/[0.08] bg-white/[0.04] p-5 shadow-[0_18px_48px_rgba(2,6,23,0.16)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/[0.42]">
              Contact & Response
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/[0.68]">
              Prefer to reach out directly? You can email or call directly and
              most inquiries receive a reply within 1 business day.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <a
              href={`mailto:${siteContact.email}`}
              className="rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm text-white/[0.76] hover:text-white"
            >
              {siteContact.email}
            </a>
            <a
              href={`tel:${siteContact.phoneHref}`}
              className="rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm text-white/[0.76] hover:text-white"
            >
              {siteContact.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.6fr))]">
          <div className="max-w-2xl">
            <Link href="/" className="inline-flex items-center gap-4">
              <Image
                src="/current-automations-icon-transparent.png"
                alt="Current Automations icon"
                width={380}
                height={380}
                className="h-14 w-14 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold tracking-[0.18em] text-white">
                  CURRENT AUTOMATIONS
                </p>
                <p className="text-xs text-white/[0.46]">
                  Speed to Lead automation for service businesses
                </p>
              </div>
            </Link>
            <p className="mt-5 text-base leading-8 text-white/[0.64]">
              Helping service businesses capture missed opportunities.
            </p>
            <p className="mt-3 text-sm leading-7 text-white/[0.48]">
              Serving trades and service businesses in Ottawa, Ontario, and across Canada.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/[0.42]">
              Company
            </p>
            <div className="mt-5 grid gap-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/[0.7] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/[0.42]">
              Legal
            </p>
            <div className="mt-5 grid gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/[0.7] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/[0.42]">
              Contact
            </p>
            <div className="mt-5 grid gap-3 text-sm text-white/[0.7]">
              <a
                href={`mailto:${siteContact.email}`}
                className="hover:text-white"
              >
                {siteContact.email}
              </a>
              <a
                href={`tel:${siteContact.phoneHref}`}
                className="hover:text-white"
              >
                {siteContact.phoneDisplay}
              </a>
              <p className="text-white/[0.48]">{siteContact.responseExpectation}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-sm text-white/[0.42] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Current Automations. All rights reserved.</p>
          <p>Helping service businesses capture missed opportunities.</p>
        </div>
      </div>
    </footer>
  );
}
