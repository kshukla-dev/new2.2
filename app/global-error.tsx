'use client'

import { useEffect } from 'react'
import { useAutoRecover } from '@/hooks/useAutoRecover'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[JF Global Error]', error)
  }, [error])

  // Silently retry transient errors (e.g. DOM-reconciliation glitches from
  // translation extensions) before ever showing the crash screen.
  const recovering = useAutoRecover(reset)

  if (recovering) {
    return (
      <html lang="en">
        <body />
      </html>
    )
  }

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#143369] mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            A temporary error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#143369] text-white rounded-lg font-semibold hover:bg-[#143369]/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
