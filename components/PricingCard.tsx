import Link from "next/link";

type PricingCardProps = {
  name: string;
  price: string;
  billing: string;
  description: string;
  features: string[];
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
  description,
  features,
  ctaHref,
  ctaLabel,
  featured = false,
  badge,
  paymentLinkHref,
}: PricingCardProps) {
  return (
    <article
      className={
        featured
          ? "dark-card flex h-full flex-col rounded-[2rem] p-8 text-white"
          : "surface-card flex h-full flex-col rounded-[2rem] p-8 text-[var(--color-copy)]"
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
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
              featured
                ? "mt-2 text-white/[0.62]"
                : "mt-2 text-[var(--color-muted)]"
            }
          >
            {billing}
          </p>
        </div>

        {badge ? (
          <span
            className={
              featured
                ? "rounded-full border border-emerald-300/[0.24] bg-emerald-300/[0.12] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200"
                : "rounded-full border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]"
            }
          >
            {badge}
          </span>
        ) : null}
      </div>

      <p
        className={
          featured
            ? "mt-6 text-base leading-8 text-white/[0.68]"
            : "mt-6 text-base leading-8 text-[var(--color-muted)]"
        }
      >
        {description}
      </p>

      <div
        className={
          featured ? "my-8 h-px bg-white/10" : "my-8 h-px bg-[var(--color-line)]"
        }
      />

      <ul className="space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={
                featured
                  ? "mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]"
                  : "mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-brand-strong)]"
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

      <div className="mt-auto pt-8 space-y-3">
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
