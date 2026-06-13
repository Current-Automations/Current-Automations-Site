import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import DemoVideos from "@/components/DemoVideos";
import TiltCard from "@/components/motion/TiltCard";

const GC_BOOKING =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: { absolute: "See It In Action | Current Automations" },
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
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(165deg,#04091a_0%,#081424_55%,#0d2236_100%)] pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div aria-hidden="true" className="bg-grid-dark absolute inset-0" />
        <div className="container-shell relative text-center">
          <Reveal variant="fade">
            <p className="kicker justify-center text-on-dark-muted">
              <span className="kicker-num" aria-hidden="true">01</span>
              <span>Live demos</span>
            </p>
          </Reveal>
          <h1 className="display-hero mt-7 text-white">
            <Reveal variant="clip">
              <span className="block">See It In Action</span>
            </Reveal>
          </h1>
          <Reveal variant="fade" delay={220}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/[0.62] sm:text-lg">
              Three demos. Under three minutes. You&apos;ll know exactly what we do.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Three demo videos */}
      <DemoVideos />

      {/* Live demo line */}
      <Section
        index="02"
        eyebrow="Try it yourself"
        title="The demo line is live right now."
        description="Call, let it go to voicemail, and watch what happens next. The text you get back is the product."
        tone="muted"
        align="center"
      >
        <div className="mx-auto max-w-2xl">
          <Reveal variant="scale">
            <TiltCard className="overflow-hidden rounded-shell border border-white/10 bg-[var(--color-ink)] p-8 text-center shadow-[0_36px_90px_rgba(7,17,29,0.3)] sm:p-12">
              <p className="flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-white/[0.45]">
                <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--color-brand)]" />
                Live demo line
              </p>
              <a
                href="tel:+13656017474"
                className="display-giant mt-6 block text-[clamp(2.6rem,6vw,4.6rem)] text-white transition-colors hover:text-[var(--color-brand)]"
              >
                +1 365 601 7474
              </a>
              <p className="mt-3 text-xs text-on-dark-faint">Tap to call on mobile</p>
              <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a href="tel:+13656017474" className="btn-primary w-full px-7 py-4 text-base sm:w-auto">
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
            </TiltCard>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <Reveal key={item.step} delay={index * 90}>
                <article className="surface-card lift-card h-full rounded-[1.75rem] p-6">
                  <p className="font-display mb-4 text-3xl font-semibold text-[var(--color-brand-strong)]">
                    0{index + 1}
                  </p>
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
