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
import uaeContractorData from '@/data/uae-contractor.json'
import '../countries.css'

const data = uaeContractorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'UAE work-authorisation aware', icon: Scale },
  { label: 'Freelance & B2B support', icon: Zap },
  { label: 'Misclassification checks', icon: Shield },
]

const contractorBenefits = [
  'Structure engagements around valid freelance permits or licences',
  'Reduce illegal work and falso autónomo-style exposure',
  'AED invoicing and payment workflows',
  'Move to UAE EOR when employment is the right model',
]

const contractorServices = [
  { title: 'Contractor onboarding', desc: 'KYC, trade licence or freelance permit checks, and service agreements for Dubai / UAE work.', icon: Users },
  { title: 'Classification support', desc: 'Assess supervision, exclusivity, and tools access that imply employment vs genuine services.', icon: Scale },
  { title: 'Contract management', desc: 'MSAs and SOWs aligned with UAE practice; optional Arabic/English bilingual drafts via counsel.', icon: FileText },
  { title: 'Payments', desc: 'Invoice approval and AED transfers with withholding documentation where applicable.', icon: FileCheck },
  { title: 'Compliance monitoring', desc: 'Watch for visa expiry, permit scope, and evolving MOHRE / free zone guidance.', icon: Shield },
  { title: 'EOR conversion', desc: 'Switch to employment visa, medical insurance, and WPS payroll through our UAE EOR.', icon: Briefcase },
]

const contractorPros = [
  'Pilot UAE demand before you incorporate.',
  'Engage specialists who already hold UAE freelance or company licences.',
  'Single workflow for invoices, approvals, and vendor records.',
  'Practical advice on mainland vs free zone freelance options.',
  'Less guesswork on whether someone can legally bill from the UAE.',
  'Seamless upgrade path to full EOR employment.',
]

const contractorCons = [
  'Visitors cannot replace work visas permits still matter.',
  'Long-term exclusive roles often belong on employment, not invoices.',
  'Free zone freelance packages have activity and quota limits.',
]

const compliancePoints = [
  {
    title: 'Work authorisation',
    desc: 'Performing work in the UAE generally requires a visa or permit that matches the activity not a tourist entry.',
  },
  {
    title: 'Dependent contractors',
    desc: 'If someone works full-time on your systems with your tools and reports only to you, authorities may treat them as employees.',
  },
  {
    title: 'WPS mismatch',
    desc: 'Paying “salary-like” amounts to personal accounts without employment can still attract scrutiny structure deliberately.',
  },
]

