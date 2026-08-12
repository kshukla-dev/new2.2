'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

import { useState } from 'react'
import Link from 'next/link'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { SlideIn } from '@/components/animations/SlideIn'
import ghg from '@/data/global-hiring.json'
import QuickContactForm from '@/components/sections/QuickContactForm'

interface Country {
  name: string
  status?: string
  address: string
  href: string
}

export default function GlobalHiringGuidePage() {
  const [activeEntity, setActiveEntity] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  const allCountries = ghg.countries as Country[]
  const available = allCountries.filter((c) => c.status?.toLowerCase() !== 'coming soon')
  const comingSoon = allCountries.filter((c) => c.status?.toLowerCase() === 'coming soon')

  const getFlag = (name: string) => {
    const map: Record<string, string> = {
      'The Netherlands': '🇳🇱',
      'India': '🇮🇳',
      'Poland': '🇵🇱',
      'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪',
      'Italy': '🇮🇹',
      'Czech Republic': '🇨🇿',
      'France': '🇫🇷',
      'Belgium': '🇧🇪',
      'Spain': '🇪🇸',
      'UAE': '🇦🇪',
      'Hong Kong': '🇭🇰',
      'China': '🇨🇳',
      'Portugal': '🇵🇹',
      'Sweden': '🇸🇪',
      'Hungary': '🇭🇺',
      'Romania': '🇷🇴',
    }
    return map[name] || '🌍'
  }

  const getFlagUrl = (name: string) => {
    const map: Record<string, string> = {
      'The Netherlands': '/countries/flag/Flag_of_the_Netherlands.svg.webp',
      'India': '/countries/flag/Flag_of_India.svg.webp',
      'Poland': '/countries/flag/Flag_of_Poland.svg.webp',
      'United Kingdom': '/countries/flag/Flag-United-Kingdom.webp',
      'Germany': '/countries/flag/Flag_of_Germany_(3-2).svg.webp',
      'Italy': '/countries/flag/Flag_of_Italy.svg.webp',
      'Czech Republic': '/countries/flag/Flag_of_the_Czech_Republic.svg.webp',
      'France': '/countries/flag/Flag_of_France.svg.webp',
      'Belgium': '/countries/flag/Flag_of_Belgium.svg.webp',
      'Spain': '/countries/flag/Flag_of_Spain.svg.webp',
      'UAE': '/countries/flag/Flag_of_the_United_Arab_Emirates.svg',
      'Hong Kong': '/countries/flag/Flag_of_Hong_Kong.svg (1).webp',
      'China': '/countries/flag/Flag_of_the_People\'s_Republic_of_China.svg.webp',
    }
    return map[name] || ''
  }

  const getCountryImage = (name: string) => {
    const map: Record<string, string> = {
      'The Netherlands': '/countries/eor-netherlands.webp',
      'India': '/countries/eor-india.webp',
      'Poland': '/countries/eor-poland.webp',
      'United Kingdom': '/countries/eor-uk.webp',
      'Germany': '/countries/eor-germany.webp',
      'Italy': '/countries/eor-Italy.webp',
      'Czech Republic': '/countries/eor-czech.webp',
      'France': '/countries/eor-france.webp',
      'Belgium': '/countries/eor-belgium.webp',
      'Spain': '/countries/eor-spain.webp',
      'UAE': '/countries/eor-uae.webp',
      'Hong Kong': '/countries/eor-hong-kong.webp',
      'China': '/countries/eor-china.webp',
      'Portugal': '/countries/portugal.webp',
      'Sweden': '/countries/sweden.webp',
      'Hungary': '/countries/hungary.webp',
      'Romania': '/countries/romania.webp',
    }
    return map[name] || '/countries/eor-spain.webp'
  }

  const getShortAddress = (name: string) => {
    const map: Record<string, string> = {
      'The Netherlands': 'Arnhem, Netherlands',
      'India': 'Nagpur, Maharashtra, India',
      'Poland': 'Poznań, Poland',
      'United Kingdom': 'London, United Kingdom',
      'Germany': 'Berlin, Germany',
      'Italy': 'Milan, Italy',
      'Czech Republic': 'Prague, Czech Republic',
      'France': 'Paris, France',
      'Belgium': 'Sint-Agatha-Berchem, Belgium',
      'Spain': 'Seville, Spain',
      'UAE': 'Sharjah, UAE',
      'Hong Kong': 'Tsim Sha Tsui, Hong Kong',
      'China': 'Shanghai, China'
    }
    return map[name] || name
  }

  const getCountryDetails = (name: string) => {
    const defaults = { type: 'Private Limited', currency: 'USD', time: '2-4 weeks' }
    const map: Record<string, { type: string, currency: string, time: string }> = {
      'The Netherlands': { type: 'B.V.', currency: 'EUR', time: '2-4 weeks' },
      'India': { type: 'Private Limited', currency: 'INR', time: '3-6 weeks' },
      'Poland': { type: 'Sp. z o.o.', currency: 'PLN', time: '2-4 weeks' },
      'United Kingdom': { type: 'LTD', currency: 'GBP', time: '1-3 weeks' },
      'Germany': { type: 'GmbH', currency: 'EUR', time: '3-5 weeks' },
      'Italy': { type: 'S.r.l.', currency: 'EUR', time: '2-4 weeks' },
      'Czech Republic': { type: 's.r.o.', currency: 'CZK', time: '2-4 weeks' },
      'France': { type: 'SAS', currency: 'EUR', time: '2-4 weeks' },
      'Belgium': { type: 'BV', currency: 'EUR', time: '2-4 weeks' },
      'Spain': { type: 'S.L.', currency: 'EUR', time: '2-4 weeks' },
      'UAE': { type: 'LLC', currency: 'AED', time: '2-4 weeks' },
      'Hong Kong': { type: 'Limited', currency: 'HKD', time: '1-3 weeks' },
      'China': { type: 'WFOE', currency: 'CNY', time: '4-8 weeks' }
    }
    return map[name] || defaults
  }

  return (
    <>
      {/* Base (Organization + WebSite) + FAQ as one combined JSON-LD block */}
      <JsonLd
        data={buildPageSchemaGraph(
          ghg.faqs?.items?.length
            ? buildFaqSchema({ path: '/global-hiring-guide', faq: ghg.faqs.items })
            : []
        )}
      />
      <style>{`

/* ============================================================
   NEW HERO STYLES
   ============================================================ */
.ghg-hero {
  position: relative;
  left: 50%;
  margin-top: -70px;
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
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgba(14, 15, 59, 0.75) 100%, rgba(14, 15, 59, 0.17) 70%, transparent 100%), url(/case-study/global-hiring-guide.webp);
}

.ghg-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.ghg-hero-inner {
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
  .ghg-hero-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
  }
}

.ghg-hero-copy {
  max-width: 650px;
  /* animation removed in favor of global stagger */
}

.hero-checklist {
  list-style: none;
  padding: 0;
  margin: 32px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.hero-checklist li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  color: #ffffff;
}
.hero-checklist li svg {
  color: #ffffff;
  flex-shrink: 0;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
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
  margin: 24px 0px;
}

.hero-title em {
  color: var(--accent-warm, #F7931E);
  font-style: italic;
}

.hero-desc {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 40px;
}

.btn-primary-gold {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #F7931E;
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary-gold:hover {
  background: #e07d10;
  transform: translateY(-2px);
}

/* ============================================================
   TRUST BANNER
   ============================================================ */
.trust-banner-wrap {
  
  margin-top: 10vh;
}

.trust-banner {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
  padding: 32px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.trust-left {
  flex: 0 0 280px;
}

.trust-tag {
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
}

.trust-left h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 400;
  color: var(--ink);
  line-height: 1.2;
}

.trust-logos {
  display: flex;
  align-items: center;
  gap: 25px;
  flex: 1;
  justify-content: space-between;
}

.t-logo {
  font-size: 20px;
  font-weight: 700;
  color: #64748b;
  opacity: 0.85;
}

.t-logo.klarna { font-family: sans-serif; font-weight: 800; letter-spacing: -0.5px; }
.t-logo.hubspot { font-family: sans-serif; font-weight: 700; }
.t-logo.scale { font-family: monospace; font-size: 24px; letter-spacing: -1px; }
.t-logo.rippling { font-family: sans-serif; font-weight: 800; font-size: 18px; display: inline-flex; align-items: center; }
.t-logo.brex { font-family: sans-serif; font-weight: 800; font-size: 18px; letter-spacing: 2px; }
.t-logo.dlocal { font-family: sans-serif; font-weight: 700; font-size: 22px; letter-spacing: -1px; }

.how-grid-4 { grid-template-columns: repeat(4, 1fr); }

.borderless-teams-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 60px 0;
}

.borderless-card {
  border-radius: 12px;
  padding: 48px;
  box-shadow: 0 4px 40px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.04);
}

.borderless-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 48px;}

.borderless-header-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
}

.borderless-header h2 {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 36px);
  letter-spacing: -0.02em;
}

.borderless-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 60px;
  column-gap: 40px;
  position: relative;
}

.bg-divider-v {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: #f0f0f0;
}

.bg-divider-h {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #f0f0f0;
}

.borderless-feature {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.bf-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.bf-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 1.5px solid var(--border);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bf-header h3 {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.borderless-feature > p {
  font-size: 12px;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.borderless-image {
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
}

.borderless-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ============================================================
   PROCESS SECTION
   ============================================================ */
.process-box {
  background: var(--accent-soft);
  border-radius: 20px;
  padding: 64px 48px;
  border: 1px solid rgba(20, 51, 105, 0.08);
}

.process-title {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 36px);
  
   
  margin-bottom: 64px;
}

.process-flow {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  text-align: center;
}

.process-line {
  position: absolute;
  top: 40px; /* Center of 80px icon */
  left: 10%;
  right: 10%;
  border-top: 2px dotted var(--accent);
  z-index: 1;
}

.process-step {
  position: relative;
}

.ps-icon-wrap {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  margin-bottom: 24px;
}

.ps-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 1.5px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
}

.ps-num {
  display: block;
  font-size: 14px;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 8px;
}

.process-step h3 {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 600;
   
  margin-bottom: 8px;
}

.process-step p {
  font-size: 13px;
  color: #555;
  line-height: 1.5;
  padding: 0 10px;
}


.entities-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 56px;
  position: relative;
}
.entities-title-block {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}
.tag-centered {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}
.entities-main-title {
  font-family: var(--serif);
  font-size: clamp(24px, 4vw, 40px);
  
  line-height: 1.2;
   
}
.entities-main-title .gold-text {
  color: var(--accent);
  font-family: var(--serif);
  font-style: italic;
  
}
.entities-subtitle {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin-top: 16px;
}
.btn-outline-gold {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.btn-outline-gold:hover {
  background: var(--bg);
  border-color: var(--accent);
  transform: translateY(-1px);
}

/* Main Grid */
.entities-main-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 32px;
  margin-bottom: 40px;
}

/* Map Stats Card */
.map-stats-card {
  position: relative;
  background-color: #fefefe;
  background-image: url('/case-study/OurEntitiesLocations.webp');
  background-repeat: no-repeat;
  background-size: 103% auto;
  background-position: -20px 14%;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 480px;
  overflow: hidden;
}
.map-dotted-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.map-card-content {
  position: relative;
  z-index: 2;
  width: 100%;
}
.map-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px;
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid var(--border);
  gap: 8px;
}
.map-stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  border-right: 1px solid var(--border);
}
.map-stat-item:last-child {
  border-right: none;
}
.map-stat-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}
.map-stat-info {
  display: flex;
  flex-direction: column;
}
.map-stat-number {
  font-size: 20px;
  font-weight: 700;
   
  line-height: 1.1;
}
.map-stat-label {
  font-size: 9px;
  color: #64748b;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.02em;
}

/* Featured Entities Card */
.featured-entities-card {
  background: var(--accent-soft);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.fe-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.fe-card-title {
  font-size: 18px;
  
   
}
.fe-see-all {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}
.fe-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 380px;
  overflow-y: auto;
  padding-right: 8px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: auto;
  pointer-events: auto !important;
  position: relative;
  z-index: 10;
}
.fe-list::-webkit-scrollbar {
  width: 6px;
}
.fe-list::-webkit-scrollbar-track {
  background: rgba(20,51,105,0.06);
  border-radius: 4px;
}
.fe-list::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
.fe-list::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}
.fe-item {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  background: #fff;
  cursor: pointer;
  outline: none;
}
.fe-item:focus-visible {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(247, 147, 30, 0.2);
}
.fe-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.fe-item:hover, .fe-item.is-open {
  border-color: #e5e7eb;
  box-shadow: 0 4px 12px rgba(20,51,105,0.05);
}
.fe-item:hover .fe-name, .fe-item.is-open .fe-name {
  color: var(--accent);
}
.fe-item-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, margin-top 0.25s ease, padding-top 0.25s ease;
  margin-top: 0;
  padding-top: 0;
  border-top: 1px solid transparent;
}
.fe-item.is-open .fe-item-details {
  max-height: 240px;
  opacity: 1;
  padding-top: 20px;
  border-top-color: #e5e7eb44;
}
.fe-arrow svg {
  transition: transform 0.3s ease;
}
.fe-item.is-open .fe-arrow svg {
  transform: rotate(-90deg);
}

.fe-details-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.fe-detail-box {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  border-right: 1px solid #e5e7eb44;
}
.fe-detail-box:last-child {
  border-right: none;
}
.fe-detail-icon {
  color: var(--accent);
  background: var(--bg);
  border: 1px solid var(--border);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}
.fe-detail-text {
  display: flex;
  flex-direction: column;
}
.fe-detail-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 2px;
}
.fe-detail-val {
  font-size: 13px;
  font-weight: 600;
}
.fe-details-address {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 12px;
  color: #555;
  line-height: 1.5;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s, text-decoration 0.2s;
}
.fe-details-address:hover {
  text-decoration: underline;
  color: var(--accent) !important;
}
.fe-details-address svg {
  flex-shrink: 0;
  margin-top: 3px;
}
.fe-details-address p {
  margin: 0;
  text-align: left;
}
.fe-item-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.fe-flag-wrap {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  flex-shrink: 0;
}
.fe-flag-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fe-flag-emoji {
  font-size: 20px;
}
.fe-info {
  display: flex;
  flex-direction: column;
}
.fe-name {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}
.fe-desc {
  font-size: 11px;
  color: #64748b;
  margin-top: 4px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s, text-decoration 0.2s;
}
.fe-desc:hover {
  text-decoration: underline;
  color: var(--accent) !important;
}
.fe-desc svg {
  flex-shrink: 0;
  margin-top: 2px;
}
.fe-desc span {
  text-align: left;
}
.fe-item-right-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}
.fe-active-badge {
  font-size: 10px;
  font-weight: 700;
  background: #e2f5ec;
  color: #0b7c4a;
  padding: 3px 9px;
  border-radius: 99px;
}
.fe-arrow {
  color: #94a3b8;
  display: flex;
  align-items: center;
}
.fe-more {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1.5px dashed #e5e7eb;
  background: var(--bg-card);
  border-radius: 12px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  margin-top: 4px;
}
.fe-more:hover {
  background: var(--bg-card);
  border-color: var(--accent);
}
.fe-more-left {
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  z-index: 2;
}
.fe-plus-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--bg-card);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
}
.fe-more-text {
  display: flex;
  flex-direction: column;
}
.fe-more-text span:first-child {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
}
.fe-more-sub {
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
}
.fe-globe-watermark {
  position: absolute;
  right: -8px;
  bottom: -8px;
  color: #e5e7eb;
  opacity: 0.15;
  pointer-events: none;
  z-index: 1;
}

/* Coming soon section */
.coming-soon-section {
  margin-top: 48px;
  margin: 1rem;
}
.cs-title {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 24px;
}
.cs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
@media (max-width: 1024px) {
  .cs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .cs-grid {
    grid-template-columns: 1fr;
  }
}
.coming-soon-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  color: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-height: 240px;
  transition: all 0.35s ease;
  cursor: pointer;
}
.coming-soon-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
}
.cs-bg-image {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: transform 0.4s ease;
}
.cs-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(71, 85, 105, 0.95), rgba(51, 65, 85, 0.98));
  z-index: 1;
  transition: background 0.4s ease, opacity 0.4s ease;
}
.coming-soon-card:hover .cs-bg-image {
  transform: scale(1.05);
}
.coming-soon-card:hover .cs-overlay {
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.8));
}
.cs-card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.cs-country-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.cs-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 8px;
}
.cs-icon-wrap svg {
  width: 16px;
  height: 16px;
}
.cs-country-name {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
}
.cs-desc {
  font-size: 14px;
  color: rgba(255,255,255,0.9);
  line-height: 1.5;
  flex-grow: 1;
}
.cs-contact-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}
.cs-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  font-weight: 600;
  font-size: 14px;
  z-index: 3;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  opacity: 1;
  transition: opacity 0.4s ease, transform 0.4s ease;
  pointer-events: none;
}
.coming-soon-card:hover .cs-badge {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

/* Request a location card */
.cs-card-request {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: var(--bg-card);
  border: 1.5px dashed #e5e7eb;
  cursor: pointer;
  text-decoration: none;
}
.cs-card-request:hover {
  background: var(--bg-card);
  border-color: var(--accent);
}
.cs-request-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg);
  border: 1.5px solid var(--border);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.cs-request-title {
  font-size: 13px;
  
  color: #64748b;
  margin-bottom: 6px;
}
.cs-request-link {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
}

@media (max-width: 1440px) {
  .ghg-hero {
    background-size: 80% auto;
    background-position: right -5% center;
  }
}
@media (max-width: 1280px) {
  .ghg-hero {
    background-size: 100% auto;
    background-position: right -15% center;
  }
}

@media (max-width: 1200px) {
  .cs-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .ghg-hero {
    padding: 80px 0 80px;
    background-image: linear-gradient(90deg, #0e0f3b 0%, rgba(14, 15, 59, 0.75) 40%, rgba(14, 15, 59, 0.17) 70%, transparent 100%), url(/case-study/global-hiring-guide.webp);
    background-size: cover;
    background-position: 40% center;
    min-height: 540px;
  }
  .ghg-hero-copy {
    max-width: 480px;
    padding-bottom: 20px;
    padding-top: 10px;
  }
  .trust-banner-wrap {
    margin-top: 30px;
  }
}

@media (max-width: 1024px) {
  .how-grid-4 { grid-template-columns: 1fr 1fr; }
  .borderless-teams-wrap { grid-template-columns: 1fr; }
  .borderless-image { height: 400px; }
  .entities-main-grid {
    grid-template-columns: 1fr;
  }
  .map-stats-row {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .map-stat-item {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
  .process-flow {
    grid-template-columns: 1fr;
    gap: 24px;
    text-align: left;
  }
  .process-line {
    display: none;
  }
  .process-step {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "icon num"
      "icon title"
      "icon desc";
    gap: 0 16px;
    align-items: start;
  }
  .btn-outline-gold {
    position: static;
    margin-top: 24px;
  }
  .entities-header-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .trust-banner {
    flex-direction: column;
    gap: 24px;
    text-align: center;
    padding: 32px;
  }
  .trust-left {
    flex: auto;
  }
  .trust-logos {
    flex-wrap: wrap;
    justify-content: center;
  }
}
@media (max-width: 768px) {
  .cs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .map-stats-row {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .map-stat-item {
    border-right: none;
  }
}
@media (max-width: 640px) {
  .process-box {
    padding: 32px 20px;
  }
  .process-title {
    font-size: 28px;
    margin-bottom: 32px;
    text-align: center;
    line-height: 1.3;
  }
  .process-flow {
    grid-template-columns: 1fr;
    gap: 24px;
    text-align: left;
  }
  .process-line {
    display: none;
  }
  /* The step number used to sit on its own cramped 12px line above the title.
     It now shares the icon cell as a filled badge pinned to the corner of the
     circle, so it reads as part of the step marker instead of stray small text,
     and the text column carries only the title and description. */
  .process-step {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "icon title"
      "icon desc";
    gap: 0 16px;
    align-items: start;
  }
  .ps-icon-wrap {
    grid-area: icon;
    margin-bottom: 0;
  }
  .ps-icon {
    width: 56px;
    height: 56px;
  }
  .ps-icon svg {
    width: 24px;
    height: 24px;
  }
  .ps-num {
    grid-area: icon;
    align-self: start;
    justify-self: end;
    z-index: 3;
    margin: -4px -4px 0 0;
    min-width: 24px;
    padding: 3px 6px;
    border-radius: 999px;
    background: var(--accent);
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
    line-height: 1.2;
    text-align: center;
    letter-spacing: 0.02em;
  }
  .process-step h3 {
    grid-area: title;
    margin-bottom: 4px;
    font-size: 16px;
    align-self: center;
  }
  .process-step p {
    grid-area: desc;
    padding: 0;
    font-size: 13px;
  }
  .how-grid-4 { grid-template-columns: 1fr; }
  .cs-grid { grid-template-columns: 1fr; }
  .cs-card {
    min-height: 170px;
    padding: 16px;
  }
  .cs-card-text {
    margin: 8px 0;
    font-size: 11px;
  }
  
  .borderless-grid {
    grid-template-columns: 1fr;
    row-gap: 24px;
  }
  .bg-divider-v, .bg-divider-h { display: none; }
  
  .borderless-feature { padding-bottom: 24px; border-bottom: 1px solid #f0f0f0; }
  .borderless-feature:last-child { border-bottom: none; padding-bottom: 0; }
  
  .borderless-card { padding: 24px 20px; }
  .borderless-header { flex-direction: column; text-align: center; gap: 12px; margin-bottom: 32px; }
  .borderless-header h2 { font-size: 28px; }
  .borderless-header-icon { width: 48px; height: 48px; }
  .bf-icon { width: 40px; height: 40px; }
  .bf-text h3 { font-size: 16px; margin-bottom: 4px; }
  .bf-text p { font-size: 13px; }
  .borderless-image { height: 240px; margin-top: -16px; }
  
  .entities-main-title {
    font-size: clamp(22px, 4vw, 32px);
  }
  .map-stats-card {
    padding: 12px;
    min-height: 320px;
    background-size: 100% auto;
    background-position: 0% 12%;
  }
  .map-stats-row {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 12px;
  }
  .map-stat-item {
    gap: 8px;
    align-items: flex-start;
    padding-bottom: 12px;
  }
  /* Four items in a 2-column grid: only the first row should carry a rule.
     The inherited border-bottom left the bottom row with dangling underlines. */
  .map-stat-item:nth-last-child(-n + 2) {
    border-bottom: none;
    padding-bottom: 0;
  }
  .map-stat-icon-wrap {
    width: 32px;
    height: 32px;
  }
  .map-stat-icon-wrap svg {
    width: 16px;
    height: 16px;
  }
  .map-stat-number {
    font-size: 18px;
  }
  /* Was 8px, which is unreadable on a phone. */
  .map-stat-label {
    font-size: 11px;
    letter-spacing: 0;
  }

  .ghg-hero {
    min-height: auto;
    /* Top padding matches the ::before photo band so the h1 starts on solid
       navy instead of on the tail of the image. */
    padding: 210px 0 40px;
    background-size: cover;
    background-position: center;
    background-image: none;
    background-color: #0E0F3B;
  }
  /* Blended with a navy colour gradient layered over the photo rather than an
     alpha mask. The final stop is exactly the hero background colour, so the
     bottom of the band dissolves into it with no visible cut line and none of
     the banding a short linear alpha fade produced. */
  .ghg-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 210px;
    background-image:
      linear-gradient(
        180deg,
        rgba(14, 15, 59, 0.10) 0%,
        rgba(14, 15, 59, 0.28) 40%,
        rgba(14, 15, 59, 0.58) 62%,
        rgba(14, 15, 59, 0.82) 78%,
        rgba(14, 15, 59, 0.95) 90%,
        #0E0F3B 100%
      ),
      url(/case-study/global-hiring-guide.webp);
    background-size: 100% 100%, cover;
    background-position: center top, center top;
    background-repeat: no-repeat, no-repeat;
    pointer-events: none;
  }
  .ghg-hero-inner {
    padding-left: 20px;
    padding-right: 20px;
  }
  .hero-checklist li {
    font-size: 16px;
  }
  .trust-banner-wrap {
    margin-top: 20px;
  }
  .trust-banner {
    padding: 24px 16px;
  }
  .trust-logos {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px 20px;
    width: 100%;
  }
  .t-logo {
    flex-shrink: 0;
  }
  .map-stats-card {
    min-height: 260px;
    background-size: 100% auto;
    background-position: center 8%;
    padding: 12px;
    justify-content: flex-end;
  }

  .coming-soon-section {
    margin-top: 32px;
    padding: 0 20px;
  }
}

/* ============= HOW IT WORKS ============= */

.hiw-header {
  margin: 40px 0;
}
.hiw-tag {
  color: #3b5bdb;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: inline-block;
}
.hiw-title {
  font-family: var(--serif);
  font-size: clamp(25px, 4vw, 42px);
  color: var(--ink);
  margin-bottom: 12px;
}
.hiw-subtitle {
  font-size: 18px;
  color: var(--ink-soft);
}
.hiw-cards-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 60px;
  position: relative;
}
.hiw-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px 24px;
  flex: 1;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  position: relative;
  min-height: 380px;
}
.hiw-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}
.hiw-card-icon {
  width: 56px;
  height: 56px;
  background: var(--accent-soft);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
}
.hiw-card-icon svg {
  width: 28px;
  height: 28px;
}
.hiw-card-number {
  font-family: var(--sans);
  font-size: clamp(33px, 4vw, 48px);
  font-weight: 800;
  color: var(--border);
  line-height: 0.8;
}
.hiw-card-title {
  font-family: var(--sans);
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
  margin-bottom: 16px;
}
.hiw-divider {
  width: 32px;
  height: 2px;
  background: var(--accent);
  margin-bottom: 16px;
}
.hiw-card-desc {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
}
.hiw-arrow {
  width: 32px;
  height: 32px;
  background: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 10;
  margin: 0 -8px;
}

@media (max-width: 1024px) {
  .hiw-section {
    padding-inline: 20px;
  }
  .hiw-cards-container {
    flex-direction: column;
  }
  .hiw-card {
    width: 100%;
    min-height: auto;
  }
  .hiw-arrow {
    transform: rotate(90deg);
    margin: 16px 0;
  }
}
.section-alt-blue {
  border-top: 1px solid rgba(9, 64, 123, 0.06) !important;
  border-bottom: 1px solid rgba(9, 64, 123, 0.06) !important;
}
`}</style>

      <header className="ghg-hero">
        <div className="ghg-hero-inner container">
          <div className="ghg-hero-copy">
            <SlideIn direction="fade-right" delay={0.1}>
              <h1 className="hero-title">Global <br /><em>hiring guide</em></h1>
              <p className="hero-desc">
                Streamline global operations by managing payroll in over 17+ countries under one roof, thereby eliminating the ongoing administrative burdens of local compliance, taxes, benefits, and other complexities.
              </p>
            </SlideIn>
            <SlideIn direction="fade-up" delay={0.2}>
              <ul className="hero-checklist">
                <li><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Global compliance</li>
                <li><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Local expertise</li>
                <li><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg> Fast setup</li>
              </ul>
              <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-primary-gold" style={{ display: 'inline-flex' }}>
                Get the guide <span className="arrow">→</span>
              </a>
            </SlideIn>
          </div>

          <SlideIn direction="fade-left" delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
            <QuickContactForm />
          </SlideIn>
        </div>


      </header>

      {/* Why choose our global hiring solution? */}
      <div className="home-content-scale">
        <section className="container">
          <div className="borderless-teams-wrap">
            <SlideIn direction="fade-right" delay={0.1} className="borderless-card">
              <div className="borderless-header" style={{ marginBottom: '24px' }}>
                <h2>Why choose our global hiring solution?</h2>
              </div>

              <p style={{ fontSize: '16px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '48px' }}>
                Expand your business globally with confidence. Our platform makes international hiring seamless and compliant.
              </p>

              <div className="borderless-grid">
                {/* Cross dividers */}
                <div className="bg-divider-v"></div>
                <div className="bg-divider-h"></div>

                <SlideIn direction="fade-up" delay={0.2} className="borderless-feature">
                  <div className="bf-header">
                    <div className="bf-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <h3>Access global talent</h3>
                  </div>
                  <p>Tap into talent pools from over 17+ countries worldwide</p>
                </SlideIn>

                <SlideIn direction="fade-up" delay={0.3} className="borderless-feature">
                  <div className="bf-header">
                    <div className="bf-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <h3>Full legal compliance</h3>
                  </div>
                  <p>We ensure all hiring is compliant with local employment laws</p>
                </SlideIn>

                <SlideIn direction="fade-up" delay={0.4} className="borderless-feature">
                  <div className="bf-header">
                    <div className="bf-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <h3>Dedicated support</h3>
                  </div>
                  <p>Get dedicated HR support for all your global employees</p>
                </SlideIn>

                <SlideIn direction="fade-up" delay={0.5} className="borderless-feature">
                  <div className="bf-header">
                    <div className="bf-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                    </div>
                    <h3>Quick setup</h3>
                  </div>
                  <p>Start hiring in new countries in as little as 48 hours</p>
                </SlideIn>
              </div>
            </SlideIn>

            <div className="borderless-image">
              <img src="/case-study/BuiltForBorderlessTeams.webp" alt="Built For Borderless Teams" />
            </div>
          </div>
        </section>
      </div>

      {/* Process */}
      <div className="home-content-scale section-alt-blue">
        <section className="container" style={{ marginBottom: '60px', marginTop: '60px' }}>
          <div className="process-box">
            <h2 className="process-title">From candidate to compliant hire</h2>

            <div className="process-flow">
              <div className="process-line"></div>

              <SlideIn direction="fade-up" delay={0.1} className="process-step">
                <div className="ps-icon-wrap">
                  <div className="ps-icon">
                    {/* Briefcase SVG */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  </div>
                </div>
                <span className="ps-num">01</span>
                <h3>Job Posted</h3>
                <p>You find the right talent.</p>
              </SlideIn>

              <SlideIn direction="fade-up" delay={0.2} className="process-step">
                <div className="ps-icon-wrap">
                  <div className="ps-icon">
                    {/* Person Add SVG */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                  </div>
                </div>
                <span className="ps-num">02</span>
                <h3>We Onboard</h3>
                <p>We handle contracts and documentation.</p>
              </SlideIn>

              <SlideIn direction="fade-up" delay={0.3} className="process-step">
                <div className="ps-icon-wrap">
                  <div className="ps-icon">
                    {/* Shield SVG */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                  </div>
                </div>
                <span className="ps-num">03</span>
                <h3>We Employ</h3>
                <p>We become the legal employer.</p>
              </SlideIn>

              <SlideIn direction="fade-up" delay={0.4} className="process-step">
                <div className="ps-icon-wrap">
                  <div className="ps-icon">
                    {/* Card SVG */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                  </div>
                </div>
                <span className="ps-num">04</span>
                <h3>We Manage</h3>
                <p>Payroll, benefits, taxes, and compliance.</p>
              </SlideIn>

              <SlideIn direction="fade-up" delay={0.5} className="process-step">
                <div className="ps-icon-wrap">
                  <div className="ps-icon">
                    {/* Chart SVG */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="16" width="4" height="4"></rect><rect x="9" y="12" width="4" height="8"></rect><rect x="15" y="6" width="4" height="14"></rect><line x1="3" y1="9" x2="21" y2="3"></line><polyline points="16 3 21 3 21 8"></polyline></svg>
                  </div>
                </div>
                <span className="ps-num">05</span>
                <h3>You Scale</h3>
                <p>Focus on growth while we handle the rest.</p>
              </SlideIn>
            </div>
          </div>
        </section>
      </div>

      {/* Entities & locations */}
      <div className="home-content-scale ">
        <section className="entities-section container">
          <SlideIn direction="fade-up" delay={0.1} className="entities-header-row">
            <div className="entities-title-block">
              <h2 className="entities-main-title">A truly global presence.<br /><span className="gold-text">Built for borderless teams.</span></h2>
              <p className="entities-subtitle">Our legal entities in 17+ countries you to hire, pay, and support talent compliantly, wherever your business grows.</p>
            </div>
            <Link href="/contact" className="btn-outline-gold">View all locations <span aria-hidden>→</span></Link>
          </SlideIn>

          {/* Main Grid: Left is Map/Stats, Right is Featured Entities */}
          <div className="entities-main-grid">
            {/* Left side: Map & Stats */}
            <SlideIn direction="fade-right" delay={0.2} className="map-stats-card">
              {/* Dotted pattern background is styled via CSS radial-gradient */}
              <div className="map-dotted-bg"></div>
              <div className="map-card-content">
                {/* Stats Row at bottom of map card */}
                <div className="map-stats-row">
                  <div className="map-stat-item">
                    <div className="map-stat-icon-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <div className="map-stat-info">

                      <span className="map-stat-number">90+</span>
                      <span className="map-stat-label">countries  <br />supported for hiring</span>
                    </div>
                  </div>

                  <div className="map-stat-item">
                    <div className="map-stat-icon-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="16"></line><line x1="15" y1="22" x2="15" y2="16"></line><line x1="9" y1="16" x2="15" y2="16"></line><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01"></path></svg>
                    </div>
                    <div className="map-stat-info">
                      <span className="map-stat-number">17+</span>
                      <span className="map-stat-label">Legal entities<br />Worldwide</span>
                    </div>
                  </div>

                  <div className="map-stat-item">
                    <div className="map-stat-icon-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <div className="map-stat-info">
                      <span className="map-stat-number">1,400+</span>
                      <span className="map-stat-label">Employees<br />Placed</span>
                    </div>
                  </div>

                  <div className="map-stat-item">
                    <div className="map-stat-icon-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                    </div>
                    <div className="map-stat-info">
                      <span className="map-stat-number">24/5</span>
                      <span className="map-stat-label">Human<br />support</span>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="fade-left" delay={0.4} className="featured-entities-card">
              <div className="fe-card-header">
                <h3 className="fe-card-title">Featured entities</h3>
                <Link href="/contact" className="fe-see-all">See all <span aria-hidden>→</span></Link>
              </div>
              <div
                className="fe-list"
                onWheel={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.scrollTop += e.deltaY;
                }}
              >
                {available.map((c: any, index: number) => {
                  const isExpanded = activeEntity === index;
                  return (
                    <div
                      key={c.name}
                      className={`fe-item ${isExpanded ? 'is-open' : ''}`}
                      onClick={() => {
                        if (isExpanded) {
                          window.location.href = c.href;
                        } else {
                          setActiveEntity(index);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (isExpanded) {
                            window.location.href = c.href;
                          } else {
                            setActiveEntity(index);
                          }
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isExpanded}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="fe-item-header">
                        <div className="fe-item-left">
                          <div className="fe-flag-wrap">
                            {getFlagUrl(c.name) ? (
                              <img src={getFlagUrl(c.name)} alt={c.name + ' flag'} className="fe-flag-img" />
                            ) : (
                              <span className="fe-flag-emoji">{getFlag(c.name)}</span>
                            )}
                          </div>
                          <div className="fe-info">
                            <span className="fe-name">{c.name}</span>
                            <div className="fe-desc">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                              <span>{getShortAddress(c.name)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="fe-item-right-wrap">
                          <span className="fe-active-badge">Active</span>
                          <div className="fe-arrow">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                          </div>
                        </div>
                      </div>

                      <div className="fe-item-details">
                        <div className="fe-details-stats">
                          <div className="fe-detail-box">
                            <div className="fe-detail-icon">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                            </div>
                            <div className="fe-detail-text">
                              <span className="fe-detail-label">Entity type</span>
                              <span className="fe-detail-val">{getCountryDetails(c.name).type}</span>
                            </div>
                          </div>
                          <div className="fe-detail-box">
                            <div className="fe-detail-icon">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><line x1="12" y1="18" x2="12" y2="22"></line><line x1="12" y1="2" x2="12" y2="6"></line></svg>
                            </div>
                            <div className="fe-detail-text">
                              <span className="fe-detail-label">Currency</span>
                              <span className="fe-detail-val">{getCountryDetails(c.name).currency}</span>
                            </div>
                          </div>
                          <div className="fe-detail-box">
                            <div className="fe-detail-icon">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <div className="fe-detail-text">
                              <span className="fe-detail-label">Setup time</span>
                              <span className="fe-detail-val">{getCountryDetails(c.name).time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="fe-details-address">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fe-pin-icon-address"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          <p>{c.address}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SlideIn>
          </div>

          {/* Bottom section: Coming soon locations */}
          <div className="coming-soon-section">
            <h3 className="cs-title">COMING SOON LOCATIONS</h3>
            <div className="cs-grid">
              {comingSoon.map((c: any, index: number) => (
                <SlideIn direction="zoom-in" delay={index * 0.1} key={c.name} className="coming-soon-card">
                  <div className="cs-bg-image" style={{ backgroundImage: `url(${getCountryImage(c.name)})` }}></div>
                  <div className="cs-overlay"></div>
                  <div className="cs-card-content">
                    <div className="cs-country-header">
                      <span className="cs-icon-wrap">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      </span>
                      <span className="cs-country-name">{c.name}</span>
                    </div>
                    <p className="cs-desc">Full country guide and local EOR details:<br />Launching soon. Contact us to plan ahead.</p>
                    <Link href="/contact" className="cs-contact-link">
                      Contact us to plan ahead <span>→</span>
                    </Link>
                  </div>
                  <div className="cs-badge">Coming soon</div>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* How it works */}
      <div className="home-content-scale section-alt-blue">
        <section className="hiw-section container">
          <SlideIn direction="fade-up" delay={0.1} className="hiw-header">
            <h2 className="hiw-title">How it works</h2>
            <p className="hiw-subtitle">Get started with global hiring in four simple steps</p>
          </SlideIn>

          <div className="hiw-cards-container">
            <SlideIn direction="zoom-in" delay={0.2} className="hiw-card">
              <div className="hiw-card-top">
                <div className="hiw-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
                </div>
                <span className="hiw-card-number">01</span>
              </div>
              <h3 className="hiw-card-title">Company or<br />individual</h3>
              <div className="hiw-divider"></div>
              <p className="hiw-card-desc">You&apos;ve found a candidate in a country where you don&apos;t have a local entity, or you&apos;re a freelancer working for global clients without &apos;employed&apos; status.</p>
            </SlideIn>

            <div className="hiw-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>

            <SlideIn direction="zoom-in" delay={0.3} className="hiw-card">
              <div className="hiw-card-top">
                <div className="hiw-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><polyline points="9 15 11 17 15 13"></polyline></svg>
                </div>
                <span className="hiw-card-number">02</span>
              </div>
              <h3 className="hiw-card-title">Onboarding<br />and admin</h3>
              <div className="hiw-divider"></div>
              <p className="hiw-card-desc">We handle onboarding, contracts, local compliance, and all admin work.</p>
            </SlideIn>

            <div className="hiw-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>

            <SlideIn direction="zoom-in" delay={0.4} className="hiw-card">
              <div className="hiw-card-top">
                <div className="hiw-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                </div>
                <span className="hiw-card-number">03</span>
              </div>
              <h3 className="hiw-card-title">Proper<br />employment</h3>
              <div className="hiw-divider"></div>
              <p className="hiw-card-desc">You (or your new team member) are officially employed through Jackson &amp; Franks EOR service with all the benefits of traditional employment.</p>
            </SlideIn>

            <div className="hiw-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>

            <SlideIn direction="zoom-in" delay={0.5} className="hiw-card">
              <div className="hiw-card-top">
                <div className="hiw-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5a5.4 5.4 0 0 0 1-4.5c.35-1.5 1.77-2.92 3.25-3.32a5.4 5.4 0 0 0-4.5 1L7 16l-2.5.5z"></path><path d="M12 15.5l5.5-5.5a2.12 2.12 0 0 0-3-3l-5.5 5.5"></path><circle cx="15" cy="9" r="1"></circle></svg>
                </div>
                <span className="hiw-card-number">04</span>
              </div>
              <h3 className="hiw-card-title">Get started<br />&nbsp;</h3>
              <div className="hiw-divider"></div>
              <p className="hiw-card-desc">Start building your global team with confidence and full compliance.</p>
            </SlideIn>
          </div>

        </section>
      </div>

      {/* FAQ */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="faq-block">
            <SlideIn direction="fade-up" className="faq-head">
              <h2 className="section-title">{ghg.faqs.title}</h2>
              <p className="section-lead">{ghg.faqs.subtitle}</p>
            </SlideIn>
            <div className="faq-list">
              {ghg.faqs.items.map((item: any, i: number) => (
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

      <CandidateCTA imageSrc="/footerCTAImages/contractor.jpg" imageAlt="Start hiring globally today" />
    </>
  )
}
