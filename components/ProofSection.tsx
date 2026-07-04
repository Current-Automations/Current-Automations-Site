import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import type { CaseStudy } from "@/data/siteContent";

type ProofSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: CaseStudy[];
  tone?: "light" | "muted" | "dark";
};

export default function ProofSection({
  eyebrow = "Proof it works",
  title = "In Practice",
  description = "These aren't Current Automations clients yet. They're real examples of the same approach, missed calls and support gaps closed with the right system. We're building the same thing for trades businesses right now.",
  items,
  tone = "dark",
}: ProofSectionProps) {
  return (
    <Section eyebrow={eyebrow} title={title} description={description} tone={tone}>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.company} delay={index * 80}>
            <TiltCard className="dark-card h-full rounded-card-lg p-7 sm:p-8">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {item.company}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-on-dark-muted">
                  {item.industry}
                </span>
              </div>

              <dl className="mt-5 space-y-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                    Problem
                  </dt>
                  <dd className="mt-1 text-sm leading-7 text-on-dark">{item.problem}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                    System
                  </dt>
                  <dd className="mt-1 text-sm leading-7 text-on-dark">{item.system}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                    Result
                  </dt>
                  <dd className="mt-1 text-sm leading-7 font-medium text-white">
                    {item.result}
                  </dd>
                </div>
              </dl>

              <p className="mt-6 border-t border-line-dark pt-4 text-xs leading-6 text-on-dark-muted">
                Source: {item.source}.{" "}
                {!item.isClient ? "Industry example, not a Current Automations client." : null}
              </p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
