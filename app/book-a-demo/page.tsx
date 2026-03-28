import type { Metadata } from "next";
import Section from "@/components/Section";
import { siteContact } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "Request a Current Automations walkthrough and see how missed-call automation can help your service business recover more leads.",
};

export default function BookADemoPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(140deg,#07111d_0%,#0c182a_58%,#13314c_100%)] pb-20 pt-24 sm:pb-24 sm:pt-32">
        <div className="container-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div>
            <p className="pill-label bg-white/[0.08] text-white/70">
              Request a walkthrough
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              See how the missed-call workflow would look for your business.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              Share a few details below and we&apos;ll tailor the conversation
              around your business, your current call flow, and whether the
              workflow is a fit.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
              What to expect
            </p>
            <div className="mt-6 space-y-4">
              {[
                "See how the system works",
                "Ask questions about your business",
                "Find out if it fits your workflow",
                siteContact.responseExpectation,
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
        id="demo-request"
        eyebrow="Demo request"
        title="A no-pressure walkthrough for service business owners."
        description="This is a frontend-only version of the form for now, so there is no live submission yet. The UI is ready to connect to your preferred CRM or form flow later."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="grid gap-6">
            <article className="surface-card rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Reassuring by design
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
                Clear, professional, and built to help you decide if the fit is
                real.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
                We want the conversation to feel straightforward. No technical
                prep required. No complicated process. Just a focused look at
                how missed-call follow-up could work inside your business.
              </p>
            </article>

            <article className="dark-card rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-white/[0.45]">
                Reasons to book
              </p>
              <div className="mt-6 space-y-4">
                {[
                  "Get a walkthrough based on how your team already handles calls.",
                  "Understand where lead recovery happens and where jobs may be leaking today.",
                  "Leave with a clearer sense of whether the workflow fits your business.",
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
            </article>

            <article className="surface-card rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Prefer to reach out directly?
              </p>
              <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--color-muted)]">
                <a
                  href={`mailto:${siteContact.email}`}
                  className="font-medium text-[var(--color-brand-strong)]"
                >
                  {siteContact.email}
                </a>
                <a
                  href={`tel:${siteContact.phoneHref}`}
                  className="font-medium text-[var(--color-brand-strong)]"
                >
                  {siteContact.phoneDisplay}
                </a>
                <p>{siteContact.responseExpectation}</p>
              </div>
            </article>
          </div>

          <div className="surface-card rounded-[2rem] p-6 sm:p-8">
            <div className="mb-6 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-5 py-5">
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                Tell us a little about your business and we&apos;ll tailor the
                walkthrough around your workflow.
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                Placeholder experience for now. This can be connected to a real
                form, CRM, or calendar flow later.
              </p>
            </div>

            <form
              className="grid gap-5"
              action={`mailto:${siteContact.email}`}
              method="post"
              encType="text/plain"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-[var(--color-copy)]">
                  Name
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[var(--color-copy)]">
                  Business Name
                  <input
                    className="form-input"
                    type="text"
                    name="businessName"
                    placeholder="Your business name"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-[var(--color-copy)]">
                  Email
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="you@business.com"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[var(--color-copy)]">
                  Phone
                  <input
                    className="form-input"
                    type="tel"
                    name="phone"
                    placeholder="+1 365 601 7474"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-[var(--color-copy)]">
                Industry
                <select className="form-input" name="industry" defaultValue="">
                  <option value="" disabled>
                    Select your industry
                  </option>
                  <option>Plumbing</option>
                  <option>HVAC</option>
                  <option>Electrical</option>
                  <option>Cleaning</option>
                  <option>Landscaping</option>
                  <option>Other service business</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-[var(--color-copy)]">
                Message
                <textarea
                  className="form-input min-h-40 resize-y"
                  name="message"
                  placeholder="Tell us about your business, your call volume, or what you want the walkthrough to focus on."
                />
              </label>

              <div className="flex flex-col gap-4 border-t border-[var(--color-line)] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
                  Clicking submit opens your default email app and drafts a
                  message to {siteContact.email} with the form details. If you
                  prefer, you can also email or call directly.{" "}
                  {siteContact.responseExpectation}.
                </p>
                <button type="submit" className="btn-primary">
                  Request a Demo
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
