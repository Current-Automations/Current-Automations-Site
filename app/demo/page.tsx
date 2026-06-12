import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import DemoVideos from "@/components/DemoVideos";

const GC_BOOKING =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: "See It In Action | Current Automations",
  description:
    "Three demos. Under three minutes. Watch how Current Automations captures missed calls, covers every lead channel, and keeps deals alive, automatically.",
};

const steps = [
  {
    step: "Call the number",
    description:
      "Dial +1 365 601 7474 from any phone. Let it ring and go to voicemail. Do not leave a message.",
  },
  {
    step: "Wait 60 seconds",
    description:
      "Within seconds of the missed call, the automation fires. You will receive a text to the number you called from.",
  },
  {
    step: "Reply to the text",
    description:
      "The system will ask a few qualifying questions: name, address, what you need. This is the lead capture flow your customers will go through.",
  },
  {
    step: "That is the full experience",
    description:
      "Every caller who misses your business goes through this same flow. You get a notification with their details so your team can follow up prepared.",
  },
];

export default function DemoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(140deg,#07111d_0%,#0c182a_58%,#13314c_100%)] pb-16 pt-24 sm:pb-20 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_42%)]" />
        <div className="container-shell text-center">
          <p className="pill-label mx-auto bg-white/[0.08] text-white/70">
            Live demos
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            See It In Action
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/[0.62] sm:text-lg">
            Three demos. Under three minutes. You&apos;ll know exactly what we do.
          </p>
        </div>
      </section>

      {/* Three demo videos */}
      <DemoVideos />

      {/* Live demo line */}
      <Section
        eyebrow="Try it yourself"
        title="Call the Demo Line Right Now"
        description="Experience the missed-call automation firsthand. Call, let it go to voicemail, and watch what happens next."
        tone="muted"
      >
        <div className="mx-auto max-w-xl">
          <div className="rounded-[2rem] border border-white/10 bg-[var(--color-ink)] p-8 text-center shadow-[0_24px_64px_rgba(7,17,29,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/[0.45]">
              Live demo line
            </p>
            <a
              href="tel:+13656017474"
              className="mt-4 block text-5xl font-semibold tracking-tight text-white transition-colors hover:text-[var(--color-brand)] sm:text-6xl"
            >
              +1 365 601 7474
            </a>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="tel:+13656017474" className="btn-primary w-full sm:w-auto">
                Call Now
              </a>
              <Link
                href={GC_BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full border-white/[0.16] text-white sm:w-auto"
              >
                Book Free Audit
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/[0.48]">
              No signup required. Works on any phone. Takes 30 seconds.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <Reveal key={item.step} delay={index * 70}>
              <article
                className="surface-card lift-card h-full rounded-[1.75rem] p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-sm font-semibold text-white">
                  0{index + 1}
                </div>
                <h3 className="text-base font-semibold tracking-tight text-[var(--color-ink)]">
                  {item.step}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
