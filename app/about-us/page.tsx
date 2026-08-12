'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { SlideIn } from '@/components/animations/SlideIn'
import CandidateCTA from '@/components/sections/CandidateCTA'
import about from '@/data/about-us.json'
import ghg from '@/data/global-hiring.json'
import whyChooseUs from '@/data/why-choose-us.json'
import QuickContactForm from '@/components/sections/QuickContactForm'
import { OfficeCarousel } from '@/components/sections/OfficeCarousel'

const worldValues = (about as any).worldValues
const milestones = (about as any).milestones
const team = (about as any).team

const allCountries = (ghg as any).countries
const available = allCountries.filter((c: any) => c.status?.toLowerCase() !== 'coming soon')
const comingSoon = allCountries.filter((c: any) => c.status?.toLowerCase() === 'coming soon')

const getCountryImage = (name: string) => {
  return (about as any).countryImages[name] || '/countries/eor-spain.webp'
}

const getFlagUrl = (name: string) => {
  return (about as any).flagUrls[name] || ''
}

const getFlag = (name: string) => {
  return (about as any).flags[name] || '🌍'
}

const getShortAddress = (name: string) => {
  return (about as any).shortAddresses[name] || name
}

const getWhyIcon = (id: string) => {
  switch (id) {
    case 'compliance-legal-challenges':
      return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
    case 'one-size-fits-all-approach':
      return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>;
    case 'administrative-burden':
      return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
    case 'slow-setup-process':
      return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
    default:
      return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>;
  }
}

