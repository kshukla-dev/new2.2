'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Rocket,
  TrendingUp,
  Megaphone,
  Layers,
  Users,
  FileCheck,
  Globe,
  ShieldCheck,
  UserCog,
  LayoutDashboard,
  ArrowRightLeft,
} from 'lucide-react'

export interface EORWhoNeedsAudience {
  readonly icon: string
  readonly userType: string
  readonly pain: string
  readonly solution: string
}

export interface EORIncludedFeature {
  readonly icon: string
  readonly title: string
  readonly description: string
}

const whoNeedsIconMap: Record<string, React.ComponentType<{ className?: string, color?: string, size?: number }>> = {
  Rocket,
  TrendingUp,
  Megaphone,
  Layers,
  Users,
}

const includedIconMap: Record<string, React.ComponentType<{ className?: string, color?: string, size?: number }>> = {
  FileCheck,
  Globe,
  ShieldCheck,
  UserCog,
  LayoutDashboard,
  ArrowRightLeft,
}

export type EORExtendedSectionsTemplateProps =
  | {
    variant: 'whoNeeds'
    title: string
    description?: string
    audiences: readonly EORWhoNeedsAudience[]
  }
  | {
    variant: 'included'
    title: string
    description?: string
    features: readonly EORIncludedFeature[]
  }
  | {
    variant: 'complianceTrust'
    title: string
    subtitle?: string
    intro: readonly string[]
    bullets: readonly string[]
  }

function WhoNeedsCard({ a, index, Icon }: { a: EORWhoNeedsAudience, index: number, Icon: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100, delay: index * 0.06 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`eor-card ${isOpen ? 'is-open' : ''}`}
      onClick={() => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          setIsOpen(!isOpen);
        }
      }}
    >
      <div className="eor-card-header">
        <div className="eor-card-header-left">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="eor-card-icon-box"
          >
            <Icon size={32} className="eor-card-icon" color="#ffffff" aria-hidden={true} />
          </motion.div>
          <h3 className="eor-card-title">{a.userType}</h3>
        </div>
        <button className="eor-card-toggle" aria-label="Toggle details">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      </div>
      <div className="eor-card-content">
        <p className="eor-card-pain">{a.pain}</p>
        <p className="eor-card-solution">{a.solution}</p>
      </div>
    </motion.article>
  )
}

