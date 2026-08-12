'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Lock, ArrowRight, Zap, Globe, Shield, Users } from 'lucide-react'

export interface CampaignStatItem {
  value: string
  label: string
  subtext?: string
  icon?: React.ReactNode
}

export interface CampaignCTAProps {
  eyebrow?: string
  title?: React.ReactNode
  description?: string
  stats?: CampaignStatItem[]
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

const defaultStats: CampaignStatItem[] = [
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

export default function CampaignCTA({
  eyebrow = 'READY TO EXPAND GLOBALLY',
  title = 'Write your own success story',
  description = '700+ companies use us for international payroll and employment compliance. Most first hires go live in 48–72 hours.',
  stats = defaultStats,
  secondaryBtnText = 'Get a Free Assessment',
  secondaryBtnHref = '#hero',
  primaryBtnText = 'Book a Call',
  primaryBtnHref = 'https://calendly.com/jacksonandfrank/discover-us',
  securityNotice = 'Your information is secure and confidential.',
  imageSrc = '/case-study/smart-mobility-brand-netherlands-workforce-setup.webp',
  imageAlt = 'Jackson & Frank — Employer of Record Germany',
  onPrimaryClick,
  onSecondaryClick,
  onBookCallClick
}: CampaignCTAProps) {
  return (
    <>
      <style>{`
        .camp-cta-section {
          background-color: #0F1F3D;
          color: #ffffff;
          padding: 40px 0;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        @media (min-width: 1024px) {
          .camp-cta-section { padding: 56px 0; }
        }

        .camp-cta-bg-image-wrapper {
          display: none;
        }

        @media (min-width: 768px) {
          .camp-cta-bg-image-wrapper {
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

        .camp-cta-bg-image {
          object-fit: cover;
          object-position: top center;
          opacity: 0.85;
          width: 100%;
          height: 100%;
        }

        .camp-cta-overlay-blur {
          position: absolute;
          inset-y: 0;
          right: 0;
          width: 40%;
          pointer-events: none;
          z-index: 2;
          backdrop-filter: blur(8px);
        }

        .camp-cta-overlay-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background:
            linear-gradient(to bottom, #0F1F3D 0%, transparent 15%, transparent 85%, #0F1F3D 100%),
            linear-gradient(to right, transparent 35%, rgba(15, 31, 61, 0.7) 65%, #0F1F3D 95%);
        }

        .camp-cta-grid {
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: relative;
          z-index: 3;
          width: 100%;
        }

        @media (min-width: 768px) {
          .camp-cta-grid {
            flex-direction: row;
            align-items: center;
            gap: 0;
          }
        }

        .camp-cta-col-empty {
          display: none;
        }

        @media (min-width: 768px) {
          .camp-cta-col-empty {
            display: block;
            width: 45%;
            flex-shrink: 0;
          }
        }

        .camp-cta-col-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        @media (min-width: 768px) {
          .camp-cta-col-content {
            width: 55%;
            flex-shrink: 0;
            align-items: flex-start;
            text-align: left;
            box-sizing: border-box;
            padding-left: 24px;
          }
        }

        .camp-cta-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #38BDF8;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .camp-cta-title {
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 14px 0;
          line-height: 1.25;
          letter-spacing: 0.01em;
        }

        @media (min-width: 768px) {
          .camp-cta-title { font-size: 36px; margin: 0 0 16px 0; }
        }

        @media (max-width: 767px) {
          .camp-cta-title { font-size: 24px !important; text-align: center !important; margin-top: 12px !important; }
          .camp-cta-col-content { align-items: center !important; text-align: center !important; padding: 0 12px !important; }
          .camp-cta-desc { font-size: 14px !important; text-align: center !important; margin-bottom: 24px !important; }
          .camp-stats-bar { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; padding: 16px 12px !important; margin-bottom: 28px !important; }
          .camp-stat-item { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 8px !important; }
          .camp-cta-btns { flex-direction: column !important; width: 100% !important; max-width: 340px !important; margin: 0 auto 16px auto !important; gap: 12px !important; }
          .camp-btn-primary, .camp-btn-secondary { width: 100% !important; justify-content: center !important; padding: 14px 20px !important; font-size: 14px !important; box-sizing: border-box !important; }
          .camp-security-notice { justify-content: center !important; }
        }

        .camp-cta-desc {
          font-size: 14px;
          color: #cbd5e1;
          line-height: 1.5;
          margin: 0 0 20px 0;
        }

        .camp-stats-bar {
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
          .camp-stats-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            gap: 12px;
          }
        }

        .camp-stat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          width: 100%;
          min-width: 0;
        }

        @media (min-width: 1024px) {
          .camp-stat-item { width: auto; flex: 1; padding-right: 12px; }
          .camp-stat-item:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 15%;
            bottom: 15%;
            width: 1px;
            background: rgba(255, 255, 255, 0.12);
          }
        }

        .camp-stat-icon-badge {
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

        .camp-stat-text { display: flex; flex-direction: column; min-width: 0; }
        .camp-stat-val { font-size: 16px; font-weight: 700; color: #ffffff; line-height: 1.2; white-space: nowrap; }
        .camp-stat-lbl { font-size: 11px; font-weight: 500; color: #cbd5e1; line-height: 1.2; }

        .camp-cta-btns {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          margin-bottom: 12px;
        }

        @media (min-width: 480px) {
          .camp-cta-btns { flex-direction: row; align-items: center; width: auto; }
        }

        .camp-btn-primary {
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
          border: none;
          cursor: pointer;
        }

        .camp-btn-primary:hover {
          background-color: #e58212;
          transform: translateY(-1px);
        }

        .camp-btn-secondary {
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
          cursor: pointer;
        }

        .camp-btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.35);
        }

        .camp-security-notice {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #94a3b8;
        }
      `}</style>

      <section className="camp-cta-section">
        {/* Desktop background image */}
        <div className="camp-cta-bg-image-wrapper">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="camp-cta-bg-image"
            sizes="50vw"
            priority
          />
          <div className="camp-cta-overlay-blur" />
          <div className="camp-cta-overlay-gradient" />
        </div>

        <div className="jaf-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="camp-cta-grid">

            {/* Mobile image card */}
            <div className="block md:hidden w-full h-48 sm:h-56 relative rounded-xl overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover object-top"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0F1F3D, transparent 60%)' }} />
            </div>

            {/* Empty left column (desktop) */}
            <div className="camp-cta-col-empty" />

            {/* Right content column */}
            <div className="camp-cta-col-content">
              {eyebrow && <div className="camp-cta-eyebrow">{eyebrow}</div>}

              <h2 className="camp-cta-title">{title}</h2>

              {description && <p className="camp-cta-desc">{description}</p>}

              {/* Stats bar */}
              {stats && stats.length > 0 && (
                <div className="camp-stats-bar">
                  {stats.map((item, idx) => (
                    <div key={idx} className="camp-stat-item">
                      {item.icon && (
                        <div className="camp-stat-icon-badge">{item.icon}</div>
                      )}
                      <div className="camp-stat-text">
                        <span className="camp-stat-val">{item.value}</span>
                        <span className="camp-stat-lbl">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="camp-cta-btns">
                {primaryBtnHref.startsWith('http') ? (
                  <a
                    href={primaryBtnHref}
                    className="camp-btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onPrimaryClick}
                  >
                    {primaryBtnText} <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <a href={primaryBtnHref} className="camp-btn-primary" onClick={onPrimaryClick}>
                    {primaryBtnText} <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                {secondaryBtnText && (
                  secondaryBtnHref.startsWith('http') ? (
                    <a
                      href={secondaryBtnHref}
                      className="camp-btn-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onSecondaryClick ?? onBookCallClick}
                    >
                      {secondaryBtnText} <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={secondaryBtnHref}
                      className="camp-btn-secondary"
                      onClick={onSecondaryClick ?? onBookCallClick}
                    >
                      {secondaryBtnText} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )
                )}
              </div>

              {/* Security notice */}
              {securityNotice && (
                <div className="camp-security-notice">
                  <Lock className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{securityNotice}</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