export default function UAEContractorPage() {
  return (
    <>
      {/* Hero */}
      <SlideIn as="section" direction="fade-up" className="hero-section">
        <div className="hero-bg-wrapper">
          <Image
            src="/countries/eor-uae.webp"
            alt="UAE Contractor Employer of Record"
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
                Hire in <span>UAE</span>
              </h1>
            </div>

            <p className="hero-subtitle">
              Hire contractors in UAE without opening an entity.
            </p>
            <p className="hero-desc">
              Employer of Record UAE: compliant payroll, local contracts, fast payments. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="center-btn-wrapper">
              <Link className="btn-outline"
                href="/contact?reason=contractor_management"
              >
                Hire in UAE
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
            title="What is Contractor Management in the UAE?"
            description="Contractor management helps you engage freelancers and independent contractors compliantly under UAE (Local) law without the complexity of setting up an entity or risking misclassification."
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
                  Companies hiring freelancers, consultants, or project-based contractors in the UAE without a local entity. Ideal for tech, consulting, and creative industries.
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
            <Link href="/uae" >
              Need to hire employees instead? See UAE EOR <ArrowRight className="arrow-icon" />
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
              Mastering Contractor Classification for Business Expansion in the UAE
            </h2>

            <div className="text-content">
              <p className="section-desc left-align">
                Unleash your business potential in the UAE with strategic hiring. Learn the intricacies of classifying independent contractors to sidestep fines and penalties.
              </p>
              <p className="section-desc left-align">
                Jackson and Frank provide expert guidance tailored to the UAE (Local) classification landscape, ensuring compliance and success in this dynamic market.
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
                alt="Seamless Contractor Onboarding in the UAE"
                title="Seamless Contractor Onboarding"
                fill
                className="img-cover"
              />
            </div>
            <div className="text-wrapper order-mobile-1">
              <h2 className="section-title left-align">
                Seamless Contractor Onboarding in the UAE with Jackson and Frank
              </h2>
              <p className="section-desc left-align">
                Simplify the onboarding of independent contractors in the UAE using your Jackson and Frank account. Achieve compliance with local regulations in minutes.
              </p>
              <p className="section-desc left-align">
                Our platform handles everything, from personalized contracts to effortless tax document collection, extending to streamlined international payroll. Make contractor onboarding a breeze for success in the UAE (Local) market with Jackson and Frank.
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
                Upholding Compliance with the UAE&apos; Premier Legal Firms at Jackson and Frank
              </h2>
              <p className="section-desc left-align">
                Trust Jackson and Frank in the UAE to ensure compliance with the expertise of the country&apos;s top legal firms. Our contracts undergo meticulous review, aligning with local laws, covering essentials such as minimum wage, national holidays, and termination conditions.
              </p>
              <p className="section-desc left-align">
                Stay confident with accurate and up-to-date information for seamless operations in the UAE (Local) business landscape.
              </p>
            </div>
            <div className="image-wrapper">
              <Image
                src="/countries/contractors/ensuringcomplilance.webp"
                alt="Legal Compliance in UAE"
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
                alt="Payroll Funding in UAE"
                title="Payroll Funding"
                fill
                className="img-cover"
              />
            </div>
            <div className="text-wrapper order-mobile-1">
              <h2 className="section-title left-align">
                Streamlined Payroll Funding in the UAE - One Click Away with Jackson and Frank
              </h2>
              <p className="section-desc left-align">
                Simplify your payroll process in the UAE with Jackson and Frank. Effortlessly initiate mass payouts in various currencies using your preferred payment method.
              </p>
              <p className="section-desc left-align">
                Team members can conveniently withdraw funds with their chosen payment methods, saving on currency conversions and wire transfer fees. Experience a seamless financial transaction solution tailored for success in the UAE (Local) market.
              </p>
            </div>
          </div>
        </div>
      </SlideIn>
</div>

      {/* Why UAE contractor management */}
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
              Why use contractor management in the UAE?
            </h2>
            <div className="text-content">
              <p className="section-desc left-align">
                The UAE has strict rules on contractor classification. The UAE (Local) tax authority (Belastingdienst) actively enforces rules against &quot;schijnzelfstandigheid&quot; (false self-employment). Misclassifying an employee as a contractor can lead to back taxes, social security liabilities, and penalties.
              </p>
              <p className="section-desc left-align">
                Using a contractor management solution like Jackson & Frank helps you engage contractors compliantly: we assess classification, provide UAE (Local)-law contracts (including modelovereenkomsten), handle payroll and invoicing, and monitor ongoing compliance. If a role becomes permanent, we can convert contractors to employees via our UAE EOR.
              </p>
              <p className="section-desc left-align">
                This protects your business, keeps contractors happy with proper agreements and timely payments, and gives you flexibility to scale your UAE (Local) workforce without setting up a local entity.
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
            title="Our UAE Contractor Services"
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
            title="Pros and considerations of UAE contractor management"
            description="Weigh the benefits and considerations before engaging contractors in the UAE."
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
            title="UAE (Local) Contractor Compliance"
            description="Staying compliant with UAE (Local) contractor law protects your business from penalties and ensures genuine contractor relationships."
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
            <p className="section-desc center-align">Need to hire full employees in the UAE?</p>
            
              <Link href="/uae" className="btn-primary">Learn more about UAE EOR <ArrowRight className="arrow-icon" /></Link>
              
            
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
        contactLinkText="Contact our UAE contractor experts"
        contactHref="/contact?reason=contractor_management"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />


    </>
  )
}
