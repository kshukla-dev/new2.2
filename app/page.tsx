'use client'
import { BaseSchema } from '@/components/seo/BaseSchema'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import services from '@/data/services.json'
import testimonials from '@/data/testimonials.json'
import { Button } from '@/components/ui/Button'
import { NumberCounter } from '@/components/animations/NumberCounter'
import Image from 'next/image'
import faqs from '@/data/faqs.json'
import blogs from '@/data/blogs.json'
import whyChooseUs from '@/data/why-choose-us.json'
import { SlideIn } from '@/components/animations/SlideIn'
import QuickContactForm from '@/components/sections/QuickContactForm'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { OfficeCarousel } from '@/components/sections/OfficeCarousel'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'

const serviceImageBySlug: Record<string, string> = {
  eor: '/services/service-page/eor.webp',
  immigration: '/services/service-page/immigration.webp',
  payroll: '/services/service-page/payroll.webp',
  compliance: '/services/service-page/compliances.webp',
  contractor: '/services/service-page/contract.webp',
}

const topServices = ((services as any).services ?? []).slice(0, 3).map((s: any) => ({
  ...s,
  image: serviceImageBySlug[s.id] ?? '/services/service-page/about.webp',
}))

const featuredTestimonial = (testimonials as any).testimonials[0]
const topTestimonials = (testimonials as any).testimonials.slice(1, 3)
// Number of real testimonials — used to build the looped (infinite) carousel.
const TESTIMONIAL_COUNT: number = ((testimonials as any).testimonials || []).length

const faqTabs = [
  { id: 'About EOR', icon: 'user' },
  { id: 'Hiring & Onboarding', icon: 'users' },
  { id: 'Payroll & Compliance', icon: 'shield' },
  { id: 'Support & Others', icon: 'headset' }
]

const trustAvatars = [
  '/testimonials/lina.webp',
  '/testimonials/Anya.webp',
  '/testimonials/priya.webp',
]

const countries = [
  'Netherlands', 'Germany', 'United Kingdom', 'France', 'Italy', 'Spain',
  'Belgium', 'Poland', 'Czech Republic', 'India', 'UAE', 'China', 'Hong Kong',
]

const founders = [
  { name: 'Maarten Koekebakker', role: 'Partner', image: '/leadership/Maarten.webp' },
  { name: 'Pawel Michalkiewicz', role: 'Managing Partner', image: '/leadership/pawel2.webp' },
]


