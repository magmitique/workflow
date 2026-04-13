import { z } from 'zod';

export const contentStatusSchema = z.enum(['DRAFT', 'PUBLISHED']);

export const articleCreateSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(1),
  excerpt: z.string().max(500).optional(),
  coverImage: z.string().min(1).optional(),
  status: contentStatusSchema.default('DRAFT'),
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
  tags: z.array(z.string()).optional(),
});

export const articleUpdateSchema = articleCreateSchema
  .extend({
    coverImage: z.string().optional(),
  })
  .partial();

export const articleSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  coverImage: z.string().nullable(),
  status: contentStatusSchema,
  publishedAt: z.coerce.date().nullable(),
  authorId: z.string().uuid(),
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  deletedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const articleListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: contentStatusSchema.optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
  deleted: z.coerce.boolean().optional(),
  sortBy: z.enum(['createdAt', 'publishedAt', 'title']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const tagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
});
