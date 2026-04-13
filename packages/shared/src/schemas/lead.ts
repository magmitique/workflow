import { z } from 'zod';

export const leadStatusSchema = z.enum(['NEW', 'CONTACTED', 'MEETING', 'PROPOSAL', 'WON', 'LOST']);

export const contactFormSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email(),
  phone: z
    .string()
    .max(20)
    .refine((v) => /^(?:(?:\+|00)33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(v), {
      message: 'Numéro de téléphone invalide',
    })
    .optional(),
  company: z.string().max(200).optional(),
  companySize: z.string().max(50).optional(),
  sector: z.string().max(100).optional(),
  needType: z.string().max(100).optional(),
  budgetRange: z.string().max(50).optional(),
  timeline: z.string().max(100).optional(),
  message: z.string().max(5000).optional(),
  source: z.string().max(100).optional(),
  pagesViewed: z.array(z.string()).optional(),
  timeOnSite: z.number().int().min(0).optional(),
  referrer: z.string().max(500).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
});

export const leadSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().email(),
  phone: z.string().nullable(),
  company: z.string().nullable(),
  companySize: z.string().nullable(),
  sector: z.string().nullable(),
  needType: z.string().nullable(),
  budgetRange: z.string().nullable(),
  timeline: z.string().nullable(),
  message: z.string().nullable(),
  source: z.string().nullable(),
  pagesViewed: z.unknown().nullable(),
  timeOnSite: z.number().nullable(),
  referrer: z.string().nullable(),
  utmSource: z.string().nullable(),
  utmMedium: z.string().nullable(),
  utmCampaign: z.string().nullable(),
  utmTerm: z.string().nullable(),
  utmContent: z.string().nullable(),
  status: leadStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const leadNoteCreateSchema = z.object({
  content: z.string().min(1).max(10000),
});

export const leadNoteSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  leadId: z.string().uuid(),
  authorId: z.string().uuid(),
  createdAt: z.coerce.date(),
});

export const leadUpdateStatusSchema = z.object({
  status: leadStatusSchema,
});

export const leadListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: leadStatusSchema.optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'email', 'status']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const leadReplySchema = z.object({
  subject: z.string().min(1).max(500),
  body: z.string().min(1).max(50000),
});
