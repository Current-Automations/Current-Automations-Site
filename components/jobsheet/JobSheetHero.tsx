import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PunchButton from "./PunchButton";
import Stamp from "./Stamp";
import styles from "./jobsheet.module.css";

type JobSheetHeroProps = {
  id?: string;
  primaryHref: string;
  secondaryHref: string;
  ctaNote?: ReactNode;
};

const pillarBoard = [
  { code: "01", name: "Call & dispatch", promise: "Every call answered", href: "/call-dispatch" },
  { code: "02", name: "Auto-replies & follow-up", promise: "No lead goes cold", href: "/follow-up" },
  { code: "03", name: "Back-office & admin", promise: "Paperwork handled", href: "/back-office" },
  { code: "04", name: "Lead generation", promise: "B2B only", href: "/lead-generation" },
];

export default function JobSheetHero({ id, primaryHref, secondaryHref, ctaNote }: JobSheetHeroProps) {
  return (
    <section id={id} className={`${styles.root} ${styles.paperTexture} relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pt-20`}>
      <div className="container-shell relative">
        <div className={`${styles.ticket} p-0 overflow-hidden`}>
          {/* Ticket masthead */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[rgba(28,36,48,0.24)] px-6 py-4 sm:px-9">
            <span className={`${styles.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
              CURRENT AUTOMATIONS
            </span>
            <span className={`${styles.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
              WORK ORDER <span className="font-semibold text-[#201c16]">#0001</span>
            </span>
          </div>

          <div className="grid gap-12 px-6 py-10 sm:px-9 sm:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center lg:py-14">
            <div>
              <p className={`${styles.mono} text-xs uppercase tracking-[0.22em] text-[#58524a]`}>
                Serving trades across the GTA
              </p>

              <h1 className={`${styles.display} mt-5 text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.04] text-[#181510]`}>
                The automation department
                <br />
                your business doesn&apos;t have.
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Stamp label="Leaks" tone="rust" />
                <span aria-hidden="true" className="text-lg text-[#58524a]">
                  &#8594;
                </span>
                <Stamp label="Plugged" tone="teal" />
              </div>

              <p className="mt-7 max-w-xl text-base leading-8 text-[#3a352c] sm:text-lg">
                We find where your business is losing time and money, then we
                build the fix: small systems that answer missed calls, chase
                quiet quotes, nudge overdue invoices, and follow up so you
                don&apos;t have to. Installed in days. We run and maintain it
                for you.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PunchButton href={primaryHref} label="Book Free Audit" external />
                <PunchButton href={secondaryHref} label="See Pricing" variant="ghost" />
              </div>

              {ctaNote ? <div className="mt-4 text-sm text-[#58524a]">{ctaNote}</div> : null}
            </div>

            <Reveal variant="scale" delay={200} className="hidden lg:block">
              <div className={`${styles.ticket} p-0 overflow-hidden`}>
                <div className="flex items-center justify-between border-b border-[var(--card-line,rgba(28,36,48,0.16))] bg-[rgba(28,36,48,0.03)] px-5 py-3">
                  <span className={`${styles.mono} text-xs tracking-widest text-[#58524a]`}>
                    SERVICE BOARD
                  </span>
                  <span className={`${styles.mono} text-xs tracking-widest text-[#58524a]`}>
                    4 PILLARS
                  </span>
                </div>
                <div className="divide-y divide-[rgba(28,36,48,0.1)]">
                  {pillarBoard.map((row) => (
                    <Link
                      key={row.code}
                      href={row.href}
                      className={`${styles.ledgerRow} group grid grid-cols-[2.2rem_1fr_auto] items-center gap-3 px-5 py-4`}
                    >
                      <span className={`${styles.mono} text-xs font-semibold text-[#58524a]`}>{row.code}</span>
                      <span>
                        <span className="block text-sm font-semibold leading-5 text-[#181510] group-hover:text-[var(--color-brand-strong)]">
                          {row.name}
                        </span>
                        <span className={`${styles.mono} mt-0.5 block text-[0.68rem] uppercase tracking-[0.14em] text-[#58524a]`}>
                          {row.promise}
                        </span>
                      </span>
                      <span aria-hidden="true" className="text-[#58524a] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-brand-strong)]">
                        &#8594;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <p className="mt-5 max-w-[26rem] text-sm leading-7 text-[#58524a]">
                Four pillars, one department. Start with the one that hurts
                most; add the rest as your business grows into them.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
