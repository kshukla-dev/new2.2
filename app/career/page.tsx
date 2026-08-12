'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

import { useState } from 'react'
import Link from 'next/link'
import { SlideIn } from '@/components/animations/SlideIn'
import CandidateCTA from '@/components/sections/CandidateCTA'
import career from '@/data/career.json'

function getRoleTheme(dept: string) {
  const d = dept.toLowerCase()
  if (d.includes('human') || d.includes('hr') || d.includes('mobility')) {
    return 'blue'
  }
  if (d.includes('sales') || d.includes('business') || d.includes('develop')) {
    return 'green'
  }
  return 'purple'
}

export default function CareerPage() {
  const [openFaq, setOpenFaq] = useState(0)

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  return (
    <>
      {/* Base (Organization + WebSite) + FAQ as one combined JSON-LD block */}
      <JsonLd
        data={buildPageSchemaGraph(
          career.faqs?.items?.length
            ? buildFaqSchema({ path: '/career', faq: career.faqs.items })
            : []
        )}
      />
      <style>{`

.careers-hero {
  position: relative;
  left: 50%;
  right: 50%;
  margin-top: -70px;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  padding: 88px 0 96px;
  display: block;
  background-color: #0E0F3B;
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: auto;
  overflow: hidden;
  margin-bottom: 0;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 0%) 100%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/career.webp);
}

.careers-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.careers-hero > * {
  position: relative;
  z-index: 1;
}

.careers-hero-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding-inline: clamp(16px, 4vw, 32px);
}

.careers-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  padding-top: 8vh;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.careers-hero h1 {
  color: #ffffff;
  text-shadow: none;
}

.careers-hero .service-hero-copy h1 em {
  color: #F7931E;
}

.careers-hero .service-hero-lede {
  color: rgba(255,255,255,0.82);
  text-shadow: none;
  font-size: 19px;
}

.careers-hero .service-hero-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 32px;
  list-style: none;
  padding: 0;
}

.careers-hero .hero-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255,255,255,0.85);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-shadow: none;
}

.careers-hero .hero-feature-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #F7931E;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}

.careers-hero .cta-row {
  margin-top: 40px;
}

.careers-hero .btn-primary {
  background: #F7931E;
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.4);
}

.careers-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.5);
}

.careers-hero .btn-secondary {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.careers-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255,255,255,0.7);
  color: #ffffff;
}

@media (max-width: 1440px) {
  .careers-hero {
    background-size: 85% auto;
  }
}

@media (max-width: 1280px) {
  .careers-hero {
    background-size: 85% auto;
    background-position: right -5% center;
  }
}

@media (max-width: 1024px) {
  .careers-hero {
    background-size: 85% auto;
    background-position: right -15% center;
  }
}

@media (max-width: 960px) {
  .careers-hero {
    padding: 52px 24px 72px;
    background-size: 100% auto;
    background-position: top 20% center;
     background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 0%) 40%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/career.webp);
  
  }
}

@media (max-width: 640px) {
  .careers-hero {
    min-height: auto;
    padding: 260px 20px 60px;
    background-image: none;
    background-color: #0E0F3B;
  }
  .careers-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/career.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .careers-hero-inner {
    padding-left: 0;
    padding-right: 0;
  }
  .careers-hero .service-hero-copy h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .careers-hero .cta-row {
    flex-direction: column;
    gap: 16px;
    margin-top: 20px !important;
  }
  .careers-hero .btn-primary,
  .careers-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.benefit-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  box-shadow: 0 16px 32px rgba(9, 64, 123, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.benefit-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.1);
}
.benefit-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background: #2b4168;
  border-radius: 12px;
  color: #fff;
  margin-bottom: 24px;
}
.benefit-card h3 {
  font-family: var(--sans);
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #0E0F3B;
}
.benefit-card p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
}

.positions-strip {
  padding: 60px 0;
  scroll-margin-top: 80px;
}
.positions-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.position-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 460px;
}
.position-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.1);
}

/* Colored top header strip */
.position-card-header {
  padding: 28px 28px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  overflow: hidden;
}
.position-card-header.blue {
  background: linear-gradient(135deg, #1c1915 0%, #2c241a 100%);
}
.position-card-header.green {
  background: linear-gradient(135deg, #143369 0%, #7d6635 100%);
}
.position-card-header.purple {
  background: linear-gradient(135deg, #3d2e1e 0%, #1e1812 100%);
}
.position-card-header::after {
  content: '';
  position: absolute;
  right: -20px;
  top: -20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}
.pos-dept-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  flex-shrink: 0;
  backdrop-filter: blur(4px);
}
.pos-dept-label {
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  flex: 1;
}
.pos-type-pill {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 4px 12px;
  border-radius: 99px;
  white-space: nowrap;
}

/* Card body */
.position-body {
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.position-title {
  font-family: var(--serif);
  font-size: 22px;
  
  color: var(--ink);
  margin-bottom: 12px;
  line-height: 1.3;
}
.pos-meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.pos-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-muted);
  font-family: var(--sans);
}
.pos-meta-sep {
  color: var(--ink-muted);
  font-size: 12px;
}
.position-desc {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.75;
  flex: 1;
  min-height: 130px;
  margin-bottom: 24px;
}
.position-apply {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border-radius: 999px;
  font-size: 13px;
  font-family: var(--sans);
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  align-self: flex-start;
  transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
}
.position-apply.blue { background: #1c1915; }
.position-apply.green { background: #143369; }
.position-apply.purple { background: #3d2e1e; }
.position-card:hover .position-apply {
  transform: translateX(4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* FAQ Font Standardizations */
.faq-q {
  font-family: var(--sans);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ink);
  transition: color 0.2s, transform 0.2s;
}
.faq-item:hover .faq-q {
  color: var(--accent);
  transform: translateX(6px);
}
.faq-item.open .faq-q {
  color: var(--accent);
}
.faq-toggle {
  font-size: 24px;
  color: var(--ink-muted);
  line-height: 1;
  transition: color 0.2s;
}
.faq-item.open .faq-toggle {
  color: var(--accent);
}
.faq-a {
  grid-column: 1 / -1;
  margin-top: 14px;
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
}

@media (max-width: 1024px) {
  .benefits-grid { grid-template-columns: 1fr 1fr; }
  .positions-list { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .benefits-grid { grid-template-columns: 1fr; }
  .positions-list { grid-template-columns: 1fr; }
}

        /* STANDARD HERO SPACING */
        .service-hero-copy {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
        }
        .service-hero-copy > * {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
        .service-hero-copy ul {
          gap: 16px !important;
          margin: 8px 0 0 0 !important;
        }
        @media (max-width: 640px) {
          .service-hero-copy { gap: 16px; }
        }
`}</style>

      <header className="service-hero careers-hero">
        <div className="careers-hero-inner">
          <div className="service-hero-copy">
            <SlideIn direction="fade-right" delay={0.1}>
              <h1>Build the future of <em>global HR</em></h1>
              <p className="service-hero-lede">{career.definition.description}</p>
            </SlideIn>
            <SlideIn direction="fade-up" delay={0.2}>
              <ul className="service-hero-features">
                {career.definition.keyFeatures.map((f: string, i: number) => (
                  <li key={i} className="hero-feature">
                    <span className="hero-feature-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="cta-row">
                <a href="#open-positions" className="btn-primary">
                  {career.definition.primaryButtonText} <span className="arrow">→</span>
                </a>
                <Link href="/about-us" className="btn-secondary">
                  {career.definition.secondaryButtonText}
                </Link>
              </div>
            </SlideIn>
          </div>
        </div>
      </header>

      <div className="home-content-scale">
        <section className="stats-strip">
          <div className="container stats-strip-inner">
            {career.definition.trustSignals.stats.map((s: any, i: number) => (
              <SlideIn key={i} direction="fade-up" delay={0.1 * i} className="stat-item">
                <strong>{s.value}</strong>
                {s.label && <span className="stat-label">{s.label}</span>}
                <span className="stat-desc">{s.description}</span>
              </SlideIn>
            ))}
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        {/* .positions-strip sets `padding: 60px 0`, which would zero out the
            horizontal padding if .container sat on the same element. The
            container is nested instead, matching #open-positions below. */}
        <section className="positions-strip">
          <div className="container">
          <SlideIn direction="fade-up" className="section-head">
            <h2 className="section-title">Why work with us?</h2>
            <p className="section-lead" style={{ maxWidth: '600px' }}>We&apos;re building a company where talented people can do their best work, grow their careers, and make a real impact on the future of work.</p>
          </SlideIn>
          <div className="benefits-grid">
            {career.benefits.map((b: any, i: number) => (
              <SlideIn key={i} direction="zoom-in" delay={0.1 * i} className="benefit-card">
                <div className="benefit-icon-box">
                  {i === 0 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>}
                  {i === 1 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>}
                  {i === 2 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>}
                  {i !== 0 && i !== 1 && i !== 2 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                </div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </SlideIn>
            ))}
          </div>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section id="open-positions" className="positions-strip">
          <div className="container">
            <SlideIn direction="fade-up" className="section-head">
              <h2 className="section-title">Current <em>openings</em></h2>
              <p className="section-lead">Join a mission-driven team building the infrastructure for the future of work.</p>
            </SlideIn>
            <div className="positions-list">
              {career.openPositions.map((p: any, i: number) => {
                const theme = getRoleTheme(p.department)
                return (
                  <SlideIn key={i} direction="fade-right" delay={0.1 * i} className={`position-card ${theme}`}>
                    <div className={`position-card-header ${theme}`}>
                      <div className="pos-dept-icon">
                        {theme === 'blue' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><circle cx="9" cy="7" r="4" /><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /></svg>}
                        {theme === 'green' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>}
                        {theme !== 'blue' && theme !== 'green' && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>}
                      </div>
                      <span className="pos-dept-label">{p.department}</span>
                      <span className="pos-type-pill">{p.type}</span>
                    </div>

                    <div className="position-body">
                      <h3 className="position-title">{p.title}</h3>

                      <div className="pos-meta-row">
                        <span className="pos-meta-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {p.location}
                        </span>
                        <span className="pos-meta-sep">·</span>
                        <span className="pos-meta-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                          {p.type}
                        </span>
                      </div>

                      <p className="position-desc">{p.description}</p>

                      <a href={p.href} target="_blank" rel="noopener noreferrer" className={`position-apply ${theme}`}>
                        Apply Now <span aria-hidden>→</span>
                      </a>
                    </div>
                  </SlideIn>
                )
              })}
            </div>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container">
          <div className="faq-block">
            <SlideIn direction="fade-up" className="faq-head">
              <h2 className="section-title">{career.faqs.title}</h2>
              <p className="section-lead">{career.faqs.subtitle}</p>
            </SlideIn>
            <div className="faq-list">
              {career.faqs.items.map((item: any, i: number) => (
                <SlideIn key={i} direction="fade-left" delay={0.1 * i}>
                  <button
                    className={`faq-item ${openFaq === i ? 'open' : ''}`}
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="faq-q">{item.question}</span>
                    <span className="faq-toggle" aria-hidden>{openFaq === i ? '−' : '+'}</span>
                    <p style={{ display: openFaq === i ? 'block' : 'none' }} className="faq-a">{item.answer}</p>
                  </button>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      <CandidateCTA imageSrc="/footerCTAImages/payroll.avif" imageAlt="Don't see the right role?" />
    </>
  )
}
