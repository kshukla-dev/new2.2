'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Mail, Lock, MessageSquare, Headphones, ChevronDown } from 'lucide-react'
import { CALENDLY_URL } from '@/lib/constants'
import { fireContactConversion } from '@/utils/conversion'

function DropdownSelect({
  options,
  value,
  onChange
}: {
  options: { value: string; label: string }[]
  value: string
  onChange: (val: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value) || options[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setFocusedIndex(-1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
        setFocusedIndex(0)
      } else {
        setFocusedIndex((prev) => (prev + 1) % options.length)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
        setFocusedIndex(options.length - 1)
      } else {
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length)
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isOpen && focusedIndex >= 0) {
        onChange(options[focusedIndex].value)
        setIsOpen(false)
        setFocusedIndex(-1)
      } else {
        setIsOpen(true)
      }
    } else if (e.key === 'Tab') {
      setIsOpen(false)
      setFocusedIndex(-1)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ position: 'relative', width: '100%' }}
    >
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-16 rounded-2xl border border-slate-200 bg-white pl-16 pr-12 text-[16px] text-[#0F1F3D] outline-none flex items-center justify-between cursor-pointer select-none transition-all duration-300"
        style={{
          width: '100%',
          height: '64px',
          paddingLeft: '64px',
          paddingRight: '20px',
          borderRadius: '16px',
          border: isOpen ? '1px solid #2563EB' : '1px solid #cbd5e1',
          backgroundColor: '#ffffff',
          color: '#0F1F3D',
          outline: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: isOpen ? '0 0 0 4px rgba(37, 99, 235, 0.15)' : 'none',
          transition: 'all 0.3s'
        }}
      >
        <div
          className="absolute left-3 w-10 h-10 bg-blue-50/70 rounded-xl flex items-center justify-center text-blue-600 pointer-events-none"
          style={{ position: 'absolute', left: '12px', width: '40px', height: '40px', backgroundColor: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', pointerEvents: 'none', zIndex: 10 }}
        >
          <Headphones size={18} />
        </div>

        <span className="font-normal" style={{ fontSize: '16px' }}>{selectedOption.label}</span>

        <ChevronDown
          size={18}
          className="text-slate-400 transition-transform duration-300"
          style={{
            color: '#94a3b8',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s'
          }}
        />
      </div>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 w-full mt-2 bg-white border border-slate-200 rounded-[14px] shadow-[0_16px_40px_rgba(15,31,61,0.12)] z-50 transition-all duration-300"
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            marginTop: '8px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            boxShadow: '0 16px 40px rgba(15, 31, 61, 0.12)',
            overflowY: 'auto',
            maxHeight: '184px',
            overscrollBehavior: 'contain',
            pointerEvents: 'auto',
            zIndex: 999,
            padding: '6px 0',
            listStyle: 'none',
            margin: 0
          }}
        >
          {options.map((item, idx) => {
            const isSelected = item.value === value
            const isFocused = idx === focusedIndex
            return (
              <li
                key={item.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(item.value)
                  setIsOpen(false)
                  setFocusedIndex(-1)
                }}
                onMouseEnter={() => setFocusedIndex(idx)}
                className="px-6 py-3 text-[15px] cursor-pointer select-none transition-all duration-150"
                style={{
                  padding: '10px 20px',
                  fontSize: '15px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  color: isSelected ? '#143369' : '#334155',
                  backgroundColor: isSelected
                    ? '#eff6ff'
                    : isFocused
                      ? '#f8fafc'
                      : 'transparent',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'background-color 0.15s, color 0.15s'
                }}
              >
                {item.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default function QuickContactForm() {
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('eor_services')
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isNavigating) return
    setIsNavigating(true)
    router.push(`/contact?email=${encodeURIComponent(email)}&reason=${encodeURIComponent(reason)}`)
  }

  const contactReasons = [
    {
      value: "general_inquiry",
      label: "General inquiry"
    },
    {
      value: "eor_services",
      label: "Employer of Record services"
    },
    {
      value: "payroll_services",
      label: "Payroll services"
    },
    {
      value: "contractor_management",
      label: "Contractor management"
    },
    {
      value: "immigration_services",
      label: "Immigration services"
    },
    {
      value: "compliance_questions",
      label: "Compliance questions"
    },
    {
      value: "partnership_opportunities",
      label: "Partnership opportunities"
    },
    {
      value: "support_request",
      label: "Support request"
    },
    {
      value: "careers",
      label: "Careers"
    }
  ]
  const [utmData, setUtmData] = useState({
    source: '',
    medium: '',
    campaign: '',
    content: '',
    term: '',
    gclid: ''
  })

  const getBookingUrl = () => {
    const url = new URL(CALENDLY_URL)
    if (utmData.source) url.searchParams.set('utm_source', utmData.source)
    if (utmData.medium) url.searchParams.set('utm_medium', utmData.medium)
    if (utmData.campaign) url.searchParams.set('utm_campaign', utmData.campaign)
    if (utmData.content) url.searchParams.set('utm_content', utmData.content)
    if (utmData.term) url.searchParams.set('utm_term', utmData.term)
    if (utmData.gclid) url.searchParams.set('gclid', utmData.gclid)
    return url.toString()
  }
  return (
    <div
      className="hidden md:block quick-contact-form-container w-full max-w-[520px] rounded-[24px] bg-white border border-slate-200/80 shadow-[0_30px_70px_rgba(15,31,61,0.12)] transition-all duration-300"
      style={{ width: '100%', maxWidth: '520px', borderRadius: '24px', backgroundColor: '#ffffffe3', border: '1px solid #e2e8f0', boxShadow: '0 30px 70px rgba(15, 31, 61, 0.12)' }}
    >

      {/* Form Content */}
      <div className="p-6 sm:p-10 pb-6" style={{ padding: 'var(--form-padding, 40px)' }}>
        <style>{`
          @media (min-width: 768px) {
            .quick-contact-form-container {
              margin-top: 56px !important;
            }
          }
          @media (max-width: 767px) {
            .quick-contact-form-container {
              display: none !important;
            }
            div:has(> .quick-contact-form-container) {
              display: none !important;
            }
          }
          @media (max-width: 640px) {
            :root {
              --form-padding: 24px 20px 20px !important;
            }
          }
        `}</style>

        <h3 className="mt-4 text-[30px] sm:text-[36px] leading-[1.1] font-bold tracking-tight text-[#0F1F3D]">
          Let's start a conversation
        </h3>

        <p className="text-[15px] sm:text-[16px] leading-[1.5] text-slate-500" style={{ marginTop: '15px' }}>
          Leave your details and one of our global expansion experts will reach out shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" style={{ marginTop: '32px', gap: '20px', display: 'flex', flexDirection: 'column' }}>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

            <div className="relative flex items-center" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <div
                className="absolute left-3 w-10 h-10 bg-blue-50/70 rounded-xl flex items-center justify-center text-blue-600 pointer-events-none"
                style={{ position: 'absolute', left: '12px', width: '40px', height: '40px', backgroundColor: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', pointerEvents: 'none', zIndex: 10 }}
              >
                <Mail size={18} />
              </div>
              <input
                id="quick-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-16 rounded-2xl border border-slate-200 bg-white pl-16 pr-5 text-[16px] text-[#0F1F3D] placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100/50"
                style={{ width: '100%', height: '64px', paddingLeft: '64px', paddingRight: '20px', borderRadius: '16px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0F1F3D', outline: 'none', fontSize: '16px', transition: 'all 0.3s' }}
              />
            </div>
          </div>

          {/* Select Reason */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <DropdownSelect
              options={contactReasons}
              value={reason}
              onChange={setReason}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group w-full h-16 rounded-2xl bg-[#1a4274] hover:bg-[#1d4ed8] text-white font-semibold text-[16px] flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 active:scale-[0.99] cursor-pointer"
            style={{ width: '100%', height: '64px', borderRadius: '16px', backgroundColor: '#143369', color: '#ffffff', fontWeight: 600, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            <span>Send Message</span>

          </button>

        </form>
      </div>

      {/* Footer Security Notice - Full Width */}
      <div
        className="bg-slate-50/70 border-t border-slate-100/80 py-5 px-8 sm:px-10 flex items-center justify-center gap-3"
        style={{ backgroundColor: 'transparent', borderTop: '1px solid #e2e8f0', padding: 'var(--footer-padding, 20px 40px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
      >
        <style>{`
          @media (max-width: 640px) {
            :root {
              --footer-padding: 16px 20px !important;
            }
          }
        `}</style>
        {/* <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f0fdf4', color: '#16a34a' }}>
          <Lock size={14} className="text-green-600" />
        </div> */}

        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#' }} className="text-sm font-medium text-slate-500">
          <span>Require immediate attention ?</span>

          <span style={{ color: '#64748b', margin: '0 10px' }}>|</span>
          <a
            href={getBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => fireContactConversion()}
            style={{ color: '#F7931E', fontWeight: 'bold', textDecoration: 'none' }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            Book a Call
          </a>
        </div>

      </div>

    </div >
  )
}
