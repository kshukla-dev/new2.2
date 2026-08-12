import { z } from 'zod'

// Newsletter subscription validation
export const newsletterSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// Contact form validation — mirrors the fields collected by the contact
// forms (ContactPage / DelayedContactPopup / LeadModal) before they are
// mapped to the snake_case API payload in submitContactForm().
export const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().default(''),
  company: z.string().optional().default(''),
  reason: z.string().min(1, 'Please select a reason'),
  message: z.string().min(1, 'Message is required'),
})

export type ContactData = z.infer<typeof contactSchema>
