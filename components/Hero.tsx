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
  proof?: ReactNode;
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
  proof,
  locationBadge,
  stats = [],
  children,
}: HeroProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-b border-line-dark bg-[linear-gradient(145deg,#07111d_0%,#0d1b30_58%,#16334e_100%)] pb-20 pt-24 sm:pb-24 sm:pt-32"
    >
      <div className="glow-drift-slow pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_42%)]" />
      <div className="glow-drift pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(244,214,165,0.2),_transparent_62%)] blur-3xl" />
      <div className="glow-drift pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(46,143,214,0.14),_transparent_60%)] blur-3xl" />

      <div
        className={
          children
            ? "container-shell grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center"
            : "container-shell"
        }
      >
        <div className="relative">
          {eyebrow ? (
            <p className="pill-label bg-surface-dark-2 text-white/70">{eyebrow}</p>
          ) : null}
          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-[4.1rem] lg:leading-[1.06]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-on-dark sm:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={primaryCta.href} className="btn-primary" target="_blank" rel="noopener noreferrer">
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="btn-secondary border-line-dark text-white"
            >
              {secondaryCta.label}
            </Link>
            {locationBadge ? (
              <span className="text-sm text-white/70">{locationBadge}</span>
            ) : null}
          </div>

          {ctaNote ? (
            <p className="mt-3 text-sm text-on-dark">{ctaNote}</p>
          ) : null}

          {proof ? <div className="mt-8">{proof}</div> : null}

          {stats.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-card-md border border-line-dark bg-surface-dark-2 px-5 py-5"
                >
                  <p className="text-2xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-on-dark-muted">
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
