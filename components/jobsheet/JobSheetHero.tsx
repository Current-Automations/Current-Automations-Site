import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import DispatchLog from "./DispatchLog";
import PunchButton from "./PunchButton";
import Stamp from "./Stamp";
import styles from "./jobsheet.module.css";

type JobSheetHeroProps = {
  id?: string;
  primaryHref: string;
  secondaryHref: string;
  ctaNote?: ReactNode;
};

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

              <h1 className={`${styles.display} mt-5 text-[clamp(2.1rem,5.4vw,4rem)] leading-[1.02] text-[#181510]`}>
                A furnace dies at 9pm.
                <br />
                The call hits voicemail.
                <br />
                Someone else books the job.
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Stamp label="Missed call" tone="rust" />
                <span aria-hidden="true" className="text-lg text-[#58524a]">
                  &#8594;
                </span>
                <Stamp label="Recovered" tone="teal" />
              </div>

              <p className="mt-7 max-w-xl text-base leading-8 text-[#3a352c] sm:text-lg">
                The next contractor who picks up wins the work. We install a
                system that texts every missed caller back in seconds,
                captures the job, and books it. We install it, tune it, and
                hand you a working system. You don&apos;t touch the tech.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PunchButton href={primaryHref} label="Book Free Audit" external />
                <PunchButton href={secondaryHref} label="See Pricing" variant="ghost" />
              </div>

              {ctaNote ? <div className="mt-4 text-sm text-[#58524a]">{ctaNote}</div> : null}
            </div>

            <Reveal variant="scale" delay={200} className="hidden lg:block">
              <DispatchLog />
              <p className="mt-5 max-w-[26rem] text-sm leading-7 text-[#58524a]">
                What your customer experiences when they call after hours. The
                text goes out before they finish dialing the next number on
                Google.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
