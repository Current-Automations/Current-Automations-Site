import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Try the Demo | Current Automations",
  description:
    "Call the Current Automations demo line and experience firsthand what your customers will hear when they reach your business after hours.",
};

const steps = [
  {
    step: "Call the number",
    description:
      "Dial +1 365 601 7474 from any phone. Let it ring and go to voicemail — do not leave a message.",
  },
  {
    step: "Wait 60 seconds",
    description:
      "Within seconds of the missed call, the automation fires. You will receive a text to the number you called from.",
  },
  {
    step: "Reply to the text",
    description:
      "The system will ask a few qualifying questions — name, address, what you need. This is the lead capture flow your customers will go through.",
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
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(140deg,#07111d_0%,#0c182a_58%,#13314c_100%)] pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_42%)]" />
        <div className="container-shell text-center">
          <p className="pill-label mx-auto bg-white/[0.08] text-white/70">
            Try it before you buy it
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Call the Demo Line Right Now
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
            Experience the missed-call automation firsthand. Call, let it go to voicemail, and watch what happens next.
          </p>

          {/* Big phone number */}
          <div className="mx-auto mt-10 max-w-lg rounded-[2rem] border border-white/10 bg-white/[0.07] p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
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
                href="/book-a-demo#demo-request"
                className="btn-secondary w-full border-white/[0.16] text-white sm:w-auto"
              >
                Book a Walkthrough Instead
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/[0.48]">
              No signup required. Works on any phone. Takes 30 seconds.
            </p>
          </div>
        </div>
      </section>

      <Section
        eyebrow="How it works"
        title="What Happens When You Call"
        description="Here is exactly what you will experience — and what your customers will experience when they reach your business after hours."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <article
              key={item.step}
              className="surface-card rounded-[1.75rem] p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-sm font-semibold text-white">
                0{index + 1}
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                {item.step}
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Demo video"
        title="Watch It In Action"
        description="A full walkthrough showing a missed call turning into a captured lead."
        tone="muted"
      >
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-10 text-center shadow-[0_18px_45px_rgba(7,17,29,0.08)]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel-muted)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-8 w-8 text-[var(--color-brand-strong)]"
                fill="currentColor"
              >
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </div>
            <p className="mt-6 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
              Video coming soon
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              In the meantime, the demo line above is the fastest way to see the system. Or book a free walkthrough and we will show you live using your own number.
            </p>
            <div className="mt-8">
              <Link href="/book-a-demo#demo-request" className="btn-primary">
                Book a Free 15-Min Call
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Ready to get set up?"
        title="See How It Fits Your Business"
        description="Book a no-pressure 15-minute walkthrough. We will tailor it around your call flow and answer any questions about fit and setup."
        tone="dark"
      >
        <div className="mx-auto max-w-xl text-center">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/book-a-demo#demo-request" className="btn-primary">
              Book a Free 15-Min Call
            </Link>
            <Link
              href="/pricing"
              className="btn-secondary border-white/[0.16] text-white"
            >
              See Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/[0.48]">
            Or call the demo line again: {" "}
            <a href="tel:+13656017474" className="font-medium text-[var(--color-brand)] hover:underline">
              +1 365 601 7474
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
