'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import navigation from '@/data/navigation.json'

type DropdownKey = 'services' | 'about' | 'insights' | null





const services = (navigation as any).navbar.services.items
const about = (navigation as any).navbar.about.items
const insights = (navigation as any).navbar.insights.items

export default function HomeNavbar() {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const close = useCallback(() => setOpenDropdown(null), [])

  const toggle = (key: Exclude<DropdownKey, null>) => {
    setOpenDropdown(prev => prev === key ? null : key)
  }

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('.hnav-links') && !t.closest('.hnav-dropdown-wrap-compact')) close()
    }
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    const handleScroll = () => setIsScrolled(window.scrollY > 20)

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [close])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    close()
  }, [pathname, close])

  // Lock body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])



  return (
    <>
      <style>{`
        .hnav-placeholder{height:102px;width:100%;background:#ebf3fc}
        .hnav-fixed{position:fixed;top:16px;left:0;right:0;z-index:100;padding:0 28px}
        .hnav-shell{position:relative;max-width:1300px;margin:0 auto}
        .hnav-bar{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;padding:10px 12px 10px 26px;background:linear-gradient(180deg,rgba(255,255,255,0.88) 0%,rgba(240,246,253,0.72) 100%);backdrop-filter:blur(18px) saturate(150%);-webkit-backdrop-filter:blur(18px) saturate(150%);border:1px solid rgba(255,255,255,0.75);border-radius:9999px;box-shadow:0 1px 2px rgba(20,51,105,0.04),0 10px 24px -6px rgba(20,51,105,0.14),0 24px 48px -12px rgba(20,51,105,0.12),inset 0 1px 0 rgba(255,255,255,0.85);transition:box-shadow 0.3s ease,background 0.3s ease,transform 0.3s ease}
        .hnav-bar.scrolled{background:linear-gradient(180deg,rgba(255,255,255,0.95) 0%,rgba(240,246,253,0.85) 100%);box-shadow:0 2px 4px rgba(20,51,105,0.05),0 14px 30px -8px rgba(20,51,105,0.20),0 30px 60px -14px rgba(20,51,105,0.16),inset 0 1px 0 rgba(255,255,255,0.9)}
        .hnav-logo{justify-self:start;display:flex;align-items:center;text-decoration:none}
        .hnav-logo-img{height:36px;width:auto;display:block}
        .hnav-links{display:flex;gap:28px;align-items:center;justify-self:center}
        .hnav-trigger{position:relative;display:inline-flex;align-items:center;color:#143369;font-size:16px;font-weight:600;padding:8px 0;transition:color 0.2s;font-family:var(--sans);background:transparent;border:none;cursor:pointer;text-decoration:none}
        .hnav-trigger:hover,.hnav-trigger.active{color:#09407B}
        .hnav-trigger::after{content:'';position:absolute;bottom:0px;left:0;right:0;height:2px;background-color:#EF5A0F;border-radius:999px;transform:scaleX(0);transform-origin:center;transition:transform 0.2s ease-out}
        .hnav-trigger.active::after{transform:scaleX(1)}
        .hnav-right{display:flex;gap:8px;align-items:center;justify-self:end}
        .hnav-cta{background:linear-gradient(180deg,#F97B2E 0%,#EF5A0F 100%);color:#ffffff !important;padding:10px 26px;border-radius:9999px;font-size:15px;font-weight:600;font-family:var(--sans);transition:background 0.2s,transform 0.2s,box-shadow 0.2s;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;border:none;white-space:nowrap;box-shadow:0 4px 14px rgba(239,90,15,0.32)}
        .hnav-cta:hover{background:linear-gradient(180deg,#F0691A 0%,#DB4E0B 100%);transform:translateY(-1px);box-shadow:0 6px 20px rgba(239,90,15,0.45)}
        .hnav-dropdown-wrap{position:absolute;top:calc(100% + 10px);left:0;right:0;z-index:60;background:#ffffff;border:1px solid rgba(20,51,105,0.10);border-radius:24px;box-shadow:0 30px 60px -20px rgba(20,51,105,0.18);animation:hnavDropIn 0.22s ease;overflow:hidden}
        @keyframes hnavDropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .hnav-dropdown{background:transparent;padding:32px 36px;display:grid;grid-template-columns:1.4fr 1fr;gap:48px}
        .hnav-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 24px}
        .hnav-item{display:block;padding:14px 16px;border-radius:12px;transition:background 0.18s ease,transform 0.18s ease;text-decoration:none}
        .hnav-item:hover{background:var(--accent-soft);transform:translateX(2px)}
        .hnav-item strong{display:block;font-size:15px;font-weight:600;color:var(--ink);margin-bottom:4px;font-family:var(--sans)}
        .hnav-item span{display:block;font-size:12.5px;color:var(--ink-muted);line-height:1.5}

        .hnav-mobile-toggle{display:none;background:transparent;border:none;cursor:pointer;color:#143369;padding:6px;min-width:44px;min-height:44px;align-items:center;justify-content:center}
        .hnav-mobile-overlay{position:fixed;inset:0;background:rgba(14,15,59,0.4);backdrop-filter:blur(4px);z-index:190}
        .hnav-mobile-drawer{position:fixed;top:0;bottom:0;right:0;width:100%;max-width:100%;background:var(--bg);z-index:200;padding:80px 24px 32px;display:flex;flex-direction:column;gap:0;overflow-y:auto;box-shadow:-10px 0 40px rgba(0,0,0,0.1);animation:hnavSlideIn 0.3s cubic-bezier(0.16,1,0.3,1)}
        @keyframes hnavSlideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        .hnav-mobile-close{position:absolute;top:18px;right:24px;background:transparent;border:none;cursor:pointer;color:var(--ink);min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;z-index:210}
        .hnav-mobile-section{display:flex;flex-direction:column;gap:0}
        /* Each group after the first is fenced off with a rule so the
           section label reads as a heading, not as another nav link. */
        .hnav-mobile-section + .hnav-mobile-section{margin-top:22px;padding-top:22px;border-top:1px solid var(--border)}
        .hnav-mobile-section-title{font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#EF5A0F;font-family:var(--sans);margin-bottom:2px}
        .hnav-mobile-section a{font-size:15.5px;font-weight:500;color:var(--ink);padding:13px 0;border-bottom:1px solid var(--border);text-decoration:none;min-height:44px;display:flex;align-items:center;transition:color 0.18s ease}
        .hnav-mobile-section a:last-child{border-bottom:none}
        .hnav-mobile-section a:hover,.hnav-mobile-section a:active{color:#EF5A0F}
        .hnav-mobile-cta{align-self:stretch;margin-top:28px}
        /* ============================================================
           RESPONSIVE: HOME NAVBAR  (4 tiers)
           Knobs per breakpoint:
             .hnav-shell max-width : overall pill width
             .hnav-fixed top       : gap from the top of the screen
             .hnav-bar padding/gap : inner spacing / column gap
             .hnav-logo-img height : logo size
             .hnav-links gap       : spacing between nav links
             .hnav-trigger font    : nav link size
             .hnav-cta padding/font: button size
             .hnav-placeholder height : space reserved below the fixed bar
           BIG SCREEN (>1440px) uses the base values above.
           ============================================================ */
        @media(max-width:1440px){   /* LAPTOP */
          .hnav-shell{max-width:1180px}
          .hnav-fixed{top:14px}
          .hnav-bar{gap:20px;padding:9px 10px 9px 22px}
          .hnav-logo-img{height:32px}
          .hnav-links{gap:22px}
          .hnav-trigger{font-size:15px}
          .hnav-cta{padding:9px 22px;font-size:14px}
          .hnav-placeholder{height:94px}
        }
        @media(max-width:1024px){
          .hnav-shell{max-width:920px}
          .hnav-fixed{top:12px}
          .hnav-bar{gap:16px;padding:8px 8px 8px 18px}
          .hnav-logo-img{height:30px}
          .hnav-links{gap:16px}
          .hnav-trigger{font-size:14px}
          .hnav-cta{padding:8px 18px;font-size:13px}
          .hnav-placeholder{height:88px}
        }
        @media(max-width:900px){   /* MOBILE — collapses to hamburger */
          .hnav-links{display:none}
          .hnav-mobile-toggle{display:inline-flex}
          .hnav-bar{grid-template-columns:1fr auto;padding:8px 10px 8px 20px}
          .hnav-cta{display:none}
          /* ...but the copy inside the mobile drawer must stay visible. */
          .hnav-cta.hnav-mobile-cta{display:inline-flex}
          .hnav-dropdown-wrap{display:none}
          .hnav-placeholder{height:84px}
        }
        @media(max-width:768px){.hnav-logo-img{height:28px}}

        .hnav-dropdown-wrap-compact {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(20, 51, 105, 0.10);
          box-shadow: 0 10px 40px -10px rgba(20, 51, 105, 0.12), 0 20px 50px -20px rgba(20, 51, 105, 0.14);
          padding: 28px;
          width: max-content;
          max-width: 580px;
          margin-top: 12px;
          animation: hnavDropInCompact 0.2s ease-out;
        }
        @keyframes hnavDropInCompact {
          from {
            opacity: 0;
            transform: translate(-50%, -8px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .hnav-grid-compact {
          display: grid;
          grid-template-columns: repeat(2, minmax(220px, 1fr));
          gap: 14px 48px;
        }
        .hnav-item-compact {
          display: block;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background 0.18s ease, color 0.18s ease;
          text-decoration: none;
          text-align: left;
        }
        .hnav-item-compact:hover {
          background: rgba(239, 90, 15, 0.06);
        }
        .hnav-item-compact strong {
          display: block;
          font-size: 15px;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 4px;
          font-family: var(--sans);
          transition: color 0.18s ease;
        }
        .hnav-item-compact:hover strong {
          color: #EF5A0F;
        }
        .hnav-item-compact span {
          display: block;
          font-size: 12.5px;
          color: var(--ink-muted);
          line-height: 1.5;
        }
      `}</style>

      <div className="hnav-wrapper">
        <div className="hnav-placeholder"></div>
        <div className="hnav-fixed">
          <div className="hnav-shell">
            <nav className={`hnav-bar ${isScrolled ? 'scrolled' : ''}`}>
              {/* Logo (left) */}
              <Link href="/" className="hnav-logo" onClick={close}>
                <img src="/logo-dark.svg" alt="Jackson & Frank" className="hnav-logo-img" />
              </Link>

              {/* Center nav */}
              <div className="hnav-links">
                {[
                  { key: 'services', label: 'Solutions' },
                  { key: 'insights', label: 'Resources' },
                  { key: 'about', label: 'About Us' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    className={`hnav-trigger${openDropdown === key ? ' active' : ''}`}
                    onClick={() => toggle(key as any)}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === key}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Right CTA */}
              <div className="hnav-right">
                <Link href="/contact" className="hnav-cta" onClick={close}>
                  Book a consultation
                </Link>
                <button
                  className="hnav-mobile-toggle"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                  aria-haspopup="true"
                  aria-expanded={mobileOpen}
                >
                  <Menu size={28} />
                </button>
              </div>
            </nav>

            {/* Centered compact dropdown panel */}
            {openDropdown && (
              <div className="hnav-dropdown-wrap-compact">
                <div className="hnav-grid-compact">
                  {(openDropdown === 'services' ? services : openDropdown === 'about' ? about : insights).map((item: any) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="hnav-item-compact"
                      onClick={close}
                    >
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <>
            <div className="hnav-mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true"></div>
            <div className="hnav-mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
              <button className="hnav-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={32} />
              </button>
              <div className="hnav-mobile-section">
                <span className="hnav-mobile-section-title">Solutions</span>
                {services.map((item: any) => (
                  <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</Link>
                ))}
              </div>
              <div className="hnav-mobile-section">
                <span className="hnav-mobile-section-title">Resources</span>
                {insights.map((item: any) => (
                  <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</Link>
                ))}
              </div>
              <div className="hnav-mobile-section">
                <span className="hnav-mobile-section-title">About Us</span>
                {about.map((item: any) => (
                  <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</Link>
                ))}
              </div>
              {/* No "Contact Us" row here on purpose: the Book a consultation
                  CTA below already covers it. */}
              <Link href="/contact" className="hnav-cta hnav-mobile-cta" onClick={() => setMobileOpen(false)}>
                Book a consultation
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
