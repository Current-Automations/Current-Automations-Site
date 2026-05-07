import Link from "next/link";

type PricingCardProps = {
  name: string;
  price: string;
  billing: string;
  priceNote?: string;
  description: string;
  features: string[];
  footnote?: string;
  ctaHref: string;
  ctaLabel: string;
  featured?: boolean;
  badge?: string;
  paymentLinkHref?: string;
};

export default function PricingCard({
  name,
  price,
  billing,
  priceNote,
  description,
  features,
  footnote,
  ctaHref,
  ctaLabel,
  featured = false,
  badge,
  paymentLinkHref,
}: PricingCardProps) {
  return (
    <article
      className={[
        "relative flex h-full flex-col rounded-[2rem] p-8",
        featured ? "dark-card text-white" : "surface-card text-[var(--color-copy)]",
      ].join(" ")}
    >
      {badge ? (
        <span
          className={
            featured
              ? "absolute right-6 top-6 rounded-full border border-emerald-300/[0.24] bg-emerald-300/[0.12] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200"
              : "absolute right-6 top-6 rounded-full border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]"
          }
        >
          {badge}
        </span>
      ) : null}

      <p
        className={
          featured
            ? "text-sm uppercase tracking-[0.24em] text-white/[0.52]"
            : "text-sm uppercase tracking-[0.24em] text-[var(--color-muted)]"
        }
      >
        {name}
      </p>

      <h2 className="mt-4 text-4xl font-semibold tracking-tight">{price}</h2>

      <p
        className={
          featured ? "mt-2 text-sm text-white/[0.62]" : "mt-2 text-sm text-[var(--color-muted)]"
        }
      >
        {billing}
      </p>

      {priceNote ? (
        <p
          className={
            featured
              ? "mt-2 text-sm font-medium text-emerald-300"
              : "mt-2 text-sm font-medium text-[var(--color-brand-strong)]"
          }
        >
          {priceNote}
        </p>
      ) : null}

      <p
        className={[
          "mt-6 text-sm leading-7",
          featured ? "text-white/[0.68]" : "text-[var(--color-muted)]",
        ].join(" ")}
      >
        {description}
      </p>

      <div
        className={featured ? "my-7 h-px bg-white/10" : "my-7 h-px bg-[var(--color-line)]"}
      />

      <ul className="flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={
                featured
                  ? "mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand)]"
                  : "mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-strong)]"
              }
            />
            <span
              className={
                featured
                  ? "text-sm leading-7 text-white/[0.74]"
                  : "text-sm leading-7 text-[var(--color-copy)]"
              }
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {footnote ? (
        <p
          className={
            featured
              ? "mt-5 text-sm leading-7 text-white/[0.55]"
              : "mt-5 text-sm leading-7 text-[var(--color-muted)]"
          }
        >
          {footnote}
        </p>
      ) : null}

      <div className="mt-auto space-y-3 pt-8">
        <Link
          href={ctaHref}
          className={
            featured
              ? "btn-primary w-full"
              : "btn-secondary w-full bg-white text-[var(--color-copy)]"
          }
        >
          {ctaLabel}
        </Link>
        {paymentLinkHref ? (
          <a
            href={paymentLinkHref}
            target="_blank"
            rel="noopener noreferrer"
            className={
              featured
                ? "flex items-center justify-center gap-1 text-sm font-medium text-emerald-300 hover:text-white"
                : "flex items-center justify-center gap-1 text-sm font-medium text-[var(--color-brand-strong)] hover:text-[var(--color-ink)]"
            }
          >
            Get Started →
          </a>
        ) : null}
      </div>
    </article>
  );
}
