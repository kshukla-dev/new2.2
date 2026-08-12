'use client'
import { BaseSchema } from '@/components/seo/BaseSchema'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { SlideIn } from '@/components/animations/SlideIn'
import ev from '@/data/china-europe-event.json'
import QuickContactForm from '@/components/sections/QuickContactForm'

export default function PressReleasePage() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const speakersLength = ev.speakers.length
  const [activeIndex, setActiveIndex] = useState(speakersLength) // Start at the middle copy

  const displayedSpeakers = useMemo(() => {
    // Triple the speakers array for seamless infinite looping
    const tripled = [...ev.speakers, ...ev.speakers, ...ev.speakers]
    return tripled.map((sp, idx) => {
      return {
        ...sp,
        featured: idx === activeIndex
      }
    })
  }, [activeIndex])

  const selectSpeaker = (index: number) => {
    const totalLength = speakersLength * 3
    if (index >= 0 && index < totalLength) {
      setActiveIndex(index)

      // 1. Smooth scroll to the targeted item
      setTimeout(() => {
        const track = carouselRef.current
        if (track) {
          const cards = track.querySelectorAll('.sp-card-new')
          const activeCard = cards[index] as HTMLElement
          if (activeCard) {
            const offsetLeft = activeCard.offsetLeft
            const trackWidth = track.clientWidth
            const cardWidth = activeCard.clientWidth

            track.scrollTo({
              left: offsetLeft - (trackWidth / 2) + (cardWidth / 2),
              behavior: 'smooth'
            })
          }
        }
      }, 60)

      // 2. Seamlessly jump to the middle copy once smooth scroll completes (approx 450ms)
      setTimeout(() => {
        const track = carouselRef.current
        if (track) {
          const cards = track.querySelectorAll('.sp-card-new')

          let newIndex = index
          // If we scrolled into the first copy, jump instantly to the middle copy
          if (index < speakersLength) {
            newIndex = index + speakersLength
            setActiveIndex(newIndex)
            const activeCard = cards[newIndex] as HTMLElement
            if (activeCard) {
              const offsetLeft = activeCard.offsetLeft
              const trackWidth = track.clientWidth
              const cardWidth = activeCard.clientWidth
              track.scrollTo({
                left: offsetLeft - (trackWidth / 2) + (cardWidth / 2),
                behavior: 'auto'
              })
            }
          }
          // If we scrolled into the third copy, jump instantly to the middle copy
          else if (index >= speakersLength * 2) {
            newIndex = index - speakersLength
            setActiveIndex(newIndex)
            const activeCard = cards[newIndex] as HTMLElement
            if (activeCard) {
              const offsetLeft = activeCard.offsetLeft
              const trackWidth = track.clientWidth
              const cardWidth = activeCard.clientWidth
              track.scrollTo({
                left: offsetLeft - (trackWidth / 2) + (cardWidth / 2),
                behavior: 'auto'
              })
            }
          }
        }
      }, 550)
    }
  }

  const scrollLeft = () => {
    selectSpeaker(activeIndex - 1)
  }

  const scrollRight = () => {
    selectSpeaker(activeIndex + 1)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      selectSpeaker(speakersLength) // Center Pawel (index 4) on mount
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <BaseSchema />
      <style>{`

/* ============================================================
   HERO SECTION
   ============================================================ */
.pr-hero {
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
  
}
.pr-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
  z-index: 1;
}
.pr-hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: center;
  min-height: 600px;
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: clamp(16px, 4vw, 32px);
}
.pr-hero-copy {
  padding-top: 60px;
  padding-bottom: 80px;
  max-width: 580px;
  position: relative;
  z-index: 2;
}
.pr-hero-tag {
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
.pr-hero-title {
  margin-bottom: 24px;
}
.pr-hero-title .gold-text {
  color: var(--accent-warm, #F7931E);
  
  font-family: var(--serif);
}
.pr-hero-desc {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 40px;
}
.pr-details-grid {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.pr-detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.pr-detail-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgba(9, 64, 123, 0.15);
  border: 1px solid rgba(9, 64, 123, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-sky, #7FCDEE);
  flex-shrink: 0;
}
.pr-detail-info {
  display: flex;
  flex-direction: column;
}
.pr-detail-info strong {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
}
.pr-detail-info span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 2px;
}
.btn-primary-gold {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #F7931E;
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.35);
}
.btn-primary-gold:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}
.pr-hero-visual {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
}
.pr-hero-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%);
  mask-image: linear-gradient(to right, transparent 0%, #0e103ca3 15%)
}

/* ============================================================
   EVENT BACKGROUND
   ============================================================ */
.pr-background-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}
.pr-bg-copy {
  max-width: 600px;
}
.pr-bg-copy .tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--accent, #09407B);
  margin-bottom: 16px;
}
.pr-bg-title {
  font-family: var(--serif);
  font-size: clamp(32px, 3.5vw, 42px);
   
  
  margin-bottom: 24px;
}
.pr-bg-text p {
  font-size: 15px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 16px;
}
.pr-bg-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 40px;
  border-top: 1px solid #e5e7eb;
  padding-top: 32px;
}
.pr-bg-stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.pr-stat-icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fdfaf5;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #143369;
}
.pr-stat-text-wrap {
  display: flex;
  flex-direction: column;
}
.pr-stat-text-wrap strong {
  font-size: 20px;
  font-weight: 700;
   
  line-height: 1.2;
}
.pr-stat-text-wrap span {
  font-size: 11px;
  color: #777;
  margin-top: 4px;
}
.pr-bg-image-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 380px;
}
.pr-bg-earth-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ============================================================
   JOURNEY SECTION
   ============================================================ */
.journey-section {
  background: var(--accent-soft);
  padding: 60px 0;
}
.journey-tag {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #143369;
  margin-bottom: 16px;
  text-transform: uppercase;
}
.journey-title {
  font-family: var(--serif);
  font-size: clamp(32px, 3.5vw, 42px);
   
  
  margin-bottom: 16px;
}
.journey-subtitle {
  font-size: 15px;
  color: #555;
  max-width: 600px;
  margin: 0 auto 64px;
  line-height: 1.6;
}
.journey-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
}
.journey-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 16px;
  padding: 40px 32px;
  text-align: left;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  transition: all 0.3s ease;
  position: relative;
}
.journey-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
.journey-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.journey-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fdfaf5;
  border: 1px solid #e5e7eb;
  color: #143369;
  display: flex;
  align-items: center;
  justify-content: center;
}
.journey-number {
  font-size: 22px;
  font-family: var(--serif);
  color: #e5e7eb;
  font-weight: 700;
}
.journey-card-cat {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #143369;
  margin-bottom: 8px;
}
.journey-card-title {
  font-family: var(--serif);
  font-size: 20px;
   
  
  margin-bottom: 12px;
}
.journey-card-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
}
.journey-card-link {
  font-size: 13px;
  font-weight: 700;
  color: #143369;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.journey-card-link:hover {
  color: #09407B;
}

/* Connector line decoration for desktop */
@media (min-width: 1025px) {
  .journey-card:not(:last-child)::after {
    content: '→';
    position: absolute;
    right: -24px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: #e5e7eb;
    pointer-events: none;
  }
}

/* ============================================================
   EXPECTATIONS SECTION
   ============================================================ */
.expect-section {
  padding: 60px 0;
}
.expect-tag {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #143369;
  margin-bottom: 16px;
  text-transform: uppercase;
}
.expect-title {
  font-family: var(--serif);
  font-size: clamp(32px, 3.5vw, 42px);
   
  
  margin-bottom: 64px;
}
.expect-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
}
.expect-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.expect-icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #fdfaf5;
  border: 1px solid #e5e7eb;
  color: #143369;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.expect-item h3 {
  font-size: 15px;
   
  font-weight: 600;
  margin-bottom: 8px;
}
.expect-item p {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

/* ============================================================
   SPEAKERS SECTION
   ============================================================ */
.pr-speakers-section {
  padding: 60px 0;
  overflow: hidden;
}
.speakers-section-grid {
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: stretch;
}
.speakers-left-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  max-width: 100%;
  width: 100%;
}
.speakers-head-text {
  max-width: 700px;
}
.speakers-left-info .tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #143369;
  margin-bottom: 16px;
}
.speakers-main-title {
  font-family: var(--serif);
  font-size: clamp(32px, 3.5vw, 42px);
   
  
  margin-bottom: 16px;
}
.speakers-main-title .gold-text {
  color: #143369;
  font-family: var(--serif);
}
.speakers-desc-text {
  font-size: 15px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 0;
}
.speakers-carousel-wrapper {
  position: relative;
  width: 100%;
  padding: 0 48px;
}
.speakers-carousel-track {
  display: flex;
  flex-wrap: nowrap;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 12px 4px 24px;
  scrollbar-width: none; /* Firefox */
}
.speakers-carousel-track::-webkit-scrollbar {
  display: none; /* Safari & Chrome */
}
.sp-card-new {
  flex-shrink: 0;
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  overflow: hidden;
  scroll-snap-align: start;
}

/* Featured Speaker layout */
.featured-card {
  width: 480px;
}
.featured-card-inner {
  display: flex;
  height: 100%;
  gap: 20px;
}
.featured-card-left {
  width: 200px;
  height: 100%;
  flex-shrink: 0;
}
.featured-sp-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.featured-card-right {
  flex: 1;
  padding: 24px 24px 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.featured-tag-wrap {
  margin-bottom: 12px;
}
.featured-tag {
  font-size: 10px;
  font-weight: 800;
  color: #143369;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  padding: 4px 10px;
  border-radius: 12px;
  letter-spacing: 0.05em;
}

/* Standard Speaker layout */
.sp-card-new:not(.featured-card) {
  width: 240px;
}
.standard-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.standard-card-top {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #fdfaf5;
}
.standard-sp-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.standard-card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* Common Card Typography */
.featured-card .sp-name {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 500;
   
  margin-bottom: 6px;
}
.sp-name {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 500;
   
  margin-bottom: 6px;
}
.sp-role-comp {
  font-size: 12px;
  font-weight: 500;
  color: #666;
  margin-bottom: 2px;
}
.sp-company-name {
  font-size: 12px;
  color: #888;
  margin-bottom: 12px;
}
.sp-meta-row {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
  margin-top: auto;
}
.sp-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #555;
}
.meta-icon {
  color: var(--accent, #09407B);
  flex-shrink: 0;
}
.sp-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.sp-badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--accent, #09407B);
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

/* Speaking on Box */
.speaking-details-box {
  display: flex;
  gap: 12px;
  background: #f8fafc;
  border: 1px dashed #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  text-align: left;
}
.speaking-details-icon {
  color: var(--accent, #09407B);
  flex-shrink: 0;
  margin-top: 2px;
}
.speaking-details-text {
  display: flex;
  flex-direction: column;
}
.speaking-label {
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  color: #888;
}
.speaking-title {
  font-size: 12px;
  
  color: var(--accent, #09407B);
  margin-top: 2px;
}
.speaking-time {
  font-size: 11px;
  color: #666;
  margin-top: 2px;
}

/* LinkedIn Link */
.linkedin-link {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent, #09407B);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1.5px solid #e5e7eb;
  padding: 10px 16px;
  border-radius: 8px;
  width: 100%;
  transition: all 0.2s ease;
  margin-top: 16px;
  background: #ffffff;
}
.linkedin-link:hover {
  background: #f8fafc;
  color: #0e254e;
}
.linkedin-link-standard {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent, #09407B);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin-top: auto;
  transition: color 0.2s ease;
}
.linkedin-link-standard:hover {
  color: #0e254e;
}
.linkedin-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background: var(--accent, #09407B);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  border-radius: 2px;
  line-height: 1;
}

/* Navigation Arrow Button Styling */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent, #09407B);
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.carousel-arrow:hover {
  background: #09407B;
  transform: translateY(-50%) scale(1.08);
}
.carousel-arrow.prev {
  left: 8px;
}
.carousel-arrow.next {
  right: 8px;
}

/* Bottom stats banner */
.speakers-stats-strip {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 40px 48px;
  margin-top: 80px;
  gap: 24px;
}
.stats-watermark-map {
  position: absolute;
  left: 0;
  top: 0;
  width: 40%;
  height: 100%;
  background-image: url('/world-map-dark.webp');
  background-size: cover;
  background-position: left center;
  opacity: 0.05;
  filter: invert(0.85) sepia(1) saturate(1.8) hue-rotate(15deg);
  pointer-events: none;
  z-index: 1;
}
.s-stat-item {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}
.s-stat-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(9, 64, 123, 0.08);
  border: 1px solid #e5e7eb;
  color: var(--accent, #09407B);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.s-stat-info {
  display: flex;
  flex-direction: column;
}
.s-stat-info h3 {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 32px);
   
  font-weight: 500;
  line-height: 1.1;
}
.s-stat-info p {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  line-height: 1.4;
}

/* ============================================================
   REGISTER CTA
   ============================================================ */
.register-cta-strip {
  background: #0f1319;
  color: #fff;
  padding: 60px 0;
  position: relative;
  overflow: hidden;
}
.register-cta-dotted-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
  opacity: 0.8;
  z-index: 1;
}
.register-cta-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
}
.reg-tag {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--accent-sky, #7FCDEE);
  margin-bottom: 24px;
  text-transform: uppercase;
}
.register-cta-content h2 {
  font-family: var(--serif);
  font-size: clamp(32px, 4.5vw, 48px);
  line-height: 1.2;
  
  margin-bottom: 24px;
}
.register-cta-content p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  line-height: 1.6;
}
.btn-primary-gold-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #F7931E;
  color: #fff;
  border: none;
  padding: 18px 36px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}
.btn-primary-gold-cta:hover {
  background: #e07d10;
  transform: translateY(-2px);
}

/* ============================================================
   RESPONSIVE DESIGN / MEDIA QUERIES
   ============================================================ */
@media (max-width: 1024px) {
  .pr-hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0;
  }
  .pr-hero-copy {
    max-width: 100%;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pr-details-grid {
    justify-content: center;
  }
  .pr-hero-visual {
    position: relative;
    width: 100%;
    height: auto;
    order: -1;
    margin-bottom: 40px;
    justify-content: center;
  }
  .pr-hero-visual img {
    max-width: 100%;
    height: auto;
    transform: translateX(0);
    -webkit-mask-image: none;
    mask-image: none;
  }
  .pr-background-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .journey-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .expect-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .speakers-section-grid {
    gap: 32px;
  }
  .speakers-left-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
  }
  .speakers-stats-strip {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 32px;
    margin-top: 48px;
  }
}

@media (max-width: 768px) {
  .pr-bg-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .journey-grid {
    grid-template-columns: 1fr;
  }
  .expect-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .featured-card {
    width: 290px;
  }
  .featured-card-inner {
    flex-direction: column;
  }
  .featured-card-left {
    width: 100%;
    height: 200px;
  }
  .featured-card-right {
    padding: 20px;
  }
  .speakers-stats-strip {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 20px;
  }
  .speakers-carousel-wrapper {
    padding: 0;
  }
  .pr-hero {
    min-height: auto;
    padding: 260px 20px 60px;
    background-size: cover;
    background-position: center;
    background-image: none;
    background-color: #0E0F3B;
  }
  .pr-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/case-study/china-europe.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .pr-hero-inner {
    padding-left: 0;
    padding-right: 0;
  }
  .pr-hero-visual {
    display: none;
  }
}

/* --- ARTICLE BODY --- */
.pr-speakers-section {
      padding-top: 80px;
    padding-bottom: 80px;
    padding-inline: clamp(16px, 4vw, 32px);
}
.pr-article-body {
  padding: 40px 20px 60px;
  background-color: #f8fafc;
}
@media (min-width: 768px) {
  .pr-article-body { padding: 40px 20px 100px; }
}

.pr-article-container {
  max-width: 1200px;
  margin: 0 auto;
}

.pr-intro-text {
  font-size: 20px;
  font-weight: 500;
  color: var(--ink, #143369);
  line-height: 1.7;
  border-left: 4px solid var(--accent-warm, #f7911d);
  padding-left: 24px;
  margin-bottom: 60px;
}

.pr-section {
  margin-bottom: 80px;
}

.pr-section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}
.pr-section-num {
  font-size: clamp(25px, 4vw, 42px);
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1;
}
.pr-section h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--ink, #143369);
  border-bottom: 2px solid var(--accent-warm, #f7911d);
  padding-bottom: 8px;
  flex-grow: 1;
}

.pr-section p {
  font-size: 17px;
  color: #334155;
  line-height: 1.8;
  margin-bottom: 24px;
}

.pr-figure {
  margin: 40px 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  background: #fff;
}
.pr-figure img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  object-position: top center;
  display: block;
}
.pr-figure figcaption {
  font-size: 13px;
  font-style: italic;
  color: #64748b;
  padding: 16px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.pr-video-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--ink, #143369);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 14px 24px;
  border-radius: 8px;
  border: 1px solid rgba(247, 145, 29, 0.3);
  text-decoration: none;
  transition: all 0.3s ease;
}
.pr-video-link:hover {
  background: #dc2626; /* Red for YouTube */
  border-color: #dc2626;
  transform: translateY(-2px);
}

.pr-blockquote {
  margin: 60px 0;
  border-left: 4px solid var(--accent-warm, #f7911d);
  background: rgba(20, 51, 105, 0.04);
  border-radius: 0 12px 12px 0;
  padding: 32px;
}
.pr-blockquote p {
  font-size: 20px;
  font-style: italic;
  font-weight: 500;
  color: var(--ink, #143369);
  margin-bottom: 16px;
  line-height: 1.6;
}
.pr-blockquote footer {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
}

.pr-about-box {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 40px;
  margin-top: 80px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}
.pr-about-box h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--ink, #143369);
  margin-bottom: 16px;
}
.pr-about-box p {
  font-size: 15px;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 24px;
}
.pr-contact-info {
  border-top: 1px solid #e2e8f0;
  padding-top: 24px;
}
.pr-contact-info a {
  color: var(--accent-warm, #f7911d);
  font-weight: 600;
  text-decoration: none;
}
.pr-contact-info a:hover {
  text-decoration: underline;
}
`}</style>

      {/* HERO */}
      <header className="pr-hero">
        <div className="pr-hero-inner container">
          {/* Left side */}
          <SlideIn direction="fade-right" delay={0.1} className="pr-hero-copy">
            <h1 className="pr-hero-title">China to Europe 2026:<br /><span className="gold-text">Scaling Beyond Borders</span></h1>
            <p className="pr-hero-desc">
              A one-day exclusive event bringing together business leaders, investors, and experts to explore opportunities, navigate complexities, and scale your business from China to Europe.
            </p>


          </SlideIn>

          {/* Right side */}
          <SlideIn direction="fade-left" delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
            <QuickContactForm />
          </SlideIn>
        </div>
      </header>

      {/* EVENT BACKGROUND */}
      <div className="home-content-scale">
        <section className="section container">
          <div className="pr-background-grid">
            {/* Left side: Text & Stats */}
            <SlideIn direction="fade-right" delay={0.2} className="pr-bg-copy">
              <span className="tag">{ev.eventBackground.tag}</span>
              <h2 className="pr-bg-title">{ev.eventBackground.title}</h2>
              <div className="pr-bg-text">
                {ev.eventBackground.paragraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {/* Stats row underneath */}
              <div className="pr-bg-stats">
                {ev.eventBackground.stats.map((s: any) => (
                  <div key={s.label} className="pr-bg-stat-item">
                    <div className="pr-stat-icon-circle">
                      {s.icon === 'globe' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>}
                      {s.icon === 'group' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                      {s.icon === 'chart' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>}
                      {s.icon === 'shield' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>}
                    </div>
                    <div className="pr-stat-text-wrap">
                      <strong>{s.value}</strong>
                      <span>{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SlideIn>
            {/* Right side: Earth Graphic */}
            <div className="pr-bg-image-wrapper">
              <img src="/case-study/WhyChinaEurope.webp" alt="Global expansion network" className="pr-bg-earth-image" />
            </div>
          </div>
        </section>
      </div>

      {/* SPEAKERS */}
      <div className="home-content-scale">
        <section id="speakers" className="section container pr-speakers-section">
          <div className="speakers-section-grid">
            {/* Top: heading */}
            <SlideIn direction="fade-right" delay={0.1} className="speakers-left-info">
              <div className="speakers-head-text">
                <h2 className="speakers-main-title">Speakers &amp; <span className="gold-text">Experts</span></h2>
                <p className="speakers-desc-text">
                  Industry leaders and local experts sharing real insights and actionable strategies for your expansion journey.
                </p>
              </div>
            </SlideIn>
            {/* Right side: carousel wrapper */}
            <div className="speakers-carousel-wrapper">
              <button className="carousel-arrow prev" onClick={scrollLeft} aria-label="Previous Slide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>

              <div className="speakers-carousel-track" ref={carouselRef}>
                {displayedSpeakers.map((sp, idx) => (
                  <div key={idx} className={`sp-card-new ${sp.featured ? 'featured-card' : ''}`} onClick={() => selectSpeaker(idx)}>
                    {/* Featured Card Layout */}
                    {sp.featured ? (
                      <div className="featured-card-inner">
                        <div className="featured-card-left">
                          <img src={sp.image} alt={sp.name} className="featured-sp-photo" />
                        </div>
                        <div className="featured-card-right">
                          <div className="featured-tag-wrap">
                            <span className="featured-tag">⭐ FEATURED SPEAKER</span>
                          </div>
                          <h3 className="sp-name">{sp.name}</h3>
                          <p className="sp-role-comp">{sp.role}</p>
                          <p className="sp-company-name">{sp.company}</p>

                          <div className="sp-meta-row">
                            <span className="sp-meta-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                              {sp.location}
                            </span>
                            <span className="sp-meta-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                              {sp.experience}
                            </span>
                          </div>

                          <div className="sp-badges">
                            {sp.badges.map((badge: string) => (
                              <span key={badge} className="sp-badge">{badge}</span>
                            ))}
                          </div>

                          {sp.speakingTitle && (
                            <div className="speaking-details-box">
                              <div className="speaking-details-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                              </div>
                              <div className="speaking-details-text">
                                <p className="speaking-label">Speaking on</p>
                                <p className="speaking-title">{sp.speakingTitle}</p>
                                <p className="speaking-time">{sp.speakingTime}</p>
                              </div>
                            </div>
                          )}

                          <a href={sp.linkedin} className="linkedin-link">
                            <span className="linkedin-icon">in</span> View LinkedIn Profile <span className="arrow-diagonal">↗</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      /* Standard Card Layout */
                      <div className="standard-card-inner">
                        <div className="standard-card-top">
                          <img src={sp.image} alt={sp.name} className="standard-sp-photo" />
                        </div>
                        <div className="standard-card-body">
                          <h3 className="sp-name">{sp.name}</h3>
                          <p className="sp-role-comp">{sp.role}</p>
                          <p className="sp-company-name">{sp.company}</p>

                          <div className="sp-meta-row">
                            <span className="sp-meta-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                              {sp.location}
                            </span>
                            <span className="sp-meta-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                              {sp.experience}
                            </span>
                          </div>

                          <div className="sp-badges">
                            {sp.badges.map((badge: string) => (
                              <span key={badge} className="sp-badge">{badge}</span>
                            ))}
                          </div>

                          <a href={sp.linkedin} className="linkedin-link-standard">
                            <span className="linkedin-icon">in</span> View Profile <span className="arrow-diagonal">↗</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button className="carousel-arrow next" onClick={scrollRight} aria-label="Next Slide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ARTICLE BODY (Post-Event Press Release) */}
      <div className="home-content-scale">
        <section className="pr-article-body">
          <div className="pr-article-container">
            <div className="pr-intro-text">
              <p>Jackson &amp; Frank hosted its flagship forum, <em>China to Europe 2026: Scaling Beyond Borders</em>, on 18 March 2026 in Shanghai&apos;s Jing&apos;an district. The half-day Workforce, Compliance and Leadership Summit brought together nearly one hundred Chinese business leaders alongside a panel of seven European legal, tax, and human resources experts for an in-depth examination of the realities of European market entry.</p>
            </div>

            {/* Section 1 */}
            <SlideIn direction="fade-right" delay={0.2} className="pr-section">
              <div className="pr-section-header">
                <span className="pr-section-num">01</span>
                <h2>Setting the Stage</h2>
              </div>

              <p>The forum opened with a keynote address by Pawel Michalkiewicz, Managing Partner of Jackson &amp; Frank, who framed the European expansion challenge through a navigation analogy drawn from his time in Dubai. In a city of constantly shifting roads and overnight construction, digital maps routinely fail to keep pace with physical reality. The lesson for companies entering Europe is identical: platforms and automation are essential tools, but local knowledge and human judgement remain indispensable.</p>
              <p>Michalkiewicz outlined a three-stage framework — Plan, Set Up, Scale — and was direct about where most companies go wrong. Mistakes made at the planning stage typically cost three times as much to correct later. He highlighted five pain points consistently reported by Chinese CEOs: geopolitical and market-access risk, regulatory complexity, supply-chain pressure, the need for genuine localisation, and talent capability. &quot;HR strategy is rarely the headline,&quot; he acknowledged, &quot;but it is the system that prevents friction, delays, and risk.&quot;</p>

              <figure className="pr-figure">
                <img src="/case-study/pawel-speech.avif" alt="Pawel Michalkiewicz presenting" />
                <figcaption>Pawel Michalkiewicz, Managing Partner, Jackson &amp; Frank, presenting the Plan, Set Up, Scale framework.</figcaption>
              </figure>

              <a href="https://youtu.be/Vtr1144V1OQ" target="_blank" rel="noopener noreferrer" className="pr-video-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
                Watch Pawel&apos;s Presentation
              </a>

              <blockquote className="pr-blockquote">
                <p>“Automation is the future, but roads change faster than the app. If you only follow the screen, you can end up in the wrong lane.”</p>
                <div className="home-content-scale">
                  <footer>— Pawel Michalkiewicz, Managing Partner, Jackson &amp; Frank</footer>
                </div>
              </blockquote>
            </SlideIn>

            {/* Section 2 */}
            <SlideIn direction="fade-left" delay={0.2} className="pr-section">
              <div className="pr-section-header">
                <span className="pr-section-num">02</span>
                <h2>The Netherlands as Safe Harbour</h2>
              </div>

              <p>Xin Shi, Partner and Head of the China Desk at AMICE Advocaten, drew on a decade of experience advising Chinese clients to walk attendees through the practicalities of establishing a Dutch B.V. entity. The Netherlands has become a well-established gateway into the EU for Chinese companies, and Shi explained why: the incorporation process is more flexible and smoother than in most other EU member states, though it demands attention to sequencing. The civil notary is the central institution in the process; shareholder composition, director BSN (Burgerservicenummer) requirements, and documentation must all be in order before the procedure can advance. A typical timeline runs between two and six weeks.</p>
              <p>Shi walked through the ecosystem of advisers required for a successful setup, covering the respective roles of the notary, tax adviser, and accountant. He also addressed the most common blockers: obtaining a Dutch address, securing the director&apos;s residency permit or citizenship documentation, and the downstream consequences these have on IBAN and VAT registration. His closing point was unambiguous: incorporation is the beginning of governance, not the conclusion of it.</p>

              <figure className="pr-figure">
                <img src="/case-study/xin-shi-speech.avif" alt="Xin Shi presenting" />
                <figcaption>Xin Shi, Partner, AMICE Advocaten, on establishing a Dutch B.V. and the key blockers to resolve.</figcaption>
              </figure>

              <a href="https://youtu.be/NUHh8Juo5XY" target="_blank" rel="noopener noreferrer" className="pr-video-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
                Watch Xin Shi&apos;s Presentation
              </a>
            </SlideIn>

            {/* Section 3 */}
            <SlideIn direction="zoom-in" delay={0.2} className="pr-section">
              <div className="pr-section-header">
                <span className="pr-section-num">03</span>
                <h2>Tax: Structure Must Match Reality</h2>
              </div>

              <p>Paul Halprin, attorney at law and founder of Halprin Law, focused his session on the three areas that generate the most costly surprises for Chinese companies in Europe: unintended corporate tax exposure, withholding tax leakage on cross-border payments, and transfer pricing disputes. His central argument was that most tax mistakes are not caused by high rates; they result from a failure to plan before operations begin.</p>
              <p>Halprin identified four recurring pitfalls. First, local sales teams that effectively close deals in Europe while contracts are nominally signed in China, creating taxable presence. Second, European entities that exist on paper while all decision-making remains at headquarters, making treaty benefits impossible to defend. Third, cash repatriation routes that have not been mapped in advance, resulting in unexpected withholding tax costs. Fourth, intercompany charges that cannot survive scrutiny because the narrative and the numbers are inconsistent. His practical guidance centred on three disciplines: mapping where value is actually created, ensuring that legal structure matches operational reality, and setting clear authority matrices that define who negotiates, approves, and signs. &quot;Tax follows the business,&quot; he concluded. &quot;People, contracts, decisions, and cash routes need to align with a structure that is credible and real.&quot;</p>

              <figure className="pr-figure">
                <img src="/case-study/paul-harpin.avif" alt="Paul Halprin presenting" />
                <figcaption>Paul Halprin, Founder, Halprin Law, on permanent establishment risk and cross-border tax planning.</figcaption>
              </figure>

              <a href="https://youtu.be/_ab1dhwDkg4" target="_blank" rel="noopener noreferrer" className="pr-video-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
                Watch Paul Halprin&apos;s Presentation
              </a>
            </SlideIn>

            {/* Section 4 */}
            <div className="pr-section">
              <div className="pr-section-header">
                <span className="pr-section-num">04</span>
                <h2>Legal Risk: Investment Screening and Competition Law</h2>
              </div>

              <p>Martijn van de Hel, Founding Partner of Maverick Advocaten, examined the two EU regulatory frameworks that Chinese investors most frequently underestimate: the Foreign Direct Investment screening regime and the EU Foreign Subsidies Regulation. He explained the thresholds at which each applies and used the 2026 Kyndryl/Solvinity case as a live illustration. In that transaction, the Dutch Competition Authority cleared the acquisition of a Dutch IT supplier, yet the Investment Screening Bureau opened a separate investigation on grounds of sensitive technology and national security. The case demonstrated that regulatory clearance from one authority provides no guarantee of clearance from another.</p>
              <p>Van de Hel also addressed an area of growing enforcement focus that receives less attention in boardroom discussions: the application of EU competition law to human resources practices. Agreements between companies on compensation levels, hiring restrictions, or non-compete arrangements can constitute cartel conduct under EU rules, regardless of whether they are formal or informal. The 2025 European Commission decision imposing a combined fine of 329 million euros on Delivery Hero and Glovo for labour market cartel conduct was cited as a landmark signal of enforcement direction. Potential penalties reach ten percent of global annual turnover.</p>

              <figure className="pr-figure">
                <img src="/case-study/Foreign.avif" alt="Martijn van de Hel presenting on EU investment screening" />
                <figcaption>Martijn van de Hel, Maverick Advocaten, on EU FDI screening and the Foreign Subsidies Regulation.</figcaption>
              </figure>
            </div>

            {/* Section 5 */}
            <SlideIn direction="fade-up" delay={0.2} className="pr-section">
              <div className="pr-section-header">
                <span className="pr-section-num">05</span>
                <h2>Panel Discussion: Confronting the Real Challenges</h2>
              </div>

              <p>The forum concluded with a structured panel discussion in which all seven speakers addressed the five pain points identified at the outset of the programme. The discussion brought together perspectives spanning legal practice, tax law, human resources, intellectual property, and academic research, with questions submitted by the audience driving the agenda.</p>
              <p>Professor Kai Yao of Fudan University&apos;s School of Management observed that talent strategies for overseas expansion are evolving toward an ecosystem model, with companies placing increasingly high demands on the cross-functional capability of individuals deployed internationally. Jacqueline Chen, Partner at Ferrante IP, emphasised that intellectual property protection must be treated as a parallel workstream to market entry, not a subsequent consideration. Questions from attendees ranged from the mechanics of setting up a collective pension scheme in the Netherlands for a small headcount, to the legal boundaries on end-client authority to terminate employment agreements, to the enforceability of non-compete clauses across EU jurisdictions. The consensus among panellists was consistent: there are no universal answers, but there are replicable methodologies, and the companies that succeed are those that build a structured, country-specific action plan before they need one.</p>

              <figure className="pr-figure">
                <img src="/case-study/panel-discussion.avif" alt="Panel discussion on stage" />
                <figcaption>The full expert panel assembled for the open discussion segment.</figcaption>
              </figure>

              <p>The event drew sustained engagement from attendees, many of whom remained to continue discussions with speakers after the formal programme closed. Catrina Yang, Executive Director of Jackson &amp; Frank Greater China, observed that the day&apos;s consistent theme was the shift from reactive compliance to proactive planning, and that this shift is what separates companies that struggle in Europe from those that scale with confidence.</p>

              <figure className="pr-figure">
                <img src="/case-study/networking.avif" alt="Attendees networking at the event" />
                <figcaption>Delegates networking during the event.</figcaption>
              </figure>

              <p>Jackson &amp; Frank will continue its China-to-Europe forum series through 2026, with future events addressing sector-specific expansion challenges and country-level market entry considerations. Chinese enterprises planning European expansion are welcome to contact the Jackson &amp; Frank team directly.</p>
            </SlideIn>

            {/* About Jackson & Frank */}
            <SlideIn direction="zoom-in-up" delay={0.2} className="pr-about-box">
              <h3>About Jackson &amp; Frank</h3>
              <p>Founded in 2022 and a sister company of the Macee Group (established 2013), Jackson &amp; Frank is a global employer of record and HR solutions provider serving clients across more than 160 countries and territories. The company offers end-to-end services in global employment, payroll management, international mobility, compliance, and HR strategy — supporting Chinese enterprises at every stage of their international growth.</p>
              <div className="pr-contact-info">
                <p><strong>For further information, please contact:</strong></p>
                <p><a href="mailto:info@jacksonandfrank.com">info@jacksonandfrank.com</a> | <a href="https://www.jacksonandfrank.cn" target="_blank" rel="noopener noreferrer">www.jacksonandfrank.cn</a></p>
              </div>
            </SlideIn>
          </div>
        </section>
      </div>

      {/* ============= CTA ============= */}
      <CandidateCTA imageSrc="/footerCTAImages/compliance.webp" imageAlt="Ready to scale from China to Europe?" />
    </>
  )
}
