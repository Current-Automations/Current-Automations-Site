type TrustBarProps = {
  title: string;
  items: string[];
};

export default function TrustBar({ title, items }: TrustBarProps) {
  return (
    <section className="border-b border-[var(--color-line)] bg-white/70 py-5 backdrop-blur-sm">
      <div className="container-shell flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
          {title}
        </p>
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-copy)] shadow-[0_12px_30px_rgba(7,17,29,0.06)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
