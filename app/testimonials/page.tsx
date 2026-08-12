'use client'
import { BaseSchema } from '@/components/seo/BaseSchema'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import CandidateCTA from '@/components/sections/CandidateCTA'
import tp from '@/data/testimonials-page.json'
import testimonials from '@/data/testimonials.json'

const trustAvatars = [
  '/testimonials/lina.webp',
  '/testimonials/Anya.webp',
  '/testimonials/priya.webp',
]

export default function TestimonialsPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [activeIndex, setActiveIndex] = useState(2)

  const testimonialsWithMetrics = useMemo(() => {
    const list = (testimonials as any).testimonials || []
    return list.map((t: any, idx: number) => {
      let metricText = "Handled operations with 100% compliance"
      let metricIcon = "shield"
      let metricTheme = "blue"

      if (t.name.includes("Priya")) {
        metricText = "Handled operations in <strong>5+ countries</strong> with <strong>100% compliance</strong>"
        metricIcon = "shield"
        metricTheme = "blue"
      } else if (t.name.includes("Anya")) {
        metricText = "Relocated <strong>3 teams</strong> and families successfully"
        metricIcon = "people"
        metricTheme = "purple"
      } else if (t.name.includes("Thomas") || t.name.includes("James") || t.name.includes("James R.") || t.name.includes("Thomas P.")) {
        metricText = "Onboarded <strong>7 countries</strong> in just <strong>2 months</strong>"
        metricIcon = "chart"
        metricTheme = "green"
      } else if (t.name.includes("Lina")) {
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

      return { ...t, metricText, metricIcon, metricTheme }
    })
  }, [])

  const totalSlides = testimonialsWithMetrics.length

  function prevSlide() {
    setActiveIndex(prev => prev > 0 ? prev - 1 : totalSlides - 1)
  }

  function nextSlide() {
    setActiveIndex(prev => prev < totalSlides - 1 ? prev + 1 : 0)
  }

  function setSlide(index: number) {
    setActiveIndex(index)
  }

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  return (
    <>
      <BaseSchema />
      <style>{`

.testimonials-hero {
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
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 71%) 40%, rgb(14 15 59 / 70%) 70%, #00000000 100%), url(/services/service-page/hiringGlobally.webp);
}

.testimonials-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.testimonials-hero > * {
  position: relative;
  z-index: 1;
}

.testimonials-hero-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 10px 32px;
}

.testimonials-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.testimonials-hero h1 {
  color: #ffffff;
  text-shadow: none;
}

.testimonials-hero .service-hero-copy h1 em {
  color: #F7931E;
}

.testimonials-hero .service-hero-lede {
  color: rgba(255,255,255,0.82);
  text-shadow: none;
  font-size: 19px;
}

.testimonials-hero .service-hero-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 32px;
  list-style: none;
  padding: 0;
}

.testimonials-hero .hero-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255,255,255,0.85);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-shadow: none;
}

.testimonials-hero .hero-feature-check {
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

.testimonials-hero .cta-row {
  margin-top: 40px;
}

.testimonials-hero .btn-primary {
  background: #F7931E;
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.4);
}

.testimonials-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.5);
}

.testimonials-hero .btn-secondary {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.testimonials-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255,255,255,0.7);
  color: #ffffff;
}

.testimonials-hero .trust-row {
  margin-top: 48px;
}

.testimonials-hero .trust-text {
  color: rgba(255,255,255,0.8);
}

.testimonials-hero .avatar {
  border-color: var(--bg);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

@media (max-width: 1440px) {
  .testimonials-hero {
    background-size: 65% auto;
  }
}

@media (max-width: 1280px) {
  .testimonials-hero {
    background-size: 75% auto;
    background-position: right -5% center;
  }
}

@media (max-width: 1024px) {
  .testimonials-hero {
    background-size: 85% auto;
    background-position: right -15% center;
  }
}

@media (max-width: 960px) {
  .testimonials-hero {
    padding: 52px 24px 72px;
    background-size: 100% auto;
    background-position: top 20% center;
    background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 0%) 40%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/hiringGlobally.webp);
  }
}

@media (max-width: 640px) {
  .testimonials-hero {
    min-height: auto;
    padding: 260px 20px 60px;
    background-image: none;
    background-color: #0E0F3B;
    
  }
  .testimonials-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/hiringGlobally.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .testimonials-hero-inner {
    padding-left: 0;
    padding-right: 0;
  }
  .testimonials-hero .service-hero-copy h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .testimonials-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .testimonials-hero .btn-primary,
  .testimonials-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

.spotlight-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.spotlight-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 38px 34px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.spotlight-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 50px rgba(9, 64, 123, 0.12);
}
.spotlight-metric {
  display: inline-block;
  align-self: flex-start;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  background: rgba(9, 64, 123, 0.1);
  border: 1px solid rgba(9, 64, 123, 0.2);
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 500;
}
.spotlight-card blockquote {
  font-family: var(--serif);
  font-size: 19px;
  line-height: 1.6;
  color: var(--ink);
  flex-grow: 1;
}
.spotlight-author,
.review-author {
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid rgba(9, 64, 123, 0.12);
  padding-top: 18px;
}
.spotlight-author img,
.review-author img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-soft);
}
.spotlight-author strong,
.review-author strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}
.spotlight-author span,
.review-author span {
  font-size: 12px;
  color: var(--ink-muted);
}

.highlights-strip {
  background: #0E0F3B;
  color: var(--bg);
  padding: 60px 0;
}
.highlights-strip .tag { color: var(--accent-warm); }
.highlights-strip .section-title { color: var(--bg); }
.highlights-strip .section-lead { color: rgba(255, 255, 255, 0.7); }
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.highlight-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.highlight-card:hover {
  transform: translateY(-4px);
  border-color: rgba(9, 64, 123, 0.4);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.28);
}
.highlight-mark {
  display: inline-block;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(22px, 4vw, 32px);
  margin-bottom: 16px;
}
.highlight-card h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 12px;
  color: var(--bg);
}
.highlight-card p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
}

/* Testimonials Carousel Slider styles */
.review-carousel-section {
  position: relative;
  overflow: hidden;
  padding: 80px 0;
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
    padding: 0 40px;
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
  transform: translateX(calc(50% - (var(--card-width) / 2) - (v-bind(activeIndex) * (var(--card-width) + var(--card-gap)))));
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
  border: 1px solid var(--border);
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
  border-color: var(--accent);
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
  color: var(--ink);
  margin-bottom: 2px;
}
.cc-details span {
  display: block;
  font-size: 12px;
  color: var(--accent);
  font-weight: 600;
}
.cc-quote-badge {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: var(--serif);
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
  color: var(--ink-soft);
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
  color: var(--ink-soft);
  margin-top: auto;
}
.cc-metric-badge :deep(strong) {
  color: var(--ink);
  font-weight: 600;
}
.cc-metric-badge.blue {
  background: #f0f4ff;
  border: 1px solid #e0ebff;
  color: var(--accent);
}
.cc-metric-badge.blue svg {
  color: var(--accent);
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
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink);
  cursor: pointer;
  z-index: 5;
  transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
}
.carousel-btn:hover {
  background: var(--bg);
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
  background: var(--accent);
  transform: scale(1.25);
}

/* FAQ Font Standardizations */
.faq-toggle-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--ink-muted);
  flex-shrink: 0;
  margin-left: auto;
  transition: color 0.3s, border-color 0.3s;
}

.faq-item.open .faq-toggle-circle {
  color: var(--accent);
  border-color: var(--accent);
}

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

.faq-item.open 
.faq-a {
  grid-column: 1 / -1;
  margin-top: 14px;
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
}

@media (max-width: 1024px) {
  .spotlight-grid { grid-template-columns: 1fr 1fr; }
  .highlights-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .spotlight-grid, .highlights-grid { grid-template-columns: 1fr; }
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
`}</style>

      <header className="service-hero testimonials-hero">
        <div className="testimonials-hero-inner">
          <div className="service-hero-copy">
            <h1>Loved by teams <em>hiring globally</em></h1>
            <p className="service-hero-lede">{tp.definition.description}</p>
            <ul className="service-hero-features">
              {tp.definition.keyFeatures.map((f: string, i: number) => (
                <li key={i} className="hero-feature">
                  <span className="hero-feature-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="cta-row">
              <Link href="/contact" className="btn-primary">
                {tp.definition.primaryButtonText} <span className="arrow">→</span>
              </Link>
              <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {tp.definition.secondaryButtonText}
              </a>
            </div>
            <div className="trust-row">
              <div className="avatars">
                {trustAvatars.map((src, i) => (
                  <div
                    key={i}
                    className="avatar"
                    style={{ backgroundImage: `url('${src}')` }}
                  />
                ))}
              </div>
              <span className="trust-text">
                <strong>4.9 / 5 rating</strong> across 700+ companies
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="home-content-scale">
        <section className="stats-strip">
          <div className="container stats-strip-inner">
            {tp.definition.trustSignals.stats.map((s: any, i: number) => (
              <div key={i} className="stat-item">
                <strong>{s.value}</strong>
                {s.label && <span className="stat-label">{s.label}</span>}
                <span className="stat-desc">{s.description}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container">
          <div className="section-head">
            <span className="tag">{tp.featured.subtitle}</span>
            <h2 className="section-title">{tp.featured.title}</h2>
            <p className="section-lead">{tp.featured.description}</p>
          </div>
          <div className="spotlight-grid">
            {tp.featured.items.map((item: any) => (
              <div key={item.id} className="spotlight-card">
                <span className="spotlight-metric">{item.metric}</span>
                <blockquote>&quot;{item.review}&quot;</blockquote>
                <div className="spotlight-author">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.role} &middot; {item.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="highlights-strip">
          <div className="container">
            <div className="section-head">
              <span className="tag">{tp.highlights.subtitle}</span>
              <h2 className="section-title">{tp.highlights.title}</h2>
              <p className="section-lead">{tp.highlights.description}</p>
            </div>
            <div className="highlights-grid">
              {tp.highlights.items.map((h: any, i: number) => (
                <div key={i} className="highlight-card">
                  <span className="highlight-mark">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{h.title}</h3>
                  <p>{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container review-carousel-section">
          <div className="section-head text-center">
            <h2 className="section-title">In our clients&apos; <em>own words</em></h2>
          </div>

          <div className="testimonials-carousel" style={{ '--card-width': '380px', '--card-gap': '32px' } as any}>
            <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            <div className="carousel-viewport">
              <div className="carousel-track" style={{ transform: `translateX(calc(50% - (var(--card-width) / 2) - (${activeIndex} * (var(--card-width) + var(--card-gap)))))` }}>
                {testimonialsWithMetrics.map((t: any, idx: number) => (
                  <div
                    key={t.id}
                    className={`carousel-card-wrap ${idx === activeIndex ? 'active' : ''}`}
                  >
                    <div className="carousel-card">
                      <div className="carousel-card-header">
                        <div className="cc-author-info">
                          <img src={t.image} alt={t.name} className="cc-avatar" />
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
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${activeIndex === i ? 'active' : ''}`}
                  onClick={() => setSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container">
          <div className="faq-block">
            <div className="faq-head">
              <h2 className="section-title">{tp.faqs.title}</h2>
              <p className="section-lead">{tp.faqs.subtitle}</p>
            </div>
            <div className="faq-list">
              {tp.faqs.items.map((item: any, i: number) => (
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
        </section>
      </div>

      <CandidateCTA imageSrc="/footerCTAImages/immigration.jpg" imageAlt="Become our next success story" />
    </>
  )
}
