'use client'

import './multiplier-typography.css'

import React, { useState, useEffect } from 'react'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  FolderOpen,
  Globe,
  Handshake,
  Headphones,
  HelpCircle,
  Plane,
  ShieldCheck,
  UserCheck
} from 'lucide-react'
import Script from 'next/script'
import Image from 'next/image'
import { CALENDLY_URL } from '@/lib/constants'
import { fireContactConversion } from '@/utils/conversion'
import CampaignHeader from '@/components/layout/CampaignHeader'
import CampaignFooter from '@/components/layout/CampaignFooter'

// Testimonial type
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

// Real, context-relevant testimonials from the database
const testimonials: Testimonial[] = [
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

function TestimonialCard({ test }: { test: Testimonial }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLong = test.quote.length > 150

  return (
    <div className="bg-[#e8f0fd] border border-slate-200/60 rounded-2xl p-6 sm:p-8 relative shadow-sm flex flex-col justify-between h-full">
      <div className="text-6xl text-[#143369]/10 font-serif absolute top-4 left-4 pointer-events-none">&ldquo;</div>

      <div className="relative z-10 mb-6 flex-1">
        <div className={`transition-all duration-300 relative overflow-hidden ${!isExpanded && isLong ? 'max-h-24 pb-4' : ''}`}>
          <blockquote className="text-slate-600 italic text-sm sm:text-base leading-relaxed">
            {test.quote}
          </blockquote>
          {!isExpanded && isLong && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#e8f0fd] via-[#e8f0fd]/70 to-transparent pointer-events-none" />
          )}
        </div>
        {isLong && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#143369] hover:text-[#143369]/80 font-bold text-xs mt-2 transition-colors cursor-pointer"
          >
            {isExpanded ? 'Read less' : 'Read more...'}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200/50">
        <div className="flex items-center gap-3">
          {test.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={test.image}
              alt={test.name}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#143369] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {test.name[0]}
            </div>
          )}
          <div>
            <h5 className="font-bold text-slate-900 text-sm leading-none mb-1">{test.name}</h5>
            <p className="text-xs text-slate-500 font-medium">
              {test.role} · {test.website ? (
                <a href={test.website} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-semibold">
                  {test.company}
                </a>
              ) : (
                <span className="text-secondary">{test.company}</span>
              )}
            </p>
          </div>
        </div>
        {test.logo && (
          test.website ? (
            <a href={test.website} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:opacity-80 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={test.logo} alt={test.company} className="h-6 w-auto opacity-90 object-contain max-w-[90px]" />
            </a>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={test.logo} alt={test.company} className="h-6 w-auto shrink-0 opacity-90 object-contain max-w-[90px]" />
          )
        )}
      </div>
    </div>
  )
}

// FAQ item type
interface FAQItem {
  question: string
  answer: React.ReactNode
}

const faqData = {
  gettingStarted: [
    {
      q: "Can I hire someone in the Netherlands without opening a Dutch company?",
      a: "Yes. Jackson & Frank becomes the legal employer in the Netherlands on your behalf. You do not need a Dutch legal entity (BV) or any local presence. We issue the employment contract, run payroll, and manage all immigration compliance. Your candidate is legally employed from day one."
    },
    {
      q: "Do I need to become an approved immigration sponsor myself?",
      a: "No. Jackson & Frank already holds approved sponsor status (Erkend Referent). We submit your candidate's visa application on your behalf, which means you bypass a 12 to 24 month process and thousands of euros in government fees. Your candidate benefits from our status immediately."
    },
    {
      q: "Can an Employer of Record sponsor a Skilled Worker Visa?",
      a: "Yes, but only if the Employer of Record holds IND Recognised Sponsor status. Not all EOR providers do. Jackson & Frank does. Without this status, an EOR cannot submit a fast-track Skilled Worker Visa. It is worth confirming this with any provider before you commit."
    },
    {
      q: "Can I hire a non-EU candidate already living in the Netherlands?",
      a: "Yes, and the process is often faster. If your candidate holds a valid Dutch residence permit from a previous employer, an orientation year visa (Zoekjaar), or a partner's permit, the route to starting work is typically shorter. We assess their current status during the eligibility check."
    }
  ],
  processTimeline: [
    {
      q: "How long does the Skilled Worker Visa (Kennismigrant) take?",
      a: <div className="space-y-3">
        <p><strong>Already in the Netherlands:</strong> sponsor change via document submission. Allow 2 to 4 weeks. The main variable is their notice period.</p>
        <p><strong>Outside the Netherlands:</strong> full immigration applies. We submit the visa application directly to the IND. If an Entry Visa (MVV) is required, that runs through the Dutch embassy. Allow 8 to 12 weeks from the point we have all candidate documents.</p>
        <p>We do not overpromise on timelines. You will know exactly what to expect before you commit.</p>
      </div>
    },
    {
      q: "What happens if our hire changes roles or salary?",
      a: "Any change to employment terms must be reported to the IND within four weeks. Jackson & Frank manages that reporting. You notify us of the change and we handle the IND submission. You do not interact with the Dutch Immigration Authority directly."
    },
    {
      q: "What does Jackson & Frank handle versus what we handle?",
      a: <div className="space-y-3">
        <p><strong>Jackson &amp; Frank handles:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Employment contract and legal employer status</li>
          <li>Skilled Worker Visa application and IND submissions</li>
          <li>Dutch payroll and statutory employer obligations</li>
          <li>30% ruling administration if applicable</li>
          <li>Ongoing IND compliance reporting and visa renewals</li>
        </ul>
        <p><strong>You handle:</strong> day-to-day work direction, performance management, and role decisions.</p>
      </div>
    }
  ],
  costsTax: [
    {
      q: "What are the 2026 salary requirements for the Skilled Worker Visa?",
      a: <div className="space-y-3">
        <p>The 2026 gross monthly salary thresholds are:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>€5,942/month for employees aged 30 and over</li>
          <li>€4,357/month for employees under 30</li>
          <li>€3,122/month for recent graduates (reduced criterion)</li>
        </ul>
        <p>Figures exclude the 8% Dutch holiday allowance and are updated each January.</p>
      </div>
    },
    {
      q: "Can you handle the 30% ruling for our hire?",
      a: "Yes. The 30% ruling allows qualifying international employees to receive up to 30% of gross salary tax-free as compensation for relocation costs. We administer it through payroll and handle the joint application to the Dutch Tax Authority. We flag eligibility proactively during onboarding."
    },
    {
      q: "What does it cost compared to opening a Dutch entity?",
      a: <div className="space-y-3">
        <p><strong>Going it alone over 24 months (Dutch BV + IND sponsor status):</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Corporate setup and IND sponsor fee: €4,500 to €5,500</li>
          <li>Annual admin, tax and payroll: €12,000 to €20,000</li>
          <li>Sick leave liability (Arbodienst and insurance): €8,000 to €10,000</li>
          <li>Office and infrastructure: €16,000 to €20,000</li>
          <li>Total: approximately €95,000 to €110,000</li>
        </ul>
        <p><strong>Via Jackson &amp; Frank:</strong> one monthly fee per employee. No entity setup, no fixed overhead, no stranded costs if the market does not work out. Full breakdown available on request.</p>
      </div>
    }
  ]
};

