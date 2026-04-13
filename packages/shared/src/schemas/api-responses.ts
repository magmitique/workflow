import { z } from 'zod';

export const apiErrorSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
});

export function paginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
    }),
  });
}

export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.string(),
  uptime: z.number(),
  version: z.string(),
});
