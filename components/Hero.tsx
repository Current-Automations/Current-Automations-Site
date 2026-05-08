import Link from "next/link";
import type { ReactNode } from "react";

type HeroProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description: string;
  primaryCta: {
    href: string;
    label: string;
  };
  secondaryCta: {
    href: string;
    label: string;
  };
  ctaNote?: ReactNode;
  locationBadge?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  children?: ReactNode;
};

export default function Hero({
  id,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  ctaNote,
  locationBadge,
  stats = [],
  children,
}: HeroProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(145deg,#07111d_0%,#0d1b30_58%,#16334e_100%)] pb-20 pt-24 sm:pb-24 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_42%)]" />
      <div className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(244,214,165,0.2),_transparent_62%)] blur-3xl" />

      <div
        className={
          children
            ? "container-shell grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center"
            : "container-shell"
        }
      >
        <div className="relative">
          {eyebrow ? (
            <p className="pill-label bg-white/[0.08] text-white/70">{eyebrow}</p>
          ) : null}
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[4.35rem] lg:leading-[1.02]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={primaryCta.href} className="btn-primary">
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="btn-secondary border-white/[0.16] text-white"
            >
              {secondaryCta.label}
            </Link>
            {locationBadge ? (
              <span className="text-sm text-white/[0.48]">{locationBadge}</span>
            ) : null}
          </div>

          {ctaNote ? (
            <p className="mt-3 text-xs text-white/[0.48]">{ctaNote}</p>
          ) : null}

          {stats.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] px-5 py-5"
                >
                  <p className="text-2xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/[0.56]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {children ? <div>{children}</div> : null}
      </div>
    </section>
  );
}
