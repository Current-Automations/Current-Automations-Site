"use client";

import { useState } from "react";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";

type Props = {
  priceId: string;
  label?: string;
};

export default function BuyNowButton({ priceId, label = "Get Started" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceIds: [priceId], hasSetupFee: true }),
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
