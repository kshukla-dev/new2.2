'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  // Initialize Lenis smooth scroll exactly once
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      if (lenisRef.current === lenis) {
        lenisRef.current = null
      }
    }
  }, [])

  // Scroll to top + re-init fade-in observer on route change
  useEffect(() => {
    // Scroll to top on route change
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    let observer: IntersectionObserver | null = null

    // Re-run IntersectionObserver for .fade-in elements
    const initObserver = () => {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible')
              obs.unobserve(e.target)
            }
          })
        },
        { threshold: 0.1 }
      )
      document.querySelectorAll('.fade-in:not(.visible)').forEach((el) => {
        if (observer) {
          observer.observe(el)
        }
      })
    }

    // Slight delay to let Next.js render the new page
    const timer = setTimeout(initObserver, 100)
    return () => {
      clearTimeout(timer)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [pathname])

  return <>{children}</>
}
