import styles from "./jobsheet.module.css";

const logRows = [
  { time: "9:14:02 AM", event: "INCOMING CALL", detail: "MISSED", tone: "rust" as const },
  {
    time: "9:14:09 AM",
    event: "AUTO-TEXT SENT",
    detail: "“Sorry we missed you. How can we help?”",
    tone: "plain" as const,
  },
  {
    time: "9:16:44 AM",
    event: "CUSTOMER REPLY",
    detail: "“AC's out, need someone today”",
    tone: "plain" as const,
  },
  {
    time: "9:16:51 AM",
    event: "AUTO-TEXT SENT",
    detail: "“Sorry about the AC. Just checked the crew's schedule and we can fit you in today between 11 and 1. Want me to book it? Happy to call you in the next 10 minutes instead if that's easier.”",
    tone: "plain" as const,
  },
  {
    time: "9:17:12 AM",
    event: "CUSTOMER REPLY",
    detail: "“Book it”",
    tone: "plain" as const,
  },
  {
    time: "9:17:20 AM",
    event: "AUTO-TEXT SENT",
    detail: "“Okay, you're booked. We'll see you between 11 and 1.”",
    tone: "plain" as const,
  },
  { time: "9:17:24 AM", event: "JOB BOOKED", detail: "ON THE SCHEDULE", tone: "teal" as const },
];

/**
 * A printed dispatch log: the paper-record equivalent of "missed call to
 * booked job," standing in for the phone-mockup convention used elsewhere
 * on the current site.
 */
export default function DispatchLog() {
  return (
    <div className={`${styles.ticket} p-0 overflow-hidden`}>
      <div className="flex items-center justify-between border-b border-[var(--card-line,rgba(28,36,48,0.16))] bg-[rgba(28,36,48,0.03)] px-5 py-3">
        <span className={`${styles.mono} text-xs tracking-widest text-[#58524a]`}>
          CALL LOG &middot; LINE 1
        </span>
        <span className={`${styles.mono} text-xs tracking-widest text-[#58524a]`}>
          PAGE 1/1
        </span>
      </div>

      <div className="divide-y divide-[rgba(28,36,48,0.1)]">
        {logRows.map((row) => (
          <div key={row.time} className={`${styles.ledgerRow} grid grid-cols-[6.5rem_1fr] gap-4 px-5 py-3.5`}>
            <span className={`${styles.mono} text-[0.7rem] text-[#58524a]`}>{row.time}</span>
            <div>
              <p
                className={`${styles.mono} text-xs font-semibold tracking-wide ${
                  row.tone === "rust"
                    ? "text-[#a8452f]"
                    : row.tone === "teal"
                    ? "text-[var(--color-brand-strong)]"
                    : "text-[#201c16]"
                }`}
              >
                {row.event}
              </p>
              <p className="mt-1 text-sm leading-6 text-[#3a352c]">{row.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t-2 border-dashed border-[rgba(28,36,48,0.24)] px-5 py-3.5">
        <span className={`${styles.mono} text-xs uppercase tracking-widest text-[#58524a]`}>
          Total elapsed
        </span>
        <span className={`${styles.mono} text-sm font-semibold text-[var(--color-brand-strong)]`}>
          00:03:18
        </span>
      </div>
    </div>
  );
}
