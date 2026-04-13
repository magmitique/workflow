import { describe, it, expect } from 'vitest';
import { articleCreateSchema, articleListQuerySchema } from '@apio/shared';
import { buildTestApp } from './helpers.js';

describe('Articles schemas', () => {
  it('validates article create schema with required fields', () => {
    const valid = {
      title: 'Mon premier article',
      slug: 'mon-premier-article',
      content: '# Hello world\n\nCeci est un article.',
    };

    const result = articleCreateSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe('DRAFT');
    }
  });

  it('validates article create schema with all fields', () => {
    const valid = {
      title: 'Article complet',
      slug: 'article-complet',
      content: '# Contenu complet',
      excerpt: 'Un résumé court.',
      coverImage: 'https://example.com/image.jpg',
      status: 'PUBLISHED',
      metaTitle: 'Article complet | Apio',
      metaDescription: 'Description SEO de cet article.',
      tags: ['IT', 'TPE'],
    };

    const result = articleCreateSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('rejects invalid slug format', () => {
    const invalid = {
      title: 'Test',
      slug: 'Invalid Slug With Spaces',
      content: 'Content',
    };

    const result = articleCreateSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects empty title', () => {
    const invalid = {
      title: '',
      slug: 'valid-slug',
      content: 'Content',
    };

    const result = articleCreateSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects invalid status', () => {
    const result = articleCreateSchema.safeParse({
      title: 'Test',
      slug: 'test',
      content: 'Content',
      status: 'INVALID_STATUS',
    });
    expect(result.success).toBe(false);
  });

  it('validates article list query with defaults', () => {
    const result = articleListQuerySchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.limit).toBe(20);
      expect(result.data.sortBy).toBe('createdAt');
      expect(result.data.sortOrder).toBe('desc');
    }
  });

  it('validates article list query with filters', () => {
    const result = articleListQuerySchema.safeParse({
      page: '2',
      limit: '10',
      tag: 'it',
      search: 'audit',
      sortBy: 'publishedAt',
      sortOrder: 'asc',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(2);
      expect(result.data.limit).toBe(10);
    }
  });
});

describe('Articles routes (mock)', () => {
  it('returns 400 on invalid article body', async () => {
    const app = await buildTestApp();

    app.post('/api/admin/articles', async (request, reply) => {
      articleCreateSchema.parse(request.body);
      return reply.status(201).send({ success: true });
    });

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/articles',
      payload: { title: '' },
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body) as { error: string };
    expect(body.error).toBe('Validation Error');

    await app.close();
  });

  it('returns 201 on valid article body', async () => {
    const app = await buildTestApp();

    app.post('/api/admin/articles', async (request, reply) => {
      const data = articleCreateSchema.parse(request.body);
      return reply.status(201).send({
        id: 'test-uuid',
        ...data,
        authorId: 'test-author',
        createdAt: new Date().toISOString(),
      });
    });

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/articles',
      payload: {
        title: 'Test Article',
        slug: 'test-article',
        content: '# Test\n\nHello world.',
        tags: ['IT'],
      },
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body) as { id: string; title: string };
    expect(body.title).toBe('Test Article');

    await app.close();
  });
});
