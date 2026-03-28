import type { ReactNode } from "react";

type OutcomeCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export default function OutcomeCard({
  title,
  description,
  icon,
}: OutcomeCardProps) {
  return (
    <article className="surface-card group rounded-[1.85rem] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_80px_rgba(7,17,29,0.14)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(79,208,173,0.18),rgba(20,150,118,0.24))] text-[var(--color-ink)] transition duration-300 group-hover:scale-[1.03] group-hover:bg-[linear-gradient(135deg,rgba(79,208,173,0.22),rgba(20,150,118,0.3))]">
        {icon}
      </div>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
        {title}
      </h3>
      <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
        {description}
      </p>
    </article>
  );
}
