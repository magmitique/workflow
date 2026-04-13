import type { FastifyInstance } from 'fastify';
import { caseStudyListQuerySchema } from '@apio/shared';
import { CaseStudyService } from '../services/CaseStudyService.js';

export default async function caseStudiesRoutes(fastify: FastifyInstance) {
  const caseStudyService = new CaseStudyService(fastify.prisma);

  // Public: list published case studies
  fastify.get('/api/case-studies', async (request, reply) => {
    const query = caseStudyListQuerySchema.parse(request.query);
    const result = await caseStudyService.listPublished({ ...query, status: 'PUBLISHED' });
    return reply.send(result);
  });

  // Public: get case study by slug
  fastify.get('/api/case-studies/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const caseStudy = await caseStudyService.getBySlug(slug);

    if (!caseStudy || caseStudy.status !== 'PUBLISHED') {
      return reply.status(404).send({ error: 'Not Found', message: 'Étude de cas non trouvée.' });
    }

    return reply.send(caseStudy);
  });
}
