'use client'

import { useEffect, useRef, useState } from 'react'
import Globe, { GlobeMethods } from 'react-globe.gl'

export default function GlobeClouds() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  // Keep the globe canvas sized to its container.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setSize({ width: el.clientWidth, height: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Configure controls once the globe is ready.
  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    // Auto-rotate the globe. Flip the sign of autoRotateSpeed to reverse direction.
    const controls = globe.controls() as any
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.6
    controls.enableZoom = false

    // Altitude must be high enough that the WHOLE sphere fits in frame, otherwise
    // the top gets clipped. ~1.4 fits the full rounded globe; the CSS then
    // positions it so only the bottom is sliced. Lower = bigger (risks clipping top).
    globe.pointOfView({ lat: 12, lng: 20, altitude: 1.4 })
  }, [size.width, size.height])

  return (
    <div ref={containerRef} className="globe-clouds-canvas">
      {size.width > 0 && (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="/globe/earth-blue-marble.jpg"
          showAtmosphere={false}
          animateIn={false}
          enablePointerInteraction={false}
        />
      )}
    </div>
  )
}
