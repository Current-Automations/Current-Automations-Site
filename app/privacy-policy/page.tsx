import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Current Automations. Learn how we handle information received through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(145deg,#07111d_0%,#0d1b30_58%,#16334e_100%)] pb-18 pt-24 sm:pb-20 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_42%)]" />
        <div className="container-shell">
          <p className="pill-label bg-white/[0.08] text-white/70">Legal</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
            This policy describes how Current Automations handles information
            received through this website.
          </p>
        </div>
      </section>

      <Section tone="muted">
        <div className="surface-card max-w-4xl rounded-[2rem] p-8 sm:p-10">
          <div className="space-y-8 text-base leading-8 text-[var(--color-muted)]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                Information We Receive
              </h2>
              <p className="mt-3">
                If you contact Current Automations through email or a demo
                request, we may receive details such as your name, business
                name, phone number, email address, and any information you
                choose to share.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                How Information Is Used
              </h2>
              <p className="mt-3">
                Information you share is used to respond to inquiries, provide
                demos, improve the website, and communicate about services that
                may be relevant to your business.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                Contact
              </h2>
              <p className="mt-3">
                For privacy-related questions, contact{" "}
                <a
                  href="mailto:CurrentAutomations@Outlook.com"
                  className="font-medium text-[var(--color-brand-strong)]"
                >
                  CurrentAutomations@Outlook.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
