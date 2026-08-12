'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Lock, ArrowRight, Zap, Globe, Shield, Users } from 'lucide-react'

export interface StatItem {
  value: string
  label: string
  subtext: string
  icon?: React.ReactNode
}

export interface CandidateCTAProps {
  eyebrow?: string
  title?: React.ReactNode
  description?: string
  stats?: StatItem[]
  primaryBtnText?: string
  primaryBtnHref?: string
  secondaryBtnText?: string
  secondaryBtnHref?: string
  securityNotice?: string
  imageSrc?: string
  imageAlt?: string
  onPrimaryClick?: (e: React.MouseEvent) => void
  onSecondaryClick?: (e: React.MouseEvent) => void
  onBookCallClick?: (e: React.MouseEvent) => void
}

const defaultStatsList: StatItem[] = [
  {
    value: '48–72h',
    label: 'Go Live',
    subtext: 'Average time to onboard and go live.',
    icon: <Zap className="w-5 h-5 text-[#38BDF8]" />
  },
  {
    value: '17+',
    label: 'Owned Markets',
    subtext: 'Direct local entities and operations',
    icon: <Globe className="w-5 h-5 text-[#38BDF8]" />
  },
  {
    value: '24/5',
    label: 'Human Support',
    subtext: 'Dedicated human assistance',
    icon: <Shield className="w-5 h-5 text-[#38BDF8]" />
  },
  {
    value: '1,400+',
    label: 'Employees Placed',
    subtext: 'Trusted by growing businesses',
    icon: <Users className="w-5 h-5 text-[#38BDF8]" />
  }
]

