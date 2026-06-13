import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "You Are All Set | Current Automations" },
  description:
    "Your subscription is confirmed. Expect an onboarding email within 24 hours.",
};

export default function SuccessPage() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[linear-gradient(165deg,#04091a_0%,#081424_55%,#0d2236_100%)]">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0" />
      <div className="container-shell relative py-24 sm:py-32">
        <Reveal variant="fade">
          <p className="kicker text-on-dark-muted">
            <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--color-brand)]" />
            <span>Purchase confirmed</span>
            <span aria-hidden="true" className="kicker-rule rule-draw" />
          </p>
        </Reveal>
        <h1 className="display-hero mt-8 max-w-2xl text-white">
          <Reveal variant="clip">
            <span className="block">You are all set.</span>
          </Reveal>
        </h1>
        <Reveal variant="fade" delay={220}>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/[0.68] sm:text-lg">
            Your subscription is active. Expect an onboarding email from us within
            24 hours. We install it, tune it, and hand you a working system. You
            don&apos;t touch the tech.
          </p>
          <Link href="/" className="btn-primary mt-9 inline-flex">
            Back to home
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
