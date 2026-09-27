/**
 * Tiny consent store, kept separate from any UI so it's easy to check
 * from anywhere (e.g. before loading an analytics script later).
 *
 * Nothing on the site currently needs consent — there's no analytics or
 * tracking script wired up yet. This exists so that when one is added,
 * it has a real opt-in gate to check (hasAnalyticsConsent) instead of
 * loading unconditionally.
 */
const STORAGE_KEY = 'epicmouse:cookie-consent'
export const REOPEN_EVENT = 'epicmouse:open-cookie-preferences'

export const DEFAULT_CONSENT = {
  necessary: true, // always on — required for sign-in and saving chapters
  analytics: false,
}

export function getStoredConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return { ...DEFAULT_CONSENT, ...JSON.parse(raw) }
  } catch {
    return null
  }
}

export function saveConsent(consent) {
  const value = { ...DEFAULT_CONSENT, ...consent, decidedAt: new Date().toISOString() }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    /* localStorage unavailable — the choice just won't persist across visits */
  }
  return value
}

// Call this before loading any future analytics/tracking script, so it
// only runs once the visitor has actually opted in.
export function hasAnalyticsConsent() {
  return Boolean(getStoredConsent()?.analytics)
}

// Lets the footer's "Cookie preferences" link reopen the banner without
// any shared React context — the banner listens for this event.
export function reopenCookiePreferences() {
  window.dispatchEvent(new Event(REOPEN_EVENT))
}
