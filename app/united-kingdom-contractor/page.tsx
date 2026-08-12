'use client'
import { SlideIn } from '@/components/animations/SlideIn';

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  MinusCircle,
  Scale,
  Shield,
  Users,
  Zap,
  FileText,
  Briefcase,
  AlertTriangle,
  FileCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import FAQSection from '@/components/templates/FAQSection'
import ukContractorData from '@/data/united-kingdom-contractor.json'
import '../countries.css'

const data = ukContractorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'IR35 / off-payroll aware', icon: Scale },
  { label: 'PSC & umbrella routes', icon: Zap },
  { label: 'HMRC-aligned processes', icon: Shield },
]

const contractorBenefits = [
  'Structured IR35 status documentation for medium/large clients',
  'PSC invoicing, umbrella coordination, or hybrid models',
  'CIS support where construction rules apply',
  'Convert to UK EOR when employment is clearer than contracting',
]

const contractorServices = [
  { title: 'Contractor onboarding', desc: 'KYC, PSC company checks, insurance certificates, and compliant MSAs.', icon: Users },
  { title: 'IR35 & SDS', desc: 'Help produce and retain Status Determination Statements where you are the deemed employer.', icon: Scale },
  { title: 'Contract management', desc: 'SOWs, rate cards, and change control aligned with UK market practice.', icon: FileText },
  { title: 'Payments', desc: 'Approve PSC invoices and payment runs in GBP with audit trail.', icon: FileCheck },
  { title: 'Compliance monitoring', desc: 'Watch for long engagements that drift inside IR35 or employment law.', icon: Shield },
  { title: 'EOR conversion', desc: 'Onboard as employees with PAYE, NI, and pension auto-enrolment.', icon: Briefcase },
]

const contractorPros = [
  'Access UK tech, finance, and consulting talent flexibly.',
  'Reduce HMRC reclassification risk with documented assessments.',
  'One workflow for finance and legal sign-off.',
  'Support for CIS deductions in construction supply chains.',
  'Clear handover to UK EOR when headcount should be payroll.',
  'Less admin than running your own PSC payment desk at scale.',
]

const contractorCons = [
  'IR35 can move tax/NIC liability to the fee payer plan determinations carefully.',
  'Small clients have different rules; one size does not fit all.',
  'Umbrella and agency chains add counterparty due diligence.',
]

const compliancePoints = [
  {
    title: 'Off-payroll (Chapter 10 ITEPA)',
    desc: 'Medium and large organisations must assess whether rules apply and operate PAYE if the engagement is deemed employment.',
  },
  {
    title: 'Agency rules',
    desc: 'Some agency workers are subject to PAYE regardless of PSC structure scope each supply chain.',
  },
  {
    title: 'Employment rights',
    desc: 'Contract labels do not defeat employment status claims in tribunals substance matters.',
  },
]

