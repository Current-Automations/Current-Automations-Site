import Reveal from "@/components/Reveal";

type WalkthroughStep = {
  label: string;
  heading: string;
  body: string;
  detail: string;
};

const steps: WalkthroughStep[] = [
  {
    label: "9:02 PM",
    heading: "The call you missed",
    body: "A homeowner calls about a dead furnace. You are off the clock. The call rings out.",
    detail: "Missed call detected",
  },
  {
    label: "9:02 PM",
    heading: "The text that goes out anyway",
    body: "Within seconds they get a text from your number: sorry we missed you, what is the issue, we will get right back to you. They answer instead of dialing the next contractor.",
    detail: "Reply sent in under 60 seconds",
  },
  {
    label: "9:05 PM",
    heading: "The job that lands on your board",
    body: "The system collects the address and the problem, offers a time window, and confirms the booking. You see the full thread in the morning with a job already on the calendar.",
    detail: "Job booked, details captured",
  },
];

export default function Walkthrough() {
  return (
    <ol className="relative grid gap-6 lg:grid-cols-3">
      {/* Connecting line, desktop only */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[var(--color-brand)]/40 to-transparent lg:block"
      />
      {steps.map((step, index) => (
        <Reveal key={step.heading} delay={index * 110}>
          <li className="surface-card lift-card relative h-full list-none rounded-card-lg p-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-strong)] text-sm font-bold text-white">
                {index + 1}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                {step.label}
              </span>
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
              {step.heading}
            </h3>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              {step.body}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-strong)]/25 bg-[var(--color-brand)]/[0.08] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-strong)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-strong)]" />
              {step.detail}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