export default function CandidateCTA({
  eyebrow = "READY TO EXPAND GLOBALLY",
  title = "Write your own success story",
  description = "700+ companies use us for international payroll and employment compliance. Most first hires go live in 48–72 hours.",
  stats = defaultStatsList,
  primaryBtnText = "Book a Call",
  primaryBtnHref = "https://calendly.com/jacksonandfrank/discover-us",
  secondaryBtnText = "Start Hiring in Days",
  secondaryBtnHref = "/contact",
  securityNotice = "Your information is secure and confidential.",
  imageSrc = "/case-study/smart-mobility-brand-netherlands-workforce-setup.webp",
  imageAlt = "Smart Mobility Brand Netherlands Workforce Setup",
  onPrimaryClick,
  onSecondaryClick,
  onBookCallClick
}: CandidateCTAProps) {
  return (
    <>
      <style>{`
        .jaf-container {
          max-width: 1240px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
          box-sizing: border-box;
        }

        .jaf-cta-section {
          background-color: #0F1F3D;
          color: #ffffff;
          padding: 40px 0;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          margin-top: 0;
          border-radius: 0;
        }

        @media (min-width: 1024px) {
          .jaf-cta-section {
            padding: 56px 0;
          }
        }

        .jaf-cta-bg-image-wrapper {
          display: none;
        }

        @media (min-width: 768px) {
          .jaf-cta-bg-image-wrapper {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 48%;
            z-index: 1;
            pointer-events: none;
            overflow: hidden;
            -webkit-mask-image: radial-gradient(ellipse 95% 95% at 45% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
            mask-image: radial-gradient(ellipse 95% 95% at 45% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
          }
        }

        .jaf-cta-bg-image {
          object-fit: cover;
          object-position: top center;
          opacity: 0.85;
          width: 100%;
          height: 100%;
        }

        .jaf-cta-overlay-blur {
          position: absolute;
          inset-y: 0;
          right: 0;
          width: 40%;
          pointer-events: none;
          z-index: 2;
          backdrop-filter: blur(8px);
        }

        .jaf-cta-overlay-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background: 
            linear-gradient(to bottom, #0F1F3D 0%, transparent 15%, transparent 85%, #0F1F3D 100%),
            linear-gradient(to right, transparent 35%, rgba(15, 31, 61, 0.7) 65%, #0F1F3D 95%);
        }

        .jaf-cta-grid {
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: relative;
          z-index: 3;
          width: 100%;
        }

        @media (min-width: 768px) {
          .jaf-cta-grid {
            flex-direction: row;
            align-items: center;
            gap: 0;
          }
        }

        .jaf-cta-mobile-image-card {
          display: none;
        }

        @media (max-width: 767px) {
          .jaf-cta-section {
            background-color: #0F1F3D !important;
            padding: 32px 0 40px 0 !important;
          }
          .jaf-cta-mobile-image-card,.shadow-md {
            display: none !important;
          }
          .jaf-cta-col-content {
            align-items: center !important;
            text-align: center !important;
            padding: 0 12px !important;
            width: 100% !important;
          }
          .jaf-cta-title {
            font-size: 24px !important;
            line-height: 1.25 !important;
            text-align: center !important;
            margin-top: 12px !important;
          }
          .jaf-cta-desc {
            font-size: 14px !important;
            line-height: 1.5 !important;
            text-align: center !important;
            margin-bottom: 24px !important;
          }
          .jaf-stats-bar {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            padding: 16px 12px !important;
            width: 100% !important;
            margin-bottom: 28px !important;
          }
          .jaf-stat-item {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 8px !important;
          }
          .jaf-stat-icon-badge {
            width: 36px !important;
            height: 36px !important;
          }
          .jaf-stat-text {
            align-items: center !important;
          }
          .jaf-stat-val {
            font-size: 15px !important;
          }
          .jaf-stat-lbl {
            font-size: 10px !important;
            text-align: center !important;
          }
          .jaf-cta-btns {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 340px !important;
            margin: 0 auto 16px auto !important;
            gap: 12px !important;
          }
          .jaf-btn-primary, .jaf-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
            padding: 14px 20px !important;
            font-size: 14px !important;
            border-radius: 10px !important;
            box-sizing: border-box !important;
          }
          .jaf-security-notice {
            justify-content: center !important;
            width: 100% !important;
            margin-top: 8px !important;
          }
        }

        .jaf-cta-col-empty {
          display: none;
        }

        @media (min-width: 768px) {
          .jaf-cta-col-empty {
            display: block;
            width: 45%;
            flex-shrink: 0;
          }
        }

        .jaf-cta-col-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        @media (min-width: 768px) {
          .jaf-cta-col-content {
            width: 55%;
            flex-shrink: 0;
            align-items: flex-start;
            text-align: left;
            box-sizing: border-box;
            padding-left: 24px;
          }
        }

        .jaf-cta-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #38BDF8 !important;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .jaf-cta-title {
          font-size: 28px;
          font-weight: 700;
          color: #ffffff !important;
          margin: 0 0 14px 0;
          line-height: 1.25;
          letter-spacing: 0.01em;
          word-spacing: 0.06em;
          font-family: var(--font-outfit), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        @media (min-width: 768px) {
          .jaf-cta-title {
            font-size: 36px;
            margin: 0 0 16px 0;
          }
        }

        .jaf-cta-desc {
          font-size: 14px;
          color: #cbd5e1 !important;
          line-height: 1.5;
          margin: 0 0 20px 0;
        }

        .jaf-stats-bar {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 24px;
          box-sizing: border-box;
          backdrop-filter: blur(8px);
        }

        @media (min-width: 1024px) {
          .jaf-stats-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            gap: 12px;
          }
        }

        .jaf-stat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          width: 100%;
          min-width: 0;
        }

        @media (min-width: 1024px) {
          .jaf-stat-item {
            width: auto;
            flex: 1;
            padding-right: 12px;
          }

          .jaf-stat-item:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 15%;
            bottom: 15%;
            width: 1px;
            background: rgba(255, 255, 255, 0.12);
          }
        }

        .jaf-stat-icon-badge {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .jaf-stat-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .jaf-stat-val {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          white-space: nowrap;
        }

        .jaf-stat-lbl {
          font-size: 11px;
          font-weight: 500;
          color: #cbd5e1;
          line-height: 1.2;
          white-space: normal;
        }

        .jaf-cta-btns {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          margin-bottom: 12px;
        }

        @media (min-width: 480px) {
          .jaf-cta-btns {
            flex-direction: row;
            align-items: center;
            width: auto;
          }
        }

        .jaf-btn-primary {
          background-color: #F7931E;
          color: #ffffff;
          font-weight: 700;
          border-radius: 8px;
          padding: 12px 22px;
          font-size: 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(247, 147, 30, 0.25);
        }

        .jaf-btn-primary:hover {
          background-color: #e58212;
          transform: translateY(-1px);
        }

        .jaf-btn-secondary {
          background-color: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .jaf-btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.35);
        }

        .jaf-security-notice {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #94a3b8;
        }

        /* ============================================================
           HAPPY CUSTOMERS LOGOS TICKER BAR (INFINITE LOOP)
           ============================================================ */
        .jaf-cta-logos-ticker-wrap {
          background-color: #ffffff;
          padding: 18px 0;
          width: 100%;
          border: none;
          overflow: hidden;
          position: relative;
          z-index: 5;
        }

        .jaf-logos-ticker-container {
          overflow: hidden;
          display: flex;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }

        .jaf-logos-ticker {
          display: flex;
          align-items: center;
          gap: 70px;
          animation: logoScroll 35s linear infinite;
          flex-shrink: 0;
          padding-right: 70px;
        }

        .jaf-mock-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 600;
          color: #94a3b8;
          font-family: var(--sans, sans-serif);
          letter-spacing: -0.5px;
          white-space: nowrap;
          transition: color 0.2s;
        }

        .jaf-mock-logo:hover {
          color: #143369;
        }

        @keyframes logoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
      <section className="jaf-cta-section">
        {/* Desktop-only left side background image */}
        <div className="jaf-cta-bg-image-wrapper">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="jaf-cta-bg-image"
            sizes="50vw"
            priority
          />

          {/* Opacity Fade/Blur Effects */}
          <div className="jaf-cta-overlay-blur" />
          <div className="jaf-cta-overlay-gradient" />
        </div>

        <div className="jaf-container relative z-10">
          <div className="jaf-cta-grid">

            {/* Mobile-only Image Card */}
            <div className="block md:hidden w-full h-48 sm:h-56 relative rounded-xl overflow-hidden shadow-md">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover object-top"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F3D] via-transparent to-transparent opacity-70" />
            </div>

            {/* Empty 6 columns on desktop to leave hero image completely clear */}
            <div className="jaf-cta-col-empty" />

            {/* Right Column - Content & Stat Boxes */}
            <div className="jaf-cta-col-content">
              {eyebrow && <div className="jaf-cta-eyebrow">{eyebrow}</div>}

              <h2 className="jaf-cta-title" style={{ color: '#ffffff' }}>
                {title}
              </h2>

              {description && <p className="jaf-cta-desc" style={{ color: '#cbd5e1' }}>{description}</p>}

              {/* Stat Bar Container */}
              {stats && stats.length > 0 && (
                <div className="jaf-stats-bar">
                  {stats.map((item, idx) => (
                    <div key={idx} className="jaf-stat-item">
                      {item.icon && (
                        <div className="jaf-stat-icon-badge">
                          {item.icon}
                        </div>
                      )}
                      <div className="jaf-stat-text">
                        <span className="jaf-stat-val">{item.value}</span>
                        <span className="jaf-stat-lbl">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="jaf-cta-btns">
                {primaryBtnHref.startsWith('#') ? (
                  <a href={primaryBtnHref} className="jaf-btn-primary" onClick={onPrimaryClick}>
                    {primaryBtnText} <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link href={primaryBtnHref} className="jaf-btn-primary" onClick={onPrimaryClick}>
                    {primaryBtnText} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                {secondaryBtnText && (
                  secondaryBtnHref.startsWith('http') ? (
                    <a href={secondaryBtnHref} target="_blank" rel="noopener noreferrer" className="jaf-btn-secondary" onClick={onSecondaryClick}>
                      {secondaryBtnText} <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link href={secondaryBtnHref} className="jaf-btn-secondary" onClick={onSecondaryClick}>
                      {secondaryBtnText} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )
                )}
              </div>

              {/* Security Notice */}
              {securityNotice && (
                <div className="jaf-security-notice">
                  <Lock className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{securityNotice}</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* HAPPY CUSTOMERS LOGOS TICKER BAR (INFINITE LOOP, NO BORDER) */}
      {/* <div className="jaf-cta-logos-ticker-wrap">
        <div className="jaf-logos-ticker-container">
          <div className="jaf-logos-ticker">
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg> Payoneer</span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 22h20L12 2z"></path></svg> airbnb</span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Shopify</span>
            <span className="jaf-mock-logo">docusign</span>
            <span className="jaf-mock-logo"><b>DHL</b></span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c2.5-1 6-1 8 0M8 15c2.5-1 6-1 8 0M9 8c2-1 4-1 6 0"></path></svg> Spotify</span>
            <span className="jaf-mock-logo"><i>Canva</i></span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg> Payoneer</span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 22h20L12 2z"></path></svg> airbnb</span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Shopify</span>
            <span className="jaf-mock-logo">docusign</span>
            <span className="jaf-mock-logo"><b>DHL</b></span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c2.5-1 6-1 8 0M8 15c2.5-1 6-1 8 0M9 8c2-1 4-1 6 0"></path></svg> Spotify</span>
            <span className="jaf-mock-logo"><i>Canva</i></span>
          </div>
          <div className="jaf-logos-ticker" aria-hidden="true">
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg> Payoneer</span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 22h20L12 2z"></path></svg> airbnb</span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Shopify</span>
            <span className="jaf-mock-logo">docusign</span>
            <span className="jaf-mock-logo"><b>DHL</b></span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c2.5-1 6-1 8 0M8 15c2.5-1 6-1 8 0M9 8c2-1 4-1 6 0"></path></svg> Spotify</span>
            <span className="jaf-mock-logo"><i>Canva</i></span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg> Payoneer</span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 22h20L12 2z"></path></svg> airbnb</span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Shopify</span>
            <span className="jaf-mock-logo">docusign</span>
            <span className="jaf-mock-logo"><b>DHL</b></span>
            <span className="jaf-mock-logo"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c2.5-1 6-1 8 0M8 15c2.5-1 6-1 8 0M9 8c2-1 4-1 6 0"></path></svg> Spotify</span>
            <span className="jaf-mock-logo"><i>Canva</i></span>
          </div>
        </div>
      </div> */}
    </>
  )
}
