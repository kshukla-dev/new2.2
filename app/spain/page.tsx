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
import spainEorData from '@/data/spain-eor.json'
import '../countries.css'
import { SlideIn } from '@/components/animations/SlideIn'

const data = spainEorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Spanish law compliant', icon: Scale },
  { label: '2–3 day onboarding', icon: Zap },
  { label: '17+ countries', icon: Globe },
]

const countryFacts = [
  { label: 'Capital', value: 'Madrid', icon: MapPin, iconColor: 'fact-icon-blue' },
  { label: 'Currency', value: 'Euro (EUR)', icon: DollarSign, iconColor: 'fact-icon-green' },
  { label: 'Languages', value: 'Spanish (+ co-official regional)', icon: Languages, iconColor: 'fact-icon-purple' },
  { label: 'Population', value: '48M+', icon: Users, iconColor: 'fact-icon-orange' },
  { label: 'Ease of doing business', value: 'Strong EU market', icon: Zap, iconColor: 'fact-icon-emerald' },
  { label: 'Payroll frequency', value: 'Monthly', icon: Calendar, iconColor: 'fact-icon-indigo' },
  { label: 'VAT standard rate', value: '21%', icon: Percent, iconColor: 'fact-icon-red' },
  { label: 'Timezone', value: 'CET (GMT+1 / +2)', icon: Clock, iconColor: 'fact-icon-cyan' },
]

const employeeBenefits = [
  { title: 'Seguridad Social', icon: Shield, desc: 'Mandatory registration with the Spanish Social Security system: common contingencies, unemployment, training, and related coverages per applicable bases.' },
  { title: 'Public healthcare', icon: Heart, desc: 'Access to the National Health System (SNS) for affiliated workers and dependents within the rules of each comunidad autónoma.' },
  { title: 'Unemployment & protection', icon: Wallet, desc: 'Contributions toward unemployment benefits and other protective schemes where legally required.' },
  { title: 'Pensions & extra pay', icon: PiggyBank, desc: 'Retirement accrual through contributions; many contracts include extra monthly payments (pagas extraordinarias), often prorated in payroll.' },
]

const publicHolidays2026 = [
  { name: "New Year's Day (Año Nuevo)", date: 'January 1, 2026 (Thursday)' },
  { name: 'Epiphany (Día de Reyes)', date: 'January 6, 2026 (Tuesday)' },
  { name: 'Good Friday (Viernes Santo)', date: 'April 3, 2026 (Friday)' },
  { name: 'Labour Day (Fiesta del Trabajo)', date: 'May 1, 2026 (Friday)' },
  { name: 'Assumption (Asunción de la Virgen)', date: 'August 15, 2026 (Saturday)' },
  { name: 'National Day (Fiesta Nacional de España)', date: 'October 12, 2026 (Monday)' },
  { name: "All Saints' Day (Todos los Santos)", date: 'November 1, 2026 (Sunday)' },
  { name: 'Constitution Day (Día de la Constitución)', date: 'December 6, 2026 (Sunday)' },
  { name: 'Immaculate Conception (Inmaculada Concepción)', date: 'December 8, 2026 (Tuesday)' },
  { name: 'Christmas Day (Navidad)', date: 'December 25, 2026 (Friday)' },
]

const eorPros = [
  'No Spanish entity (S.L./S.A.) required save incorporation time and upfront cost.',
  'Hire employees in Spain in 2–3 days with Seguridad Social and payroll compliance.',
  'Jackson & Frank handles IRPF withholdings, employer SS contributions, contracts, and HR admin.',
  'Local Spanish employment contracts (contrato de trabajo) and statutory vacation (vacaciones).',
  'Immigration support (NIE/TIE, work authorisation) for non-EU talent where applicable.',
  'Single provider if you expand beyond Spain across Europe and globally.',
]

const eorCons = [
  'Ongoing monthly fee per employee vs. lower marginal cost with your own entity at large scale.',
  'You rely on the EOR for compliance choose an experienced provider like Jackson & Frank.',
  'Collective agreements (convenios colectivos) may apply; we coordinate with applicable rules.',
]

const eorBenefits = [
  'No local entity required avoid long S.L. setup and registered office obligations',
  'Full alignment with the Workers’ Statute (Estatuto de los Trabajadores) and Seguridad Social',
  'Spanish payroll and payslips from day one',
  'Work and residence authorisation support for eligible hires',
]

