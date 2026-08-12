import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = genMeta({
  title: 'Hire Non-EU Employees in the Netherlands | Jackson & Frank',
  description: 'Jackson & Frank is an IND approved immigration sponsor in the Netherlands. We handle the Skilled Worker Visa, payroll, and compliance — you don\'t need a Dutch entity.',
  path: '/hire-non-eu-employees-netherlands',
})

// FAQ schema — mirrors every question shown on the page (body FAQs + all tabs)
const faqItems = [
  {
    question: 'Can I hire someone in the Netherlands without opening a Dutch company?',
    answer: 'Yes. Jackson & Frank acts as the legal employer in the Netherlands. You don\'t need a Dutch legal entity (BV) or any local presence. We issue the employment contract, run payroll, and manage immigration compliance under our own entity. Your candidate is legally employed from day one.'
  },
  {
    question: 'Can an Employer of Record sponsor a Skilled Worker Visa in the Netherlands?',
    answer: 'Yes, but only if the Employer of Record holds approved immigration sponsor status (IND Recognised Sponsor). Not all EOR providers do. Jackson & Frank does. Without this status, an EOR cannot submit a fast-track Skilled Worker Visa application. This is worth confirming with any provider before you commit.'
  },
  {
    question: 'Do I need to become an approved immigration sponsor myself?',
    answer: 'No. Approved sponsor status (Erkend Referent) is held by Jackson & Frank. Your hire\'s visa application is submitted through us. You bypass a 12 to 24 month process and thousands in government fees. We already have the status. Your hire benefits from it immediately.'
  },
  {
    question: 'Can I hire a non-EU candidate who is already living in the Netherlands?',
    answer: 'Yes, and the process is often faster. If your candidate already holds a valid Dutch residence permit, from a previous employer, an orientation year visa (Zoekjaar), or a partner\'s permit, the route to starting work is typically shorter. We assess their current status during the eligibility check.'
  },
  {
    question: 'What is the difference between the Skilled Worker Visa and the EU Blue Card in the Netherlands?',
    answer: 'Both allow non-EU professionals to work in the Netherlands. The Skilled Worker Visa (Kennismigrant) is generally faster, has a lower salary threshold, and requires fewer documents. The EU Blue Card requires a recognised university degree and has a higher salary threshold, but gives broader EU mobility rights after 18 months. For most companies hiring specialist talent, the Skilled Worker Visa is the more practical route. We\'ll advise which applies once we\'ve reviewed the role and candidate profile.'
  },
  {
    question: 'What are the salary requirements for the Skilled Worker Visa in the Netherlands in 2026?',
    answer: 'The 2026 gross monthly salary thresholds are: €5,942/month for employees aged 30 and over; €4,357/month for employees under 30; and €3,122/month for recent graduates (reduced criterion). Figures exclude the 8% Dutch holiday allowance (vakantiegeld) and are updated each January. We confirm the applicable threshold during the eligibility assessment.'
  },
  {
    question: 'What nationalities need an Entry Visa (MVV) before coming to the Netherlands?',
    answer: 'Nationals from most non-EU countries need an MVV (Machtiging tot Voorlopig Verblijf), a preliminary entry visa, before travelling to the Netherlands. Common exceptions include the US, Canada, Australia, Japan, South Korea, and the UK. We confirm MVV requirement at the eligibility check stage and manage the full application.'
  },
  {
    question: 'How long does the Skilled Worker Visa (Kennismigrant) take in the Netherlands?',
    answer: 'As an approved sponsor we submit directly to the IND. Standard processing is approximately two weeks from submission. If your candidate requires an MVV, allow an additional 3 to 8 weeks for the embassy process. We give you a realistic timeline once we know your candidate\'s nationality. We don\'t overpromise.'
  },
  {
    question: 'What happens to the visa if our hire changes roles or salary?',
    answer: 'Any change to employment terms (role title, salary, or working hours) must be reported to the IND within four weeks. Jackson & Frank manages this reporting. You notify us of the change; we handle the submission. You don\'t interact with the IND directly at any point.'
  },
  {
    question: 'What does Jackson & Frank handle versus what we handle?',
    answer: 'Jackson & Frank handles: employment contract and legal employer status; Skilled Worker Visa application and IND submissions; Dutch payroll and statutory employer obligations; 30% ruling administration (if applicable); and ongoing IND compliance reporting and visa renewals. You handle: day-to-day work direction and performance management; and role and project decisions.'
  },
  {
    question: 'Can you handle the 30% ruling for our hire?',
    answer: 'Yes. The 30% ruling (30%-regeling) allows qualifying international employees to receive up to 30% of gross salary tax-free as compensation for relocation costs. If your hire qualifies, we administer the ruling through payroll and handle the joint application to the Dutch Tax Authority (Belastingdienst). We assess eligibility during onboarding and flag it proactively. It\'s often a material factor in offer negotiations.'
  },
  {
    question: 'What is the Dutch Immigration Authority (IND)?',
    answer: 'The IND (Immigratie- en Naturalisatiedienst) is the Dutch government body that processes all residence and work permit applications in the Netherlands. Approved sponsors like Jackson & Frank have direct access to the IND\'s Business Portal, allowing us to submit applications and receive decisions significantly faster than companies without this status.'
  },
  {
    question: 'What is an approved immigration sponsor (Erkend Referent)?',
    answer: 'An approved immigration sponsor (Erkend Referent) is a company vetted and authorised by the IND to submit visa applications on behalf of non-EU employees. The IND assesses the company\'s legal structure, financial standing, and compliance history. Only approved sponsors access the fast-track process that reduces processing to approximately two weeks. Obtaining this status independently takes 12 to 24 months and €2,000 to €5,000 in government fees.'
  }
]

const pageSchema = buildPageSchemaGraph([
  ...buildWebPageSchema({
    path: '/hire-non-eu-employees-netherlands',
    name: 'Hire Non-EU Employees in the Netherlands | Jackson & Frank',
    description: 'Jackson & Frank is an IND approved immigration sponsor in the Netherlands. We handle the Skilled Worker Visa, payroll, and compliance — you don\'t need a Dutch entity.',
    pageNameForBreadcrumb: 'Hire Non-EU employees',
  }),
  ...buildFaqSchema({
    path: '/hire-non-eu-employees-netherlands',
    faq: faqItems,
  }),
])

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={pageSchema} />
      {children}
    </>
  )
}
