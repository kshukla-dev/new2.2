'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { SlideIn } from '@/components/animations/SlideIn'
import EORExtendedSectionsTemplate from '@/components/templates/EORExtendedSectionsTemplate'
import eorData from '@/data/eor.json'
import QuickContactForm from '@/components/sections/QuickContactForm'

function ExpandableText({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const needsExpansion = isMobile && text.length > 70;

  if (!needsExpansion) return <>{text}</>;

  return (
    <>
      {isExpanded ? text : `${text.substring(0, 70)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          marginLeft: '4px',
          fontWeight: 600,
          textDecoration: 'none'
        }}
      >
        {isExpanded ? 'See less' : 'See more'}
      </button>
    </>
  );
}

const faqs = [
  {
    question: 'What is an Employer of Record (EOR)?',
    answer: 'An Employer of Record is the legal employer for your workers in a country where you do not have your own entity. We handle contracts, international payroll, taxes and contributions where applicable, and core HR while you manage day-to-day work.'
  },
  {
    question: 'How quickly can we start hiring with EOR?',
    answer: 'Most clients onboard first hires in about 48–72 hours after scope is clear - far faster than incorporating and standing up payroll locally.'
  },
  {
    question: 'Do we need a local entity for Employer of Record?',
    answer: 'No. That is the main point of EOR: hire without entity setup. We employ under our in-country structure so you can enter markets without a subsidiary.'
  },
  {
    question: 'Which countries do you support?',
    answer: 'We deliver Employer of Record and global hiring support in 17+ countries, including major European and APAC hubs. Contact us for your specific locations.'
  },
  {
    question: 'Who manages day-to-day work?',
    answer: 'You do. The EOR handles legal employment, payroll, and employment compliance execution - not how people do their jobs.'
  },
  {
    question: 'What compliance does the EOR cover?',
    answer: 'We apply local labour rules, statutory benefits, social contributions, and filing obligations for employed staff in scope so international payroll and HR stay aligned with each jurisdiction.'
  },
  {
    question: 'Can we switch from another EOR to Jackson & Frank?',
    answer: 'Yes. We plan transfers, contract continuity, and payroll handoffs so there is no gap for employees.'
  },
  {
    question: 'Do you offer immigration support with EOR?',
    answer: 'Yes. We coordinate work permits and visas alongside employment so relocation and global hiring stay in one programme.'
  }
]

const topCountries = [
  { code: 'be', name: 'Belgium' },
  { code: 'cn', name: 'China' },
  { code: 'cz', name: 'Czech Republic' },
  { code: 'fr', name: 'France' },
  { code: 'de', name: 'Germany' },
  { code: 'hk', name: 'Hong Kong' },
  { code: 'in', name: 'India' },
  { code: 'it', name: 'Italy' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'pl', name: 'Poland' },
  { code: 'es', name: 'Spain' },
  { code: 'ae', name: 'United Arab Emirates', href: '/uae' },
  { code: 'gb', name: 'United Kingdom' },
]

export default function EORPage() {
  const [openFaq, setOpenFaq] = useState<number>(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAllCountries, setShowAllCountries] = useState(false)
  const [openProcessStep, setOpenProcessStep] = useState<number | null>(1)

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  return (
    <div className="eor-modern-page">
      {/* Base (Organization + WebSite) + FAQ as one combined JSON-LD block */}
      <JsonLd
        data={buildPageSchemaGraph([
          ...buildFaqSchema({ path: '/employer-of-record', faq: faqs }),
        ])}
      />
      <link rel="preload" href="/services/service-page/eor-hero2.webp" as="image" fetchPriority="high" />
      <style>{`
/* ============================================================
   PREMIUM HERO
   ============================================================ */

   .section-title{
    margin-bottom: 24px;
   }
.eor-premium-hero {
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
  background-image: linear-gradient(90deg, #0E0F3B 0%, #0E0F3B 45%, rgba(14, 15, 59, 0.4) 75%, transparent 100%), url(/services/service-page/eor-hero2.webp);
}

.eor-hero-checklist {
  list-style: none;
  padding: 0;
  margin: 10px 0 8px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.eor-hero-checklist li {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  line-height: 1.5;
  color: #ffffff;
}
.eor-hero-checklist .check-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.eor-premium-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.eor-premium-hero > * {
  position: relative;
  z-index: 1;
}

.eor-premium-hero-inner {
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
  .eor-premium-hero-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
  }
}

.eor-premium-hero .service-hero-copy {
  max-width: 720px;
  /* animation removed in favor of global stagger */
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.eor-premium-hero .tag {
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

.eor-premium-hero h1 {
  padding-top: 8rem;
  color: #ffffff;
}
  .p-tital {
    color: var(--gh-on-surface-variant);
    max-width: 600px;
    margin: 0 auto;
    font-size: 17px;
    line-height: 1.7;
    font-weight: 400;
  }

.eor-premium-hero h1 em {
  font-style: italic;
  color: var(--accent-warm, #F7931E);
}

.eor-premium-hero .service-hero-lede {
  color: rgba(255, 255, 255, 0.85);
  font-size: 19px;
  margin-top: 24px;
  max-width: 520px;
  line-height: 1.6;
}

.eor-premium-hero .cta-row {
  display: flex;
  gap: 16px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.eor-premium-hero .btn-primary {
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

.eor-premium-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}

.eor-premium-hero .btn-secondary {
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

.eor-premium-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 960px) {
  .eor-premium-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(14, 15, 59, 0.8), rgba(14, 15, 59, 0.95)), url(/services/service-page/eor-hero2.webp);
  }
}

@media (max-width: 640px) {

.eor-premium-hero-inner {
margin-top:6rem;
      }
  .eor-premium-hero {
    min-height: auto;
    padding: 260px 20px 64px;
    background-image: none;
    background-color: #0E0F3B;
    margin-top: -20px;
  }
  .eor-premium-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/eor-hero2.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .eor-premium-hero h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .eor-premium-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .eor-premium-hero .btn-primary,
  .eor-premium-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

.eps-bullets li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.eps-check-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 4px;
}

/* ============================================================
   SCENARIO CARDS (AYESHA STYLE / PREMIUM LAYOUT)
   ============================================================ */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 40px;
}

@media (max-width: 1024px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

.benefit-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(20, 51, 105, 0.12);
  border-color: #143369;
}

.benefit-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.benefit-title-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.benefit-icon-wrapper {
  width: 52px;
  height: 52px;
  background-color: #143369;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(20, 51, 105, 0.15);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
}

.benefit-card:hover .benefit-icon-wrapper {
  transform: scale(1.1) rotate(5deg);
  background-color: #0E0F3B;
  box-shadow: 0 6px 14px rgba(20, 51, 105, 0.25);
}

.benefit-icon-wrapper svg {
  color: #ffffff;
  stroke: #ffffff !important;
  width: 26px;
  height: 26px;
  transition: transform 0.3s ease;
}

.benefit-card-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #0E0F3B;
  margin: 0;
  font-family: var(--sans);
}

.benefit-card-cta {
  background-color: #143369;
  color: #ffffff !important;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 20px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s, transform 0.15s;
}

.benefit-card-cta:hover {
  background-color: #0E0F3B;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(20, 51, 105, 0.25);
}

.benefit-card-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
}

.benefit-card-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  border-top: 1px solid #f1f5f9;
  padding-top: 24px;
  margin-top: auto;
}

@media (max-width: 640px) {
  .benefit-card {
    padding: 24px 20px;
  }
  .benefit-card-header {
    align-items: center;
  }
  .benefit-card-cta {
    padding: 0;
    width: 36px;
    height: 36px;
    justify-content: center;
    border-radius: 50%;
  }
  .benefit-card-cta .cta-text {
    display: none;
  }
  .benefit-card-details {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.benefit-details-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.benefit-details-col h4 {
  font-size: 11px;
  font-weight: 700;
  color: #143369;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.benefit-details-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.benefit-details-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13.5px;
  color: #4b5563;
  line-height: 1.4;
  transition: transform 0.3s ease, color 0.3s ease;
}

.benefit-card:hover .benefit-details-list li {
  transform: translateX(3px);
}

.benefit-details-list li:hover {
  color: #143369;
}

.benefit-check-icon {
  margin-top: 1px;
  flex-shrink: 0;
}

.benefit-number-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #143369;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
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

      <header className="service-hero eor-premium-hero">
        <div className="eor-premium-hero-inner">
          <SlideIn direction="up">
            <div className="service-hero-copy">
              <h1>
                Hire <em>employees<br />globally</em><br />without entities
              </h1>
              <p className="service-hero-lede">Quickly expand your global workforce across 17+ countries without establishing a local entity. We become your local HR partner.</p>

              <ul className="eor-hero-checklist">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>
                  Hire in days. No local subsidiary required.
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>
                  International payroll, taxes, and benefits handled for you
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>
                  Employment compliance monitored in each country
                </li>
              </ul>

              <div className="cta-row">
                <Link href="/contact" className="btn-primary">Hire globally without entity setup </Link>
                <Link href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" className="btn-secondary" style={{ background: 'white', color: 'var(--dark)', borderColor: 'white' }}>
                  Talk to an EOR expert
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '6px' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </Link>
              </div>
            </div>
          </SlideIn>

          <SlideIn direction="fade-left" delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
            <QuickContactForm />
          </SlideIn>
        </div>
      </header>

      <div className="home-content-scale">
        <section className="eor-section eor-container">
          <div className="what-is-eor">
            <SlideIn direction="left">
              <div className="what-is-eor-text">
                <h2>What is Employer of Record (EOR)?</h2>
                <p>
                  An employer of record is a third-party provider that is legally responsible for another organization’s employees. It can be located within the same country as the business it employs workers for or in another country with different employment laws.
                  {!isExpanded ? (
                    <>
                      <span>... </span>
                      <button onClick={() => setIsExpanded(true)} className="text-primary font-medium hover:underline" style={{ color: '#143369', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}>Read more</button>
                    </>
                  ) : (
                    <>
                      <br /> <br />
                      The EOR handles employment administration, such as payroll and regulatory compliance, while the client business maintains managerial control of its employees and their work assignments. This arrangement allows employers to expand their operations without being overburdened by the administrative and risk management tasks that may arise when entering a new geographic region.
                      <br />
                      <button onClick={() => setIsExpanded(false)} className="text-primary font-medium hover:underline" style={{ color: '#143369', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', marginTop: '8px' }}>Show less</button>
                    </>
                  )}
                </p>
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={0.2}>
              <div className="what-is-eor-diagram">
                <svg width="100%" viewBox="-20 0 430 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 330 40 Q 200 0 100 40" stroke="#F7931E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M 100 40 L 110 32 M 100 40 L 110 48" stroke="#F7931E" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                  <path d="M 50 120 L 50 80 M 150 120 L 150 60 M 250 120 L 250 60 M 350 120 L 350 80" stroke="#c5c6cf" strokeWidth="2" />
                  <path d="M 50 80 Q 100 120 150 60 Q 200 120 250 60 Q 300 120 350 80" stroke="#c5c6cf" strokeWidth="2" fill="none" />
                  <path d="M 40 120 L 360 120" stroke="#c5c6cf" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 40 124 L 360 124" stroke="#75777f" strokeWidth="1" />

                  <rect x="20" y="80" width="40" height="40" fill="white" stroke="#061639" strokeWidth="2" />
                  <rect x="30" y="70" width="20" height="10" fill="white" stroke="#061639" strokeWidth="2" />
                  <path d="M 28 90 h 4 v 4 h -4 z M 38 90 h 4 v 4 h -4 z M 48 90 h 4 v 4 h -4 z" fill="#061639" />
                  <path d="M 28 100 h 4 v 4 h -4 z M 38 100 h 4 v 4 h -4 z M 48 100 h 4 v 4 h -4 z" fill="#061639" />
                  <rect x="34" y="110" width="12" height="10" fill="none" stroke="#061639" strokeWidth="2" />

                  <circle cx="200" cy="110" r="30" fill="#061639" />
                  <text x="200" y="116" fill="#F7931E" fontFamily="'DM Serif Display', serif" fontSize="20" fontWeight="bold" fontStyle="italic" textAnchor="middle">JF</text>

                  <circle cx="350" cy="100" r="20" fill="white" stroke="#061639" strokeWidth="2" />
                  <path d="M 330 100 A 20 20 0 0 0 370 100 M 350 80 A 10 20 0 0 0 350 120 M 350 80 A 10 20 0 0 1 350 120 M 332 90 L 368 90 M 332 110 L 368 110" stroke="#061639" strokeWidth="1" fill="none" />

                  <text x="40" y="145" fill="#061639" fontFamily="'DM Sans', sans-serif" fontSize="12" fontWeight="600" textAnchor="middle">Your Company</text>
                  <text x="200" y="150" fill="#061639" fontFamily="'DM Sans', sans-serif" fontSize="12" fontWeight="600" textAnchor="middle">Jackson &amp; Frank</text>
                  <text x="200" y="165" fill="#061639" fontFamily="'DM Sans', sans-serif" fontSize="12" fontWeight="600" textAnchor="middle">EOR</text>
                  <text x="350" y="150" fill="#061639" fontFamily="'DM Sans', sans-serif" fontSize="12" fontWeight="600" textAnchor="middle">Global</text>
                  <text x="350" y="165" fill="#061639" fontFamily="'DM Sans', sans-serif" fontSize="12" fontWeight="600" textAnchor="middle">talent pool</text>
                </svg>
              </div>
            </SlideIn>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="eor-section eor-container" id="what-is-eor">
          <div className="eor-process-panel">
            <SlideIn direction="up">
              <div className="eor-process-header">
                <h2>How our Employer of Record works</h2>
                <p className="eor-process-sub">Three focused steps from agreement to payroll: you define the roles, we employ and run international payroll compliantly.</p>
              </div>
            </SlideIn>
            <div className="eor-process-steps">
              <SlideIn direction="up" delay={0.1}>
                <div
                  className={`eor-process-step ${openProcessStep === 1 ? 'is-open' : ''}`}
                  onClick={() => setOpenProcessStep(openProcessStep === 1 ? null : 1)}
                >
                  <div className="eps-mobile-header">
                    <div className="eps-mobile-header-left">
                      <div className="eps-number-mobile">01</div>
                      <h3 className="eps-mobile-title">Agree scope</h3>
                    </div>
                    <button className="eps-toggle-btn" aria-label="Toggle details">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  </div>
                  <div className="eps-body">
                    <div className="eps-desktop-number eps-number">01</div>
                    <h3 className="eps-desktop-title">Agree scope</h3>
                    <p>We align on countries, roles, and commercials so Employer of Record coverage matches your global hiring plan.</p>
                    <ul className="eps-bullets">
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="#F7931E" strokeWidth="2" className="eps-check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Countries and headcount</li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="#F7931E" strokeWidth="2" className="eps-check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Commercials and SLAs</li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="#F7931E" strokeWidth="2" className="eps-check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Compliance touchpoints</li>
                    </ul>
                  </div>
                </div>
              </SlideIn>
              <SlideIn direction="up" delay={0.2}>
                <div
                  className={`eor-process-step ${openProcessStep === 2 ? 'is-open' : ''}`}
                  onClick={() => setOpenProcessStep(openProcessStep === 2 ? null : 2)}
                >
                  <div className="eps-mobile-header">
                    <div className="eps-mobile-header-left">
                      <div className="eps-number-mobile">02</div>
                      <h3 className="eps-mobile-title">Onboard employees</h3>
                    </div>
                    <button className="eps-toggle-btn" aria-label="Toggle details">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  </div>
                  <div className="eps-body">
                    <div className="eps-desktop-number eps-number">02</div>
                    <h3 className="eps-desktop-title">Onboard employees</h3>
                    <p>Local contracts, payroll setup, and registrations ready for day one in each market.</p>
                    <ul className="eps-bullets">
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="#F7931E" strokeWidth="2" className="eps-check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Compliant employment agreements</li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="#F7931E" strokeWidth="2" className="eps-check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Payroll and benefits setup</li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="#F7931E" strokeWidth="2" className="eps-check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Tax and social registrations</li>
                    </ul>
                  </div>
                </div>
              </SlideIn>
              <SlideIn direction="up" delay={0.3}>
                <div
                  className={`eor-process-step ${openProcessStep === 3 ? 'is-open' : ''}`}
                  onClick={() => setOpenProcessStep(openProcessStep === 3 ? null : 3)}
                >
                  <div className="eps-mobile-header">
                    <div className="eps-mobile-header-left">
                      <div className="eps-number-mobile">03</div>
                      <h3 className="eps-mobile-title">Run payroll & HR</h3>
                    </div>
                    <button className="eps-toggle-btn" aria-label="Toggle details">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  </div>
                  <div className="eps-body">
                    <div className="eps-desktop-number eps-number">03</div>
                    <h3 className="eps-desktop-title">Run payroll & HR</h3>
                    <p>Monthly payroll, filings, changes, and HR lifecycle support while you manage performance.</p>
                    <ul className="eps-bullets">
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="#F7931E" strokeWidth="2" className="eps-check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Payroll and contributions</li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="#F7931E" strokeWidth="2" className="eps-check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Ongoing employment compliance</li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="#F7931E" strokeWidth="2" className="eps-check-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Leavers, moves, and adjustments</li>
                    </ul>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="eor-section eor-countries-section">
          <div className="eor-container">
            <SlideIn direction="up">
              <div className="eor-countries-header">
                <h2>Where we employ through Employer of Record</h2>
                <p className="eor-countries-sub">We support Employer of Record and global hiring in 17+ countries. Below are markets where our own entities and specialists are especially active.</p>
              </div>
            </SlideIn>
            <SlideIn direction="up" delay={0.2}>
              <div className={`eor-countries-grid ${showAllCountries ? 'show-all' : ''}`}>
                {topCountries.map((country, idx) => (
                  <Link href={country.href || `/${country.name.toLowerCase().replace(/\s+/g, '-')}`} className={`ecg-item ${idx >= 5 ? 'mobile-hidden' : ''}`} key={country.code}>
                    <div className="ecg-flag-wrapper">
                      <img src={`https://hatscripts.github.io/circle-flags/flags/${country.code}.svg`} alt={country.name} className="ecg-flag" loading="lazy" width={48} height={48} />
                      <div className="ecg-view-btn">View</div>
                    </div>
                    <span>
                      <span className="desktop-text">{country.name}</span>
                      <span className="mobile-text">{country.name}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="eor-countries-cta">
                <button
                  className="mobile-see-all-btn"
                  onClick={() => setShowAllCountries(!showAllCountries)}
                >
                  {showAllCountries ? 'Show less' : 'See all'}
                </button>
                <Link href="/contact" className="gh-btn-gold desktop-explore-btn">Explore all countries</Link>
              </div>
            </SlideIn>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="eor-section eor-container">
          <SlideIn direction="up">
            <div className="how-it-works-title">
              <h2 >What's included in our Employer of Record service</h2>
              <p className='p-tital'>
                Everything below is built so you can scale global hiring without building a legal and payroll stack in every country.
              </p>
            </div>
          </SlideIn>
          <div className="how-steps-grid">
            <SlideIn direction="up" delay={0.1}>
              <div className="how-step">
                <div className="how-icon-row">
                  <div className="how-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon-navy">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <path d="M9 15L11 17L15 13"></path>
                    </svg>
                  </div>

                </div>
                <h3>Locally compliant contracts</h3>
                <p><ExpandableText text="Employment terms that match local law and your policy so new hires start on solid ground without legal guesswork." /></p>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.2}>
              <div className="how-step">
                <div className="how-icon-row">
                  <div className="how-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon-navy">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>

                </div>
                <h3>Global payroll and tax filing</h3>
                <p><ExpandableText text="Accurate pay runs, withholding, and statutory submissions where we operate fewer payroll surprises across borders." /></p>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.3}>
              <div className="how-step">
                <div className="how-icon-row">
                  <div className="how-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon-navy">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="M9 12l2 2 4-4"></path>
                    </svg>
                  </div>

                </div>
                <h3>Compliance monitoring</h3>
                <p><ExpandableText text="We track regulatory and process changes that affect your people, so employment compliance does not depend on ad-hoc updates." /></p>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.4}>
              <div className="how-step">
                <div className="how-icon-row">
                  <div className="how-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon-navy">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <circle cx="18" cy="11" r="2"></circle>
                      <path d="M18 7v2 M18 13v2 M15 10h2 M21 10h2"></path>
                    </svg>
                  </div>

                </div>
                <h3>HR lifecycle management</h3>
                <p><ExpandableText text="Onboarding, changes, time off, and exits handled with consistent process your managers stay focused on the work." /></p>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.5}>
              <div className="how-step">
                <div className="how-icon-row">
                  <div className="how-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon-navy">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>

                </div>
                <h3>Reporting you can use</h3>
                <p><ExpandableText text="Headcount, cost, and payroll visibility in one place better forecasts and fewer spreadsheet versions." /></p>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.6}>
              <div className="how-step">
                <div className="how-icon-row">
                  <div className="how-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon-navy">
                      <polyline points="16 3 21 3 21 8"></polyline>
                      <line x1="4" y1="20" x2="21" y2="3"></line>
                      <polyline points="8 21 3 21 3 16"></polyline>
                      <line x1="20" y1="4" x2="3" y2="21"></line>
                    </svg>
                  </div>
                </div>
                <h3>Contractor to employee moves</h3>
                <p><ExpandableText text="When roles should be employment instead of contractor engagements, we help you convert cleanly and reduce misclassification risk." /></p>
              </div>
            </SlideIn>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="eor-section eor-section-gray2">
          <div className="eor-container">
            <SlideIn direction="up">
              <div className="eor-audience-header">
                <h2>Employer of Record vs PEO, and Payroll Outsourcing</h2>
                <p className="eor-audience-sub">Same talent goal, different legal setups. Use this to see when Employer of Record fits global hiring without a local company.</p>
              </div>
              <div className="eor-audience-grid">

                <div className="eor-audience-card" style={{ border: '2px solid #143369', position: 'relative', paddingTop: '40px' }}>
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#143369', color: 'white', padding: '4px 16px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }}>Recommended</div>
                  <div className="eac-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <path d="M14 2v6h6"></path>
                      <rect x="8" y="12" width="8" height="6"></rect>
                    </svg>
                  </div>
                  <h3>Employer of Record (EOR)</h3>
                  <p>We are the legal employer. Built for hire without entity and full employment compliance.</p>
                  <ul className="eac-list">
                    <li>Legal employer on record</li>
                    <li>No local entity required</li>
                    <li>International payroll and HR</li>
                    <li>Employment compliance in scope</li>
                    <li>You direct day-to-day work</li>
                  </ul>
                  <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gh-tertiary-accent)', fontWeight: 'bold', marginBottom: '8px' }}>BEST FOR</p>
                    <p style={{ fontSize: '14px', margin: 0 }}>Global hiring, new markets, remote teams</p>
                  </div>
                </div>

                <div className="eor-audience-card">
                  <div className="eac-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3>PEO</h3>
                  <p>Co-employment when you already have an entity in-country.</p>
                  <ul className="eac-list">
                    <li>Requires your local entity</li>
                    <li>Shared employer responsibilities</li>
                    <li>You remain in the chain of employment</li>
                    <li>Strong fit for established subsidiaries</li>
                    <li>Less suited if you have no entity</li>
                  </ul>
                  <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gh-tertiary-accent)', fontWeight: 'bold', marginBottom: '8px' }}>BEST FOR</p>
                    <p style={{ fontSize: '14px', margin: 0 }}>Companies with an existing local legal entity</p>
                  </div>
                </div>

                <div className="eor-audience-card">
                  <div className="eac-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <h3>Payroll outsourcing</h3>
                  <p>Run payroll only you stay the legal employer.</p>
                  <ul className="eac-list">
                    <li>You are still the employer</li>
                    <li>Entity typically required</li>
                    <li>No full employment shield</li>
                    <li>You own compliance decisions</li>
                    <li>Ideal with strong in-house HR/legal</li>
                  </ul>
                  <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gh-tertiary-accent)', fontWeight: 'bold', marginBottom: '8px' }}>BEST FOR</p>
                    <p style={{ fontSize: '14px', margin: 0 }}>Teams that only need calculation and pay services</p>
                  </div>
                </div>

              </div>
            </SlideIn>
          </div>
        </section>
      </div>
      <div className="home-content-scale">
        <EORExtendedSectionsTemplate
          variant="whoNeeds"
          title={eorData.whoNeeds.title}
          description={eorData.whoNeeds.description}
          audiences={eorData.whoNeeds.audiences}
        />
      </div>


      <div className="home-content-scale">
        <EORExtendedSectionsTemplate
          variant="complianceTrust"
          title={eorData.complianceTrust.title}
          subtitle={eorData.complianceTrust.subtitle}
          intro={eorData.complianceTrust.intro}
          bullets={eorData.complianceTrust.bullets}
        />
      </div>

      <div className="home-content-scale">
        <section className="eor-section eor-section-gray">
          <div className="eor-container">
            <SlideIn direction="up">
              <div className="benefits-wrapper">
                <h2 className="benefits-title" style={{ textAlign: 'center', marginBottom: '24px' }}>Perfect for every scenario</h2>
                <p style={{ textAlign: 'center', fontSize: '17px', color: 'var(--gh-on-surface-variant)', marginBottom: '24px', lineHeight: '1.7', marginInline: 'auto', maxWidth: '600px' }}>Whether you&apos;re testing new markets or scaling globally, our Employer of Record (EOR) services adapt to your needs with a practical approach to global hiring and international payroll.</p>
                <div className="benefits-grid">
                  <SlideIn direction="up">
                    <div className="benefit-card">
                      <div className="benefit-card-header">
                        <div className="benefit-title-group">
                          <div className="benefit-icon-wrapper">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <circle cx="12" cy="12" r="6"></circle>
                              <circle cx="12" cy="12" r="2"></circle>
                            </svg>
                          </div>
                          <h3>Market testing</h3>
                        </div>
                        <Link
                          href="/contact"
                          className="benefit-card-cta"
                          onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new CustomEvent('jf:open-contact-modal'));
                          }}
                        >
                          <span className="cta-text">Learn more </span>&rarr;
                        </Link>
                      </div>
                      <p className="benefit-card-desc">Test new markets without committing to a local entity. Ideal for startups and enterprises exploring international opportunities with full employment compliance.</p>

                      <div className="benefit-card-details">
                        <div className="benefit-details-col">
                          <h4>Key Benefits</h4>
                          <ul className="benefit-details-list">
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>No legal entity required</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Fast market entry (48–72 hours)</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Full compliance coverage</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Clear exit path when you pivot</span>
                            </li>
                          </ul>
                        </div>
                        <div className="benefit-details-col">
                          <h4>How It Works</h4>
                          <ul className="benefit-details-list">
                            <li>
                              <span className="benefit-number-badge">1</span>
                              <span>Define the target market</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">2</span>
                              <span>Align on hiring requirements</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">3</span>
                              <span>We handle legal employer setup</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">4</span>
                              <span>You start hiring immediately</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SlideIn>
                  <SlideIn direction="down">
                    <div className="benefit-card">
                      <div className="benefit-card-header">
                        <div className="benefit-title-group">
                          <div className="benefit-icon-wrapper">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="9" cy="7" r="4"></circle>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                          </div>
                          <h3>Remote teams</h3>
                        </div>
                        <Link
                          href="/contact"
                          className="benefit-card-cta"
                          onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new CustomEvent('jf:open-contact-modal'));
                          }}
                        >
                          <span className="cta-text">Learn more </span>&rarr;
                        </Link>
                      </div>
                      <p className="benefit-card-desc">Hire strong talent globally and run distributed teams under proper employment contracts not guesswork on local rules.</p>

                      <div className="benefit-card-details">
                        <div className="benefit-details-col">
                          <h4>Key Benefits</h4>
                          <ul className="benefit-details-list">
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Access to a global talent pool</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Local employment compliance</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Consistent people operations</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Support for distributed onboarding</span>
                            </li>
                          </ul>
                        </div>
                        <div className="benefit-details-col">
                          <h4>How It Works</h4>
                          <ul className="benefit-details-list">
                            <li>
                              <span className="benefit-number-badge">1</span>
                              <span>Define roles and locations</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">2</span>
                              <span>Source and select candidates</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">3</span>
                              <span>We employ under local law</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">4</span>
                              <span>You manage day-to-day work</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SlideIn>
                  <SlideIn direction="up">
                    <div className="benefit-card">
                      <div className="benefit-card-header">
                        <div className="benefit-title-group">
                          <div className="benefit-icon-wrapper">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                              <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                          </div>
                          <h3>Quick expansion</h3>
                        </div>
                        <Link
                          href="/contact"
                          className="benefit-card-cta"
                          onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new CustomEvent('jf:open-contact-modal'));
                          }}
                        >
                          <span className="cta-text">Learn more </span>&rarr;
                        </Link>
                      </div>
                      <p className="benefit-card-desc">Enter new territories without waiting on entity incorporation. Speed up revenue and hiring with Employer of Record where it fits.</p>

                      <div className="benefit-card-details">
                        <div className="benefit-details-col">
                          <h4>Key Benefits</h4>
                          <ul className="benefit-details-list">
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Faster time to first hire</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Scalable multi-country support</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>International payroll in scope</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Growth focused setup</span>
                            </li>
                          </ul>
                        </div>
                        <div className="benefit-details-col">
                          <h4>How It Works</h4>
                          <ul className="benefit-details-list">
                            <li>
                              <span className="benefit-number-badge">1</span>
                              <span>Prioritise expansion markets</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">2</span>
                              <span>Stand up EOR coverage</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">3</span>
                              <span>Launch hiring in parallel</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">4</span>
                              <span>Scale headcount as you win</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SlideIn>
                  <SlideIn direction='down'>
                    <div className="benefit-card">
                      <div className="benefit-card-header">
                        <div className="benefit-title-group">
                          <div className="benefit-icon-wrapper">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                              <line x1="12" y1="18" x2="12" y2="22"></line>
                              <path d="M9 22h6"></path>
                              <line x1="9" y1="6" x2="9" y2="6"></line>
                              <line x1="15" y1="6" x2="15" y2="6"></line>
                              <line x1="9" y1="10" x2="9" y2="10"></line>
                              <line x1="15" y1="10" x2="15" y2="10"></line>
                              <line x1="9" y1="14" x2="9" y2="14"></line>
                              <line x1="15" y1="14" x2="15" y2="14"></line>
                            </svg>
                          </div>
                          <h3>Acquisition support</h3>
                        </div>
                        <Link
                          href="/contact"
                          className="benefit-card-cta"
                          onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new CustomEvent('jf:open-contact-modal'));
                          }}
                        >
                          <span className="cta-text">Learn more </span>&rarr;
                        </Link>
                      </div>
                      <p className="benefit-card-desc">Integrate acquired teams with continuity on contracts, payroll, and compliance during M&A transitions.</p>

                      <div className="benefit-card-details">
                        <div className="benefit-details-col">
                          <h4>Key Benefits</h4>
                          <ul className="benefit-details-list">
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Structured integration planning</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Employee experience in focus</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Compliance continuity</span>
                            </li>
                            <li>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="benefit-check-icon">
                                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none"></circle>
                                <polyline points="8 12 11 15 16 9"></polyline>
                              </svg>
                              <span>Reduced transition risk</span>
                            </li>
                          </ul>
                        </div>
                        <div className="benefit-details-col">
                          <h4>How It Works</h4>
                          <ul className="benefit-details-list">
                            <li>
                              <span className="benefit-number-badge">1</span>
                              <span>Assess the acquired workforce</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">2</span>
                              <span>Plan employment transfer steps</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">3</span>
                              <span>Migrate contracts and payroll</span>
                            </li>
                            <li>
                              <span className="benefit-number-badge">4</span>
                              <span>Stabilise ongoing operations</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SlideIn>
                </div>
              </div>
            </SlideIn>
          </div>
        </section>
      </div>

      {/* <div className="home-content-scale">
        <section className="eor-section eor-container">
          <SlideIn direction="up">
            <div className="eor-compare-header">
              <h2>EOR vs. Setting Up a Local Entity</h2>
              <p className="eor-compare-sub">Establishing your own entity takes months and hundreds of thousands in setup costs. EOR gets you there in days.</p>
            </div>
            <div className="eor-compare-table-wrapper">
              <div className="eor-compare-table">
                <div className="ect-header">
                  <div className="ect-label"></div>
                  <div className="ect-col eor-col">Jackson &amp; Frank EOR</div>
                  <div className="ect-col entity-col">Local Entity Setup</div>
                </div>
                <div className="ect-row">
                  <div className="ect-label">Time to hire</div>
                  <div className="ect-col eor-col"><span className="ect-good">✓ 48–72 hours</span></div>
                  <div className="ect-col entity-col"><span className="ect-bad">✗ 3–6 months</span></div>
                </div>
                <div className="ect-row">
                  <div className="ect-label">Upfront cost</div>
                  <div className="ect-col eor-col"><span className="ect-good">✓ No setup fees</span></div>
                  <div className="ect-col entity-col"><span className="ect-bad">✗ €20,000–€50,000+</span></div>
                </div>
                <div className="ect-row">
                  <div className="ect-label">Local entity required</div>
                  <div className="ect-col eor-col"><span className="ect-good">✓ Not needed</span></div>
                  <div className="ect-col entity-col"><span className="ect-bad">✗ Mandatory</span></div>
                </div>
                <div className="ect-row">
                  <div className="ect-label">Compliance risk</div>
                  <div className="ect-col eor-col"><span className="ect-good">✓ Fully managed by JF</span></div>
                  <div className="ect-col entity-col"><span className="ect-bad">✗ Company bears all risk</span></div>
                </div>
                <div className="ect-row">
                  <div className="ect-label">Scalability</div>
                  <div className="ect-col eor-col"><span className="ect-good">✓ Scale instantly</span></div>
                  <div className="ect-col entity-col"><span className="ect-bad">✗ Slow &amp; complex</span></div>
                </div>
                <div className="ect-row">
                  <div className="ect-label">Exit flexibility</div>
                  <div className="ect-col eor-col"><span className="ect-good">✓ Flexible offboarding</span></div>
                  <div className="ect-col entity-col"><span className="ect-bad">✗ Complex wind-down</span></div>
                </div>
              </div>
            </div>
          </SlideIn>
        </section>
      </div> */}



      <div className="home-content-scale">
        <section className="section eor-container">
          <SlideIn direction="up">
            <div className="faq-block">
              <div className="faq-head">
                <h2 className="section-title">Frequently asked questions</h2>
              </div>
              <div className="faq-list">
                {faqs.map((faq, i) => (
                  <button
                    key={i}
                    className={`faq-item ${openFaq === i ? 'open' : ''}`}
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="faq-q">{faq.question}</span>
                    <span className="faq-toggle-circle" aria-hidden="true" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                    <p style={{ display: openFaq === i ? 'block' : 'none' }} className="faq-a">{faq.answer}</p>
                  </button>
                ))}
              </div>
            </div>
          </SlideIn>
        </section>
      </div>

      <CandidateCTA imageSrc="/footerCTAImages/EOR_Page.png" imageAlt="Employer of Record Solutions" />

    </div>
  )
}
