import Section from "@/components/Section";
import type { FAQItem } from "@/data/siteContent";

type FAQSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FAQItem[];
  tone?: "light" | "muted" | "dark";
};

export default function FAQSection({
  eyebrow = "FAQ",
  title = "Questions service business owners usually ask first.",
  description = "A straightforward overview of how Current Automations fits into your existing process.",
  items,
  tone = "light",
}: FAQSectionProps) {
  return (
    <Section
      eyebrow={eyebrow}
      title={title}
      description={description}
      tone={tone}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <details
            key={item.question}
            className="surface-card group rounded-[1.65rem] p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
              <span className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                {item.question}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-lg text-[var(--color-brand-strong)] transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 pr-4 text-base leading-8 text-[var(--color-muted)]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
