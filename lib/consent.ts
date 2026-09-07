export type ConsentChoice = "granted" | "denied";

// "unknown" is what the server and the hydration pass see, since localStorage is
// not readable there. Rendering nothing for it is what stops the banner flashing
// at visitors who already answered.
export type ConsentState = ConsentChoice | "none" | "unknown";

const STORAGE_KEY = "ca-cookie-consent";

// localStorage fires "storage" only in other tabs, so same-tab writes announce
// themselves. Both feed the same useSyncExternalStore subscription.
const CHANGED_EVENT = "ca:cookie-consent-changed";
export const COOKIE_SETTINGS_EVENT = "ca:cookie-settings";

export function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CHANGED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getConsentSnapshot(): ConsentState {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : "none";
  } catch {
    // Private browsing modes throw on storage access. Treat it as unanswered.
    return "none";
  }
}

export function getConsentServerSnapshot(): ConsentState {
  return "unknown";
}

export function setConsent(next: ConsentChoice | null): void {
  try {
    if (next === null) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Non-fatal: the banner still reflects the choice for this page view.
  }
  window.dispatchEvent(new Event(CHANGED_EVENT));
}
