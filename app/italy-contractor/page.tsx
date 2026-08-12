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
import italyContractorData from '@/data/italy-contractor.json'
import { BaseSchema } from '@/components/seo/BaseSchema'
import '../countries.css'

const data = italyContractorData as {
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const trustBadges = [
  { label: 'Italian compliant contracts', icon: Scale },
  { label: 'Fast onboarding', icon: Zap },
  { label: 'Classification support', icon: Shield },
]

const contractorBenefits = [
  'Compliant contractor agreements under Italian law',
  'Avoid misclassification risk (false self-employment)',
  'Payroll and invoicing handled in one platform',
  'Convert contractors to employees via EOR when needed',
]

const contractorServices = [
  { title: 'Contractor onboarding', desc: 'Fast, compliant onboarding with Italian-law contracts and tax document collection (Codice Fiscale, VAT/IVA registration).', icon: Users },
  { title: 'Classification support', desc: 'Assess contractor vs employee status to avoid false self-employment and INPS reclassification risks.', icon: Scale },
  { title: 'Contract management', desc: 'Agreements reviewed by Italian legal experts, updated for local regulations and collective agreements (CCNL).', icon: FileText },
  { title: 'Payroll & invoicing', desc: 'Pay contractors in EUR, handle invoices and tax/social security documentation (VAT/IVA, INPS if applicable).', icon: FileCheck },
  { title: 'Compliance monitoring', desc: 'Ongoing checks to ensure contractors remain compliant with Italian rules and CCNL requirements.', icon: Shield },
  { title: 'EOR conversion', desc: 'Convert contractors to full employees via our Italy EOR when roles become permanent.', icon: Briefcase },
]

const contractorPros = [
  'No Italian entity (S.r.l./S.p.A.) required engage contractors compliantly.',
  'Fast onboarding: contracts and tax forms handled in days, not weeks.',
  'Reduce misclassification risk with expert classification assessment.',
  'Single platform for contractor payments, invoicing, and compliance.',
  'Seamless conversion to EOR if you need to hire contractors as employees.',
  'Local Italian expertise contracts aligned with CCNL and employment law.',
]

const contractorCons = [
  'Contractor relationships have limits some roles require full employment.',
  'Italian authorities enforce strict classification rules; we help you stay compliant.',
  'If converting to EOR, additional onboarding steps and costs apply.',
]

const compliancePoints = [
  {
    title: 'Avoid false self-employment',
    desc: 'Italian law is strict on contractor classification. We assess each engagement to ensure genuine contractor status and avoid INPS reclassification and back contributions.',
  },
  {
    title: 'Collective agreement (CCNL) awareness',
    desc: 'Sector rules can affect how contractors are treated. We help you stay on the right side of Italian labour law and CCNL requirements.',
  },
  {
    title: 'Ongoing compliance',
    desc: 'Regulations change. We monitor Italian contractor and employment law and update contracts as needed to maintain compliance.',
  },
]

export default function ItalyContractorPage() {
  return (
    <>
      <BaseSchema />
      {/* Hero */}
      <SlideIn as="section" direction="fade-up" className="hero-section">
        <div className="hero-bg-wrapper">
          <Image
            src="/countries/eor-italy.webp"
            alt="Italy Contractor Employer of Record"
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
                Hire in <span>Italy</span>
              </h1>
            </div>

            <p className="hero-subtitle">
              Hire contractors in Italy without opening an entity.
            </p>
            <p className="hero-desc">
              Employer of Record Italy: compliant payroll, local contracts, fast payments. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="center-btn-wrapper">
              <Link className="btn-outline"
                href="/contact?reason=contractor_management"
              >
                Hire in Italy
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
            title="What is Contractor Management in the Italy?"
            description="Contractor management helps you engage freelancers and independent contractors compliantly under Italy (Local) law without the complexity of setting up an entity or risking misclassification."
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
                  Companies hiring freelancers, consultants, or project-based contractors in the Italy without a local entity. Ideal for tech, consulting, and creative industries.
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
            <Link href="/italy" >
              Need to hire employees instead? See Italy EOR <ArrowRight className="arrow-icon" />
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
              Mastering Contractor Classification for Business Expansion in the Italy
            </h2>

            <div className="text-content">
              <p className="section-desc left-align">
                Unleash your business potential in the Italy with strategic hiring. Learn the intricacies of classifying independent contractors to sidestep fines and penalties.
              </p>
              <p className="section-desc left-align">
                Jackson and Frank provide expert guidance tailored to the Italy (Local) classification landscape, ensuring compliance and success in this dynamic market.
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
                alt="Seamless Contractor Onboarding in the Italy"
                title="Seamless Contractor Onboarding"
                fill
                className="img-cover"
              />
            </div>
            <div className="text-wrapper order-mobile-1">
              <h2 className="section-title left-align">
                Seamless Contractor Onboarding in the Italy with Jackson and Frank
              </h2>
              <p className="section-desc left-align">
                Simplify the onboarding of independent contractors in the Italy using your Jackson and Frank account. Achieve compliance with local regulations in minutes.
              </p>
              <p className="section-desc left-align">
                Our platform handles everything, from personalized contracts to effortless tax document collection, extending to streamlined international payroll. Make contractor onboarding a breeze for success in the Italy (Local) market with Jackson and Frank.
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
                Upholding Compliance with the Italy&apos; Premier Legal Firms at Jackson and Frank
              </h2>
              <p className="section-desc left-align">
                Trust Jackson and Frank in the Italy to ensure compliance with the expertise of the country&apos;s top legal firms. Our contracts undergo meticulous review, aligning with local laws, covering essentials such as minimum wage, national holidays, and termination conditions.
              </p>
              <p className="section-desc left-align">
                Stay confident with accurate and up-to-date information for seamless operations in the Italy (Local) business landscape.
              </p>
            </div>
            <div className="image-wrapper">
              <Image
                src="/countries/contractors/ensuringcomplilance.webp"
                alt="Legal Compliance in Italy"
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
                alt="Payroll Funding in Italy"
                title="Payroll Funding"
                fill
                className="img-cover"
              />
            </div>
            <div className="text-wrapper order-mobile-1">
              <h2 className="section-title left-align">
                Streamlined Payroll Funding in the Italy - One Click Away with Jackson and Frank
              </h2>
              <p className="section-desc left-align">
                Simplify your payroll process in the Italy with Jackson and Frank. Effortlessly initiate mass payouts in various currencies using your preferred payment method.
              </p>
              <p className="section-desc left-align">
                Team members can conveniently withdraw funds with their chosen payment methods, saving on currency conversions and wire transfer fees. Experience a seamless financial transaction solution tailored for success in the Italy (Local) market.
              </p>
            </div>
          </div>
        </div>
      </SlideIn>
</div>

      {/* Why Italy contractor management */}
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
              Why use contractor management in the Italy?
            </h2>
            <div className="text-content">
              <p className="section-desc left-align">
                The Italy has strict rules on contractor classification. The Italy (Local) tax authority (Belastingdienst) actively enforces rules against &quot;schijnzelfstandigheid&quot; (false self-employment). Misclassifying an employee as a contractor can lead to back taxes, social security liabilities, and penalties.
              </p>
              <p className="section-desc left-align">
                Using a contractor management solution like Jackson & Frank helps you engage contractors compliantly: we assess classification, provide Italy (Local)-law contracts (including modelovereenkomsten), handle payroll and invoicing, and monitor ongoing compliance. If a role becomes permanent, we can convert contractors to employees via our Italy EOR.
              </p>
              <p className="section-desc left-align">
                This protects your business, keeps contractors happy with proper agreements and timely payments, and gives you flexibility to scale your Italy (Local) workforce without setting up a local entity.
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
            title="Our Italy Contractor Services"
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
            title="Pros and considerations of Italy contractor management"
            description="Weigh the benefits and considerations before engaging contractors in the Italy."
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
            title="Italy (Local) Contractor Compliance"
            description="Staying compliant with Italy (Local) contractor law protects your business from penalties and ensures genuine contractor relationships."
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
            <p className="section-desc center-align">Need to hire full employees in the Italy?</p>
            
              <Link href="/italy" className="btn-primary">Learn more about Italy EOR <ArrowRight className="arrow-icon" /></Link>
              
            
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
        contactLinkText="Contact our Italy contractor experts"
        contactHref="/contact?reason=contractor_management"
        faqPageHref="/faq"
        faqPageLabel="Browse all FAQs"
      />


    </>
  )
}
