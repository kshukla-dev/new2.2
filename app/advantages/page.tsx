'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SlideIn } from '@/components/animations/SlideIn'
import CandidateCTA from '@/components/sections/CandidateCTA'
import advantages from '@/data/advantages.json'
import QuickContactForm from '@/components/sections/QuickContactForm'

const trustAvatars = [
  '/testimonials/lina.webp',
  '/testimonials/Anya.webp',
  '/testimonials/priya.webp',
]

const faqTabs = [
  { id: 'About EOR', icon: 'user' },
  { id: 'Hiring & Onboarding', icon: 'users' },
  { id: 'Payroll & Compliance', icon: 'shield' },
  { id: 'Support & Others', icon: 'headset' }
]

export default function AdvantagesPage() {
  const [openFaq, setOpenFaq] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<string>('')

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  const categorizedFaqs = useMemo(() => {
    const list = (advantages as any).faqs?.items || []
    return list.map((item: any, idx: number) => {
      let category = 'About EOR'
      if ([1, 4, 7].includes(idx)) category = 'Hiring & Onboarding'
      else if ([2, 6].includes(idx)) category = 'Payroll & Compliance'
      else if ([3, 5].includes(idx)) category = 'Support & Others'
      return { ...item, category }
    })
  }, [])

  const filteredFaqs = useMemo(() => {
    if (!activeTab) return categorizedFaqs
    return categorizedFaqs.filter((q: any) => q.category === activeTab)
  }, [activeTab, categorizedFaqs])

  return (
    <>
      {/* Base (Organization + WebSite) + FAQ as one combined JSON-LD block */}
      <JsonLd
        data={buildPageSchemaGraph(
          (advantages as any).faqs?.items?.length
            ? buildFaqSchema({ path: '/advantages', faq: (advantages as any).faqs.items })
            : []
        )}
      />
      <style>{`
        .advantages-hero{position:relative;
        left:50%;right:50%;
        margin-top: -70px;
        margin-left:-50vw;
        margin-right:-50vw;
        width:100vw;
        box-sizing:border-box;
        padding:140px 0 96px;
        display:block;background-color:#0E0F3B;
        background-image:linear-gradient(90deg,#0e0f3b 0%,rgb(14 15 59 / 0%) 40%,rgb(14 15 59 / 0%) 70%,transparent 100%),url(/services/service-page/advantages.webp);
        background-size:60% auto;
        background-position:right 0% center;
        background-repeat:no-repeat;
        color:#ffffff;
        min-height: auto;
        overflow:hidden}
        .advantages-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at top right,rgba(9,64,123,0.3),transparent 60%);pointer-events:none}
        .advantages-hero > *{position:relative;z-index:1;}
        .advantages-hero-inner{max-width: 80rem;margin:0 auto;padding-inline: clamp(16px, 4vw, 32px);display: flex;flex-direction: row;justify-content: space-between;align-items: center;gap: 48px;}
        @media (max-width: 960px) {
          .advantages-hero-inner {
            flex-direction: column;
            align-items: stretch;
            gap: 32px;
          }
        }
        .advantages-hero .service-hero-copy{max-width:720px;animation:fade-slide-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards}
        @keyframes fade-slide-up{0%{opacity:0;transform:translateY(30px)}100%{opacity:1;transform:translateY(0)}}
        .advantages-hero .tag{color:var(--accent);background:rgba(9,64,123,0.1);border:1px solid rgba(9,64,123,0.2);margin-bottom:24px}
        .advantages-hero h1{color:#ffffff;text-shadow:none}
        .advantages-hero .service-hero-copy h1 em{color:#F7931E}
        .advantages-hero .service-hero-lede{color:rgba(255,255,255,0.82);text-shadow:none;font-size:19px}
        .advantages-hero .service-hero-features{display:flex;flex-direction:column;gap:14px;margin-top:32px;list-style:none;padding:0}
        .advantages-hero .hero-feature{display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.85);font-size:16px;font-weight:500;letter-spacing:0.02em;text-shadow:none}
        .advantages-hero .hero-feature-check{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.3);color:#F7931E;font-size:13px;font-weight:800;flex-shrink:0;box-shadow:0 0 12px rgba(0,0,0,0.2)}
        .advantages-hero .cta-row{margin:20px 0px !important}
        .advantages-hero .btn-primary{background:#F7931E;color:#ffffff;border:none;box-shadow:0 8px 24px rgba(247,147,30,0.4)}
        .advantages-hero .btn-primary:hover{background:#e07d10;transform:translateY(-2px);box-shadow:0 12px 32px rgba(247,147,30,0.5)}
        .advantages-hero .btn-secondary{background:transparent;color:#ffffff;border:1px solid rgba(255,255,255,0.4)}
        .advantages-hero .btn-secondary:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.7);color:#ffffff}
        .advantages-hero .trust-row{margin-top:20px}
        .advantages-hero .trust-text{color:rgba(255,255,255,0.8)}
        .advantages-hero .avatar{border-color:#fdfbf7;box-shadow:0 10px 20px rgba(0,0,0,0.08)}
        @media(max-width:1440px){.advantages-hero{background-size:65% auto}}
        @media(max-width:1280px){.advantages-hero{background-size:85% auto;background-position:right -5% center}}
        @media(max-width:1024px){.advantages-hero{background-size:85% auto;background-position:right -15% center}}
        @media(max-width:960px){.advantages-hero{padding:72px 24px 72px;background-size:100% auto;background-position:top 20% center}}
        @media(max-width:640px){.advantages-hero{min-height:auto;padding:260px 20px 60px;background-image:none;background-color:#0E0F3B;margin-top:-20px}.advantages-hero::before{content:'';position:absolute;top:0;left:0;right:0;height:280px;background-image:url(/services/service-page/advantages.webp);background-size:cover;background-position:center;background-repeat:no-repeat;-webkit-mask-image:linear-gradient(to bottom,black 55%,transparent 100%);mask-image:linear-gradient(to bottom,black 55%,transparent 100%);pointer-events:none}.advantages-hero-inner{padding-left:0;padding-right:0}.advantages-hero .service-hero-copy h1{font-size:clamp(36px,8vw,48px)}.advantages-hero .cta-row{flex-direction:column;gap:16px}.advantages-hero .btn-primary,.advantages-hero .btn-secondary{width:100%;justify-content:center}}
        .adv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        .adv-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:38px 34px;box-shadow:0 20px 40px rgba(9,64,123,0.06);transition:transform 0.28s ease,box-shadow 0.28s ease}
        .adv-card:hover{transform:translateY(-4px);box-shadow:0 24px 50px rgba(9,64,123,0.12)}
        .adv-num{display:inline-flex;align-items:center;justify-content:center;width:54px;height:54px;border-radius:50%;background:var(--accent);color:var(--bg);font-family:var(--serif);font-style:italic;font-size:20px;margin-bottom:22px;box-shadow:0 4px 10px rgba(9,64,123,0.2)}
        .adv-card h3{font-family:var(--serif);font-size:24px;font-weight:500;margin-bottom:18px;color:var(--ink)}
        .adv-card ul,.cert-card ul{list-style:none;padding:0;display:flex;flex-direction:column;gap:12px}
        .adv-card li,.cert-card li{font-size:14px;color:var(--ink-soft);display:flex;gap:10px;line-height:1.5}
        .li-check{color:var(--accent);flex-shrink:0}
        .cert-strip{border-top:1px solid var(--border);padding:40px 0}
        .cert-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        .cert-card{background:var(--bg);border:1px solid rgba(9,64,123,0.15);border-radius:var(--radius-lg);padding:36px 32px;box-shadow:0 16px 32px rgba(9,64,123,0.04);transition:transform 0.3s ease,box-shadow 0.3s ease;display:flex;flex-direction:column}
        .cert-card:hover{transform:translateY(-4px);box-shadow:0 24px 48px rgba(9,64,123,0.08)}
        .cert-card-header{display:flex;align-items:center;gap:16px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(9,64,123,0.12)}
        .cert-icon-wrapper{display:flex;align-items:center;justify-content:center;width:56px;height:56px;background:#ffffff;border:1px solid rgba(9,64,123,0.12);border-radius:50%;overflow:hidden;padding:6px;flex-shrink:0;box-shadow:0 4px 10px rgba(0,0,0,0.03)}
        .cert-icon-img{width:100%;height:100%;object-fit:contain;border-radius:50%}
        .cert-card h3{font-family:var(--serif);font-size:20px;font-weight:500;margin:0;color:var(--ink)}
        .faq-block{display:grid;grid-template-columns:1fr 2fr;gap:80px}
        .faq-head .tag{margin-bottom:16px}
        .faq-tabs-wrapper{display:flex;justify-content:flex-start;margin-bottom:32px}
        .faq-tabs{display:inline-flex;background:rgba(9,64,123,0.08);padding:6px;border-radius:999px;gap:4px;flex-wrap:wrap}
        .faq-tab{background:transparent;border:none;color:var(--ink-soft);padding:10px 24px;border-radius:999px;font-size:15px;font-weight:500;display:flex;align-items:center;cursor:pointer;transition:all 0.2s;box-shadow:none}
        .faq-tab:hover{color:var(--accent)}
        .faq-tab.active{background:white;color:var(--accent);box-shadow:0 2px 8px rgba(9,64,123,0.12)}
        .faq-list{display:flex;flex-direction:column}
        .faq-item{text-align:left;background:transparent;border:none;border-top:1px solid var(--border);padding:24px 0;display:grid;grid-template-columns:1fr auto;align-items:start;gap:16px;cursor:pointer;font-family:inherit;width:100%} 
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

.faq-q {font-family:var(--sans);font-size:19px;font-weight:600;line-height:1.3;color:var(--ink);transition:color 0.2s, transform 0.2s}
        .faq-item:hover .faq-q {color:var(--accent);transform:translateX(6px)}
        .faq-item.open .faq-q{color:var(--accent)}
        
        .faq-item.open 
        .faq-a{grid-column:1 / -1;margin-top:14px;font-size:15px;color:var(--ink-soft);line-height:1.65}
        @media(max-width:1024px){.adv-grid,.cert-grid{grid-template-columns:1fr}.faq-block{grid-template-columns:1fr;gap:32px}}
      
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

      <header className="service-hero advantages-hero">
        <div className="advantages-hero-inner">
          <div className="service-hero-copy">
            <SlideIn direction="fade-right" delay={0.1}>
              <h1>Our <em>advantages</em></h1>
              <p className="service-hero-lede">{(advantages as any).definition?.description}</p>
            </SlideIn>
            <SlideIn direction="fade-up" delay={0.2}>
              <ul className="service-hero-features">
                {(advantages as any).definition?.keyFeatures?.map((f: string, i: number) => (
                  <li key={i} className="hero-feature">
                    <span className="hero-feature-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="cta-row">
                <Link href="/contact" className="btn-primary">
                  {(advantages as any).definition?.primaryButtonText} <span className="arrow">→</span>
                </Link>
                <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  {(advantages as any).definition?.secondaryButtonText}
                </a>
              </div>
              <div className="trust-row">
                <div className="avatars">
                  {trustAvatars.map((src, i) => (
                    <div key={i} className="avatar" style={{ backgroundImage: `url('${src}')` }} />
                  ))}
                </div>
                <span className="trust-text">
                  <strong>50+ years</strong> of combined HR expertise
                </span>
              </div>
            </SlideIn>
          </div>

          <SlideIn direction="fade-left" delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
            <QuickContactForm />
          </SlideIn>
        </div>
      </header>

      <div className="home-content-scale">
        <section className="stats-strip">
          <div className="container stats-strip-inner">
            {(advantages as any).definition?.trustSignals?.stats?.map((s: any, i: number) => (
              <SlideIn key={i} direction="fade-up" delay={0.1 * i} className="stat-item">
                <strong>{s.value}</strong>
                {s.label && <span className="stat-label">{s.label}</span>}
                <span className="stat-desc">{s.description}</span>
              </SlideIn>
            ))}
          </div>
        </section>
      </div>

      {/* Advantages list */}
      <div className="home-content-scale">
        <section className="section container">
          <SlideIn direction="fade-up" className="section-head">
            <h2 className="section-title">{(advantages as any).advantages?.title}</h2>
            <p >{(advantages as any).advantages?.description}</p>
          </SlideIn>
          <div className="adv-grid">
            {(advantages as any).advantages?.items?.map((adv: any, i: number) => (
              <SlideIn key={i} direction="zoom-in-up" delay={0.1 * i} className="adv-card">
                <h3>{adv.title}</h3>
                <ul>
                  {adv.points?.map((p: string) => (
                    <li key={p}>
                      <span className="li-check" aria-hidden="true">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </SlideIn>
            ))}
          </div>
        </section>
      </div>

      {/* Certifications */}
      <div className="home-content-scale">
        <section className="cert-strip">
          <div className="container">
            <SlideIn direction="fade-up" className="section-head">
              <h2 className="section-title">{(advantages as any).certifications?.title}</h2>
            </SlideIn>
            <div className="cert-grid">
              {(advantages as any).certifications?.items?.map((cert: any, i: number) => (
                <div key={cert.title} className="cert-card">
                  <div className="cert-card-header">
                    {cert.icon && (
                      <div className="cert-icon-wrapper">
                        <img src={cert.icon} alt={cert.iconAlt || cert.title} className="cert-icon-img" />
                      </div>
                    )}
                    <h3>{cert.title}</h3>
                  </div>
                  <ul>
                    {cert.points?.map((p: string) => (
                      <li key={p}>
                        <span className="li-check" aria-hidden="true">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="faq-block">
            <SlideIn direction="fade-up" className="faq-head">
              <h2 className="section-title">{(advantages as any).faqs?.title}</h2>
            </SlideIn>
            <div>
              <div className="faq-list">
                {filteredFaqs.map((item: any, i: number) => (
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
                      {openFaq === i && <p className="faq-a">{item.answer}</p>}
                    </button>
                  </SlideIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <CandidateCTA imageSrc="/footerCTAImages/compliance.webp" imageAlt="Ready to work" />
    </>
  )
}