const getOffices = (name: string) => {
  return (about as any).offices[name] || [
    { city: getShortAddress(name).split(',')[0], address: 'Main Office Center' }
  ]
}

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [activeMilestone, setActiveMilestone] = useState(0)
  const [activeCountryName, setActiveCountryName] = useState('The Netherlands')
  const [activeValue, setActiveValue] = useState(0)
  const navContainerRef = useRef<HTMLDivElement>(null)

  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMilestone(prev => (prev + 1) % milestones.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [milestones.length])

  const slideOffset = useMemo(() => {
    return Math.max(0, Math.min(milestones.length - visibleCount, activeMilestone - Math.floor(visibleCount / 2)))
  }, [activeMilestone, visibleCount, milestones.length])

  const milestoneMetadata = useMemo(() => {
    const metadataMap: Record<string, { title: string; type: string; quote: string }> = {
      "2013": {
        title: "Foundation",
        type: "Founding milestone",
        quote: "Focusing on providing HR solutions to the Dutch market."
      },
      "2014": {
        title: "Early Growth",
        type: "Operational milestone",
        quote: "Establishing a strong foundation with 100+ employed people."
      },
      "2015": {
        title: "Compliance Excellence",
        type: "Compliance milestone",
        quote: "Demonstrating our commitment to compliance and high standards."
      },
      "2016-2017": {
        title: "European Expansion",
        type: "Expansion milestone",
        quote: "Broadening our European presence and capabilities."
      },
      "2018": {
        title: "Global Scaling",
        type: "Growth milestone",
        quote: "Reaching a new phase of growth and operational scale."
      },
      "2019-2022": {
        title: "Entity Launches",
        type: "Expansion milestone",
        quote: "Opening entities in the Netherlands, Germany, and Italy."
      },
      "2023": {
        title: "Market Reach",
        type: "Growth milestone",
        quote: "Strengthening our presence across key European markets and scaling our teams globally."
      },
      "2024": {
        title: "Client Milestone",
        type: "Expansion milestone",
        quote: "Expanding our local offices to support 700+ clients."
      },
      "2025": {
        title: "China Operations",
        type: "Expansion milestone",
        quote: "Launching our HR Boutique in Shanghai and Hong Kong."
      }
    };
    return metadataMap;
  }, []);

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  function nextMilestone() {
    setActiveMilestone(prev => (prev + 1) % milestones.length)
  }

  function prevMilestone() {
    setActiveMilestone(prev => (prev - 1 + milestones.length) % milestones.length)
  }

  function setMilestone(index: number) {
    setActiveMilestone(index)
  }

  return (
    <>
      {/* Base (Organization + WebSite) + FAQ as one combined JSON-LD block */}
      <JsonLd
        data={buildPageSchemaGraph(
          about.faqs?.items?.length
            ? buildFaqSchema({ path: '/about-us', faq: about.faqs.items })
            : []
        )}
      />
      <style>{`

/* Offices Premium UI */
.offices-premium-section {
  background: #fdfdfd;
  padding: 40px 16px;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.02);
}

.offices-header-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 40px;
}
@media (min-width: 768px) {
  .offices-header-wrap {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}
.offices-header-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f1f5f9;
  padding: 12px 24px;
  border-radius: 999px;
}
.badge-icon {
  width: 32px;
  height: 32px;
  background: #dbeafe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.map-and-featured {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 48px;
}
@media (min-width: 900px) {
  .map-and-featured {
    grid-template-columns: 1fr 340px;
  }
}
.dotted-map-area {
  position: relative;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
}
.dotted-map-bg {
  width: 100%;
  padding-bottom: 60%;
  background-size: cover;
  background-position: center;
  opacity: 1;
}
.map-pin {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;
}
.pin-marker {
  position: relative;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pin-dot {
  width: 10px;
  height: 10px;
  background: #0E59F2;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  transition: transform 0.2s ease, background 0.2s ease;
}
.map-pin:hover .pin-dot, .map-pin.active .pin-dot {
  background: #0E0F3B;
  transform: scale(1.2);
}
.pin-pulse {
  position: absolute;
  inset: -6px;
  background: rgba(14, 89, 242, 0.4);
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s ease;
}
.map-pin:hover .pin-pulse, .map-pin.active .pin-pulse {
  opacity: 1;
  transform: scale(1);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}
.pin-label {
  font-size: 11px;
  font-weight: 700;
  color: #0E0F3B;
  background: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.2s ease;
  pointer-events: none;
  white-space: nowrap;
}
.map-pin:hover .pin-label, .map-pin.active .pin-label {
  opacity: 1;
  transform: translateX(0);
}

.featured-country-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}
.fcc-image {
  height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
}
.fcc-image-content {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  align-items: center;
  gap: 12px;
}
.fcc-flag {
  width: 36px;
  height: 24px;
  border-radius: 4px;
  object-fit: cover;
}
.fcc-details {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;
}
.fcc-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.fcc-text strong {
  display: block;
  font-size: 13px;
  color: #0E0F3B;
  margin-bottom: 4px;
}
.fcc-text span {
  font-size: 12px;
  color: #64748b;
}
.fcc-view-all {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  color: #0E59F2;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
.fcc-view-all:hover {
  background: #f8fafc;
}

.offices-stats-bar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 48px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.02);
}
@media (min-width: 900px) {
  .offices-stats-bar {
    grid-template-columns: repeat(4, 1fr);
  }
}
.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}
.stat-item:last-child {
  border-right: none;
}
.stat-text {
  text-align: left;
}
.stat-icon-wrap {
  width: 48px;
  height: 48px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-text strong {
  display: block;
  font-size: 18px;
  color: #0E0F3B;
}
.stat-text span {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
  display: block;
}

.subsection-title {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 700;
  color: #0E0F3B;
  margin-bottom: 24px;
}

.carousel-container {
  display: flex;
  align-items: center;
  position: relative;
}
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.nav-btn.prev {
  left: -20px;
}
.nav-btn.next {
  right: -20px;
}
.nav-btn:hover {
  background: #f1f5f9;
  color: #0E0F3B;
}

.office-slides {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 24px;
  width: 100%;
  scrollbar-width: none; /* hide scrollbar for Firefox */
}
.office-slides::-webkit-scrollbar {
  display: none; /* hide scrollbar for Chrome/Safari */
}
.office-slide {
  flex: 0 0 240px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.office-slide:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
}
.slide-img {
  height: 140px;
  background-size: cover;
  background-position: center;
  position: relative;
}
.slide-flag, .slide-flag-emoji {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 32px;
  height: 24px;
  border-radius: 4px;
  object-fit: cover;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border: 1px solid rgba(255,255,255,0.8);
}
.slide-content {
  padding: 20px;
}
.slide-content h4 {
  font-size: 15px;
  font-weight: 700;
  color: #0E0F3B;
  margin-bottom: 4px;
}
.slide-address {
  font-size: 11px;
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 30px;
}
.slide-link {
  font-size: 13px;
  color: #0E59F2;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.coming-soon-wrap {
  margin-top: 40px;
}
.office-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
@media (max-width: 1200px) {
  .office-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 900px) {
  .office-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 640px) {
  .office-grid { grid-template-columns: repeat(2, 1fr); }
}
.office-card {
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.office-card:hover {
  transform: translateY(-4px);
}
.office-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(14, 15, 59, 0.4), rgba(14, 15, 59, 0.9));
  z-index: 1;
}
.office-card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
}
.office-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.office-icon-wrap {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.office-country-name {
  font-size: 15px;
  font-weight: 700;
  color: white;
}
.office-card-address {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 12px;
  margin-bottom: 24px;
  line-height: 1.4;
  flex-grow: 1;
}
.office-learn-more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  color: white;
}
.blur-card .office-card-overlay {
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: all 0.4s ease;
}
.blur-card:hover .office-card-overlay {
  backdrop-filter: blur(0);
  -webkit-backdrop-filter: blur(0);
}
.coming-soon-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-family: var(--sans);
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  z-index: 5;
  transition: opacity 0.4s ease;
  pointer-events: none;
  background: rgba(14, 15, 59, 0.7);
  padding: 15px 4px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
}
.blur-card:hover .coming-soon-label {
  opacity: 0;
}

@media (max-width: 1024px) {
  .map-and-featured {
    grid-template-columns: 1fr;
  }
  .offices-stats-bar {
    grid-template-columns: 1fr 1fr;
  }
  .stat-item {
    border-right: none;
    padding-bottom: 16px;
  }
}

/* Timeline */
.timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.timeline-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  position: relative;
}
.timeline-year {
  display: inline-block;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(22px, 4vw, 30px);
  color: var(--accent);
  margin-bottom: 12px;
}
.timeline-item p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* Values */
.values-strip {
  background: #0E0F3B;
  color: var(--bg);
  padding: 40px 0;
}
@media (min-width: 768px) {
  .values-strip {
    padding: 40px 0;
  }
}
.values-strip .tag { color: var(--accent-warm); }
.values-strip .section-title { color: var(--bg) !important; }
.values-strip .section-title em { color: var(--accent-warm); }
.values-strip .section-lead { color: rgba(255, 255, 255, 0.7) !important; }
/* Values */
.values-strip {
  background: #f4f6f9;
  color: #0E0F3B;
  padding: 40px 0;
  border-top: 1px solid rgba(14, 15, 59, 0.05);
}
@media (min-width: 768px) {
  .values-strip {
    padding: 40px 0;
  }
}
.values-strip .tag { color: #F7931E; }
.values-strip .section-title { color: #0E0F3B !important; }
.values-strip .section-title em { color: #F7931E; }
.values-strip .section-lead { color: #475569 !important; }

.world-compact-container {
  width: 100%;
  position: relative;
}



/* Cards Grid */
.world-compact-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px; /* Gap between cards: 24px */
  width: 100%;
  position: relative;
}

/* Timeline Column wrapper representing card */
.world-compact-col {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  padding-top: 22px; /* Leave space at top of column for the overlapping circle */
}

.world-card-wrapper {
  position: relative;
  max-width: 320px;
  width: 100%;
  margin: 0 auto;
}

.world-node-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #F7931E; /* Orange circle */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(247, 147, 30, 0.35);
  position: absolute;
  top: -22px; /* 50% outside the wrapper/card */
  left: 16px; /* Aligned to the top-left edge of the card */
  z-index: 5;
}

.world-node-circle .node-letter {
  color: white;
  font-size: 16px;
  font-weight: 800;
  font-style: italic;
}

/* Compact Card Styling */
.value-compact-card {
  background: #ffffff;
  border-radius: 16px; /* 16px radius */
  box-shadow: 0 10px 30px rgba(14, 43, 102, 0.05); /* soft premium shadow tinted with navy */
  position: relative;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(14, 43, 102, 0.08);
  height: 230px; /* Inside 220-240px range */
  width: 100%;
  max-width: 320px; /* 300-320px width */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  z-index: 2;
}



.value-compact-bg-letter {
  font-size: 140px; /* Large faded background letter */
  font-weight: 900;
  color: rgba(14, 43, 102, 0.05); /* top-right with 5% opacity and brand navy tint */
  position: absolute;
  right: 12px;
  top: -15px;
  font-style: italic;
  line-height: 1;
  user-select: none;
  pointer-events: none;
  transition: transform 0.4s ease, color 0.4s ease;
}

.value-compact-card-inner {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  justify-content: flex-start;
  text-align: left;
}

.value-compact-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #475569; /* Small Label: CORE VALUE */
  letter-spacing: 0.1em;
}

.value-compact-title {
  font-size: 32px; /* 32px Large Title */
  font-weight: 800;
  color: #0E2B66; /* Jackson & Frank Navy */
  margin: 0;
  line-height: 1.1;
}

.value-compact-desc {
  font-size: 16px; /* 16px Description */
  line-height: 1.5;
  color: #475569;
  margin: 0;
  font-weight: 400;
}

/* Hover interactions */
.value-compact-card:hover {
  transform: translateY(-8px); /* lift 8px */
  box-shadow: 0 20px 40px rgba(14, 43, 102, 0.12), 0 0 16px rgba(247, 147, 30, 0.15); /* stronger shadow + orange border glow */
  border-color: #0e2b66;
}

.value-compact-card:hover .value-compact-bg-letter {
  transform: scale(1.05) rotate(-2deg);
}

/* CSS Animations */
@keyframes worldFadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes worldScaleCircle {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Stagger animations for nodes and cards */
.world-compact-container {
  animation: worldFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.world-compact-col:nth-child(1) .world-node-circle { animation: worldScaleCircle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both; }
.world-compact-col:nth-child(1) .value-compact-card { animation: worldFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }

.world-compact-col:nth-child(2) .world-node-circle { animation: worldScaleCircle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both; }
.world-compact-col:nth-child(2) .value-compact-card { animation: worldFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both; }

.world-compact-col:nth-child(3) .world-node-circle { animation: worldScaleCircle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both; }
.world-compact-col:nth-child(3) .value-compact-card { animation: worldFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both; }

.world-compact-col:nth-child(4) .world-node-circle { animation: worldScaleCircle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both; }
.world-compact-col:nth-child(4) .value-compact-card { animation: worldFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both; }

.world-compact-col:nth-child(5) .world-node-circle { animation: worldScaleCircle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both; }
.world-compact-col:nth-child(5) .value-compact-card { animation: worldFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both; }

/* Responsive Overrides */
@media (max-width: 1024px) {
  .world-horizontal-line-desktop {
    display: none;
  }
  .world-compact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 24px;
  }
}

@media (max-width: 640px) {
  .world-compact-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .world-compact-container,
  .world-node-circle,
  .world-node-connector,
  .value-compact-card {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}

/* Vision / Mission */
.vm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.vm-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
}
@media (min-width: 768px) {
  .vm-card {
    padding: 56px 48px;
  }
}
.vm-card .tag { margin-bottom: 20px; }
.vm-card p {
  font-family: var(--serif);
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 400;
  line-height: 1.2;
  color: var(--ink);
}
.vm-card-dark {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}
.vm-card-dark .tag { color: rgba(255, 255, 255, 0.7); }
.vm-card-dark p { color: white; }

@media (max-width: 1024px) {
  .timeline { grid-template-columns: repeat(2, 1fr); }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .vm-grid, .team-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .timeline { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: 1fr; }
  .team-card { grid-template-columns: 1fr; }
  .team-photo { aspect-ratio: 16 / 10; }
}

/* =======================================
   About Us Premium Hero
   ======================================= */
.about-premium-hero {
  position: relative;
  margin-top: -70px;

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
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 0%) 100%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/about2.webp);
}

.about-premium-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.about-premium-hero > * {
  position: relative;
  z-index: 1;
}

.about-premium-hero-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding-top: 2vh;
  padding-inline: clamp(16px, 4vw, 32px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 48px;
}

@media (max-width: 960px) {
  .about-premium-hero-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
    padding-top: 6rem;
  }
}

.about-premium-hero .service-hero-copy {
  max-width: 640px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}


.about-premium-hero h1 em {
  font-style: italic;
  color: #F7931E;
}

.about-premium-hero .service-hero-lede {
  font-size: 19px;
  color: rgba(255,255,255,0.82);
  line-height: 1.6;
  max-width: 520px;
}

.about-premium-hero .tag {
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 12px;
}

@media (max-width: 1440px) {
  .about-premium-hero {
    background-size: 60% auto;
    background-position: right -2% center;
  }
}

@media (max-width: 1280px) {
  .about-premium-hero {
    background-size: 85% auto;
    background-position: right -5% center;
  }
}

@media (max-width: 1024px) {
  .about-premium-hero {
    background-size: 90% auto;
    background-position: right -10% center;
  }
}

@media (max-width: 960px) {
  .about-premium-hero {
    background-size: 70% auto;
    background-position: right -50px center;
    padding: 72px 0;
  }
  .about-premium-hero-inner {
    padding: 0 20px;
  }
}

@media (max-width: 640px) {
  .about-premium-hero {
    min-height: auto;
    /* Top padding must clear the full height of the ::before photo band below,
       otherwise the h1 and lede render on top of the image. 240px band + 24px
       breathing room. */
    padding: 264px 20px 56px;
    background-image: none;
    background-color: #0E0F3B;
  }
  .about-premium-hero::before {
    content: '';
    position: absolute;
    top: 5vh;
    left: 0;
    right: 0;
    height: 240px;
    background-image: url(/services/service-page/about2.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 62%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 62%, transparent 100%);
    pointer-events: none;
  }
  .about-premium-hero .cta-row {
    flex-direction: column;
    gap: 12px;
  }
  .about-premium-hero .cta-row > * {
    width: 100%;
  }
}

.about-premium-hero .btn-primary {
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
  transition: all 0.2s;
}

.about-premium-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.5);
}

.about-premium-hero .btn-secondary {
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

.about-premium-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255,255,255,0.7);
}/* =======================================
   Interactive Milestone Slider Style
   ======================================= */
.dashboard-wrap {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 48px auto 0;
  max-width: 1200px;
  width: 100%;
}

.timeline-slider-outer {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  gap: 20px;
  background: white;
  border: 1px solid rgba(14, 15, 59, 0.08);
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow: 0 10px 30px rgba(14, 15, 59, 0.03);
}

.timeline-nav-arrow {
  width: 44px;
  height: 44px;
  background: white;
  border: 1px solid rgba(14, 58, 115, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #0E3A73;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}
.timeline-nav-arrow:hover:not(:disabled) {
  background: rgba(14, 58, 115, 0.05);
  transform: translateY(-2px);
  border-color: #0E3A73;
}
.timeline-nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.timeline-slider-window {
  overflow: hidden;
  flex-grow: 1;
  width: 100%;
  padding: 20px 0;
}

.timeline-slider-track {
  display: flex;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
}

.timeline-slide-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  position: relative;
  padding: 0 16px;
  transition: all 0.3s ease;
}

.timeline-item-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
}

.timeline-item-year {
  font-size: 20px;
  font-weight: 800;
  color: #0E3A73;
  transition: color 0.3s ease;
}
.timeline-slide-item.active .timeline-item-year {
  color: #FF9F2E;
}

.timeline-item-title {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Horizontal line segments connecting dots */
.timeline-line-container {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  height: 24px;
  margin-bottom: 24px;
}

.timeline-line-segment {
  flex-grow: 1;
  height: 2px;
  background: rgba(14, 58, 115, 0.1);
  transition: background 0.3s ease;
}
.timeline-slide-item.active .timeline-line-segment {
  background: rgba(255, 159, 46, 0.2);
}

.timeline-node-dot {
  width: 14px;
  height: 14px;
  background: white;
  border: 2.5px solid #0E3A73;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;
  flex-shrink: 0;
}
.timeline-dot-inner {
  width: 6px;
  height: 6px;
  background: transparent;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.timeline-slide-item.active .timeline-node-dot {
  border-color: #FF9F2E;
  transform: scale(1.4);
  box-shadow: 0 0 25px rgba(255, 159, 46, 0.45);
}
.timeline-slide-item.active .timeline-dot-inner {
  background: #FF9F2E;
}

.timeline-item-preview-desc {
  font-size: 13px;
  line-height: 1.5;
  color: #64748b;
  margin: 0;
  max-width: 240px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}
.timeline-slide-item.active .timeline-item-preview-desc {
  opacity: 1;
  color: #475569;
}

/* Active Card Styling */
.timeline-active-card-wrap {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  animation: cardFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes cardFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.milestone-premium-card {
  background: white;
  border: 1px solid rgba(14, 58, 115, 0.08);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 20px 40px rgba(14, 15, 59, 0.04), 0 1px 3px rgba(14, 15, 59, 0.01);
  display: flex;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}
.milestone-premium-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 48px rgba(14, 15, 59, 0.06);
}

.milestone-card-left-accent {
  width: 5px;
  background: #FF9F2E;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}

.milestone-card-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-left: 12px;
}

.milestone-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #0E3A73;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.badge-dot {
  width: 6px;
  height: 6px;
  background: #0E3A73;
  border-radius: 50%;
}

.milestone-year-title {
  font-size: 32px !important;
  font-weight: 800 !important;
  color: #0E0F3B !important;
  margin: 0 !important;
  background: none !important;
  padding: 0 !important;
  box-shadow: none !important;
  letter-spacing: -0.02em;
}

.milestone-card-subtitle-tag {
  display: inline-block;
  align-self: flex-start;
  font-size: 12px;
  font-weight: 700;
  color: #0E3A73;
  background: rgba(14, 58, 115, 0.06);
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.dashboard-desc-text {
  font-size: 14.5px !important;
  line-height: 1.65 !important;
  color: #475569 !important;
  margin: 0 !important;
  font-weight: 500 !important;
}

.milestone-divider {
  border-bottom: 1px dashed rgba(14, 58, 115, 0.12);
  margin: 4px 0;
}

.milestone-tag {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 6px;
}

.milestone-read-more:hover .arrow {
  transform: translateX(3px);
}

/* Tablet & Mobile Overrides */
@media (max-width: 1024px) {
  .dashboard-wrap {
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .timeline-slider-outer {
    padding: 24px 16px;
  }
  .timeline-item-year {
    font-size: 18px;
  }
  .timeline-item-preview-desc {
    display: none; /* hide preview desc on mobile for compact view */
  }
  .timeline-active-card-wrap {
    order: 2; /* card appears below timeline on mobile */
  }
  .timeline-slider-outer {
    order: 1;
  }
}

/* =======================================
   Premium Vision / Mission Cards
   ======================================= */
.vm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 40px;
}

.vm-card-premium {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 20px 40px rgba(0,0,0,0.06);
  cursor: pointer;
  background: white;
}

.vm-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.vm-card-premium:hover .vm-bg {
  transform: scale(1.05);
}

/* Vision uses a light overlay so text is dark */
.vm-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 100%);
  z-index: 2;
  transition: opacity 0.4s ease;
}

.vm-content {
  position: relative;
  z-index: 3;
  padding: 28px 24px;
  color: var(--ink);
  transform: translateY(16px);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@media (min-width: 768px) {
  .vm-content {
    padding: 48px;
  }
}

.vm-card-premium:hover .vm-content {
  transform: translateY(0);
}

.vm-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(8px);
  color: var(--ink);
}

.vm-content p {
  font-family: var(--serif);
  font-size: clamp(28px, 3.5vw, 42px);
  line-height: 1.25;
  font-weight: 400;
  margin: 0;
}

/* Mission uses a rich golden overlay so text is white */
.vm-card-premium.vm-mission .vm-overlay {
  background: linear-gradient(to top, rgba(9, 64, 123,1) 0%, rgba(9, 64, 123,0.8) 40%, rgba(9, 64, 123,0) 100%);
}

.vm-card-premium.vm-mission .vm-content {
  color: white;
}

.vm-card-premium.vm-mission .vm-badge {
  border-color: rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.15);
  color: white;
}

@media (max-width: 960px) {
  .vm-grid {
    grid-template-columns: 1fr;
  }
  .vm-card-premium {
    min-height: 400px;
  }
}


/* =======================================
   Premium Leadership Team (Horizontal)
   ======================================= */
.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 36px;
  margin-top: 48px;
}
.team-card {
  background: #f4f6f9;
  border-radius: 20px;
  border: 1px solid rgba(14, 15, 59, 0.08);
  box-shadow: 0 10px 30px rgba(14, 15, 59, 0.04);
  padding: 36px;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 380px;
}
.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(14, 15, 59, 0.08);
}
.team-quote {
  color: var(--accent-warm);
  opacity: 0.15;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.team-desc {
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-bottom: 24px;
  flex-grow: 1;
}
.team-card-divider {
  height: 1px;
  background: rgba(14, 15, 59, 0.08);
  margin-bottom: 24px;
  width: 100%;
}
.team-profile-sec {
  display: flex;
  align-items: center;
  gap: 16px;
}
.team-avatar-wrap {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(14, 15, 59, 0.1);
  overflow: hidden;
  flex-shrink: 0;
}
.team-avatar-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}
.team-profile-info {
  display: flex;
  flex-direction: column;
}
.team-profile-info h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 4px 0;
  font-family: var(--sans);
}
.team-profile-info .team-role {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin: 0;
}

@media (max-width: 1024px) {
  .team-grid {
    gap: 24px;
  }
  .team-card {
    padding: 28px;
    min-height: 360px;
  }
}
@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .team-profile-sec {
    flex-direction: column;
    text-align: center;
  }
}

/* =======================================
   Why Choose Us Section
   ======================================= */
.why-choose-section {
  position: relative;
  background-color: #fdfdfd;
  background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
  background-size: 24px 24px;
  padding: 80px 40px;
  border-radius: 24px;
}
.why-choose-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
}
.why-choose-copy {
  max-width: 700px;
}
.why-choose-title {
  font-family: var(--sans);
  font-size: clamp(28px, 4vw, 36px);
  color: #0E0F3B;
  margin-bottom: 16px;
  font-weight: 700;
}
.why-choose-desc {
  font-size: 16px;
  color: #64748b;
  line-height: 1.6;
}
.why-choose-btn {
  background: #0E0F3B;
  color: #fff;
  padding: 12px 24px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  flex-shrink: 0;
}
.why-choose-btn:hover {
  background: #09407b;
}
.why-choose-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.why-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.why-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
}
.why-card-bg-num {
  position: absolute;
  top: 50%;
  right: -5%;
  transform: translateY(-50%);
  font-size: 160px;
  font-weight: 800;
  color: #f8fafc;
  z-index: 1;
  line-height: 1;
  letter-spacing: -0.05em;
  user-select: none;
  pointer-events: none;
}
.why-card-content {
  position: relative;
  z-index: 2;
}
.why-icon-wrap {
  width: 64px;
  height: 64px;
  background: #0E0F3B;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: white;
}
.why-card-title {
  font-size: 16px;
  font-weight: 700;
  color: #0E0F3B;
  margin-bottom: 12px;
  line-height: 1.4;
}
.why-card-desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
}
@media (max-width: 1024px) {
  .why-choose-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .why-choose-header {
    flex-direction: column;
    gap: 20px;
  }
  .why-choose-grid {
    grid-template-columns: 1fr;
  }
  .why-choose-section {
    padding: 40px 20px;
  }
}


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

      <header className="service-hero about-premium-hero">
        <div className="about-premium-hero-inner">
          <div className="service-hero-copy">
            <SlideIn direction="fade-right" delay={0.1}>
              <h1><em>About </em>us</h1>
              <p className="service-hero-lede">{about.definition.description}</p>
            </SlideIn>

            <SlideIn direction="fade-up" delay={0.2}>
              <div className="service-hero-features" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {about.definition.keyFeatures.map((f: string, i: number) => (
                  <div key={i} className="hero-feature" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, fontSize: '15px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px', }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#7FCDEE' }}><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" /><path d="M2 12H22" /><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" /></svg>
                    {f}
                  </div>
                ))}
              </div>

              <div className="cta-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-primary">
                  {about.definition.primaryButtonText} <span className="arrow">→</span>
                </Link>
                <a href="https://calendly.com/jacksonandfrank/discover-us" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  {about.definition.secondaryButtonText}
                </a>
              </div>
            </SlideIn>
          </div>

          <SlideIn direction="fade-left" delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
            <QuickContactForm />
          </SlideIn>
        </div >
      </header >

      <div className="home-content-scale">
        <section className="stats-strip">
          <div className="container stats-strip-inner">
            {about.definition.trustSignals.stats.map((s: any, i: number) => (
              <SlideIn key={i} direction="zoom-in" delay={0.1 * i} className="stat-item">
                <strong>{s.value}</strong>
                {s.label && <span className="stat-label">{s.label}</span>}
                <span className="stat-desc">{s.description}</span>
              </SlideIn>
            ))}
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container">
          <SlideIn direction="fade-up" className="section-head">
            <h2 className="section-title">Our <em>story</em> </h2>
            <p className="section-lead">
              Discover the milestones that shaped Jackson &amp; Frank into a global workforce solutions provider, from our founding in the Netherlands to our expansion across 17+ countries.           </p>
          </SlideIn>
          <div className="dashboard-wrap">
            <div className="timeline-slider-outer">
              <button
                className="timeline-nav-arrow left"
                onClick={() => setActiveMilestone(prev => Math.max(0, prev - 1))}
                disabled={activeMilestone === 0}
                aria-label="Previous milestone"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="timeline-slider-window">
                <div
                  className="timeline-slider-track"
                  style={{
                    transform: `translateX(-${slideOffset * (100 / visibleCount)}%)`,
                  }}
                >
                  {milestones.map((m: any, i: number) => {
                    const isActive = activeMilestone === i;
                    const meta = milestoneMetadata[m.year];
                    return (
                      <div
                        key={i}
                        className={`timeline-slide-item ${isActive ? 'active' : ''}`}
                        style={{ flex: `0 0 ${100 / visibleCount}%` }}
                        onClick={() => setMilestone(i)}
                      >
                        <div className="timeline-item-header">
                          <span className="timeline-item-year">{m.year}</span>
                          <span className="timeline-item-title">{meta?.title || "Milestone"}</span>
                        </div>
                        <div className="timeline-line-container">
                          <span className="timeline-line-segment left"></span>
                          <div className="timeline-node-dot">
                            <span className="timeline-dot-inner"></span>
                          </div>
                          <span className="timeline-line-segment right"></span>
                        </div>
                        <p className="timeline-item-preview-desc">
                          {m.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                className="timeline-nav-arrow right"
                onClick={() => setActiveMilestone(prev => Math.min(milestones.length - 1, prev + 1))}
                disabled={activeMilestone === milestones.length - 1}
                aria-label="Next milestone"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="values-strip">
          <div className="container">
            <SlideIn direction="fade-up" className="section-head">
              <h2 className="section-title">We operate by <em>W.O.R.L.D</em></h2>
              <p className="section-lead">
                At Jackson &amp; Frank, We operate by the values that make us and our clients successful, represented by W.O.R.L.D:
              </p>
            </SlideIn>
            <div className="world-compact-container">
              {/* Horizontal line running behind the nodes on desktop */}
              <div className="world-horizontal-line-desktop"></div>

              {/* Grid of Cards */}
              <div className="world-compact-grid">
                {worldValues.map((v: any, i: number) => {
                  const letterLower = v.letter.toLowerCase();
                  return (
                    <div key={v.letter} className={`world-compact-col item-${letterLower}`}>
                      <div className="world-card-wrapper">
                        {/* Orange Circle Node positioned absolutely at top-left of wrapper */}
                        <div className="world-node-circle">
                          <span className="node-letter">{v.letter}</span>
                        </div>

                        {/* Card representation */}
                        <div className="value-compact-card">
                          <span className="value-compact-bg-letter">{v.letter}</span>
                          <div className="value-compact-card-inner">
                            <h3 className="value-compact-title">{v.title}</h3>
                            <p className="value-compact-desc">{v.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container">
          <div className="vm-grid">
            <SlideIn direction="fade-up" delay={0.1} className="vm-card-premium">
              <div className="vm-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')" }}></div>
              <div className="vm-overlay"></div>
              <div className="vm-content">
                <span className="vm-badge">Vision</span>
                <p>A world in which international employability has no barriers.</p>
              </div>
            </SlideIn>

            <SlideIn direction="fade-up" delay={0.2} className="vm-card-premium vm-mission">
              <div className="vm-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80')" }}></div>
              <div className="vm-overlay"></div>
              <div className="vm-content">
                <span className="vm-badge">Mission</span>
                <p>Enabling international labour mobility for organizations and people.</p>
              </div>
            </SlideIn>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container">
          <div className="offices-premium-section">
            <div className="offices-header-wrap">
              <SlideIn direction="fade-up" className="offices-header-left">
                <h2 className="section-title" style={{ marginTop: '12px', marginBottom: '16px', fontSize: 'clamp(28px, 4vw, 48px)', color: '#0E0F3B' }}>Our offices</h2>
                <p className="section-lead" style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>Our global network spans multiple continents, bringing you local expertise wherever you need it.</p>
              </SlideIn>
            </div>

            <OfficeCarousel showComingSoon />
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container">
          <SlideIn direction="fade-up" className="section-head">
            <h2 className="section-title">Meet Our <em>Leadership Team</em></h2>
            <p className="section-lead">
              Meet the experienced professionals leading Jackson &amp; Frank&apos;s global expansion, immigration, payroll, and compliance services.
            </p>
          </SlideIn>
          <div className="team-grid">
            {team.map((member: any, i: any) => (
              <SlideIn key={member.name} direction="fade-up" delay={0.1 * i} className="team-card">
                <div>

                  <p className="team-desc">{member.bio}</p>
                </div>
                <div>
                  <div className="team-card-divider"></div>
                  <div className="team-profile-sec">
                    <div className="team-avatar-wrap">
                      <img src={member.image} alt={member.name} />
                    </div>
                    <div className="team-profile-info">
                      <h3>{member.name}</h3>
                      <span className="team-role">{member.role}</span>
                    </div>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container">
          <div className="why-choose-section">
            <div className="why-choose-header">
              <div className="why-choose-copy">
                <SlideIn direction="fade-up">
                  <h2 className="why-choose-title">{whyChooseUs.title}</h2>
                  <p className="why-choose-desc">{whyChooseUs.description}</p>
                </SlideIn>
              </div>
              <SlideIn direction="fade-left">
                <Link href={whyChooseUs.ctaButton.href} className="why-choose-btn">
                  {whyChooseUs.ctaButton.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
              </SlideIn>
            </div>
            <div className="why-choose-grid">
              {whyChooseUs.items.map((item: any, i: number) => (
                <SlideIn key={item.id} direction="fade-up" delay={0.1 * i} className="why-card">
                  <div className="why-card-bg-num">0{i + 1}</div>
                  <div className="why-card-content">
                    <div className="why-icon-wrap">
                      {getWhyIcon(item.id)}
                    </div>
                    <h3 className="why-card-title">{item.solution}</h3>
                    <p className="why-card-desc">{item.solutionDescription}</p>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="home-content-scale">
        <section className="section container">
          <div className="faq-block">
            <SlideIn direction="fade-up" className="faq-head">
              <h2 className="section-title">{about.faqs.title}</h2>
              <p className="section-lead">{about.faqs.subtitle}</p>
            </SlideIn>
            <div className="faq-list">
              {about.faqs.items.map((item: any, i: number) => (
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
                    <p style={{ display: openFaq === i ? 'block' : 'none' }} className="faq-a">{item.answer}</p>
                  </button>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      <CandidateCTA imageSrc="/footerCTAImages/contractor.jpg" imageAlt="Let's build your team" />
    </>
  )
}
