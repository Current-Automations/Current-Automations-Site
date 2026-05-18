"use client";

import { useState } from "react";
import Link from "next/link";

const CALENDLY = "https://calendly.com/currentautomations/30min";

export type CartScenario = {
  code: string;
  name: string;
  price: number;
  priceId: string;
  requiresRetell?: boolean;
};

type Props = {
  scenarios: CartScenario[];
};

export default function CartSelector({ scenarios }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(priceId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(priceId)) {
        next.delete(priceId);
      } else {
        next.add(priceId);
      }
      return next;
    });
  }

  const monthlyTotal = scenarios
    .filter((s) => selected.has(s.priceId))
    .reduce((sum, s) => sum + s.price, 0);

  async function handleCheckout() {
    if (selected.size === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceIds: [...selected], hasSetupFee: true }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Unexpected error");
      window.location.href = data.url;
    } catch {
      setError(
        "Something went wrong — please try again or book a call instead."
      );
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_45px_rgba(7,17,29,0.08)]">
      <div className="space-y-1">
        {scenarios.map((scenario) => {
          const isChecked = selected.has(scenario.priceId);
          return (
            <label
              key={scenario.priceId}
              className="flex cursor-pointer items-center justify-between rounded-[1rem] border px-4 py-3 transition-colors hover:bg-[var(--color-brand)]/[0.04]"
              style={{
                borderColor: isChecked ? "rgba(79,208,173,0.3)" : "transparent",
                backgroundColor: isChecked ? "rgba(79,208,173,0.06)" : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(scenario.priceId)}
                  className="h-4 w-4 rounded border-gray-300 accent-[#149676]"
                />
                <div>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {scenario.code}
                  </span>
                  <p className="text-sm font-medium leading-5 text-[var(--color-ink)]">
                    {scenario.name}
                  </p>
                  {scenario.requiresRetell && (
                    <span className="text-xs italic text-[var(--color-muted)]">
                      Retell subscription required separately
                    </span>
                  )}
                </div>
              </div>
              <span className="ml-4 shrink-0 text-sm font-semibold text-[var(--color-ink)]">
                ${scenario.price}/mo
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-6 border-t border-[var(--color-line)] pt-6">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-[var(--color-muted)]">Monthly total</span>
          <span className="text-2xl font-semibold text-[var(--color-ink)]">
            ${monthlyTotal}/mo
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          + one-time $150 CAD setup fee added at checkout
        </p>

        {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

        <button
          onClick={handleCheckout}
          disabled={selected.size === 0 || loading}
          className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Redirecting..." : "Checkout"}
        </button>

        <Link href={CALENDLY} className="btn-secondary mt-3 block w-full text-center">
          Book a Call Instead
        </Link>
      </div>
    </div>
  );
}
