import type { ReactNode } from "react";
import FormTab from "./FormTab";
import styles from "./jobsheet.module.css";

type JobSheetSectionProps = {
  id?: string;
  code?: string;
  label?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  tone?: "paper" | "carbon" | "ink";
  className?: string;
};

export default function JobSheetSection({
  id,
  code,
  label,
  title,
  description,
  children,
  tone = "paper",
  className = "",
}: JobSheetSectionProps) {
  const onDark = tone === "ink";
  const bgClass =
    tone === "ink"
      ? styles.inkTexture
      : tone === "carbon"
      ? styles.carbonTexture
      : styles.paperTexture;

  return (
    <section
      id={id}
      className={`${styles.root} relative py-20 sm:py-24 lg:py-28 ${bgClass} ${className}`}
    >
      <div className="container-shell relative">
        {code || label ? (
          <div className="mb-1">
            {code ? <FormTab code={code} label={label ?? ""} onDark={onDark} /> : null}
          </div>
        ) : null}

        {title || description ? (
          <div
            className={`max-w-3xl border-t-2 pt-6 ${
              onDark ? "border-white/20" : "border-[rgba(28,36,48,0.28)]"
            }`}
          >
            {title ? (
              <h2
                className={`${styles.display} text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.04] ${
                  onDark ? "text-[#f3ede1]" : ""
                }`}
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p
                className={`mt-5 max-w-2xl text-base leading-8 sm:text-lg ${
                  onDark ? "text-[rgba(243,237,225,0.72)]" : "text-[var(--ink-soft,#58524a)]"
                }`}
              >
                {description}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
