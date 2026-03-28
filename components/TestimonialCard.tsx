type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  business: string;
  initials: string;
};

export default function TestimonialCard({
  quote,
  name,
  role,
  business,
  initials,
}: TestimonialCardProps) {
  return (
    <article className="surface-card group flex h-full flex-col rounded-[1.9rem] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_84px_rgba(7,17,29,0.14)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-brand),#0f7e67)] text-sm font-semibold text-[var(--color-ink)] shadow-[0_12px_24px_rgba(79,208,173,0.26)]">
          {initials}
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
          Placeholder
        </span>
      </div>

      <p className="mt-6 text-lg leading-8 text-[var(--color-copy)]">
        &quot;{quote}&quot;
      </p>

      <div className="mt-auto pt-8">
        <p className="text-base font-semibold text-[var(--color-ink)]">{name}</p>
        <p className="mt-1 text-sm leading-7 text-[var(--color-muted)]">
          {role}
        </p>
        <p className="text-sm leading-7 text-[var(--color-brand-strong)]">
          {business}
        </p>
      </div>
    </article>
  );
}
