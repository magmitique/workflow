import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { articleCreateSchema, articleUpdateSchema, articleListQuerySchema } from '@apio/shared';
import { ArticleService } from '../services/ArticleService.js';
import { deleteUploadedFile } from '../utils/delete-uploaded-file.js';
import { revalidatePaths } from '../utils/revalidate.js';

const idParamSchema = z.object({ id: z.string().uuid() });

const ARTICLE_PATHS = ['/blog', '/'];

function articlePaths(slug: string): string[] {
  return [...ARTICLE_PATHS, `/blog/${slug}`];
}

export default async function adminArticlesRoutes(fastify: FastifyInstance) {
  const articleService = new ArticleService(fastify.prisma);

  // Admin: list all articles (any status)
  fastify.get('/api/admin/articles', async (request) => {
    const query = articleListQuerySchema.parse(request.query);
    return articleService.listAll(query);
  });

  // Admin: get article by id
  fastify.get<{ Params: { id: string } }>('/api/admin/articles/:id', async (request) => {
    const { id } = idParamSchema.parse(request.params);
    return articleService.getById(id);
  });

  // Admin: create article
  fastify.post('/api/admin/articles', async (request, reply) => {
    const data = articleCreateSchema.parse(request.body);
    const authorId = request.user.userId;
    const article = await articleService.create(data, authorId);
    void revalidatePaths(fastify, articlePaths(article.slug));
    return reply.status(201).send(article);
  });

  // Admin: update article
  fastify.put<{ Params: { id: string } }>('/api/admin/articles/:id', async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);
    const data = articleUpdateSchema.parse(request.body);
    const { article, orphanedImages } = await articleService.update(id, data);
    const uploadDir = fastify.config.UPLOAD_DIR;
    for (const url of orphanedImages) {
      await deleteUploadedFile(uploadDir, url);
    }
    void revalidatePaths(fastify, articlePaths(article.slug));
    return reply.send(article);
  });

  // Admin: soft-delete article
  fastify.delete<{ Params: { id: string } }>('/api/admin/articles/:id', async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);
    const article = await articleService.getById(id);
    await articleService.softDelete(id);
    void revalidatePaths(fastify, articlePaths(article.slug));
    return reply.status(204).send();
  });

  // Admin: restore article
  fastify.patch<{ Params: { id: string } }>(
    '/api/admin/articles/:id/restore',
    async (request, reply) => {
      const { id } = idParamSchema.parse(request.params);
      await articleService.restore(id);
      const article = await articleService.getById(id);
      void revalidatePaths(fastify, articlePaths(article.slug));
      return reply.send({ ok: true });
    }
  );

  // Admin: hard-delete article (permanent)
  fastify.delete<{ Params: { id: string } }>(
    '/api/admin/articles/:id/permanent',
    async (request, reply) => {
      const { id } = idParamSchema.parse(request.params);
      const article = await articleService.getById(id);
      const imageUrls = await articleService.hardDelete(id);
      const uploadDir = fastify.config.UPLOAD_DIR;
      for (const url of imageUrls) {
        await deleteUploadedFile(uploadDir, url);
      }
      void revalidatePaths(fastify, articlePaths(article.slug));
      return reply.status(204).send();
    }
  );
}
