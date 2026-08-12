'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileCheck,
  Globe,
  Heart,
  LayoutDashboard,
  Languages,
  MapPin,
  MinusCircle,
  Percent,
  PiggyBank,
  Scale,
  Shield,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import FAQSection from '@/components/templates/FAQSection'
import franceEorData from '@/data/france-eor.json'
import '../countries.css'
import { SlideIn } from '@/components/animations/SlideIn'

const data = franceEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'French law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '17+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Paris', icon: MapPin, iconColor: 'fact-icon-blue' },
  { label: 'Currency', value: 'Euro (EUR)', icon: DollarSign, iconColor: 'fact-icon-green' },
  { label: 'Languages', value: 'French', icon: Languages, iconColor: 'fact-icon-purple' },
  { label: 'Population', value: '68M+', icon: Users, iconColor: 'fact-icon-orange' },
  { label: 'Ease of doing business', value: 'Very high', icon: Zap, iconColor: 'fact-icon-emerald' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'fact-icon-indigo' },
  { label: 'VAT standard rate', value: '20%', icon: Percent, iconColor: 'fact-icon-red' },
  { label: 'Timezone', value: 'CET (GMT+1 / +2)', icon: Clock, iconColor: 'fact-icon-cyan' },
]

const employeeBenefits = [
  { title: 'French Social Security (Sécurité Sociale)', icon: Heart, desc: 'Mandatory health insurance, family benefits, and retirement through Sécurité Sociale.' },
  { title: 'URSSAF Contributions', icon: Shield, desc: 'Social security contributions (employer and employee) administered by URSSAF.' },
  { title: 'Unemployment Insurance', icon: Wallet, desc: 'Unemployment benefits via Pôle Emploi and complementary unemployment insurance.' },
  { title: 'Pension & Benefits', icon: PiggyBank, desc: 'State pension, complementary pension, 13th month, and meal vouchers as per sector.' },
]

const publicHolidays2026 = [
  { name: "New Year's Day", date: 'January 1, 2026 (Thursday)' },
  { name: 'Easter Monday', date: 'April 6, 2026 (Monday)' },
  { name: 'Labour Day', date: 'May 1, 2026 (Friday)' },
  { name: 'Victory in Europe Day', date: 'May 8, 2026 (Friday)' },
  { name: 'Ascension Day', date: 'May 14, 2026 (Thursday)' },
  { name: 'Whit Monday', date: 'May 25, 2026 (Monday)' },
  { name: 'Bastille Day', date: 'July 14, 2026 (Tuesday)' },
  { name: 'Assumption of Mary', date: 'August 15, 2026 (Saturday)' },
  { name: "All Saints' Day", date: 'November 1, 2026 (Sunday)' },
  { name: 'Armistice Day', date: 'November 11, 2026 (Wednesday)' },
  { name: 'Christmas Day', date: 'December 25, 2026 (Friday)' },
]

const eorPros = [
  'No French entity (SARL/SA) required save significant setup cost and 6–12 months.',
  'Hire employees in France in 2–3 days with full URSSAF and legal compliance.',
  'Jackson & Frank handles payroll, taxes, URSSAF, and French employment law.',
  'Local French contracts and mandatory benefits (holiday pay, 13th month, leave) included.',
  'Talent Passport and work permit support for non-EU talent.',
  'Single provider for multiple countries if you expand beyond France.',
]

const eorCons = [
  'Ongoing monthly cost per employee vs. long-term lower cost with your own entity at scale.',
  'You depend on the EOR for compliance choose a licensed provider like Jackson & Frank.',
  'Collective agreements (conventions collectives) and sector rules may apply; we handle this.',
]

