'use client'
import CampaignCTA from '@/components/campaign/CampaignCTA'
import { fireContactConversion } from '@/utils/conversion'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Script from 'next/script'
import {
  Building2,
  Clock,
  Headphones,
  Scale,
  Zap,
  ShieldCheck,
  ChevronDown,
  User
} from 'lucide-react'
import Image from 'next/image'
import CampaignHeader from '@/components/layout/CampaignHeader'
import CampaignFooter from '@/components/layout/CampaignFooter'
import CampaignTestimonials from '@/components/campaign/CampaignTestimonials'
import CampaignFAQ from '@/components/campaign/CampaignFAQ'
import CampaignComparisonTable from '@/components/campaign/CampaignComparisonTable'
import './germanyintent-typography.css'

/**
 * FEATURE FLAG / LEGAL VERIFICATION REQUIRED:
 * 
 * Before setting IS_PERMANENT_CONTRACT_VERIFIED to true (publishing Section 7), 
 * the following claims must be legally verified and substantiated by the J&F legal/business team:
 * 1. Jackson & Frank is actually AÜG-licensed.
 * 2. Jackson & Frank employs German staff directly through its own German GmbH.
 * 3. Jackson & Frank offers permanent employment contracts for the relevant EOR arrangement.
 * 4. The arrangement described is legally distinct from fixed-term employee leasing under the AÜG 18-month limitation.
 * 
 * If these claims cannot be substantiated, do NOT change this flag to true.
 */
const IS_PERMANENT_CONTRACT_VERIFIED = true

interface ClientProps {
  initialIntent: string
}

interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  title?: string
  logo?: string
  website?: string
  image?: string
}

// Global data for Testimonials and FAQs
const verifiedTestimonials: Testimonial[] = [
  {
    name: 'Robin Zijsling',
    image: '/testimonials/robin-zijsling.webp',
    role: 'Founder',
    company: 'LM5 Capital',
    logo: '/logos/lm5-capital.jpg',
    website: 'https://lm5capital.com/',
    title: 'A trusted partner for international hiring',
    quote: 'We really value our relationship with the team at Jackson & Frank. They’re a great group of professionals to work with, knowledgeable, pragmatic, and always clear in how they approach complex cross border matters. What we appreciate most is how practical they are. Their expertise in legal and workforce structuring, combined with a strong international perspective, makes them a trusted partner when navigating different jurisdictions. It was great to spend some time together recently in Shanghai and continue building on a partnership we genuinely enjoy. Thanks again to the Jackson & Frank team. Looking forward to many more conversations ahead.'
  },
  {
    name: 'Xin Shi LLM',
    image: '/testimonials/xin.webp',
    role: 'Head of China Desk',
    company: 'Amice Advocaten',
    logo: '/logos/amice-advocaten.webp',
    title: 'Efficient and workable HR solutions',
    quote: 'During my co-operation with Jackson and Frank B.V. , I have noticed that the management does not only do their HR jobs wonderfully, but has had a larger view of the global need of movement of talent and knowledges migrants. This mission ensures the excellence of their daily work and performance , but in addition, substantially providing our clients the efficient and workable HR solutions. Their compliance also has given our clients great confidence to work with them.'
  },
  {
    name: 'Paul Halprin',
    image: '/testimonials/paul-halprin.webp',
    role: 'Founder',
    company: 'Halprin Law',
    logo: '/logos/halprin-law.svg',
    title: 'Practical, client-driven approach',
    quote: 'Jackson & Frank combines a strong focus on quality with a practical, client-driven approach, helping businesses navigate the complexities of international business.'
  }
]

const faqData = {
  gettingStarted: [
    {
      q: 'Do you operate through your own German entity?',
      a: 'Yes. We employ your staff through Jackson & Frank\'s registered GmbH in Germany - not through a partner network or aggregated platform. You deal with one employer of record, and they are us.'
    },
    {
      q: 'What is the AÜG and does it limit how long I can use an EOR in Germany?',
      a: 'TThe Arbeitnehmerüberlassungsgesetz (AÜG) is Germany\'s employee-leasing law. Some EOR providers operate under this framework, which caps leased employment at 18 consecutive months. Jackson & Frank employs your staff under permanent employment contracts directly through our German entity, so this cap does not apply to your hires.'
    },
    {
      q: 'How does dismissal work for employees I hire through Jackson & Frank?',
      a: 'Germany\'s dismissal protection law (Kündigungsschutzgesetz) applies once an employee has 6 months of service and the company has more than 10 employees. Dismissal must be justified by a business, personal, or conduct-related reason. We advise on valid grounds and manage the statutory notice periods, which range from 4 weeks to 7 months depending on tenure.'
    },
    {
      q: 'What about works councils (Betriebsrat)?',
      a: 'If a German employer has 5 or more permanent employees who choose to form one, they can establish a works council. Works councils have consultation rights before decisions affecting employees — including terminations, restructuring, and certain HR policy changes. We advise you through any works council process so you remain compliant.'
    },
    {
      q: 'How quickly can you onboard a German employee?',
      a: 'Contract, social insurance registration, and payroll setup typically complete in 2–3 business days for a standard hire. This compares with 3–6 months to establish a GmbH and set up a compliant payroll function from scratch. For complex cases — senior leadership, specialist visa requirements, or sector-specific collective agreements — we flag the timeline upfront.'
    }
  ],
}



