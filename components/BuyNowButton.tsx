"use client";

import { useState } from "react";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import {
  AI_VOICE_OVERAGE_RATE,
  SETUP_FEE,
  voiceConfigFeeFor,
  voiceMinutesFor,
} from "@/data/pricing";

type Props = {
  priceId: string;
  label?: string;
};

export default function BuyNowButton({ priceId, label = "Get Started" }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const voiceMinutes = voiceMinutesFor([priceId]);
  const voiceConfigFee = voiceConfigFeeFor([priceId]);

  async function handleClick() {
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
        body: JSON.stringify({ priceIds: [priceId], email }),
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
    <>
      {voiceMinutes !== null && (
        <div className="mb-2 rounded border border-[#a8452f]/40 bg-[#a8452f]/5 px-3 py-2">
          <p className="text-xs font-medium text-[#a8452f]">
            Includes {voiceMinutes} AI call minutes per month, pooled across your account
          </p>
          <p className="mt-1 text-xs text-[#58524a]">
            Past {voiceMinutes} minutes, calls bill at ${AI_VOICE_OVERAGE_RATE.toFixed(2)} CAD/min
            on your next invoice. One-time fees at checkout: ${SETUP_FEE} setup plus $
            {voiceConfigFee} AI voice configuration. Anything you have already paid for is deducted
            at checkout, so existing clients are never billed the same fee twice.
          </p>
        </div>
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        disabled={loading}
        className="mb-2 w-full rounded border border-[#a39a86] bg-white px-3 py-2 text-sm text-[#181510] disabled:cursor-not-allowed disabled:opacity-60"
      />
      <button
        onClick={handleClick}
        disabled={loading}
        className={`${jobsheet.punchButton} w-full text-sm disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {loading ? "Redirecting..." : label}
      </button>
      {error && <p className="mt-2 text-xs text-[#a8452f]">{error}</p>}
    </>
  );
}
