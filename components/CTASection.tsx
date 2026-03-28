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
        <div className="dark-card overflow-hidden rounded-[2.25rem] p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="pill-label bg-white/[0.08] text-white/70">
                {eyebrow}
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-stretch">
              <Link href={primaryHref} className="btn-primary">
                {primaryLabel}
              </Link>
              <Link
                href={secondaryHref}
                className="btn-secondary border-white/[0.16] text-white"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.06] px-4 py-4 text-sm text-white/[0.72]">
              {siteContact.walkthroughNote}
            </div>
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.06] px-4 py-4 text-sm text-white/[0.72]">
              Prefer to reach out directly? You can email or call any time.
            </div>
            <a
              href={`mailto:${siteContact.email}`}
              className="rounded-[1.35rem] border border-white/10 bg-white/[0.06] px-4 py-4 text-sm text-white/[0.72] hover:text-white"
            >
              {siteContact.email}
            </a>
            <a
              href={`tel:${siteContact.phoneHref}`}
              className="rounded-[1.35rem] border border-white/10 bg-white/[0.06] px-4 py-4 text-sm text-white/[0.72] hover:text-white"
            >
              {siteContact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
