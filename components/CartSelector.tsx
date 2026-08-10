"use client";

import { useState } from "react";
import Link from "next/link";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import {
  AI_VOICE_OVERAGE_RATE,
  SETUP_FEE,
  VOICE_CONFIG_FEE,
  includesAiVoice,
  voiceMinutesFor,
} from "@/data/pricing";

const BOOK_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export type CartScenario = {
  code: string;
  name: string;
  price: number;
  priceId: string;
};

type Props = {
  scenarios: CartScenario[];
};

export default function CartSelector({ scenarios }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState("");
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

  const hasVoiceScenario = includesAiVoice(selected);
  const voiceMinutes = voiceMinutesFor(selected);

  async function handleCheckout() {
    if (selected.size === 0) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email to continue.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceIds: [...selected], email }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Unexpected error");
      window.location.href = data.url;
    } catch {
      setError(
        "Something went wrong. Please try again or book a call instead."
      );
      setLoading(false);
    }
  }

  return (
    <div className={`${jobsheet.ticket} p-8`}>
      <div className="space-y-1">
        {scenarios.map((scenario) => {
          const isChecked = selected.has(scenario.priceId);
          return (
            <label
              key={scenario.priceId}
              className={`${jobsheet.ledgerRow} flex cursor-pointer items-center justify-between rounded border px-4 py-3`}
              style={{
                borderColor: isChecked ? "rgba(20,150,118,0.4)" : "transparent",
                backgroundColor: isChecked ? "rgba(20,150,118,0.08)" : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(scenario.priceId)}
                  className="h-4 w-4 rounded border-[#a39a86] accent-[#149676]"
                />
                <div>
                  <span className={`${jobsheet.mono} text-xs text-[#58524a]`}>
                    {scenario.code}
                  </span>
                  <p className="text-sm font-medium leading-5 text-[#181510]">
                    {scenario.name}
                  </p>
                </div>
              </div>
              <span className={`${jobsheet.mono} ml-4 shrink-0 text-sm font-semibold text-[#181510]`}>
                ${scenario.price}/mo
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-6 border-t-2 border-dashed border-[rgba(28,36,48,0.24)] pt-6">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-[#58524a]">Monthly total</span>
          <span className={`${jobsheet.mono} text-2xl font-semibold text-[#181510]`}>
            ${monthlyTotal}/mo
          </span>
        </div>
        <p className="mt-1 text-xs text-[#58524a]">
          + one-time ${SETUP_FEE} CAD setup fee added at checkout
        </p>
        {hasVoiceScenario && (
          <p className="mt-1 text-xs text-[#58524a]">
            + one-time ${VOICE_CONFIG_FEE} CAD AI voice configuration fee
          </p>
        )}
        {voiceMinutes !== null && (
          <div className="mt-3 rounded border border-[#a8452f]/40 bg-[#a8452f]/5 px-3 py-2">
            <p className="text-xs font-medium text-[#a8452f]">
              Includes {voiceMinutes} AI call minutes per month, pooled across your account
            </p>
            <p className="mt-1 text-xs text-[#58524a]">
              Minutes are shared no matter how many voice scenarios you run. Past{" "}
              {voiceMinutes} minutes, calls bill at ${AI_VOICE_OVERAGE_RATE.toFixed(2)} CAD/min on
              your next invoice. The separate configuration fee covers Retell setup (call flow,
              knowledge base, live testing), which is custom work per client rather than templated
              like the other automations.
            </p>
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={loading}
          className="mt-4 w-full rounded border border-[#a39a86] bg-white px-3 py-2 text-sm text-[#181510] disabled:cursor-not-allowed disabled:opacity-60"
        />

        {error && <p className="mt-3 text-xs text-[#a8452f]">{error}</p>}

        <button
          onClick={handleCheckout}
          disabled={selected.size === 0 || loading}
          className={`${jobsheet.punchButton} mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {loading ? "Redirecting..." : "Checkout"}
        </button>

        <Link href={BOOK_URL} className={`${jobsheet.punchButton} ${jobsheet.punchButtonGhost} mt-3 w-full text-center`}>
          Book a Call Instead
        </Link>
      </div>
    </div>
  );
}
