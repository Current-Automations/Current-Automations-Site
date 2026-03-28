import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Current Automations helps service businesses capture more opportunities by responding faster and reducing missed calls.",
};

const differentiators = [
  "Built specifically for service businesses",
  "Focused on simple, practical workflows",
  "Designed to work alongside existing systems",
  "Prioritizes speed and reliability",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(145deg,#07111d_0%,#0d1b30_58%,#16334e_100%)] pb-20 pt-24 sm:pb-24 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_42%)]" />
        <div className="container-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="pill-label bg-white/[0.08] text-white/70">
              About Current Automations
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About Current Automations
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              Helping service businesses capture more opportunities by
              responding faster and reducing missed calls.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
              Why this exists
            </p>
            <div className="mt-6 space-y-4">
              {[
                "Built around a real missed-call problem service businesses deal with every week.",
                "Designed to help teams respond quickly without adding extra workload.",
                "Focused on practical systems that feel professional and dependable.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-white/[0.08] bg-black/10 px-4 py-4 text-sm leading-7 text-white/[0.72]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="The problem"
        title="A small number of missed calls can quietly become a large number of lost jobs."
        description="For many service businesses, the phone is still the main source of new work."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <article className="surface-card rounded-[2rem] p-8">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              For many service businesses, the phone is the primary source of
              new work.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              But in reality, it is not always possible to answer every call.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              When a call is missed, customers often move on quickly to the next
              company, and those missed calls quietly turn into lost revenue.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Even a small number of missed calls each week can represent a
              significant number of lost jobs over time.
            </p>
          </article>

          <div className="grid gap-5">
            {[
              {
                title: "Phone calls drive real revenue",
                description:
                  "For many local service businesses, the phone is still the fastest path from inquiry to booked job.",
              },
              {
                title: "Busy teams cannot answer everything",
                description:
                  "Being on-site, driving, or handling another customer makes missed calls unavoidable.",
              },
              {
                title: "Lost calls are often invisible",
                description:
                  "The business sees the ringing phone, but not always the jobs that quietly went elsewhere.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[1.7rem] border border-[var(--color-line)] bg-white px-6 py-6 shadow-[0_18px_45px_rgba(7,17,29,0.08)]"
              >
                <h2 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                  {item.title}
                </h2>
                <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="The solution"
        title="Current Automations was built so missed calls do not turn into missed opportunities."
        description="The goal is to keep follow-up fast, consistent, and professional without depending entirely on manual callbacks."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <article className="surface-card rounded-[2rem] p-8">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Current Automations was built to ensure missed calls do not turn
              into missed opportunities.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              The system automatically responds when a call is missed, captures
              lead details, and helps maintain engagement with potential
              customers.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Instead of relying on manual follow-up, businesses can ensure
              every opportunity is handled quickly and consistently.
            </p>
          </article>

          <aside className="dark-card rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/[0.45]">
              What the system does
            </p>
            <div className="mt-6 space-y-4">
              {[
                "Responds quickly when a call is missed",
                "Captures lead details while interest is still high",
                "Helps businesses follow up without extra manual strain",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.06] px-4 py-4"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
                  <p className="text-sm leading-7 text-white/[0.72]">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section
        eyebrow="Founder"
        title="Built by the Founder"
        description="A grounded technical background and a practical business problem came together to shape Current Automations."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <div className="surface-card flex flex-col items-center rounded-[2rem] p-8 text-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(79,208,173,0.18),rgba(20,150,118,0.28))] text-3xl font-semibold text-[var(--color-ink)] shadow-[0_18px_45px_rgba(7,17,29,0.12)]">
              FP
            </div>
            <p className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
              Founder Name
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
              Founder, Current Automations
            </p>
          </div>

          <article className="surface-card rounded-[2rem] p-8">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Current Automations was founded by a student pursuing a combined
              background in engineering and computer technology, with a focus on
              building practical systems using automation and AI.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              While studying technical systems and how businesses operate, one
              problem stood out clearly: service businesses lose opportunities
              every day simply because they cannot answer every call.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              In industries where speed matters, a missed call often means a
              lost job.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Current Automations was built to solve that gap by creating a
              system that helps businesses respond instantly, capture lead
              information, and follow up without adding extra workload.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              The goal is simple: help service businesses operate more
              efficiently, reduce missed opportunities, and turn more incoming
              calls into actual jobs.
            </p>
          </article>
        </div>
      </Section>

      <Section
        eyebrow="Why it matters"
        title="In service industries, timing plays a major role in winning new work."
        description="Fast response is not just a nice extra. It often decides who gets the next conversation."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Customers often contact multiple businesses, and the first to respond usually has the advantage.",
            "By improving response time, businesses can stay in the conversation while customer intent is still high.",
            "By capturing missed leads, businesses increase their chances of converting inquiries into actual jobs.",
          ].map((item, index) => (
            <article
              key={item}
              className="surface-card rounded-[1.8rem] p-7"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-brand-strong)]">
                Benefit {index + 1}
              </p>
              <p className="mt-4 text-lg leading-8 text-[var(--color-copy)]">
                {item}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="What makes it different"
        title="Designed to stay practical, fast, and dependable."
        description="The system is built around simple workflows that fit how service businesses already operate."
        tone="muted"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {differentiators.map((item) => (
            <article
              key={item}
              className="rounded-[1.7rem] border border-[var(--color-line)] bg-white px-6 py-6 shadow-[0_18px_45px_rgba(7,17,29,0.08)]"
            >
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-brand-strong)]" />
                <p className="text-base font-medium leading-8 text-[var(--color-copy)]">
                  {item}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Final note"
        title="Built to be useful, effective, and easy to fit into everyday operations."
        description="Current Automations is built with a clear goal: help businesses respond faster, capture more opportunities, and reduce lost revenue without adding unnecessary complexity. It is designed to be practical, effective, and easy to integrate into everyday operations."
      >
        <div className="surface-card max-w-4xl rounded-[2rem] p-8">
          <p className="text-base leading-8 text-[var(--color-muted)]">
            The focus is not on hype. It is on building something dependable
            enough to support real businesses, real calls, and real missed
            opportunities that can be recovered with the right system in place.
          </p>
        </div>
      </Section>

      <CTASection
        eyebrow="Ready to see if it fits your workflow?"
        title="See how Current Automations would work for your business."
        description="Request a walkthrough to see how missed-call follow-up, lead capture, and customer response could fit into your current process."
        primaryHref="/book-a-demo#demo-request"
        primaryLabel="Request a Demo"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
