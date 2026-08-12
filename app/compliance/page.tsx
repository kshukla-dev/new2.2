'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

import { useRef, useState } from 'react'
import Link from 'next/link'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { SlideIn } from '@/components/animations/SlideIn'
import compliance from '@/data/compliance.json'
import QuickContactForm from '@/components/sections/QuickContactForm'
import { MapPin, Users, Calculator, FileText, Receipt, Heart, Bell } from 'lucide-react'

const pillarIcons = { MapPin, Users, Calculator }
const coverageIcons = { FileText, Receipt, Heart, Bell }

export default function CompliancePage() {
  const [openFaq, setOpenFaq] = useState(0)
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

  const getPillarIcon = (name: string) => pillarIcons[name as keyof typeof pillarIcons] || MapPin
  const getCoverageIcon = (name: string) => coverageIcons[name as keyof typeof coverageIcons] || FileText

  const allTestimonials = [compliance.proof.featured, ...compliance.proof.testimonials]

  return (
    <>
      <style>{`

:root { --teal: #3BAE8E; --teal-soft: rgba(59, 174, 142, 0.15); }

.compliance-hero {
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
  margin-top: -70px;
  margin-bottom: 0;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 75%) 100%, rgb(14 15 59 / 17%) 70%, transparent 100%), url(/services/service-page/compliances.webp);
}

.compliance-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.compliance-hero > * {
  position: relative;
  z-index: 1;
}

.compliance-hero-inner {
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
  .compliance-hero-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
  }
}

.compliance-hero .service-hero-copy {
  max-width: 720px;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.compliance-hero .hero-eyebrow {
  color: var(--teal);
  background: rgba(59, 174, 142, 0.12);
  border: 1px solid rgba(59, 174, 142, 0.25);
  margin-bottom: 24px;
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.compliance-hero h1 {
  padding-top: 3rem;
}

.compliance-hero .service-hero-lede {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-top: 24px;
  max-width: 560px;
  line-height: 1.6;
}

.compliance-hero .cta-row {
  margin-top: 32px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.compliance-hero .btn-primary {
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

.compliance-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}

.compliance-hero .btn-secondary {
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

.compliance-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}

.compliance-proof-strip {
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 520px;
}
.compliance-trust-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  border-radius: 12px;
  background: transparent;
  border: 1px solid transparent;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}
.compliance-trust-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}
.compliance-trust-logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 8px;
  flex-shrink: 0;
  transition: all 0.25s ease;
}
.compliance-trust-logo-ind {
  background: transparent;
  padding: 0;
}
.compliance-trust-logo-nen {
  background: #ffffff;
  padding: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.compliance-trust-logo-box img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}
.compliance-trust-logo-box svg {
  width: 32px;
  height: 32px;
  color: var(--teal);
}
.compliance-trust-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.compliance-trust-title {
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.3;
  margin-bottom: 4px;
}
.compliance-trust-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.4;
}

@media (max-width: 960px) {
  .compliance-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(14, 15, 59, 0.8), rgba(14, 15, 59, 0.95)), url(/services/service-page/compliances.webp);
    padding-inline: clamp(16px, 4vw, 32px);
  }
}

@media (max-width: 640px) {
  .compliance-hero {
    min-height: auto;
    padding: 260px 20px 64px;
    background-image: none;
    background-color: #0E0F3B;
    margin-top: -20px;
    padding-inline: clamp(16px, 4vw, 32px);
  }
  .compliance-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 280px;
    background-image: url(/services/service-page/compliances.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .compliance-hero h1 { font-size: clamp(32px, 8vw, 44px); }
  .compliance-hero .cta-row { flex-direction: column; gap: 16px; }
  .compliance-hero .btn-primary,
  .compliance-hero .btn-secondary { justify-content: center; }
  .compliance-proof-strip {
    max-width: 100%;
  }
  .compliance-trust-card {
    padding: 10px 12px;
    gap: 16px;
  }
  .compliance-trust-logo-box {
    width: 48px;
    height: 48px;
  }
  .compliance-trust-logo-ind {
    padding: 0;
  }
  .compliance-trust-logo-nen {
    padding: 5px;
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
.service-hero-copy .cta-row,
.service-hero-copy > * {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
@media (max-width: 640px) {
  .service-hero-copy { gap: 16px; }
}
.section-title { margin-bottom: 24px; }
.section-eyebrow-teal {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 12px;
   background: #09407b14;
    border-radius: 999px;
    padding: 6px 16px;
}

/* Light alternating section */
.compliance-alt {
  background: #f5f7fa;
  border-top: 1px solid rgba(9, 64, 123, 0.1);
  border-bottom: 1px solid rgba(9, 64, 123, 0.1);
}

/* Pillars (3-card grid) */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.pillar-card {
  background: var(--bg-card, #ffffff);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg, 16px);
  padding: 36px 32px;
  box-shadow: 0 16px 40px rgba(9, 64, 123, 0.05);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pillar-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 50px rgba(9, 64, 123, 0.1);
}
.pillar-icon {
  width: 54px; height: 54px;
  border-radius: 14px;
  background: var(--teal-soft);
  color: var(--teal);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 22px;
}
.pillar-icon svg { width: 26px; height: 26px; }
.pillar-card h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.25;
  margin-bottom: 14px;
}
.pillar-card p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.7;
}

/* Coverage (2x2 cards) */
.coverage-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.coverage-card2 {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.coverage-card2:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.08);
}
.coverage-icon2 {
  width: 48px; height: 48px;
  border-radius: 12px;
  background: var(--teal-soft);
  color: var(--teal);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
}
.coverage-icon2 svg { width: 24px; height: 24px; }
.coverage-card2 h3 {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 10px;
}
.coverage-card2 p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* Process (3 steps with timing pill) */
.cprocess-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.cprocess-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 34px 32px;
  height: 100%;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.cprocess-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.08);
}
.cprocess-num {
  font-family: var(--serif);
  font-size: 44px;
  font-weight: 700;
  color: var(--accent-warm);
  line-height: 1;
}
.cprocess-divider {
  width: 40px; height: 2px;
  background: var(--accent-warm);
  margin: 16px 0;
}
.cprocess-pill {
  display: inline-block;
  background: var(--teal-soft);
  color: var(--teal);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 16px;
}
.cprocess-card h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 12px;
}
.cprocess-card p {
  font-size: 14.5px;
  color: var(--ink-soft);
  line-height: 1.65;
}
.cprocess-cta { text-align: left; margin-top: 44px; }

/* Testimonials (split carousel — same as contractor page) */
.ctest-split {
  display: grid;
  grid-template-columns: 1fr 2.1fr;
  gap: 56px;
  align-items: center;
}
.ctest-left {
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.ctest-nav {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}
.ctest-nav button {
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
.ctest-nav button:hover {
  background: var(--ink);
  color: #ffffff;
  border-color: var(--ink);
}
.ctest-slider {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 16px 4px;
  margin: -16px -4px;
  scrollbar-width: none;
}
.ctest-slider::-webkit-scrollbar { display: none; }
.ctest-card {
  flex: 0 0 360px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 320px;
  gap: 20px;
  box-shadow: 0 10px 30px rgba(14, 15, 59, 0.03);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.ctest-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(14, 15, 59, 0.08);
}
.ctest-quote {
  font-size: 14.5px;
  color: var(--ink-soft);
  line-height: 1.65;
  margin: 0;
}
.ctest-footer {
  display: flex;
  align-items: center;
  gap: 14px;
  border-top: 1px solid rgba(14, 15, 59, 0.06);
  padding-top: 18px;
}
.ctest-avatar {
  width: 42px; height: 42px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-color: #0F1F3D;
  flex-shrink: 0;
}
.ctest-name { font-size: 14.5px; font-weight: 700; color: var(--ink); display: block; }
.ctest-role { font-size: 13px; color: var(--ink-soft); }
@media (max-width: 1024px) {
  .ctest-split { grid-template-columns: 1fr; gap: 32px; }
  .ctest-left { max-width: 100%; }
}
@media (max-width: 480px) {
  .ctest-card { flex: 0 0 280px; padding: 24px; }
}

/* Risks (2x2 cards, risk + response) */
.crisks-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.crisk-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: 0 16px 32px rgba(9, 64, 123, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}
.crisk-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px rgba(9, 64, 123, 0.08);
}
.crisk-name {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 8px;
}
.crisk-desc {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 20px;
}
.crisk-response {
  font-size: 15px;
  color: var(--ink);
  line-height: 1.6;
  border-left: 3px solid var(--teal);
  padding-left: 18px;
}

/* EOR bridge cards */
.ceor-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}
.ceor-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: 0 16px 32px rgba(9, 64, 123, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.ceor-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 48px rgba(9, 64, 123, 0.08);
}
.ceor-check {
  flex-shrink: 0;
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--teal-soft);
  color: var(--teal);
  display: flex; align-items: center; justify-content: center;
  margin-top: 2px;
}
.ceor-check svg { width: 16px; height: 16px; }
.ceor-card h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 6px;
}
.ceor-card p {
  font-size: 14.5px;
  color: var(--ink-soft);
  line-height: 1.6;
}
.ceor-cta { text-align: left; }
.ceor-cta .btn-primary {
  background: var(--accent);
  color: #ffffff;
}
.ceor-cta .btn-primary:hover { background: #072f5c; }

/* FAQ link */
.faq-a .faq-link {
  color: var(--teal);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.faq-a .faq-link:hover { color: var(--accent-warm); }

@media (max-width: 1024px) {
  .pillars-grid,
  .coverage-grid-2,
  .cprocess-grid,
  .crisks-grid,
  .ceor-grid {
    grid-template-columns: 1fr;
  }
}
`}</style>

      {/* S1 — HERO (form kept, standard alignment) */}
      <header className="service-hero compliance-hero">
        <div className="compliance-hero-inner">
          <div className="service-hero-copy">
            <SlideIn direction="left" delay={0.15}>
              <h1>{compliance.hero.h1}  <em>{compliance.hero.titleAccent}</em></h1>
            </SlideIn>
            <SlideIn direction="left" delay={0.25}>
              <p className="service-hero-lede">{compliance.hero.subheadline}</p>
            </SlideIn>
            <SlideIn direction="right" delay={0.35}>
              <div className="cta-row">
                <Link href="/contact?reason=compliance_questions" className="btn-primary">
                  {compliance.hero.primaryButtonText} <span className="arrow">→</span>
                </Link>
                <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  {compliance.hero.secondaryButtonText}
                </a>
              </div>
            </SlideIn>
            <SlideIn direction="up" delay={0.45}>
              <div className="compliance-proof-strip">
                {/* Badge 1: IND */}
                <div className="compliance-trust-card">
                  <div className="compliance-trust-logo-box compliance-trust-logo-ind">
                    <img src="/license/logo-ind.svg" alt="IND recognised sponsor" />
                  </div>
                  <div className="compliance-trust-content">
                    <strong className="compliance-trust-title">Official IND Recognised Sponsor</strong>
                    <span className="compliance-trust-desc">Fast-track visa processing in 2 to 4 weeks.</span>
                  </div>
                </div>

                {/* Badge 2: NEN */}
                <div className="compliance-trust-card">
                  <div className="compliance-trust-logo-box compliance-trust-logo-nen">
                    <img src="/license/sna-logo.svg" alt="Local Staffing License NEN 4400-1" />
                  </div>
                  <div className="compliance-trust-content">
                    <strong className="compliance-trust-title">Local Staffing License (NEN 4400-1)</strong>
                    <span className="compliance-trust-desc">Your hire is legally employed from day one.</span>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          <SlideIn direction="fade-left" delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
            <QuickContactForm />
          </SlideIn>
        </div>
      </header>

      {/* S2 — PILLARS */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="section-head">
            <span className="section-eyebrow-teal">Why Jackson &amp; Frank</span>
            <h2 className="section-title">{compliance.pillars.headline}</h2>
          </div>
          <div className="pillars-grid">
            {compliance.pillars.items.map((p: any, i: number) => {
              const Icon = getPillarIcon(p.icon)
              return (
                <SlideIn key={p.title} direction="zoom-in" delay={i * 0.12} className="pillar-card">
                  <span className="pillar-icon"><Icon /></span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </SlideIn>
              )
            })}
          </div>
        </section>
      </div>

      {/* S3 — COVERAGE */}
      <div className="home-content-scale compliance-alt">
        <section className="section container">
          <div className="section-head">
            <h2 className="section-title">{compliance.coverage.headline}</h2>
            <p className="section-lead">{compliance.coverage.subheadline}</p>
          </div>
          <div className="coverage-grid-2">
            {compliance.coverage.items.map((c: any, i: number) => {
              const Icon = getCoverageIcon(c.icon)
              return (
                <SlideIn key={c.title} direction="fade-up" delay={i * 0.1} className="coverage-card2">
                  <div className="coverage-icon2"><Icon /></div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </SlideIn>
              )
            })}
          </div>
        </section>
      </div>

      {/* S4 — PROCESS */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="section-head">
            <h2 className="section-title">{compliance.process.headline}</h2>
          </div>
          <div className="cprocess-grid">
            {compliance.process.steps.map((step: any, i: number) => (
              <SlideIn key={step.number} direction="fade-up" delay={i * 0.12} className="cprocess-card">
                <div className="cprocess-num">0{step.number}</div>
                <div className="cprocess-divider" />
                <span className="cprocess-pill">{step.timing}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </SlideIn>
            ))}
          </div>
          <div className="cprocess-cta">
            <Link href={compliance.process.buttonLink} className="btn-primary">
              {compliance.process.buttonText} <span className="arrow">→</span>
            </Link>
          </div>
        </section>
      </div>

      {/* S5 — PROOF */}
      <div className="home-content-scale compliance-alt">
        <section className="section container">
          <div className="ctest-split">
            <div className="ctest-left">
              <SlideIn direction="fade-right" delay={0.1}>
                <span className="section-eyebrow-teal">Proof</span>
                <h2 className="section-title">{compliance.proof.headline}</h2>
                {compliance.proof.subheadline && (
                  <p className="section-lead">{compliance.proof.subheadline}</p>
                )}
              </SlideIn>
              <SlideIn direction="fade-right" delay={0.2} className="ctest-nav">
                <button onClick={() => scrollTestimonials('left')} aria-label="Previous testimonial">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <button onClick={() => scrollTestimonials('right')} aria-label="Next testimonial">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </SlideIn>
            </div>
            <div className="ctest-slider" ref={testimonialScrollRef}>
              {allTestimonials.map((t: any, i: number) => (
                <SlideIn key={t.author} direction="fade-left" delay={i * 0.15} className="ctest-card">
                  <p className="ctest-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="ctest-footer">
                    <div className="ctest-avatar" style={{ backgroundImage: `url('${t.image}')` }} />
                    <div>
                      <span className="ctest-name">{t.author}</span>
                      <span className="ctest-role">{t.role}</span>
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* S6 — WHY THIS MATTERS (risks + responses) */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="section-head">
            <h2 className="section-title">{compliance.risks.headline}</h2>
          </div>
          <div className="crisks-grid">
            {compliance.risks.items.map((r: any, i: number) => (
              <SlideIn key={r.risk} direction="zoom-in" delay={i * 0.1} className="crisk-card">
                <h3 className="crisk-name">{r.risk}</h3>
                <p className="crisk-desc">{r.riskDesc}</p>
                <p className="crisk-response">{r.response}</p>
              </SlideIn>
            ))}
          </div>
        </section>
      </div>

      {/* S7 — COMPLIANCE + EOR */}
      <div className="home-content-scale compliance-alt">
        <section className="section container">
          <div className="section-head">
            <span className="section-eyebrow-teal">Compliance + EOR</span>
            <h2 className="section-title">{compliance.eorBridge.headline}</h2>
            <p className="section-lead">{compliance.eorBridge.body}</p>
          </div>
          <div className="ceor-grid">
            {compliance.eorBridge.benefits.map((b: any, i: number) => (
              <SlideIn key={b.title} direction="fade-up" delay={i * 0.1} className="ceor-card">
                <span className="ceor-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.description}</p>
                </div>
              </SlideIn>
            ))}
          </div>
          <div className="ceor-cta">
            <Link href={compliance.eorBridge.buttonLink} className="btn-primary">
              {compliance.eorBridge.buttonText} <span className="arrow">→</span>
            </Link>
          </div>
        </section>
      </div>

      {/* S8 — FAQ */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="faq-block">
            <SlideIn direction="fade-up" className="faq-head">
              <h2 className="section-title">{compliance.faqs.title}</h2>
            </SlideIn>
            <div className="faq-list">
              {compliance.faqs.items.map((item: any, i: number) => (
                <SlideIn key={i} direction="fade-left" delay={i * 0.08}>
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
            path: '/compliance',
            faq: compliance.faqs.items.map((item: any) => ({
              question: item.question,
              answer: item.answer.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
            })),
          }),
        ])}
      />

      <CandidateCTA
        title={compliance.finalCta.headline}
        description={compliance.finalCta.subheadline}
        primaryBtnText={compliance.finalCta.buttonText}
        primaryBtnHref={compliance.finalCta.buttonLink}
        imageSrc="/footerCTAImages/compliance.webp"
        imageAlt="Global Compliance Solutions"
      />
    </>
  )
}
