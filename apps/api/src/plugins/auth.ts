import type { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fjwt from '@fastify/jwt';
import cookie from '@fastify/cookie';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string; role: string };
    user: { userId: string; role: string };
  }
}

async function authPlugin(fastify: FastifyInstance) {
  await fastify.register(cookie);

  await fastify.register(fjwt, {
    secret: fastify.config.JWT_SECRET,
    sign: {
      expiresIn: fastify.config.JWT_EXPIRES_IN,
    },
    cookie: {
      cookieName: 'access_token',
      signed: false,
    },
  });

  fastify.decorate('authenticate', async function (request: FastifyRequest) {
    await request.jwtVerify();
  });
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>;
  }
}

export default fp(authPlugin, {
  name: 'auth',
  dependencies: [],
});
