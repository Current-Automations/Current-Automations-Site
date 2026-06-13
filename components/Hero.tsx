import Link from "next/link";
import type { ReactNode } from "react";
import CursorField from "@/components/motion/CursorField";
import Reveal from "@/components/Reveal";

type HeroProps = {
  id?: string;
  eyebrow?: string;
  titleLines: string[];
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
  ticker?: string[];
  children?: ReactNode;
};

export default function Hero({
  id,
  eyebrow,
  titleLines,
  description,
  primaryCta,
  secondaryCta,
  ctaNote,
  proof,
  ticker,
  children,
}: HeroProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-b border-line-dark bg-[linear-gradient(165deg,#04091a_0%,#081424_55%,#0d2236_100%)]"
    >
      <CursorField className="relative">
        {/* Dispatch-board grid + cursor-reactive spotlight */}
        <div aria-hidden="true" className="bg-grid-dark absolute inset-0" />
        <div aria-hidden="true" className="cursor-spotlight" />

        <div
          className={
            children
              ? "container-shell relative grid gap-14 pb-20 pt-20 sm:pt-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center lg:pb-24"
              : "container-shell relative pb-20 pt-20 sm:pt-28 lg:pb-24"
          }
        >
          <div className="relative">
            {eyebrow ? (
              <Reveal variant="fade">
                <p className="kicker text-on-dark-muted">
                  <span className="kicker-num" aria-hidden="true">
                    01
                  </span>
                  <span>{eyebrow}</span>
                  <span aria-hidden="true" className="kicker-rule rule-draw" />
                </p>
              </Reveal>
            ) : null}

            <h1 className="display-hero mt-8 text-white">
              {titleLines.map((line, i) => (
                <Reveal key={line} variant="clip" delay={i * 140}>
                  <span className="block">{line}</span>
                </Reveal>
              ))}
            </h1>

            <Reveal variant="fade" delay={420}>
              <p className="mt-7 max-w-2xl text-base leading-8 text-on-dark sm:text-lg">
                {description}
              </p>
            </Reveal>

            <Reveal variant="up" delay={520}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href={primaryCta.href}
                  className="btn-primary px-7 py-4 text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {primaryCta.label}
                </Link>
                <Link
                  href={secondaryCta.href}
                  className="btn-secondary border-line-dark text-white"
                >
                  {secondaryCta.label}
                </Link>
              </div>
              {ctaNote ? (
                <p className="mt-4 text-sm text-on-dark">{ctaNote}</p>
              ) : null}
            </Reveal>

            {proof ? (
              <Reveal variant="up" delay={620}>
                <div className="par-1 mt-10">{proof}</div>
              </Reveal>
            ) : null}
          </div>

          {children ? (
            <Reveal variant="scale" delay={300}>
              <div className="par-2">{children}</div>
            </Reveal>
          ) : null}
        </div>

        {ticker?.length ? (
          <div
            className="relative overflow-hidden border-t border-line-dark py-4"
            aria-hidden="true"
          >
            <div className="ticker-track gap-12 pr-12">
              {[...ticker, ...ticker].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="flex shrink-0 items-center gap-12 text-xs font-semibold uppercase tracking-[0.3em] text-on-dark-faint"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-[var(--color-brand)]/50" />
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </CursorField>
    </section>
  );
}
