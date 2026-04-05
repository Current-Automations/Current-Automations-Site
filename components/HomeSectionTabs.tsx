const beforeReviews = [
  { href: "#overview", label: "Overview" },
  { href: "#problem", label: "The Problem" },
  { href: "#workflow", label: "How It Works" },
  { href: "#demo", label: "Try It" },
  { href: "#why-current", label: "Why Us" },
];

const reviewsLink = { href: "#testimonials", label: "Reviews" };

const afterReviews = [
  { href: "#results", label: "Results" },
  { href: "#math", label: "The Math" },
];

type HomeSectionTabsProps = {
  showReviews?: boolean;
};

export default function HomeSectionTabs({ showReviews = false }: HomeSectionTabsProps) {
  const sectionLinks = showReviews
    ? [...beforeReviews, reviewsLink, ...afterReviews]
    : [...beforeReviews, ...afterReviews];

  return (
    <section className="border-b border-[var(--color-line)] bg-white/[0.82] py-3.5 backdrop-blur-sm">
      <div className="container-shell overflow-x-auto">
        <nav className="flex min-w-max gap-2.5">
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-copy)] shadow-[0_10px_24px_rgba(7,17,29,0.06)] hover:-translate-y-px hover:border-[rgba(20,150,118,0.2)] hover:text-[var(--color-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
