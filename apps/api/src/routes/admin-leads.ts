import type { FastifyInstance } from 'fastify';
import {
  leadListQuerySchema,
  leadUpdateStatusSchema,
  leadNoteCreateSchema,
  leadReplySchema,
} from '@apio/shared';
import { LeadService } from '../services/LeadService.js';
import { EmailService } from '../services/EmailService.js';

export default async function adminLeadsRoutes(fastify: FastifyInstance) {
  const leadService = new LeadService(fastify.prisma);
  const emailService = new EmailService(fastify.config);

  // GET /api/admin/leads - paginated list
  fastify.get('/api/admin/leads', async (request, reply) => {
    const query = leadListQuerySchema.parse(request.query);
    const result = await leadService.list(query);
    return reply.send(result);
  });

  // GET /api/admin/leads/stats - dashboard stats
  fastify.get('/api/admin/leads/stats', async (_request, reply) => {
    const stats = await leadService.getStats();
    return reply.send(stats);
  });

  // GET /api/admin/leads/:id - detail + notes
  fastify.get('/api/admin/leads/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const lead = await leadService.getById(id);

    if (!lead) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Lead non trouvé.',
      });
    }

    return reply.send(lead);
  });

  // PATCH /api/admin/leads/:id/status - update status
  fastify.patch('/api/admin/leads/:id/status', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { status } = leadUpdateStatusSchema.parse(request.body);
    const lead = await leadService.updateStatus(id, status);
    return reply.send(lead);
  });

  // POST /api/admin/leads/:id/notes - add note
  fastify.post('/api/admin/leads/:id/notes', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { content } = leadNoteCreateSchema.parse(request.body);
    const note = await leadService.addNote(id, content, request.user.userId);
    return reply.status(201).send(note);
  });

  // POST /api/admin/leads/:id/reply - send email reply
  fastify.post('/api/admin/leads/:id/reply', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { subject, body } = leadReplySchema.parse(request.body);

    const lead = await leadService.getById(id);
    if (!lead) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Lead non trouvé.',
      });
    }

    await emailService.sendLeadReply(lead.email, subject, body);

    // Add a note about the reply
    await leadService.addNote(id, `Email envoyé - Objet : ${subject}`, request.user.userId);

    // Auto-update status to CONTACTED if still NEW
    if (lead.status === 'NEW') {
      await leadService.updateStatus(id, 'CONTACTED');
    }

    return reply.send({ success: true });
  });
}
