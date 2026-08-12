'use client'
import { BaseSchema } from '@/components/seo/BaseSchema'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cc from '@/data/cost-calculator.json'
import {
  Calculator,
  DollarSign,
  Shield,
  Coins,
  Building2,
  Globe,
  TrendingUp,
  ChevronDown,
  Check,
  Info,
  HelpCircle,
  ArrowRight
} from 'lucide-react'

interface CalcCountry {
  value: string
  label: string
  flag: string
  currency: string
  currencySymbol: string
  incomeTaxRate: number
  employeeSocialSecurityRate: number
  employerSocialSecurityRate: number
  benefitsPercentage: number
  averageBenefits: number
}

export default function CostCalculatorPage() {
  const countries = cc.countries as CalcCountry[]

  const [selectedValue, setSelectedValue] = useState('')
  const [grossSalary, setGrossSalary] = useState<number | ''>('')
  const [benefits, setBenefits] = useState<number | ''>('')
  const [openFaq, setOpenFaq] = useState<number>(-1)

  const selected = useMemo(() => {
    return countries.find((c) => c.value === selectedValue) ?? null
  }, [selectedValue, countries])

  const result = useMemo(() => {
    const c = selected
    const gross = typeof grossSalary === 'number' ? grossSalary : null
    if (!c || !gross || gross <= 0) return null

    const benefitAmount = (typeof benefits === 'number' && benefits > 0) ? benefits : c.averageBenefits
    const incomeTax = gross * c.incomeTaxRate
    const employeeSS = gross * c.employeeSocialSecurityRate
    const employerSS = gross * c.employerSocialSecurityRate
    const totalDeductions = incomeTax + employeeSS
    const netSalary = gross - totalDeductions
    const totalEmployerCost = gross + employerSS + benefitAmount

    return { c, gross, benefitAmount, incomeTax, employeeSS, employerSS, totalDeductions, netSalary, totalEmployerCost }
  }, [selected, grossSalary, benefits])

  function fmt(n: number, symbol: string) {
    return `${symbol}${Math.round(n).toLocaleString('en-US')}`
  }

  function toggleFaq(index: number) {
    setOpenFaq(prev => (prev === index ? -1 : index))
  }

  // Helper to map icon string from JSON to Lucide components
  function getFeatureIcon(iconName: string) {
    switch (iconName) {
      case 'DollarSign': return <DollarSign className="cc-card-icon-svg" />
      case 'Shield': return <Shield className="cc-card-icon-svg" />
      case 'Coins': return <Coins className="cc-card-icon-svg" />
      case 'Building2': return <Building2 className="cc-card-icon-svg" />
      case 'Calculator': return <Calculator className="cc-card-icon-svg" />
      case 'Globe': return <Globe className="cc-card-icon-svg" />
      case 'TrendingUp': return <TrendingUp className="cc-card-icon-svg" />
      default: return <Calculator className="cc-card-icon-svg" />
    }
  }

  return (
    <>
      <BaseSchema />
      <style>{`
        /* Premium Page Wrapper & Layout */
        .cc-page-container {
          background-color: #fbfbfc;
          color: #1e293b;
        }

        /* Hero Styling */
        .cc-hero-section {
          background: linear-gradient(135deg, #0b0f2e 0%, #151a4a 100%);
          color: #ffffff;
          padding: 100px 16px 110px;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-top:-2rem;
        }
        .cc-hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 60%);
          pointer-events: none;
        }
        .cc-hero-badge {
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
        .cc-hero-badge svg {
          width: 14px;
          height: 14px;
        }
        .cc-hero-title {
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(32px, 5vw, 56px);
          line-height: 1.15;
          margin-bottom: 20px;
          font-weight: 400;
        }
        .cc-hero-title em {
          font-style: italic;
          color: var(--accent-warm, #F7931E);
          font-weight: 500;
        }
        .cc-hero-desc {
          font-size: clamp(16px, 1.8vw, 19px);
          color: rgba(255, 255, 255, 0.8);
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Main Workspace Grid */
        .cc-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
          gap: 40px;
          align-items: start;
          margin-top: -40px;
          position: relative;
          z-index: 10;
          padding-bottom: 80px;
        }

        /* Glassmorphic Calculator Cards */
        .cc-card {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.03), 0 1px 3px rgba(15, 23, 42, 0.02);
          padding: 40px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cc-card:hover {
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
        }

        .cc-card-title {
          font-family: var(--serif, Georgia, serif);
          font-size: 26px;
          color: #0f172a;
          margin-bottom: 8px;
          font-weight: 500;
        }
        .cc-card-subtitle {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 32px;
          line-height: 1.5;
        }

        /* Form Fields */
        .cc-field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
        }
        .cc-field-label {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .cc-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .cc-input-wrapper select,
        .cc-input-wrapper input {
          width: 100%;
          font-family: var(--sans, inherit);
          font-size: 15px;
          padding: 14px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
          color: #0f172a;
          outline: none;
          transition: all 0.2s ease;
          appearance: none;
        }
        .cc-input-wrapper select {
          padding-right: 44px;
          cursor: pointer;
        }
        .cc-input-wrapper select:focus,
        .cc-input-wrapper input:focus {
          border-color: var(--accent, #143369);
          box-shadow: 0 0 0 4px rgba(20, 51, 105, 0.08);
        }
        .cc-select-chevron {
          position: absolute;
          right: 16px;
          pointer-events: none;
          color: #64748b;
          width: 16px;
          height: 16px;
        }
        .cc-flag-preview {
          position: absolute;
          right: 44px;
          display: flex;
          align-items: center;
          pointer-events: none;
        }
        .cc-flag-image {
          border-radius: 4px;
          border: 1px solid #e2e8f0;
          object-fit: cover;
        }

        /* Custom Information Box */
        .cc-info-box {
          margin-top: 32px;
          padding: 24px;
          background: rgba(20, 51, 105, 0.03);
          border: 1px solid rgba(20, 51, 105, 0.08);
          border-radius: 16px;
        }
        .cc-info-box-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--accent, #143369);
          margin-bottom: 14px;
        }
        .cc-info-box-title svg {
          width: 16px;
          height: 16px;
        }
        .cc-info-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cc-info-item {
          font-size: 13px;
          color: #475569;
          line-height: 1.5;
          position: relative;
          padding-left: 20px;
        }
        .cc-info-item::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent, #143369);
          font-weight: bold;
        }

        /* Results Box Styling */
        .cc-results-container {
          min-height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cc-empty-state {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px;
          color: #64748b;
        }
        .cc-empty-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(20, 51, 105, 0.05);
          color: var(--accent, #143369);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--serif, Georgia, serif);
          font-size: 32px;
          margin-bottom: 20px;
          border: 1px solid rgba(20, 51, 105, 0.08);
        }
        .cc-empty-text {
          font-size: 15px;
          max-width: 320px;
          line-height: 1.6;
        }

        /* Result Cards Grid */
        .cc-result-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 36px;
        }
        .cc-res-card {
          padding: 24px;
          border-radius: 18px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cc-res-card-dark {
          background: #0f172a;
          border-color: #0f172a;
          color: #ffffff;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
        }
        .cc-res-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #64748b;
          margin-bottom: 12px;
        }
        .cc-res-card-dark .cc-res-label {
          color: #94a3b8;
        }
        .cc-res-amount {
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 500;
          color: #0f172a;
          line-height: 1.1;
        }
        .cc-res-card-dark .cc-res-amount {
          color: var(--accent-warm, #F7931E);
        }
        .cc-res-subtext {
          font-size: 12px;
          color: #64748b;
          margin-top: 8px;
          line-height: 1.4;
        }
        .cc-res-card-dark .cc-res-subtext {
          color: #94a3b8;
        }

        /* Breakdown Table */
        .cc-breakdown-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #475569;
          margin-bottom: 16px;
        }
        .cc-breakdown-section {
          margin-bottom: 32px;
        }
        .cc-table-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1.5px solid #f1f5f9;
          font-size: 14px;
          color: #475569;
          align-items: center;
        }
        .cc-table-row em {
          font-style: normal;
          font-size: 12px;
          color: #94a3b8;
          margin-left: 6px;
        }
        .cc-table-row-total {
          font-weight: 600;
          color: #0f172a;
          border-bottom-color: #cbd5e1;
        }
        .cc-table-row-total span:last-child {
          font-size: 16px;
        }

        .cc-btn-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.2s ease;
        }
        .cc-disclaimer-text {
          margin-top: 20px;
          font-size: 11.5px;
          color: #64748b;
          line-height: 1.6;
          text-align: justify;
        }

        /* Features & Benefits Sections */
        .cc-features-section {
          padding: 80px 16px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }
        .cc-section-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .cc-section-subtitle {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent, #143369);
          margin-bottom: 12px;
        }
        .cc-section-title {
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(28px, 4vw, 42px);
          color: #0f172a;
          font-weight: 400;
        }
        .cc-section-desc {
          margin-top: 16px;
          font-size: 16px;
          color: #64748b;
          max-width: 600px;
          margin-inline: auto;
          line-height: 1.6;
        }
        
        .cc-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 28px;
        }
        .cc-feature-card {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s ease;
        }
        .cc-feature-card:hover {
          background: #ffffff;
          border-color: rgba(20, 51, 105, 0.12);
          box-shadow: 0 15px 30px rgba(15, 23, 42, 0.05);
          transform: translateY(-4px);
        }
        .cc-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(20, 51, 105, 0.05);
          color: var(--accent, #143369);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .cc-card-icon-svg {
          width: 22px;
          height: 22px;
        }
        .cc-card-heading {
          font-family: var(--sans, inherit);
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 12px;
        }
        .cc-card-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }

        .cc-benefits-section {
          padding: 80px 16px;
          background: #f8fafc;
        }
        .cc-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 900px) {
          .cc-benefits-grid {
            grid-template-columns: 1fr;
          }
        }

        /* FAQ Accordion Section */
        .cc-faq-section {
          padding: 80px 16px;
          background: #ffffff;
        }
        .cc-faq-list {
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cc-faq-item {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.2s ease;
        }
        .cc-faq-item-active {
          border-color: rgba(20, 51, 105, 0.12);
          background: #ffffff;
          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.02);
        }
        .cc-faq-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          background: none;
          border: none;
          text-align: left;
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .cc-faq-trigger:hover {
          color: var(--accent, #143369);
        }
        .cc-faq-chevron {
          width: 18px;
          height: 18px;
          color: #64748b;
          transition: transform 0.2s ease;
        }
        .cc-faq-item-active .cc-faq-chevron {
          transform: rotate(180deg);
        }
        .cc-faq-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.25s ease-out, padding 0.25s ease-out;
        }
        .cc-faq-item-active .cc-faq-content {
          max-height: 250px;
          padding: 0 24px 24px;
          border-top: 1px dashed #e2e8f0;
          padding-top: 16px;
        }
        .cc-faq-answer {
          font-size: 14.5px;
          color: #475569;
          line-height: 1.7;
        }

        /* Bottom CTA Section */
        .cc-cta-section {
          padding: 90px 16px;
          background: linear-gradient(135deg, #0b0f2e 0%, #151a4a 100%);
          color: #ffffff;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cc-cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 10% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .cc-cta-box {
          max-width: 720px;
          margin: 0 auto;
        }
        .cc-cta-title {
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          margin-bottom: 18px;
        }
        .cc-cta-desc {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 40px;
          line-height: 1.6;
        }
        .cc-cta-features {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 40px;
          list-style: none;
          padding: 0;
        }
        .cc-cta-feat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
        }
        .cc-cta-feat-item svg {
          width: 16px;
          height: 16px;
          color: var(--accent-warm, #F7931E);
        }

        /* Responsive Layouts */
        @media (max-width: 1024px) {
          .cc-main-grid {
            grid-template-columns: 1fr;
            margin-top: -20px;
            gap: 28px;
          }
          .cc-card {
            padding: 32px 24px;
          }
        }
        @media (max-width: 640px) {
          .cc-hero-section {
            padding-top: 110px;
            padding-bottom: 70px;
          }
          .cc-result-cards {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .cc-faq-trigger {
            padding: 18px;
            font-size: 15px;
          }
          .cc-faq-item-active .cc-faq-content {
            padding: 0 18px 18px;
            padding-top: 12px;
          }
        }
      `}</style>

      <div className="cc-page-container">
        {/* Hero Section */}
        <header className="cc-hero-section">
          <div className="container">
            <div className="cc-hero-badge">
              <Calculator />
              <span>{cc.hero.badge.text}</span>
            </div>
            <h1 className="cc-hero-title">Calculate <em>employment costs</em></h1>
            <p className="cc-hero-desc">{cc.hero.description}</p>
          </div>
        </header>

        {/* Main Workspace (Form + Results) */}
        <div className="home-content-scale">
          <section className="container cc-main-grid">
            {/* Input Form Card */}
            <div className="cc-card">
              <h2 className="cc-card-title">{cc.calculator.title}</h2>
              <p className="cc-card-subtitle">{cc.calculator.subtitle}</p>

              {/* Country Selection */}
              <div className="cc-field-group">
                <span className="cc-field-label">{cc.calculator.countryLabel}</span>
                <div className="cc-input-wrapper">
                  <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                    <option value="" disabled>Select a country</option>
                    {countries.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  {selected && (
                    <div className="cc-flag-preview">
                      <Image
                        src={selected.flag}
                        alt={`${selected.label} flag`}
                        width={20}
                        height={13}
                        className="cc-flag-image"
                      />
                    </div>
                  )}
                  <ChevronDown className="cc-select-chevron" />
                </div>
              </div>

              {/* Gross Salary Input */}
              <div className="cc-field-group">
                <span className="cc-field-label">
                  {cc.calculator.grossSalaryLabel} {selected && `(${selected.currency})`}
                </span>
                <div className="cc-input-wrapper">
                  <input
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(e.target.value === '' ? '' : Number(e.target.value))}
                    type="number"
                    min="0"
                    placeholder="e.g. 60000"
                  />
                </div>
              </div>

              {/* Additional Benefits Input */}
              <div className="cc-field-group">
                <span className="cc-field-label">{cc.calculator.benefitsLabel}</span>
                <div className="cc-input-wrapper">
                  <input
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value === '' ? '' : Number(e.target.value))}
                    type="number"
                    min="0"
                    placeholder={cc.calculator.benefitsPlaceholder}
                  />
                </div>
              </div>

              {/* Informational Guidelines Card */}
              <div className="cc-info-box">
                <div className="cc-info-box-title">
                  <Info />
                  <span>{cc.calculator.infoBox.title}</span>
                </div>
                <ul className="cc-info-list">
                  {cc.calculator.infoBox.items.map((item: string) => (
                    <li key={item} className="cc-info-item">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Results Display Card */}
            <div className="cc-card cc-results-container">
              {!result ? (
                <div className="cc-empty-state">
                  <div className="cc-empty-circle">€</div>
                  <p className="cc-empty-text">{cc.results.emptyState}</p>
                </div>
              ) : (
                <div>
                  {/* Summary Result Cards */}
                  <div className="cc-result-cards">
                    <div className="cc-res-card">
                      <span className="cc-res-label">{cc.results.netSalaryLabel}</span>
                      <strong className="cc-res-amount">{fmt(result.netSalary, result.c.currencySymbol)}</strong>
                      <span className="cc-res-subtext">{cc.results.netSalarySubtext}</span>
                    </div>
                    <div className="cc-res-card cc-res-card-dark">
                      <span className="cc-res-label">{cc.results.totalCostLabel}</span>
                      <strong className="cc-res-amount">{fmt(result.totalEmployerCost, result.c.currencySymbol)}</strong>
                      <span className="cc-res-subtext">{cc.results.totalCostSubtext}</span>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="cc-breakdown-section">
                    <h3 className="cc-breakdown-title">{cc.results.breakdownLabel}</h3>
                    <div className="cc-table-row">
                      <span>{cc.results.grossSalaryLabel}</span>
                      <span>{fmt(result.gross, result.c.currencySymbol)}</span>
                    </div>
                    <div className="cc-table-row">
                      <span>
                        {cc.results.employerSSLabel}
                        <em>{cc.results.employerSSNote}</em>
                      </span>
                      <span>+ {fmt(result.employerSS, result.c.currencySymbol)}</span>
                    </div>
                    <div className="cc-table-row">
                      <span>{cc.results.benefitsLabel}</span>
                      <span>+ {fmt(result.benefitAmount, result.c.currencySymbol)}</span>
                    </div>
                    <div className="cc-table-row cc-table-row-total">
                      <span>{cc.results.totalCostLabel}</span>
                      <span>{fmt(result.totalEmployerCost, result.c.currencySymbol)}</span>
                    </div>
                  </div>

                  <div className="cc-breakdown-section">
                    <h3 className="cc-breakdown-title">{cc.results.deductionsLabel}</h3>
                    <div className="cc-table-row">
                      <span>{cc.results.incomeTaxLabel}</span>
                      <span>− {fmt(result.incomeTax, result.c.currencySymbol)}</span>
                    </div>
                    <div className="cc-table-row">
                      <span>{cc.results.employeeSSLabel}</span>
                      <span>− {fmt(result.employeeSS, result.c.currencySymbol)}</span>
                    </div>
                    <div className="cc-table-row cc-table-row-total">
                      <span>{cc.results.totalDeductionsLabel}</span>
                      <span>− {fmt(result.totalDeductions, result.c.currencySymbol)}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/contact?reason=payroll_services" className="btn-primary cc-btn-cta">
                    <span>{cc.results.ctaButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="cc-disclaimer-text">{cc.results.disclaimer}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Features Section */}
        <section className="cc-features-section">
          <div className="container">
            <div className="cc-section-header">
              <span className="cc-section-subtitle">{cc.features.subtitle}</span>
              <h2 className="cc-section-title">{cc.features.title}</h2>
              <p className="cc-section-desc">{cc.features.description}</p>
            </div>
            <div className="cc-features-grid">
              {cc.features.items.map((feat: any) => (
                <div key={feat.title} className="cc-feature-card">
                  <div className="cc-card-icon">
                    {getFeatureIcon(feat.icon)}
                  </div>
                  <h3 className="cc-card-heading">{feat.title}</h3>
                  <p className="cc-card-desc">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="cc-benefits-section">
          <div className="container">
            <div className="cc-section-header">
              <span className="cc-section-subtitle">{cc.benefits.subtitle}</span>
              <h2 className="cc-section-title">{cc.benefits.title}</h2>
            </div>
            <div className="cc-benefits-grid">
              {cc.benefits.items.map((benefit: any) => (
                <div key={benefit.title} className="cc-feature-card">
                  <div className="cc-card-icon">
                    {getFeatureIcon(benefit.icon)}
                  </div>
                  <h3 className="cc-card-heading">{benefit.title}</h3>
                  <p className="cc-card-desc">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="cc-faq-section">
          <div className="container">
            <div className="cc-section-header">
              <h2 className="cc-section-title">{cc.faqs.title}</h2>
            </div>
            <div className="cc-faq-list">
              {cc.faqs.items.map((faq: any, i: number) => (
                <div
                  key={i}
                  className={`cc-faq-item ${openFaq === i ? 'cc-faq-item-active' : ''}`}
                >
                  <button className="cc-faq-trigger" onClick={() => toggleFaq(i)}>
                    <span>{faq.question}</span>
                    <ChevronDown
                      className="cc-faq-chevron"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  <div className="cc-faq-content">
                    <p className="cc-faq-answer">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Block */}
        <section className="cc-cta-section">
          <div className="container cc-cta-box">
            <h2 className="cc-cta-title">{cc.cta.title}</h2>
            <p className="cc-cta-desc">{cc.cta.description}</p>
            <ul className="cc-cta-features">
              {cc.cta.features.map((feat: string) => (
                <li key={feat} className="cc-cta-feat-item">
                  <Check />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact?reason=payroll_services" className="btn-primary" style={{ display: 'inline-flex', padding: '16px 36px' }}>
              <span>{cc.cta.primaryButtonText}</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
