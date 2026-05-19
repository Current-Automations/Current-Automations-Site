import Link from "next/link";
import { siteContact } from "@/data/siteContent";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export default function CTASection({
  eyebrow = "Ready when you are",
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  return (
    <section className="pb-24 pt-8 sm:pb-28">
      <div className="container-shell">
        <div className="dark-card overflow-hidden rounded-shell p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="pill-label bg-surface-dark-2 text-white/70">
                {eyebrow}
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-on-dark sm:text-lg">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-stretch">
              <Link href={primaryHref} className="btn-primary" target="_blank" rel="noopener noreferrer">
                {primaryLabel}
              </Link>
              <Link
                href={secondaryHref}
                className="btn-secondary border-line-dark text-white"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-3 border-t border-line-dark pt-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-card-sm border border-line-dark bg-surface-dark-2 px-4 py-4 text-sm text-on-dark">
              {siteContact.walkthroughNote}
            </div>
            <div className="rounded-card-sm border border-line-dark bg-surface-dark-2 px-4 py-4 text-sm text-on-dark">
              Prefer to reach out directly? You can email or call any time.
            </div>
            <a
              href={`mailto:${siteContact.email}`}
              className="rounded-card-sm border border-line-dark bg-surface-dark-2 px-4 py-4 text-sm text-on-dark hover:text-white"
            >
              {siteContact.email}
            </a>
            <a
              href={`tel:${siteContact.phoneHref}`}
              className="rounded-card-sm border border-line-dark bg-surface-dark-2 px-4 py-4 text-sm text-on-dark hover:text-white"
            >
              {siteContact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
