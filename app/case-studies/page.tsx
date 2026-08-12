'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { SlideIn } from '@/components/animations/SlideIn'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import caseData from '@/data/case-studies.json'

export default function CaseStudiesPage() {
  const [openFaq, setOpenFaq] = useState(0)

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  const testimonials = useMemo(() => {
    const testiNames = ["Sarah Mitchell", "James Carter", "Laura Bennett", "Mark Davis", "Anya Petrov"]
    const testiAvatars = ["/testimonials/priya.webp", "/testimonials/James.webp", "/testimonials/lina.webp", "/testimonials/mark.webp", "/testimonials/Anya.webp"]

    return caseData.caseStudies
      .filter((cs: any) => cs.testimonial)
      .map((cs: any, index: number) => ({
        id: cs.id,
        name: testiNames[index % testiNames.length],
        role: cs.clientRole ? (cs.clientName ? `${cs.clientRole}, ${cs.clientName.split(' ')[0]}` : cs.clientRole) : (cs.clientName || "Client"),
        review: cs.testimonial,
        image: testiAvatars[index % testiAvatars.length],
      }))
  }, [])

  const introHeading = useMemo(() => {
    const p0 = caseData.intro.paragraphs[0]
    const splitIndex = p0.indexOf('.') + 1
    return p0.slice(0, splitIndex)
  }, [])

  const introText1 = useMemo(() => {
    const p0 = caseData.intro.paragraphs[0]
    const splitIndex = p0.indexOf('.') + 1
    return p0.slice(splitIndex).trim()
  }, [])

  return (
    <>
      {/* Base (Organization + WebSite) + FAQ as one combined JSON-LD block */}
      <JsonLd
        data={buildPageSchemaGraph(
          caseData.faqs?.items?.length
            ? buildFaqSchema({ path: '/case-studies', faq: caseData.faqs.items })
            : []
        )}
      />
      <style>{`

/* ============================================================
   DARK HERO
   ============================================================ */
.cs-dark-hero {
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
  margin-bottom: 40px;
  background-image: linear-gradient(to right, rgba(14,15,59,0.95) 0%, rgba(14,15,59,0.7) 100%, rgba(14,15,59,0.4) 100%), url('/case-study/Market Entry Workforce Setup.webp');
}

.cs-dark-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
  z-index: 1;
}

.cs-dark-hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 80rem;
  margin: 0 auto;
  padding-inline: clamp(16px, 4vw, 32px);
  margin-top: 6vh;
}

.cs-hero-content {
  max-width: 540px;
  position: relative;
  z-index: 2;
}

.hero-tag {
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

.hero-title {
  font-family: var(--serif);
  font-size: clamp(36px, 4vw, 48px);
  line-height: 1.1;
  
  margin-bottom: 24px;
  color: #fff;
}

.hero-title em {
  color: var(--accent-warm, #F7931E);
  font-style: italic;
}

.hero-desc {
  font-size: 17px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 40px;
}

.btn-outline-gold {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(127, 205, 238, 0.4);
  padding: 8px 24px 8px 8px;
  border-radius: 40px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline-gold:hover {
  background: rgba(127, 205, 238, 0.1);
  border-color: var(--accent-sky, #7FCDEE);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--accent-sky, #7FCDEE);
  color: var(--accent-sky, #7FCDEE);
}

/* Glass Stats Grid */
.cs-hero-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
}

.stat-glass-card {
  padding: 40px 32px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.stat-glass-card:nth-child(even) {
  border-right: none;
}
.stat-glass-card:nth-child(3),
.stat-glass-card:nth-child(4) {
  border-bottom: none;
}

.stat-icon {
  color: var(--accent-warm, #F7931E);
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.stat-value {
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 600;
  margin-bottom: 8px;
  color: #fff;
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
}

/* ============================================================
   FEATURED STORY CARD
   ============================================================ */
.featured-story-wrap {
  margin-bottom: 80px;
}

.featured-story-card {
  display: flex;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
}

.featured-img-col {
  flex: 0 0 45%;
  position: relative;
}

.featured-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-logo-overlay {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  min-width: 90px;
}

.logo-letter {
  font-size: clamp(22px, 4vw, 36px);
  font-weight: 800;
  color: #7b2cbf; /* Avenza purple */
  line-height: 1;
  margin-bottom: 4px;
}

.logo-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
}

.featured-content-col {
  padding: 56px;
  flex: 1;
}

.featured-tag {
  color: var(--accent);
  background: transparent;
  border: none;
  padding: 0;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 24px;
  display: block;
}

.featured-content-col h2 {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 36px);
  
  line-height: 1.2;
  margin-bottom: 16px;
  color: var(--ink);
}

.featured-content-col p {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 40px;
}

.featured-stats-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 24px;
  margin-bottom: 40px;
}

.f-stat {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.f-stat svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.f-stat strong {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 4px;
}

.f-stat span {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.4;
  display: block;
}

.read-story-link {
  font-size: 15px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
  text-decoration: underline;
}

.read-story-link:hover {
  opacity: 0.8;
}

.read-story-link span {
  transition: transform 0.2s;
}

.read-story-link:hover span {
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .cs-dark-hero-inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .cs-dark-hero {
    padding: 140px 0 160px;
  }
  .cs-hero-content {
    max-width: 100%;
    text-align: center;
  }
  .hero-desc {
    margin: 0 auto 32px;
  }
  
  .featured-story-card {
    flex-direction: column;
  }
  .featured-img-col {
    height: 300px;
  }
}

@media (max-width: 640px) {
  .cs-dark-hero {
    padding: 120px 0 140px;
  }
  .stat-glass-card {
    padding: 24px 16px;
  }
  .stat-value {
    font-size: 26px;
    margin-bottom: 4px;
  }
  .stat-label {
    font-size: 12px;
  }
  .stat-icon {
    margin-bottom: 12px;
  }
  .stat-icon svg {
    width: 20px;
    height: 20px;
  }
  .featured-content-col {
    padding: 32px 24px;
  }
  .featured-content-col h2 {
    font-size: 28px;
  }
  .featured-stats-row {
    flex-direction: column;
    gap: 20px;
  }
}

/* ============================================================
   WHY IT MATTERS SECTION
   ============================================================ */
.why-matters-section {
  position: relative;
  z-index: 10;
}
.why-matters-container {
  display: grid;
    gap: 0;
    background: #fcfcfc;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgb(0 0 0 / 52%);
    max-width: 1100px;
    margin: 0 auto;
    padding: 30px;
    align-items: start;
}
.why-left-content {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.why-right-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 10px;
}
.why-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}
.why-heading {
  font-family: var(--serif);
  font-size: clamp(22px, 3.5vw, 32px);
  font-weight: 400;
  color: var(--ink);
  line-height: 1.35;
  margin: 0;
}
.why-desc {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
  margin: 0;
}

/* ============================================================
   CASE STUDIES LIST
   ============================================================ */
.cs-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.cs-list-item {
  display: flex;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0,0,0,0.05);
}

.cs-list-item.img-left {
  flex-direction: row-reverse;
}

.cs-item-content-wrap {
  flex: 1;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: stretch;
}

.cs-item-text {
  width: 100%;
}

.cs-tag {
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
  display: block;
}

.cs-item-text h3 {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 400;
  color: var(--ink);
  line-height: 1.25;
  margin-bottom: 16px;
}

.cs-item-text p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 24px;
}

.cs-item-stats {
  background: var(--accent-soft);
  border-radius: 16px;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.cs-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cs-stat-top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cs-stat-icon {
  color: var(--accent);
  display: flex;
}

.cs-stat-top strong {
  font-size: 16px;
  font-weight: 600;
  color: var(--ink);
}

.cs-stat-info span {
  display: block;
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.4;
}

.cs-item-img-wrap {
  flex: 0 0 45%;
  position: relative;
}

.cs-item-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cs-item-logo-overlay {
  position: absolute;
  bottom: 24px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  min-width: 80px;
}

.cs-item-logo-overlay.left {
  left: 24px;
}

.cs-item-logo-overlay.right {
  right: 24px;
}

.cs-item-logo-overlay .logo-letter {
  font-size: 28px;
  font-weight: 800;
  color: #0b80a1; /* default color, can vary */
  line-height: 1;
  margin-bottom: 4px;
}

.cs-item-logo-overlay .logo-text {
  font-size: 11px;
  font-weight: 600;
  color: var(--ink);
}

/* ============================================================
   IMPACT SECTION
   ============================================================ */
.impact-section {
  padding-bottom: 60px;
}

.impact-inner {
  background: var(--accent-soft);
  border-radius: 24px;
  padding: 60px 48px;
  display: flex;
  align-items: center;
  gap: 60px;
}

.impact-left {
  flex: 0 0 280px;
}

.impact-left h2 {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 36px);
  
  color: var(--ink);
  line-height: 1.1;
  margin-bottom: 12px;
}

.impact-left p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
}

.impact-right {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.impact-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.impact-stat svg {
  margin-bottom: 16px;
}

.impact-stat strong {
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
}

.impact-stat span {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.4;
}
@media (max-width: 1024px) {
  .cs-dark-hero {
    padding: 140px 0 160px;
  }
  .cs-dark-hero-inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .cs-hero-stats {
    max-width: 400px;
  }
  .why-matters-section {
    margin-top: -120px;
  }
  .why-matters-container {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px 24px;
  }
  .why-right-content {
    padding-top: 0;
  }
  
  .intro-block { grid-template-columns: 1fr; gap: 32px; }
  
  .cs-list { gap: 48px; }

  .cs-list-item {
    flex-direction: column;
  }
  .cs-list-item.img-left {
    flex-direction: column;
  }
  .cs-item-img-wrap {
    height: 300px;
    order: -1;
  }
  .cs-item-logo-overlay.left,
  .cs-item-logo-overlay.right {
    bottom: 16px;
    left: 16px;
    right: auto;
  }
  .cs-item-content-wrap {
    flex-direction: column;
    padding: 32px;
    gap: 24px;
  }
  .cs-item-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .impact-inner {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
  .impact-left {
    flex: auto;
  }
  .impact-right {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .cs-dark-hero {
    padding: 120px 0 120px;
  }
  .why-matters-section {
    margin-top: -80px;
  }
  .cs-list { gap: 32px; }
  
  .impact-inner {
    padding: 40px 24px;
  }
  .cs-item-content-wrap {
    padding: 24px;
    gap: 20px;
  }
  .cs-item-stats {
    grid-template-columns: 1fr;
    gap: 16px;
  }
    .hero-title em {
    color: var(--accent-warm, #F7931E);
    font-style: italic;
}
}
`}</style>

      {/* ============= HERO ============= */}
      <header className="cs-dark-hero">
        <div className="cs-dark-hero-inner container">
          <SlideIn direction="fade-right" delay={0.1} className="cs-hero-content">
            <h1 className='hero-title'>Real success stories.<br />Real business <em>impact.</em></h1>
            <p className="hero-desc">
              Discover how businesses achieve global expansion success with our comprehensive HR solutions.</p>
            <button className="btn-outline-gold">
              <span className="">
              </span>
              See how we make an impact
            </button>
          </SlideIn>

          <div className="cs-hero-stats">
            <SlideIn direction="zoom-in" delay={0.3} className="stat-glass-card">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg></div>
              <div className="stat-value">17+</div>
              <div className="stat-label">Countries<br />covered</div>
            </SlideIn>
            <SlideIn direction="zoom-in" delay={0.4} className="stat-glass-card">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
              <div className="stat-value">1,400+</div>
              <div className="stat-label">Employees <br />Placed</div>
            </SlideIn>
            <SlideIn direction="zoom-in" delay={0.5} className="stat-glass-card">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div>
              <div className="stat-value">24/5</div>
              <div className="stat-label">Human<br />support</div>
            </SlideIn>
            <SlideIn direction="zoom-in" delay={0.6} className="stat-glass-card">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg></div>
              <div className="stat-value">90+</div>
              <div className="stat-label">countries<br />supported for hiring</div>
            </SlideIn>
          </div>
        </div>
      </header>

      {/* ============= WHY IT MATTERS ============= */}
      <div className="home-content-scale">
        <section className="section why-matters-section">
          <div className="why-matters-container container">
            <SlideIn direction="fade-right" delay={0.2} className="why-left-content">
              <div className="why-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                WHY IT MATTERS
              </div>
              <h2 className="why-heading">{introHeading}</h2>
            </SlideIn>
            <SlideIn direction="fade-left" delay={0.4} className="why-right-content">
              <p className="why-desc">{introText1}</p>
              <p className="why-desc">{caseData.intro.paragraphs[1]}</p>
            </SlideIn>
          </div>
        </section>
      </div>

      {/* ============= CASE STUDIES LIST ============= */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="cs-list">
            {caseData.caseStudies.map((cs: any, index: number) => (
              <SlideIn
                key={cs.id}
                direction="up"
                delay={0.1}
                className={`cs-list-item ${index % 2 !== 0 ? 'img-left' : ''}`}
              >
                {/* CONTENT SIDE */}
                <div className="cs-item-content-wrap">
                  <div className="cs-item-text">
                    <span className="tag cs-tag">{cs.service}</span>
                    <h3>{cs.title}</h3>
                    <p>{cs.excerpt}</p>
                    <Link href={`/case-studies/${cs.slug}`} className="read-story-link">Read full story </Link>
                  </div>
                  <div className="cs-item-stats">
                    {cs.results.slice(0, 4).map((stat: any, i: number) => (
                      <div className="cs-stat" key={i}>
                        <div className="cs-stat-top">
                          <div className="cs-stat-icon">
                            {i === 0 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#143369" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>}
                            {i === 1 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#143369" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                            {i === 2 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#143369" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>}
                            {i > 2 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#143369" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
                          </div>
                          <strong>{stat.metric}</strong>
                        </div>
                        <div className="cs-stat-info">
                          <span>{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* IMAGE SIDE */}
                <div className="cs-item-img-wrap">
                  <img src={cs.image} alt={cs.title} loading="lazy" />
                  <div className={`cs-item-logo-overlay ${index % 2 !== 0 ? 'left' : 'right'}`}>
                    <span className="logo-letter">{cs.clientName ? cs.clientName.charAt(0).toUpperCase() : 'C'}</span>
                    <span className="logo-text">{cs.clientName ? cs.clientName.split(' ')[0] : 'Client'}</span>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </section>
      </div>

      {/* ============= IMPACT SECTION ============= */}
      <div className="home-content-scale">
        <section className="section impact-section container">
          <div className="impact-inner">
            <SlideIn direction="fade-right" delay={0.1} className="impact-left">
              <h2>The impact<br />we create</h2>
              <p>Real results. Measurable impact.<br />Stronger businesses.</p>
            </SlideIn>
            <div className="impact-right">
              <SlideIn direction="zoom-in" delay={0.2} className="impact-stat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#143369" strokeWidth="1.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                <strong>+250%</strong>
                <span>Average growth in<br />team capacity</span>
              </SlideIn>
              <SlideIn direction="zoom-in" delay={0.3} className="impact-stat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#143369" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <strong>-70%</strong>
                <span>Reduction in<br />compliance risk</span>
              </SlideIn>
              <SlideIn direction="zoom-in" delay={0.4} className="impact-stat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#143369" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <strong>3x</strong>
                <span>Faster time<br />to hire</span>
              </SlideIn>
              <SlideIn direction="zoom-in" delay={0.5} className="impact-stat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#143369" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                <strong>100%</strong>
                <span>Focus on core<br />business</span>
              </SlideIn>
            </div>
          </div>
        </section>
      </div>

      {/* ============= TESTIMONIALS SECTION ============= */}
      <TestimonialsCarousel
        title="What our clients say"
        testimonials={testimonials}
      />

      <div className="home-content-scale">
        <section className="section container">
          <div className="faq-block">
            <SlideIn direction="fade-up" className="faq-head">
              <h2 className="section-title">{caseData.faqs.title}</h2>
              <p className="section-lead">{caseData.faqs.subtitle}</p>
            </SlideIn>
            <div className="faq-list">
              {caseData.faqs.items.map((item: any, i: number) => (
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
                    <p style={{ display: openFaq === i ? 'block' : 'none' }} className="faq-a">{item.answer}</p>
                  </button>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      <CandidateCTA imageSrc="/footerCTAImages/EOR_Page.png" imageAlt="Write your own success story" />
    </>
  )
}
