'use client'

import { useEffect, useRef } from 'react'
import * as Flags from 'country-flag-icons/react/3x2'

export type Country = {
  name: string
  code: string // ISO 3166-1 alpha-2, used for the flag
  landmark?: string // unused now (kept so the data shape stays stable)
  tagline?: string // shown in the hover tooltip
}

// --- Tuning knobs -----------------------------------------------------------
const ORBIT_FACTOR = 0.98 // orbit radius vs globe radius (lower = flags sit lower / closer to surface)
const RADIUS_FACTOR = 0.98 // fraction of the canvas the globe fills
const ORBIT_SECONDS = 150 // seconds for one full revolution (slow + premium)
const VISIBLE_HALF_ARC = 88 // degrees from the top within which items are shown
const SCALE_MAX = 1 // depth scale at the top-centre (closest)
const SCALE_MIN = 0.7 // depth scale at the arc edges (farthest)
const ORBIT_LIFT = 100 // px to raise the whole ring ABOVE the earth (desktop/laptop/tablet)
const ORBIT_LIFT_MOBILE = 20 // smaller float on mobile so the flags sit closer to the earth
// The country set is repeated this many times around the full ellipse so the
// belt is continuous (never empty) while staying tight. More = tighter spacing.
// Copies of the same country sit 360/REPEAT° apart — kept off-screen from each
// other so you never see the same flag twice. 3 is a safe, tight default.
const REPEAT = 3
// ---------------------------------------------------------------------------

export default function GlobeOrbit({ countries }: { countries: Country[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const ellipseRef = useRef<SVGEllipseElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const pausedRef = useRef(false)
  const phaseRef = useRef(0)
  const lastRef = useRef<number | null>(null)

  // Repeat the countries around the full circle for a seamless, gapless loop.
  const items = Array.from({ length: REPEAT }, () => countries).flat()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const section = root.parentElement as HTMLElement | null
    if (!section) return

    let raf = 0
    let running = true
    const degPerSec = 360 / ORBIT_SECONDS
    const N = items.length

    const frame = (now: number) => {
      if (!running) return
      if (lastRef.current == null) lastRef.current = now
      const dt = (now - lastRef.current) / 1000
      lastRef.current = now
      if (!pausedRef.current) phaseRef.current = (phaseRef.current + dt * degPerSec) % 360

      const canvas = section.querySelector('.globe-clouds-canvas') as HTMLElement | null
      if (canvas) {
        const c = canvas.getBoundingClientRect()
        const s = section.getBoundingClientRect()
        const cx = c.left - s.left + c.width / 2
        // Globe centre, lifted upward so the whole ring sits higher (less lift on mobile).
        const lift = window.innerWidth <= 640 ? ORBIT_LIFT_MOBILE : ORBIT_LIFT
        const cy = c.top - s.top + c.height / 2 - lift
        const R = (c.height / 2) * RADIUS_FACTOR
        const rx = R * ORBIT_FACTOR
        const ry = rx

        if (ellipseRef.current) {
          ellipseRef.current.setAttribute('cx', String(cx))
          ellipseRef.current.setAttribute('cy', String(cy))
          ellipseRef.current.setAttribute('rx', String(rx))
          ellipseRef.current.setAttribute('ry', String(ry))
        }

        // Evenly spaced around the whole circle so the belt is gapless and loops
        // forever — as one drops off the left, the next comes over from the right.
        const stepDeg = 360 / N
        for (let i = 0; i < N; i++) {
          const el = itemRefs.current[i]
          if (!el) continue
          let a = (90 + i * stepDeg + phaseRef.current) % 360
          if (a < 0) a += 360
          const rad = (a * Math.PI) / 180
          const x = cx + rx * Math.cos(rad)
          const y = cy - ry * Math.sin(rad) // minus so sin>0 goes up (top of globe)

          let fromTop = Math.abs(a - 90)
          if (fromTop > 180) fromTop = 360 - fromTop
          const t = Math.min(fromTop / VISIBLE_HALF_ARC, 1) // 0 centre → 1 edge
          const scale = SCALE_MAX - (SCALE_MAX - SCALE_MIN) * t

          el.style.transform = `translate(${x}px, ${y}px)`
          el.style.setProperty('--s', String(scale))
          el.style.opacity = fromTop <= VISIBLE_HALF_ARC ? String(1 - 0.5 * t) : '0'
          el.style.zIndex = String(1000 - Math.round(fromTop))
        }
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      running = false
      cancelAnimationFrame(raf)
    }
  }, [countries])

  return (
    <div ref={rootRef} className="globe-orbit">
      <svg className="globe-orbit-line" aria-hidden="true">
        <ellipse ref={ellipseRef} cx="0" cy="0" rx="0" ry="0" />
      </svg>
      {items.map((ct, i) => {
        const Flag = (Flags as Record<string, React.ComponentType<{ className?: string }>>)[ct.code]
        return (
          <div
            key={`${ct.code}-${i}`}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            className="globe-orbit-item"
            style={{ opacity: 0 }}
          >
            <div
              className="orbit-content"
              onMouseEnter={() => {
                pausedRef.current = true
              }}
              onMouseLeave={() => {
                pausedRef.current = false
              }}
            >
              {ct.tagline && (
                <div className="orbit-tooltip">
                  <strong>{ct.name}</strong>
                  <span>{ct.tagline}</span>
                </div>
              )}
              <div className="orbit-flag">{Flag ? <Flag /> : null}</div>
              <div className="orbit-name">{ct.name}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