export default function EORExtendedSectionsTemplate(props: EORExtendedSectionsTemplateProps) {
  return (
    <>
      <style>{`
        .eor-extended-section {
          padding-top: 60px;
          padding-bottom: 60px;
          padding-inline: clamp(16px, 4vw, 32px);
          position: relative;
          overflow: hidden;
        }
       
        .bg-gradient-who {
          background-color: #f5f7fa !important;
          border-top: 1px solid #eaecef;
          border-bottom: 1px solid #eaecef;
        }
        .bg-gradient-included {
          background: #ffffff;
        }
        .bg-gradient-compliance {
          background: linear-gradient(to bottom, #f9fafb, #ffffff);
        }
        .eor-bg-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.02;
          background-image: radial-gradient(circle at 2px 2px, #001F3D 1px, transparent 0);
          background-size: 40px 40px;
        }
        .eor-extended-container {
          max-width: 80rem;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        .eor-section-header {
          margin-bottom: 24px;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .eor-section-header {
            margin-bottom: 24px;
          }
        }
        .eor-section-title {
          font-family: var(--serif);
          color: var(--ink);
          margin-bottom: 24px;
          font-size: clamp(25px, 4vw, 42px);
          line-height: 1.15;
          font-weight: 400;
        }
        .eor-section-desc {
          margin: 24px auto 0;
          font-size: 17px;
          color: var(--gh-on-surface-variant);
          max-width: 600px;
          line-height: 1.7;
          text-align: center;
        }
        .eor-grid-3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .eor-grid-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .eor-grid-3 { grid-template-columns: repeat(3, 1fr); gap: 32px; }
        }
        .eor-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
        }
        @media (min-width: 1024px) {
          .eor-card { padding: 32px; }
        }
        .eor-card:hover {
          border-color: #d1d5db;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .eor-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .eor-card-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .eor-card-icon-box {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
          background: linear-gradient(135deg, #143369 0%, #1a4a7a 100%);
          transition: box-shadow 0.3s ease;
        }
        .eor-card:hover .eor-card-icon-box {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .eor-card-title {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          line-height: 1.25;
          transition: color 0.3s ease;
        }
        @media (min-width: 1024px) {
          .eor-card-title { font-size: 24px; }
        }
        .eor-card:hover .eor-card-title {
          color: #143369;
        }
        .eor-card-pain {
          color: #4b5563;
          margin-bottom: 16px;
          line-height: 1.625;
        }
        .eor-card-solution {
          font-weight: 600;
          color: #143369;
          line-height: 1.625;
        }
        
        .eor-card-toggle { display: none; }
        
        @media (max-width: 1023px) {
          .eor-card { cursor: pointer; padding: 16px; }
          .eor-card-content { display: none; margin-top: 16px; }
          .eor-card.is-open .eor-card-content { display: block; }
          
          .eor-card-header { margin-bottom: 0; }
          .eor-card-header-left { gap: 12px; }
          
          .eor-card-icon-box { width: 48px; height: 48px; }
          .eor-card-icon { width: 24px; height: 24px; }
          .eor-card-title { font-size: 16px; }
          
          .eor-card-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            color: #143369;
            transition: transform 0.3s ease;
          }
          .eor-card.is-open .eor-card-toggle {
            transform: rotate(180deg);
          }
        }
        .eor-card-included-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .eor-card-included-icon {
          margin-bottom: 20px;
          width: 64px;
          height: 64px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
          background: linear-gradient(135deg, #143369 0%, #1a4a7a 100%);
        }
        .eor-card-included-desc {
          margin-top: 12px;
          width: 100%;
          font-size: 16px;
          line-height: 1.625;
          color: #4b5563;
        }
        @media (min-width: 1024px) {
          .eor-card-included-desc { font-size: 18px; }
        }
        .eor-intro-paragraphs {
          margin: 0 auto;
    font-size: 17px;
    color: var(--gh-on-surface-variant);
    max-width: 800px;
    line-height: 1.7;
    text-align: center;
        }
        .eor-intro-p {
          font-size: 17px;
          color: var(--gh-on-surface-variant);
          line-height: 1.7;
          margin-bottom: 16px;
          text-align: center;
        }
        .eor-bullets-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 24px;
        }
        @media (min-width: 768px) {
          .eor-bullets-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
        }
        .eor-bullet-card {
          display: flex;
          gap: 12px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          padding: 16px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .eor-bullet-text {
          font-size: 16px;
          color: #374151;
          line-height: 1.625;
        }
      `}</style>

      {props.variant === 'whoNeeds' && (
        <section className="eor-extended-section bg-gradient-who">
          <div className="eor-bg-pattern" />
          <div className="eor-extended-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eor-section-header"
            >
              <h2 className="eor-section-title">{props.title}</h2>
              {props.description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="eor-section-desc"
                >
                  {props.description}
                </motion.p>
              )}
            </motion.div>

            <div className="eor-grid-3">
              {props.audiences.map((a, index) => {
                const Icon = whoNeedsIconMap[a.icon] || Users
                return (
                  <WhoNeedsCard key={a.userType} a={a} index={index} Icon={Icon} />
                )
              })}
            </div>
          </div>
        </section>
      )}

      {props.variant === 'included' && (
        <section className="eor-extended-section bg-gradient-included">
          <div className="eor-bg-pattern" />
          <div className="eor-extended-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eor-section-header"
            >
              <h2 className="eor-section-title">{props.title}</h2>
              {props.description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="eor-section-desc"
                >
                  {props.description}
                </motion.p>
              )}
            </motion.div>

            <div className="eor-grid-3">
              {props.features.map((f, index) => {
                const Icon = includedIconMap[f.icon] || FileCheck
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 100, delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="eor-card"
                  >
                    <div className="eor-card-included-header">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="eor-card-included-icon"
                      >
                        <Icon size={32} color="#ffffff" aria-hidden={true} />
                      </motion.div>
                      <h3 className="eor-card-title">{f.title}</h3>
                      <p className="eor-card-included-desc">{f.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {props.variant === 'complianceTrust' && (
        <section className="eor-extended-section bg-gradient-compliance">
          <div className="eor-extended-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eor-section-header"
              style={{ marginBottom: '24px' }}
            >
              <h2 className="eor-section-title">{props.title}</h2>
              {props.subtitle && (
                <p className="eor-section-desc">{props.subtitle}</p>
              )}
            </motion.div>

            <div className="eor-intro-paragraphs">
              {props.intro.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                  className="eor-intro-p"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="eor-bullets-grid"
            >
              {props.bullets.map((text, i) => (
                <li key={i} className="eor-bullet-card">
                  <ShieldCheck size={32} color="#143369" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden={true} />
                  <span className="eor-bullet-text">{text}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}
    </>
  )
}
