import type { FastifyInstance } from 'fastify';

const startTime = Date.now();

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/api/health', async (_request, reply) => {
    return reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - startTime) / 1000),
      version: '0.0.0',
    });
  });
}
