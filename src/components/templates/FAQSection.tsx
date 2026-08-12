'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
  relatedBlogSlugs?: string[]
}

interface FAQSectionProps {
  readonly title: string
  readonly subtitle?: string
  readonly items: readonly FAQItem[]
  readonly contactLinkText?: string
  readonly contactHref?: string
  readonly faqPageHref?: string
  readonly faqPageLabel?: string
  readonly id?: string
  readonly renderAnswer?: (answer: string) => React.ReactNode
  readonly align?: 'center' | 'left'
  readonly embedded?: boolean
  readonly useContactModal?: boolean
}

export default function FAQSection({
  title,
  subtitle,
  items,
  contactLinkText = 'Contact us',
  contactHref = '/contact',
  faqPageHref,
  faqPageLabel = 'Browse all FAQs',
  id,
  renderAnswer,
  align = 'center',
  embedded = false,
  useContactModal = false,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (useContactModal) {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('jf:open-contact-modal'))
    }
  }

  if (!items?.length) return null

  return (
    <div id={id} className="faq-grid-wrapper">
      <div className="faq-grid-header">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="faq-grid-subtitle">{subtitle}</p>}
      </div>

      <div className="faq-grid-list">
        {items.map((item, i) => (
          <div key={i} className={`faq-grid-item ${openIndex === i ? 'open' : ''}`}>
            <button
              className="faq-grid-question"
              onClick={() => toggleFAQ(i)}
              aria-expanded={openIndex === i}
            >
              <h3 className="faq-grid-q-text">{item.question}</h3>
              <div className="faq-grid-icon" aria-hidden="true">
                <ChevronDown size={20} strokeWidth={1.5} />
              </div>
            </button>

            {openIndex === i && (
              <div className="faq-grid-answer">
                {renderAnswer ? renderAnswer(item.answer) : item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
