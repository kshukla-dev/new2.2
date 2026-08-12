import { z } from 'zod'

export const contactFormSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: z.string()
    .trim()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: z.string()
    .trim()
    .min(1, 'Work email is required')
    .email('Please enter a valid email address'),
  phone: z.string()
    .trim()
    .min(1, 'Phone number is required')
    .refine((val) => {
      const phoneRegex = /^\+?[0-9\s\-()]{7,25}$/
      return phoneRegex.test(val)
    }, 'Please enter a valid phone number'),
  company: z.string()
    .trim()
    .max(100, 'Company name must not exceed 100 characters')
    .optional(),
  reason: z.string()
    .min(1, 'Please select a reason for contact')
    .refine((val) => val !== '', 'Please select a valid option'),
  message: z.string()
    .trim()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
  consent: z.boolean().refine(val => val === true, {
    message: 'Please tick the box above to agree before sending.'
  })
})

export type ContactFormData = z.infer<typeof contactFormSchema>