export default function UnitedKingdomContractorPage() {
  return (
    <>
      {/* Hero */}
      <SlideIn as="section" direction="fade-up" className="hero-section">
        <div className="hero-bg-wrapper">
          <Image
            src="/countries/eor-uk.webp"
            alt="United Kingdom Contractor Employer of Record"
            fill
            className="hero-bg-img"
            priority
            sizes="100vw"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="center-align">
            <div className="mb-6 sm:mb-8">
              <h1 className="hero-title">
                Hire in <span>United Kingdom</span>
              </h1>
            </div>

            <p className="hero-subtitle">
              Hire contractors in United Kingdom without opening an entity.
            </p>
            <p className="hero-desc">
              Employer of Record United Kingdom: compliant payroll, local contracts, fast payments. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="center-btn-wrapper">
              <Link className="btn-outline"
                href="/contact?reason=contractor_management"
              >
                Hire in United Kingdom
              </Link>
            </div>

            <div className="trust-badges">
              {trustBadges.map((b) => {
                const Icon = b.icon
                return (
                  <span
                    key={b.label}
                    className="badge"
                  >
                    <Icon className="badge-icon" />
                    {b.label}
                  </span>
                )
              }) || null}
            </div>
          </div>
        </div>


      </SlideIn>

      {/* What is Contractor Management */}
      <div className="home-content-scale">
<SlideIn as="section" direction="zoom-in" className="section">
        <div className="container">
          <SectionTitle
            title="What is Contractor Management in the United Kingdom?"
            description="Contractor management helps you engage freelancers and independent contractors compliantly under United Kingdom (Local) law without the complexity of setting up an entity or risking misclassification."
            align="left"
          />
          <div className="contractor-grid">
            <div className="contractor-card">
              <div className="contractor-card-accent" aria-hidden />
              <div className="contractor-card-content">
                <div className="contractor-card-header">
                  <div className="contractor-card-icon-wrapper">
                    <Users className="contractor-card-icon" />
                  </div>
                  <h3 className="contractor-card-title">Who needs it?</h3>
                </div>
                <p className="contractor-card-text">
                  Companies hiring freelancers, consultants, or project-based contractors in the United Kingdom without a local entity. Ideal for tech, consulting, and creative industries.
                </p>
              </div>
            </div>
            <div className="contractor-card">
              <div className="contractor-card-accent" aria-hidden />
              <div className="contractor-card-content">
                <div className="contractor-card-header">
                  <div className="contractor-card-icon-wrapper">
                    <CheckCircle2 className="contractor-card-icon" />
                  </div>
                  <h3 className="contractor-card-title">Benefits</h3>
                </div>
                <ul className="contractor-card-list">
                  {contractorBenefits.map((b) => (
                    <li key={b} className="contractor-card-list-item">
                      <CheckCircle2 className="contractor-card-list-icon" />
                      <span className="contractor-card-list-text">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="learn-more-link center-link mt-8">
            <Link href="/united-kingdom" >
              Need to hire employees instead? See United Kingdom EOR <ArrowRight className="arrow-icon" />
            </Link>
          </p>
        </div>
      </SlideIn>
</div>


      {/* Contractor Classification Section */}
      <div className="home-content-scale">
<SlideIn as="section" direction="fade-right" className="section eor-section-bg relative-overflow">



        <div className="container relative-z10">
          <div className="max-w-4xl">
            <div className="section-header">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Contractor Classification</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>

            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
              Mastering Contractor Classification for Business Expansion in the United Kingdom
            </h2>

            <div className="text-content">
              <p className="section-desc left-align">
                Unleash your business potential in the United Kingdom with strategic hiring. Learn the intricacies of classifying independent contractors to sidestep fines and penalties.
              </p>
              <p className="section-desc left-align">
                Jackson and Frank provide expert guidance tailored to the United Kingdom (Local) classification landscape, ensuring compliance and success in this dynamic market.
              </p>
            </div>
          </div>
        </div>
      </SlideIn>
</div>



      {/* Seamless Onboarding Section */}
      <div className="home-content-scale">
<SlideIn as="section" direction="fade-left" className="section eor-section-bg">
        <div className="container">
          <div className="two-col-grid">
            <div className="image-wrapper order-mobile-2">
              <Image
                src="/countries/contractors/effortlescontract.webp"
                alt="Seamless Contractor Onboarding in the United Kingdom"
                title="Seamless Contractor Onboarding"
                fill
                className="img-cover"
              />
            </div>
            <div className="text-wrapper order-mobile-1">
              <h2 className="section-title left-align">
                Seamless Contractor Onboarding in the United Kingdom with Jackson and Frank
              </h2>
              <p className="section-desc left-align">
                Simplify the onboarding of independent contractors in the United Kingdom using your Jackson and Frank account. Achieve compliance with local regulations in minutes.
              </p>
              <p className="section-desc left-align">
                Our platform handles everything, from personalized contracts to effortless tax document collection, extending to streamlined international payroll. Make contractor onboarding a breeze for success in the United Kingdom (Local) market with Jackson and Frank.
              </p>
            </div>
          </div>
        </div>
      </SlideIn>
</div>

      {/* Legal Compliance Section */}
      <div className="home-content-scale">
<SlideIn as="section" direction="fade-up" className="section">
        <div className="container">
          <div className="two-col-grid">
            <div>
              <h2 className="section-title left-align">
                Upholding Compliance with the United Kingdom&apos; Premier Legal Firms at Jackson and Frank
              </h2>
              <p className="section-desc left-align">
                Trust Jackson and Frank in the United Kingdom to ensure compliance with the expertise of the country&apos;s top legal firms. Our contracts undergo meticulous review, aligning with local laws, covering essentials such as minimum wage, national holidays, and termination conditions.
              </p>
              <p className="section-desc left-align">
                Stay confident with accurate and up-to-date information for seamless operations in the United Kingdom (Local) business landscape.
              </p>
            </div>
            <div className="image-wrapper">
              <Image
                src="/countries/contractors/ensuringcomplilance.webp"
                alt="Legal Compliance in United Kingdom"
                title="Legal Compliance"
                fill
                className="img-cover"
              />
            </div>
          </div>
        </div>
      </SlideIn>
</div>

      {/* Payroll Funding Section */}
      <div className="home-content-scale">
<SlideIn as="section" direction="zoom-in" className="section eor-section-bg">
        <div className="container">
          <div className="two-col-grid">
            <div className="image-wrapper order-mobile-2">
              <Image
                src="/countries/contractors/effortlesspayroll.webp"
                alt="Payroll Funding in United Kingdom"
                title="Payroll Funding"
                fill
                className="img-cover"
              />
            </div>
            <div className="text-wrapper order-mobile-1">
              <h2 className="section-title left-align">
                Streamlined Payroll Funding in the United Kingdom - One Click Away with Jackson and Frank
              </h2>
              <p className="section-desc left-align">
                Simplify your payroll process in the United Kingdom with Jackson and Frank. Effortlessly initiate mass payouts in various currencies using your preferred payment method.
              </p>
              <p className="section-desc left-align">
                Team members can conveniently withdraw funds with their chosen payment methods, saving on currency conversions and wire transfer fees. Experience a seamless financial transaction solution tailored for success in the United Kingdom (Local) market.
              </p>
            </div>
          </div>
        </div>
      </SlideIn>
</div>

      {/* Why United Kingdom contractor management */}
      <div className="home-content-scale">
<SlideIn as="section" direction="fade-right" className="section">
        <div className="container">
          <div className="max-w-4xl">
            <div className="section-header">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Why contractor management?</span>
              </div>
              <div className="w-12 h-0.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-full" />
            </div>
            <h2 className="section-title left-align">
              Why use contractor management in the United Kingdom?
            </h2>
            <div className="text-content">
              <p className="section-desc left-align">
                The United Kingdom has strict rules on contractor classification. The United Kingdom (Local) tax authority (Belastingdienst) actively enforces rules against &quot;schijnzelfstandigheid&quot; (false self-employment). Misclassifying an employee as a contractor can lead to back taxes, social security liabilities, and penalties.
              </p>
              <p className="section-desc left-align">
                Using a contractor management solution like Jackson & Frank helps you engage contractors compliantly: we assess classification, provide United Kingdom (Local)-law contracts (including modelovereenkomsten), handle payroll and invoicing, and monitor ongoing compliance. If a role becomes permanent, we can convert contractors to employees via our United Kingdom EOR.
              </p>
              <p className="section-desc left-align">
                This protects your business, keeps contractors happy with proper agreements and timely payments, and gives you flexibility to scale your United Kingdom (Local) workforce without setting up a local entity.
              </p>
            </div>
          </div>
        </div>
      </SlideIn>
</div>

      {/* Contractor Services */}
      <div className="home-content-scale">
<SlideIn as="section" direction="fade-left" className="section eor-section-bg">
        <div className="container">
          <SectionTitle
            title="Our United Kingdom Contractor Services"
            description="End-to-end contractor management so you can engage freelancers and independent contractors compliantly."
            align="center"
          />
          <div className="services-grid">
            {contractorServices.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="service-card">
                  <div className="service-card-icon-wrapper">
                    <Icon className="service-card-icon" />
                  </div>
                  <h3 className="service-card-title">{s.title}</h3>
                  <p className="service-card-desc">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </SlideIn>
</div>

      {/* Pros and Cons */}
      <div className="home-content-scale">
<SlideIn as="section" direction="fade-up" className="section">
        <div className="container">
          <SectionTitle
            title="Pros and considerations of United Kingdom contractor management"
            description="Weigh the benefits and considerations before engaging contractors in the United Kingdom."
            align="center"
          />
          <div className="pros-cons-grid">
            <div className="pros-cons-card">
              <h3 className="pros-cons-header">
                <CheckCircle2 className="pros-icon" />
                Pros
              </h3>
              <ul className="pros-cons-list">
                {contractorPros.map((item) => (
                  <li key={item} className="pros-cons-item">
                    <CheckCircle2 className="pros-check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pros-cons-card">
              <h3 className="pros-cons-header">
                <MinusCircle className="cons-icon" />
                Considerations
              </h3>
              <ul className="pros-cons-list">
                {contractorCons.map((item) => (
                  <li key={item} className="pros-cons-item">
                    <MinusCircle className="cons-check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SlideIn>
</div>

      {/* Compliance Section */}
      <div className="home-content-scale">
<SlideIn as="section" direction="zoom-in" className="section eor-section-bg">
        <div className="container">
          <SectionTitle
            title="United Kingdom (Local) Contractor Compliance"
            description="Staying compliant with United Kingdom (Local) contractor law protects your business from penalties and ensures genuine contractor relationships."
            align="center"
          />
          <div className="compliance-grid">
            {compliancePoints.map((item) => (
              <div key={item.title} className="compliance-card">
                <div className="compliance-icon">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="compliance-card-title">{item.title}</h3>
                <p className="compliance-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SlideIn>
</div>

      {/* Learn more – EOR */}
      <div className="home-content-scale">
<SlideIn as="section" direction="fade-right" className="section">
        <div className="container">
          <div className="center-btn-wrapper mt-8">
            <p className="section-desc center-align">Need to hire full employees in the United Kingdom?</p>

            <Link href="/united-kingdom" className="btn-primary">Learn more about United Kingdom EOR <ArrowRight className="arrow-icon" /></Link>


          </div>
        </div>
      </SlideIn>
</div>

      {/* FAQs */}
      <FAQSection
        id="faq"
        title={data.faqs.title}
        subtitle={data.faqs.subtitle}
        items={data.faqs.items}
        contactLinkText="Contact our United Kingdom contractor experts"
        contactHref="/contact?reason=contractor_management"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />


    </>
  )
}
