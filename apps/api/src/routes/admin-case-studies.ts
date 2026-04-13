import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import {
  caseStudyCreateSchema,
  caseStudyUpdateSchema,
  caseStudyListQuerySchema,
} from '@apio/shared';
import { CaseStudyService } from '../services/CaseStudyService.js';
import { deleteUploadedFile } from '../utils/delete-uploaded-file.js';
import { revalidatePaths } from '../utils/revalidate.js';

const idParamSchema = z.object({ id: z.string().uuid() });

const CASE_STUDY_PATHS = ['/cas-clients', '/'];

function caseStudyPaths(slug: string): string[] {
  return [...CASE_STUDY_PATHS, `/cas-clients/${slug}`];
}

export default async function adminCaseStudiesRoutes(fastify: FastifyInstance) {
  const caseStudyService = new CaseStudyService(fastify.prisma);

  // Admin: list all case studies (any status)
  fastify.get('/api/admin/case-studies', async (request) => {
    const query = caseStudyListQuerySchema.parse(request.query);
    return caseStudyService.listAll(query);
  });

  // Admin: get case study by id
  fastify.get<{ Params: { id: string } }>('/api/admin/case-studies/:id', async (request) => {
    const { id } = idParamSchema.parse(request.params);
    return caseStudyService.getByIdPublic(id);
  });

  // Admin: create case study
  fastify.post('/api/admin/case-studies', async (request, reply) => {
    const data = caseStudyCreateSchema.parse(request.body);
    const caseStudy = await caseStudyService.create(data);
    void revalidatePaths(fastify, caseStudyPaths(caseStudy.slug));
    return reply.status(201).send(caseStudy);
  });

  // Admin: update case study
  fastify.put<{ Params: { id: string } }>('/api/admin/case-studies/:id', async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);
    const data = caseStudyUpdateSchema.parse(request.body);
    const { caseStudy, orphanedImages } = await caseStudyService.update(id, data);
    const uploadDir = fastify.config.UPLOAD_DIR;
    for (const url of orphanedImages) {
      await deleteUploadedFile(uploadDir, url);
    }
    void revalidatePaths(fastify, caseStudyPaths(caseStudy.slug));
    return reply.send(caseStudy);
  });

  // Admin: soft-delete case study
  fastify.delete<{ Params: { id: string } }>(
    '/api/admin/case-studies/:id',
    async (request, reply) => {
      const { id } = idParamSchema.parse(request.params);
      const caseStudy = await caseStudyService.getByIdPublic(id);
      await caseStudyService.softDelete(id);
      void revalidatePaths(fastify, caseStudyPaths(caseStudy.slug));
      return reply.status(204).send();
    }
  );

  // Admin: restore case study
  fastify.patch<{ Params: { id: string } }>(
    '/api/admin/case-studies/:id/restore',
    async (request, reply) => {
      const { id } = idParamSchema.parse(request.params);
      await caseStudyService.restore(id);
      const caseStudy = await caseStudyService.getByIdPublic(id);
      void revalidatePaths(fastify, caseStudyPaths(caseStudy.slug));
      return reply.send({ ok: true });
    }
  );

  // Admin: hard-delete case study (permanent)
  fastify.delete<{ Params: { id: string } }>(
    '/api/admin/case-studies/:id/permanent',
    async (request, reply) => {
      const { id } = idParamSchema.parse(request.params);
      const caseStudy = await caseStudyService.getByIdPublic(id);
      const imageUrls = await caseStudyService.hardDelete(id);
      const uploadDir = fastify.config.UPLOAD_DIR;
      for (const url of imageUrls) {
        await deleteUploadedFile(uploadDir, url);
      }
      void revalidatePaths(fastify, caseStudyPaths(caseStudy.slug));
      return reply.status(204).send();
    }
  );
}
