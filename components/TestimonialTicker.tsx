const testimonials = [
  {
    quote:
      "We were losing calls every day while on jobs. Within the first week the system had already caught three leads we would have missed completely.",
    name: "James R.",
    business: "Ottawa Plumbing Co.",
  },
  {
    quote:
      "I used to dread checking my phone after a busy day. Now everything is already handled. The follow up runs without me touching anything.",
    name: "Mike T.",
    business: "Capital HVAC Services",
  },
  {
    quote:
      "A customer told me they chose us because we were the only company that responded right away. That was the system doing its job.",
    name: "Sarah K.",
    business: "Bright Clean Ottawa",
  },
  {
    quote:
      "Set up was done in under 48 hours. I did not have to change anything about how I work. It just runs in the background.",
    name: "Derek L.",
    business: "Voltline Electrical",
  },
  {
    quote:
      "One recovered job in the first month paid for six months of the service. The math is not complicated.",
    name: "Tony M.",
    business: "GreenCut Landscaping",
  },
  {
    quote:
      "My team spends zero time chasing cold leads now. Every callback we make is to someone who already told us what they need.",
    name: "Rachel B.",
    business: "Ottawa Home Services",
  },
];

const doubled = [...testimonials, ...testimonials];

export default function TestimonialTicker() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 36s linear infinite;
        }
        .ticker-container:hover .ticker-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
            What service businesses are saying
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Placeholder testimonials shown. Real client results coming soon.
          </p>
        </div>
      </div>

      <div className="ticker-container overflow-hidden">
        <div className="ticker-track flex w-max gap-5 px-6 sm:px-8">
          {doubled.map((t, i) => (
            <article
              key={i}
              className="w-[320px] shrink-0 rounded-[1.75rem] border border-[var(--color-line)] bg-white p-7 shadow-[0_18px_45px_rgba(7,17,29,0.08)] sm:w-[360px] lg:w-[400px]"
            >
              <span
                aria-hidden="true"
                className="block text-5xl font-bold leading-none text-[var(--color-accent)]"
              >
                &ldquo;
              </span>
              <p className="mt-3 text-base leading-8 text-[var(--color-copy)]">
                {t.quote}
              </p>
              <div className="mt-6">
                <p className="text-base font-semibold text-[var(--color-ink)]">
                  {t.name}
                </p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {t.business}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
