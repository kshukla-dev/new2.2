'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'

/**
 * Stripped-down header for the /hire-non-eu-employees-netherlands ads landing
 * page (matches jf_website_2.0's campaign-page Header branch) - no site nav,
 * just logo + phone + a single CTA so paid traffic stays focused on converting.
 *
 * Uses plain scoped CSS (not Tailwind utility classes) - this project's
 * global.css has an unlayered `a { color: inherit }` rule that beats
 * Tailwind v4's @layer utilities regardless of specificity/order, so
 * Tailwind classes on links/buttons here render unreliably.
 */
export default function CampaignHeader() {
  return (
    <header className="campaign-header">
      <style>{`
        .campaign-header{position:absolute;top:0;left:0;width:100%;z-index:50;background:#ffffff;border-bottom:1px solid rgba(226,232,240,0.8);box-shadow:0 1px 2px rgba(0,0,0,0.05)}
        .campaign-header-inner{max-width:1280px;margin:0 auto;padding:0 16px;height:80px;display:flex;align-items:center;justify-content:space-between}
        .campaign-header-logo{display:flex;flex-shrink:0}
        .campaign-header-logo img{width:135px;height:auto;object-fit:contain}
        .campaign-header-right{display:flex;align-items:center;gap:12px}
        .campaign-header-phone{color:#143369;font-weight:700;text-decoration:none;white-space:nowrap;display:flex;align-items:center;justify-content:center;padding:8px;border-radius:9999px;transition:background-color 0.2s,color 0.2s}
        .campaign-header-phone-text{display:none}
        .campaign-header-phone svg{display:block}
        .campaign-header-contact-btn{background:#143369;color:#ffffff;padding:6px 14px;border-radius:9999px;font-size:12px;font-weight:700;text-decoration:none;white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,0.05);transition:background-color 0.2s}
        .campaign-header-contact-btn:hover{background:#0f2650}
        @media (min-width:640px){
          .campaign-header-logo img{width:195px}
          .campaign-header-right{gap:16px}
          .campaign-header-phone{padding:0;border-radius:0}
          .campaign-header-phone:hover{background:transparent;color:rgba(20,51,105,0.8)}
          .campaign-header-phone svg{display:none}
          .campaign-header-phone-text{display:inline;font-size:14px}
          .campaign-header-contact-btn{padding:10px 20px;font-size:16px}
        }
        @media (min-width:768px){
          .campaign-header-logo img{width:240px}
          .campaign-header-right{gap:24px}
        }
      `}</style>
      <div className="campaign-header-inner">
        <Link href="/" className="campaign-header-logo">
          <Image
            src="/assets/logo-dark.svg"
            alt="Jackson & Frank"
            title="Jackson & Frank"
            width={240}
            height={72}
            priority
          />
        </Link>

        <div className="campaign-header-right">
          <a href="tel:+31267440024" className="campaign-header-phone" aria-label="Call +31 26 74 40 024">
            <Phone className="w-5 h-5" />
            <span className="campaign-header-phone-text">+31 26 74 40 024</span>
          </a>
          <Link href="/contact" className="campaign-header-contact-btn">
            Contact us
          </Link>
        </div>
      </div>
    </header>
  )
}
