'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

import { useRef, useState } from 'react'
import Link from 'next/link'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { SlideIn } from '@/components/animations/SlideIn'
import contractor from '@/data/contractor.json'
import QuickContactForm from '@/components/sections/QuickContactForm'
import { Zap, Globe, ShieldCheck, Users } from 'lucide-react'

export default function ContractorPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const testimonialScrollRef = useRef<HTMLDivElement>(null)

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  function scrollTestimonials(direction: 'left' | 'right') {
    if (!testimonialScrollRef.current) return
    const scrollAmount = 404
    testimonialScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <style>{`

/* ============================================================
   HERO
   ============================================================ */
.contractor-hero {
  margin-top: -70px;
  position: relative;
  left: 50%;
  right: 50%;
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
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 81%) 100%, rgb(14 15 59 / 34%) 70%, #00000021 100%), url(/services/service-page/contractor-hero.webp);
}

.contractor-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.contractor-hero > * {
  position: relative;
  z-index: 1;
}

.contractor-hero-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding-inline: clamp(16px, 4vw, 32px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 48px;
}

@media (max-width: 960px) {
  .contractor-hero-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
  }
}

.contractor-hero .service-hero-copy {
  max-width: 720px;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.section-head .tag{
 color: var(--accent);
    letter-spacing: .12em;
    text-transform: uppercase;
    background: #09407b14;
    border-radius: 999px;
    margin-bottom: 20px;
    padding: 6px 16px;
    font-size: 11px;
    font-weight: 700;
    display: inline-block;
      background: var(--accent-soft);
  border-radius: 999px;
  padding: 10px 16px;
    
    }
.contractor-hero .tag {
  color: var(--accent-sky, #7FCDEE);
  background: rgba(127, 205, 238, 0.1);
  border: 1px solid rgba(127, 205, 238, 0.2);
  margin-bottom: 24px;
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contractor-hero h1 {
  padding-top: 4rem;
}

.contractor-hero h1 em {
  font-style: italic;
  color: var(--accent-warm, #F7931E);
}

.contractor-hero .service-hero-lede {
  color: rgba(255, 255, 255, 0.85);
  font-size: 19px;
  margin-top: 24px;
  max-width: 560px;
  line-height: 1.6;
}

.contractor-hero .service-hero-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 0 !important;
  list-style: none;
  padding: 0;
}

.contractor-hero .hero-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.contractor-hero .hero-feature-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(9, 64, 123, 0.15);
  border: 1px solid rgba(9, 64, 123, 0.4);
  color: var(--accent-sky, #7FCDEE);
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}

.contractor-hero .hero-feature-dot::after {
  content: '✓';
}

.contractor-hero .cta-row {
  margin-top: 40px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.contractor-hero .btn-primary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: var(--accent-warm, #F7931E);
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.35);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.contractor-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}

.contractor-hero .btn-secondary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.contractor-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}

.contractor-hero .trust-row {
  margin-top: 44px;
}

.contractor-hero .trust-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
}

@media (max-width: 960px) {
  .contractor-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(14, 15, 59, 0.8), rgba(14, 15, 59, 0.95)), url(/services/service-page/contract.webp);
  padding-inline: clamp(16px, 4vw, 32px);
  }
}

@media (max-width: 640px) {
  .contractor-hero {
    min-height: auto;
    padding: 260px 20px 64px;
    background-image: none;
    background-color: #0E0F3B;
    margin-top: -20px;
  
  padding-inline: clamp(16px, 4vw, 32px);}
  .contractor-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/contract.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .contractor-hero h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .contractor-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .contractor-hero .btn-primary,
  .contractor-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

/* STANDARD HERO SPACING */
.service-hero-copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
}
.service-hero-copy h1,
.service-hero-copy p,
.service-hero-copy ul,
.service-hero-copy .cta-row,
.service-hero-copy .trust-row,
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
.section-title {
  margin-bottom: 24px;
}

/* ============================================================
   MISCLASSIFICATION RISK (Section 2)
   ============================================================ */
.market-risk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
}
.market-risk-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px 26px;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.market-risk-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.08);
}
.market-risk-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  background: var(--ink);
  padding: 6px 14px;
  border-radius: 999px;
  margin-bottom: 16px;
}
.market-risk-card h3 {
  font-family: var(--serif);
  font-size: 21px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 10px;
}
.market-risk-card p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.65;
}
.risk-transition {
  margin-top: 36px;
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.7;
  max-width: 820px;
}
@media (max-width: 960px) {
  .market-risk-grid {
    grid-template-columns: 1fr;
  }
}

/* ============================================================
   HOW IT WORKS (Section 3) - numbered steps
   ============================================================ */
.cor-process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 44px;
}
.cor-process-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 36px;
  height: 100%;
  transition: all 0.3s ease;
}
.cor-process-card:hover {
  transform: translateY(-4px);
  border-color: rgba(9, 64, 123, 0.15);
  box-shadow: 0 15px 35px rgba(9, 64, 123, 0.05);
}
.cor-process-num {
  font-family: var(--serif);
  font-size: 48px;
  font-weight: 600;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 20px;
}
.cor-process-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 12px;
  line-height: 1.3;
}
.cor-process-card p {
  font-size: 14.5px;
  color: var(--ink-soft);
  line-height: 1.6;
}
.cor-process-cta {
  text-align: left;
  margin-top: 44px;
}
@media (max-width: 960px) {
  .cor-process-grid {
    grid-template-columns: 1fr;
  }
}

/* ============================================================
   COMPARISON TABLE (Section 4)
   ============================================================ */
.cor-table-wrap {
  margin-top: 40px;
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
table.cor-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
}
.cor-table th,
.cor-table td {
  padding: 18px 24px;
  text-align: left;
  font-size: 14.5px;
  line-height: 1.55;
}
.cor-table thead th {
  background: var(--ink);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.cor-table thead th:first-child {
  border-top-left-radius: var(--radius);
}
.cor-table thead th:last-child {
  border-top-right-radius: var(--radius);
  color: var(--accent-warm);
}
.cor-table tbody tr:nth-child(even) {
  background: #f7f8fa;
}
.cor-table tbody td:first-child {
  font-weight: 600;
  color: var(--ink);
}
.cor-table tbody td:nth-child(2) {
  color: var(--ink-soft);
}
.cor-table tbody td:nth-child(3) {
  color: var(--ink);
  font-weight: 500;
}
.cor-table tbody td:nth-child(3)::before {
  content: '✓';
  color: var(--accent-warm);
  font-weight: 700;
  margin-right: 8px;
}
.comparison-closing {
  margin-top: 32px;
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.7;
  max-width: 780px;
}
.comparison-cta {
  margin-top: 24px;
}

/* ============================================================
   MARKETS (Section 5) - pill grid
   ============================================================ */
.market-pills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 40px;
}
.market-pill {
  display: inline-flex;
  align-items: center;
  padding: 10px 22px;
  border-radius: 999px;
  border: 1.5px solid rgba(9, 64, 123, 0.15);
  background: #ffffff;
  color: var(--ink);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}
.market-pill:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
  transform: translateY(-2px);
}
.market-pill.is-soon {
  background: #f5f5f5;
  border-style: dashed;
  color: var(--ink-muted);
  cursor: default;
}
.market-pill.is-soon:hover {
  transform: none;
  background: #f5f5f5;
  border-color: rgba(9, 64, 123, 0.15);
}
.market-pill .soon-tag {
  margin-left: 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent-warm);
}
.markets-footer-text {
  margin-top: 32px;
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
}
.markets-footer-text a {
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
}
.markets-footer-text a:hover {
  text-decoration: underline;
}

/* ============================================================
   PROOF / TESTIMONIALS (Section 6)
   ============================================================ */
.cor-testimonials {
  background: var(--bg);
  overflow: hidden;
}
.cor-testimonials-split {
  display: grid;
  grid-template-columns: 1fr 2.1fr;
  gap: 56px;
  align-items: center;
}
.cor-testimonials-left {
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.cor-testimonials-nav {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}
.cor-testimonials-nav button {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(14, 15, 59, 0.15);
  background: transparent;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.cor-testimonials-nav button:hover {
  background: var(--ink);
  color: #ffffff;
  border-color: var(--ink);
}
.cor-testimonials-slider {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 16px 4px;
  margin: -16px -4px;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
}
.cor-testimonials-slider::-webkit-scrollbar {
  display: none;
}
.cor-testimonial-card {
  flex: 0 0 380px;
  max-width: 85vw;
  scroll-snap-align: start;
  background: #f5f7fa;
  border: 1px solid rgba(14, 15, 59, 0.08);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 320px;
  gap: 20px;
  transition: all 0.3s ease;
}
.cor-testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(14, 15, 59, 0.05);
}
.cor-testimonial-quote {
  font-size: 14.5px;
  color: var(--ink-soft);
  line-height: 1.65;
  margin: 0;
}
.cor-testimonial-footer {
  display: flex;
  align-items: center;
  gap: 14px;
  border-top: 1px solid rgba(14, 15, 59, 0.06);
  padding-top: 18px;
}
.cor-testimonial-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}
.cor-testimonial-name {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--ink);
  display: block;
}
.cor-testimonial-role {
  font-size: 13px;
  color: var(--ink-soft);
}
@media (max-width: 1024px) {
  .cor-testimonials-split {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .cor-testimonials-left {
    max-width: 100%;
  }
}
@media (max-width: 480px) {
  .cor-testimonial-card {
    flex: 0 0 280px;
    padding: 24px;
  }
}

.faq-a .faq-link {
  color: var(--accent);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.faq-a .faq-link:hover {
  color: var(--accent-warm);
}
`}</style>

      <header className="service-hero contractor-hero">
        <div className="contractor-hero-inner">
          <div className="service-hero-copy">
            <SlideIn direction="left" delay={0.1}>
              <h1>
                Contractor of Record services <em>for Europe</em>
              </h1>
            </SlideIn>
            <SlideIn direction="left" delay={0.2}>
              <p className="service-hero-lede">
                Hire contractors across Europe without the misclassification risk. Jackson & Frank acts as Contractor of Record in 13 markets, your contractors are engaged through our local entities, correctly classified from day one, and paid within 48 hours of instruction.
              </p>
            </SlideIn>
            <SlideIn direction="left" delay={0.3}>
              <div className="service-hero-features">
                {contractor.hero.bullets.map((f: string, i: number) => (
                  <div key={i} className="hero-feature">
                    <span className="hero-feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={0.4}>
              <div className="cta-row">
                <Link href="/contact?reason=contractor_of_record" className="btn-primary">
                  {contractor.hero.primaryButtonText} <span className="arrow">→</span>
                </Link>
                <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  {contractor.hero.secondaryButtonText}
                </a>
              </div>
            </SlideIn>
            <SlideIn direction="up" delay={0.5}>
              <div className="trust-row">
                <span className="trust-text">{contractor.hero.trustText}</span>
              </div>
            </SlideIn>
          </div>

          <SlideIn direction="fade-left" delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
            <QuickContactForm />
          </SlideIn>
        </div>
      </header>

      {/* Section 2 - The misclassification risk */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="section-head">
            <span className="tag">{contractor.riskSection.tag}</span>
            <h2 className="section-title">{contractor.riskSection.headline}</h2>
            <p className="section-lead">{contractor.riskSection.body}</p>
          </div>
          <div className="market-risk-grid">
            {contractor.riskSection.callouts.map((c: any, i: number) => (
              <SlideIn key={c.market} direction="zoom-in" delay={i * 0.15} className="market-risk-card">
                <span className="market-risk-badge">{c.market}</span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </SlideIn>
            ))}
          </div>
          <SlideIn direction="fade-up" delay={0.2}>
            <p className="risk-transition">{contractor.riskSection.transition}</p>
          </SlideIn>
        </section>
      </div>

      {/* Section 3 - How it works */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="section-head">
            <h2 className="section-title">{contractor.howItWorks.headline}</h2>
            <p className="section-lead">{contractor.howItWorks.subheadline}</p>
          </div>
          <div className="cor-process-grid">
            {contractor.howItWorks.steps.map((step: any, i: number) => (
              <SlideIn key={step.number} direction="fade-up" delay={i * 0.1} className="cor-process-card">
                <div className="cor-process-num">0{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </SlideIn>
            ))}
          </div>
          <SlideIn direction="fade-up" delay={0.3} className="cor-process-cta">
            <Link href={contractor.howItWorks.buttonLink} className="btn-primary">
              {contractor.howItWorks.buttonText}
            </Link>
          </SlideIn>
        </section>
      </div>

      {/* Section 4 - J&F vs. a SaaS contractor platform */}
      <div className="home-content-scale section-alt">
        <section className="section container">
          <div className="section-head">
            <span className="tag">{contractor.comparison.tag}</span>
            <h2 className="section-title">{contractor.comparison.headline}</h2>
            <p className="section-lead">{contractor.comparison.intro}</p>
          </div>
          <SlideIn direction="fade-up" delay={0.1} className="cor-table-wrap">
            <table className="cor-table">
              <thead>
                <tr>
                  {contractor.comparison.columns.map((col: string, i: number) => (
                    <th key={i}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contractor.comparison.rows.map((row: string[]) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </SlideIn>
          <p className="comparison-closing">{contractor.comparison.closing}</p>
          <div className="comparison-cta">
            <Link href={contractor.comparison.buttonLink} className="btn-primary">
              {contractor.comparison.buttonText} <span className="arrow">→</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Section 5 - Our markets */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="section-head">
            <h2 className="section-title">{contractor.markets.headline}</h2>
            <p className="section-lead">{contractor.markets.subheadline}</p>
          </div>
          <SlideIn direction="fade-up" delay={0.1} className="market-pills-grid">
            {contractor.markets.active.map((m: any) => (
              <Link key={m.name} href={m.href} className="market-pill">
                {m.name}
              </Link>
            ))}
            {contractor.markets.comingSoon.map((name: string) => (
              <span key={name} className="market-pill is-soon">
                {name}
                <span className="soon-tag">Coming soon</span>
              </span>
            ))}
          </SlideIn>
          <p className="markets-footer-text">
            {contractor.markets.belowText.split('get in touch')[0]}
            <Link href="/contact">get in touch</Link>
            {contractor.markets.belowText.split('get in touch')[1]}
          </p>
        </section>
      </div>

      {/* Section 6 - Proof */}
      <div className="home-content-scale">
        <section className="section container cor-testimonials">
          <div className="cor-testimonials-split">
            <div className="cor-testimonials-left">
              <SlideIn direction="fade-right" delay={0.1}>
                <span className="tag">{contractor.proof.eyebrow}</span>
                <h2 className="section-title">{contractor.proof.headline}</h2>
                <p className="section-lead">{contractor.proof.subheadline}</p>
              </SlideIn>
              <SlideIn direction="fade-right" delay={0.2} className="cor-testimonials-nav">
                <button onClick={() => scrollTestimonials('left')} aria-label="Previous testimonial">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <button onClick={() => scrollTestimonials('right')} aria-label="Next testimonial">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </SlideIn>
            </div>
            <div className="cor-testimonials-slider" ref={testimonialScrollRef}>
              {contractor.proof.testimonials.map((t: any, i: number) => (
                <SlideIn key={t.author} direction="fade-left" delay={i * 0.15} className="cor-testimonial-card">
                  <p className="cor-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="cor-testimonial-footer">
                    <div className="cor-testimonial-avatar" style={{ backgroundImage: `url('${t.image}')` }} />
                    <div>
                      <span className="cor-testimonial-name">{t.author}</span>
                      <span className="cor-testimonial-role">{t.role}</span>
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Section 7 - FAQ */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="faq-block">
            <SlideIn direction="fade-up" className="faq-head">
              <h2 className="section-title">{contractor.faqs.title}</h2>
            </SlideIn>
            <div className="faq-list">
              {contractor.faqs.items.map((item: any, i: number) => (
                <SlideIn key={i} direction="fade-left" delay={i * 0.1}>
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
        </section>
      </div>

      {/* Base (Organization + WebSite) + FAQ as one combined JSON-LD block */}
      <JsonLd
        data={buildPageSchemaGraph([
          ...buildFaqSchema({
            path: '/contractor',
            faq: contractor.faqs.items.map((item: any) => ({
              question: item.question,
              answer: item.answer.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
            })),
          }),
        ])}
      />

      <CandidateCTA
        eyebrow={contractor.finalCta.eyebrow}
        title={contractor.finalCta.title}
        description={contractor.finalCta.description}
        stats={[
          { value: '24h', label: 'Quote turnaround', subtext: 'From first contact to a compliance quote', icon: <Zap className="w-5 h-5 text-[#38BDF8]" /> },
          { value: '17+', label: 'Active markets', subtext: 'Owned entities and in-country specialists', icon: <Globe className="w-5 h-5 text-[#38BDF8]" /> },
          { value: '48h', label: 'Payment SLA', subtext: 'Contractor invoices processed from instruction', icon: <ShieldCheck className="w-5 h-5 text-[#38BDF8]" /> },
          { value: '0', label: 'Platforms to learn', subtext: 'Your team, our team, no new software', icon: <Users className="w-5 h-5 text-[#38BDF8]" /> },
        ]}
        primaryBtnText={contractor.finalCta.primaryButtonText}
        primaryBtnHref={contractor.finalCta.primaryButtonHref}
        secondaryBtnText={contractor.finalCta.secondaryButtonText}
        secondaryBtnHref={contractor.finalCta.secondaryButtonHref}
        imageSrc="/footerCTAImages/contractor.jpg"
        imageAlt="Contractor of Record services across Europe"
      />
    </>
  )
}
