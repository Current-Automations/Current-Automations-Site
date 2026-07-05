import type { ReactNode } from "react";
import styles from "./jobsheet.module.css";

type TicketCardProps = {
  children: ReactNode;
  refCode?: string;
  onDark?: boolean;
  className?: string;
};

/** Punch-card style ticket: cream stock, hole punch, reference code. */
export default function TicketCard({
  children,
  refCode,
  onDark = false,
  className = "",
}: TicketCardProps) {
  return (
    <div
      className={`${styles.ticket} relative h-full p-7 pl-10 sm:p-8 sm:pl-11 ${
        onDark ? "!bg-[rgba(255,255,255,0.05)] !border-white/15" : ""
      } ${className}`}
    >
      <span className={styles.ticketHole} aria-hidden="true" />
      {refCode ? (
        <span className={`${styles.mono} ${styles.ticketRef} ${onDark ? "!text-white/40" : ""}`}>
          {refCode}
        </span>
      ) : null}
      {children}
    </div>
  );
}