const employmentLaws = [
  {
    title: 'Contracts & probation',
    items: ['Written employment contract (contrato de trabajo) with essential terms', 'Probation (periodo de prueba): length depends on role and collective agreement (often up to 6 months for qualified roles, shorter for others)', 'Fixed-term contracts only where legally justified'],
  },
  {
    title: 'Notice & termination',
    items: ['Dismissals and objective terminations follow strict procedural rules under Spanish law', 'Compensation may apply depending on type of termination (e.g. objective, collective)', 'Disciplinary process must respect guarantees under the Estatuto and agreements'],
  },
  {
    title: 'Pay & leave',
    items: ['National minimum wage (SMI) updated annually in EUR gross/month', 'Minimum 30 calendar days paid annual leave (vacaciones retribuidas)', 'Extra payments (pagas extraordinarias) common often prorated monthly in payroll'],
  },
]

const jfVsOthers = [
  { feature: 'Onboarding speed', jf: '2–3 days', others: '5–14 days' },
  { feature: 'Spanish entity & SS', jf: 'Own Spanish entity', others: 'Varies' },
  { feature: 'Dedicated Spain support', jf: 'Yes', others: 'Often global only' },
  { feature: 'Immigration coordination', jf: 'Full support', others: 'Limited or extra' },
  { feature: 'Transparent pricing', jf: 'Included', others: 'Often add-ons' },
]

const services = [
  { title: 'Payroll', desc: 'Monthly payroll, Seguridad Social (TC1/TC2), IRPF withholdings, pagas extraordinarias prorrata where agreed, payslips, and year-end summaries.', icon: FileCheck },
  { title: 'HR support', desc: 'Contract changes, leave, remote-work documentation, and day-to-day HR queries in Spain.', icon: Users },
  { title: 'Benefits', desc: 'Core statutory benefits, mutual insurance (mutua) coordination where applicable, and aligned extras per policy.', icon: Shield },
  { title: 'Contracts', desc: 'Spanish-compliant contracts and addenda reflecting convenio and company policy.', icon: FileCheck },
  { title: 'Compliance', desc: 'Labour Inspectorate readiness, TGSS filings, AEAT tax obligations, and employment law updates.', icon: Scale },
]

const processSteps = [
  { day: 'Day 1', title: 'Agreement & details', desc: 'Sign master service agreement and send employee details and offer terms.' },
  { day: 'Day 2', title: 'Contract & alta', desc: 'We issue the Spanish contract; employee signs. We complete Seguridad Social registration (alta) and tax setup (NIF/NIE, withholding).' },
  { day: 'Day 3', title: 'Live on payroll', desc: 'Employee is active and included in the next payroll run.' },
]

const payrollHandles = [
  'IRPF personal income tax withholdings and annual reporting where applicable',
  'Employer and employee Seguridad Social contributions (common contingencies, unemployment, training, etc.)',
  'Prorrata of extra payments (pagas extraordinarias) when paid monthly',
  'Temporary incapacity (IT) coordination basics with mutua/INSS rules',
  'Payslips (nómina) and cost reporting for finance',
]

const platformFeatures = [
  { title: 'Dashboard', desc: 'View team, documents, and payroll status in one place.' },
  { title: 'Employee management', desc: 'Add, update, and manage Spanish employees and contracts.' },
  { title: 'Reporting', desc: 'Cost reports, headcount, and exports for accounting.' },
]

const eorVsEntity = [
  { aspect: 'Time to first hire', eor: '2–3 days', entity: 'Several months' },
  { aspect: 'Setup cost', eor: 'Low (monthly fee)', entity: 'High (notary, legal, accounting)' },
  { aspect: 'Compliance risk', eor: 'EOR carries employer duties', entity: 'You carry full risk' },
  { aspect: 'Ongoing admin', eor: 'Handled by EOR', entity: 'Your team or local advisors' },
]

const startupUseCases = [
  'First EU Southern hub hires without incorporating an S.L.',
  'Testing Spain from Madrid, Barcelona, Valencia, or Málaga',
  'Remote-first teams with Spanish-speaking talent in Spain',
]

