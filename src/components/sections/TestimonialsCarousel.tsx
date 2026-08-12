'use client'

import { useState, useMemo, useEffect } from 'react'
import { SlideIn } from '@/components/animations/SlideIn'

interface TestimonialItem {
  id: string | number
  name: string
  role: string
  review: string
  image: string
  metricText?: string
  metricIcon?: string
  metricTheme?: string
}

interface TestimonialsCarouselProps {
  title: string
  testimonials: TestimonialItem[]
}

export function TestimonialsCarousel({ title, testimonials }: TestimonialsCarouselProps) {
  const TESTIMONIAL_COUNT = testimonials.length

  const testimonialsWithMetrics = useMemo(() => {
    return testimonials.map((t, idx) => {
      let metricText = t.metricText || "Handled operations with 100% compliance"
      let metricIcon = t.metricIcon || "shield"
      let metricTheme = t.metricTheme || "blue"

      if (!t.metricText) {
        if (t.name.toLowerCase().includes("priya") || t.name.toLowerCase().includes("sarah")) {
          metricText = "Handled operations in <strong>5+ countries</strong> with <strong>100% compliance</strong>"
          metricIcon = "shield"
          metricTheme = "blue"
        } else if (t.name.toLowerCase().includes("anya") || t.name.toLowerCase().includes("laura")) {
          metricText = "Relocated <strong>3 teams</strong> and families successfully"
          metricIcon = "people"
          metricTheme = "purple"
        } else if (t.name.toLowerCase().includes("thomas") || t.name.toLowerCase().includes("james") || t.name.toLowerCase().includes("carter")) {
          metricText = "Onboarded <strong>7 countries</strong> in just <strong>2 months</strong>"
          metricIcon = "chart"
          metricTheme = "green"
        } else if (t.name.toLowerCase().includes("lina")) {
          metricText = "Setup compliant contracts in <strong>2 weeks</strong>"
          metricIcon = "shield"
          metricTheme = "blue"
        } else {
          const themes = ["blue", "green", "purple"]
          const icons = ["shield", "chart", "people"]
          const texts = [
            "Saved <strong>€15,000+</strong> in local entity setup fees",
            "Managed payroll in <strong>90+ currencies</strong> seamlessly",
            "Onboarded in <strong>less than 48 hours</strong> compliantly"
          ]
          metricText = texts[idx % texts.length]
          metricIcon = icons[idx % icons.length]
          metricTheme = themes[idx % themes.length]
        }
      }

      return { ...t, metricText, metricIcon, metricTheme }
    })
  }, [testimonials])

  const totalSlides = testimonialsWithMetrics.length
  const [activeIndex, setActiveIndex] = useState(totalSlides)
  const [noAnim, setNoAnim] = useState(false)

  // Tripled list for infinite scrolling
  const loopedTestimonials = useMemo(
    () => [...testimonialsWithMetrics, ...testimonialsWithMetrics, ...testimonialsWithMetrics],
    [testimonialsWithMetrics]
  )

  function prevSlide() {
    setNoAnim(false)
    setActiveIndex(prev => prev - 1)
  }

  // Auto-advance loop tracking helpers
  function nextSlide() {
    setNoAnim(false)
    setActiveIndex(prev => prev + 1)
  }

  function handleTrackTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (activeIndex >= totalSlides * 2) {
      setNoAnim(true)
      setActiveIndex(activeIndex - totalSlides)
    } else if (activeIndex < totalSlides) {
      setNoAnim(true)
      setActiveIndex(activeIndex + totalSlides)
    }
  }

  useEffect(() => {
    if (!noAnim) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setNoAnim(false))
    )
    return () => cancelAnimationFrame(id)
  }, [noAnim])

  function setSlide(index: number) {
    setNoAnim(false)
    setActiveIndex(totalSlides + index)
  }

  return (
    <div className="home-content-scale">
      <style>{`
/* Testimonials Carousel Slider styles */
.testimonials-section {
  position: relative;
  overflow: hidden;
  padding: 40px 0;
}
.testimonials-carousel {
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 64px;
  --card-width: 380px;
  --card-gap: 32px;
}
@media (max-width: 600px) {
  .testimonials-carousel {
    --card-width: 290px;
    --card-gap: 16px;
    padding: 0 16px;
  }
  .carousel-btn {
    display: none;
  }
}
.carousel-viewport {
  overflow: hidden;
  padding: 24px 0 48px 0;
}
.carousel-track {
  display: flex;
  gap: var(--card-gap);
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.carousel-card-wrap {
  flex: 0 0 var(--card-width);
  transition: transform 0.4s ease, opacity 0.4s ease;
  opacity: 0.4;
}
.carousel-card-wrap.active {
  opacity: 1;
  transform: scale(1.02);
}
.carousel-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid var(--border, #e2e8f0);
  padding: 36px 32px;
  box-shadow: 0 8px 30px -10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 410px;
  position: relative;
  transition: border-color 0.4s, box-shadow 0.4s;
}
.carousel-card-wrap.active .carousel-card {
  border-color: var(--accent, #143369);
  box-shadow: 0 20px 40px -12px rgba(20, 51, 105, 0.1);
}
.carousel-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.cc-author-info {
  display: flex;
  align-items: center;
  gap: 16px;
}
.cc-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
}
.cc-details strong {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: var(--ink, #1e293b);
  margin-bottom: 2px;
}
.cc-details span {
  display: block;
  font-size: 12px;
  color: var(--accent, #143369);
  font-weight: 600;
}
.cc-quote-badge {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent-soft, #f0f4ff);
  color: var(--accent, #143369);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: var(--serif, Georgia, serif);
  font-weight: bold;
}
.cc-quote-badge.purple {
  background: #faf5ff;
  color: #9333ea;
}
.cc-quote-badge.green {
  background: #f0fdf4;
  color: #16a34a;
}
.cc-body {
  font-size: 14px;
  color: var(--ink-soft, #475569);
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 24px;
}
.cc-metric-badge {
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--ink-soft, #475569);
  margin-top: auto;
}
.cc-metric-badge strong {
  color: var(--ink, #1e293b);
  font-weight: 600;
}
.cc-metric-badge.blue {
  background: #f0f4ff;
  border: 1px solid #e0ebff;
  color: var(--accent, #143369);
}
.cc-metric-badge.blue svg {
  color: var(--accent, #143369);
  flex-shrink: 0;
}
.cc-metric-badge.green {
  background: #f0fdf4;
  border: 1px solid #dcfce7;
  color: #15803d;
}
.cc-metric-badge.green svg {
  color: #16a34a;
  flex-shrink: 0;
}
.cc-metric-badge.purple {
  background: #faf5ff;
  border: 1px solid #f3e8ff;
  color: #7e22ce;
}
.cc-metric-badge.purple svg {
  color: #9333ea;
  flex-shrink: 0;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ffffff91;
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink, #1e293b);
  cursor: pointer;
  z-index: 5;
  transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
}
.carousel-btn:hover {
  background: var(--bg, #f8fafc);
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  transform: translateY(-50%) scale(1.05);
}
.carousel-btn.prev {
  left: 8px;
}
.carousel-btn.next {
  right: 8px;
}

.carousel-pagination {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}
.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d1d5db;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s, transform 0.3s;
}
.carousel-dot.active {
  background: var(--accent, #143369);
  transform: scale(1.25);
}

.endorsement-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
  font-size: 14px;
  color: var(--ink-soft, #475569);
  font-weight: 500;
}
.endorsement-row strong {
  color: var(--accent, #143369);
  font-weight: 700;
}
.laurel-icon {
  color: var(--accent, #143369);
  opacity: 0.8;
}

.testimonials-head-wrap {
  text-align: center;
  margin-bottom: 24px;
}

.testimonials-title {
  font-family: var(--serif, Georgia, serif);
  font-size: clamp(28px, 4vw, 42px);
  color: var(--ink, #1e293b);
  font-weight: 400;
}

.testimonials-title span {
  color: var(--accent, #143369);
  font-style: italic;
}
      `}</style>
      <section className="testimonials-section section-alt">
        <SlideIn direction="up">
          <div className="testimonials-head-wrap">
            <h2 className="testimonials-title">
              {title.toLowerCase().includes("saying") ? (
                <>What our <span>clients</span> are saying</>
              ) : (
                <>What our <span>clients</span> say</>
              )}
            </h2>
          </div>
        </SlideIn>

        <SlideIn direction="up" delay={0.2}>
          <div className="testimonials-carousel" style={{ '--card-width': '380px', '--card-gap': '32px' } as any}>
            <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div className="carousel-viewport">
              <div className="carousel-track" onTransitionEnd={handleTrackTransitionEnd} style={{ transform: `translateX(calc(50% - (var(--card-width) / 2) - (${activeIndex} * (var(--card-width) + var(--card-gap)))))`, transition: noAnim ? 'none' : undefined }}>
                {loopedTestimonials.map((t: any, idx: number) => (
                  <div key={idx} className={`carousel-card-wrap ${idx === activeIndex ? 'active' : ''}`}>
                    <div className="carousel-card">
                      <div className="carousel-card-header">
                        <div className="cc-author-info">
                          <img src={t.image} alt={t.name} className="cc-avatar" loading="lazy" />
                          <div className="cc-details">
                            <strong>{t.name}</strong>
                            <span>{t.role}</span>
                          </div>
                        </div>
                        <div className={`cc-quote-badge ${t.metricTheme}`}>“</div>
                      </div>

                      <p className="cc-body">&quot;{t.review}&quot;</p>

                      <div className={`cc-metric-badge ${t.metricTheme}`}>
                        {t.metricIcon === 'shield' ? (
                          <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>
                        ) : t.metricIcon === 'chart' ? (
                          <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18" /><polyline points="17 6 23 6 23 12" /></svg></span>
                        ) : (
                          <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></span>
                        )}
                        <span dangerouslySetInnerHTML={{ __html: t.metricText }}></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-btn next" onClick={nextSlide} aria-label="Next testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>

            <div className="carousel-pagination">
              {Array.from({ length: Math.min(6, totalSlides) }).map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${((activeIndex % totalSlides) + totalSlides) % totalSlides === i ? 'active' : ''}`}
                  onClick={() => setSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </SlideIn>

        <div className="endorsement-row">
          <svg className="laurel-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 8.48 17 12a7 7 0 0 1-6 8Z" />
            <path d="M9 10a5 5 0 0 0 4-4" />
          </svg>
          <span>Trusted by <strong>700+</strong> companies worldwide</span>
          <svg className="laurel-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}>
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 8.48 17 12a7 7 0 0 1-6 8Z" />
            <path d="M9 10a5 5 0 0 0 4-4" />
          </svg>
        </div>
      </section>
    </div>
  )
}
