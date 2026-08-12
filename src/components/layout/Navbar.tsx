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

export default function Navbar() {
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
      if (!t.closest('.nav-links') && !t.closest('.dropdown-wrap-compact')) close()
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

  // /home has its own floating navbar variant (HomeNavbar)
  if (pathname === '/home') return null

  // Ads landing page uses its own stripped-down CampaignHeader instead.
  if (pathname === '/hire-non-eu-employees-netherlands' || pathname.startsWith('/germany/') || pathname.startsWith('/germany')) return null



  return (
    <>
      <style>{`
        .nav-placeholder{height:76px;width:100%}
        .main-nav{position:fixed;top:0;left:0;right:0;width:100%;z-index:100;background:var(--bg);border-bottom:1px solid var(--border);box-shadow:0 4px 20px rgba(0,0,0,0.05);transition:all 0.3s ease;border-bottom-left-radius:24px;border-bottom-right-radius:24px}
        .main-nav.scrolled{background:var(--header-bg);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);box-shadow:0 4px 20px rgba(0,0,0,0.05)}
        .nav-inner{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding-top:18px;padding-bottom:18px;gap:24px}
        .logo{font-family:'DM Serif Display',var(--serif);font-size:clamp(22px,4vw,32px);font-weight:500;letter-spacing:-0.01em;color:var(--ink);text-decoration:none;justify-self:start;display:flex;align-items:center}
        .logo-img{height:38px;width:auto;display:block;transition:height 0.2s ease}
        .nav-links{display:flex;gap:28px;align-items:center;justify-self:center}
        .nav-trigger{position:relative;display:inline-flex;align-items:center;color:var(--ink);font-size:16px;font-weight:600;padding:8px 0;transition:color 0.2s;font-family:var(--sans);background:transparent;border:none;cursor:pointer;text-decoration:none}
        .nav-trigger:hover,.nav-trigger.active{color:#09407B}
        .nav-trigger::after{content:'';position:absolute;bottom:0px;left:0;right:0;height:2px;background-color:#F7931E;border-radius:999px;transform:scaleX(0);transform-origin:center;transition:transform 0.2s ease-out}
        .nav-trigger.active::after{transform:scaleX(1)}
        .btn-consultation{background:#F7931E;color:#ffffff !important;padding:10px 24px;border-radius:8px;font-size:15px;font-weight:600;font-family:var(--sans);transition:background-color 0.2s,transform 0.2s,box-shadow 0.2s;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;border:none;white-space:nowrap;box-shadow:0 4px 14px rgba(247,147,30,0.3)}
        .btn-consultation:hover{background:#e07d10;transform:translateY(-1px);box-shadow:0 6px 20px rgba(247,147,30,0.45)}
        .dropdown-wrap{position:absolute;top:100%;left:0;right:0;z-index:60;padding-top:12px;padding-bottom:16px;background:var(--bg);border-top:1px solid var(--border);border-bottom:1px solid var(--border);box-shadow:0 30px 60px -20px rgba(0,0,0,0.12);animation:dropIn 0.22s ease}
        @keyframes dropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .nav-contact-info{display:flex;gap:16px;align-items:center}
        .nav-contact-item{color:var(--ink);font-size:14px;font-weight:500;text-decoration:none;display:flex;align-items:center;gap:6px;transition:color 0.2s}
        .nav-contact-item:hover{color:var(--accent)}
        .nav-contact-item svg{width:16px;height:16px;color:var(--accent)}
        .nav-right{display:flex;gap:8px;align-items:center;justify-self:end}
        .mobile-toggle{display:none;background:transparent;border:none;cursor:pointer;color:var(--ink);padding:6px;min-width:44px;min-height:44px;align-items:center;justify-content:center}
        .mobile-overlay{position:fixed;inset:0;background:rgba(14,15,59,0.4);backdrop-filter:blur(4px);z-index:190}
        .mobile-drawer{position:fixed;top:0;bottom:0;right:0;width:100%;max-width:100%;background:var(--bg);z-index:200;padding:80px 24px 32px;display:flex;flex-direction:column;gap:0;overflow-y:auto;box-shadow:-10px 0 40px rgba(0,0,0,0.1);animation:slideIn 0.3s cubic-bezier(0.16,1,0.3,1)}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        .mobile-close{position:absolute;top:18px;right:24px;background:transparent;border:none;cursor:pointer;color:var(--ink);min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;z-index:210}
        .mobile-section{display:flex;flex-direction:column;gap:0}
        /* Each group after the first is fenced off with a rule so the
           section label reads as a heading, not as another nav link. */
        .mobile-section + .mobile-section{margin-top:22px;padding-top:22px;border-top:1px solid var(--border)}
        .mobile-section-title{font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#EF5A0F;font-family:var(--sans);margin-bottom:2px}
        .mobile-section a{font-size:15.5px;font-weight:500;color:var(--ink);padding:13px 0;border-bottom:1px solid var(--border);text-decoration:none;min-height:44px;display:flex;align-items:center;transition:color 0.18s ease}
        .mobile-section a:last-child{border-bottom:none}
        .mobile-section a:hover,.mobile-section a:active{color:#EF5A0F}
        .mobile-cta{align-self:stretch;margin-top:28px}
        /* .btn-consultation is hidden in the bar at this width, but the copy
           inside the drawer must stay visible — hence the compound override. */
        @media(max-width:900px){.nav-links{display:none}.mobile-toggle{display:inline-flex}.nav-inner{grid-template-columns:1fr auto}.btn-consultation{display:none}.btn-consultation.mobile-cta{display:inline-flex}.dropdown-wrap{display:none}.nav-contact-info{display:none}}
        @media(max-width:768px){.logo{font-size:24px;white-space:nowrap}.logo-img{height:30px}}

        .dropdown-wrap-compact {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 20px 50px -20px rgba(0, 0, 0, 0.1);
          padding: 28px;
          width: max-content;
          max-width: 580px;
          margin-top: 12px;
          animation: dropInCompact 0.2s ease-out;
        }
        @keyframes dropInCompact {
          from {
            opacity: 0;
            transform: translate(-50%, -8px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .dropdown-grid-compact {
          display: grid;
          grid-template-columns: repeat(2, minmax(220px, 1fr));
          gap: 14px 48px;
        }
        .dropdown-item-compact {
          display: block;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background 0.18s ease, color 0.18s ease;
          text-decoration: none;
          text-align: left;
        }
        .dropdown-item-compact:hover {
          background: rgba(247, 147, 30, 0.06);
        }
        .dropdown-item-compact strong {
          display: block;
          font-size: 15px;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 4px;
          font-family: var(--sans);
          transition: color 0.18s ease;
        }
        .dropdown-item-compact:hover strong {
          color: #F7931E;
        }
        .dropdown-item-compact span {
          display: block;
          font-size: 12.5px;
          color: var(--ink-muted);
          line-height: 1.5;
        }
      `}</style>

      <div className="nav-wrapper">
        <div className="nav-placeholder"></div>
        <nav className={`main-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container nav-inner">
            {/* Logo (left) */}
            <Link href="/" className="logo" onClick={close}>
              <img src="/logo-dark.svg" alt="Jackson & Frank" className="logo-img" />
            </Link>

            {/* Center nav */}
            <div className="nav-links">
              {[
                { key: 'services', label: 'Solutions' },
                { key: 'insights', label: 'Resources' },
                { key: 'about', label: 'About Us' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`nav-trigger${openDropdown === key ? ' active' : ''}`}
                  onClick={() => toggle(key as any)}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === key}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Right CTA */}
            <div className="nav-right">
              {pathname !== '/contact' && (
                <Link href="/contact" className="btn-consultation" onClick={close}>
                  Book a consultation
                </Link>
              )}
              <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-haspopup="true"
                aria-expanded={mobileOpen}
              >
                <Menu size={28} />
              </button>
            </div>
          </div>

          {/* Centered compact dropdown panel */}
          {openDropdown && (
            <div className="dropdown-wrap-compact">
              <div className="dropdown-grid-compact">
                {(openDropdown === 'services' ? services : openDropdown === 'about' ? about : insights).map((item: any) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="dropdown-item-compact"
                    onClick={close}
                  >
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <>
            <div className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true"></div>
            <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
              <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={32} />
              </button>
              <div className="mobile-section">
                <span className="mobile-section-title">Solutions</span>
                {services.map((item: any) => (
                  <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</Link>
                ))}
              </div>
              <div className="mobile-section">
                <span className="mobile-section-title">Resources</span>
                {insights.map((item: any) => (
                  <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</Link>
                ))}
              </div>
              <div className="mobile-section">
                <span className="mobile-section-title">About Us</span>
                {about.map((item: any) => (
                  <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</Link>
                ))}
              </div>
              {/* No "Contact Us" row here on purpose: the Book a consultation
                  CTA below already covers it. */}
              <Link href="/contact" className="btn-consultation mobile-cta" onClick={() => setMobileOpen(false)}>
                Book a consultation
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
