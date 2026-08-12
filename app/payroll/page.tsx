'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import '@/styles/service-page.css'
import './payroll-page.css'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { SlideIn } from '@/components/animations/SlideIn'
import payroll from '@/data/payroll.json'
import QuickContactForm from '@/components/sections/QuickContactForm'

export default function PayrollPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [openTech, setOpenTech] = useState(-1)
  const [openProcess, setOpenProcess] = useState(-1)
  const [isMobile, setIsMobile] = useState(false)
  const [showAllMarkets, setShowAllMarkets] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const [isHovered, setIsHovered] = useState(false)
  const testimonialScrollRef = useRef<HTMLDivElement>(null)
  const testimonialsIsDown = useRef(false)
  const testimonialsStartX = useRef(0)
  const testimonialsScrollStart = useRef(0)

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialScrollRef.current) {
      const scrollAmount = 424; // card width + gap
      testimonialScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  const handleTestimonialsMouseDown = (e: React.MouseEvent) => {
    if (!testimonialScrollRef.current) return
    testimonialsIsDown.current = true
    testimonialScrollRef.current.classList.add('active-dragging')
    testimonialsStartX.current = e.pageX - testimonialScrollRef.current.offsetLeft
    testimonialsScrollStart.current = testimonialScrollRef.current.scrollLeft
  }

  const handleTestimonialsMouseLeave = () => {
    testimonialsIsDown.current = false
    if (testimonialScrollRef.current) {
      testimonialScrollRef.current.classList.remove('active-dragging')
    }
  }

  const handleTestimonialsMouseUp = () => {
    testimonialsIsDown.current = false
    if (testimonialScrollRef.current) {
      testimonialScrollRef.current.classList.remove('active-dragging')
    }
  }

  const handleTestimonialsMouseMove = (e: React.MouseEvent) => {
    if (!testimonialsIsDown.current || !testimonialScrollRef.current) return
    e.preventDefault()
    const x = e.pageX - testimonialScrollRef.current.offsetLeft
    const walk = (x - testimonialsStartX.current) * 1.5 // scroll speed
    testimonialScrollRef.current.scrollLeft = testimonialsScrollStart.current - walk
  }

  useEffect(() => {
    // Only run auto-scroll if it's mobile view (approximate via window.innerWidth or just let it run if scrollable)
    let animationFrameId: number;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      // Only auto-scroll if we have overflow
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        if (!isDown.current && !isHovered) {
          scrollContainer.scrollLeft += 0.5; // Decreased speed from 1.5 to 0.5
          // Loop back when we've scrolled past half the items
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  function toggleTech(i: number) {
    setOpenTech(prev => prev === i ? -1 : i)
  }

  function toggleProcess(i: number) {
    setOpenProcess(prev => prev === i ? -1 : i)
  }

  const trustAvatars = [
    '/testimonials/lina.webp',
    '/testimonials/Anya.webp',
    '/testimonials/priya.webp',
  ]

  return (
    <>
      {/* Payroll styles imported via payroll-page.css */}


      <header id="payroll-hero" className="service-hero payroll-hero">
        <div className="payroll-hero-inner">
          <div className="service-hero-copy">
            <SlideIn direction="left" delay={0.1}>
              <h1>
                International payroll services, handled by <em>local specialists</em>
              </h1>
            </SlideIn>
            <SlideIn direction="left" delay={0.2}>
              <p className="service-hero-lede">
                {payroll.definition.description}
              </p>
            </SlideIn>

            <SlideIn direction="right" delay={0.4}>
              <div className="cta-row">
                <Link href="/contact?reason=payroll_services" className="btn-primary">
                  {payroll.definition.primaryButtonText}
                </Link>
                <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  {payroll.definition.secondaryButtonText}
                </a>
              </div>
            </SlideIn>
            <SlideIn direction="up" delay={0.5} className="trust-row-wrapper">
              <div className="payroll-trust-checks">
                <div className="trust-check-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="trust-icon" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 11 2 2 4-4"></path>
                  </svg>
                  <span>SNA Accredited</span>
                </div>
                <div className="trust-check-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="trust-icon" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>Founded 2013</span>
                </div>
                <div className="trust-check-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="trust-icon" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>13 markets with in-country specialists</span>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Right Floating Form */}
          <SlideIn direction="fade-left" delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
            <QuickContactForm />
          </SlideIn>
        </div>
      </header>



      {/* <div className="home-content-scale">
        <section className="stats-strip">
          <div className="container stats-strip-inner">
            {payroll.definition.trustSignals.stats.map((s: any, i: number) => (
              <SlideIn key={i} direction="fade-up" delay={0.2 + i * 0.1} className="stat-item">
                <strong>{s.value}</strong>
                {s.label && <span className="stat-label">{s.label}</span>}
                <span className="stat-desc">{s.description}</span>
              </SlideIn>
            ))}
          </div>
        </section>
      </div> */}
      <div className="home-content-scale">
        <section className="section section-alt-blue">
          <div className="container">
            <div className="section-head text-center">
              <h2 className="section-title">{payroll.eorComparison.title}</h2>
              <p className="section-lead mx-auto">{payroll.eorComparison.description}</p>
            </div>
            <div className="comparison-grid comparison-grid-2 mx-auto">
              {payroll.eorComparison.options.map((opt: any, index: number) => (
                <SlideIn
                  key={opt.type}
                  direction="zoom-in-up"
                  delay={index * 0.2}
                  className={`comparison-card ${opt.type.toLowerCase().includes('eor') ? 'is-featured' : ''}`}
                >
                  <div className="comparison-card-head">
                    <h3>{opt.type}</h3>
                  </div>
                  <ul>
                    {opt.features.map((f: string) => (
                      <li key={f}>
                        <span className="li-mark" aria-hidden>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  {(opt.type.toLowerCase().includes('eor')) && (
                    <div className="comparison-card-link-wrap">
                      <Link href="/employer-of-record" className="comparison-card-link">
                        See our Employer of Record service
                      </Link>
                    </div>
                  )}
                  {/* <div className="comparison-bestfor">
                    <span>Best for</span>
                    <strong>{opt.bestFor}</strong>
                  </div> */}
                </SlideIn>
              ))}
            </div>
          </div>
        </section>
      </div>


      <div className="home-content-scale ">
        <section className="section container">
          <div className="desk-grid">
            <div className="desk-sidebar">
              <SlideIn direction="fade-right" delay={0.1}>
                <h2 className="desk-title">{payroll.deskDisappears.title}</h2>
                <p className="desk-lead">{payroll.deskDisappears.subtitle}</p>

              </SlideIn>
            </div>
            <div className="desk-content">

              <div className="desk-cards">
                {payroll.deskDisappears.items.map((item: any, i: number) => (
                  <SlideIn key={i} direction="fade-up" delay={0.1 + i * 0.05} className="desk-card">
                    <div className="desk-card-icon">
                      <svg className="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="desk-card-text">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>





      <div className="home-content-scale section-why-jf section-alt-blue">
        <section className="section container">
          <div className="section-head text-center">
            <SlideIn direction="fade-up" delay={0.1}>
              <h2 className="section-title">{payroll.whyJf.title}</h2>
            </SlideIn>
          </div>
          <div className="why-jf-pillars">
            {payroll.whyJf.pillars.map((p: any, pIdx: number) => (
              <SlideIn key={p.id} direction="fade-up" delay={0.1 + pIdx * 0.15} className="why-jf-pillar">
                <div className="pillar-left">
                  <span className="pillar-num">0{p.id}</span>
                  <h3 className="pillar-title">{p.title}</h3>
                </div>
                <div className="pillar-right">
                  <p className="pillar-desc">{p.description}</p>
                  {p.description2 && <p className="pillar-desc">{p.description2}</p>}
                  {p.description3 && <p className="pillar-desc">{p.description3}</p>}

                  {p.callout && (
                    <div className="pillar-callout">
                      <p>"{p.callout}"</p>
                    </div>
                  )}

                  {p.markets && (
                    <div className="pillar-markets">
                      <span className="markets-label">OUR MARKETS:</span>
                      <div className="markets-list">
                        {p.markets.map((m: string) => (
                          <span key={m} className="market-tag">{m}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </SlideIn>
            ))}
          </div>
        </section>
      </div>


      <div className="home-content-scale">
        <section className="section container">
          <div className="section-head text-center">
            <SlideIn direction="fade-up" delay={0.1}>
              <h2 className="section-title">{payroll.ourMarkets.title}</h2>
            </SlideIn>
            <SlideIn direction="fade-up" delay={0.2}>
              <p className="section-lead mx-auto">{payroll.ourMarkets.subtitle}</p>
            </SlideIn>
          </div>
          <div className="markets-grid">
            {((isMobile && !showAllMarkets)
              ? payroll.ourMarkets.markets.slice(0, 3)
              : payroll.ourMarkets.markets
            ).map((m: any, mIdx: number) => (
              <SlideIn
                key={m.name}
                direction="fade-up"
                delay={0.05 * mIdx}
                className="market-card"
                style={{ backgroundImage: `linear-gradient(rgba(14, 15, 59, 0.72), rgba(14, 15, 59, 0.94)), url(${m.image})` }}
              >
                <div className="market-card-info">
                  <div className="market-card-header">
                    <div className="location-icon-wrapper">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <h3>{m.name}</h3>
                  </div>
                  <p className="market-card-detail">{m.details}</p>
                </div>
                <Link href={m.link} className="market-card-link">
                  {m.linkText.includes('→') ? m.linkText.replace(' →', '') : m.linkText}
                </Link>
              </SlideIn>
            ))}
          </div>
          {isMobile && (
            <div className="markets-show-more-wrap">
              <button
                className="btn-markets-show-more"
                onClick={() => setShowAllMarkets(!showAllMarkets)}
              >
                {showAllMarkets ? 'Show less' : 'Show more'}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ transform: showAllMarkets ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', marginLeft: '6px' }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          )}
          <SlideIn direction="fade-up" delay={0.3} className="market-footer">
            <p>
              {payroll.ourMarkets.footerText}
              <Link href={payroll.ourMarkets.footerLink}>
                {payroll.ourMarkets.footerLinkText}
              </Link>
            </p>
          </SlideIn>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section-testimonials">
          <div className="container">
            <div className="testimonials-split-grid">
              <div className="testimonials-left-col">
                <SlideIn direction="fade-right" delay={0.1}>
                  <span className="section-eyebrow">{payroll.socialProof.eyebrow}</span>
                  <h2 className="section-title">{payroll.socialProof.title}</h2>
                </SlideIn>
                <SlideIn direction="fade-right" delay={0.2} className="testimonials-nav-buttons">
                  <button
                    onClick={() => scrollTestimonials('left')}
                    className="testimonials-nav-btn"
                    aria-label="Previous Testimonial"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollTestimonials('right')}
                    className="testimonials-nav-btn"
                    aria-label="Next Testimonial"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </SlideIn>
              </div>
              <div
                className="testimonials-slider-container"
                ref={testimonialScrollRef}
                onMouseDown={handleTestimonialsMouseDown}
                onMouseLeave={handleTestimonialsMouseLeave}
                onMouseUp={handleTestimonialsMouseUp}
                onMouseMove={handleTestimonialsMouseMove}
              >
                {payroll.socialProof.testimonials.map((t: any, index: number) => (
                  <SlideIn
                    key={index}
                    direction="fade-left"
                    delay={0.15 * index}
                    className="testimonial-slide-card"
                  >
                    <div className="testimonial-slide-header">
                      <h4>{t.title}</h4>
                      <p className="testimonial-slide-quote">“{t.quote}”</p>
                    </div>
                    <div className="testimonial-slide-footer">
                      <div
                        className="testimonial-avatar"
                        style={{ backgroundImage: `url('${t.image}')` }}
                      />
                      <div className="testimonial-author-info">
                        <span className="testimonial-author-name">{t.author}</span>
                        <span className="testimonial-author-role">{t.role}</span>
                      </div>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="home-content-scale">
        <section className="section-process">
          <div className="container">
            <div className="section-head text-center">
              <SlideIn direction="fade-up" delay={0.1}>
                <h2 className="section-title">{payroll.process.title}</h2>
              </SlideIn>
            </div>
            <div className="process-grid-3">
              {payroll.process.steps.map((step: any, i: number) => {
                const isOpen = openProcess === i;
                return (
                  <SlideIn key={step.number} direction="fade-up" delay={0.1 * i}>
                    <div
                      className={`process-step-card ${isOpen ? 'open' : ''}`}
                      onClick={() => isMobile && toggleProcess(i)}
                    >
                      <div className="process-step-header">
                        <span className="process-step-num">0{step.number}</span>
                        <h3 className="process-step-title">{step.title}</h3>
                        {isMobile && (
                          <span className="process-toggle-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </span>
                        )}
                      </div>
                      <p className="process-step-desc" style={{ display: (!isMobile || isOpen) ? 'block' : 'none' }}>
                        {step.description}
                      </p>
                    </div>
                  </SlideIn>
                );
              })}
            </div>
            <SlideIn direction="fade-up" delay={0.3} className="process-cta-wrap">
              <Link href={payroll.process.buttonLink} className="btn-process-cta">
                {payroll.process.buttonText}
              </Link>
            </SlideIn>
          </div>
        </section>
      </div>




      <div className="home-content-scale">
        <section className="section section-alt-blue">
          <div className="container">
            <div className="faq-block">
              <SlideIn direction="fade-up" className="faq-head">
                <h2 className="section-title">{payroll.faqs.title}</h2>
              </SlideIn>
              <div className="faq-list">
                {payroll.faqs.items.map((item: any, i: number) => (
                  <SlideIn key={i} direction="fade-left" delay={0.1 * i}>
                    <button
                      className={`faq-item ${openFaq === i ? 'open' : ''}`}
                      onClick={() => toggleFaq(i)}
                      aria-expanded={openFaq === i}
                    >
                      <span className="faq-q">{item.question}</span>
                      <span className="faq-toggle-circle" aria-hidden="true" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </span>
                      <div
                        style={{ display: openFaq === i ? 'block' : 'none' }}
                        className="faq-a"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </button>
                  </SlideIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Base (Organization + WebSite) + FAQ as one combined JSON-LD block */}
      <JsonLd
        data={buildPageSchemaGraph([
          ...buildFaqSchema({
            path: '/payroll',
            faq: payroll.faqs.items.map((item: any) => ({
              question: item.question,
              answer: item.answer.replace(/<[^>]*>/g, ''),
            })),
          }),
        ])}
      />

      <CandidateCTA imageSrc="/footerCTAImages/payroll.avif" imageAlt="Global Payroll Solutions" />
    </>
  )
}
