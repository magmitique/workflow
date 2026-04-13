import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { userCreateSchema, userUpdateSchema } from '@apio/shared';
import { UserService } from '../services/UserService.js';

const idParamSchema = z.object({ id: z.string().uuid() });

export default async function adminUsersRoutes(fastify: FastifyInstance) {
  const userService = new UserService(fastify.prisma);

  // GET /api/admin/users - list all admins
  fastify.get('/api/admin/users', async () => {
    return userService.list();
  });

  // GET /api/admin/users/:id
  fastify.get<{ Params: { id: string } }>('/api/admin/users/:id', async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);
    const user = await userService.getById(id);
    if (!user) {
      return reply
        .status(404)
        .send({ statusCode: 404, error: 'Not Found', message: 'Utilisateur non trouvé.' });
    }
    return reply.send(user);
  });

  // POST /api/admin/users - create admin
  fastify.post('/api/admin/users', async (request, reply) => {
    const data = userCreateSchema.parse(request.body);
    const user = await userService.create(data);
    return reply.status(201).send(user);
  });

  // PUT /api/admin/users/:id - update admin
  fastify.put<{ Params: { id: string } }>('/api/admin/users/:id', async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);
    const data = userUpdateSchema.parse(request.body);

    // Un admin ne peut pas changer son propre rôle
    if (id === request.user.userId && data.role !== undefined) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Vous ne pouvez pas modifier votre propre rôle.',
      });
    }

    const user = await userService.update(id, data);
    return reply.send(user);
  });

  // DELETE /api/admin/users/:id - delete admin (cannot delete self)
  fastify.delete<{ Params: { id: string } }>('/api/admin/users/:id', async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);

    if (id === request.user.userId) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Vous ne pouvez pas supprimer votre propre compte.',
      });
    }

    await userService.delete(id);
    return reply.status(204).send();
  });
}
