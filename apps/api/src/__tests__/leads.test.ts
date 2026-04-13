import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '@apio/shared';
import { buildTestApp } from './helpers.js';

describe('Leads contact route', () => {
  it('validates contact form schema correctly', () => {
    const validData = {
      email: 'test@example.com',
      firstName: 'Jean',
      lastName: 'Dupont',
      company: 'Acme',
      needType: 'Audit IT',
      message: 'Bonjour, je souhaite un audit.',
    };

    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email in contact form', () => {
    const invalidData = {
      email: 'not-an-email',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('returns 400 on invalid body via error handler', async () => {
    const app = await buildTestApp();

    // Register a test route that validates with Zod
    app.post('/api/leads/contact', async (request, reply) => {
      contactFormSchema.parse(request.body);
      return reply.status(201).send({ success: true });
    });

    const response = await app.inject({
      method: 'POST',
      url: '/api/leads/contact',
      payload: { email: 'bad' },
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body) as { error: string };
    expect(body.error).toBe('Validation Error');

    await app.close();
  });

  it('returns 201 on valid body', async () => {
    const app = await buildTestApp();

    // Mock route (no DB) that just validates
    app.post('/api/leads/contact', async (request, reply) => {
      contactFormSchema.parse(request.body);
      return reply.status(201).send({
        success: true,
        message: 'Votre demande a bien été envoyée.',
      });
    });

    const response = await app.inject({
      method: 'POST',
      url: '/api/leads/contact',
      payload: {
        email: 'jean@example.com',
        firstName: 'Jean',
        message: 'Bonjour',
      },
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body) as { success: boolean };
    expect(body.success).toBe(true);

    await app.close();
  });

  it('accepts minimal payload (email only)', () => {
    const result = contactFormSchema.safeParse({ email: 'minimal@test.com' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid phone number', () => {
    const result = contactFormSchema.safeParse({
      email: 'test@example.com',
      phone: '123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const phoneError = result.error.issues.find((i) => i.path.includes('phone'));
      expect(phoneError).toBeDefined();
    }
  });
});
