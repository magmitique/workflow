import type { FastifyInstance } from 'fastify';
import { articleListQuerySchema } from '@apio/shared';
import { ArticleService } from '../services/ArticleService.js';

export default async function articlesRoutes(fastify: FastifyInstance) {
  const articleService = new ArticleService(fastify.prisma);

  // Public: list published articles
  fastify.get('/api/articles', async (request, reply) => {
    const query = articleListQuerySchema.parse(request.query);
    const result = await articleService.listPublished({ ...query, status: 'PUBLISHED' });
    return reply.send(result);
  });

  // Public: get article by slug
  fastify.get('/api/articles/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const article = await articleService.getBySlug(slug);

    if (!article || article.status !== 'PUBLISHED') {
      return reply.status(404).send({ error: 'Not Found', message: 'Article non trouvé.' });
    }

    return reply.send(article);
  });
}
