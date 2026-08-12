import { notFound } from 'next/navigation'

/**
 * The /home route is intentionally disabled.
 *
 * The real implementation still lives in `app/_home/` — the underscore makes it
 * a private folder, so Next.js keeps the code in the repo but opts it out of
 * routing entirely. This stub exists only so that /home resolves to a genuine
 * 404 instead of being swallowed by the `app/[country]` dynamic segment, which
 * matches any single path segment.
 *
 * To re-enable the page: delete this file and rename `app/_home` back to
 * `app/home`.
 */
export default function DisabledHomeRoute() {
  notFound()
}
