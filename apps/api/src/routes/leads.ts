import type { FastifyInstance } from 'fastify';
import { contactFormSchema } from '@apio/shared';
import { LeadService } from '../services/LeadService.js';
import { EmailService } from '../services/EmailService.js';

export default async function leadsRoutes(fastify: FastifyInstance) {
  const leadService = new LeadService(fastify.prisma);
  const emailService = new EmailService(fastify.config);

  // Public: submit contact form
  fastify.post('/api/leads/contact', async (request, reply) => {
    const data = contactFormSchema.parse(request.body);

    const lead = await leadService.createFromContact(data);

    // Send email notification (fire and forget)
    emailService.sendNewLeadNotification(lead).catch((err) => {
      fastify.log.error(err, 'Failed to send lead notification email');
    });

    return reply.status(201).send({
      success: true,
      message: 'Votre demande a bien été envoyée. Nous vous recontacterons rapidement.',
    });
  });
}
