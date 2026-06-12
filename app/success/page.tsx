import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "You Are All Set | Current Automations" },
  description:
    "Your subscription is confirmed. Expect an onboarding email within 24 hours.",
};

export default function SuccessPage() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[linear-gradient(140deg,#07111d_0%,#0c182a_60%,#12324a_100%)]">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_45%)]" />
      <div className="container-shell py-24 sm:py-32">
        <p className="pill-label bg-white/[0.08] text-white/70">
          Purchase confirmed
        </p>
        <h1 className="font-display mt-5 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          You are all set.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-white/[0.68] sm:text-lg">
          Your subscription is active. Expect an onboarding email from us within
          24 hours. We install it, tune it, and hand you a working system. You
          don&apos;t touch the tech.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Back to home
        </Link>
      </div>
    </section>
  );
}
