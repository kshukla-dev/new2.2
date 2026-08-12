'use client'

import { useEffect, useState } from 'react'

// Swaps just the country word on a timer. The current word is server-rendered
// (good for SEO), and a visually-hidden list exposes every country to crawlers.
export default function RotatingCountry({
  words,
  interval = 2200,
}: {
  words: string[]
  interval?: number
}) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((prev) => (prev + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span className="rotating-country-wrap">
      {/* key forces a remount each change so the CSS enter animation replays */}
      <span key={i} className="rotating-country" aria-hidden="true">
        {words[i]}
      </span>
      <span className="rc-sr">{words.join(', ')}</span>
    </span>
  )
}