const eorBenefits = [
  'No local entity required save cost and 6–12 months setup',
  'Full compliance with French employment law and URSSAF',
  'Local employment contracts and payroll from day one',
  'Talent Passport and work permit support',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written contract recommended (mandatory for CDD)', 'Probation: 2–4 months max (by category)', 'CDI vs CDD rules'],
  },
  {
    title: 'Notice & severance',
    items: ['Notice: 1–3 months (by category and seniority)', 'Statutory severance (indemnité légale) after 8 months', 'Conventional severance often higher'],
  },
  {
    title: 'Pay & benefits',
    items: ['Minimum wage (SMIC) ~€11.88/hour (2026)', '13th month common in many sectors', '25 days leave minimum', 'Sick pay: employer then Sécurité Sociale'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'French entity & URSSAF', jf: 'Own French entity', others: 'Varies' },
  { feature: 'Dedicated France support', jf: 'Yes', others: 'Often global only' },
  { feature: 'Talent Passport / work permit', jf: 'Full support', others: 'Limited or extra' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often add-ons' },
]

const services = [
  { title: 'Payroll', desc: 'Monthly payroll, URSSAF, holiday pay, 13th month, DPAE, year-end.', icon: FileCheck },
  { title: 'HR support', desc: 'Contract management, amendments, leave, and local HR queries.', icon: Users },
  { title: 'Benefits', desc: 'Health insurance (mutuelle), pension, meal vouchers, and mandatory benefits.', icon: Shield },
  { title: 'Contracts', desc: 'French-compliant employment contracts and addendums.', icon: FileCheck },
  { title: 'Compliance', desc: 'Collective agreements, URSSAF, tax office, and employment law.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & details', desc: 'Sign master service agreement and send employee details and offer.' },
  { day: 'Day 2', title: 'Contract & onboarding', desc: 'We issue the French contract; employee signs. We register DPAE, URSSAF, mutuelle.' },
  { day: 'Day 3', title: 'Live on payroll', desc: 'Employee is onboarded and included in the next payroll run.' },
]

const payrollHandles = [
  'Income tax and URSSAF (social security) withholdings',
  'Holiday pay and 13th month salary',
  'Health insurance (mutuelle) registration',
  'Payslips and annual statements',
  'DPAE declaration and tax/social filings',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View team, documents, and payroll status in one place.' },
  { title: 'Employee management', desc: 'Add, update, and manage French employees and contracts.' },
  { title: 'Reporting', desc: 'Cost reports, headcount, and export for finance.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: '6–12 months' },
  { aspect: 'Setup cost', eor: 'Low (monthly fee)', entity: 'High (incorporation, legal, accounting)' },
  { aspect: 'Compliance risk', eor: 'EOR holds risk', entity: 'You hold full risk' },
  { aspect: 'Ongoing admin', eor: 'Handled by EOR', entity: 'Your team or local provider' },
]

const startupUseCases = [
  'First hires in the EU without a French SARL/SA',
  'Testing the market with a small team in Paris',
  'Remote-first teams with French talent',
]

const enterpriseUseCases = [
  'Scaling French teams without new entities',
  'M&A or project-based hiring in France',
  'Centralized global EOR with strong French compliance',
]

const stats2026 = [
  { label: 'Average time to hire (with EOR)', value: '2–3 days' },
  { label: 'Minimum wage (FR, 2026)', value: '~€11.88 / hour' },
  { label: 'Holiday pay', value: '25 days minimum' },
  { label: 'Statutory leave', value: '25 days minimum' },
]


const franceEorCaseStudies = [
  {
    slug: 'smart-mobility-brand-netherlands-workforce-setup',
    title: 'Smart Mobility Brand European Expansion & Workforce Setup',
    client: 'Global Smart Mobility & IoT Brand',
    excerpt: 'Established compliant operations and onboarded regional leadership team in under 3 weeks across target European markets.',
    metrics: [
      { value: '3 weeks', label: 'Onboarding time' },
      { value: '100%', label: 'Compliance achieved' },
      { value: '0', label: 'Entity setup cost' },
    ],
  },
]

export default function FrancePage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <div className="france-page">
      {/* 1. Hero */}
      <SlideIn as="section" direction="fade-up" className="hero-section">
        <div className="hero-bg-wrapper">
          <Image
            src="/countries/eor-france.webp"
            alt="France Employer of Record"
            fill
            className="hero-bg-img"
            priority
            sizes="100vw"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Hire in <span>France</span>
          </h1>
          <p className="hero-subtitle">
            Hire employees in France without opening an entity.
          </p>
          <p className="hero-desc">
            Employer of Record France: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
          </p>

          <div className="hero-cta">
            <Link className="btn-outline" href="/contact?reason=eor_services">
              Hire in France
            </Link>
          </div>

          <div className="trust-badges">
            {trustBadges.map((b) => {
              const Icon = b.icon
              return (
                <span key={b.label} className="badge">
                  <Icon className="badge-icon" />
                  {b.label}
                </span>
              )
            })}
          </div>
        </div>
      </SlideIn>

      {/* 2. Country Facts */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="zoom-in" className="section country-facts-section">
          <div className="container">
            <h2 className="section-title">France at a glance</h2>
            <p className="section-desc">
              The France is one of Europe's most competitive economies and a gateway to EU talent. With strong employment laws, high English proficiency, and a business-friendly environment, it is a top choice for Employer of Record and France payroll outsourcing.
            </p>
            <div className="country-facts-grid">
              {countryFacts.map((fact, index) => {
                const IconComponent = fact.icon
                return (
                  <div key={index} className="fact-card">
                    <IconComponent className={`fact-icon ${fact.iconColor}`} />
                    <p className="fact-label">{fact.label}</p>
                    <p className="fact-value">{fact.value}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 3. What is EOR in the France */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-right" className="section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">What is Employer of Record (EOR) in the France?</h2>
              <p className="section-desc left-align">
                Employer of Record France lets you hire France (Local) employees without setting up a local entity. We become the legal employer; you keep day-to-day control. Ideal for companies that want to hire employees in the France without entity setup.
              </p>
            </div>
            <div className="eor-cards-wrapper">
              {/* Who needs France EOR? */}
              <div className="eor-card">
                <div className="eor-card-accent"></div>
                <div className="eor-card-content">
                  <div className="eor-card-header">
                    <div className="icon-wrapper">
                      <Users className="icon" />
                    </div>
                    <h3>Who needs France EOR?</h3>
                  </div>
                  <p>
                    US, UK, EU, and global companies hiring in the France; startups and scaleups building a France (Local) team; enterprises expanding without new entities; HR leaders and recruiters who need fast, compliant hiring.
                  </p>
                </div>
              </div>
              {/* Benefits */}
              <div className="eor-card">
                <div className="eor-card-accent"></div>
                <div className="eor-card-content">
                  <div className="eor-card-header">
                    <div className="icon-wrapper">
                      <CheckCircle2 className="icon" />
                    </div>
                    <h3>Benefits</h3>
                  </div>
                  <ul className="benefits-list">
                    {eorBenefits.map((b) => (
                      <li key={b}>
                        <CheckCircle2 className="list-icon" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="learn-more-link">
              <Link href="/employer-of-record">
                Learn more about global EOR <ArrowRight className="arrow-icon" />
              </Link>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 4. Why the France is attractive for hiring */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-left" className="section why-france-section">
          <div className="container">
            <div className="why-header">
              <div className="subtitle-with-icon">
                <Globe className="globe-icon" />
                <span>Why the France?</span>
              </div>
              <div className="orange-line"></div>
            </div>
            <h2 className="section-title left-align">
              Why the France is an attractive option for hiring
            </h2>
            <div className="text-content">
              <p>
                The France offers an exceptional business environment with a highly educated, multilingual workforce and a strong culture of innovation. As one of Europe's most open economies, it provides excellent access to EU markets and is a leading hub for tech, logistics, and finance. France (Local) employment laws 2026 and a clear regulatory framework make France EOR and France payroll outsourcing straightforward for international companies.
              </p>
              <p>
                English is widely spoken, and the country ranks among the top globally for quality of life and work-life balance. With Europe's largest port in Rotterdam and a strategic location, the France is ideal for companies hiring in the France without entity: you get local contracts, full compliance with France (Local) employment laws, and access to top talent through Employer of Record France services.
              </p>
              <p>
                France (Local) workers are known for high productivity, technical skills, and a collaborative mindset. The government supports innovation and the Highly Skilled Migrant program makes it easier to bring in non-EU talent. Whether you need France payroll outsourcing, full EOR, or visa support, the France is a prime destination for scaling your European team.
              </p>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 5. Employee Benefits */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-up" className="section employee-benefits-section">
          <div className="container">
            <h2 className="section-title center-align">Employee benefits in the France</h2>
            <p className="section-desc center-align">
              We manage mandatory and optional benefits for your France (Local) employees through our France EOR and payroll platform. Full compliance with France (Local) employment laws 2026, including holiday allowance, pension, and social security.
            </p>
            <div className="benefits-grid">
              {employeeBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="benefit-card">
                    <div className="benefit-icon-wrapper">
                      <IconComponent className="benefit-icon" />
                    </div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 6. France Employment Laws 2026 */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="zoom-in" className="section employment-laws-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">France Employment Laws 2026: What Companies Must Know</h2>
              <p className="section-desc left-align">
                Stay compliant with France (Local) employment law. Key rules on contracts, probation, notice, minimum wage, and employee protections.
              </p>
            </div>
            <div className="laws-grid">
              {employmentLaws.map((block) => (
                <div key={block.title} className="law-card">
                  <h3>{block.title}</h3>
                  <ul>
                    {block.items.map((item) => (
                      <li key={item}>
                        <CheckCircle2 className="list-icon" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="disclaimer-text">
              Non-compliance can lead to fines, back payments, and reputational risk. With France EOR, Jackson & Frank ensures your hires meet France (Local) employment laws 2026.
            </p>
          </div>
        </SlideIn>
      </div>

      {/* 7. Pros and Cons of France EOR */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-right" className="section pros-cons-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Pros and cons of France EOR</h2>
              <p className="section-desc left-align">
                Weigh the benefits and considerations of using an Employer of Record in the France versus setting up your own entity.
              </p>
            </div>
            <div className="pros-cons-grid">
              <div className="pro-card">
                <h3>
                  <CheckCircle2 className="pro-icon" />
                  Pros of France EOR
                </h3>
                <ul>
                  {eorPros.map((item) => (
                    <li key={item}>
                      <CheckCircle2 className="pro-icon-small" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="con-card">
                <h3>
                  <MinusCircle className="con-icon" />
                  Considerations
                </h3>
                <ul>
                  {eorCons.map((item) => (
                    <li key={item}>
                      <MinusCircle className="con-icon-small" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 8. Why Choose Jackson & Frank France EOR */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-left" className="section why-choose-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Why Choose Jackson & Frank for France EOR?</h2>
              <p className="section-desc left-align">
                Speed, compliance, and local expertise so you can focus on growing your team.
              </p>
            </div>
            <div className="why-choose-grid">
              {[
                { icon: Clock, title: '2–3 day onboarding', desc: 'From signed agreement to live on payroll in 2–3 business days.' },
                { icon: Scale, title: 'Full compliance', desc: 'France (Local) entity, CAO awareness, and employment law compliance built in.' },
                { icon: Users, title: 'Local expertise', desc: 'Dedicated knowledge of France (Local) payroll, benefits, and HR practices.' },
                { icon: Shield, title: 'Risk managed', desc: 'We carry employment and tax risk as the legal employer in the France.' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="choose-card">
                    <div className="choose-icon-wrapper">
                      <Icon className="choose-icon" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                )
              })}
            </div>
            <div className="center-btn-wrapper">
              <Link href="/contact?reason=eor_services" className="btn-primary">
                Get a custom quote
              </Link>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 5. Jackson & Frank vs Other France EOR Providers */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-up" className="section vs-section eor-section-bg">
          <div className="container">
            <div className="section-header center-align">
              <h2 className="section-title center-align">Jackson & Frank vs Other France EOR Providers</h2>
              <p className="section-desc center-align">
                Compare speed, compliance, support, and pricing. We focus on European markets with a strong France footprint.
              </p>
            </div>
            <div className="table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="highlight-col-header">Jackson & Frank</th>
                    <th>Deel / Remote / Papaya</th>
                  </tr>
                </thead>
                <tbody>
                  {jfVsOthers.map((row, index) => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td className="highlight-col">
                        <span className="jf-feature">
                          <CheckCircle2 className="check-icon" />
                          {row.jf}
                        </span>
                      </td>
                      <td>{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 6. Complete France Employment Services */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="zoom-in" className="section services-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Our Complete France Employment Services</h2>
              <p className="section-desc left-align">
                End-to-end employment and payroll so you can hire and manage France (Local) talent without a local entity.
              </p>
            </div>
            <div className="services-grid">
              {services.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.title} className="service-card">
                    <div className="service-icon-wrapper">
                      <Icon className="service-icon" />
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 7. France EOR + Immigration */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-right" className="section immigration-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">France EOR + Immigration Services</h2>
              <p className="section-desc left-align">
                Visa sponsorship and relocation support so you can hire non-EU talent in the France.
              </p>
            </div>
            <div className="immigration-cards">
              <div className="imm-card">
                <h3>Visa sponsorship</h3>
                <p>We support combined residence and work permits (GVVA) and coordinate with the IND so your employees can work legally in the France.</p>
              </div>
              <div className="imm-card">
                <h3>Highly Skilled Migrant (HSM) program</h3>
                <p>Fast-track permits and reduced salary thresholds for qualified professionals. We handle sponsorship and paperwork as your France EOR.</p>
              </div>
              <div className="imm-card">
                <h3>Relocation support</h3>
                <p>From registration to BSN and first payroll: we guide your new hires through the France (Local) system so they can start quickly.</p>
              </div>
            </div>
            <div className="learn-more-link center-link">
              <Link href="/contact?reason=immigration_services">
                Ask about visa & relocation <ArrowRight className="arrow-icon" />
              </Link>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 8. How Our France EOR Process Works */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-left" className="section process-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">How Our France EOR Process Works (2–3 Days)</h2>
              <p className="section-desc left-align">
                From agreement to first payroll in three simple steps.
              </p>
            </div>
            <div className="process-grid">
              <div className="process-line"></div>
              {processSteps.map((step, i) => (
                <div key={step.day} className="process-card-wrapper">
                  <div className="process-card">
                    <span className="process-badge">{step.day}</span>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 9. France Payroll: What We Handle */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-up" className="section payroll-handles-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">France Payroll: What We Handle</h2>
              <p className="section-desc left-align">
                Full payroll and tax compliance so you don't have to manage France (Local) regulations.
              </p>
            </div>
            <ul className="payroll-list">
              {payrollHandles.map((item) => (
                <li key={item}>
                  <CheckCircle2 className="list-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="learn-more-link center-link italic-link">
              <Link href="/payroll">
                Global payroll services <ArrowRight className="arrow-icon" />
              </Link>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 10. Platform Features */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="zoom-in" className="section platform-section">
          <div className="container">
            <div className="section-header center-align">
              <h2 className="section-title center-align">Platform Features</h2>
              <p className="section-desc center-align">
                Manage your France team from one place.
              </p>
            </div>
            <div className="platform-grid">
              {platformFeatures.map((f) => (
                <div key={f.title} className="platform-card">
                  <div className="platform-icon-wrapper">
                    <LayoutDashboard className="platform-icon" />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 11. Compliance & Risk Management */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-right" className="section compliance-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Compliance & Risk Management</h2>
              <p className="section-desc left-align">
                We keep your France hiring legally sound and audit-ready.
              </p>
            </div>
            <div className="compliance-grid">
              {[
                { title: 'Legal compliance', desc: 'France (Local) employment law, CAO, UWV, and tax office requirements.' },
                { title: 'Risk mitigation', desc: 'Correct classification, contracts, and filings to avoid fines and back payments.' },
                { title: 'Audit support', desc: 'Documentation and reporting for internal and external audits.' },
              ].map((item) => (
                <div key={item.title} className="compliance-card">
                  <Scale className="compliance-icon" />
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 12. France EOR Success Stories */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-left" className="section success-stories-section">
          <div className="container">
            <div className="section-header center-align">
              <h2 className="section-title center-align">France EOR Success Stories</h2>
              <p className="section-desc center-align">
                Real results from companies using our Employer of Record in the France.
              </p>
            </div>
            <div className="success-grid">
              {franceEorCaseStudies.map((c, index) => (
                <Link key={c.slug} href={`/case-studies/${c.slug}`} className="success-card">
                  <div className="success-card-accent"></div>
                  <div className="success-badge-row">
                    <span className="success-number">{index + 1}</span>
                    <span className="success-label">EOR Case Study</span>
                  </div>
                  <h3 className="success-title">{c.title}</h3>
                  <p className="success-client">{c.client}</p>
                  <p className="success-excerpt">{c.excerpt}</p>
                  <div className="success-metrics">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="metric-box">
                        <p className="metric-value">{m.value}</p>
                        <p className="metric-label">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <span className="success-cta">
                    Read full case study <ArrowRight className="arrow-icon" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="center-btn-wrapper">
              <Link href="/case-studies" className="btn-outline-primary">
                View all success stories <ArrowRight className="arrow-icon" />
              </Link>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 13. EOR vs Entity Setup in France */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-up" className="section entity-vs-eor-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">EOR vs Entity Setup in the France</h2>
              <p className="section-desc left-align">
                Decide whether France EOR or a France (Local) BV is right for you.
              </p>
            </div>
            <div className="table-wrapper">
              <table className="comparison-table small-table">
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th className="text-primary">France EOR</th>
                    <th className="text-gray">France (Local) entity (BV)</th>
                  </tr>
                </thead>
                <tbody>
                  {eorVsEntity.map((row) => (
                    <tr key={row.aspect}>
                      <td>{row.aspect}</td>
                      <td className="text-primary fw-medium">{row.eor}</td>
                      <td className="text-gray">{row.entity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 14. EOR for Startups vs Enterprises */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="zoom-in" className="section startups-enterprise-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">EOR for Startups vs Enterprises</h2>
              <p className="section-desc left-align">
                Whether you're a startup or enterprise, France EOR fits your use case.
              </p>
            </div>
            <div className="startups-grid">
              <div className="startup-card">
                <div className="card-header">
                  <Zap className="card-icon-secondary" />
                  <h3>Startups & scaleups</h3>
                </div>
                <ul>
                  {startupUseCases.map((u) => (
                    <li key={u}>
                      <CheckCircle2 className="list-icon" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="enterprise-card">
                <div className="card-header">
                  <Building2 className="card-icon-primary" />
                  <h3>Enterprises</h3>
                </div>
                <ul>
                  {enterpriseUseCases.map((u) => (
                    <li key={u}>
                      <CheckCircle2 className="list-icon" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 15. Contractor Management in France */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-right" className="section contractor-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Contractor Management in the France</h2>
              <p className="section-desc left-align">
                Avoid misclassification and stay compliant when engaging France (Local) contractors.
              </p>
            </div>
            <div className="contractor-box">
              <p className="contractor-intro">
                France (Local) rules on self-employed vs employed are strict. Misclassifying workers can lead to back taxes, penalties, and reclassification. We help you:
              </p>
              <ul className="contractor-list">
                <li>
                  <CheckCircle2 className="list-icon" />
                  Assess contractor vs employee status and avoid false self-employment (schijnzelfstandigheid) risk.
                </li>
                <li>
                  <CheckCircle2 className="list-icon" />
                  Use compliant contracts and structures for genuine contractors.
                </li>
                <li>
                  <CheckCircle2 className="list-icon" />
                  Convert contractors to employees via France EOR when a permanent role makes more sense.
                </li>
              </ul>
              <div className="learn-more-link">
                <Link href="/france-contractor">
                  France contractor solutions <ArrowRight className="arrow-icon" />
                </Link>
              </div>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* Comprehensive Guide to Hiring in the France (tabs) */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-left" className="section guide-section eor-section-bg">
          <div className="container">
            <h2 className="section-title left-align">
              Our comprehensive guide to hiring in the France
            </h2>
            <p className="section-desc left-align">
              Explore leave, termination, public holidays, onboarding, and immigration. Everything you need for France (Local) employment laws 2026 and France payroll outsourcing.
            </p>

            <div className="tabs-wrapper">
              <div className="tabs-list">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  >
                    {tab === 'leave' && 'Leave Policy'}
                    {tab === 'termination' && 'Termination'}
                    {tab === 'holidays' && 'Public Holidays'}
                    {tab === 'onboarding' && 'Onboarding'}
                    {tab === 'additional' && 'Visa & Immigration'}
                  </button>
                ))}
              </div>
            </div>

            <div className="tab-content">
              {activeTab === 'leave' && (
                <div className="tab-pane">
                  <div className="tab-section">
                    <h3>Annual leave</h3>
                    <p>In the France, employees are entitled to a minimum of 20 days (4 weeks) of paid annual leave per year based on full-time employment. Many employers offer 25 days or more. Unused vacation days can usually be carried forward but must be used within six months after the end of the calendar year. Our France EOR ensures your team receives full statutory and contractual leave under France (Local) employment laws 2026.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Maternity leave</h3>
                    <p>Expecting mothers are entitled to 16 weeks of maternity leave (6 weeks before and 10 weeks after the due date). Salary is paid at 100% by the France (Local) Employee Insurance Agency (UWV). Additional unpaid parental leave is available. We handle all administration and compliance for your France (Local) employees.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Paternity and partner leave</h3>
                    <p>Partners receive one week of paid birth leave at 100% salary within four weeks of birth, plus five weeks of additional birth leave (paid at 70% by UWV) within six months. Parental leave of 26 times weekly hours per child (until the child turns 8) is also available first 9 weeks paid at 70%, remainder unpaid.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Sick leave</h3>
                    <p>Employers must continue to pay sick employees for up to 2 years (minimum 70% of salary, often 100% in year one and 70% in year two as per contract). France payroll outsourcing through Jackson & Frank includes correct sick pay and UWV reporting.</p>
                  </div>
                </div>
              )}

              {activeTab === 'termination' && (
                <div className="tab-pane">
                  <div className="tab-section">
                    <h3>Termination requirements</h3>
                    <p>In the France, termination is highly regulated. Employers can terminate via mutual consent, through the UWV (Employee Insurance Agency), or through the courts. Unilateral termination without proper procedure is not permitted. Valid grounds include business economic reasons, long-term illness, frequent absenteeism, underperformance, misconduct, or a disturbed employment relationship.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Notice period</h3>
                    <p>Statutory notice (employer) depends on tenure:</p>
                    <ul>
                      <li>Less than 5 years: 1 month</li>
                      <li>5–10 years: 2 months</li>
                      <li>10–15 years: 3 months</li>
                      <li>15+ years: 4 months</li>
                    </ul>
                    <p className="mt-2">Employee notice is typically 1 month unless the contract states otherwise.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Transition payment (transitievergoeding)</h3>
                    <p>Required for employees with at least 24 months of service. Calculated as 1/3 of a month's salary per year for the first 10 years and 1/2 month per year thereafter, capped at €89,000 or one year's salary (whichever is higher). As your Employer of Record France, we handle all termination and transition payments in line with France (Local) employment laws 2026.</p>
                  </div>
                </div>
              )}

              {activeTab === 'holidays' && (
                <div className="tab-pane">
                  <h3>Public holidays in the France 2026</h3>
                  <p className="mb-4">Below are the main national public holidays. Employers are not always required to give paid time off for every holiday it depends on the sector and collective agreement (CAO). Our France EOR team applies the correct rules for your employees.</p>
                  <div className="holidays-list">
                    {publicHolidays2026.map((holiday, index) => (
                      <div key={index} className="holiday-row">
                        <span className="holiday-name">{holiday.name}</span>
                        <span className="holiday-date">{holiday.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'onboarding' && (
                <div className="tab-pane">
                  <div className="tab-section">
                    <h3>Onboarding process</h3>
                    <p>With Jackson & Frank France EOR, onboarding typically takes 2–3 business days. We handle registration with the France (Local) tax authority, BSN for foreign workers, and payroll setup. No France (Local) entity required you send employee details and signed agreements; we issue the France (Local) contract and get them live on France payroll.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Salary and holiday allowance</h3>
                    <p>Employers must pay at least the statutory minimum wage and an 8% holiday allowance (typically paid in May). Salaries are usually paid monthly with detailed payslips. France payroll outsourcing through us includes all withholdings, social security, and filings.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Employment contract</h3>
                    <p>France (Local) contracts must be in writing and include:</p>
                    <ul>
                      <li>Names and addresses of both parties</li>
                      <li>Start date and place of work</li>
                      <li>Job description, salary, and working hours</li>
                      <li>Leave entitlements and notice periods</li>
                    </ul>
                  </div>
                  <div className="tab-section">
                    <h3>Probation period</h3>
                    <p>Maximum 1 month for contracts under 2 years; 2 months for contracts of 2+ years or permanent. During probation, either party can terminate without notice. We draft compliant contracts as part of our Employer of Record France service.</p>
                  </div>
                </div>
              )}

              {activeTab === 'additional' && (
                <div className="tab-pane">
                  <h3>France (Local) work permits and visas</h3>
                  <p className="mb-3">Non-EU/EEA nationals need a combined residence and work permit (GVVA) or qualify under the Highly Skilled Migrant (HSM) program. Jackson & Frank supports visa sponsorship and relocation: we coordinate with the IND (Immigration and Naturalisation Service), handle sponsorship as your France EOR, and guide employees through BSN registration and first payroll.</p>
                  <p>Our in-house team manages the full visa and permit process so you can hire employees in the France without entity and without worrying about immigration compliance. Ideal for tech, finance, and scaleups bringing international talent to Amsterdam, Rotterdam, or elsewhere in the France.</p>
                </div>
              )}
            </div>
          </div>
        </SlideIn>
      </div>

      {/* Learn more – Contractor */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-up" className="section cta-section">
          <div className="container center-align">
            <Link href="/france-contractor" className="btn-primary btn-large">
              Learn more about France contractor solutions
              <ArrowRight className="arrow-icon" />
            </Link>
          </div>
        </SlideIn>
      </div>

      {/* 16. France Employment Statistics 2026 */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="zoom-in" className="section stats-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">France Employment Statistics 2026</h2>
              <p className="section-desc left-align">
                Hiring trends, salary benchmarks, and market insights for planning your France (Local) team.
              </p>
            </div>
            <div className="stats-grid">
              {stats2026.map((s) => (
                <div key={s.label} className="stat-card">
                  <p className="stat-value">{s.value}</p>
                  <p className="stat-label">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="stats-footer">
              France (Local) labor market remains competitive for tech, finance, and logistics. France EOR helps you access talent quickly while staying compliant with France (Local) employment laws 2026 and payroll obligations.
            </p>
          </div>
        </SlideIn>
      </div>

      {/* 17. FAQs */}
      <div className="faq-wrapper section eor-section-bg" style={{ paddingTop: 0 }}>
        <div className="container">
          <FAQSection
            id="faq"
            title={data.faqs.title}
            subtitle={data.faqs.subtitle}
            items={data.faqs.items}
            contactLinkText="Contact our France EOR experts"
            contactHref="/contact?reason=eor_services"
            faqPageHref="/faq"
            faqPageLabel="Browse all FAQs"
          />
        </div>
      </div>
    </div>
  )
}
