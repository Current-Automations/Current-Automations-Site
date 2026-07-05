import type { ReactNode } from "react";
import styles from "./jobsheet.module.css";

type JobSheetPageHeroProps = {
  docLabel: string;
  docCode: string;
  kicker?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  side?: ReactNode;
};

/**
 * Interior-page hero: the same ticket masthead the pricing page established
 * (paper canvas, dashed masthead row, display headline), generalized so every
 * route opens on its own piece of filed paperwork.
 */
export default function JobSheetPageHero({
  docLabel,
  docCode,
  kicker,
  title,
  description,
  children,
  side,
}: JobSheetPageHeroProps) {
  return (
    <section className={`${styles.root} ${styles.paperTexture} relative pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pt-20`}>
      <div className="container-shell relative">
        <div className={`${styles.ticket} overflow-hidden p-0`}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[rgba(28,36,48,0.24)] px-6 py-4 sm:px-9">
            <span className={`${styles.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
              CURRENT AUTOMATIONS
            </span>
            <span className={`${styles.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
              {docLabel} <span className="font-semibold text-[#201c16]">{docCode}</span>
            </span>
          </div>

          <div
            className={`px-6 py-10 sm:px-9 sm:py-12 lg:py-14 ${
              side
                ? "grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center"
                : ""
            }`}
          >
            <div>
              {kicker ? (
                <p className={`${styles.mono} text-xs uppercase tracking-[0.22em] text-[#58524a]`}>
                  {kicker}
                </p>
              ) : null}
              <h1
                className={`${styles.display} max-w-3xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] text-[#181510] ${
                  kicker ? "mt-5" : ""
                }`}
              >
                {title}
              </h1>
              {description ? (
                <p className="mt-7 max-w-2xl text-base leading-8 text-[#3a352c] sm:text-lg">
                  {description}
                </p>
              ) : null}
              {children}
            </div>
            {side ? <div>{side}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
