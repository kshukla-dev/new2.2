'use client'

import { useEffect, useState } from 'react'

/**
 * Auto-recovery for Next.js error boundaries (app/error.tsx, app/global-error.tsx).
 *
 * The DOM reconciliation errors this site hits (insertBefore/removeChild
 * "not a child of this node", triggered by browser translation extensions and
 * the like) are transient: calling the boundary's reset() re-renders the
 * subtree from the current DOM and almost always succeeds on the next paint.
 *
 * This hook automatically retries reset() a bounded number of times within a
 * short window so the user never sees the "Something went wrong" screen for a
 * one-off glitch. The counter lives in sessionStorage so it survives the
 * boundary remounting between failed attempts. The visible fallback only shows
 * once retries are exhausted (a genuinely persistent error).
 *
 * @returns `true` while a silent retry is pending (render nothing), `false`
 *          once retries are exhausted (render the visible fallback).
 */
const MAX_RETRIES = 3
const WINDOW_MS = 10_000
const RETRY_DELAY_MS = 150
const STORAGE_KEY = 'jf_err_recover'

export function useAutoRecover(reset: () => void): boolean {
  // Default to "recovering" so the scary screen never flashes before the
  // effect decides whether a retry is available.
  const [recovering, setRecovering] = useState(true)

  useEffect(() => {
    let count = 0
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { count: number; ts: number }
        // Reset the counter if the last failure was outside the window.
        if (Date.now() - parsed.ts < WINDOW_MS) count = parsed.count
      }
    } catch {
      // sessionStorage unavailable (private mode, etc.) — fall back to no retry.
      count = MAX_RETRIES
    }

    if (count >= MAX_RETRIES) {
      // Persistent error: stop retrying and show the visible fallback.
      try {
        sessionStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      setRecovering(false)
      return
    }

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ count: count + 1, ts: Date.now() })
      )
    } catch {
      /* ignore */
    }

    const timer = setTimeout(() => reset(), RETRY_DELAY_MS)
    return () => clearTimeout(timer)
  }, [reset])

  return recovering
}
