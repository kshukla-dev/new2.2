'use client'
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  q: string
  a: React.ReactNode
}

export interface FAQTab {
  id: string
  label: string
}

interface CampaignFAQProps {
  title?: string
  subtitle?: string
  assessmentBtnText?: string
  assessmentBtnHref?: string
  tabs?: FAQTab[]
  faqData: Record<string, FAQItem[]>
}

export default function CampaignFAQ({
  title = 'Common questions.',
  subtitle = "Can't find the answer you need? Speak to our team directly.",
  assessmentBtnText = 'Get a free assessment',
  assessmentBtnHref = '#hero',
  tabs = [],
  faqData
}: CampaignFAQProps) {
  const [activeTab, setActiveTab] = useState(() => {
    if (tabs && tabs.length > 0) {
      return tabs[0].id
    }
    return Object.keys(faqData)[0] || ''
  })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const activeFaqs = faqData[activeTab] || []

  return (
    <section className="jaf-section-bg-gray" id="faq" style={{ padding: '64px 0', backgroundColor: '#f8fafc' }}>
      <div className="jaf-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="jaf-faq-layout">

          {/* Sidebar */}
          <div className="jaf-faq-sidebar">
            <h2 className="jaf-section-title" style={{ fontSize: '32px', marginBottom: '16px' }}>
              {title}
            </h2>
            <p className="jaf-section-subtitle" style={{ color: '#475569', marginBottom: '32px' }}>
              {subtitle}
            </p>
            <a
              href={assessmentBtnHref}
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
              {assessmentBtnText}
            </a>
          </div>

          {/* Content */}
          <div className="jaf-faq-content">
            {/* Horizontal tab bar with underline */}
            {tabs && tabs.length > 1 && (
              <div
                style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '24px', overflowX: 'auto' }}
                className="no-scrollbar"
              >
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id)
                        setOpenIndex(null)
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
                  )
                })}
              </div>
            )}

            {/* FAQ accordion list */}
            <div className="jaf-faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activeFaqs.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div
                    key={index}
                    className="jaf-faq-item"
                    style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <button
                      type="button"
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
                      <ChevronDown
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                          flexShrink: 0,
                          marginLeft: '12px'
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div
                        className="jaf-faq-panel"
                        style={{ padding: '0 20px 20px', color: '#475569', lineHeight: 1.6 }}
                      >
                        {item.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
