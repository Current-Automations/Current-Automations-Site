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
    title: "Free Consultation",
    description:
      "We start with a 30-minute conversation. No pitch. We ask about your day, where time gets lost, where leads fall through, and what would make the biggest difference. You leave with clarity even if you do not move forward.",
  },
  {
    number: "02",
    title: "AI Opportunity Audit",
    description:
      "We map exactly where AI will have the highest impact in your business. For most service businesses this is missed call recovery. For others it is follow-up, admin, scheduling, or something else entirely.",
  },
  {
    number: "03",
    title: "We Build It For You",
    description:
      "Once we agree on the right system, we build and configure everything. You do not touch the technology. Most clients are live within 48 hours.",
  },
  {
    number: "04",
    title: "It Runs In The Background",
    description:
      "The system runs automatically from day one. Missed calls get caught. Follow-ups go out. Leads get captured. Your team gets notified. No manual work required.",
  },
  {
    number: "05",
    title: "We Maintain Everything",
    description:
      "We monitor and maintain the system on our end. If something needs adjusting, we handle it. You focus on the work. We keep the system working.",
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
              From first conversation to running system. Here is how we work.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              Every engagement starts with a free consultation where we find where your business is losing time and money. Then we build and run the systems that fix it. You never touch the technology.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
              What you get
            </p>
            <div className="mt-6 space-y-4">
              {[
                "A clear picture of where your business leaks revenue",
                "A recommended system built for your specific situation",
                "Fast implementation with no disruption to how you work",
                "Ongoing maintenance so nothing breaks on you",
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
        title="How every engagement works."
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
        title="Built to run without you having to think about it."
        description="This is not about replacing your team. It is about making sure every inbound lead gets fast attention in a workflow that feels natural and dependable."
        tone="dark"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            "No technical knowledge required at any stage",
            "Systems are maintained and monitored on our end",
            "Most clients see measurable impact within 30 days",
            "The relationship is ongoing, not a one-time install",
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

      <Section
        eyebrow="Real example"
        title="Here is what this looks like for an HVAC company on a busy Tuesday."
        description="This is a representative scenario based on the kind of situation local service teams deal with every week."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.88fr)] lg:items-start">
          <div className="space-y-4">
            <div className="surface-card rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
                10:14 AM — Incoming call
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                A homeowner calls about a broken AC unit.
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                It is mid-morning on a hot day. The technician on duty is already on-site at another job. The call rings out. No one answers.
              </p>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                The caller leaves a voicemail and the system captures it immediately.
              </p>
              <div className="mt-5 rounded-[1.4rem] border border-[var(--color-line)] bg-[var(--color-panel-muted)] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] mb-3">Voicemail transcript</p>
                <p className="text-sm leading-7 text-[var(--color-copy)]">
                  &quot;Hi, calling about my AC on Oak Street — it stopped blowing cold this morning. It&apos;s getting really hot and I&apos;ve got two young kids here. Please call back when you can.&quot;
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,#07111d_0%,#0d1b30_100%)] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
                10:14 AM — AI-generated response sent
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                Within seconds, the caller gets a tailored text.
              </h3>
              <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/[0.07] p-5">
                <p className="text-sm leading-7 text-white/[0.78]">
                  &quot;Hi — this is ABC HVAC. We just missed your call and caught your voicemail about the AC at Oak Street not blowing cold. That sounds urgent, especially with kids at home in this heat. We&apos;re finishing up another job and will call you back shortly. Reply here anytime if anything changes.&quot;
                </p>
              </div>
              <p className="mt-5 text-sm leading-7 text-white/[0.62]">
                The message is generated from the voicemail transcript — specific to their issue, not a generic auto-reply.
              </p>
            </div>

            <div className="surface-card rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
                10:16 AM — Lead replies
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                The homeowner stays in the conversation.
              </h3>
              <div className="mt-5 rounded-[1.4rem] border border-[var(--color-line)] bg-[var(--color-panel-muted)] p-5">
                <p className="text-sm leading-7 text-[var(--color-copy)]">
                  &quot;Thanks, appreciate the quick response. Yes please call back, it&apos;s getting hot in here.&quot;
                </p>
              </div>
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
                Because the first message felt personal and acknowledged the real issue, they waited instead of calling the next company.
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-28">
            <div className="surface-card rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
                What was captured
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { label: "Address", value: "Oak Street" },
                  { label: "Issue", value: "AC not blowing cold" },
                  { label: "Urgency", value: "High — family with kids" },
                  { label: "Voicemail", value: "Transcribed + actioned" },
                  { label: "Response time", value: "Under 2 minutes" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 rounded-[1.1rem] border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-4 py-3"
                  >
                    <span className="text-sm text-[var(--color-muted)]">{row.label}</span>
                    <span className="text-sm font-semibold text-[var(--color-ink)]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,#07111d_0%,#0d1b30_100%)] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
                10:48 AM — Technician calls back
              </p>
              <p className="mt-4 text-base leading-8 text-white/[0.78]">
                When the technician finishes the first job and checks their phone, the lead details are already there. They call back knowing it is Oak Street, it is an AC issue, and it is urgent. The booking takes under three minutes.
              </p>
              <div className="mt-5 flex items-center gap-3 rounded-[1.3rem] border border-emerald-300/[0.20] bg-emerald-300/[0.08] px-4 py-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
                <p className="text-sm font-semibold text-emerald-200">Job booked. Lead recovered.</p>
              </div>
              <p className="mt-5 text-sm leading-7 text-white/[0.56]">
                Without automation, that caller was gone within two minutes of the missed call. With it, they waited because they felt acknowledged.
              </p>
            </div>

            <div className="surface-card rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
                Follow-up if they go quiet
              </p>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                If the homeowner had not replied, the workflow sends a follow-up nudge after a set interval, keeping the opportunity warm without anyone on your team having to remember to check.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        eyebrow="Want to see the workflow with your own business details?"
        title="Find Out Where Your Business Is Leaving Money Behind"
        description="We audit your business, find the highest-impact opportunities, and build the systems that fix them."
        primaryHref="https://calendly.com/currentautomations/30min"
        primaryLabel="Get Started For Free"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
