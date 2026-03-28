import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
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
    "mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl",
    tone === "dark" ? "text-white" : "text-[var(--color-ink)]",
  ].join(" ");

  const descriptionClasses = [
    "mt-5 text-base leading-8 sm:text-lg",
    tone === "dark" ? "text-white/[0.68]" : "text-[var(--color-muted)]",
  ].join(" ");

  return (
    <section id={id} className={sectionClasses}>
      <div className="container-shell">
        {(eyebrow ?? title ?? description) ? (
          <div className={headerClasses}>
            {eyebrow ? (
              <p
                className={
                  tone === "dark"
                    ? "pill-label bg-white/[0.08] text-white/70"
                    : "pill-label"
                }
              >
                {eyebrow}
              </p>
            ) : null}
            {title ? <h2 className={titleClasses}>{title}</h2> : null}
            {description ? (
              <p className={descriptionClasses}>{description}</p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