function TestimonialsCarousel() {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const isMouseDown = React.useRef(false)
  const startX = React.useRef(0)
  const scrollLeftPos = React.useRef(0)

  const handleScrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -380, behavior: 'smooth' })
  }

  const handleScrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 380, behavior: 'smooth' })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0)
    scrollLeftPos.current = scrollRef.current?.scrollLeft || 0
  }

  const handleMouseLeaveOrUp = () => isMouseDown.current = false

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current.offsetLeft || 0)
    const walk = (x - startX.current) * 1.5
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk
  }

  return (
    <section className="jaf-section" id="testimonials" style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <div className="jaf-container">
        <div className="jaf-faq-layout">
          <div className="jaf-faq-sidebar" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <span className="jaf-hero-eyebrow" style={{ color: '#F7931E', margin: '0 0 12px 0' }}>
                CLIENT SUCCESS STORIES
              </span>
              <h2 className="jaf-section-title" style={{ fontSize: '32px' }}>
                See why companies trust us to hire across borders.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button
                type="button"
                onClick={handleScrollLeft}
                aria-label="Previous testimonial"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff' }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                aria-label="Next testimonial"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff' }}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="jaf-faq-content" style={{ overflow: 'hidden' }}>
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              style={{
                display: 'flex',
                gap: '24px',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                paddingBottom: '16px',
                cursor: 'grab'
              }}
              className="no-scrollbar"
            >
              {testimonials.map((test, index) => (
                <div
                  key={index}
                  className="jaf-white-card"
                  style={{
                    flexShrink: 0,
                    width: '380px',
                    maxWidth: '85vw',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(15,31,61,0.02)'
                  }}
                >
                  <div>
                    {test.title && (
                      <h3 className="jaf-card-title" style={{ fontSize: '18px', marginBottom: '12px' }}>
                        {test.title}
                      </h3>
                    )}
                    <p className="jaf-card-desc" style={{ fontStyle: 'italic', marginBottom: '24px' }}>
                      &ldquo;{test.quote}&rdquo;
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px', borderTop: '1px solid #cbd5e1' }}>
                    {test.image ? (
                      <div className="jaf-testimonial-avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                        <img
                          src={test.image}
                          alt={test.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div className="jaf-testimonial-avatar" style={{ backgroundColor: '#143369', color: '#ffffff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {test.name[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="jaf-testimonial-author-name" style={{ fontWeight: 'bold', fontSize: '14px', margin: 0 }}>{test.name}</h4>
                      <p className="jaf-testimonial-author-role" style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                        {test.role}, {test.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [activeTab, setActiveTab] = useState<'gettingStarted' | 'processTimeline' | 'costsTax'>('gettingStarted');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const tabs = [
    { id: 'gettingStarted', label: 'Getting Started' },
    { id: 'processTimeline', label: 'Process & Timeline' },
    { id: 'costsTax', label: 'Costs & Tax' }
  ];

  return (
    <section className="jaf-section-bg-gray" id="faq" style={{ padding: '64px 0', backgroundColor: '#f8fafc' }}>
      <div className="jaf-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="jaf-faq-layout">
          <div className="jaf-faq-sidebar">
            <h2 className="jaf-section-title" style={{ fontSize: '32px', marginBottom: '16px' }}>
              Common questions.
            </h2>
            <p className="jaf-section-subtitle" style={{ color: '#475569', marginBottom: '32px' }}>
              Can&apos;t find the answer you need? Speak to our team directly.
            </p>
            <a
              href="#hero"
              className="jaf-cta-btn"
              style={{
                backgroundColor: '#F7931E',
                color: '#ffffff',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'block',
                padding: '16px 24px',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}
            >
              Get a free assessment
            </a>
          </div>

          <div className="jaf-faq-content">
            <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '24px', overflowX: 'auto' }} className="no-scrollbar">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as 'gettingStarted' | 'processTimeline' | 'costsTax');
                      setOpenIndex(null);
                    }}
                    style={{
                      padding: '16px 24px',
                      fontWeight: 600,
                      fontSize: '15px',
                      color: isActive ? '#0f1f3d' : '#64748b',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: isActive ? '2px solid #0f1f3d' : '2px solid transparent',
                      cursor: 'pointer',
                      marginRight: '8px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="jaf-faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqData[activeTab].map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="jaf-faq-item" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="jaf-faq-trigger"
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: 'bold'
                      }}
                    >
                      <span style={{ fontSize: '16px', color: '#0f1f3d' }}>{item.q}</span>
                      <ChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0, marginLeft: '12px' }} />
                    </button>
                    {isOpen && (
                      <div className="jaf-faq-panel" style={{ padding: '0 20px 20px', color: '#475569', lineHeight: 1.6 }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HireNonEuEmployeesPage() {
  const searchParams = useSearchParams()

  // Capture UTM parameters + Google Ads click ID (GCLID) for conversion tracking
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




  // Lead capture is handled by the embedded HubSpot two-step form in Section 8.

  // FAQ Tab and Accordion State
  const faqTabs = ['getting-started', 'process-timeline', 'costs-tax'] as const
  type FAQTabType = (typeof faqTabs)[number]
  const [activeFaqTab, setActiveFaqTab] = useState<FAQTabType>('getting-started')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleTabChange = (tab: FAQTabType) => {
    setActiveFaqTab(tab)
    setOpenFaqIndex(null) // collapse on tab change
  }

  const painPoints = [
    {
      Icon: UserCheck,
      iconWrap: 'bg-slate-100 border-slate-200',
      iconColor: 'text-[#143369]',
      title: 'Your candidate is ready. The process is not.',
      body: 'Hiring someone from outside the EU in the Netherlands means navigating rules most companies have never dealt with before.'
    },
    {
      Icon: Clock,
      iconWrap: 'bg-slate-100 border-slate-200',
      iconColor: 'text-[#143369]',
      title: 'Getting IND sponsor status yourself would take 12 to 24 months.',
      body: 'That is before paying €2,000 to €5,000 in government fees, and before your candidate has worked a single day.'
    },
    {
      Icon: Building2,
      iconWrap: 'bg-slate-100 border-slate-200',
      iconColor: 'text-[#143369]',
      title: 'No Dutch entity means you cannot even start the process.',
      body: 'Registering a Dutch BV adds 3 to 6 months and requires capital before you have proven the market works for your business.'
    }
  ]

  const painCardsRef = React.useRef<HTMLDivElement>(null)
  const [activePainCard, setActivePainCard] = useState(0)

  const whyCardsRef = React.useRef<HTMLDivElement>(null)
  const [activeWhyCard, setActiveWhyCard] = useState(0)



  // Section 4 — MVV detail note toggle on Step 3
  const [showMvvNote, setShowMvvNote] = useState(false)
  const [expandedNetherlands, setExpandedNetherlands] = useState(false)
  const [expandedOutside, setExpandedOutside] = useState(false)
  const [expandedStep1, setExpandedStep1] = useState(false)
  const [expandedStep2, setExpandedStep2] = useState(false)
  const [expandedStep3, setExpandedStep3] = useState(false)
  // The "how it works" step cards are always open on desktop (md+) and collapsed
  // (tap to toggle) on mobile. Starts false so SSR/first client render match.
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Cost-comparison line items (Section 3)
  const costRows = [
    { label: 'Corporate setup + IND sponsor status', alone: '€4,500 to €5,500', jf: '€0, we hold it' },
    { label: 'Annual admin, tax & payroll (24 months)', alone: '€12,000 to €20,000', jf: 'Included' },
    { label: 'Sick leave liability (Arbodienst + insurance)', alone: '€8,000 to €10,000', jf: 'Included' },
    { label: 'Office & infrastructure (24 months)', alone: '€16,000 to €20,000', jf: 'Remote-first, virtual address only (~€2,400)' },
    { label: 'Equipment', alone: '€4,000 to €5,000', jf: '€4,000 to €5,000' },
  ]



  const scrollToPainCard = (index: number) => {
    const el = painCardsRef.current
    if (!el) return
    const child = el.children[index] as HTMLElement | undefined
    if (!child) return
    const rectContainer = el.getBoundingClientRect()
    const rectChild = child.getBoundingClientRect()
    const relativeLeft = rectChild.left - rectContainer.left + el.scrollLeft
    const target = relativeLeft + rectChild.width / 2 - rectContainer.width / 2
    el.scrollTo({ left: target, behavior: 'smooth' })
    setActivePainCard(index)
  }

  const handlePainScroll = () => {
    const el = painCardsRef.current
    if (!el) return
    const containerCenter = el.scrollLeft + el.offsetWidth / 2
    let closestIndex = 0
    let minDiff = Infinity
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const diff = Math.abs(containerCenter - childCenter)
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = i
      }
    }
    if (closestIndex !== activePainCard) setActivePainCard(closestIndex)
  }

  // Auto-advance the pain-point slider every 8s (mobile only)
  useEffect(() => {
    const el = painCardsRef.current
    if (!el) return
    if (typeof window !== 'undefined' && window.innerWidth >= 768) return

    const intervalId = setInterval(() => {
      const nextIndex = (activePainCard + 1) % painPoints.length
      const child = el.children[nextIndex] as HTMLElement | undefined
      if (child) {
        const rectContainer = el.getBoundingClientRect()
        const rectChild = child.getBoundingClientRect()
        const relativeLeft = rectChild.left - rectContainer.left + el.scrollLeft
        const target = relativeLeft + rectChild.width / 2 - rectContainer.width / 2
        el.scrollTo({ left: target, behavior: 'smooth' })
      }
    }, 8000)

    return () => clearInterval(intervalId)
  }, [activePainCard, painPoints.length])

  const scrollToWhyCard = (index: number) => {
    const el = whyCardsRef.current
    if (!el) return
    const child = el.children[index] as HTMLElement | undefined
    if (!child) return
    const rectContainer = el.getBoundingClientRect()
    const rectChild = child.getBoundingClientRect()
    const relativeLeft = rectChild.left - rectContainer.left + el.scrollLeft
    const target = relativeLeft + rectChild.width / 2 - rectContainer.width / 2
    el.scrollTo({ left: target, behavior: 'smooth' })
    setActiveWhyCard(index)
  }

  const handleWhyScroll = () => {
    const el = whyCardsRef.current
    if (!el) return
    const containerCenter = el.scrollLeft + el.offsetWidth / 2
    let closestIndex = 0
    let minDiff = Infinity
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const diff = Math.abs(containerCenter - childCenter)
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = i
      }
    }
    if (closestIndex !== activeWhyCard) setActiveWhyCard(closestIndex)
  }

  // Auto-advance the why-j&f slider every 8s (mobile only)
  useEffect(() => {
    const el = whyCardsRef.current
    if (!el) return
    if (typeof window !== 'undefined' && window.innerWidth >= 768) return

    const intervalId = setInterval(() => {
      const nextIndex = (activeWhyCard + 1) % 3
      const child = el.children[nextIndex] as HTMLElement | undefined
      if (child) {
        const rectContainer = el.getBoundingClientRect()
        const rectChild = child.getBoundingClientRect()
        const relativeLeft = rectChild.left - rectContainer.left + el.scrollLeft
        const target = relativeLeft + rectChild.width / 2 - rectContainer.width / 2
        el.scrollTo({ left: target, behavior: 'smooth' })
      }
    }, 8000)

    return () => clearInterval(intervalId)
  }, [activeWhyCard])



  // Helper to preserve UTM parameters in query string for Calendly
  const getBookingUrl = () => {
    const url = new URL(CALENDLY_URL)
    if (utmData.source) url.searchParams.set('utm_source', utmData.source)
    if (utmData.medium) url.searchParams.set('utm_medium', utmData.medium)
    if (utmData.campaign) url.searchParams.set('utm_campaign', utmData.campaign)
    if (utmData.content) url.searchParams.set('utm_content', utmData.content)
    if (utmData.term) url.searchParams.set('utm_term', utmData.term)
    if (utmData.gclid) url.searchParams.set('gclid', utmData.gclid)
    return url.toString()
  }

  // Accordion Visa comparison card list for mobile viewport
  const mobileVisaCards = [
    {
      type: 'Skilled Worker Visa (Kennismigrant / HSM)',
      recommended: true,
      bestFor: 'Senior or specialist roles above salary threshold',
      time: '~2 weeks with approved sponsor',
      requiresSponsor: 'Yes, Jackson & Frank holds this status'
    },
    {
      type: 'EU Blue Card',
      recommended: false,
      bestFor: 'Highly qualified workers with a university degree',
      time: '2 to 8 weeks',
      requiresSponsor: 'No, but the salary threshold is higher'
    },
    {
      type: 'Single Work & Residence Permit (GVVA)',
      recommended: false,
      bestFor: 'Roles below Skilled Worker Visa salary threshold',
      time: 'Up to 90 days',
      requiresSponsor: 'No, but requires a labour market test'
    },
    {
      type: 'Intra-Company Transfer (ICT)',
      recommended: false,
      bestFor: 'Employees transferring from a non-EU office',
      time: '2 to 8 weeks',
      requiresSponsor: 'No'
    }
  ]

  // Complete category-filtered FAQs matching reference content
  const faqsByCategory: Record<FAQTabType, FAQItem[]> = {
    'getting-started': [
      {
        question: 'Can I hire someone in the Netherlands without opening a Dutch company?',
        answer: 'Yes. Jackson & Frank becomes the legal employer in the Netherlands on your behalf. You do not need a Dutch legal entity (BV) or any local presence. We issue the employment contract, run payroll, and manage all immigration compliance. Your candidate is legally employed in the Netherlands from day one.'
      },
      {
        question: 'Do I need to become an approved immigration sponsor yourself?',
        answer: 'No. Jackson & Frank already holds approved sponsor status (Erkend Referent). We submit your candidate\'s visa application on your behalf, which means you bypass a 12 to 24 month process and thousands of euros in government fees. Your candidate benefits from our status immediately.'
      },
      {
        question: 'Can an Employer of Record sponsor a Skilled Worker Visa in the Netherlands?',
        answer: 'Yes, but only if the Employer of Record holds IND Recognised Sponsor status. Not all EOR providers do. Jackson & Frank does. Without this status, an EOR cannot submit a fast-track Skilled Worker Visa. It is worth confirming this with any provider before you commit.'
      },
      {
        question: 'Can I hire a non-EU candidate who is already living in the Netherlands?',
        answer: 'Yes, and the process is often faster. If your candidate holds a valid Dutch residence permit — from a previous employer, an orientation year visa (Zoekjaar), or a partner\'s permit. The route to starting work is typically shorter. We assess their current status during the eligibility check.'
      }
    ],
    'process-timeline': [
      {
        question: 'How long does the Skilled Worker Visa (Kennismigrant) take?',
        answer: (
          <div>
            <p className="mb-3">Timeline depends on where your candidate is currently based.</p>
            <p className="mb-3"><strong>Already in the Netherlands:</strong> sponsor change via document submission. Allow 2–4 weeks — the main variable is their notice period.</p>
            <p className="mb-3"><strong>Outside the Netherlands:</strong> full immigration applies. We submit the Skilled Worker Visa application directly to the IND. If an Entry Visa (MVV) is required, that runs through the Dutch embassy in their country of residence. Allow 8–12 weeks from the point we have all candidate documents.</p>
            <p>{"We don't overpromise on timelines. You'll know exactly what to expect before you commit."}</p>
          </div>
        )
      },
      {
        question: 'What happens to the visa if our hire changes roles or salary?',
        answer: 'Any change to employment terms, including role title, salary, or working hours, must be reported to the IND within four weeks. Jackson & Frank manages that reporting on your behalf. You notify us of the change and we handle the IND submission. You do not need to interact with the Dutch Immigration Authority directly.'
      },
      {
        question: 'What does Jackson & Frank handle versus what we handle?',
        answer: (
          <div>
            <p className="mb-2 font-semibold text-slate-800">Jackson &amp; Frank handles:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-600">
              <li>Employment contract and legal employer status</li>
              <li>Skilled Worker Visa application and IND submissions</li>
              <li>Dutch payroll and statutory employer obligations</li>
              <li>30% ruling administration (if applicable)</li>
              <li>Ongoing IND compliance reporting and visa renewals</li>
            </ul>
            <p className="mb-2 font-semibold text-slate-800">You handle:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Day-to-day work direction and performance management</li>
              <li>Role and project decisions</li>
            </ul>
          </div>
        )
      }
    ],
    'costs-tax': [
      {
        question: 'What are the 2026 salary requirements for the Skilled Worker Visa?',
        answer: (
          <div>
            <p className="mb-2">The 2026 gross monthly salary thresholds are:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>€5,942/month</strong> for employees aged 30 and over</li>
              <li><strong>€4,357/month</strong> for employees under 30</li>
              <li><strong>€3,122/month</strong> for recent graduates (reduced criterion)</li>
            </ul>
            <p className="mt-2 text-sm text-slate-500">Figures exclude the 8% Dutch holiday allowance (vakantiegeld) and are updated each January. We confirm the applicable threshold during the eligibility assessment.</p>
          </div>
        )
      },
      {
        question: 'Can you handle the 30% ruling for our hire?',
        answer: 'Yes. The 30% ruling allows qualifying international employees to receive up to 30% of gross salary tax-free as compensation for relocation costs. If your hire qualifies, we administer it through payroll and handle the joint application to the Dutch Tax Authority. We assess eligibility during onboarding and flag it proactively — it\'s often a material factor in offer negotiations.'
      },
      {
        question: 'What does it cost compared to opening a Dutch entity?',
        answer: (
          <div>
            <p className="mb-3 font-semibold text-slate-800">Going it alone: Dutch BV and IND sponsor status over 24 months:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-600">
              <li>Corporate setup + IND sponsor fee: €4,500–€5,500</li>
              <li>Annual admin, tax & payroll: €12,000–€20,000</li>
              <li>Sick leave liability (Arbodienst + insurance): €8,000–€10,000</li>
              <li>Office & infrastructure: €16,000–€20,000</li>
              <li>Equipment: €4,000–€5,000</li>
              <li className="font-bold text-slate-900 list-none mt-1">Total: ~€95,000–€110,000 over 24 months</li>
            </ul>

            <p className="mb-2 font-semibold text-[#143369]">Via Jackson &amp; Frank over 24 months:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-600">
              <li>EOR management fee: market rate per employee per month</li>
              <li>Corporate setup, admin, compliance, sick leave: €0 — included</li>
              <li>Office: ~€2,400 (virtual address only)</li>
              <li>Equipment: €4,000–€5,000</li>
              <li className="font-bold text-slate-900 list-none mt-1">Total: significantly less. Your first hire starts in weeks, not after a 3 to 6 month setup.</li>
            </ul>

            <p className="text-sm text-slate-500 italic mt-2">Full breakdown available on request.</p>
          </div>
        )
      }
    ]
  }

  const displayedFaqs = faqsByCategory[activeFaqTab]
  return (
    <div className="multiplier-theme bg-white min-h-screen text-slate-900 font-sans selection:bg-secondary/35 selection:text-primary">
      <CampaignHeader />
      {/* FAQ Schema for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can I hire someone in the Netherlands without opening a Dutch company?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Jackson & Frank becomes the legal employer in the Netherlands on your behalf. You do not need a Dutch legal entity (BV) or any local presence. We issue the employment contract, run payroll, and manage all immigration compliance. Your candidate is legally employed in the Netherlands from day one."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to become an approved immigration sponsor yourself?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Jackson & Frank already holds approved sponsor status (Erkend Referent). We submit your candidate's visa application on your behalf, which means you bypass a 12 to 24 month process and thousands of euros in government fees. Your candidate benefits from our status immediately."
                }
              },
              {
                "@type": "Question",
                "name": "Can an Employer of Record sponsor a Skilled Worker Visa in the Netherlands?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, but only if the Employer of Record holds IND Recognised Sponsor status. Not all EOR providers do. Jackson & Frank does. Without this status, an EOR cannot submit a fast-track Skilled Worker Visa. It is worth confirming this with any provider before you commit."
                }
              },
              {
                "@type": "Question",
                "name": "Can I hire a non-EU candidate who is already living in the Netherlands?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, and the process is often faster. If your candidate holds a valid Dutch residence permit — from a previous employer, an orientation year visa (Zoekjaar), or a partner's permit. The route to starting work is typically shorter. We assess their current status during the eligibility check."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the Skilled Worker Visa (Kennismigrant) take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Timeline depends on where your candidate is currently based. Already in the Netherlands: sponsor change via document submission. Allow 2–4 weeks. Outside the Netherlands: full immigration applies. We submit the Skilled Worker Visa application directly to the IND. If an Entry Visa (MVV) is required, that runs through the Dutch embassy in their country of residence. Allow 8–12 weeks from the point we have all candidate documents."
                }
              },
              {
                "@type": "Question",
                "name": "What happens to the visa if our hire changes roles or salary?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Any change to employment terms, including role title, salary, or working hours, must be reported to the IND within four weeks. Jackson & Frank manages that reporting on your behalf. You notify us of the change and we handle the IND submission."
                }
              },
              {
                "@type": "Question",
                "name": "What does Jackson & Frank handle versus what we handle?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Jackson & Frank handles: Employment contract and legal employer status; Skilled Worker Visa application and IND submissions; Dutch payroll and statutory obligations; 30% ruling administration (if applicable); IND compliance reporting and renewals. You handle: Day-to-day work direction and performance management; Role and project decisions."
                }
              },
              {
                "@type": "Question",
                "name": "What are the 2026 salary requirements for the Skilled Worker Visa?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 2026 gross monthly salary thresholds are: €5,942/month for employees aged 30 and over; €4,357/month for employees under 30; €3,122/month for recent graduates (reduced criterion). Figures exclude the 8% holiday allowance."
                }
              },
              {
                "@type": "Question",
                "name": "Can you handle the 30% ruling for our hire?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The 30% ruling allows qualifying international employees to receive up to 30% of gross salary tax-free. If your hire qualifies, we administer it through payroll and handle the joint application to the Dutch Tax Authority."
                }
              },
              {
                "@type": "Question",
                "name": "What does it cost compared to opening a Dutch entity?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Going it alone with a Dutch BV and IND sponsor status costs around €95,000–€110,000 over 24 months, including setup fees, admin, tax, payroll, and office costs. Via Jackson & Frank, you pay a simple monthly fee, and all compliance, admin, and setups are included for €0, resulting in significantly lower costs."
                }
              }
            ]
          })
        }}
      />
      {/* HubSpot tracking code — also loaded globally in app/layout.tsx; same id
          dedupes via next/script so it won't double-load. Added explicitly here
          per the campaign launch checklist. */}
      <Script
        id="hs-script-loader"
        src={`https://js-eu1.hs-scripts.com/145156571.js`}
        strategy="lazyOnload"
      />
      {/* HERO SECTION */}
      <section id="hero" className="jaf-hero-section">
        {/* HubSpot form embed */}
        <Script
          id="hs-forms-embed-145156571"
          src="https://js-eu1.hsforms.net/forms/embed/145156571.js"
          strategy="afterInteractive"
        />

        {/* Background micro-accents */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-secondary rounded-full filter blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full filter blur-[120px]" />
        </div>

        <div className="jaf-container relative z-10">
          <div className="jaf-grid-hero">
            {/* Left Column - Content */}
            <div className="jaf-hero-content flex flex-col items-start text-left gap-6">
              {/* Heading block */}
              <div className="w-full">
                <span className="jaf-hero-eyebrow">
                  IND RECOGNISED SPONSOR · NETHERLANDS
                </span>

                <h1 className="jaf-hero-title">
                  Hire non-EU talent in the Netherlands.
                </h1>

                <p className="jaf-hero-subtitle">
                  No Dutch entity required. No 12-month wait to get sponsor status yourself.
                </p>
              </div>

              {/* Divider 1 */}
              <div className="jaf-divider-light" />

              {/* Certificates section */}
              <div className="jaf-certificates-list">
                {/* IND Recognised Sponsor */}
                <div className="jaf-certificate-item">
                  <div className="jaf-certificate-logo">
                    <Image
                      src="/license/logo-ind.svg"
                      alt="IND Logo"
                      width={48}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <p className="jaf-certificate-title">Official IND Recognised Sponsor</p>
                    <p className="jaf-certificate-desc">Fast-track visa processing in 2 to 4 weeks</p>
                  </div>
                </div>

                {/* Local Staffing License (NEN 4400-1) */}
                <div className="jaf-certificate-item">
                  <div className="jaf-certificate-logo">
                    <div className="jaf-certificate-logo-circle">
                      <Image
                        src="/license/licence-1.webp"
                        alt="NEN Logo"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="jaf-certificate-title">Local Staffing License (NEN 4400-1)</p>
                    <p className="jaf-certificate-desc">Your hire is legally employed from day one.</p>
                  </div>
                </div>

                {/* GDPR Compliance */}
                <div className="jaf-certificate-item">
                  <div className="jaf-certificate-logo">
                    <Image
                      src="/license/Rewards-3.webp"
                      alt="GDPR Logo"
                      width={38}
                      height={38}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <p className="jaf-certificate-title">GDPR Compliant</p>
                    <p className="jaf-certificate-desc">Your data is protected under EU law.</p>
                  </div>
                </div>
              </div>

              {/* Divider 2 */}
              <div className="jaf-divider-light" />

              {/* Sponsor Transfer Micro-copy */}
              <p className="jaf-hero-microcopy">
                Already found someone in the Netherlands on another employer&apos;s permit?<br />
                We can transfer their sponsorship to us in 2 to 4 weeks.
              </p>
            </div>

            {/* Right Column - HubSpot Form */}
            <div className="jaf-form-wrapper">
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
                    <h2 className="jaf-form-title">
                      Get started
                    </h2>
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
                      <select
                        disabled
                        className="jaf-select-field cursor-not-allowed"
                      >
                        <option>In which country are you located?*</option>
                      </select>
                      <div className="jaf-select-icon">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Row 3: What's your situation? + Planned new hires */}
                    <div className="jaf-form-field-double">
                      <div className="jaf-select-wrapper">
                        <select
                          disabled
                          className="jaf-select-field cursor-not-allowed"
                        >
                          <option>What&apos;s your situation?*</option>
                        </select>
                        <div className="jaf-select-icon">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="jaf-select-wrapper">
                        <select
                          disabled
                          className="jaf-select-field cursor-not-allowed"
                        >
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
                        <div className="jaf-recaptcha-text">
                          <span className="text-[8px] text-slate-500 font-semibold leading-none">protected by</span>
                          <span className="text-[9px] text-slate-600 font-bold leading-none mt-0.5">reCAPTCHA</span>
                        </div>
                        <div className="jaf-recaptcha-logo">
                          <span className="text-[9px]">↻</span>
                        </div>
                      </div>
                    </div>

                    {/* Button skeleton */}
                    <div className="jaf-form-btn-container">
                      <button
                        type="button"
                        disabled
                        className="jaf-form-btn cursor-not-allowed"
                      >
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

      {/* STATS TRUST BAR */}
      <div className="jaf-stats-bar">
        <div className="jaf-container">
          <div className="jaf-stats-grid">
            <div className="jaf-stats-item">
              <Building2 className="jaf-stats-icon" />
              <span>1,000+ Employee Hired</span>
            </div>
            <span className="jaf-stats-divider" aria-hidden="true">|</span>
            <div className="jaf-stats-item">
              <Globe className="jaf-stats-icon" />
              <span>17+ Active Markets</span>
            </div>
            <span className="jaf-stats-divider" aria-hidden="true">|</span>
            <div className="jaf-stats-item">
              <Clock className="jaf-stats-icon" />
              <span>2 Week Onboard Timeline</span>
            </div>
            <span className="jaf-stats-divider" aria-hidden="true">|</span>
            <div className="jaf-stats-item">
              <Headphones className="jaf-stats-icon" />
              <span>24/5 Human Support</span>
            </div>
          </div>
        </div>
      </div>

      <section className="jaf-section" id="what-you-get">
        <div className="jaf-container">

          {/* Header */}
          <div className="jaf-section-header">
            <h2 className="jaf-section-title">
              Hire, employ, and pay non-EU talent in the Netherlands.
            </h2>
            <p className="jaf-section-subtitle">
              One partner for the full employment lifecycle. We hold the legal status. You direct the work.
            </p>
          </div>

          {/* Block 1: Legal Employment */}
          <div className="jaf-block-row">
            {/* Copy */}
            <div className="jaf-block-col-copy">
              <h2 className="jaf-block-title">
                Grow your team without a local entity.
              </h2>
              <p className="jaf-block-desc">
                Jackson &amp; Frank becomes the legal employer in the Netherlands on your behalf.
              </p>
              <ul className="jaf-checklist">
                {[
                  {
                    title: "Compliant from day one",
                    desc: "Your candidate is legally employed in the Netherlands the day they start"
                  },
                  {
                    title: "Fast-track sponsorship",
                    desc: "We secure sponsorship and visa in 2-4 weeks."
                  },
                  {
                    title: "Zero local bureaucracy",
                    desc: "We handle all Dutch contracts and tax registrations."
                  },
                  {
                    title: "International relocation support: included",
                    desc: "Smooth transition office-to-office, country-to-country, employee transfers"
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
            {/* Visual */}
            <div className="jaf-block-col-visual">
              <div className="jaf-flow-card">

                <div className="jaf-flow-nodes-row">
                  {/* Dashed Connecting Line */}
                  <div className="jaf-flow-connector-line">
                    {/* Dashed border horizontal connector */}
                  </div>

                  {/* Node 1 */}
                  <div className="jaf-flow-node">
                    <div className="jaf-flow-node-circle">
                      <Building2 />
                    </div>
                    <div className="jaf-flow-node-title">Your company</div>
                    <div className="jaf-flow-node-desc">Directs work</div>
                  </div>

                  {/* Plus Icon (overlay on first line) */}
                  <div className="jaf-flow-overlay-badge" style={{ left: '33.3%' }}>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500" />
                  </div>

                  {/* Node 2 */}
                  <div className="jaf-flow-node">
                    <div className="jaf-flow-node-circle-dark">
                      <ShieldCheck />
                    </div>
                    <div className="jaf-flow-node-title">Jackson &amp; Frank</div>
                    <div className="jaf-flow-node-desc">Employs &amp; sponsors NL</div>
                  </div>

                  {/* Check Icon (overlay on second line) */}
                  <div className="jaf-flow-overlay-badge" style={{ left: '66.6%' }}>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500" />
                  </div>

                  {/* Node 3 */}
                  <div className="jaf-flow-node">
                    <div className="jaf-flow-node-circle">
                      <UserCheck />
                    </div>
                    <div className="jaf-flow-node-title">Your hire</div>
                    <div className="jaf-flow-node-desc">Employed in NL</div>
                  </div>
                </div>

                {/* Badge */}
                <div className="jaf-flow-badge-success">
                  <span>✓</span> Compliant in Netherlands
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Global HR */}
          <div className="jaf-block-row-reverse">
            {/* Copy */}
            <div className="jaf-block-col-copy">

              <h2 className="jaf-block-title">
                Manage your global workforce from one place.
              </h2>
              <p className="jaf-block-desc">
                From payroll to leave. Manage talent, perform tasks and absolute privacy, automated for you.
              </p>
              <ul className="jaf-checklist">
                {[
                  {
                    title: "Accurate Dutch payroll",
                    desc: "Flawless local payroll execution, every single month."
                  },
                  {
                    title: "Global benefit delivery",
                    desc: "Approve and manage your workforce from anywhere."
                  },
                  {
                    title: "Continuous local compliance",
                    desc: "We handle all of your visa & tax agreement reporting details."
                  },
                  {
                    title: "All-in-one HR admin",
                    desc: "Expenses, leave tracking, and offboarding automated."
                  }
                ].map((item, i) => (
                  <li key={i} className="jaf-checklist-item">
                    <div className="jaf-badge-orange-check">
                      <Check />
                    </div>
                    <div>
                      <h3 className="jaf-checklist-title">{item.title}</h3>
                      <p className="jaf-checklist-desc">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Visual */}
            <div className="jaf-block-col-visual">
              <div className="jaf-navy-container">
                <div className="jaf-navy-grid">
                  {[
                    { icon: <Banknote />, title: "Dutch Payroll", desc: "Accurate payroll every month." },
                    { icon: <ShieldCheck />, title: "HR Compliance", desc: "Handling compliance issues." },
                    { icon: <CheckCircle2 />, title: "SNA Rating", desc: "Adhering to local staffing standards." },
                    { icon: <UserCheck />, title: "Senior HR Experience", desc: "Trust our experience." },
                  ].map((cell, idx) => (
                    <div key={idx} className="jaf-navy-card">
                      <div className="jaf-navy-icon-circle">
                        {cell.icon}
                      </div>
                      <div className="jaf-navy-card-title">{cell.title}</div>
                      <div className="jaf-navy-card-desc">{cell.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* SECTION 2 — PAIN POINTS */}
      {/* <section className="pt-10 lg:pt-14 pb-12 lg:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              You&apos;ve found the right person. Here is what is stopping you from hiring them.
            </h2>
          </div>

          <div
            ref={painCardsRef}
            onScroll={handlePainScroll}
            className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {painPoints.map((p, i) => {
              const Icon = p.Icon
              return (
                <div
                  key={i}
                  className="snap-center shrink-0 w-full md:w-auto group flex flex-col items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${p.iconWrap}`}>
                    <Icon className={`w-6 h-6 ${p.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">{p.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{p.body}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex md:hidden justify-center gap-2 mt-4 mb-10">
            {painPoints.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to card ${i + 1}`}
                onClick={() => scrollToPainCard(i)}
                className={`h-2 rounded-full transition-all duration-300 ${activePainCard === i ? 'w-6 bg-primary' : 'w-2 bg-slate-300'}`}
              />
            ))}
          </div>

          <div className="hidden md:block mb-10" />

          <div className="bg-[#e8f0fd] rounded-2xl border-l-4 border-[#143369] p-6 sm:p-8 shadow-xs">
            <h4 className="text-[#143369] font-bold text-lg mb-2">That is where we come in.</h4>
            <p className="text-slate-700 font-medium leading-relaxed mb-4 text-sm sm:text-base">
              Jackson &amp; Frank is an IND Recognised Sponsor. You do not need a Dutch entity and you do not need to wait. We handle the sponsorship on your behalf.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#143369] text-sm font-semibold">
              <li>Candidate already in the Netherlands: they can start in 2 to 4 weeks.</li>
              <li>Candidate outside the Netherlands: allow 8 to 12 weeks for full immigration clearance.</li>
            </ul>
          </div>
        </div>
      </section> */}


      {/* SECTION 4 — HOW IT WORKS */}
      <section id="how-it-works" className="jaf-section">
        <div className="jaf-container">
          <div className="jaf-section-header">
            <h2 className="jaf-section-title">
              Here is how we get your hire working in the Netherlands.
            </h2>
            <p className="jaf-section-subtitle">
              We manage every interaction with the Dutch authorities. You provide the candidate details and assign the work.
            </p>
          </div>

          <div className="jaf-step-grid">
            {/* Step 1 */}
            <div className="jaf-step-card">
              <div>
                <span className="jaf-step-number">1</span>
                <h3 className="jaf-step-title">Tell us about your hire.</h3>
                <p className="jaf-step-desc">
                  Share your candidate&apos;s nationality, role, and salary. We confirm eligibility within 24 hours. No commitment required.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="jaf-step-card">
              <div>
                <span className="jaf-step-number">2</span>
                <h3 className="jaf-step-title">We submit the visa application.</h3>
                <p className="jaf-step-desc">
                  As an IND Recognised Sponsor, we submit directly to the Dutch Immigration Authority. Your candidate gets fast-track processing that companies without sponsor status cannot access.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="jaf-step-card">
              <div>
                <span className="jaf-step-number">3</span>
                <h3 className="jaf-step-title">Your hire begins work.</h3>
                <p className="jaf-step-desc">
                  Whether they are already in the Netherlands or relocating from abroad, we handle the IND submission, Entry Visa (MVV) if required, and local registration. You just welcome them to the team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JACKSON & FRANK SECTION */}
      <section className="jaf-section-bg-gray">
        <div className="jaf-container">
          <div className="jaf-section-header">
            <h2 className="jaf-section-title">
              Most companies who come to us have already ruled out opening a Dutch entity.
            </h2>
            <p className="jaf-section-subtitle">
              Here is what that looks like in practice.
            </p>
          </div>

          <div className="jaf-cards-grid-3">
            {/* Card 1 */}
            <div className="jaf-white-card">
              <div>
                <div className="jaf-card-emblem">
                  <Handshake className="w-6 h-6" />
                </div>
                <h3 className="jaf-card-title">
                  Human contact with direct answers.
                </h3>
                <p className="jaf-card-desc">
                  We own our Dutch operations directly. No subcontractors, no support tickets, and no AI bots. When you have a question, you speak directly to your appointed expert to get it solved.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="jaf-white-card">
              <div>
                <div className="jaf-card-emblem">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="jaf-card-title">
                  100% compliant from day one.
                </h3>
                <p className="jaf-card-desc">
                  We hold official IND Recognised Sponsor and NEN-4400 status. While not every EOR can guarantee this, we ensure your candidate&apos;s employment is legally bulletproof with zero grey areas.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="jaf-white-card">
              <div>
                <div className="jaf-card-emblem">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="jaf-card-title">
                  We handle the roadblocks.
                </h3>
                <p className="jaf-card-desc">
                  Dutch immigration is rarely straightforward. When complex edge cases arise or candidates hit visa walls, our local specialists troubleshoot directly with the IND so your team stays completely hands-off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SOCIAL PROOF */}
      <TestimonialsCarousel />


      <FAQSection />





      {/* SECTION 10 — FINAL CTA */}
      <CandidateCTA primaryBtnHref="#hero" onBookCallClick={() => fireContactConversion()} />
      <CampaignFooter />
    </div>
  )
}