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
];

function getLinkClasses(active: boolean) {
  return [
    "rounded-full px-4 py-2 text-sm font-medium",
    active
      ? "bg-white/[0.12] text-white"
      : "text-white/[0.68] hover:bg-white/[0.06] hover:text-white",
  ].join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const shellClasses = [
    "border border-white/10 bg-[rgba(7,17,29,0.72)] px-4 py-2.5 shadow-[0_12px_36px_rgba(2,6,23,0.18)] backdrop-blur-md sm:px-5",
    isOpen ? "rounded-[2rem]" : "rounded-full",
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
              <div className="hidden min-w-0 sm:-ml-4 sm:block">
                <p className="truncate text-base font-semibold leading-none tracking-[0.11em] text-white sm:text-[1.08rem]">
                  CURRENT AUTOMATIONS &amp; SYSTEMS
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
              <Link href="/book-a-demo#demo-request" className="btn-primary">
                Book a Free 15-Min Call
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white lg:hidden"
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
            <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 lg:hidden">
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
                href="/book-a-demo#demo-request"
                className="btn-primary mt-2"
                onClick={() => setIsOpen(false)}
              >
                Book a Free 15-Min Call
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
