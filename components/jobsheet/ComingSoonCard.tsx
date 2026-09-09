import Stamp from "./Stamp";
import styles from "./jobsheet.module.css";

type ComingSoonCardProps = {
  title: string;
  blurb: string;
  refCode?: string;
};

/** Static "coming soon" ticket. No form, no capture: a placeholder that reads as filed, not sold. */
export default function ComingSoonCard({ title, blurb, refCode = "SOON" }: ComingSoonCardProps) {
  return (
    <div className={`${styles.ticket} relative h-full p-7 pl-10 sm:p-8 sm:pl-11`}>
      <span className={styles.ticketHole} aria-hidden="true" />
      <span className={`${styles.mono} ${styles.ticketRef}`}>{refCode}</span>
      <div className="mb-4">
        <Stamp label="Coming soon" tone="rust" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-[#181510]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#58524a]">{blurb}</p>
    </div>
  );
}
