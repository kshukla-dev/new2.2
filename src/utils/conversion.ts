// Google Ads conversion tracking helpers.
//
// The site loads the Google tag (gtag.js) in app/layout.tsx, which also exposes
// a `window.gtagSendEvent(url)` helper for click→navigate links. For actions
// that should NOT navigate the current tab (a new-tab Calendly link, a form
// submit), fire the conversion event directly via fireContactConversion().

/** Google Ads conversion action name (created in Google Ads, linked to the Google tag). */
export const CONTACT_CONVERSION_EVENT = "ads_conversion_Contact_Us_1";

/**
 * Fire the "Contact Us" Google Ads conversion without navigating away.
 * Safe to call on the server (no-op) and when gtag hasn't loaded yet.
 */
export function fireContactConversion(): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", CONTACT_CONVERSION_EVENT, {});
  }
}
