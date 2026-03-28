type TestimonialCardProps = {
  quote: string;
  title: string;
  context: string;
};

export default function TestimonialCard({
  quote,
  title,
  context,
}: TestimonialCardProps) {
  return (
    <article className="surface-card group flex h-full flex-col rounded-[1.9rem] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_84px_rgba(7,17,29,0.14)]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-brand),#0f7e67)] text-[var(--color-ink)] shadow-[0_12px_24px_rgba(79,208,173,0.26)]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
          >
            <path
              d="M8 10h8M8 14h5m-7 5 1.7-3.3A7 7 0 1 1 19 10a7 7 0 0 1-7 7H6Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
            Scenario example
          </p>
          <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
            {context}
          </p>
        </div>
      </div>

      <p className="mt-6 text-lg leading-8 text-[var(--color-copy)]">
        {quote}
      </p>

      <div className="mt-auto pt-8">
        <p className="text-base font-semibold text-[var(--color-ink)]">{title}</p>
      </div>
    </article>
  );
}
