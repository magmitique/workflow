import { describe, it, expect } from 'vitest';
import { caseStudyCreateSchema, caseStudyListQuerySchema } from '@apio/shared';
import { buildTestApp } from './helpers.js';

describe('Case study schemas', () => {
  it('validates case study create schema with required fields', () => {
    const valid = {
      title: 'Migration cloud PME industrielle',
      slug: 'migration-cloud-pme-industrielle',
      clientName: 'Acme Industries',
    };

    const result = caseStudyCreateSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe('DRAFT');
      expect(result.data.clientAnonymous).toBe(false);
      expect(result.data.featured).toBe(false);
    }
  });

  it('validates case study create schema with all fields', () => {
    const valid = {
      title: 'Refonte SI cabinet comptable',
      slug: 'refonte-si-cabinet-comptable',
      clientName: 'Cabinet Martin & Associés',
      clientAnonymous: false,
      sector: 'Comptabilité',
      techStack: ['Microsoft 365', 'Azure AD', 'Sage'],
      context: 'Cabinet de 25 collaborateurs avec infrastructure vieillissante.',
      challenge: 'Migrer sans interruption de service.',
      solution: 'Migration progressive sur 3 mois.',
      testimonialQuote: 'Apio a transformé notre quotidien.',
      testimonialAuthor: 'Jean Martin',
      testimonialRole: 'Associé fondateur',
      coverImage: 'https://example.com/cover.jpg',
      architectureDiagram: 'https://example.com/diagram.png',
      featured: true,
      status: 'PUBLISHED',
      results: [
        { metric: 'Temps de démarrage', before: '8 min', after: '45 sec' },
        { metric: 'Tickets support/mois', before: '35', after: '5' },
      ],
    };

    const result = caseStudyCreateSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('rejects invalid slug format', () => {
    const invalid = {
      title: 'Test',
      slug: 'Invalid Slug With Spaces',
      clientName: 'Client',
    };

    const result = caseStudyCreateSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects empty title', () => {
    const invalid = {
      title: '',
      slug: 'valid-slug',
      clientName: 'Client',
    };

    const result = caseStudyCreateSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('validates case study list query with defaults', () => {
    const result = caseStudyListQuerySchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.limit).toBe(20);
      expect(result.data.sortBy).toBe('createdAt');
      expect(result.data.sortOrder).toBe('desc');
    }
  });

  it('validates case study list query with filters', () => {
    const result = caseStudyListQuerySchema.safeParse({
      page: '2',
      limit: '10',
      sector: 'Comptabilité',
      featured: 'true',
      sortBy: 'title',
      sortOrder: 'asc',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(2);
      expect(result.data.limit).toBe(10);
      expect(result.data.sector).toBe('Comptabilité');
      expect(result.data.featured).toBe(true);
    }
  });
});

describe('Case studies routes (mock)', () => {
  it('returns 400 on invalid case study body', async () => {
    const app = await buildTestApp();

    app.post('/api/admin/case-studies', async (request, reply) => {
      caseStudyCreateSchema.parse(request.body);
      return reply.status(201).send({ success: true });
    });

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/case-studies',
      payload: { title: '' },
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body) as { error: string };
    expect(body.error).toBe('Validation Error');

    await app.close();
  });

  it('returns 201 on valid case study body', async () => {
    const app = await buildTestApp();

    app.post('/api/admin/case-studies', async (request, reply) => {
      const data = caseStudyCreateSchema.parse(request.body);
      return reply.status(201).send({
        id: 'test-uuid',
        ...data,
        createdAt: new Date().toISOString(),
      });
    });

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/case-studies',
      payload: {
        title: 'Migration Cloud',
        slug: 'migration-cloud',
        clientName: 'Acme Corp',
        results: [{ metric: 'Uptime', before: '95%', after: '99.9%' }],
      },
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body) as { id: string; title: string };
    expect(body.title).toBe('Migration Cloud');

    await app.close();
  });
});