export default function GermanyLandingPageClient({ initialIntent }: ClientProps) {
  const searchParams = useSearchParams()
  const [intent, setIntent] = useState(initialIntent)
  const formRef = useRef<HTMLDivElement>(null)

  // UTM parameters state
  const [utmData, setUtmData] = useState({
    source: '',
    medium: '',
    campaign: '',
    content: '',
    term: '',
    gclid: ''
  })

  useEffect(() => {
    setUtmData({
      source: searchParams.get('utm_source') || '',
      medium: searchParams.get('utm_medium') || '',
      campaign: searchParams.get('utm_campaign') || '',
      content: searchParams.get('utm_content') || '',
      term: searchParams.get('utm_term') || '',
      gclid: searchParams.get('gclid') || ''
    })
  }, [searchParams])

  // HubSpot form loading state & conversion listener
  const [isFormLoaded, setIsFormLoaded] = useState(false)
  const formFrameRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = formFrameRef.current
    let observer: MutationObserver | null = null

    const handleIframeLoaded = () => {
      // Small buffer to ensure styling within iframe is fully rendered
      setTimeout(() => setIsFormLoaded(true), 250)
    }

    const checkAndAttach = () => {
      const iframe = container?.querySelector('iframe')
      if (iframe) {
        if (iframe.contentDocument?.readyState === 'complete') {
          handleIframeLoaded()
        } else {
          iframe.addEventListener('load', handleIframeLoaded)
        }
        return true
      }
      return false
    }

    // Schedule check after initial hydration pass completes
    const frameId = requestAnimationFrame(() => {
      if (checkAndAttach()) return

      if (container) {
        observer = new MutationObserver(() => {
          if (checkAndAttach()) {
            observer?.disconnect()
          }
        })
        observer.observe(container, { childList: true, subtree: true })
      }
    })

    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; eventName?: string } | undefined
      if (data?.type === 'hsFormCallback') {
        if (data.eventName === 'onFormReady') {
          handleIframeLoaded()
        }
        if (data.eventName === 'onFormSubmitted') {
          fireContactConversion()
          // Fire GA4 conversion event
          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('config', 'G-448242962')
            window.gtag('config', '448242962')
            window.gtag('event', 'contact_form_de_v1', {
              send_to: ['G-448242962', '448242962'],
              campaign_country: 'germany',
              intent_tier: intent,
              lead_headcount: 'Hubspot Form Submission',
              lead_timeline: 'Hubspot Form Submission',
              utm_source: utmData.source || '',
              utm_medium: utmData.medium || '',
              utm_campaign: utmData.campaign || '',
              utm_content: utmData.content || '',
              utm_term: utmData.term || '',
            })
          }
        }
      }
    }
    window.addEventListener('message', onMessage)

    // Safety fallback timer (in case of network delay or adblockers)
    const timer = setTimeout(() => {
      setIsFormLoaded(true)
    }, 4500)

    return () => {
      cancelAnimationFrame(frameId)
      observer?.disconnect()
      window.removeEventListener('message', onMessage)
      clearTimeout(timer)
    }
  }, [])




  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
    // Focus the first input field
    const input = document.getElementById('firstName')
    if (input) input.focus()
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const comparisonRows = [
    {
      feature: 'Time to first hire',
      jf: <span className="font-bold text-[#0f1f3d]">2–3 business days</span>,
      competitor: <span className="text-slate-500">1–2 weeks</span>,
      gmbh: <span className="text-slate-500">3–6 months</span>
    },
    {
      feature: 'Setup cost',
      jf: <span className="font-bold text-[#0f1f3d]">Flat monthly fee</span>,
      competitor: <span className="text-slate-500">Monthly fee per employee + hidden costs</span>,
      gmbh: <span className="text-slate-500">€25,000 share capital + legal fees</span>
    },
    {
      feature: 'German entity owned',
      jf: <span className="font-bold text-[#0f1f3d]"><span className="text-emerald-600 font-bold mr-1">✓</span> Own GmbH</span>,
      competitor: <span className="text-[#2e7d32]"><span className="text-[#2e7d32] font-bold mr-1">✓</span>Varies by provider. Often outsourced to 3rd parties</span>,
      gmbh: <span className="text-slate-500">Your entity</span>
    },
    {
      feature: 'AÜG-licensed',
      jf: <span className="font-bold text-[#0f1f3d]"><span className="text-emerald-600 font-bold mr-1">✓</span> Yes</span>,
      competitor: <span className="text-[#2e7d32]"><span className="text-[#2e7d32] font-bold mr-1">✓</span> Varies by provider.</span>,
      gmbh: <span className="text-slate-500">N/A</span>
    },
    {
      feature: 'Permanent employment contracts',
      jf: <span className="font-bold text-[#0f1f3d]"><span className="text-emerald-600 font-bold mr-1">✓</span> Yes</span>,
      competitor: <span className="text-slate-500">Varies by provider</span>,
      gmbh: <span className="text-slate-500">Yes — you manage</span>
    },
    {
      feature: 'Account manager',
      jf: <span className="font-bold text-[#0f1f3d]"><span className="text-emerald-600 font-bold mr-1">✓</span> Named, dedicated</span>,
      competitor: <span className="text-slate-500">Platform support / ticket queue</span>,
      gmbh: <span className="text-slate-500">You hire your own HR</span>
    },
    {
      feature: 'Pricing model',
      jf: <span className="font-bold text-[#0f1f3d]">Transparent, flat rate</span>,
      competitor: <span className="text-slate-500">€599 - 799/mo per employee + platform fee + hidden costs (3rd party fees, onboarding, offboarding, etc.)</span>,
      gmbh: <span className="text-slate-500">Variable: payroll + legal + HR</span>
    },
    {
      feature: 'Dismissal protection handled',
      jf: <span className="font-bold text-[#0f1f3d]"><span className="text-emerald-600 font-bold mr-1">✓</span> We advise and manage</span>,
      competitor: <span className="text-[#2e7d32]"><span className="text-[#2e7d32] font-bold mr-1">✓</span> Varies by provider. Often outsourced to 3rd parties</span>,
      gmbh: <span className="text-slate-500">You manage — risk is yours</span>
    },
    {
      feature: 'Works council obligations',
      jf: <span className="font-bold text-[#0f1f3d]"><span className="text-emerald-600 font-bold mr-1">✓</span> We advise</span>,
      competitor: <span className="text-slate-500">Varies</span>,
      gmbh: <span className="text-slate-500">You manage</span>
    },
    {
      feature: 'Path to own entity later',
      jf: <span className="font-bold text-[#0f1f3d]"><span className="text-emerald-600 font-bold mr-1">✓</span> Entity setup support</span>,
      competitor: <span className="text-slate-500">Varies by provider. Often outsourced to 3rd parties</span>,
      gmbh: <span className="text-slate-500">N/A</span>
    }
  ]

  // Hero Copy Definition
  const getHeroContent = () => {
    switch (intent) {
      case 'problem':
        return {
          eyebrow: 'EMPLOYER OF RECORD · GERMANY',
          h1: 'Hiring your first employee in Germany?\nYou don\'t need to set up a GmbH.',
          subhead: 'An Employer of Record handles payroll, tax, and compliance — so you can hire legally in Germany in days, not months.',
          primaryCTA: 'Talk to a Germany expert →',
          secondaryCTA: 'How EOR works ↓',
          primaryAction: scrollToForm,
          secondaryAction: () => scrollToSection('how-it-works')
        }
      case 'comparison':
        return {
          eyebrow: 'PROVIDER COMPARISON · GERMANY',
          h1: 'The best EOR for Germany - compare Jackson & Frank vs Deel, Remote, and the rest.',
          subhead: 'Dedicated account manager (not a ticket queue). Own German entity. Onboard in 2–3 days. See why 700+ companies chose us over the platforms.',
          primaryCTA: 'Compare providers →',
          secondaryCTA: 'Get a quote →',
          primaryAction: () => scrollToSection('comparison'),
          secondaryAction: scrollToForm
        }
      case 'solution':
      default:
        return {
          eyebrow: 'EMPLOYER OF RECORD · GERMANY',
          h1: 'Employer of Record in Germany.\nHire without opening a GmbH.',
          subhead: 'Own German entity. AÜG-licensed. Onboard in 2–3 days. Dedicated account manager from day one.',
          primaryCTA: 'Get a quote →',
          secondaryCTA: 'See how it works ↓',
          primaryAction: scrollToForm,
          secondaryAction: () => scrollToSection('how-it-works')
        }
    }
  }

  const heroContent = getHeroContent()

  // FAQs Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="multiplier-theme bg-white text-slate-900 font-sans selection:bg-orange-500/10 selection:text-[#0f1f3d]">
      <CampaignHeader
        isGermany={true}
        onBookCall={scrollToForm}
        onHowItWorks={() => scrollToSection('how-it-works')}
        onCompare={() => scrollToSection('comparison')}
      />
      {/* HubSpot tracking code */}
      <Script
        id="hs-script-loader"
        src="https://js-eu1.hs-scripts.com/145156571.js"
        strategy="lazyOnload"
      />
      {/* HubSpot form embed */}
      <Script
        id="hs-forms-embed-145156571"
        src="https://js-eu1.hsforms.net/forms/embed/145156571.js"
        strategy="afterInteractive"
      />

      {/* 1. HERO SECTION */}
      <section id="hero" className="jaf-hero-section relative bg-[#f8fafc] text-[#0f1f3d] py-20 lg:py-32 overflow-hidden border-b border-slate-100">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0f1f3d_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="jaf-container relative z-10">
          <div className="jaf-grid-hero grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="jaf-hero-content flex flex-col items-start text-left gap-6">
              <span className="jaf-hero-eyebrow text-[#F7931E] font-bold text-xs uppercase tracking-wider">
                {heroContent.eyebrow}
              </span>
              <h1 className="jaf-hero-title text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#0f1f3d] leading-tight whitespace-pre-line">
                {heroContent.h1}
              </h1>
              <p className="jaf-hero-subtitle text-slate-600 text-lg leading-relaxed max-w-xl">
                {heroContent.subhead}
              </p>

              <div className="jaf-divider-light border-t border-slate-200/80 w-full" />

              {/* Compliance badges */}
              <div className="jaf-certificates-list flex flex-col gap-4 text-left">
                <div className="jaf-certificate-item flex items-center gap-4">
                  <div className="jaf-certificate-logo-circle w-10 h-10 rounded-full bg-blue-50/70 border border-blue-100 flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="jaf-certificate-title font-bold text-sm text-[#0f1f3d]">100% German Law Compliant</p>
                    <p className="jaf-certificate-desc text-slate-500 text-xs">Fully adhering to Kündigungsschutzgesetz & social standards</p>
                  </div>
                </div>

                <div className="jaf-certificate-item flex items-center gap-4">
                  <div className="jaf-certificate-logo-circle w-10 h-10 rounded-full bg-orange-50/70 border border-orange-100 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="jaf-certificate-title font-bold text-sm text-[#0f1f3d]">AÜG-Licensed Operations</p>
                    <p className="jaf-certificate-desc text-slate-500 text-xs">Safe employee leasing with legal compliance</p>
                  </div>
                </div>
                <div className="jaf-certificate-item flex items-center gap-4">
                  <div className="jaf-certificate-logo">
                    <Image
                      src="/license/Rewards-3.webp"
                      alt="GDPR Logo"
                      width={38}
                      height={38}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="jaf-certificate-title font-bold text-sm text-[#0f1f3d]">GDPR Compliant</p>
                    <p className="jaf-certificate-desc text-slate-500 text-xs">Your data is protected under EU law.</p>
                  </div>
                </div>
              </div>

              <div className="jaf-divider-light border-t border-slate-200/80 w-full" />

              {/* Action buttons */}
              <div className="flex justify-center lg:justify-start w-full">
                <button
                  onClick={heroContent.secondaryAction}
                  className="bg-transparent text-white/85 hover:text-white font-bold py-3.5 px-8 rounded-full border border-white/20 hover:bg-white/10 transition text-center min-h-[44px] cursor-pointer"
                >
                  {heroContent.secondaryCTA}
                </button>
              </div>
            </div>

            {/* Right Column - HubSpot Form */}
            <div ref={formRef} className="jaf-form-wrapper w-full">
              <div className="relative min-h-[520px]">
                {/* Actual HubSpot Form Container (loaded behind the skeleton) */}
                <div
                  ref={formFrameRef}
                  className="hs-form-frame w-full relative z-10"
                  data-region="eu1"
                  data-form-id="ae5f8766-1a3f-4da7-8886-6ab2b92c3780"
                  data-portal-id="145156571"
                />

                {/* Form Skeleton positioned absolutely on top of the form frame during load */}
                <div
                  className={`absolute inset-0 w-full h-full jaf-form-card transition-opacity duration-500 ease-in-out z-20 ${isFormLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                >
                  {/* Static Header */}
                  <div className="mb-6">
                    <h2 className="jaf-form-title">Get started</h2>
                    <p className="jaf-form-subtitle">
                      Please share your current situation, and we will respond within 24 hours to schedule a call.
                    </p>
                  </div>

                  {/* Input Skeletons */}
                  <div className="jaf-form-fields-grid">
                    {/* Row 1: Full name + Company email */}
                    <div className="jaf-form-field-double">
                      <div>
                        <input
                          type="text"
                          placeholder="Full name*"
                          disabled
                          className="jaf-input-field cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Company email*"
                          disabled
                          className="jaf-input-field cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Row 2: In which country are you located? */}
                    <div className="jaf-select-wrapper">
                      <select disabled className="jaf-select-field cursor-not-allowed">
                        <option>In which country are you located?*</option>
                      </select>
                      <div className="jaf-select-icon">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Row 3: What's your situation? + Planned new hires */}
                    <div className="jaf-form-field-double">
                      <div className="jaf-select-wrapper">
                        <select disabled className="jaf-select-field cursor-not-allowed">
                          <option>What&apos;s your situation?*</option>
                        </select>
                        <div className="jaf-select-icon">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="jaf-select-wrapper">
                        <select disabled className="jaf-select-field cursor-not-allowed">
                          <option>Planned new hires*</option>
                        </select>
                        <div className="jaf-select-icon">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Privacy & ReCAPTCHA Row */}
                    <div className="jaf-form-footer-row">
                      <p className="jaf-form-privacy">
                        We&apos;ll store and process this information to provide you with our products and services. You may opt out of this at any time.
                      </p>

                      {/* ReCAPTCHA mock */}
                      <div className="jaf-form-recaptcha">
                        <div className="jaf-recaptcha-text flex flex-col text-[8px] text-slate-500 font-semibold leading-none">
                          <span>protected by</span>
                          <span className="text-slate-600 font-bold mt-0.5">reCAPTCHA</span>
                        </div>
                        <div className="jaf-recaptcha-logo w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-500 font-bold">
                          <span className="text-[9px]">↻</span>
                        </div>
                      </div>
                    </div>

                    {/* Button skeleton */}
                    <div className="jaf-form-btn-container">
                      <button type="button" disabled className="jaf-form-btn cursor-not-allowed">
                        Explore my options
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <div className="jaf-stats-bar bg-slate-50 border-y border-slate-200/60 py-6">
        <div className="jaf-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-slate-500 text-sm font-bold tracking-wide text-center md:text-left">
              TRUSTED BY 700+ COMPANIES ACROSS 40+ COUNTRIES
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="relative w-24 h-8 opacity-60 hover:opacity-100 transition duration-300">
                <Image src="/logos/lm5-capital.jpg" alt="LM5 Capital logo" fill className="object-contain filter grayscale" />
              </div>
              <div className="relative w-28 h-8 opacity-60 hover:opacity-100 transition duration-300">
                <Image src="/logos/amice-advocaten.webp" alt="Amice Advocaten logo" fill className="object-contain filter grayscale" />
              </div>
              <div className="relative w-28 h-8 opacity-60 hover:opacity-100 transition duration-300">
                <Image src="/logos/halprin-law.svg" alt="Halprin Law logo" fill className="object-contain filter grayscale" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. WHAT YOU GET */}
      <section className="py-20 lg:py-28 bg-white" style={{ padding: '40px 0', overflow: 'hidden' }}>
        <style>{`
          /* Redesigned Section Layout */
          .redesign-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 72px;
            align-items: center;
          }
          @media (max-width: 1023px) {
            .redesign-grid {
              grid-template-columns: 1fr;
              gap: 56px;
            }
          }

          /* Left column typography */
          .redesign-eyebrow {
            display: block;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #F7931E;
            margin-bottom: 14px;
          }
          .redesign-title {
            font-family: "IBM Plex Serif", Georgia, serif;
            font-size: clamp(28px, 3.8vw, 40px);
            font-weight: 700;
            color: #0f1f3d;
            line-height: 1.25;
            margin: 0 0 18px 0;
            letter-spacing: -0.01em;
          }
          .redesign-subtitle {
            font-size: 16.5px;
            color: #64748b;
            line-height: 1.6;
            max-width: 580px;
            margin: 0 0 40px 0;
          }

          /* Left column benefits */
          .redesign-benefits-list {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .redesign-benefit-item {
            display: flex;
            gap: 18px;
            align-items: flex-start;
          }
          .redesign-benefit-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background-color: #fffaf5;
            border: 2px solid #F7931E;
            color: #F7931E;
            font-family: "IBM Plex Serif", Georgia, serif;
            font-weight: 700;
            font-size: 13px;
            flex-shrink: 0;
          }
          .redesign-benefit-content {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }
          .redesign-benefit-title {
            font-family: "IBM Plex Serif", Georgia, serif;
            font-size: 16.5px;
            font-weight: 700;
            color: #0f1f3d;
            margin: 0;
            line-height: 1.3;
          }
          .redesign-benefit-desc {
            font-size: 14px;
            color: #64748b;
            margin: 0;
            line-height: 1.5;
          }

          /* Right column card & visual diagram */
          .redesign-visual-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(15, 31, 61, 0.03);
            position: relative;
            width: 100%;
            display: flex;
          }
          /* Premium CSS Micro-animations */
          @keyframes redesign-fade-in-left {
            from { opacity: 0; transform: translateX(-16px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes redesign-fade-in-right {
            from { opacity: 0; transform: translateX(16px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .anim-left-col {
            animation: redesign-fade-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .anim-right-card {
            animation: redesign-fade-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          }

          @media (prefers-reduced-motion: reduce) {
            .anim-left-col, .anim-right-card {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>

        <div className="jaf-container">
          <div className="redesign-grid">

            {/* Left Column: Typography & Numbered Benefits */}
            <div className="anim-left-col">
              <span className="redesign-eyebrow">DIRECT HR INFRASTRUCTURE</span>
              <h2 className="redesign-title">Own German entity. Fully compliant. Direct support.</h2>
              <p className="redesign-subtitle">
                Jackson &amp; Frank provides a fully compliant German employment structure and direct, local support, allowing you to hire without establishing your own German entity.
              </p>

              <div className="redesign-benefits-list">

                <ul className="jaf-checklist">
                  {[
                    {
                      title: "German entity",
                      desc: "Your employee is employed through the appropriate German legal structure."
                    },
                    {
                      title: "Fully compliant",
                      desc: "German employment, payroll, tax, and statutory requirements are handled correctly."
                    },
                    {
                      title: "Direct support",
                      desc: "You get dedicated support throughout the employment lifecycle."
                    },
                    {
                      title: "Faster expansion",
                      desc: "Hire in Germany without first setting up your own local entity."
                    }
                  ].map((item, i) => (
                    <li key={i} className="jaf-checklist-item">
                      <div className="jaf-badge-orange-number">
                        <span>{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="jaf-checklist-title">{item.title}</h3>
                        <p className="jaf-checklist-desc">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

              </div>
            </div>

            {/* Right Column: Visual Diagram Card */}
            <div className="anim-right-card">
              <div className="redesign-visual-card">
                <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px]">
                  <Image
                    src="/assets/germany-redesign.jpg"
                    alt="Jackson & Frank team collaboration in Germany"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      <CampaignComparisonTable
        eyebrow="COMPARE YOUR OPTIONS"
        title="Why companies choose J&amp;F over setting up their own entity."
        subtitle="See the difference between a dedicated Germany partner, a platform and doing everything yourself."
        headers={['Feature', 'Jackson & Frank', 'Deel / Remote / Other EOR Provider', 'Set up a GmbH yourself']}
        rows={comparisonRows}
      />

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '40px 0', background: '#f8fafc', borderTop: '1px solid #e8edf2' }}>
        <div className="jaf-container">
          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <span style={{
              display: 'block', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#F7931E', marginBottom: '12px'
            }}>ONBOARDING PROCESS</span>
            <h2 style={{
              fontFamily: '"IBM Plex Serif", Georgia, serif',
              fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 700,
              color: '#0f1f3d', lineHeight: 1.2, margin: 0, letterSpacing: '-0.01em'
            }}>Hire in Germany in 3 steps</h2>
          </div>

          <style>{`
            .gi-steps-wrapper {
              position: relative;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 20px;
            }
            /* horizontal connector line behind cards */
            .gi-steps-wrapper::before {
              content: '';
              position: absolute;
              top: 42px;
              left: calc(16.666% + 10px);
              right: calc(16.666% + 10px);
              height: 2px;
              background: linear-gradient(to right, #e2e8f0, #cbd5e1, #e2e8f0);
              z-index: 0;
              pointer-events: none;
            }
            @media (max-width: 767px) {
              .gi-steps-wrapper {
                grid-template-columns: 1fr;
                gap: 16px;
              }
              .gi-steps-wrapper::before {
                display: none;
              }
            }
            .gi-step-card {
              position: relative;
              z-index: 1;
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 14px;
              padding: 28px 24px 32px;
              box-shadow: 0 2px 8px rgba(15,31,61,0.05);
              display: flex;
              flex-direction: column;
              gap: 12px;
              transition: box-shadow 0.2s ease, transform 0.2s ease;
            }
            @media (prefers-reduced-motion: no-preference) {
              .gi-step-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(15,31,61,0.09);
              }
            }
            .gi-step-badge {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              color: #F7931E;
              margin-bottom: 4px;
            }
            .gi-step-number {
              font-family: "IBM Plex Serif", Georgia, serif;
              font-size: 44px;
              font-weight: 700;
              color: #e8ecf2;
              line-height: 1;
              margin: 0;
              letter-spacing: -2px;
            }
            .gi-step-title {
              font-size: 18px;
              font-weight: 700;
              color: #0f1f3d;
              margin: 0;
              line-height: 1.3;
            }
            .gi-step-desc {
              font-size: 13.5px;
              color: #64748b;
              line-height: 1.65;
              margin: 0;
            }
            /* Mobile vertical connector */
            
          `}</style>

          <div className="gi-steps-wrapper">
            <div className="gi-step-card">
              <div>
                <div className="gi-step-badge">STEP 1 · DAY 1</div>
                <div className="gi-step-number">01</div>
              </div>
              <h3 className="gi-step-title">Tell us about the role</h3>
              <p className="gi-step-desc">
                Share the job title, salary, and start date. We&apos;ll confirm German-compliant salary benchmarks, social contribution estimates, and any sector-specific collective agreement (CBA) requirements that apply.
              </p>
            </div>

            <div className="gi-step-card">
              <div>
                <div className="gi-step-badge">STEP 2 · DAY 1–2</div>
                <div className="gi-step-number">02</div>
              </div>
              <h3 className="gi-step-title">Contract + onboarding</h3>
              <p className="gi-step-desc">
                We draft a locally compliant employment contract under German law. Your new hire signs. We register them for Sozialversicherung and set up payroll — including Lohnsteuer withholding and the full employer contribution stack.
              </p>
            </div>

            <div className="gi-step-card">
              <div>
                <div className="gi-step-badge">STEP 3 · DAY 3 ONWARDS</div>
                <div className="gi-step-number">03</div>
              </div>
              <h3 className="gi-step-title">Ongoing employment</h3>
              <p className="gi-step-desc">
                You manage your employee&apos;s day-to-day work. We handle monthly payroll, statutory reporting, sick leave administration, and any works council consultation requirements. You get a single monthly invoice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GERMANY EMPLOYMENT FACTS */}
      <section style={{ padding: '40px 0', background: '#ffffff', borderTop: '1px solid #e8edf2' }}>
        <div className="jaf-container">
          <div style={{ marginBottom: '40px' }}>
            <span style={{
              display: 'block', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#F7931E', marginBottom: '12px'
            }}>LOCAL LABOR COMPLIANCE</span>
            <h2 style={{
              fontFamily: '"IBM Plex Serif", Georgia, serif',
              fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 700,
              color: '#0f1f3d', lineHeight: 1.2, margin: 0, letterSpacing: '-0.01em'
            }}>What you need to know before hiring in Germany</h2>
          </div>

          <style>{`
            .gi-compliance-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              box-shadow: 0 2px 12px rgba(15,31,61,0.06);
              overflow: hidden;
            }
            .gi-compliance-row {
              display: grid;
              grid-template-columns: 220px 1fr;
              align-items: start;
              padding: 16px 24px;
              border-bottom: 1px solid #f1f5f9;
              transition: background 0.15s;
              gap: 20px;
            }
            .gi-compliance-row:last-child { border-bottom: none; }
            .gi-compliance-row:hover { background: #fafbfc; }
            @media (max-width: 640px) {
              .gi-compliance-row {
                grid-template-columns: 1fr;
                gap: 4px;
                padding: 14px 18px;
              }
            }
            .gi-compliance-label {
              font-size: 13px;
              font-weight: 700;
              color: #0f1f3d;
              line-height: 1.5;
              padding-top: 1px;
            }
            .gi-compliance-value {
              font-size: 14px;
              font-weight: 400;
              color: #475569;
              line-height: 1.65;
            }
          `}</style>

          <div className="gi-compliance-card">
            {[
              { label: 'Currency', value: 'Euro (€)' },
              { label: 'Minimum wage', value: '€13.90/hour from 1 Jan 2026; rising to €14.60 from 1 Jan 2027' },
              { label: 'Annual leave', value: '20 working days statutory minimum (5-day week); typically 25–30 by contract' },
              { label: 'Sick leave', value: '6 weeks full pay (employer-funded); then 70% via statutory health insurance for up to 78 weeks' },
              { label: 'Maternity leave', value: '14 weeks paid (6 weeks pre-delivery + 8 weeks post); extendable to 12 weeks post for multiple/premature births' },
              { label: 'Parental leave (Elterngeld)', value: 'Up to 3 years; German state pays 67% of salary up to €1,800/month' },
              { label: 'Working hours', value: '8 hours/day standard; max 10 hours/day averaged over a 6-month period' },
              { label: 'Probation period', value: 'Up to 6 months; either party can terminate with 2 weeks notice during probation' },
              { label: 'Notice periods', value: '4 weeks (< 2 years service) → up to 7 months (> 20 years service); written notice required' },
              { label: 'Dismissal protection', value: 'Applies after 6 months employment + employer has > 10 employees (Kündigungsschutzgesetz)' },
              { label: 'Employer social contributions', value: '~20% of gross: pension 9.3%, health ~7.3%, unemployment 1.3%, long-term care ~1.8%, accident insurance varies' },
              { label: 'Payroll cycle', value: 'Monthly, paid at end of month' },
              { label: 'Language of employment contract', value: 'German preferred; bilingual contracts common for international hires' }
            ].map((item, index) => (
              <div key={index} className="gi-compliance-row">
                <span className="gi-compliance-label">{item.label}</span>
                <span className="gi-compliance-value">{item.value}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', marginTop: '16px', textAlign: 'left' }}>
            These facts are current as of January 2026. We notify clients of regulatory updates — Germany adjusts minimum wage and social thresholds annually.
          </p>
        </div>
      </section>


      {/* 
        7. LEGAL STRUCTURE — GATED SECTION
        WARNING: This section contains legally sensitive claims. Do NOT publish/enable this section 
        by setting IS_PERMANENT_CONTRACT_VERIFIED to true unless all claims listed in the feature 
        flag description at the top of this file are legally verified and substantiated by the 
        J&F legal/business team.
      */}
      {IS_PERMANENT_CONTRACT_VERIFIED && (
        <section style={{ padding: '40px 0', background: '#f8fafc', borderTop: '1px solid #e8edf2' }}>
          <style>{`
            /* Legal Structure Section */
            .gls-grid {
              display: grid;
              grid-template-columns: 1fr 1.4fr;
              gap: 64px;
              align-items: start;
            }
            @media (max-width: 1023px) {
              .gls-grid { grid-template-columns: 1fr; gap: 0px; }
            }
            .gls-eyebrow {
              display: block;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              color: #F7931E;
              margin-bottom: 14px;
            }
            .gls-heading {
              font-family: "IBM Plex Serif", Georgia, serif;
              font-size: clamp(26px, 3.2vw, 40px);
              font-weight: 700;
              color: #0f1f3d;
              line-height: 1.2;
              margin: 0 0 28px 0;
              letter-spacing: -0.01em;
            }
            /* 18-month callout */
            .gls-callout {
              display: inline-flex;
              flex-direction: column;
              gap: 2px;
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 16px 20px;
              box-shadow: 0 2px 8px rgba(15,31,61,0.05);
            }
            .gls-callout-number {
              font-family: "IBM Plex Serif", Georgia, serif;
              font-size: 36px;
              font-weight: 700;
              color: #0f1f3d;
              line-height: 1;
              letter-spacing: -1px;
            }
            .gls-callout-label {
              font-size: 11px;
              font-weight: 600;
              color: #64748b;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }
            /* Paragraphs */
            .gls-body p {
              font-size: 15px;
              color: #475569;
              line-height: 1.75;
              margin: 0 0 20px 0;
            }
            .gls-body p:last-child { margin-bottom: 0; }
            /* Highlighted card — paragraph 2 */
            .gls-highlight-card {
              background: rgba(14, 31, 61, 0.04);
              border: 1px solid rgba(14, 31, 61, 0.12);
              border-radius: 14px;
              padding: 24px 28px;
              margin: 0 0 20px 0;
            }
            .gls-highlight-card p {
              font-size: 15px;
              color: #1e3a5f;
              line-height: 1.75;
              margin: 0;
              font-weight: 450;
            }
            /* Guidance card — paragraph 3 */
            .gls-guidance-card {
              border-left: 3px solid #F7931E;
              padding: 16px 20px;
              background: #fffaf5;
              border-radius: 0 10px 10px 0;
              margin: 0;
            }
            .gls-guidance-card p {
              font-size: 15px;
              color: #64748b;
              line-height: 1.75;
              margin: 0;
            }
          `}</style>

          <div className="jaf-container">
            <div className="gls-grid">

              {/* Left column */}
              <div>
                <span className="gls-eyebrow">LEGAL STRUCTURE</span>
                <h2 className="gls-heading">Why the legal structure matters in Germany</h2>

                {/* 18-month visual callout */}
                {/* <div className="gls-callout">
                  <span className="gls-callout-number">18 months</span>
                  <span className="gls-callout-label">AÜG leasing cap</span>
                </div> */}
              </div>

              {/* Right column — three paragraphs */}
              <div>
                {/* Paragraph 1 */}
                <div className="gls-body" style={{ marginBottom: '20px' }}>
                  <p>
                    Germany&apos;s employee-leasing law (Arbeitnehmerüberlassungsgesetz, AÜG) limits leased employment to 18 consecutive months. Many EOR providers operate under this cap — which means your employee&apos;s contract has an expiry built in.
                  </p>
                </div>

                {/* Paragraph 2 — highlighted */}
                <div className="gls-highlight-card">
                  <p>
                    Jackson &amp; Frank is AÜG-licensed and employs your staff directly through our German GmbH under permanent employment contracts — not as fixed-term leased workers. This means no 18-month cliff on employment, and your employee gets the stability of a permanent contract (important for mortgages, long-term financial planning, and German labour market expectations).
                  </p>
                </div>

                {/* Paragraph 3 — practical guidance */}
                <div className="gls-guidance-card">
                  <p>
                    If you&apos;re evaluating EOR providers for a long-term hire in Germany, ask whether they offer permanent employment contracts or operate under the AÜG leasing cap. It&apos;s a question worth asking every provider on your shortlist.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* SECTION 7 — SOCIAL PROOF */}
      <CampaignTestimonials testimonials={verifiedTestimonials} />
      <CampaignFAQ
        tabs={[
          { id: 'gettingStarted', label: 'Getting Started' },
        ]}
        faqData={faqData}
      />
      <CampaignCTA
        primaryBtnHref="https://calendly.com/jacksonandfrank/discover-us"
        secondaryBtnText="Get a cost estimate"
        primaryBtnText="Book a 20-minute call"
        title="Ready to hire in Germany?"
        description="Talk to our Germany team — no obligation, no generic pitch. One conversation with someone who knows German employment law, your industry, and what it takes to get a hire live inside a week."
        onBookCallClick={() => fireContactConversion()}
      />
      <CampaignFooter />
    </div>
  )
}