const enterpriseUseCases = [
  'Scaling Spanish teams without new local entities',
  'Project or M&A hiring with fast onboarding',
  'Centralised global EOR with consistent Spain compliance',
]

const stats2026 = [
  { label: 'Average time to hire (with EOR)', value: '2–3 days' },
  { label: 'Minimum wage (SMI)', value: 'EUR gross/month (annual update)' },
  { label: 'Statutory annual leave', value: '30 calendar days' },
  { label: 'Extra pay (typical)', value: '14 payments / prorrata' },
]


const spainEorCaseStudies = [
  {
    slug: 'smart-mobility-brand-netherlands-workforce-setup',
    title: 'Smart Mobility Brand European Expansion & Workforce Setup',
    client: 'Global Smart Mobility Company',
    excerpt: 'Hired specialized operational and technical talent across European locations with fully compliant EOR contracts and payroll integration.',
    metrics: [
      { value: '25+', label: 'Hires completed' },
      { value: '100%', label: 'Compliance rate' },
      { value: '3 weeks', label: 'Time to onboard' },
    ],
  },
]

export default function SpainPage() {
  const tabs = ['leave', 'termination', 'holidays', 'onboarding', 'additional'] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('leave')

  return (
    <div className="spain-page">
      {/* 1. Hero */}
      <SlideIn as="section" direction="fade-up" className="hero-section">
        <div className="hero-bg-wrapper">
          <Image
            src="/countries/eor-spain.webp"
            alt="Spain Employer of Record"
            fill
            className="hero-bg-img"
            priority
            sizes="100vw"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Hire in <span>Spain</span>
          </h1>
          <p className="hero-subtitle">
            Hire employees in Spain without opening an entity.
          </p>
          <p className="hero-desc">
            Employer of Record Spain: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.
          </p>

          <div className="hero-cta">
            <Link className="btn-outline" href="/contact?reason=eor_services">
              Hire in Spain
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
            <h2 className="section-title">Spain at a glance</h2>
            <p className="section-desc">
              The Spain is one of Europe's most competitive economies and a gateway to EU talent. With strong employment laws, high English proficiency, and a business-friendly environment, it is a top choice for Employer of Record and Spain payroll outsourcing.
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

      {/* 3. What is EOR in the Spain */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-right" className="section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">What is Employer of Record (EOR) in the Spain?</h2>
              <p className="section-desc left-align">
                Employer of Record Spain lets you hire Spain (Local) employees without setting up a local entity. We become the legal employer; you keep day-to-day control. Ideal for companies that want to hire employees in the Spain without entity setup.
              </p>
            </div>
            <div className="eor-cards-wrapper">
              {/* Who needs Spain EOR? */}
              <div className="eor-card">
                <div className="eor-card-accent"></div>
                <div className="eor-card-content">
                  <div className="eor-card-header">
                    <div className="icon-wrapper">
                      <Users className="icon" />
                    </div>
                    <h3>Who needs Spain EOR?</h3>
                  </div>
                  <p>
                    US, UK, EU, and global companies hiring in the Spain; startups and scaleups building a Spain (Local) team; enterprises expanding without new entities; HR leaders and recruiters who need fast, compliant hiring.
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

      {/* 4. Why the Spain is attractive for hiring */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-left" className="section why-spain-section">
          <div className="container">
            <div className="why-header">
              <div className="subtitle-with-icon">
                <Globe className="globe-icon" />
                <span>Why the Spain?</span>
              </div>
              <div className="orange-line"></div>
            </div>
            <h2 className="section-title left-align">
              Why the Spain is an attractive option for hiring
            </h2>
            <div className="text-content">
              <p>
                The Spain offers an exceptional business environment with a highly educated, multilingual workforce and a strong culture of innovation. As one of Europe's most open economies, it provides excellent access to EU markets and is a leading hub for tech, logistics, and finance. Spain (Local) employment laws 2026 and a clear regulatory framework make Spain EOR and Spain payroll outsourcing straightforward for international companies.
              </p>
              <p>
                English is widely spoken, and the country ranks among the top globally for quality of life and work-life balance. With Europe's largest port in Rotterdam and a strategic location, the Spain is ideal for companies hiring in the Spain without entity: you get local contracts, full compliance with Spain (Local) employment laws, and access to top talent through Employer of Record Spain services.
              </p>
              <p>
                Spain (Local) workers are known for high productivity, technical skills, and a collaborative mindset. The government supports innovation and the Highly Skilled Migrant program makes it easier to bring in non-EU talent. Whether you need Spain payroll outsourcing, full EOR, or visa support, the Spain is a prime destination for scaling your European team.
              </p>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* 5. Employee Benefits */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-up" className="section employee-benefits-section">
          <div className="container">
            <h2 className="section-title center-align">Employee benefits in the Spain</h2>
            <p className="section-desc center-align">
              We manage mandatory and optional benefits for your Spain (Local) employees through our Spain EOR and payroll platform. Full compliance with Spain (Local) employment laws 2026, including holiday allowance, pension, and social security.
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

      {/* 6. Spain Employment Laws 2026 */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="zoom-in" className="section employment-laws-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Spain Employment Laws 2026: What Companies Must Know</h2>
              <p className="section-desc left-align">
                Stay compliant with Spain (Local) employment law. Key rules on contracts, probation, notice, minimum wage, and employee protections.
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
              Non-compliance can lead to fines, back payments, and reputational risk. With Spain EOR, Jackson & Frank ensures your hires meet Spain (Local) employment laws 2026.
            </p>
          </div>
        </SlideIn>
      </div>

      {/* 7. Pros and Cons of Spain EOR */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-right" className="section pros-cons-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Pros and cons of Spain EOR</h2>
              <p className="section-desc left-align">
                Weigh the benefits and considerations of using an Employer of Record in the Spain versus setting up your own entity.
              </p>
            </div>
            <div className="pros-cons-grid">
              <div className="pro-card">
                <h3>
                  <CheckCircle2 className="pro-icon" />
                  Pros of Spain EOR
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

      {/* 8. Why Choose Jackson & Frank Spain EOR */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-left" className="section why-choose-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Why Choose Jackson & Frank for Spain EOR?</h2>
              <p className="section-desc left-align">
                Speed, compliance, and local expertise so you can focus on growing your team.
              </p>
            </div>
            <div className="why-choose-grid">
              {[
                { icon: Clock, title: '2–3 day onboarding', desc: 'From signed agreement to live on payroll in 2–3 business days.' },
                { icon: Scale, title: 'Full compliance', desc: 'Spain (Local) entity, CAO awareness, and employment law compliance built in.' },
                { icon: Users, title: 'Local expertise', desc: 'Dedicated knowledge of Spain (Local) payroll, benefits, and HR practices.' },
                { icon: Shield, title: 'Risk managed', desc: 'We carry employment and tax risk as the legal employer in the Spain.' },
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

      {/* 5. Jackson & Frank vs Other Spain EOR Providers */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-up" className="section vs-section eor-section-bg">
          <div className="container">
            <div className="section-header center-align">
              <h2 className="section-title center-align">Jackson & Frank vs Other Spain EOR Providers</h2>
              <p className="section-desc center-align">
                Compare speed, compliance, support, and pricing. We focus on European markets with a strong Spain footprint.
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

      {/* 6. Complete Spain Employment Services */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="zoom-in" className="section services-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Our Complete Spain Employment Services</h2>
              <p className="section-desc left-align">
                End-to-end employment and payroll so you can hire and manage Spain (Local) talent without a local entity.
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

      {/* 7. Spain EOR + Immigration */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-right" className="section immigration-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Spain EOR + Immigration Services</h2>
              <p className="section-desc left-align">
                Visa sponsorship and relocation support so you can hire non-EU talent in the Spain.
              </p>
            </div>
            <div className="immigration-cards">
              <div className="imm-card">
                <h3>Visa sponsorship</h3>
                <p>We support combined residence and work permits (GVVA) and coordinate with the IND so your employees can work legally in the Spain.</p>
              </div>
              <div className="imm-card">
                <h3>Highly Skilled Migrant (HSM) program</h3>
                <p>Fast-track permits and reduced salary thresholds for qualified professionals. We handle sponsorship and paperwork as your Spain EOR.</p>
              </div>
              <div className="imm-card">
                <h3>Relocation support</h3>
                <p>From registration to BSN and first payroll: we guide your new hires through the Spain (Local) system so they can start quickly.</p>
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

      {/* 8. How Our Spain EOR Process Works */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-left" className="section process-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">How Our Spain EOR Process Works (2–3 Days)</h2>
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

      {/* 9. Spain Payroll: What We Handle */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-up" className="section payroll-handles-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Spain Payroll: What We Handle</h2>
              <p className="section-desc left-align">
                Full payroll and tax compliance so you don't have to manage Spain (Local) regulations.
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
                Manage your Spain team from one place.
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
                We keep your Spain hiring legally sound and audit-ready.
              </p>
            </div>
            <div className="compliance-grid">
              {[
                { title: 'Legal compliance', desc: 'Spain (Local) employment law, CAO, UWV, and tax office requirements.' },
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

      {/* 12. Spain EOR Success Stories */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-left" className="section success-stories-section">
          <div className="container">
            <div className="section-header center-align">
              <h2 className="section-title center-align">Spain EOR Success Stories</h2>
              <p className="section-desc center-align">
                Real results from companies using our Employer of Record in the Spain.
              </p>
            </div>
            <div className="success-grid">
              {spainEorCaseStudies.map((c, index) => (
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

      {/* 13. EOR vs Entity Setup in Spain */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-up" className="section entity-vs-eor-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">EOR vs Entity Setup in the Spain</h2>
              <p className="section-desc left-align">
                Decide whether Spain EOR or a Spain (Local) BV is right for you.
              </p>
            </div>
            <div className="table-wrapper">
              <table className="comparison-table small-table">
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th className="text-primary">Spain EOR</th>
                    <th className="text-gray">Spain (Local) entity (BV)</th>
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
                Whether you're a startup or enterprise, Spain EOR fits your use case.
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

      {/* 15. Contractor Management in Spain */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-right" className="section contractor-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Contractor Management in the Spain</h2>
              <p className="section-desc left-align">
                Avoid misclassification and stay compliant when engaging Spain (Local) contractors.
              </p>
            </div>
            <div className="contractor-box">
              <p className="contractor-intro">
                Spain (Local) rules on self-employed vs employed are strict. Misclassifying workers can lead to back taxes, penalties, and reclassification. We help you:
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
                  Convert contractors to employees via Spain EOR when a permanent role makes more sense.
                </li>
              </ul>
              <div className="learn-more-link">
                <Link href="/spain-contractor">
                  Spain contractor solutions <ArrowRight className="arrow-icon" />
                </Link>
              </div>
            </div>
          </div>
        </SlideIn>
      </div>

      {/* Comprehensive Guide to Hiring in the Spain (tabs) */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="fade-left" className="section guide-section eor-section-bg">
          <div className="container">
            <h2 className="section-title left-align">
              Our comprehensive guide to hiring in the Spain
            </h2>
            <p className="section-desc left-align">
              Explore leave, termination, public holidays, onboarding, and immigration. Everything you need for Spain (Local) employment laws 2026 and Spain payroll outsourcing.
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
                    <p>In the Spain, employees are entitled to a minimum of 20 days (4 weeks) of paid annual leave per year based on full-time employment. Many employers offer 25 days or more. Unused vacation days can usually be carried forward but must be used within six months after the end of the calendar year. Our Spain EOR ensures your team receives full statutory and contractual leave under Spain (Local) employment laws 2026.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Maternity leave</h3>
                    <p>Expecting mothers are entitled to 16 weeks of maternity leave (6 weeks before and 10 weeks after the due date). Salary is paid at 100% by the Spain (Local) Employee Insurance Agency (UWV). Additional unpaid parental leave is available. We handle all administration and compliance for your Spain (Local) employees.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Paternity and partner leave</h3>
                    <p>Partners receive one week of paid birth leave at 100% salary within four weeks of birth, plus five weeks of additional birth leave (paid at 70% by UWV) within six months. Parental leave of 26 times weekly hours per child (until the child turns 8) is also available first 9 weeks paid at 70%, remainder unpaid.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Sick leave</h3>
                    <p>Employers must continue to pay sick employees for up to 2 years (minimum 70% of salary, often 100% in year one and 70% in year two as per contract). Spain payroll outsourcing through Jackson & Frank includes correct sick pay and UWV reporting.</p>
                  </div>
                </div>
              )}

              {activeTab === 'termination' && (
                <div className="tab-pane">
                  <div className="tab-section">
                    <h3>Termination requirements</h3>
                    <p>In the Spain, termination is highly regulated. Employers can terminate via mutual consent, through the UWV (Employee Insurance Agency), or through the courts. Unilateral termination without proper procedure is not permitted. Valid grounds include business economic reasons, long-term illness, frequent absenteeism, underperformance, misconduct, or a disturbed employment relationship.</p>
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
                    <p>Required for employees with at least 24 months of service. Calculated as 1/3 of a month's salary per year for the first 10 years and 1/2 month per year thereafter, capped at €89,000 or one year's salary (whichever is higher). As your Employer of Record Spain, we handle all termination and transition payments in line with Spain (Local) employment laws 2026.</p>
                  </div>
                </div>
              )}

              {activeTab === 'holidays' && (
                <div className="tab-pane">
                  <h3>Public holidays in the Spain 2026</h3>
                  <p className="mb-4">Below are the main national public holidays. Employers are not always required to give paid time off for every holiday it depends on the sector and collective agreement (CAO). Our Spain EOR team applies the correct rules for your employees.</p>
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
                    <p>With Jackson & Frank Spain EOR, onboarding typically takes 2–3 business days. We handle registration with the Spain (Local) tax authority, BSN for foreign workers, and payroll setup. No Spain (Local) entity required you send employee details and signed agreements; we issue the Spain (Local) contract and get them live on Spain payroll.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Salary and holiday allowance</h3>
                    <p>Employers must pay at least the statutory minimum wage and an 8% holiday allowance (typically paid in May). Salaries are usually paid monthly with detailed payslips. Spain payroll outsourcing through us includes all withholdings, social security, and filings.</p>
                  </div>
                  <div className="tab-section">
                    <h3>Employment contract</h3>
                    <p>Spain (Local) contracts must be in writing and include:</p>
                    <ul>
                      <li>Names and addresses of both parties</li>
                      <li>Start date and place of work</li>
                      <li>Job description, salary, and working hours</li>
                      <li>Leave entitlements and notice periods</li>
                    </ul>
                  </div>
                  <div className="tab-section">
                    <h3>Probation period</h3>
                    <p>Maximum 1 month for contracts under 2 years; 2 months for contracts of 2+ years or permanent. During probation, either party can terminate without notice. We draft compliant contracts as part of our Employer of Record Spain service.</p>
                  </div>
                </div>
              )}

              {activeTab === 'additional' && (
                <div className="tab-pane">
                  <h3>Spain (Local) work permits and visas</h3>
                  <p className="mb-3">Non-EU/EEA nationals need a combined residence and work permit (GVVA) or qualify under the Highly Skilled Migrant (HSM) program. Jackson & Frank supports visa sponsorship and relocation: we coordinate with the IND (Immigration and Naturalisation Service), handle sponsorship as your Spain EOR, and guide employees through BSN registration and first payroll.</p>
                  <p>Our in-house team manages the full visa and permit process so you can hire employees in the Spain without entity and without worrying about immigration compliance. Ideal for tech, finance, and scaleups bringing international talent to Amsterdam, Rotterdam, or elsewhere in the Spain.</p>
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
            <Link href="/spain-contractor" className="btn-primary btn-large">
              Learn more about Spain contractor solutions
              <ArrowRight className="arrow-icon" />
            </Link>
          </div>
        </SlideIn>
      </div>

      {/* 16. Spain Employment Statistics 2026 */}
      <div className="home-content-scale">
        <SlideIn as="section" direction="zoom-in" className="section stats-section eor-section-bg">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title left-align">Spain Employment Statistics 2026</h2>
              <p className="section-desc left-align">
                Hiring trends, salary benchmarks, and market insights for planning your Spain (Local) team.
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
              Spain (Local) labor market remains competitive for tech, finance, and logistics. Spain EOR helps you access talent quickly while staying compliant with Spain (Local) employment laws 2026 and payroll obligations.
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
            contactLinkText="Contact our Spain EOR experts"
            contactHref="/contact?reason=eor_services"
            faqPageHref="/faq"
            faqPageLabel="Browse all FAQs"
          />
        </div>
      </div>
    </div>
  )
}