const latestBlogs = ((blogs as any).posts || []).slice(0, 4)
const formatBlogDate = (dateStr: string) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function HomePage() {
  // Start in the middle copy of the tripled list so we can loop both ways.
  const [activeIndex, setActiveIndex] = useState(TESTIMONIAL_COUNT)
  // When true, the track jumps without animation (used for the seamless wrap).
  const [noAnim, setNoAnim] = useState(false)
  const [activeTab, setActiveTab] = useState('')
  const [openFaq, setOpenFaq] = useState(0)
  const [openFeatCard, setOpenFeatCard] = useState<number | null>(null)

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

  // Tripled list for a seamless infinite loop (prev copy | real | next copy).
  const loopedTestimonials = useMemo(
    () => [...testimonialsWithMetrics, ...testimonialsWithMetrics, ...testimonialsWithMetrics],
    [testimonialsWithMetrics]
  )

  function prevSlide() {
    setNoAnim(false)
    setActiveIndex(prev => prev - 1)
  }

  function nextSlide() {
    setNoAnim(false)
    setActiveIndex(prev => prev + 1)
  }

  // After the slide animation finishes, if we've scrolled into a clone copy,
  // jump (without animation) back to the equivalent card in the middle copy so
  // the loop is endless with no visible rewind.
  function handleTrackTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    // Ignore transitions bubbling up from the cards — only react to the
    // track's own transform transition.
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (activeIndex >= totalSlides * 2) {
      setNoAnim(true)
      setActiveIndex(activeIndex - totalSlides)
    } else if (activeIndex < totalSlides) {
      setNoAnim(true)
      setActiveIndex(activeIndex + totalSlides)
    }
  }

  // Re-enable the transition on the frame after a no-animation wrap jump.
  useEffect(() => {
    if (!noAnim) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setNoAnim(false))
    )
    return () => cancelAnimationFrame(id)
  }, [noAnim])

  function setSlide(index: number) {
    setNoAnim(false)
    setActiveIndex(totalSlides + index)
  }

  const categorizedFaqs = useMemo(() => {
    const list = (faqs as any).items || []
    return list.map((item: any, idx: number) => {
      let category = 'About EOR'
      if ([1, 4, 6].includes(idx)) category = 'Hiring & Onboarding'
      else if ([3].includes(idx)) category = 'Payroll & Compliance'
      else if ([7].includes(idx)) category = 'Support & Others'
      return { ...item, category }
    })
  }, [])

  const filteredFaqs = useMemo(() => {
    if (!activeTab) return categorizedFaqs
    return categorizedFaqs.filter((q: any) => q.category === activeTab)
  }, [activeTab, categorizedFaqs])

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  return (
    <>
      <BaseSchema />
      <link rel="preload" href="/services/service-page/about2.webp" as="image" fetchPriority="high" />
      <style>{`
/* ============================================================
   HERO
   ============================================================ */
.home-hero {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  margin-top: -76px;
  padding: 164px 0 96px;
  display: block;
  background-color: #0E0F3B;
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: auto;
  overflow: hidden;
  margin-bottom: 20px;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 52%) 100%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/about2.webp);
}

.home-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.home-hero > * {
  position: relative;
  z-index: 1;
}

.home-hero-inner {
  /* Matches the canonical .container (max-w-7xl + px-4 sm:px-6 lg:px-8) so the
     hero content edges line up with the navbar, footer, and every section. */
  max-width: 80rem; /* 1280px = max-w-7xl */
  margin-inline: auto;
  padding-inline: 1rem; /* px-4 */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 48px;
}
@media (min-width: 640px) {
  .home-hero-inner {
    padding-inline: 1.5rem; /* sm:px-6 */
  }
}
@media (min-width: 1024px) {
  .home-hero-inner {
    padding-inline: 2rem; /* lg:px-8 */
  }
}

.home-hero .service-hero-copy {
  max-width: 720px;
  /* animation removed in favor of global stagger */
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.home-hero h1 {
  padding-top: 8rem;
}
.home-hero h1 em {
  font-style: italic;
  color: #F7931E;
}

.home-hero .service-hero-lede {
  color: rgba(255, 255, 255, 0.82);
  text-shadow: none;
  font-size: 19px;
  margin-top: 24px;
  max-width: 520px;
  line-height: 1.6;
}

.home-hero .cta-row {
  display: flex;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
}
@media (max-width: 640px) {
  .home-hero .cta-row {
    flex-direction: column;
    width: 100%;
  }
  .home-hero .btn-primary, .home-hero .btn-secondary {
    width: 100%;
    text-align: center;
  }
}

.home-hero .btn-primary {
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 999px;
  background: #F7931E;
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.4);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.home-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.5);
}

.home-hero .btn-secondary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.home-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255,255,255,0.7);
}

.home-hero .hero-features-inline {
  display: flex;
  gap: 24px; /* s-6 */
  flex-wrap: wrap;
}
.home-hero .hf-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
}
.home-hero .hf-item svg {
  color: #7FCDEE;
}

.home-hero .hero-trust {
  border-top: 1px solid rgba(255,255,255,0.15);
  margin-bottom: 46px;

  }
.home-hero .hero-trust-label {
  display: block;
  /* Design system: eyebrow 13px / 600 / tracking 0.08em / uppercase */
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
  margin-top: 12px;
}
.home-hero .hero-trust-logos {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.home-hero .ht-logo {
  font-family: var(--sans);
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  opacity: 0.35;
  letter-spacing: -0.03em;
  transition: opacity 0.3s;
}
.home-hero .ht-logo:hover {
  opacity: 0.75;
}

@media (max-width: 1440px) {
  .home-hero {
    /* MULTIPLIER FIX: Fixed pixel size for laptop */
    background-size: 100vw auto;
    background-position: right max(0px, calc(50vw - 864px)) center;
    margin-bottom:0px;
  }
}
@media (max-width: 1280px) {
  .home-hero {
    /* MULTIPLIER FIX: Fixed pixel size for smaller laptops */
    background-size: 100vw auto;
    /* Allow it to bleed off slightly by subtracting 40px */
    background-position: right calc(max(0px, calc(50vw - 864px)) - 40px) center;
  }
}
@media (max-width: 1024px) {
  .home-hero {
    /* MULTIPLIER FIX: Fixed pixel size for tablet */
    background-size: 100vw auto;
    background-position: right calc(max(0px, calc(50vw - 864px)) - 60px) center;
  }
}
@media (max-width: 960px) {
  .home-hero-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
  }
  .home-hero {
    padding: 148px 24px 72px;
    background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 0%) 100%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/about2.webp);
    background-size: cover;
    background-position: center 35%;

  }
}
@media (max-width: 640px) {
  .home-hero {
    min-height: auto;
    padding: 336px 20px 64px;
    background-image: none;
    background-color: #0E0F3B;
    margin-top: -20px;
  }
  .home-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/about2.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
    pointer-events: none;
  }
  .home-hero h1 {
    /* font-size handled by the single fluid clamp above (no breakpoint jump) */
    margin-top:6rem;
  }
  .home-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .home-hero .btn-primary,
  .home-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

/* ============================================================
   INTRO BLURB
   ============================================================ */
.intro-blurb {
  padding-block: 20px 60px;
  display: flex;
  justify-content: center;
  text-align: center;
}
.intro-blurb p {
  font-family: var(--serif);
  font-size: 28px;
  line-height: 1.35;
  color: var(--ink);
  /* Fill the aligned container so the blurb's edges match the navbar and the
     rest of the page instead of sitting inset as a narrower centered block. */
  max-width: 100%;
  font-weight: 500;
}
.intro-blurb p em {
  font-style: italic;
  color: var(--accent);
}

/* ============================================================
   BRAND STRIP
   ============================================================ */
.brand-strip {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 24px 0;
  background: var(--bg);
  overflow: hidden;
}
.brand-strip-inner {
  display: flex;
  align-items: center;
  gap: 40px;
  /* Matches the canonical .container so the trusted-companies strip lines up. */
  max-width: 80rem; /* 1280px = max-w-7xl */
  margin-inline: auto;
  padding-inline: 1rem; /* px-4 */
}
@media (min-width: 640px) {
  .brand-strip-inner {
    padding-inline: 1.5rem; /* sm:px-6 */
  }
}
@media (min-width: 1024px) {
  .brand-strip-inner {
    padding-inline: 2rem; /* lg:px-8 */
  }
}
.brand-label {
  font-size: 16px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  flex-shrink: 0;
  font-weight: 800;
}

/* === Infinite marquee === */
.marquee {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.marquee-track {
  display: flex;
  align-items: center;
  gap: 48px;
  padding-right: 48px;
  flex-shrink: 0;
  min-width: max-content;
  animation: marquee-scroll 32s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
.brand-logo {
  font-family: var(--serif);
  font-style: italic;
  font-size: 20px;
  color: var(--ink-muted);
  opacity: 0.75;
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
  .marquee {
    overflow-x: auto;
    -webkit-mask-image: none;
    mask-image: none;
  }
}

/* ============================================================
   FOUNDATIONS / SERVICES (image cards)
   ============================================================ */
.foundations-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  gap: 20px;
  flex-wrap: wrap;
}
.foundations-head-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.foundations-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.foundations-subtitle {
  font-size: 18px;
  color: var(--ink-muted);
  line-height: 1.5;
  max-width: 600px;
  margin-top: 8px;
  font-weight: 500;
}
.foundations-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1.5px solid var(--ink);
  border-radius: 999px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
}
.foundations-cta:hover {
  background: var(--ink);
  color: #fff;
}
.foundations-cta svg {
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
}
.foundations-cta:hover svg {
  transform: translateX(3px);
}
.foundations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.foundation-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
  padding: 28px;
  color: white;
  text-decoration: none;
  background-size: cover;
  background-position: center;
  isolation: isolate;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.foundation-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, rgb(10 15 50 / 70%) 0%, rgb(10 15 50 / 94%) 40%, rgba(10, 15, 50, 0.92) 100%);
  transition: background 0.3s;
}
.foundation-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.25);
}
.foundation-card:hover::after {
  background: linear-gradient(
    180deg,
    rgba(2, 5, 25, 0.55) 0%,
    rgba(10, 15, 50, 0.75) 45%,
    rgba(10, 15, 50, 0.98) 100%
  );
}
.foundation-card-body {
  max-width: 300px;
}
.foundation-card-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    background:linear-gradient(281deg, #b8b9c400 0%, #0e0f3b 100%);
    border-radius: 999px;
    padding: 7px 14px 7px 7px;
    box-shadow: 0 4px 14px rgb(43 46 75);
}
.foundation-card-eyebrow.bottom-eyebrow {
  align-self: flex-start;
  margin-bottom: 0;
  background: linear-gradient(281deg, rgba(14, 15, 59, 0.7) 0%, #0e0f3b 100%);
  transition: transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}
.foundation-card:hover .foundation-card-eyebrow.bottom-eyebrow {
  transform: translateY(-2px);
  background: linear-gradient(281deg, rgba(20, 22, 85, 0.9) 0%, #16185c 100%);
  box-shadow: 0 8px 20px rgba(14, 15, 59, 0.45);
}
.eyebrow-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.eyebrow-icon svg {
  width: 15px;
  height: 15px;
  color: white;
}
.eyebrow-text {
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
  text-shadow: none;
}
.foundation-card h3 {
  font-family: var(--serif);
  font-size: 34px;
  line-height: 1.15;
  font-weight: 500;
  margin-bottom: 12px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  min-height: 80px;
  display: flex;
  align-items: flex-end;
}
.card-golden-line {
  width: 36px;
  height: 3px;
  background: linear-gradient(90deg, #f39c12, #f1c40f);
  border-radius: 2px;
  margin-bottom: 14px;
  display: block;
}
.foundation-card p {
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  font-weight: 500;
}
.card-btn {
  align-self: flex-start;
  background: white;
  color: var(--ink);
  border-radius: 999px;
  padding: 11px 20px;
  font-size: 13.5px;
  font-weight: 500;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  transition: gap 0.2s, background 0.2s;
}
.foundation-card:hover .card-btn {
  gap: 12px;
}

/* ============================================================
   STRUCTURE / ABOUT US
   ============================================================ */

.sa-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 20px;
}
.sa-title {
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  
  color: var(--ink);
  margin-bottom: 24px;
}
.sa-highlight {
  color: var(--accent);
}
.sa-body {
  color: var(--ink-soft);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
  max-width:700px;
  font-weight: 500;
}
.sa-cta-row {
  display: flex;
  align-items: center;
  justify-content: end;
}
.sa-btn-story {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
  transition: opacity 0.2s;
}
.sa-btn-story:hover {
  opacity: 0.8;
}
.sa-play-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sa-right {
  position: relative;
  border-radius: 24px;
  overflow: visible;
  padding-bottom: 40px;
}
.sa-img-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: 20px;
  background: var(--bg-card);
}
.sa-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}
.sa-stats-pill {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 20px 40px -12px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  padding: 24px 40px;
  gap: 40px;
  width: max-content;
  z-index: 2;
  border: 1px solid #80808082;
}
.sa-stat {
  display: flex;
  align-items: center;
  gap: 16px;
}
.sa-stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
}
.sa-stat strong {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.1;
  margin-bottom: 4px;
}
.sa-stat-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: var(--ink);
}
.sa-stat-sub {
  display: block;
  font-size: 11px;
  color: var(--ink-muted);
}
.sa-stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

.sa-features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 24px;
}
.sa-feat-card {
  background: #ffffff66;
  border: 1px solid #8080808c;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
  align-items: flex-start;
  height:100%;
  font-weight: 500;
}
  .structure-body{
  font-weight: 500;
  
  }
.sa-feat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.08);
}
.sa-feat-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
.sa-feat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sa-feat-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.3;
  margin: 0;
}
.sa-feat-toggle {
  display: none;
}
.sa-feat-body p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 1100px) {
  .structure-about { grid-template-columns: 1fr; }
  .sa-features-grid { grid-template-columns: 1fr 1fr; }
  .sa-right { padding-bottom: 0; }
  .sa-stats-pill {
    position: static;
    transform: none;
    width: 100%;
    margin-top: 24px;
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 24px 32px;
    gap: 24px;
  }
  .sa-stat-divider {
    width: 1px;
    height: 40px;
    background: var(--border);
  }
}

@media (max-width: 640px) {
  .sa-stats-pill {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    padding: 24px;
  }
  .sa-stat-divider {
    width: 100%;
    height: 1px;
    background: var(--border);
  }
}
@media (max-width: 650px) {
  .sa-features-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .sa-feat-card {
    padding: 20px;
    gap: 16px;
    cursor: pointer;
  }
  .sa-feat-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .sa-feat-icon {
    width: 36px;
    height: 36px;
  }
  .sa-feat-icon svg {
    width: 18px;
    height: 18px;
  }
  .sa-feat-title {
    font-size: 15px;
    flex-grow: 1;
    text-align: left !important;
  }
  .sa-feat-toggle {
    display: flex;
    background: none;
    border: none;
    padding: 0;
    color: var(--ink);
    cursor: pointer;
    transition: transform 0.3s ease;
    align-items: center;
    justify-content: center;
  }
  .sa-feat-card.is-open .sa-feat-toggle {
    transform: rotate(180deg);
  }
  .sa-feat-body {
    display: none;
    width: 100%;
    margin-top: 4px;
  }
  .sa-feat-card.is-open .sa-feat-body {
    display: block;
  }
}

/* ============================================================
   STAKES
   ============================================================ */
.stakes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.stakes-img-wrap {
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.25);
}
.stakes-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.quote-card {
  margin-top: 32px;
  padding: 24px;
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border);
}
.stars {
  color: var(--accent);
  letter-spacing: 2px;
  font-size: 14px;
  margin-bottom: 10px;
}
.quote-card blockquote {
  font-family: var(--serif);
  font-size: 19px;
  line-height: 1.45;
  margin-bottom: 16px;
}
.quote-author {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}
.quote-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

/* ============================================================
   DARK CTA
   ============================================================ */
.cta-section {
  padding: 60px 0 100px;
  position: relative;
}
.cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 0% 50%, rgba(255, 180, 100, 0.25), transparent 50%),
    radial-gradient(ellipse at 100% 50%, rgba(220, 100, 150, 0.2), transparent 50%);
  z-index: -1;
}
.cta-block {
  background: #ffffff;
  color: var(--ink);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: 0 20px 50px rgba(20, 51, 105, 0.06);
  padding: 60px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.cta-tag {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
  display: block;
}
.cta-block h2 {
  font-family: var(--serif);
  font-size: clamp(32px, 3.5vw, 44px);
  line-height: 1.1;
  
  margin-bottom: 20px;
}
.cta-block h2 em {
  font-style: italic;
  color: var(--accent);
}
.cta-block p {
  color: var(--ink-soft);
  margin-bottom: 28px;
  max-width: 420px;
  line-height: 1.65;
}
.cta-block :deep(.btn-primary) {
  background: var(--accent);
  color: white;
}
.cta-block :deep(.btn-primary:hover) {
  background: #0c2145;
}
.cta-founders {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.cta-founder {
  margin: 0;
}
.cta-founder-photo {
  aspect-ratio: 4 / 5;
  border-radius: var(--radius);
  overflow: hidden;
  position: relative;
  background: var(--accent-soft);
}
.cta-founder-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s;
}
.cta-founder:hover .cta-founder-photo img {
  transform: scale(1.04);
}
.cta-founder figcaption {
  margin-top: 14px;
}
.cta-founder figcaption strong {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
}
.cta-founder figcaption span {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

/* ============================================================
   TESTIMONIALS (CAROUSEL SLIDER)
   ============================================================ */
.testimonials-section {
  padding: 60px 0;
  background: var(--bg);
  overflow: hidden;
  position: relative;
}
.testimonials-section.section-alt {
  background: #f4f6f9;
}
.testimonials-head-wrap {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.testimonials-eyebrow {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 20px;
}
.testimonials-eyebrow::before,
.testimonials-eyebrow::after {
  content: '';
  display: inline-block;
  width: 30px;
  height: 1px;
  background: var(--border);
}
.quote-icon-top {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
}
.testimonials-title {
  font-family: var(--serif);
  font-size: clamp(36px, 4.5vw, 48px);
  line-height: 1.1;
  color: var(--ink);
  margin-bottom: 20px;
}
.testimonials-title span {
  color: var(--accent);
  position: relative;
  display: inline-block;
}
.testimonials-title span::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 4px;
  background: url("data:image/svg+xml,%3Csvg width='100' height='6' viewBox='0 0 100 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4.5C30 1.5 70 1.5 99 4.5' stroke='%23143369' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat center bottom;
  background-size: 100% 100%;
}
.testimonials-subtitle {
  color: var(--ink-soft);
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
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
  background: #e8eef900;
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
.cc-stars {
  color: #fbbf24;
  font-size: 14px;
  margin-bottom: 18px;
  letter-spacing: 2px;
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

.endorsement-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
  font-size: 14px;
  color: var(--ink-soft);
  font-weight: 500;
}
.endorsement-row strong {
  color: var(--accent);
  font-weight: 700;
}
.laurel-icon {
  color: var(--accent);
  opacity: 0.8;
}

.hero-pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.hero-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}
.hero-pill:hover {
  background: var(--accent-warm);
  border-color: var(--accent-warm);
  color: white;
  transform: translateY(-1px);
}
/* ============================================================
   BLOG - featured + side list layout
   ============================================================ */
.blog-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 28px;
  align-items: start;
}

/* Featured (big card on left) */
.blog-featured {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  color: inherit;
  text-decoration: none;
}
.blog-featured:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 30px 60px -25px rgba(0, 0, 0, 0.2);
}
.blog-featured-img {
  aspect-ratio: 16 / 10;
  background-size: cover;
  background-position: center;
  background-color: var(--accent-soft);
}
.blog-featured-body {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.blog-featured-eyebrow {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}
.blog-card-meta {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.blog-featured h3 {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 32px);
  line-height: 1.15;
  font-weight: 400;
  letter-spacing: -0.01em;
}
.blog-featured p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-featured-foot {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.blog-featured-cta {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.2s;
}
.blog-featured:hover .blog-featured-cta {
  gap: 10px;
}

/* Side list (compact rows on the right) */
.blog-side {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.blog-row {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.blog-row:hover {
  transform: translateX(2px);
  border-color: var(--accent);
  box-shadow: 0 12px 28px -16px rgba(0, 0, 0, 0.18);
}
.blog-row-img {
  aspect-ratio: 1 / 1;
  background-size: cover;
  background-position: center;
  background-color: var(--accent-soft);
}
.blog-row-body {
  padding: 12px 14px 12px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
}
.blog-row h4 {
  font-family: var(--serif);
  font-size: 16px;
  line-height: 1.25;
  font-weight: 400;
  color: var(--ink);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-card-date {
  font-size: 12px;
  color: var(--ink-muted);
}

/* ============================================================
   FAQ
   ============================================================ */
.faq-head {
  text-align: center;
  margin-bottom: 48px;
}
.faq-list {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.faq-item {
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}
.faq-q {
  width: 100%;
  text-align: left;
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  background: transparent;
  font-family: var(--sans);
  color: var(--ink);
  gap: 16px;
}
.faq-chevron {
  transition: transform 0.3s ease;
  flex-shrink: 0;
  color: var(--ink);
}
.faq-chevron.open {
  transform: rotate(180deg);
}
.faq-a {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  padding: 0;
  color: var(--ink-soft);
  font-size: 14px;
  line-height: 1.65;
}
.faq-item.open .faq-a {
  max-height: 400px;
  padding-bottom: 24px;
}

/* ============================================================
   BEGIN
   ============================================================ */
.begin-head {
  margin-bottom: 40px;
}
.begin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.begin-card {
  border-radius: var(--radius-lg);
  padding: 44px;
  aspect-ratio: 4 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}
.begin-card.dark {
  background: var(--dark);
  color: var(--bg);
}
.begin-card.warm {
  background:
    radial-gradient(circle at 30% 30%, #f4d4c4 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, #e8b8d8 0%, transparent 50%),
    linear-gradient(135deg, #d4a896 0%, #c89aa8 100%);
  color: var(--ink);
}
.begin-icon {
  font-size: 28px;
  margin-bottom: 18px;
}
.begin-card h3 {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 34px);
  line-height: 1.1;
  font-weight: 400;
  max-width: 340px;
}
.begin-card h3 em {
  font-style: italic;
}
.begin-foot {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
}
.begin-foot p {
  font-size: 13px;
  max-width: 280px;
  opacity: 0.75;
  line-height: 1.55;
}
.begin-card.dark :deep(.btn-primary) {
  background: var(--bg);
  color: var(--ink);
}
.begin-card.warm :deep(.btn-primary) {
  background: var(--ink);
  color: var(--bg);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 900px) {
  .hero,
  .intro-blurb,
  .structure,
  .stakes,
  .cta-block,
  .begin-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .intro-blurb {
    padding: 40px;
    gap: 20px;
  }
  .intro-blurb p {
    grid-column: 1;
    font-size: clamp(18px, 4vw, 22px);
    line-height: 1.45;
  }
  .foundations-grid,
  .testimonials-grid,
  .blog-layout {
    grid-template-columns: 1fr;
  }
  .blog-row {
    grid-template-columns: 96px 1fr;
  }
  .brand-strip-inner {
    flex-direction: column;
    gap: 16px;
    padding: 0 16px;
  }
  .cta-block {
    padding: 40px 28px;
  }
  .begin-card {
    padding: 28px;
    aspect-ratio: auto;
    min-height: 280px;
  }
  .structure-features {
    grid-template-columns: 1fr 1fr;
  }
  /* Image sits below copy on mobile - cap height + keep cards on the edges */
  .structure-visual {
    aspect-ratio: 16 / 12;
    max-width: 520px;
  }
}
@media (max-width: 480px) {
  .floating-card {
    font-size: 12px;
    padding: 10px 14px;
  }
}

/* Light Map UI Adjustments */
.ge-map-svg-wrap {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: none !important; /* Remove dark box shadow */
  border: none !important;
  background: transparent;
}

.ge-world-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  filter: brightness(0) saturate(100%) invert(15%) sepia(91%) saturate(1637%) hue-rotate(206deg) brightness(93%) contrast(101%);
  opacity: 0.9;
}

/* Hide the dark overlays since we now use a light map */
.ge-map-overlay-left, .ge-map-overlay-bottom {
  display: none !important;
}

/* Make stats bar sleek and light for the new map */
.ge-map-stats {
  background: rgba(255, 255, 255, 0.8) !important;
  border: 1px solid rgba(9, 64, 123, 0.2) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.ge-map-stat strong {
  color: var(--ink) !important;
}

.ge-map-stat span {
  color: var(--ink-soft) !important;
  font-weight: 600;
}

.ge-map-stat-divider {
  background: rgba(9, 64, 123, 0.2) !important;
}

/* Improve floating cards to match new map */
.ge-float-card {
  box-shadow: 0 8px 24px rgba(9, 64, 123, 0.15) !important;
  border: 1px solid rgba(9, 64, 123, 0.1) !important;
}

/* Refine dots */
.map-dot-label {
  background: rgba(255, 255, 255, 0.9) !important;
  color: var(--ink) !important;
  border: 1px solid rgba(9, 64, 123, 0.2);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* =======================================
   Restored Map Visual CSS
   ======================================= */
.ge-map-visual {
  position: relative;
  height: 480px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ge-map-svg-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: transparent;
}

.ge-world-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  filter: brightness(0) saturate(100%) invert(15%) sepia(91%) saturate(1637%) hue-rotate(206deg) brightness(93%) contrast(101%);
  opacity: 0.9;
}

/* Stats Bar */
.ge-map-stats {
  position: absolute;
  bottom: -32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 32px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  padding: 16px 32px;
  border-radius: 99px;
  border: 1px solid rgba(9, 64, 123, 0.2);
  box-shadow: 0 10px 40px rgba(9, 64, 123, 0.1);
  z-index: 10;
  white-space: nowrap;
}

.ge-map-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ge-map-stat strong {
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1;
}

.ge-map-stat span {
  font-size: 13px;
  color: var(--ink-soft);
  font-weight: 500;
}

.ge-map-stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(9, 64, 123, 0.2);
}

.ge-fc-img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}

/* Custom Pulsing Markers & Floating Hover Cards */
.ge-marker {
  position: absolute;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
}

.ge-marker-dot {
  width: 12px;
  height: 12px;
  background: var(--accent-warm); /* theme orange */
  border-radius: 50%;
  border: 2.5px solid white;
  box-shadow: 0 0 12px var(--accent-warm);
  position: relative;
  z-index: 2;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.ge-marker:hover .ge-marker-dot {
  background: var(--accent); /* turn brand blue on hover */
  transform: scale(1.2);
}

.ge-marker-pulse {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--accent-warm);
  animation: ge-marker-pulse 2s infinite;
  z-index: 1;
  pointer-events: none;
}

@keyframes ge-marker-pulse {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(1.8); opacity: 0; }
}

.ge-float-card {
  position: absolute;
  bottom: 40px; /* float above the marker */
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 12px 32px rgba(9, 64, 123, 0.2);
  border: 1px solid rgba(9, 64, 123, 0.15);
  z-index: 30;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ge-marker:hover .ge-float-card {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
  width: max-content;
  min-width: 160px;
}

.ge-float-card div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ge-float-card strong {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
}

.card-nl { top: 28%; left: 44%; }
.card-de { top: 31%; left: 47%; }
.card-pl { top: 26%; left: 49%; }
.card-in { top: 50%; left: 64%; }
.card-cn { top: 33%; left: 74%; }

.ge-popular-dest {
  position: absolute;
  top: 24px;
  right: 24px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 240px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.08);
  z-index: 10;
}

.ge-popular-dest h5 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--ink);
}

.ge-popular-dest ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ge-popular-dest li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--ink-soft);
}

.ge-popular-dest .flag {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ge-popular-dest .flag img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ge-link {
  display: inline-block;
  font-size: 13px;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

.ge-link:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .ge-map-visual {
    display: none;
  }
}

/* =======================================
   Featured Report Card Enhancements
   ======================================= */
.featured-report-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  transition: transform 0.4s ease;
  cursor: pointer;
  background: #0a1223;
}

.featured-report-card:hover {
  transform: translateY(-8px);
}

.frc-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  transition: transform 1s ease;
  opacity: 0.3;
}

.featured-report-card:hover .frc-bg {
  transform: scale(1.05);
  opacity: 0.3;
}

.frc-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to top, rgba(10, 18, 35, 0.95) 0%, rgba(10, 18, 35, 0.6) 50%, rgba(10, 18, 35, 0) 100%);
  z-index: 1;
}

.frc-content {
  position: relative;
  z-index: 2;
  padding: 40px;
  color: white;
}

.frc-badge {
  display: inline-block;
  background: var(--accent);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
}

.frc-content h3 {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 32px);
  line-height: 1.2;
  margin-bottom: 16px;
}

.frc-content h3 .highlight {
  color: #7FCDEE; /* Golden accent matching the theme */
  background: transparent;
  padding: 0;
}

.frc-content p {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  max-width: 90%;
  margin-bottom: 24px;
}

.frc-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.frc-link .arrow {
  transition: transform 0.2s;
}

.featured-report-card:hover .frc-link .arrow {
  transform: translateX(4px);
}


/* ============= LATEST INSIGHTS & RESOURCES ============= */
.resources-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.resources-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}
.rh-left .sa-tag {
  margin-bottom: 16px;
}
.rh-left h2 {
  margin-bottom: 0px;
}
.rh-right {
  padding-bottom: 10px;
}

@media (max-width: 768px) {
  .resources-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .rh-right {
    padding-bottom: 0;
  }
}

.resources-top-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
}

@media (max-width: 992px) {
  .resources-top-grid {
    grid-template-columns: 1fr;
  }
}

.featured-report-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;
  color: white;
}

.frc-bg::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to top, rgba(20, 40, 70, 0.95) 0%, rgba(20, 40, 70, 0.7) 40%, rgba(20, 40, 70, 0.1) 100%);
}

.frc-content {
  position: relative;
  z-index: 2;
  max-width: 480px;
}

.frc-tag {
  display: inline-block;
  background: var(--accent);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(9, 64, 123, 0.3);
}

.frc-content h3 {
  font-size: clamp(22px, 4vw, 32px);
  line-height: 1.3;
  margin-bottom: 14px;
  font-family: var(--serif);
  color: white;
}

.frc-content h3 .highlight {
  padding: 4px 8px;
  margin-left: -8px;
  border-radius: 4px;
  display: inline-block;
  color: white;
}

.frc-content p {
  font-size: 16px;
  color: rgba(255,255,255,0.85);
  margin-bottom: 30px;
  line-height: 1.5;
}

.frc-dots {
  position: absolute;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 8px;
  z-index: 2;
}

.frc-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: all 0.3s ease;
}
.frc-dots .dot.active {
  background: white;
  width: 24px;
  border-radius: 4px;
}

.latest-articles-card {
  background: #ffffff78;
  border-radius: 20px;
  border: 1px solid #dcdfe4;
  box-shadow: 0 8px 30px -10px rgba(0,0,0,0.08);
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.lac-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left:1rem;
}
.lac-header h4 {
  font-size: 20px;
  color: var(--ink);
  margin: 0;
  font-weight: 700;
}
.lac-view-all {
  font-size: 14px;
  color: var(--accent);
  font-weight: 600;
  padding-right:1rem;
}
.lac-view-all:hover {
  text-decoration: underline;
}

.lac-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.article-item {
  display: flex;
  gap: 20px;
  align-items: center;
  text-decoration: none;
  padding: 16px;
  border-radius: 12px;
  transition: background 0.2s;
  border-bottom: 1px solid #1a1a1a29;
}
.article-item:hover {
  background: #f8fafc;
}

.article-tag {
  display: inline-block;
  background: #f4f7fe;
  color: var(--accent);
  border: 1px solid #e0e7ff;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--ink-soft);
  font-size: 12px;
  margin-top: 6px;
}

.theme-tag {
  display: inline-block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--ink-soft);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.frc-btn {
  background: white !important;
  color: var(--ink) !important;
  display: inline-flex !important;
  align-items: center;
  gap: 8px;
}
.frc-btn:hover {
  background: #f8fafc !important;
}
.article-item:hover {
  background: #f8fafc;
}

.article-thumb {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}

.article-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.article-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--accent);
  margin-bottom: 6px;
}

.article-info h5 {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  margin: 0 0 8px 0;
  line-height: 1.3;
  transition: color 0.2s;
}
.article-item:hover .article-info h5 {
  color: var(--accent);
}

.article-meta {
  font-size: 13px;
  color: var(--ink-soft);
}

.resources-bottom-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 992px) {
  .resources-bottom-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 576px) {
  .resources-bottom-grid {
    grid-template-columns: 1fr;
  }
}

.resource-category-card {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px 24px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 280px;
}
.resource-category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -10px rgba(0,0,0,0.1);
}

.rcc-bg {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 92%;
  background-size: cover;
  background-position: center;
  z-index: 1;
}
.rcc-bg-fade {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 2;
}

.rcc-content-wrap {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-weight: 500;
}

.rcc-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: white;
}
.rcc-icon svg {
  width: 20px;
  height: 20px;
}

.rcc-content-wrap h4 {
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 12px 0;
  line-height: 1.25;
}

.rcc-content-wrap p {
  font-size: 13px;
  color: var(--ink-soft);
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.rcc-link {
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
}

/* Card Themes */
.rcc-blue { background-color: #f4f7fe; border-color: #e2e8f0; }
.rcc-blue .rcc-bg-fade { background: linear-gradient(to right, #f4f7fe 30%, rgba(244,247,254,0.85) 50%, rgba(244,247,254,0) 100%); }
.rcc-blue .rcc-icon { background-color: var(--dark); }
.rcc-blue .rcc-link { color: var(--accent); }

.rcc-green { background-color: #f0fcf5; border-color: #e2e8f0; }
.rcc-green .rcc-bg-fade { background: linear-gradient(to right, #f0fcf5 30%, rgba(240,252,245,0.85) 50%, rgba(240,252,245,0) 100%); }
.rcc-green .rcc-icon { background-color: #316552; }
.rcc-green .rcc-link { color: #316552; }

.rcc-purple { background-color: #f9f5ff; border-color: #e2e8f0; }
.rcc-purple .rcc-bg-fade { background: linear-gradient(to right, #f9f5ff 30%, rgba(249,245,255,0.85) 50%, rgba(249,245,255,0) 100%); }
.rcc-purple .rcc-icon { background-color: #5b21b6; }
.rcc-purple .rcc-link { color: #5b21b6; }

.rcc-orange { background-color: #fdf8f3; border-color: #e2e8f0; }
.rcc-orange .rcc-bg-fade { background: linear-gradient(to right, #fdf8f3 30%, rgba(253,248,243,0.85) 50%, rgba(253,248,243,0) 100%); }
.rcc-orange .rcc-icon { background-color: #9c7144; }
.rcc-orange .rcc-link { color: #9c7144; }

.resources-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px 0 0 0;
  border-top: 1px solid var(--border);
  color: var(--ink-soft);
  font-size: 14px;
  margin-top: 8px;
}

.more-resources-banner {
  border-radius: 16px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  border: 1px solid #80808040;
}
.mrb-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.mrb-icon svg {
  width: 28px;
  height: 28px;
}
.mrb-content {
  flex-grow: 1;
}
.mrb-content h4 {
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 4px 0;
}
.mrb-content p {
  font-size: 14px;
  color: var(--ink-soft);
  margin: 0;
}
.mrb-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
@media (max-width: 768px) {
  .more-resources-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }
  .featured-report-card {
    min-height: 320px;
    padding: 24px;
    display:none;
  }
  .frc-content h3 {
    font-size: 26px;
  }
  .frc-content p {
    font-size: 15px;
    margin-bottom: 24px;
  }
  .latest-articles-card {
    padding: 24px;
  }
  .resource-category-card {
    min-height: 220px;
    padding: 24px;
  }
  .article-thumb {
    width: 64px;
    height: 64px;
  }
}
/* =============================
   FAQ SECTION
============================== */
.faq-section {
  --faq-blue: var(--accent); /* Website's primary accent color */
  --faq-bg: #f8f9fc;
  --faq-border: #eef1f6;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}
.faq-header {
  text-align: center;
  margin-bottom: 40px;
}
.faq-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid var(--faq-border);
  color: var(--faq-blue);
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}
.faq-badge svg {
  width: 16px;
  height: 16px;
  color: var(--faq-blue);
}
.faq-title {
  font-family: var(--serif);
  font-size: clamp(32px, 4vw, 48px);
  color: var(--ink);
  margin-bottom: 16px;
}
.faq-title span {
  color: var(--faq-blue);
  position: relative;
  display: inline-block;
}
.faq-title span::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 4px;
  background: url("data:image/svg+xml,%3Csvg width='100' height='6' viewBox='0 0 100 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4.5C30 1.5 70 1.5 99 4.5' stroke='%23143369' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat center bottom;
  background-size: 100% 100%;
}
.faq-subtitle {
  color: #64748b;
  font-size: 16px;
}

.faq-tabs-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
}
.faq-tabs {
  display: inline-flex;
  background: rgba(20, 51, 105, 0.06); /* Theme's soft accent */
  padding: 6px;
  border-radius: 999px;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
}
.faq-tab {
  background: transparent;
  border: none;
  color: var(--ink-soft);
  padding: 10px 24px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: none;
}
.faq-tab:hover {
  color: var(--accent);
}
.faq-tab.active {
  background: white;
  color: var(--accent);
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.faq-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
}
.faq-item {
  display: block;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  overflow: hidden;
  border: 1px solid var(--faq-border);
  transition: all 0.3s;
}
.faq-item.is-open {
  border-color: var(--faq-border);
}
.faq-question {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  user-select: none;
}
.faq-icon {
  color: var(--faq-blue);
  background: transparent;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 20px;
}
.faq-icon svg {
  width: 22px;
  height: 22px;
}
.faq-question h3 {
  font-size: 18px;
  font-weight: 500;
  color: var(--ink);
  flex: 1;
  margin: 0;
}
.faq-toggle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.3s;
  background: transparent;
}
.faq-toggle svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s;
}
.faq-item.is-open .faq-toggle {
  background: white;
  border-color: var(--faq-blue);
  color: var(--faq-blue);
}
.faq-item.is-open .faq-toggle svg {
  transform: rotate(180deg);
}
.faq-answer-wrapper {
  padding: 0 24px 24px 80px;
  font-weight: 500;
}
.faq-answer-simple {
  padding: 0;
}
.faq-answer-simple p {
  color: #475569;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

.faq-support-card {
  background: var(--faq-bg);
  border-radius: 12px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  border: 1px solid var(--faq-border);
}
.fsc-left {
  display: flex;
  align-items: center;
  gap: 20px;
}
.fsc-icon {
  width: 56px;
  height: 56px;
  background: rgba(20, 51, 105, 0.06);
  color: var(--faq-blue);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fsc-icon svg {
  width: 28px;
  height: 28px;
}
.fsc-text h4 {
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 4px;
}
.fsc-text p {
  color: #64748b;
  font-size: 14px;
  margin: 0;
}
.fsc-btn {
  background: var(--faq-blue);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}
.fsc-btn:hover {
  background: #1459c7;
}

.faq-trust-strip {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding-top: 32px;
  flex-wrap: wrap;
}
.fts-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
}
.fts-item svg {
  width: 20px;
  height: 20px;
  color: var(--faq-blue);
}

@media (max-width: 768px) {
  .faq-tabs-wrapper {
    justify-content: flex-start;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    padding: 4px 20px;
    margin-left: -20px;
    margin-right: -20px;
    scrollbar-width: none;
  }
  .faq-tabs-wrapper::-webkit-scrollbar {
    display: none;
  }
  .faq-tabs {
    flex-wrap: nowrap;
    white-space: nowrap;
    margin: 0 auto;
  }
  .faq-tab {
    flex-shrink: 0;
    padding: 8px 18px;
    font-size: 14px;
  }
  .faq-support-card {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }
  .fsc-left {
    flex-direction: column;
  }
  .faq-trust-strip {
    gap: 24px;
    flex-direction: column;
  }
  .faq-answer-wrapper {
    padding: 0 16px 20px 68px;
  }
  .faq-question {
    padding: 16px;
  }
  .faq-icon {
    margin-right: 16px;
  }
}

/* =============================
   GLOBAL EXPANSION
============================== */
.ge-section {
  background: var(--bg);
  color: var(--ink);
  padding: 48px 0;
  overflow: hidden;
  position: relative;
  margin-top: 40px;
}
.ge-section::before {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-image: radial-gradient(circle at 70% 30%, var(--accent-soft) 0%, transparent 60%);
  pointer-events: none;
}
.ge-inner {
  position: relative;
  z-index: 2;
}
.ge-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
  align-items: center;
}
.ge-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--ink-soft);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 24px;
}
.ge-title {
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1.1;
  margin-bottom: 24px;
  font-family: var(--serif);
}
.ge-highlight {
  color: var(--accent);
}
.ge-subtitle {
  font-size: 18px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 480px;
  font-weight: 500;
}
.ge-cta {
  display: flex;
  gap: 16px;
  align-items: center;
}
.ge-btn {
  background: var(--accent);
  color: white;
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
}
.ge-btn:hover {
  opacity: 0.9;
}
.ge-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
  text-decoration: underline;
}
.ge-btn-outline:hover {
  opacity: 0.8;
}
.play-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--border);
  font-size: 10px;
}
.ge-map-visual {
  position: relative;
  height: 400px;
}
// .ge-map-visual::before {
//   content: '';
//   position: absolute;
//   top: 0; right: 0; bottom: 0; left: 0;
//   background-image: radial-gradient(var(--accent) 1.5px, transparent 1.5px);
//   background-size: 12px 12px;
//   -webkit-mask-image: url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg');
//   mask-image: url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg');
//   -webkit-mask-size: contain;
//   mask-size: contain;
//   -webkit-mask-position: center;
//   mask-position: center;
//   -webkit-mask-repeat: no-repeat;
//   mask-repeat: no-repeat;
//   opacity: 0.35;
// }
.ge-float-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  padding: 8px 16px 8px 8px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
.ge-float-card div {
  display: flex;
  flex-direction: column;
}
.ge-float-card strong {
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--ink);
}
.status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
}
.ge-float-card span:not(.ge-fc-img):not(.status-dot) {
  font-size: 11px;
  color: var(--ink-soft);
}
.ge-fc-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}

.card-nl { top: 38%; left: 44%; }
.card-de { top: 40%; left: 47%; }
.card-pl { top: 36%; left: 48%; }
.card-in { top: 50%; left: 64%; }
.card-cn { top: 42%; left: 68%; }

.ge-popular-dest {
  position: absolute;
  right: 0;
  top: 10%;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  width: 220px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
.ge-popular-dest h5 {
  font-size: 13px;
  color: var(--ink);
  margin-bottom: 16px;
  font-weight: 600;
}
.ge-popular-dest ul {
  list-style: none;
  padding: 0;
}
.ge-popular-dest li {
  font-size: 14px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink-soft);
}
.ge-popular-dest li .flag {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
}
.ge-popular-dest li .flag img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ge-link {
  color: var(--accent);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}

.ge-carousel-container {
  position: relative;
  width: 100%;
}
.ge-carousel-wrapper {
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 20px;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.ge-carousel-wrapper::-webkit-scrollbar {
  display: none;
}
.ge-carousel {
  display: flex;
  gap: 20px;
  flex-shrink: 0;
}
.ge-carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: 1px solid var(--border);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: var(--ink);
  transition: all 0.2s;
}
.ge-carousel-btn:hover {
  background: var(--bg);
  transform: translateY(-50%) scale(1.05);
}
.ge-carousel-btn.prev {
  left: -20px;
}
.ge-carousel-btn.next {
  right: -20px;
}
@media (max-width: 900px) {
  .ge-carousel-btn.prev { left: 0px; }
  .ge-carousel-btn.next { right: 0px; }
}
@media (max-width: 768px) {
  .ge-carousel-btn {
    display: none !important;
  }
}
.ge-card {
  min-width: 280px;
  flex: 0 0 280px;
  height: 200px;
  border-radius: 14px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
}
.ge-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.2);
}
.ge-card-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.9) 100%);
  z-index: 1;
}
.ge-card > * {
  z-index: 2;
  position: relative;
}
.ge-card-continent {
  position: absolute;
  top: 14px;
  left: 14px;
  background: white;
  color: var(--ink);
  font-size: 11px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.ge-card-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.ge-card-name {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
}
.ge-card-bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.ge-card-link {
  background: rgba(15, 23, 42, 0.75);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s, transform 0.15s;
}
.ge-card-link:hover {
  background: rgba(15, 23, 42, 0.95);
  transform: scale(1.02);
}
.ge-card-flag-rect {
  width: 32px;
  height: 22px;
  border: 2px solid white;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.4);
}
.ge-card-flag-rect img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (max-width: 900px) {
  .ge-top { grid-template-columns: 1fr; 
  margin-bottom: 0px;}
  .testimonials-head-wrap{
   margin-bottom: -4.5rem;
  }

  .carousel-pagination {
      margin-top: -3rem !important; 
  }
  .carousel-card-wrap.active {
      transform: scale(.75);
}
  .ge-map-visual { display: none; }

  .service-hero-copy {
    margin-top: 6rem;
  }
}

/* Zoom scaling removed so home content aligns to the navbar/footer width. */
.home-content-scale {
  zoom: 1;
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

      <header className="service-hero home-hero">
        <div className="home-hero-inner">
          <div className="service-hero-copy">
            <SlideIn direction="left" delay={0.1}>
              <h1>Hire talent, <em>anywhere</em></h1>
            </SlideIn>
            <SlideIn direction="left" delay={0.2}>
              <p className="service-hero-lede">
                Why should borders limit your business? Hire the best talent worldwide with fast, compliant, and hassle-free global HR solutions.
              </p>
            </SlideIn>
            <SlideIn direction="left" delay={0.3}>
              <div className="hero-pill-row">
                <Link href="/employer-of-record" className="hero-pill">EOR</Link>
                <Link href="/immigration" className="hero-pill">Immigration</Link>
                <Link href="/payroll" className="hero-pill">Payroll</Link>
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={0.4}>
              <div className="cta-row">
                <Link className="btn-primary" href="/contact">
                  Get started today
                </Link>

              </div>
            </SlideIn>

            <SlideIn direction="left" delay={0.5}>
              <div className="hero-features-inline">
                <div className="hf-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" /><path d="M2 12H22" /><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" /></svg>
                  Hire in 17+ countries
                </div>
                <div className="hf-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                  Compliant with local laws
                </div>
                <div className="hf-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M16 8H8V16H16" /><path d="M12 8V16" /><path d="M8 12H16" /></svg>
                  Payroll in 90+ currencies
                </div>
              </div>
            </SlideIn>


          </div>

          <SlideIn
            direction="fade-left"
            delay={0.2}
            style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}
          >
            <QuickContactForm />
          </SlideIn>
        </div>
      </header>

      <div className="home-content-scale">
        <section >
          <div className="container intro-blurb">
            <SlideIn direction="up">
              <p>
                Jackson &amp; Frank is your global workforce partner. Our local experts across 17+ markets handle the employment, contracts, and payroll for you. With this, you can hire and build teams remotely, without setting up a single local entity.

              </p>
            </SlideIn>
          </div>
        </section>
      </div>


      <div className="home-content-scale">
        <section className="section section-alt">
          <div className="container">
            <div className="foundations-head">
              <SlideIn direction="up">
                <div className="foundations-head-left">
                  <h2 className="section-title">Our <em>services</em></h2>
                  <p className="foundations-subtitle">End-to-end B2B HR solutions designed to support you in hiring, managing, and growing your workforce.</p>
                </div>
              </SlideIn>
              <SlideIn direction="left" delay={0.2}>
                <Link href="/employer-of-record" className="foundations-cta">
                  See all services
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              </SlideIn>
            </div>
            <div className="foundations-grid">
              {topServices.map((service: any, index: number) => {
                const icons: Record<string, any> = {
                  eor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                  immigration: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
                  payroll: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
                }
                const icon = icons[service.id] ?? icons.eor
                return (
                  <SlideIn key={service.title} direction="up" delay={0.1 + index * 0.15}>
                    <Link href={service.href ?? '/employer-of-record'} className="foundation-card" style={{ backgroundImage: `url('${service.image}')` }}>
                      <div className="foundation-card-body">
                        <h3>{service.title}</h3>
                        <span className="card-golden-line" />
                        <p>{service.description}</p>
                      </div>
                      <div className="foundation-card-eyebrow bottom-eyebrow">
                        <span className="eyebrow-icon">{icon}</span>
                        <span className="eyebrow-text">{service.subtitle}</span>
                      </div>
                    </Link>
                  </SlideIn>
                )
              })}
            </div>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="ge-section">
          <div className="container ge-inner">
            <div className="ge-top">
              <SlideIn direction="left">
                <div className="ge-content">
                  <h2 className="ge-title">Expand your business globally, <span className="ge-highlight">with confidence</span></h2>
                  <p className="ge-subtitle">We have offices in 17+ countries and a partner network in over 160 countries. At our office locations, we provide direct local support. In other areas, we collaborate with vetted local partners to maintain quality service.</p>
                  <div className="ge-cta">
                    <Link href="/contact" className="btn-primary ge-btn">Explore all countries</Link>
                    <Link href="/global-hiring-guide" className="ge-btn-outline">How it works </Link>
                  </div>
                </div>
              </SlideIn>
              <SlideIn direction="right" delay={0.2}>
                <div className="ge-map-visual">
                  <div className="ge-map-svg-wrap">
                    <img src="/case-study/contact-bg-removebg-preview.png" alt="Global presence map" className="ge-world-img" loading="lazy" />
                    <div className="ge-marker card-nl">
                      <div className="ge-marker-pulse"></div>
                      <div className="ge-marker-dot"></div>
                      <div className="ge-float-card">
                        <span className="ge-fc-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=100')" }}></span>
                        <div>
                          <strong>Netherlands <span className="status-dot"></span></strong>
                          <span>HQ Office</span>
                        </div>
                      </div>
                    </div>
                    <div className="ge-marker card-de">
                      <div className="ge-marker-pulse"></div>
                      <div className="ge-marker-dot"></div>
                      <div className="ge-float-card">
                        <span className="ge-fc-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=100')" }}></span>
                        <div>
                          <strong>Germany <span className="status-dot"></span></strong>
                          <span>Active office</span>
                        </div>
                      </div>
                    </div>
                    <div className="ge-marker card-pl">
                      <div className="ge-marker-pulse"></div>
                      <div className="ge-marker-dot"></div>
                      <div className="ge-float-card">
                        <span className="ge-fc-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=100')" }}></span>
                        <div>
                          <strong>Poland <span className="status-dot"></span></strong>
                          <span>Active office</span>
                        </div>
                      </div>
                    </div>
                    <div className="ge-marker card-in">
                      <div className="ge-marker-pulse"></div>
                      <div className="ge-marker-dot"></div>
                      <div className="ge-float-card">
                        <span className="ge-fc-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532375811440-a2b16d9b320d?auto=format&fit=crop&q=80&w=100')" }}></span>
                        <div>
                          <strong>India <span className="status-dot"></span></strong>
                          <span>Active office</span>
                        </div>
                      </div>
                    </div>
                    <div className="ge-marker card-cn">
                      <div className="ge-marker-pulse"></div>
                      <div className="ge-marker-dot"></div>
                      <div className="ge-float-card">
                        <span className="ge-fc-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=100')" }}></span>
                        <div>
                          <strong>China <span className="status-dot"></span></strong>
                          <span>Active office</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ge-map-stats">
                    <div className="ge-map-stat"><NumberCounter as="strong" to={17} suffix="+" /><span>Countries</span></div>
                    <div className="ge-map-stat-divider"></div>
                    <div className="ge-map-stat"><NumberCounter as="strong" to={48} suffix="–72h" /><span>Go Live</span></div>
                    <div className="ge-map-stat-divider"></div>
                    <div className="ge-map-stat"><NumberCounter as="strong" to={24} suffix="/5" /><span>Human Support</span></div>
                    <div className="ge-map-stat-divider"></div>
                    <div className="ge-map-stat"><NumberCounter as="strong" to={1400} suffix="+" /><span>Employees Placed</span></div>
                  </div>
                </div>

              </SlideIn>
            </div>
            <OfficeCarousel />
          </div>
        </section>
      </div>
      <div className="home-content-scale">
        <section className="section section-alt">
          <div className="container">
            <div className="structure-about">
              <SlideIn direction="left">
                <div className="sa-left">
                  <h2 className="sa-title">Why choose  <span className="sa-highlight">Jackson &amp; Frank?</span></h2>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                    <p className="sa-body" style={{ margin: 0, flex: 1 }}>
                      We provide a complete and safe path to global expansion. Work in any country without setting up a local office, with full compliance for employment, payroll, tax, and immigration.
                    </p>
                    <div className="sa-cta-row" style={{ marginTop: 0, flexShrink: 0 }}>
                      <Link href="/advantages" className="btn-primary">
                        Learn more
                      </Link>
                    </div>
                  </div>
                </div>
              </SlideIn>
            </div>
            <div className="sa-features-grid">
              <SlideIn direction="up" delay={0.1}>
                <div
                  className={`sa-feat-card ${openFeatCard === 0 ? 'is-open' : ''}`}
                  onClick={() => setOpenFeatCard(openFeatCard === 0 ? null : 0)}
                >
                  <div className="sa-feat-header">
                    <div className="sa-feat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                    </div>
                    <h4 className="sa-feat-title">Expert compliance and legal support</h4>
                    <button className="sa-feat-toggle" aria-label="Toggle details">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  </div>
                  <div className="sa-feat-body">
                    <p>We guide you through all international laws and help you avoid legal issues and compliance risks.</p>
                  </div>
                </div>
              </SlideIn>
              <SlideIn direction="up" delay={0.2}>
                <div
                  className={`sa-feat-card ${openFeatCard === 1 ? 'is-open' : ''}`}
                  onClick={() => setOpenFeatCard(openFeatCard === 1 ? null : 1)}
                >
                  <div className="sa-feat-header">
                    <div className="sa-feat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" /><path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" /></svg>
                    </div>
                    <h4 className="sa-feat-title">Tailored global expansion consulting</h4>
                    <button className="sa-feat-toggle" aria-label="Toggle details">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  </div>
                  <div className="sa-feat-body">
                    <p>We create custom strategies for your global growth with country-specific guidance.</p>
                  </div>
                </div>
              </SlideIn>
              <SlideIn direction="up" delay={0.3}>
                <div
                  className={`sa-feat-card ${openFeatCard === 2 ? 'is-open' : ''}`}
                  onClick={() => setOpenFeatCard(openFeatCard === 2 ? null : 2)}
                >
                  <div className="sa-feat-header">
                    <div className="sa-feat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" /><path d="M14 2V8H20" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
                    </div>
                    <h4 className="sa-feat-title">End-to-end EOR and administrative support</h4>
                    <button className="sa-feat-toggle" aria-label="Toggle details">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  </div>
                  <div className="sa-feat-body">
                    <p>We manage everything contracts, payroll, benefits, and immigration. You focus on your business.</p>
                  </div>
                </div>
              </SlideIn>
              <SlideIn direction="up" delay={0.4}>
                <div
                  className={`sa-feat-card ${openFeatCard === 3 ? 'is-open' : ''}`}
                  onClick={() => setOpenFeatCard(openFeatCard === 3 ? null : 3)}
                >
                  <div className="sa-feat-header">
                    <div className="sa-feat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
                    </div>
                    <h4 className="sa-feat-title">Fast setup and compliance assurance</h4>
                    <button className="sa-feat-toggle" aria-label="Toggle details">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  </div>
                  <div className="sa-feat-body">
                    <p>Start hiring in 48-72 hours with full compliance assurance and expert support.</p>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container">
          <div className="resources-section">
            <SlideIn direction="up">
              <div className="resources-header">
                <div className="rh-left">
                  <h2 className="section-title">Latest insights &amp; resources</h2>
                  <p className="structure-body" style={{ marginTop: '12px', maxWidth: '600px' }}>
                    Stay updated with the latest insights and news from our team
                  </p>
                </div>
                <div className="rh-right">
                  <Link href="/blog" className="btn-secondary">View all resources </Link>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.1}>
              <div className="resources-top-grid">
                <Link href={`/blog/${latestBlogs[0]?.slug}`}>
                  <div className="featured-report-card" style={{ backgroundImage: `url(${latestBlogs[0]?.image_url})`, backgroundSize: 'contain', }}>
                    <div className="frc-bg" style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.4))' }}></div>
                    <div className="frc-content">
                    </div>
                  </div>
                </Link>

                <div className="latest-articles-card">
                  <div className="lac-header">
                    <h4>Recent articles</h4>
                    <Link href="/blog" className="lac-view-all">View all </Link>
                  </div>
                  <div className="lac-list">
                    {latestBlogs.slice(1).map((article: any) => (
                      <Link key={article.slug} href={'/blog/' + article.slug} className="article-item">
                        <img src={article.image_url} alt={article.title} className="article-thumb" loading="lazy" />
                        <div className="article-info">
                          {/* <span className="article-tag" style={{ textTransform: 'uppercase' }}>{article.category}</span> */}
                          <h5>{article.title}</h5>
                          <span className="article-meta">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            {article.estimated_reading_time} min read &middot; {formatBlogDate(article.publish_date)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SlideIn>

            <div className="resources-bottom-grid">
              <Link href="/global-hiring-guide" className="resource-category-card rcc-blue">
                <div className="rcc-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&w=400&q=80')" }}></div>
                <div className="rcc-bg-fade"></div>
                <div className="rcc-content-wrap">
                  <div className="rcc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <h4>Global Hiring Guides</h4>
                  <p>Country-by-country hiring guides, EOR insights, and workforce best practices.</p>
                  <span className="rcc-link">Explore guides <span className="arrow">→</span></span>
                </div>
              </Link>
              <Link href="/payroll" className="resource-category-card rcc-green">
                <div className="rcc-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80')" }}></div>
                <div className="rcc-bg-fade"></div>
                <div className="rcc-content-wrap">
                  <div className="rcc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <h4>Payroll Resources</h4>
                  <p>Payroll compliance, tax updates, and country payroll regulations.</p>
                  <span className="rcc-link">Explore resources <span className="arrow">→</span></span>
                </div>
              </Link>
              <Link href="/compliance" className="resource-category-card rcc-purple">
                <div className="rcc-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80')" }}></div>
                <div className="rcc-bg-fade"></div>
                <div className="rcc-content-wrap">
                  <div className="rcc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                  </div>
                  <h4>Compliance Updates</h4>
                  <p>Stay updated with global compliance changes and regulatory insights.</p>
                  <span className="rcc-link">Explore updates <span className="arrow">→</span></span>
                </div>
              </Link>
              <Link href="/immigration" className="resource-category-card rcc-orange">
                <div className="rcc-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80')" }}></div>
                <div className="rcc-bg-fade"></div>
                <div className="rcc-content-wrap">
                  <div className="rcc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <h4>Immigration Insights</h4>
                  <p>Visa, work permits, and immigration policies across 17+ countries.</p>
                  <span className="rcc-link">Explore insights <span className="arrow">→</span></span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <TestimonialsCarousel
        title="What our clients are saying"
        testimonials={(testimonials as any).testimonials}
      />

      <div className="home-content-scale">
        <section className="section container faq-section">
          <SlideIn direction="up">
            <div className="faq-header">
              <h2 className="faq-title">Frequently asked <span>questions</span></h2>
              <p className="faq-subtitle">Quick answers about global hiring and our services</p>
            </div>
          </SlideIn>

          <SlideIn direction="up" delay={0.1}>
            <div className="faq-tabs-wrapper">
              <div className="faq-tabs">
                {faqTabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`faq-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => { setActiveTab(activeTab === tab.id ? '' : tab.id); setOpenFaq(-1); }}
                  >
                    {tab.id}
                  </button>
                ))}
              </div>
            </div>
          </SlideIn>

          <SlideIn direction="up" delay={0.2}>
            <div className="faq-list">
              {filteredFaqs.map((faq: any, index: number) => (
                <div key={index} className={`faq-item ${openFaq === index ? 'is-open' : ''}`}>
                  <div className="faq-question" onClick={() => toggleFaq(index)}>
                    <div className="faq-icon">
                      {faq.category === 'About EOR' ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      ) : faq.category === 'Hiring & Onboarding' ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                      ) : faq.category === 'Payroll & Compliance' ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>
                      )}
                    </div>
                    <h3>{faq.question}</h3>
                    <div className="faq-toggle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                  <div className="faq-answer-wrapper" style={{ display: openFaq === index ? 'block' : 'none' }}>
                    <div className="faq-answer-simple">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SlideIn>
        </section>
      </div>
      <CandidateCTA imageSrc="/services/service-page/about2.webp" imageAlt="Let's build your team" />
    </>
  )
}
