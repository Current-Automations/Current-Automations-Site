"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/demo", label: "Demo" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

function getLinkClasses(active: boolean) {
  return [
    "rounded-full px-4 py-2 text-sm font-medium",
    active
      ? "bg-surface-dark-3 text-white"
      : "text-on-dark hover:bg-surface-dark-2 hover:text-white",
  ].join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const shellClasses = [
    "border border-line-dark bg-[rgba(7,17,29,0.72)] px-4 py-2.5 shadow-[0_12px_36px_rgba(2,6,23,0.18)] backdrop-blur-md sm:px-5",
    isOpen ? "rounded-card-lg" : "rounded-full",
  ].join(" ");

  return (
    <header className="sticky top-0 z-50">
      <div className="container-shell pb-1 pt-3 sm:pt-4">
        <div className={`overflow-hidden ${shellClasses}`}>
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <Image
                src="/current-automations-icon-transparent.png"
                alt="Current Automations icon"
                width={380}
                height={380}
                priority
                className="h-[3.9rem] w-[3.9rem] rounded-full sm:h-[4.2rem] sm:w-[4.2rem]"
              />
              <div className="hidden min-w-0 sm:-ml-2 sm:block">
                <p className="font-display text-[1rem] font-bold leading-none tracking-[0.18em] text-white">
                  CURRENT
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white/55">
                  Automations
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={getLinkClasses(active)}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:block">
              <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb" className="btn-primary" target="_blank" rel="noopener noreferrer">
                Book Free Audit
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-dark bg-surface-dark-1 text-white lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
            >
              <span className="relative block h-4 w-4">
                <span className="absolute inset-x-0 top-[2px] h-0.5 rounded-full bg-current" />
                <span className="absolute inset-x-0 top-[7px] h-0.5 rounded-full bg-current" />
                <span className="absolute inset-x-0 top-[12px] h-0.5 rounded-full bg-current" />
              </span>
            </button>
          </div>

          {isOpen ? (
            <div className="mt-4 grid gap-2 border-t border-line-dark pt-4 lg:hidden">
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={getLinkClasses(active)}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb"
                className="btn-primary mt-2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                Book Free Audit
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
