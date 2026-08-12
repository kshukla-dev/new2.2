/**
 * Frontend duplicate-submission guard for the contact form.
 *
 * We keep the last few successful contact submissions (email + timestamp) in
 * localStorage. If the same email is submitted again within 24 hours, the form
 * skips the API call (avoiding an accidental duplicate) and just shows the
 * thank-you state.
 *
 * This is a per-browser convenience guard, NOT a real deduplication control:
 * it does not stop duplicates from a different browser/device/incognito, and it
 * can be bypassed by clearing storage. True dedup must be enforced server-side.
 */

const CONTACT_SUBMISSIONS_KEY = "jf_contact_submissions";
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_ENTRIES = 15; // keep only the last 5 submissions

interface SubmissionEntry {
  email: string; // normalised (trimmed + lowercased)
  ts: number; // epoch ms of submission
}

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

function readSubmissions(): SubmissionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CONTACT_SUBMISSIONS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is SubmissionEntry =>
        !!e &&
        typeof (e as SubmissionEntry).email === "string" &&
        typeof (e as SubmissionEntry).ts === "number"
    );
  } catch {
    // localStorage unavailable / corrupt value — fail open.
    return [];
  }
}

/**
 * True if this browser already submitted the given email within the last 24h.
 */
export function hasSubmittedEmail(email: string): boolean {
  const target = normalizeEmail(email);
  if (!target) return false;
  const now = Date.now();
  return readSubmissions().some(
    (e) => e.email === target && now - e.ts < WINDOW_MS
  );
}

/**
 * Record a successful submission for the given email. Drops expired entries and
 * any earlier copy of the same email, then keeps only the last MAX_ENTRIES.
 */
export function recordEmailSubmission(email: string): void {
  if (typeof window === "undefined") return;
  const target = normalizeEmail(email);
  if (!target) return;
  try {
    const now = Date.now();
    const kept = readSubmissions().filter(
      (e) => now - e.ts < WINDOW_MS && e.email !== target
    );
    kept.push({ email: target, ts: now });
    const trimmed = kept.slice(-MAX_ENTRIES);
    window.localStorage.setItem(
      CONTACT_SUBMISSIONS_KEY,
      JSON.stringify(trimmed)
    );
  } catch {
    // Ignore — worst case the guard simply isn't persisted.
  }
}
