'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useAutoRecover } from '@/hooks/useAutoRecover'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[JF Error Boundary]', error)
  }, [error])

  // Silently retry transient errors before showing the crash screen.
  const recovering = useAutoRecover(reset)

  if (recovering) return null

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-[#143369] mb-3">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          A temporary error occurred while loading this page. Please try again
          — it usually resolves immediately.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#143369] text-white rounded-lg font-semibold hover:bg-[#143369]/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-[#143369] text-[#143369] rounded-lg font-semibold hover:bg-[#143369]/5 transition-colors"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
