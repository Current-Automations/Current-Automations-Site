"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import {
  COOKIE_SETTINGS_EVENT,
  getConsentServerSnapshot,
  getConsentSnapshot,
  setConsent,
  subscribeToConsent,
} from "@/lib/consent";

/**
 * Nothing that sets a cookie or identifies a visitor loads until the stored choice
 * is "granted". That includes the leadsy.ai visitor identification tag, which used
 * to run unconditionally from the root layout.
 *
 * Vercel Analytics and Speed Insights are deliberately not gated here: they are
 * cookieless and store no identifier, so they are not tracking technologies that
 * require consent. Privacy clause 11 says the same thing in plain language.
 */
export default function CookieConsent({ gaId }: { gaId?: string }) {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );

  useEffect(() => {
    const reopen = () => setConsent(null);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const granted = consent === "granted";

  return (
    <>
      {granted && gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {granted ? (
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          data-pid="15uVMmObwRm7jxnEr"
          data-version="062024"
          strategy="afterInteractive"
        />
      ) : null}

      {consent === "none" ? (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-line-dark bg-[rgba(4,9,26,0.97)] backdrop-blur-md"
        >
          <div className="container-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <p className="max-w-3xl text-sm leading-6 text-on-dark-strong">
              We use cookies that keep this site working, plus optional analytics and visitor
              identification that show us which pages bring in work. The optional ones stay off
              unless you accept.{" "}
              <Link
                href="/privacy#clause-11"
                className="font-semibold text-[var(--color-brand)] underline underline-offset-4 hover:text-white"
              >
                Read the detail
              </Link>
              .
            </p>

            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => setConsent("denied")}
                className="flex-1 rounded-full border border-line-dark bg-surface-dark-2 px-5 py-2.5 text-sm font-semibold text-on-dark-strong transition-colors hover:bg-surface-dark-3 hover:text-white lg:flex-none"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => setConsent("granted")}
                className="btn-primary flex-1 justify-center lg:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
