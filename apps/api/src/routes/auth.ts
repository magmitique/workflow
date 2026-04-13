import type { FastifyInstance } from 'fastify';
import { loginSchema } from '@apio/shared';
import { AuthService } from '../services/AuthService.js';

export default async function authRoutes(fastify: FastifyInstance) {
  const authService = new AuthService(fastify.prisma);

  // POST /api/auth/login
  fastify.post('/api/auth/login', async (request, reply) => {
    const { email, password } = loginSchema.parse(request.body);
    const user = await authService.validateCredentials(email, password);

    if (!user) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Email ou mot de passe incorrect.',
      });
    }

    const accessToken = fastify.jwt.sign(
      { userId: user.id, role: user.role },
      { expiresIn: fastify.config.JWT_EXPIRES_IN }
    );

    const refreshToken = fastify.jwt.sign(
      { userId: user.id, role: user.role },
      { expiresIn: fastify.config.JWT_REFRESH_EXPIRES_IN }
    );

    reply
      .setCookie('access_token', accessToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: fastify.config.NODE_ENV === 'production',
        maxAge: 15 * 60, // 15 minutes
      })
      .setCookie('refresh_token', refreshToken, {
        path: '/api/auth/refresh',
        httpOnly: true,
        sameSite: 'lax',
        secure: fastify.config.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

    return reply.send({ user });
  });

  // POST /api/auth/refresh
  fastify.post('/api/auth/refresh', async (request, reply) => {
    const token = request.cookies['refresh_token'];

    if (!token) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Refresh token manquant.',
      });
    }

    let payload: { userId: string; role: string };
    try {
      payload = fastify.jwt.verify<{ userId: string; role: string }>(token);
    } catch {
      reply.clearCookie('access_token', { path: '/' });
      reply.clearCookie('refresh_token', { path: '/api/auth/refresh' });
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Refresh token invalide ou expiré.',
      });
    }

    const user = await authService.getById(payload.userId);
    if (!user) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Utilisateur introuvable.',
      });
    }

    const newAccessToken = fastify.jwt.sign(
      { userId: user.id, role: user.role },
      { expiresIn: fastify.config.JWT_EXPIRES_IN }
    );

    const newRefreshToken = fastify.jwt.sign(
      { userId: user.id, role: user.role },
      { expiresIn: fastify.config.JWT_REFRESH_EXPIRES_IN }
    );

    reply
      .setCookie('access_token', newAccessToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: fastify.config.NODE_ENV === 'production',
        maxAge: 15 * 60,
      })
      .setCookie('refresh_token', newRefreshToken, {
        path: '/api/auth/refresh',
        httpOnly: true,
        sameSite: 'lax',
        secure: fastify.config.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60,
      });

    return reply.send({ user });
  });

  // GET /api/auth/me
  fastify.get(
    '/api/auth/me',
    {
      preHandler: [fastify.authenticate],
    },
    async (request, reply) => {
      const user = await authService.getById(request.user.userId);

      if (!user) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Utilisateur introuvable.',
        });
      }

      return reply.send({ user });
    }
  );

  // POST /api/auth/logout
  fastify.post('/api/auth/logout', async (_request, reply) => {
    reply
      .clearCookie('access_token', { path: '/' })
      .clearCookie('refresh_token', { path: '/api/auth/refresh' });

    return reply.send({ success: true });
  });
}
