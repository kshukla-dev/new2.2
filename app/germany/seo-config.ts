import { buildPageSchemaGraph, buildServiceSchema, buildFaqSchema } from '@/lib/schema'

export const faqItems = [
  {
    question: 'Do you operate through your own German entity?',
    answer: 'Yes. We employ your staff through Jackson & Frank\'s registered GmbH in Germany - not through a partner network or aggregated platform. You deal with one employer of record, and they are us.'
  },
  {
    question: 'What is the AÜG and does it limit how long I can use an EOR in Germany?',
    answer: 'The AÜG is Germany\'s employee-leasing law. We are AÜG-licensed and ensure all hires are fully compliant with German regulations. Please contact us to discuss your specific hiring timeline.'
  },
  {
    question: 'How does dismissal work for employees I hire through J&F?',
    answer: 'Under German law, dismissal protection (Kündigungsschutzgesetz) applies after 6 months of employment if the employer has more than 10 employees. We advise you on the legal steps, manage notice periods (which range from 4 weeks to 7 months based on tenure), and draft mutual termination agreements to protect your business from legal disputes.'
  },
  {
    question: 'What about works councils (Betriebsrat)?',
    answer: 'A works council can be formed in any German operation with 5 or more employees. We advise on works council consultation requirements, ensure compliant operations, and guide you through required communication protocols to prevent local operational friction.'
  },
  {
    question: 'How quickly can you onboard a German employee?',
    answer: 'If the candidate is an EU citizen, onboarding takes 2–3 business days. We draft a German-compliant contract, register them with social security and health insurance (Krankenkasse), and set them up on payroll. For non-EU nationals requiring visa sponsorship, processing timelines depend on the Ausländerbehörde but are fast-tracked under our guidance.'
  }
]

export function getGermanySchema(path: string, title: string, description: string) {
  const serviceSchema = buildServiceSchema({
    path,
    name: title,
    description,
    serviceType: 'Employer of Record',
    pageNameForBreadcrumb: 'Germany',
    hasFaq: true,
  })

  const faqSchema = buildFaqSchema({
    path,
    faq: faqItems,
  })

  return buildPageSchemaGraph([
    ...serviceSchema,
    ...faqSchema,
  ])
}
