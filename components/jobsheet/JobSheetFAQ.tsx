import type { FAQItem } from "@/data/siteContent";
import JobSheetSection from "./JobSheetSection";
import styles from "./jobsheet.module.css";

type JobSheetFAQProps = {
  items: FAQItem[];
  code?: string;
  label?: string;
  title?: string;
  description?: string;
  tone?: "paper" | "carbon" | "ink";
};

export default function JobSheetFAQ({
  items,
  code = "CA-08",
  label = "Questions on file",
  title = "Questions owners ask before signing.",
  description = "Straightforward answers, filed for reference.",
  tone = "carbon",
}: JobSheetFAQProps) {
  const onDark = tone === "ink";
  return (
    <JobSheetSection code={code} label={label} title={title} description={description} tone={tone}>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item, i) => (
          <details
            key={item.question}
            className={`${styles.ticket} group relative p-6 pl-10 ${
              onDark ? "!bg-[rgba(255,255,255,0.05)] !border-white/15" : ""
            }`}
          >
            <span className={styles.ticketHole} aria-hidden="true" />
            <span className={`${styles.mono} ${styles.ticketRef} ${onDark ? "!text-white/40" : ""}`}>
              Q-{String(i + 1).padStart(2, "0")}
            </span>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 pr-12 text-left">
              <span className={`${styles.display} text-base leading-tight ${onDark ? "text-[#f3ede1]" : "text-[#181510]"}`}>
                {item.question}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded border text-base transition-transform duration-200 group-open:rotate-45 ${
                  onDark
                    ? "border-white/20 text-[var(--color-brand)]"
                    : "border-[rgba(28,36,48,0.24)] text-[var(--color-brand-strong)]"
                }`}
              >
                +
              </span>
            </summary>
            <p
              className={`mt-4 pr-4 text-sm leading-7 ${
                onDark ? "text-[rgba(243,237,225,0.72)]" : "text-[#58524a]"
              }`}
            >
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </JobSheetSection>
  );
}
