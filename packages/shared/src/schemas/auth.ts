import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(['ADMIN', 'SUPER_ADMIN']),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const userRoleSchema = z.enum(['ADMIN', 'SUPER_ADMIN']);

export const PASSWORD_RULES = {
  minLength: 8,
  patterns: [
    { regex: /[a-z]/, label: 'Une lettre minuscule' },
    { regex: /[A-Z]/, label: 'Une lettre majuscule' },
    { regex: /[0-9]/, label: 'Un chiffre' },
    { regex: /[^a-zA-Z0-9]/, label: 'Un caractère spécial' },
  ],
} as const;

export const passwordSchema = z
  .string()
  .min(PASSWORD_RULES.minLength, `Au moins ${PASSWORD_RULES.minLength} caractères`)
  .regex(/[a-z]/, 'Au moins une lettre minuscule')
  .regex(/[A-Z]/, 'Au moins une lettre majuscule')
  .regex(/[0-9]/, 'Au moins un chiffre')
  .regex(/[^a-zA-Z0-9]/, 'Au moins un caractère spécial');

export const userCreateSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  name: z.string().min(1),
  role: userRoleSchema.default('ADMIN'),
});

export const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  role: userRoleSchema.optional(),
  password: passwordSchema.optional(),
});

export const tokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});
