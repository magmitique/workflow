import { z } from 'zod';
import { contentStatusSchema } from './article.js';

export const caseStudyResultSchema = z.object({
  metric: z.string().min(1),
  before: z.string().min(1),
  after: z.string().min(1),
});

export const caseStudyResultOutputSchema = caseStudyResultSchema.extend({
  id: z.string(),
  caseStudyId: z.string(),
});

export const caseStudyCreateSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  clientName: z.string().min(1).max(200),
  clientAnonymous: z.boolean().default(false),
  sector: z.string().max(100).optional(),
  techStack: z.array(z.string()).optional(),
  context: z.string().max(5000).optional(),
  challenge: z.string().max(5000).optional(),
  solution: z.string().max(5000).optional(),
  testimonialQuote: z.string().max(2000).optional(),
  testimonialAuthor: z.string().max(200).optional(),
  testimonialRole: z.string().max(200).optional(),
  coverImage: z.string().min(1).optional(),
  architectureDiagram: z.string().min(1).optional(),
  featured: z.boolean().default(false),
  status: contentStatusSchema.default('DRAFT'),
  results: z.array(caseStudyResultSchema).optional(),
});

export const caseStudyUpdateSchema = caseStudyCreateSchema
  .extend({
    coverImage: z.string().optional(),
    architectureDiagram: z.string().optional(),
  })
  .partial();

export const caseStudySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  clientName: z.string(),
  clientAnonymous: z.boolean(),
  sector: z.string().nullable(),
  techStack: z.unknown().nullable(),
  context: z.string().nullable(),
  challenge: z.string().nullable(),
  solution: z.string().nullable(),
  testimonialQuote: z.string().nullable(),
  testimonialAuthor: z.string().nullable(),
  testimonialRole: z.string().nullable(),
  coverImage: z.string().nullable(),
  architectureDiagram: z.string().nullable(),
  featured: z.boolean(),
  status: contentStatusSchema,
  deletedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const caseStudyListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: contentStatusSchema.optional(),
  sector: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  deleted: z.coerce.boolean().optional(),
  sortBy: z.enum(['createdAt', 'title']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
