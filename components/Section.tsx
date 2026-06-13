import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type SectionProps = {
  id?: string;
  index?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "muted" | "dark";
  align?: "left" | "center";
};

export default function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
  className = "",
  tone = "light",
  align = "left",
}: SectionProps) {
  const sectionClasses = [
    "section-spacing relative",
    tone === "muted"
      ? "bg-[linear-gradient(180deg,rgba(236,241,248,0.84),rgba(255,255,255,0.96))]"
      : "",
    tone === "dark" ? "bg-[var(--color-ink)]" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const headerClasses = [
    "mb-12 max-w-3xl",
    align === "center" ? "mx-auto text-center" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const titleClasses = [
    "font-display mt-6 font-semibold leading-[1.05]",
    "text-[clamp(2.1rem,4.5vw,3.6rem)]",
    tone === "dark" ? "text-white" : "text-[var(--color-ink)]",
  ].join(" ");

  const descriptionClasses = [
    "mt-5 text-base leading-8 sm:text-lg",
    tone === "dark" ? "text-on-dark" : "text-[var(--color-muted)]",
  ].join(" ");

  const kickerColor =
    tone === "dark" ? "text-on-dark-muted" : "text-[var(--color-muted)]";

  return (
    <section id={id} className={sectionClasses}>
      <div className="container-shell">
        {(eyebrow ?? title ?? description) ? (
          <Reveal variant="fade">
            <div className={headerClasses}>
              {eyebrow ? (
                <p className={`kicker ${kickerColor} ${align === "center" ? "justify-center" : ""}`}>
                  {index ? (
                    <span className="kicker-num" aria-hidden="true">
                      {index}
                    </span>
                  ) : null}
                  <span>{eyebrow}</span>
                  {align !== "center" ? (
                    <span aria-hidden="true" className="kicker-rule rule-draw" />
                  ) : null}
                </p>
              ) : null}
              {title ? <h2 className={titleClasses}>{title}</h2> : null}
              {description ? (
                <p className={descriptionClasses}>{description}</p>
              ) : null}
            </div>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
