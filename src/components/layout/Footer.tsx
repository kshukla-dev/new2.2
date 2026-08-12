'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { subscribeNewsletter } from '@/lib/contact'
import { newsletterSchema } from '@/lib/validations/forms'

const company = [
  { name: 'About us', href: '/about-us' },
  { name: 'Careers', href: '/career' },
  { name: 'Contact us', href: '/contact' },
]
const services = [
  { name: 'Employer of record', href: '/employer-of-record' },
  { name: 'Immigration', href: '/immigration' },
  { name: 'Payroll', href: '/payroll' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'Contractor', href: '/contractor' },
]
const resources = [
  { name: 'Blog', href: '/blog' },
  { name: 'Success stories', href: '/case-studies' },
  { name: 'Global hiring guide', href: '/global-hiring-guide' },
  { name: 'Press release', href: '/resources/events/china-europe-2026' },
  { name: 'FAQs', href: '/faq' },
]
const year = new Date().getFullYear()

export default function Footer() {
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const subscribed = newsletterStatus === 'success'

  // Ads landing page uses its own stripped-down CampaignFooter instead.
  if (pathname === '/hire-non-eu-employees-netherlands' || pathname.startsWith('/germany/') || pathname.startsWith('/germany')) return null

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterStatus === 'sending') return
    const parsed = newsletterSchema.safeParse({ email })
    if (!parsed.success) {
      setNewsletterStatus('error')
      return
    }
    setNewsletterStatus('sending')
    const result = await subscribeNewsletter(parsed.data.email)
    if (result.success) {
      setNewsletterStatus('success')
      setEmail('')
      setTimeout(() => setNewsletterStatus('idle'), 4000)
    } else {
      setNewsletterStatus('error')
    }
  }
  return (
    <>
      <style>{`
        /* ============================================================
           FOOTER BASE
           ============================================================ */
        .jf-footer {
          background-color: #0E0F3B;
          color: rgba(255, 255, 255, 0.8);
          padding: 64px 0 32px;
          font-family: var(--sans, 'DM Sans', sans-serif);
          margin-top: 0;
          position: relative;
          z-index: 1;
        }

        .footer-container {
          max-width: 80rem; /* 1280px = max-w-7xl, matches the navbar */
          margin-inline: auto;
          padding-inline: 1rem; /* px-4 */
        }
        @media (min-width: 640px) {
          .footer-container {
            padding-inline: 1.5rem; /* sm:px-6 */
          }
        }
        @media (min-width: 1024px) {
          .footer-container {
            padding-inline: 2rem; /* lg:px-8 */
          }
        }

        .footer-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }

        /* ============================================================
           HERO TOP SECTION (logo + trust headline)
           ============================================================ */
        .footer-hero-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
          padding-bottom: 40px;
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-hero-logo-link {
          flex-shrink: 0;
          display: flex;
        }

        /* One size at every breakpoint. The wordmark sits in a 526x83 viewBox
           with a lot of vertical padding, so it already reads smaller than its
           box; shrinking it further on mobile made it smaller than the 30px
           navbar logo. At 42px it is ~266px wide, which still fits a 320px
           viewport, so no responsive override is needed. */
        .footer-hero-logo-img {
          height: 42px;
          width: auto;
          display: block;
        }

        .footer-hero-copy {
          flex: 0 1 auto;
          min-width: 260px;
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-hero-title {
          font-family: var(--serif, serif);
          font-size: clamp(20px, 2.7vw, 36px);
          font-weight: 600;
          line-height: 1.2;
          color: #ffffff;
          margin: 0 0 12px;
          letter-spacing: -0.01em !important;
          white-space: nowrap;
        }

        .footer-hero-highlight {
          position: relative;
          display: inline-block;
              color: #f7931e;
}
        }

        .footer-hero-underline {
          position: absolute;
          left: 2px;
          right: 2px;
          bottom: -8px;
          width: calc(100% - 4px);
          height: 10px;
          display: block;
          pointer-events: none;
        }

        .footer-hero-desc {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.72);
          max-width: 750px;
          margin: 0;
        }

        @media (max-width: 768px) {
          .footer-hero-top {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 24px;
            padding-bottom: 28px;
            margin-bottom: 28px;
          }
          .footer-hero-logo-link {
            justify-content: center;
          }
          .footer-hero-copy {
            text-align: center;
            align-items: center;
          }
          .footer-hero-title {
             letter-spacing: 0;
             /* Must wrap on small screens, otherwise the single long line
                overflows past the right edge of the viewport. */
             white-space: normal;
          }
          .footer-hero-desc {
            margin-inline: auto;
          }
        }

        /* ============================================================
           LINKS GRID
           ============================================================ */
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .fl-col {
          display: flex;
          flex-direction: column;
        }

        .fl-col h4 {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }

        .fl-col a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 13px;
          margin-bottom: 8px;
          transition: color 0.2s;
        }

        .fl-col a:hover {
          color: #7FCDEE;
        }

        /* ============================================================
           NEWSLETTER COLUMN
           ============================================================ */
        .newsletter-col {
          display: flex;
          flex-direction: column;
        }

        .newsletter-desc {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 280px;
        }

        .newsletter-input-wrap {
          position: relative;
          width: 100%;
        }

        .newsletter-input {
          width: 100%;
          padding: 12px 42px 12px 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 14px;
          color: #ffffff;
          font-size: 13.5px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }

        .newsletter-input:focus {
          border-color: #7FCDEE;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(127, 205, 238, 0.15);
        }

        .newsletter-mail-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }

        .newsletter-btn {
          width: 100%;
          padding: 12px 16px;
          background: #ffffff;
          color: #0E0F3B;
          font-weight: 600;
          font-size: 14px;
          font-family: inherit;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .newsletter-btn:hover {
          background: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
        }

        .newsletter-btn:active {
          transform: translateY(0);
        }

        .newsletter-success {
          font-size: 12px;
          color: #4ade80;
          font-weight: 500;
        }

        .newsletter-error {
          font-size: 12px;
          color: #f87171;
          font-weight: 500;
        }

        /* ============================================================
           TRUST SECTION
           ============================================================ */
        .footer-trust {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 32px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 40px;
          margin-top: 1rem;
        }

        .trust-companies {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          padding-right: 40px;
        }

        .trust-certs {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .trust-title {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .trust-logos {
          display: flex;
          align-items: center;
          gap: 25px;
          flex-wrap: wrap;
        }

        .mock-logo {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.45);
          font-family: var(--sans);
          letter-spacing: -0.5px;
          transition: color 0.2s;
        }

        .mock-logo:hover {
          color: #7FCDEE;
        }

        .mock-logo svg {
          color: inherit;
        }

        .mock-cert {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.2s;
        }

        .mock-cert:hover {
          color: #7FCDEE;
        }

        /* ============================================================
           BOTTOM BAR
           ============================================================ */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: var(--ink-muted);
          flex-wrap: wrap;
          gap: 20px;
        }

        .fb-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .fb-right a {
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .fb-right a:hover {
          color: var(--accent);
        }

        .fb-sep {
          color: var(--border);
        }

        .fb-social {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: 16px;
        }

        .fb-social a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent);
          color: white;
          transition: all 0.2s;
        }

        .fb-social a:hover {
          background: var(--accent);
          color: white;
          transform: translateY(-2px);
          opacity: 0.85;
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (max-width: 992px) {
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .contact-col {
            grid-column: 1 / -1;
            margin-top: 20px;
          }
          .trust-companies {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--border);
            padding-bottom: 28px;
          }
        }

        @media (max-width: 768px) {
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 20px;
          }
          .newsletter-col {
            grid-column: span 2;
          }
          /* Mobile/tablet: input grows to the full row width with the
             Subscribe button sitting beside it instead of stacked below. */
          .newsletter-form {
            max-width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px;
          }
          .newsletter-input-wrap {
            flex: 1 1 0;
            min-width: 0;
          }
          .newsletter-input {
            padding: 14px 42px 14px 16px;
            font-size: 14px;
          }
          .newsletter-btn {
            width: auto;
            flex: 0 0 auto;
            padding: 14px 22px;
            white-space: nowrap;
          }
          .newsletter-success,
          .newsletter-error {
            flex: 1 0 100%;
          }
          .footer-trust {
            flex-direction: column;
            gap: 24px;
            padding: 24px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .fb-right {
            flex-wrap: wrap;
            width: 100%;
          }
          .fb-social {
            margin-left: 0;
          }
        }

        @media (max-width: 480px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          .newsletter-col {
            /* Full-width row so the email field has room next to the button. */
            grid-column: span 2;
          }
          .footer-container {
            padding: 0 16px;
          }
          .trust-logos {
            gap: 14px;
          }
          .mock-logo {
            font-size: 15px;
          }
          .footer-divider {
            margin: 24px 0;
          }
          .fl-col h4 {
            margin-bottom: 12px;
            font-size: 14px;
          }
          .fl-col a {
            margin-bottom: 8px;
            font-size: 13px;
          }
        }

      `}</style>

      <div className="home-content-scale">
        <footer className="jf-footer">
          <div className="container footer-container">

            {/* HERO TOP SECTION */}
            <div className="footer-hero-top">
              <Link href="/" className="footer-hero-logo-link" aria-label="Jackson & Frank home">
                <img src="/assets/logo-light.svg" alt="Jackson & Frank" className="footer-hero-logo-img" />
              </Link>
              <div className="footer-hero-copy">
                <h2 className="footer-hero-title">
                  Trusted Employer of Record for{' '}
                  <span className="footer-hero-highlight">
                    Global Growth.
                    <svg className="footer-hero-underline" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M2 6.5C50 2 150 2 198 6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>
                <p className="footer-hero-desc">
                  Empowering businesses worldwide with comprehensive HR solutions that ensure compliance, efficiency, and sustainable growth across global markets.
                </p>
              </div>
            </div>


            {/* LINKS SECTION */}
            <div className="footer-links-grid">
              <div className="fl-col">
                <h4>Solutions</h4>
                {services.map(link => <Link key={link.name} href={link.href}>{link.name}</Link>)}
              </div>

              <div className="fl-col">
                <h4>Resources</h4>
                {resources.map(link => <Link key={link.name} href={link.href}>{link.name}</Link>)}
              </div>

              <div className="fl-col">
                <h4>Company</h4>
                {company.map(link => <Link key={link.name} href={link.href}>{link.name}</Link>)}
              </div>

              <div className="fl-col newsletter-col">
                <h4>Newsletter</h4>
                <p className="newsletter-desc">Stay updated with latest HR insights and industry trends.</p>
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <div className="newsletter-input-wrap">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="newsletter-input"
                      required
                    />
                    <svg className="newsletter-mail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <button type="submit" className="newsletter-btn" disabled={newsletterStatus === 'sending'}>
                    {newsletterStatus === 'sending' ? 'Subscribing…' : subscribed ? 'Subscribed ✓' : 'Subscribe'}
                  </button>
                  {subscribed && (
                    <span className="newsletter-success">Thank you for subscribing!</span>
                  )}
                  {newsletterStatus === 'error' && (
                    <span className="newsletter-error">Something went wrong. Please try again.</span>
                  )}
                </form>
              </div>
            </div>

            {/* TRUST SECTION */}


            <div className="footer-divider"></div>

            {/* BOTTOM SECTION */}
            <div className="footer-bottom">
              <div className="fb-left">
                &copy; {year} &nbsp; Jackson &amp; Frank | All rights reserved.
              </div>
              <div className="fb-right">
                <span className="fb-v">v2.0.0</span>
                <span className="fb-sep">|</span>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <span className="fb-sep">|</span>
                <Link href="/sitemaps">Sitemap</Link>
                <div className="fb-social">
                  <a href="https://www.linkedin.com/company/jacksonandfrank/" target="_blank" rel="noopener noreferrer" aria-label="Jackson & Frank on LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="16"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Jackson & Frank on Twitter">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="16"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                  </a>
                  <a href="https://www.youtube.com/@JacksonAndFrank" target="_blank" rel="noopener noreferrer" aria-label="Jackson & Frank on YouTube">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="16"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </>
  )
}
