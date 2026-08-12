'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { SITE_CONFIG, NAVIGATION } from '@/lib/constants'

/**
 * Stripped-down footer for the /hire-non-eu-employees-netherlands ads landing
 * page (matches jf_website_2.0's campaign-page Footer branch) - logo, a
 * handful of links, socials, and a copyright line, no newsletter/sitemap grid.
 *
 * Uses plain scoped CSS (not Tailwind utility classes) - see CampaignHeader
 * for why Tailwind classes render unreliably in this project's cascade.
 */
export default function CampaignFooter() {
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false)

  return (
    <footer className="campaign-footer">
      <style>{`
        .campaign-footer{position:relative;background:#0E0C2D;overflow:hidden;padding:24px 0;border-top:1px solid rgba(255,255,255,0.1)}
        .campaign-footer-decor{position:absolute;inset:0;overflow:hidden;pointer-events:none}
        .campaign-footer-decor-blur{position:absolute;top:-160px;right:-160px;width:384px;height:384px;background:rgba(255,255,255,0.05);border-radius:9999px;filter:blur(64px)}
        .campaign-footer-decor-dots{position:absolute;inset:0}
        .campaign-footer-inner{max-width:1280px;margin:0 auto;padding:0 16px;position:relative;z-index:10}
        .campaign-footer-top{display:flex;flex-direction:column;justify-content:space-between;align-items:center;gap:16px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.1)}
        .campaign-footer-logo{display:flex;flex-shrink:0}
        .campaign-footer-logo img{height:36px;width:auto;object-fit:contain}
        .campaign-footer-links{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:16px 32px}
        .campaign-footer-links a{color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;font-size:14px;font-weight:500}
        .campaign-footer-links a:hover{color:#ffffff}
        .campaign-footer-socials{display:flex;gap:10px}
        .campaign-footer-social-btn{width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;transition:all 0.3s;border:1px solid rgba(255,255,255,0.2);cursor:pointer;padding:0}
        .campaign-footer-social-btn:hover{background:#ffffff;border-color:#ffffff}
        .campaign-footer-social-btn svg{width:16px;height:16px;color:#ffffff;transition:color 0.2s}
        .campaign-footer-social-btn:hover svg{color:#0E0C2D}
        .campaign-footer-bottom{display:flex;flex-direction:column;justify-content:space-between;align-items:center;gap:16px;padding-top:20px;text-align:center}
        .campaign-footer-bottom p{font-size:14px;color:rgba(255,255,255,0.6);max-width:280px;margin:0 auto;line-height:1.5}
        @media (min-width:768px){
          .campaign-footer-top{flex-direction:row}
        }
        @media (min-width:640px){
          .campaign-footer-bottom{flex-direction:row}
          .campaign-footer-bottom p{max-width:none;margin:0}
        }

        .campaign-wechat-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:9999}
        .campaign-wechat-dialog-wrap{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px}
        .campaign-wechat-dialog{position:relative;width:100%;max-width:384px;background:#ffffff;border-radius:16px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.35);overflow:hidden}
        .campaign-wechat-header{position:relative;background:linear-gradient(to right,#0E0C2D,#1a1a3a);padding:16px 24px;display:flex;justify-content:space-between;align-items:center}
        .campaign-wechat-header h2{font-size:20px;font-weight:700;color:#ffffff;margin:0}
        .campaign-wechat-close{background:none;border:none;color:#ffffff;cursor:pointer;opacity:1;padding:0;display:flex}
        .campaign-wechat-close:hover{opacity:0.85}
        .campaign-wechat-body{padding:24px;display:flex;flex-direction:column;align-items:center}
        .campaign-wechat-qr{position:relative;width:256px;height:256px;margin-bottom:16px;border-radius:8px;overflow:hidden;background:#fafafa}
        .campaign-wechat-caption{font-size:14px;color:#64748b;text-align:center;margin:0}
      `}</style>

      <div className="campaign-footer-decor">
        <div className="campaign-footer-decor-blur" />
        <div
          className="campaign-footer-decor-dots"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="campaign-footer-inner">
        <div className="campaign-footer-top">
          <Link href="/" className="campaign-footer-logo">
            <Image
              src="/assets/logo-light.svg"
              alt="Jackson & Frank"
              title="Jackson & Frank"
              width={300}
              height={90}
            />
          </Link>

          <div className="campaign-footer-links">
            <Link href="/faq">FAQs</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/sitemaps">Sitemap</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>

          <div className="campaign-footer-socials">
            {NAVIGATION.footer.social.map((social) => {
              const isModal = social.kind === 'modal'
              let icon: React.ReactNode = null
              if (social.name === 'Linkedin') {
                icon = (
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                )
              } else if (social.name === 'Youtube') {
                icon = (
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                )
              } else if (social.name === 'WeChat') {
                icon = (
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm6.43 1.836c-1.693 0-3.254.49-4.445 1.313-1.484 1.01-2.313 2.495-2.313 4.141 0 1.645.829 3.13 2.313 4.14 1.19.824 2.752 1.314 4.445 1.314.352 0 .703-.023 1.051-.067a.722.722 0 0 1 .6.083l1.453.85a.247.247 0 0 0 .127.04c.122 0 .22-.099.22-.22 0-.053-.023-.107-.036-.16l-.298-1.13a.45.45 0 0 1 .163-.508c1.395-1.01 2.25-2.38 2.25-3.9 0-1.646-.83-3.13-2.314-4.14-.82-.57-1.77-.996-2.797-1.256zm-2.98 3.68c.388 0 .703.32.703.715a.708.708 0 0 1-.703.714.708.708 0 0 1-.703-.714c0-.395.315-.715.703-.715zm4.23 0c.388 0 .703.32.703.715a.708.708 0 0 1-.703.714.708.708 0 0 1-.703-.714c0-.395.315-.715.703-.715z" />
                  </svg>
                )
              }

              if (isModal) {
                return (
                  <button
                    key={social.name}
                    type="button"
                    onClick={() => setIsWeChatModalOpen(true)}
                    className="campaign-footer-social-btn"
                    aria-label={social.name}
                  >
                    {icon}
                  </button>
                )
              }

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="campaign-footer-social-btn"
                  aria-label={social.name}
                >
                  {icon}
                </a>
              )
            })}
          </div>
        </div>

        <div className="campaign-footer-bottom">
          <p>&copy; 2013 {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>

      {isWeChatModalOpen && createPortal(
        <>
          <div
            className="campaign-wechat-overlay"
            onClick={() => setIsWeChatModalOpen(false)}
            aria-hidden="true"
          />
          <div className="campaign-wechat-dialog-wrap" role="dialog" aria-modal="true">
            <div className="campaign-wechat-dialog">
              <div className="campaign-wechat-header">
                <h2>Scan QR Code</h2>
                <button onClick={() => setIsWeChatModalOpen(false)} className="campaign-wechat-close" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="campaign-wechat-body">
                <div className="campaign-wechat-qr">
                  <Image src="/license/wechat.webp" alt="WeChat QR Code" fill style={{ objectFit: 'contain' }} />
                </div>
                <p className="campaign-wechat-caption">Scan with WeChat to connect with us</p>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </footer>
  )
}
