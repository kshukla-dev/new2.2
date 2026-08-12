'use client'
import React, { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  title?: string
  logo?: string
  website?: string
  image?: string
}

interface CampaignTestimonialsProps {
  eyebrow?: string
  title?: string
  testimonials: Testimonial[]
}

export default function CampaignTestimonials({
  eyebrow = 'CLIENT SUCCESS STORIES',
  title = 'See why companies trust us to hire across borders.',
  testimonials
}: CampaignTestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMouseDown = useRef(false)
  const startX = useRef(0)
  const scrollLeftPos = useRef(0)

  const handleScrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -380, behavior: 'smooth' })
  }

  const handleScrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 380, behavior: 'smooth' })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0)
    scrollLeftPos.current = scrollRef.current?.scrollLeft || 0
  }

  const handleMouseLeaveOrUp = () => {
    isMouseDown.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current.offsetLeft || 0)
    const walk = (x - startX.current) * 1.5
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk
  }

  return (
    <section className="jaf-section" id="testimonials" style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <div className="jaf-container">
        <div className="jaf-faq-layout">
          <div className="jaf-faq-sidebar" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <span className="jaf-hero-eyebrow" style={{ color: '#F7931E', margin: '0 0 12px 0' }}>
                {eyebrow}
              </span>
              <h2 className="jaf-section-title" style={{ fontSize: '32px' }}>
                {title}
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button
                type="button"
                onClick={handleScrollLeft}
                aria-label="Previous testimonial"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff' }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                aria-label="Next testimonial"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff' }}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="jaf-faq-content" style={{ overflow: 'hidden' }}>
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              style={{
                display: 'flex',
                gap: '24px',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                paddingBottom: '16px',
                cursor: 'grab'
              }}
              className="no-scrollbar"
            >
              {testimonials.map((test, index) => (
                <div
                  key={index}
                  className="jaf-white-card"
                  style={{
                    flexShrink: 0,
                    width: '380px',
                    maxWidth: '85vw',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(15,31,61,0.02)'
                  }}
                >
                  <div>
                    {test.title && (
                      <h3 className="jaf-card-title" style={{ fontSize: '18px', marginBottom: '12px' }}>
                        {test.title}
                      </h3>
                    )}
                    <p className="jaf-card-desc" style={{ fontStyle: 'italic', marginBottom: '24px' }}>
                      &ldquo;{test.quote}&rdquo;
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px', borderTop: '1px solid #cbd5e1' }}>
                    {test.image ? (
                      <div className="jaf-testimonial-avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={test.image}
                          alt={test.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div className="jaf-testimonial-avatar" style={{ backgroundColor: '#143369', color: '#ffffff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {test.name[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="jaf-testimonial-author-name" style={{ fontWeight: 'bold', fontSize: '14px', margin: 0 }}>{test.name}</h4>
                      <p className="jaf-testimonial-author-role" style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                        {test.role}, {test.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
