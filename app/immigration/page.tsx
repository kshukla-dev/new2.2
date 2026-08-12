'use client'
import '@/styles/service-page.css'
import '@/styles/eor-sections.css'
import './immigration-page.css'


import { useRef, useState } from 'react'
import Link from 'next/link'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { SlideIn } from '@/components/animations/SlideIn'
import immigration from '@/data/immigration.json'
import QuickContactForm from '@/components/sections/QuickContactForm'


export default function ImmigrationPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [showAllCountries, setShowAllCountries] = useState(false)
  const testimonialScrollRef = useRef<HTMLDivElement>(null)

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  function scrollTestimonials(direction: 'left' | 'right') {
    if (!testimonialScrollRef.current) return
    const scrollAmount = 384
    testimonialScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {/* Immigration styles imported via immigration-page.css */}


      <header className="service-hero immigration-premium-hero">
        <div className="immigration-premium-hero-inner immigration-hero-grid">
          <div className="service-hero-copy">

            <SlideIn direction="left" delay={0.1}>
              <h1>
                {immigration.hero.titleLead}
                <em>{immigration.hero.titleAccent}</em>
              </h1>
            </SlideIn>
            <SlideIn direction="left" delay={0.2}>
              <p className="service-hero-lede">{immigration.hero.lede}</p>
            </SlideIn>
            <SlideIn direction="left" delay={0.3}>
              <p className="hero-disqualifier">{immigration.hero.disqualifier}</p>
            </SlideIn>
            <SlideIn direction="right" delay={0.4}>
              <div className="cta-row">
                <Link href={`/contact?reason=${immigration.hero.ctaReason}`} className="btn-primary">
                  {immigration.hero.ctaText} <span className="arrow">→</span>
                </Link>
              </div>
            </SlideIn>
            <SlideIn direction="up" delay={0.5}>
              <ul className="hero-trust-strip">
                {immigration.hero.trustStrip.map((item: string, i: number) => (
                  <li key={i} className="hero-trust-item">
                    <span className="hero-feature-check"></span> {item}
                  </li>
                ))}
              </ul>
            </SlideIn>
          </div>
          <SlideIn direction="fade-left" delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
            <QuickContactForm />
          </SlideIn>
        </div>
      </header>

      <div className="home-content-scale">
        <section className="section differentiator">
          <div className="container">
            <SlideIn direction="fade-right" delay={0.1} style={{ textAlign: 'center' }}>
              <span className="diff-tag">{immigration.differentiator.tag}</span>
            </SlideIn>
            <div className="diff-grid">
              <div className="diff-content">
                <SlideIn direction="fade-right" delay={0.15}>
                  <h2 className="section-title diff-title">
                    {immigration.differentiator.titleLead}
                    <em>{immigration.differentiator.titleAccent}</em>
                  </h2>
                </SlideIn>
                <SlideIn direction="fade-right" delay={0.2} className="diff-body">
                  {immigration.differentiator.paragraphs.map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </SlideIn>

              </div>
              <div className="diff-cards">
                <SlideIn direction="fade-left" delay={0.2}>
                  <div className="diff-card diff-card-competitor">
                    <span className="diff-card-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                      {immigration.differentiator.comparison.competitor.label}
                    </span>
                    <p>{immigration.differentiator.comparison.competitor.description}</p>
                  </div>
                </SlideIn>
                <SlideIn direction="fade-left" delay={0.3}>
                  <div className="diff-card diff-card-jf">
                    <span className="diff-card-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      {immigration.differentiator.comparison.jf.label}
                    </span>
                    <p>{immigration.differentiator.comparison.jf.description}</p>
                  </div>
                </SlideIn>
              </div>
            </div>
            <SlideIn direction="fade-up" delay={0.3}>
              <blockquote className="diff-quote">
                {immigration.differentiator.quote}
              </blockquote>
            </SlideIn>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section process-timeline">
          <div className="container">
            <div className="section-head">
              {immigration.process.tag && (
                <SlideIn direction="fade-up" delay={0.05}>
                  <span className="process-eyebrow">{immigration.process.tag}</span>
                </SlideIn>
              )}
              <SlideIn direction="fade-up" delay={0.1}>
                <h2 className="section-title">{immigration.process.title}</h2>
              </SlideIn>
            </div>
            <div className="process-timeline-wrapper">
              <div className="process-timeline-line"></div>
              <div className="process-timeline-start">START</div>
              <div className="process-timeline-steps">
                {immigration.process.steps.map((step: any, i: number) => {
                  const isEven = i % 2 === 0;
                  return (
                    <SlideIn
                      key={step.number}
                      direction={isEven ? 'fade-right' : 'fade-left'}
                      delay={0.15 + i * 0.08}
                      className={`process-timeline-step-row ${isEven ? 'is-even' : 'is-odd'}`}
                    >
                      {/* Left Column (Card for even, Empty for odd) */}
                      <div className="process-timeline-card-col">
                        <div className="process-timeline-card">
                          <span className="process-timeline-number">
                            {String(step.number).padStart(2, '0')}
                          </span>
                          <h3 className="process-timeline-title">{step.title}</h3>
                          <p className="process-timeline-desc">{step.description}</p>
                        </div>
                      </div>

                      {/* Middle Circle */}
                      <div className="process-timeline-circle-col">
                        <div className="process-timeline-circle-badge">{step.number}</div>
                      </div>

                      {/* Right Column (Empty for even, Card for odd) */}
                      <div className="process-timeline-empty-col">
                        {/* Empty spacer */}
                      </div>
                    </SlideIn>
                  );
                })}
              </div>
            </div>
            {immigration.process.note && (
              <SlideIn direction="fade-up" delay={0.2}>
                <div className="process-tl-note">
                  <strong>{immigration.process.note.label}</strong> {immigration.process.note.text}
                </div>
              </SlideIn>
            )}
          </div>
        </section>
      </div>
      <div className="home-content-scale section-gray">
        <section className="section">
          <div className="container">
            <div className="section-head">
              <SlideIn direction="fade-up" delay={0.05}>
                <span className="section-eyebrow">{immigration.permits.tag}</span>
              </SlideIn>
              <SlideIn direction="fade-up" delay={0.1}>
                <h2 className="section-title">{immigration.permits.title}</h2>
              </SlideIn>
            </div>
            <SlideIn direction="fade-up" delay={0.15}>
              <div className="permit-table-wrap">
                <table className="permit-table">
                  <thead>
                    <tr>
                      {immigration.permits.columns.map((c: string, i: number) => (
                        <th key={i}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {immigration.permits.rows.map((row: any, i: number) => (
                      <tr key={i}>
                        <td>
                          <span className="permit-type">{row.type}</span>
                          {row.example && <span className="permit-example">{row.example}</span>}
                        </td>
                        <td>{row.markets}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SlideIn>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section markets-section">
          <div className="container">
            <div className="section-head">
              <SlideIn direction="fade-up" delay={0.05}>
                <span className="section-eyebrow">{immigration.markets.tag}</span>
              </SlideIn>
              <SlideIn direction="fade-up" delay={0.1}>
                <h2 className="section-title">{immigration.markets.title}</h2>
              </SlideIn>
              <SlideIn direction="fade-up" delay={0.15}>
                <p className="section-lead">{immigration.markets.description}</p>
              </SlideIn>
            </div>
            <SlideIn direction="fade-up" delay={0.2}>
              {/* Desktop layout: original inline tags with circular flags */}
              <div className="market-grid desktop-only">
                {immigration.markets.items.map((m: any, i: number) => {
                  const flagImg = (
                    <img
                      src={`https://hatscripts.github.io/circle-flags/flags/${m.code || 'un'}.svg`}
                      alt={m.name}
                      className="market-flag-img"
                    />
                  );

                  return m.href ? (
                    <Link key={i} href={m.href} className="market-tag">
                      {flagImg} {m.name}
                    </Link>
                  ) : (
                    <span key={i} className="market-tag market-tag-static">
                      {flagImg} {m.name}
                    </span>
                  );
                })}
              </div>

              {/* Mobile layout: EOR-style vertical list with see all button */}
              <div className="mobile-only">
                <div className={`eor-countries-grid ${showAllCountries ? 'show-all' : ''}`}>
                  {immigration.markets.items.map((m: any, idx: number) => {
                    const cardContent = (
                      <>
                        <div className="ecg-flag-wrapper">
                          <img
                            src={`https://hatscripts.github.io/circle-flags/flags/${m.code || 'un'}.svg`}
                            alt={m.name}
                            className="ecg-flag"
                          />
                          {m.href && <div className="ecg-view-btn">View</div>}
                        </div>
                        <span>
                          <span className="mobile-text">{m.name}</span>
                        </span>
                      </>
                    );

                    return m.href ? (
                      <Link
                        key={idx}
                        href={m.href}
                        className={`ecg-item ${idx >= 5 ? 'mobile-hidden' : ''}`}
                      >
                        {cardContent}
                      </Link>
                    ) : (
                      <div
                        key={idx}
                        className={`ecg-item ecg-item-static ${idx >= 5 ? 'mobile-hidden' : ''}`}
                        style={{ cursor: 'default' }}
                      >
                        {cardContent}
                      </div>
                    );
                  })}
                </div>
                <div className="eor-countries-cta">
                  <button
                    className="mobile-see-all-btn"
                    onClick={() => setShowAllCountries(!showAllCountries)}
                  >
                    {showAllCountries ? 'Show less' : 'See all'}
                  </button>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="fade-up" delay={0.25}>
              <div className="partner-note">
                <strong>{immigration.markets.partnerNote.label}</strong> {immigration.markets.partnerNote.text}
              </div>
            </SlideIn>
          </div>
        </section>
      </div>

      <div className="home-content-scale section-gray">
        <section className="section testimonials-section">
          <div className="container">
            <div className="ctest-split">
              <div className="ctest-left">
                <SlideIn direction="fade-right" delay={0.05}>
                  <span className="section-eyebrow">{immigration.testimonials.tag}</span>
                  <h2 className="section-title">{immigration.testimonials.title}</h2>
                </SlideIn>
                <SlideIn direction="fade-right" delay={0.15} className="ctest-nav">
                  <button onClick={() => scrollTestimonials('left')} aria-label="Previous testimonial">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  </button>
                  <button onClick={() => scrollTestimonials('right')} aria-label="Next testimonial">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </SlideIn>
              </div>
              <div className="ctest-slider" ref={testimonialScrollRef}>
                {immigration.testimonials.items.map((t: any, i: number) => (
                  <SlideIn key={i} direction="fade-left" delay={0.15 + i * 0.1} className="ctest-card">
                    <p className="ctest-quote">&ldquo;{t.quote}&rdquo;</p>
                    <div className="ctest-footer">
                      <div className="ctest-avatar" style={{ backgroundImage: `url('${t.image}')` }} />
                      <div>
                        <span className="ctest-name">{t.name}</span>
                        <span className="ctest-role">{t.role}</span>
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
        <section className="section">
          <div className="container">
            <div className="faq-block">
              <div className="faq-head">
                <h2 className="section-title">{immigration.faqs.title}</h2>
              </div>
              <div className="faq-list">
                {immigration.faqs.items.map((item: any, i: number) => (
                  <button
                    key={i}
                    className={`faq-item ${openFaq === i ? 'open' : ''}`}
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="faq-q">{item.question}</span>
                    <span className="faq-toggle-circle" aria-hidden="true" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                    <p style={{ display: openFaq === i ? 'block' : 'none' }} className="faq-a">{item.answer}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <CandidateCTA imageSrc="/footerCTAImages/immigration.jpg" imageAlt="Global Immigration Services" />
    </>
  )
}
