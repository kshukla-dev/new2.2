'use client'
import { BaseSchema } from '@/components/seo/BaseSchema'
import { SlideIn } from '@/components/animations/SlideIn';

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import { COUNTRY_CONFIG, loadCountryData } from '@/data/country-config'
import type { CountryData, ServiceType } from '@/data/country-config'

export default function CountryPage() {
  const params = useParams()
  const countryParam = params.country as string
  const routePath = `/${countryParam}`

  const config = useMemo(() => COUNTRY_CONFIG[routePath], [routePath])
  if (!config) {
    notFound()
  }

  const [data, setData] = useState<CountryData | null>(null)
  const [openFaq, setOpenFaq] = useState(0)

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  useEffect(() => {
    setOpenFaq(0)
    if (config) {
      const d = loadCountryData(config.dataKey)
      setData(d)
      if (d) {
        document.title = `${d.metadata.title} - Jackson & Frank`
      }
    } else {
      setData(null)
    }
  }, [config])

  const isEor = useMemo(() => config?.type === 'eor', [config])

  function howSteps(type: ServiceType, country: string) {
    if (type === 'eor') {
      return [
        { title: 'Agree scope', description: `Tell us your hiring needs and we'll share the best solution.` },
        { title: 'Onboard compliantly', description: `We handle contracts, payroll, benefits, and compliance from day one.` },
        { title: 'Start your hire', description: `Your new hire is ready to contribute while we manage the rest.` },
      ]
    }
    return [
      { title: 'Draft the agreement', description: `Compliant contractor agreements aligned to ${country} classification rules.` },
      { title: 'Process payments', description: `Accurate, on-time payments to contractors in ${country} in local currency.` },
      { title: 'Stay compliant', description: `We monitor classification and tax requirements to reduce misclassification risk.` },
    ]
  }

  const stats = [
    { value: '48–72 Hours', label: 'Go Live', desc: 'Reduced from 4-week standard processing', icon: 'clock' },
    { value: '17+', label: 'Owned Markets', desc: 'Direct entities', icon: 'globe' },
    { value: '24/5', label: 'Human Support', desc: 'Dedicated assistance', icon: 'shield' },
    { value: '1,400+', label: 'Employees Placed', desc: 'Placed globally', icon: 'users' },
  ]

  const whyFeatures = [
    { title: 'Strong economy', desc: 'One of the most stable and prosperous economies in Europe with a high standard of living.', icon: 'chart' },
    { title: 'Access to Europe', desc: 'Strategically located with excellent infrastructure and access to the EU single market.', icon: 'globe' },
    { title: 'Innovative workforce', desc: 'A highly educated, diverse and English-proficient talent pool across industries.', icon: 'users' },
    { title: 'Business friendly', desc: 'Transparent regulations, competitive tax structure, and a business-friendly environment.', icon: 'shield' }
  ]

  const resources = [
    { tag: 'GUIDE', title: 'The Ultimate Guide to EOR', label: 'Read more', icon: 'book', link: '/global-hiring-guide' },
    { tag: 'CHECKLIST', title: 'Compliance Checklist', label: 'Read more', icon: 'clipboard', link: '/compliance' },
    { tag: 'ARTICLE', title: 'Payroll Rules & Best Practices', label: 'Read more', icon: 'document', link: '/payroll' },
    { tag: 'CASE STUDY', title: 'How We Helped a SaaS Company Expand Globally', label: 'Read more', icon: 'user', link: '/case-studies' }
  ]

  if (config && data) {
    return (
      <>
        <style>{`

/* HERO */
.cp-hero {
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
  margin-bottom: 40px;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgba(14, 15, 59, 0.8) 100%, rgba(14, 15, 59, 0) 70%, transparent 100%), var(--bg-img);
}
.cp-hero-inner {
  display: block;
  max-width: 80rem;
  margin: 0 auto;
}
.cp-hero-copy {
  max-width: 600px;
}
.cp-hero-tag {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 12px;
  border-radius: 99px;
  margin-bottom: 24px;
}
.cp-hero-flag {
  width: 20px;
  height: 14px;
  border-radius: 2px;
  margin-right: 8px;
  object-fit: cover;
}
.cp-hero-tag-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #F7931E;
}
.cp-hero-title {
  font-family: var(--serif);
  font-size: clamp(28px, 4vw, 48px);
  
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 24px;
}
.gold-text {
  color: #F7931E;
  font-style: italic;
  font-weight: 400;
}
.cp-hero-desc {
  font-size: 16px;
  color: rgba(255,255,255,0.85);
  line-height: 1.6;
  margin-bottom: 40px;
}
.cp-hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}
.btn-primary-solid {
  background: #F7931E;
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.4);
}
.btn-primary-solid:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.5);
}
.btn-primary-solid .arrow {
  margin-left: 8px;
}
.btn-outline-gold {
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  background: transparent;
}
.btn-outline-gold:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255,255,255,0.7);
}

/* STATS BANNER */
.cp-stats-banner {
  background: rgba(14, 15, 59, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 0;
  color: #fff;
  border-radius: 24px;
  margin: -80px auto -80px; /* Pulls up into hero, pulls next section up behind it */
  max-width: 1200px;
  position: relative;
  z-index: 10;
  box-shadow: 0 24px 48px rgba(0,0,0,0.15);
}
.cp-stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 0 40px;
}
.cp-stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  border-right: 1px solid rgba(255,255,255,0.1);
}
.cp-stat-item:last-child {
  border-right: none;
}
.cp-stat-icon {
  color: #F7931E;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cp-stat-text {
  display: flex;
  flex-direction: column;
}
.cp-stat-val {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 2px;
}
.cp-stat-label {
  font-size: 11px;
  color: #fff;
  font-weight: 500;
}
.cp-stat-desc {
  font-size: 11px;
  color: rgba(255,255,255,0.7);
}

/* GENERAL SECTION */
.cp-section {
  padding: 80px 0;
}
.cp-bg-light {
  background: #f4f6f9; /* Soft cool grey instead of white */
}
.cp-first-section {
  padding-top: 160px; /* 80px original + 80px to clear the banner overlap */
}
.cp-section-header {
  text-align: center;
  margin-bottom: 60px;
}
.cp-tag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--accent);
  display: block;
  margin-bottom: 16px;
}
.cp-section-title {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 36px);
}

/* WHY HIRE GRID */
.cp-why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}
.cp-why-card {
  text-align: center;
}
.cp-why-icon {
  width: 64px;
  height: 64px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #143369;
  margin: 0 auto 24px;
}
.cp-why-title {
  font-size: 16px;
  
   
  margin-bottom: 12px;
}
.cp-why-desc {
  font-size: 13px;
  color: #555;
  line-height: 1.6;
}

/* TIMELINE */
.cp-timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}
.cp-timeline-line {
  position: absolute;
  top: 16px;
  left: 16.5%;
  right: 16.5%;
  height: 1px;
  background: #e5e7eb;
  z-index: 1;
}
.cp-timeline-step {
  position: relative;
  z-index: 2;
  text-align: center;
}
.cp-timeline-num {
  width: 32px;
  height: 32px;
  background: var(--accent);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  margin: 0 auto 32px;
}
.cp-step-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.cp-step-icon {
   
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cp-step-title {
  font-size: 15px;
  
   
  margin-bottom: 8px;
}
.cp-step-desc {
  font-size: 12px;
  color: #555;
  line-height: 1.5;
}

/* RESOURCES */
.cp-resources-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.cp-resource-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
}
.cp-resource-card:hover {
  border-color: #e5e7eb;
}
.cp-resource-tag {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 16px;
}
.cp-resource-title {
  font-size: 15px;
  
   
  line-height: 1.4;
  margin-bottom: 24px;
}
.cp-resource-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}
.cp-resource-icon {
  position: absolute;
  bottom: -8px;
  right: -8px;
  color: #e5e7eb;
  opacity: 0.5;
  transform: scale(1.5);
}

.country-missing {
  padding: 200px 0 120px;
  text-align: center;
}
.country-missing .cp-tag { margin-bottom: 12px; display: block; }
.country-missing h1 { margin-bottom: 28px; }

@media (max-width: 1024px) {
  .cp-hero { padding: 120px 0 140px; }
  .cp-stats-grid { grid-template-columns: repeat(3, 1fr); padding: 0 20px; }
  .cp-stat-item { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; border-right: none; }
  .cp-stat-item:nth-child(3n) { border-right: none; }
  .cp-why-grid, .cp-resources-grid { grid-template-columns: repeat(2, 1fr); }
  .cp-timeline { grid-template-columns: 1fr; }
  .cp-timeline-line { display: none; }
}
@media (max-width: 768px) {
  .cp-hero {
    background-image: linear-gradient(0deg, #0e0f3b 5%, rgba(14, 15, 59, 0.6) 50%, rgba(14, 15, 59, 0.2) 100%), var(--bg-img);
    background-position: center center;
    padding: 100px 0 120px;
  }
  .cp-hero-title { font-size: clamp(22px, 4vw, 36px); }
  .cp-hero-actions { flex-direction: column; align-items: stretch; }
  .btn-primary-solid, .btn-outline-gold { width: 100%; text-align: center; justify-content: center; }

  .cp-stats-banner {
    margin: -60px 16px -40px;
    padding: 24px 16px;
    border-radius: 16px;
  }
  .cp-stats-grid { 
    grid-template-columns: repeat(2, 1fr); 
    padding: 0;
    gap: 20px 12px;
  }
  .cp-stat-item { 
    border-bottom: none; 
    padding-bottom: 0; 
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .cp-stat-item:nth-child(3) { border-right: none; }
  
  .cp-first-section { padding-top: 100px; }
  .cp-section-title { font-size: 28px; }

  .cp-why-grid, .cp-resources-grid { 
    grid-template-columns: repeat(2, 1fr); 
    gap: 24px 16px;
  }

  /* TIMELINE MOBILE */
  .cp-timeline {
    padding-left: 28px;
    border-left: 2px solid #e5e7eb;
    margin-left: 16px;
    gap: 24px;
    display: flex;
    flex-direction: column;
  }
  .cp-timeline-step {
    text-align: left;
    position: relative;
  }
  .cp-timeline-num {
    position: absolute;
    left: -45px; /* 28px padding + 1px border + 16px half circle */
    top: 24px; /* align with card padding */
    margin: 0;
  }
  .cp-step-card {
    padding: 20px 16px;
  }
  .cp-step-icon {
    padding: 10px;
  }
}
`}</style>

        {/* ============= HERO ============= */}
        <header className="cp-hero" style={{ '--bg-img': `url(${config.image || `/countries/eor-${countryParam.replace('-contractor', '')}.webp`})` } as React.CSSProperties}>
          <div className="container cp-hero-inner">
            <div className="cp-hero-copy">
              <h1 className="cp-hero-title">
                {isEor ? (
                  <>
                    Hire in <em className="gold-text">{config.name}</em><br />without an entity
                  </>
                ) : (
                  <>
                    Pay contractors in<br /><em className="gold-text">{config.name}</em>
                  </>
                )}
              </h1>

              <p className="cp-hero-desc">
                {isEor ? `Compliant, fast and hassle-free hiring in ${config.name}. Hire top talent in just a few days - without setting up a local entity.` : data.metadata.description}
              </p>

              <div className="cp-hero-actions">
                <Link
                  href={`/contact?reason=${isEor ? 'eor_services' : 'contractor_management'}`}
                  className="btn-primary-solid"
                >
                  {isEor ? `Hire in ${config.name}` : 'Manage contractors'} <span className="arrow">→</span>
                </Link>
                <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                  Book a call
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* ============= STATS BANNER ============= */}
        <div className="home-content-scale">
          <SlideIn as="section" direction="fade-up" className="cp-stats-banner">
            <div className="container cp-stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="cp-stat-item">
                  <div className="cp-stat-icon">
                    {s.icon === 'globe' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>}
                    {s.icon === 'experience' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                    {s.icon === 'users' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                    {s.icon === 'clock' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
                    {s.icon === 'shield' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>}
                  </div>
                  <div className="cp-stat-text">
                    <span className="cp-stat-val">{s.value}</span>
                    <span className="cp-stat-label">{s.label}</span>
                    <span className="cp-stat-desc">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </SlideIn>
        </div>

        {/* ============= WHY HIRE ============= */}
        <div className="home-content-scale">
          <SlideIn as="section" direction="zoom-in" className="cp-section cp-bg-light cp-first-section">
            <div className="container">
              <div className="cp-section-header">
                <span className="cp-tag">WHY HIRE IN {config.name.toUpperCase()}</span>
                <h2 className="cp-section-title">A strategic hub for <em className="gold-text">global business</em></h2>
              </div>

              <div className="cp-why-grid">
                {whyFeatures.map((feat, i) => (
                  <div key={i} className="cp-why-card">
                    <div className="cp-why-icon">
                      {feat.icon === 'chart' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /><path d="M9 15h12" /><path d="M9 11h12" /><path d="M9 19h12" /></svg>}
                      {feat.icon === 'globe' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>}
                      {feat.icon === 'users' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                      {feat.icon === 'shield' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>}
                    </div>
                    <h3 className="cp-why-title">{feat.title}</h3>
                    <p className="cp-why-desc">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>

        {/* ============= HOW IT WORKS ============= */}
        <div className="home-content-scale">
          <SlideIn as="section" direction="fade-right" className="cp-section">
            <div className="container">
              <div className="cp-section-header">
                <span className="cp-tag">HOW IT WORKS</span>
                <h2 className="cp-section-title">
                  {isEor ? 'Hiring' : 'Engaging contractors'} in <em className="gold-text">{config.name}</em>, in 3 simple steps
                </h2>
              </div>

              <div className="cp-timeline">
                <div className="cp-timeline-line"></div>
                {howSteps(config.type, config.name).map((step, i) => (
                  <div key={i} className="cp-timeline-step">
                    <div className="cp-timeline-num">0{i + 1}</div>
                    <div className="cp-step-card">
                      <div className="cp-step-icon">
                        {i === 0 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>}
                        {i === 1 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>}
                        {i === 2 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                      </div>
                      <div className="cp-step-content">
                        <h3 className="cp-step-title">{step.title}</h3>
                        <p className="cp-step-desc">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>

        {/* ============= EXPLORE RESOURCES ============= */}
        <div className="home-content-scale">
          <SlideIn as="section" direction="fade-left" className="cp-section cp-bg-light">
            <div className="container">
              <div className="cp-section-header">
                <span className="cp-tag">EXPLORE MORE RESOURCES</span>
              </div>

              <div className="cp-resources-grid">
                {resources.map((res, i) => (
                  <div key={i} className="cp-resource-card">
                    <div className="cp-resource-top">
                      <span className="cp-resource-tag">{res.tag}</span>
                      <h3 className="cp-resource-title">{res.title}</h3>
                      <Link href={res.link} className="cp-resource-link">{res.label} &rarr;</Link>
                    </div>
                    <div className="cp-resource-icon">
                      {res.icon === 'book' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>}
                      {res.icon === 'clipboard' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><line x1="9" y1="10" x2="15" y2="10" /><line x1="9" y1="14" x2="15" y2="14" /><line x1="9" y1="18" x2="15" y2="18" /></svg>}
                      {res.icon === 'document' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>}
                      {res.icon === 'user' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>

        {/* ============= FAQ ============= */}
        <div className="home-content-scale">
          <SlideIn as="section" direction="fade-up" className="section container">
            <div className="faq-block">
              <div className="faq-head">
                <h2 className="section-title">{data?.faqs?.title}</h2>
                <p className="section-lead">{data.faqs.subtitle}</p>
              </div>
              <div className="faq-list">
                {data.faqs.items.map((item: any, i: number) => (
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
          </SlideIn>
        </div>
      </>
    )
  }

  // Fallback if route/data missing
  return (
    <>
      <BaseSchema />
      <style>{`

/* HERO */
.cp-hero {
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
  margin-bottom: 40px;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgba(14, 15, 59, 0.8) 40%, rgba(14, 15, 59, 0) 70%, transparent 100%), var(--bg-img);
}
.cp-hero-inner {
  display: block;
  max-width: 80rem;
  margin: 0 auto;
}
.cp-hero-copy {
  max-width: 600px;
}
.cp-hero-tag {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 12px;
  border-radius: 99px;
  margin-bottom: 24px;
}
.cp-hero-flag {
  width: 20px;
  height: 14px;
  border-radius: 2px;
  margin-right: 8px;
  object-fit: cover;
}
.cp-hero-tag-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #F7931E;
}
.cp-hero-title {
  font-family: var(--serif);
  font-size: clamp(28px, 4vw, 48px);
  
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 24px;
}
.gold-text {
  color: #F7931E;
  font-style: italic;
  font-weight: 400;
}
.cp-hero-desc {
  font-size: 16px;
  color: rgba(255,255,255,0.85);
  line-height: 1.6;
  margin-bottom: 40px;
}
.cp-hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}
.btn-primary-solid {
  background: #F7931E;
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.4);
}
.btn-primary-solid:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.5);
}
.btn-primary-solid .arrow {
  margin-left: 8px;
}
.btn-outline-gold {
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  background: transparent;
}
.btn-outline-gold:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255,255,255,0.7);
}

/* STATS BANNER */
.cp-stats-banner {
  background: rgba(14, 15, 59, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 0;
  color: #fff;
  border-radius: 24px;
  margin: -80px auto -80px; /* Pulls up into hero, pulls next section up behind it */
  max-width: 1200px;
  position: relative;
  z-index: 10;
  box-shadow: 0 24px 48px rgba(0,0,0,0.15);
}
.cp-stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 0 40px;
}
.cp-stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  border-right: 1px solid rgba(255,255,255,0.1);
}
.cp-stat-item:last-child {
  border-right: none;
}
.cp-stat-icon {
  color: #F7931E;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cp-stat-text {
  display: flex;
  flex-direction: column;
}
.cp-stat-val {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 2px;
}
.cp-stat-label {
  font-size: 11px;
  color: #fff;
  font-weight: 500;
}
.cp-stat-desc {
  font-size: 11px;
  color: rgba(255,255,255,0.7);
}

/* GENERAL SECTION */
.cp-section {
  padding: 80px 0;
}
.cp-bg-light {
  background: #f4f6f9; /* Soft cool grey instead of white */
}
.cp-first-section {
  padding-top: 160px; /* 80px original + 80px to clear the banner overlap */
}
.cp-section-header {
  text-align: center;
  margin-bottom: 60px;
}
.cp-tag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--accent);
  display: block;
  margin-bottom: 16px;
}
.cp-section-title {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 36px);
  
   
}

/* WHY HIRE GRID */
.cp-why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}
.cp-why-card {
  text-align: center;
}
.cp-why-icon {
  width: 64px;
  height: 64px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #143369;
  margin: 0 auto 24px;
}
.cp-why-title {
  font-size: 16px;
  
   
  margin-bottom: 12px;
}
.cp-why-desc {
  font-size: 13px;
  color: #555;
  line-height: 1.6;
}

/* TIMELINE */
.cp-timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}
.cp-timeline-line {
  position: absolute;
  top: 16px;
  left: 16.5%;
  right: 16.5%;
  height: 1px;
  background: #e5e7eb;
  z-index: 1;
}
.cp-timeline-step {
  position: relative;
  z-index: 2;
  text-align: center;
}
.cp-timeline-num {
  width: 32px;
  height: 32px;
  background: var(--accent);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  margin: 0 auto 32px;
}
.cp-step-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.cp-step-icon {
   
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cp-step-title {
  font-size: 15px;
  
   
  margin-bottom: 8px;
}
.cp-step-desc {
  font-size: 12px;
  color: #555;
  line-height: 1.5;
}

/* RESOURCES */
.cp-resources-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.cp-resource-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
}
.cp-resource-card:hover {
  border-color: #e5e7eb;
}
.cp-resource-tag {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 16px;
}
.cp-resource-title {
  font-size: 15px;
  
   
  line-height: 1.4;
  margin-bottom: 24px;
}
.cp-resource-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}
.cp-resource-icon {
  position: absolute;
  bottom: -8px;
  right: -8px;
  color: #e5e7eb;
  opacity: 0.5;
  transform: scale(1.5);
}

.country-missing {
  padding: 200px 0 120px;
  text-align: center;
}
.country-missing .cp-tag { margin-bottom: 12px; display: block; }
.country-missing h1 { margin-bottom: 28px; }

@media (max-width: 1024px) {
  .cp-hero { padding: 120px 0 140px; }
  .cp-stats-grid { grid-template-columns: repeat(3, 1fr); padding: 0 20px; }
  .cp-stat-item { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; border-right: none; }
  .cp-stat-item:nth-child(3n) { border-right: none; }
  .cp-why-grid, .cp-resources-grid { grid-template-columns: repeat(2, 1fr); }
  .cp-timeline { grid-template-columns: 1fr; }
  .cp-timeline-line { display: none; }
}
@media (max-width: 768px) {
  .cp-hero {
    background-image: linear-gradient(0deg, #0e0f3b 5%, rgba(14, 15, 59, 0.6) 50%, rgba(14, 15, 59, 0.2) 100%), var(--bg-img);
    background-position: center center;
    padding: 100px 0 120px;
  }
  .cp-hero-title { font-size: clamp(22px, 4vw, 36px); }
  .cp-hero-actions { flex-direction: column; align-items: stretch; }
  .btn-primary-solid, .btn-outline-gold { width: 100%; text-align: center; justify-content: center; }

  .cp-stats-banner {
    margin: -60px 16px -40px;
    padding: 24px 16px;
    border-radius: 16px;
  }
  .cp-stats-grid { 
    grid-template-columns: repeat(2, 1fr); 
    padding: 0;
    gap: 20px 12px;
  }
  .cp-stat-item { 
    border-bottom: none; 
    padding-bottom: 0; 
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .cp-stat-item:nth-child(3) { border-right: none; }
  
  .cp-first-section { padding-top: 100px; }
  .cp-section-title { font-size: 28px; }

  .cp-why-grid, .cp-resources-grid { 
    grid-template-columns: repeat(2, 1fr); 
    gap: 24px 16px;
  }

  /* TIMELINE MOBILE */
  .cp-timeline {
    padding-left: 28px;
    border-left: 2px solid #e5e7eb;
    margin-left: 16px;
    gap: 24px;
    display: flex;
    flex-direction: column;
  }
  .cp-timeline-step {
    text-align: left;
    position: relative;
  }
  .cp-timeline-num {
    position: absolute;
    left: -45px; /* 28px padding + 1px border + 16px half circle */
    top: 24px; /* align with card padding */
    margin: 0;
  }
  .cp-step-card {
    padding: 20px 16px;
  }
  .cp-step-icon {
    padding: 10px;
  }
}
`}</style>
      <div className="container country-missing">
        <span className="cp-tag">Country not found</span>
        <h1 className="cp-section-title">We couldn&apos;t load this <em className="gold-text">country page</em></h1>
        <Link href="/employer-of-record" className="btn-primary-solid" style={{ marginTop: '24px' }}>
          Browse all services <span className="arrow">→</span>
        </Link>
      </div>
    </>
  )
}
