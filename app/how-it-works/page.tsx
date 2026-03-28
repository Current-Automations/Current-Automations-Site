import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Current Automations helps service businesses respond faster after missed calls and keep new opportunities moving.",
};

const steps = [
  {
    number: "01",
    title: "Customer calls",
    description:
      "A potential customer reaches out when they need help and expects a quick response.",
  },
  {
    number: "02",
    title: "You miss the call",
    description:
      "Your team might be on-site, driving, with another customer, or simply unavailable in that moment.",
  },
  {
    number: "03",
    title: "Automatic response is sent",
    description:
      "Current Automations immediately acknowledges the missed call so the prospect knows they are not being ignored.",
  },
  {
    number: "04",
    title: "Lead info is captured",
    description:
      "The workflow helps gather the details your team needs to understand the job and prepare the callback.",
  },
  {
    number: "05",
    title: "Follow-up helps recover the job",
    description:
      "If the lead does not respond right away, follow-up keeps the opportunity warm until your team can step in.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(145deg,#07111d_0%,#0f1d31_65%,#16334e_100%)] pb-20 pt-24 sm:pb-24 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(79,208,173,0.18),_transparent_48%)]" />
        <div className="container-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="pill-label bg-white/[0.08] text-white/70">
              How the workflow works
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Five simple steps from a missed call to a recovered opportunity.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              The goal is simple: keep the lead engaged quickly, capture the
              context your team needs, and help the opportunity stay warm while
              your business is busy.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
              What the customer feels
            </p>
            <div className="mt-6 space-y-4">
              {[
                "Fast acknowledgment",
                "A clear next step",
                "Confidence that help is coming",
                "A more professional first impression",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-white/[0.08] bg-black/10 px-4 py-4 text-sm text-white/[0.72]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Step-by-step"
        title="A visual workflow built for busy local service teams."
        description="Each stage is designed to shorten the time between an unanswered call and a real conversation with your next customer."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          {steps.map((step) => (
            <article
              key={step.number}
              className="surface-card relative rounded-[1.9rem] p-7"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-strong)]">
                  {step.number}
                </span>
                <span className="h-px w-14 bg-gradient-to-r from-[var(--color-brand)]/70 to-transparent" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                {step.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Behind the scenes"
        title="The whole experience is meant to feel seamless, not robotic."
        description="This is not about replacing your team. It is about making sure every inbound lead gets fast attention in a workflow that feels natural and dependable."
        tone="dark"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Your business stays responsive even during busy hours.",
            "Leads receive context instead of silence.",
            "Your team gets cleaner handoff information.",
            "More inbound demand gets a fair chance to convert.",
          ].map((item, index) => (
            <div
              key={item}
              className="rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-6"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-white/[0.45]">
                Benefit {index + 1}
              </p>
              <p className="mt-4 text-lg leading-8 text-white/[0.78]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Want to see the workflow with your own business details?"
        title="Stop Losing Jobs From Missed Calls"
        description="Current Automations helps service businesses respond faster, capture more leads, and reduce lost opportunities."
        primaryHref="/book-a-demo#demo-request"
        primaryLabel="Request a Demo"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
