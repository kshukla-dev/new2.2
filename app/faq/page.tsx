'use client'
import { BaseSchema } from '@/components/seo/BaseSchema'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import faqData from '@/data/faq-page.json'
import {
  Search,
  ChevronDown,
  ArrowRight,
  Check,
  HelpCircle
} from 'lucide-react'

export default function FaqPage() {
  const [query, setQuery] = useState('')
  const [openFaq, setOpenFaq] = useState(-1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return (faqData as any).items
    return (faqData as any).items.filter(
      (item: any) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    )
  }, [query])

  function toggleFaq(i: number) {
    setOpenFaq(prev => (prev === i ? -1 : i))
  }

  return (
    <>
      <BaseSchema />
      <style>{`
        /* Isolated Styling for FAQ Page */
        .faq-page-container {
          background-color: #fbfbfc;
          color: #1e293b;
          min-height: 100vh;
        }

        /* Hero styling */
        .faq-hero-wrap {
          background: linear-gradient(135deg, #0b0f2e 0%, #151a4a 100%);
          color: #ffffff;
          padding: 100px 16px 50px;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-top: -2rem;
        }
        .faq-hero-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .faq-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 99px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #a5b4fc;
          margin-bottom: 24px;
          letter-spacing: 0.02em;
          backdrop-filter: blur(8px);
        }
        .faq-badge svg {
          width: 14px;
          height: 14px;
        }

        .faq-hero-title {
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(32px, 5vw, 56px);
          line-height: 1.15;
          margin-bottom: 20px;
          font-weight: 400;
        }
        .faq-hero-title em {
          font-style: italic;
          color: var(--accent-warm, #F7931E);
          font-weight: 500;
        }

        .faq-hero-subtitle {
          font-size: clamp(16px, 1.8vw, 19px);
          color: rgba(255, 255, 255, 0.8);
          max-width: 620px;
          margin: 0 auto 36px;
          line-height: 1.6;
        }

        /* Premium Search Box */
        .faq-search-container {
          position: relative;
          max-width: 520px;
          margin: 0 auto;
          display: flex;
          align-items: center;
        }
        .faq-search-icon {
          position: absolute;
          left: 20px;
          color: #94a3b8;
          width: 20px;
          height: 20px;
          pointer-events: none;
        }
        .faq-search-input {
          width: 100%;
          font-family: var(--sans, inherit);
          font-size: 16px;
          padding: 16px 24px 16px 56px;
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          outline: none;
          backdrop-filter: blur(12px);
          transition: all 0.25s ease;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
        }
        .faq-search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .faq-search-input:focus {
          background: #ffffff;
          color: #0f172a;
          border-color: #ffffff;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 4px rgba(255, 255, 255, 0.2);
        }
        .faq-search-input:focus + .faq-search-icon {
          color: #475569;
        }

        /* FAQ List & Cards */
        .faq-page-content {
          padding: 30px 16px 80px;
        }
        .faq-card-list {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .faq-card-item {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.02);
          width: 100%;
          text-align: left;
          transition: border-color 0.2s ease;
        }
        .faq-card-item:hover {
          border-color: rgba(20, 51, 105, 0.15);
        }
        .faq-card-item-active {
          border-color: rgba(20, 51, 105, 0.2);
        }

        .faq-card-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 28px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          gap: 20px;
        }
        .faq-card-q {
          font-family: var(--sans, inherit);
          font-size: 17.5px;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.4;
          transition: color 0.2s ease;
        }
        .faq-card-item:hover .faq-card-q {
          color: var(--accent, #143369);
        }
        .faq-card-toggle-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #64748b;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .faq-card-item-active .faq-card-toggle-circle {
          background: var(--accent, #143369);
          border-color: var(--accent, #143369);
          color: #ffffff;
          transform: rotate(180deg);
        }

        .faq-card-content {
          padding: 0 28px 28px;
          border-top: 1px dashed #f1f5f9;
          padding-top: 20px;
        }
        .faq-card-answer {
          font-size: 15px;
          color: #475569;
          line-height: 1.75;
        }

        .faq-noresults {
          text-align: center;
          color: #64748b;
          padding: 64px 0;
          font-size: 16px;
        }

        /* CTA section */
        .faq-cta-wrap {
          padding: 90px 16px;
          background: linear-gradient(135deg, #0b0f2e 0%, #151a4a 100%);
          color: #ffffff;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .faq-cta-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 20%, rgba(247, 147, 30, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .faq-cta-box {
          max-width: 680px;
          margin: 0 auto;
        }
        .faq-cta-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 99px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #a5b4fc;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .faq-cta-title {
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          margin-bottom: 18px;
        }
        .faq-cta-title em {
          font-style: italic;
          color: var(--accent-warm, #F7931E);
          font-weight: 500;
        }
        .faq-cta-desc {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 36px;
          line-height: 1.6;
        }
        .faq-cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .faq-btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          background: var(--accent-warm, #F7931E);
          color: #ffffff;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .faq-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(247, 147, 30, 0.2);
        }
        .faq-btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .faq-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: #ffffff;
        }

        /* Mobile adaptation */
        @media (max-width: 640px) {
          .faq-hero-wrap {
            padding-top: 110px;
            padding-bottom: 70px;
          }
          .faq-card-trigger {
            padding: 20px;
          }
          .faq-card-q {
            font-size: 16px;
          }
          .faq-card-item-active .faq-card-content {
            padding: 0 20px 20px;
          }
        }
      `}</style>

      <div className="faq-page-container">
        {/* Hero Section */}
        <header className="faq-hero-wrap">
          <div className="container">
            <div className="faq-badge">
              <HelpCircle />
              <span>FAQ</span>
            </div>
            <h1 className="faq-hero-title">
              Frequently Asked <em>Questions</em>
            </h1>
            <p className="faq-hero-subtitle">{(faqData as any).subtitle}</p>
            <div className="faq-search-container">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                type="search"
                className="faq-search-input"
                placeholder={(faqData as any).searchPlaceholder}
              />
              <Search className="faq-search-icon" />
            </div>
          </div>
        </header>

        {/* FAQ List Cards */}
        <div className="home-content-scale">
          <section className="faq-page-content container">
            {filtered.length === 0 ? (
              <p className="faq-noresults">{(faqData as any).noResults}</p>
            ) : (
              <div className="faq-card-list">
                {filtered.map((item: any, i: number) => (
                  <div
                    key={i}
                    className={`faq-card-item ${openFaq === i ? 'faq-card-item-active' : ''}`}
                  >
                    <button
                      className="faq-card-trigger"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={openFaq === i}
                    >
                      <span className="faq-card-q">{item.question}</span>
                      <span className="faq-card-toggle-circle" aria-hidden="true">
                        <ChevronDown className="w-5 h-5" />
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="faq-card-content">
                        <p className="faq-card-answer">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* CTA Section */}
        <div className="home-content-scale">
          <section className="faq-cta-wrap">
            <div className="container faq-cta-box">
              <span className="faq-cta-tag">Still have questions?</span>
              <h2 className="faq-cta-title">
                We&apos;re ready to <em>help</em>
              </h2>
              <p className="faq-cta-desc">
                Can&apos;t find what you&apos;re looking for? Our team responds within 24 hours.
              </p>
              <div className="faq-cta-buttons">
                <Link href="/contact" className="faq-btn-primary">
                  <span>Contact our team</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/blog" className="faq-btn-secondary">
                  Read the blog
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
