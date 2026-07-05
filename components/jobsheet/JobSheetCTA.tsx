import { siteContact } from "@/data/siteContent";
import PunchButton from "./PunchButton";
import styles from "./jobsheet.module.css";

type JobSheetCTAProps = {
  code?: string;
  label?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

/** Bottom CTA styled as a work-order approval slip. */
export default function JobSheetCTA({
  code = "CA-99",
  label = "Approval",
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: JobSheetCTAProps) {
  return (
    <section className={`${styles.root} ${styles.inkTexture} relative py-16 sm:py-20`}>
      <div className="container-shell relative">
        <div className={`${styles.ticket} !bg-[rgba(255,255,255,0.05)] !border-white/15 p-8 sm:p-10 lg:p-12`}>
          <span className={`${styles.mono} ${styles.ticketRef} !text-white/40`}>
            {code} &middot; {label.toUpperCase()}
          </span>
          <span className={styles.ticketHole} aria-hidden="true" />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h2 className={`${styles.display} text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.05] text-[#f3ede1]`}>
                {title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[rgba(243,237,225,0.72)] sm:text-lg">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <PunchButton href={primaryHref} label={primaryLabel} onDark external />
              <PunchButton href={secondaryHref} label={secondaryLabel} variant="ghost" onDark />
            </div>
          </div>

          <div className="mt-9 grid gap-3 border-t-2 border-dashed border-white/15 pt-6 sm:grid-cols-2">
            <a
              href={`mailto:${siteContact.email}`}
              className={`${styles.mono} rounded border border-white/15 px-4 py-3 text-sm text-[rgba(243,237,225,0.78)] hover:text-white`}
            >
              {siteContact.email}
            </a>
            <a
              href={`tel:${siteContact.phoneHref}`}
              className={`${styles.mono} rounded border border-white/15 px-4 py-3 text-sm text-[rgba(243,237,225,0.78)] hover:text-white`}
            >
              {siteContact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
