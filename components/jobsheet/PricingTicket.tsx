import type { ReactNode } from "react";
import Stamp from "./Stamp";
import styles from "./jobsheet.module.css";

type PricingTicketProps = {
  name: string;
  price: number;
  tagline: string;
  scenarios: string[];
  note?: string;
  featured?: boolean;
  children: ReactNode;
};

export default function PricingTicket({
  name,
  price,
  tagline,
  scenarios,
  note,
  featured = false,
  children,
}: PricingTicketProps) {
  return (
    <div
      className={`${styles.ticket} relative flex h-full flex-col p-7 pl-10 sm:p-8 sm:pl-11 ${
        featured ? "!border-[var(--color-brand-strong)] !border-2" : ""
      }`}
    >
      <span className={styles.ticketHole} aria-hidden="true" />
      <span className={`${styles.mono} ${styles.ticketRef}`}>PLAN</span>

      {featured ? (
        <div className="mb-3">
          <Stamp label="Most popular" tone="teal" />
        </div>
      ) : (
        <div className="mb-3 h-[1.6rem]" aria-hidden="true" />
      )}

      <h3 className={`${styles.display} text-2xl text-[#181510]`}>{name}</h3>
      <p className="mt-1.5 text-xs leading-5 text-[#58524a]">{tagline}</p>

      <p className={`${styles.mono} mt-5 text-4xl font-semibold text-[#181510]`}>
        ${price}
        <span className="text-base font-normal text-[#58524a]">/mo</span>
      </p>

      <div className="my-5 border-t-2 border-dashed border-[rgba(28,36,48,0.24)]" />

      <ul className="flex-1 space-y-2.5">
        {scenarios.map((s) => (
          <li
            key={s}
            className={`${styles.mono} flex items-baseline gap-2 text-xs leading-6 text-[#3a352c]`}
          >
            <span className="text-[var(--color-brand-strong)]">&middot;</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>

      {note ? <p className="mt-4 text-xs italic text-[#58524a]">{note}</p> : null}

      <div className="mt-6 flex flex-col gap-2">{children}</div>
    </div>
  );
}
