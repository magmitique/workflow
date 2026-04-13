import type { FastifyInstance, FastifyError } from 'fastify';
import fp from 'fastify-plugin';
import { ZodError } from 'zod';

async function errorHandlerPlugin(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Validation Error',
        message: 'Invalid request data',
        details: error.flatten().fieldErrors,
      });
    }

    if (error.statusCode) {
      return reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        error: error.name,
        message: error.message,
      });
    }

    fastify.log.error(error);

    return reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message:
        fastify.config.NODE_ENV === 'production' ? 'An unexpected error occurred' : error.message,
    });
  });
}

export default fp(errorHandlerPlugin, {
  name: 'error-handler',
});
