"use client";

import { COOKIE_SETTINGS_EVENT } from "@/lib/consent";

/**
 * Consent has to be withdrawable, not just grantable, so the footer carries a way
 * back to the banner after the visitor has already answered.
 */
export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
      className={className}
    >
      Cookie Settings
    </button>
  );
}
