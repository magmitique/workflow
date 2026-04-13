import { describe, it, expect } from 'vitest';
import type { FastifyRequest } from 'fastify';
import cookie from '@fastify/cookie';
import fjwt from '@fastify/jwt';
import { loginSchema } from '@apio/shared';
import { testConfig, buildTestApp } from './helpers.js';

describe('Auth routes', () => {
  it('validates login schema correctly', () => {
    const valid = loginSchema.safeParse({
      email: 'admin@apio.systems',
      password: 'securepassword',
    });
    expect(valid.success).toBe(true);
  });

  it('rejects login with invalid email', () => {
    const invalid = loginSchema.safeParse({
      email: 'not-email',
      password: 'securepassword',
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects login with short password', () => {
    const invalid = loginSchema.safeParse({
      email: 'admin@apio.systems',
      password: 'short',
    });
    expect(invalid.success).toBe(false);
  });

  it('returns 400 on invalid login body', async () => {
    const app = await buildTestApp();

    app.post('/api/auth/login', async (request, reply) => {
      loginSchema.parse(request.body);
      return reply.send({ user: {} });
    });

    const response = await app.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: { email: 'bad' },
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body) as { error: string };
    expect(body.error).toBe('Validation Error');

    await app.close();
  });

  it('JWT sign and verify round-trip works', async () => {
    const app = await buildTestApp();
    await app.register(cookie);
    await app.register(fjwt, {
      secret: testConfig.JWT_SECRET,
      sign: { expiresIn: testConfig.JWT_EXPIRES_IN },
      cookie: { cookieName: 'access_token', signed: false },
    });

    const payload = { userId: '123', role: 'ADMIN' };
    const token = app.jwt.sign(payload);
    const decoded = app.jwt.verify<{ userId: string; role: string }>(token);

    expect(decoded.userId).toBe('123');
    expect(decoded.role).toBe('ADMIN');

    await app.close();
  });

  it('sets httpOnly cookies on login simulation', async () => {
    const app = await buildTestApp();
    await app.register(cookie);
    await app.register(fjwt, {
      secret: testConfig.JWT_SECRET,
      sign: { expiresIn: testConfig.JWT_EXPIRES_IN },
      cookie: { cookieName: 'access_token', signed: false },
    });

    app.post('/api/auth/login', async (_request, reply) => {
      const accessToken = app.jwt.sign({ userId: 'user-1', role: 'ADMIN' });
      const refreshToken = app.jwt.sign({ userId: 'user-1', role: 'ADMIN' }, { expiresIn: '7d' });

      reply
        .setCookie('access_token', accessToken, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 15 * 60,
        })
        .setCookie('refresh_token', refreshToken, {
          path: '/api/auth/refresh',
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 7 * 24 * 60 * 60,
        });

      return reply.send({ user: { id: 'user-1', name: 'Admin' } });
    });

    const response = await app.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: { email: 'admin@test.com', password: 'password123' },
    });

    expect(response.statusCode).toBe(200);

    const cookies = response.cookies;
    const accessCookie = cookies.find((c) => c.name === 'access_token');
    const refreshCookie = cookies.find((c) => c.name === 'refresh_token');

    expect(accessCookie).toBeDefined();
    expect(accessCookie?.httpOnly).toBe(true);
    expect(refreshCookie).toBeDefined();
    expect(refreshCookie?.httpOnly).toBe(true);

    await app.close();
  });

  it('protects routes requiring authentication', async () => {
    const app = await buildTestApp();
    await app.register(cookie);
    await app.register(fjwt, {
      secret: testConfig.JWT_SECRET,
      sign: { expiresIn: testConfig.JWT_EXPIRES_IN },
      cookie: { cookieName: 'access_token', signed: false },
    });

    app.decorate('authenticate', async function (request: FastifyRequest) {
      await request.jwtVerify();
    });

    app.get(
      '/api/auth/me',
      {
        preHandler: [app.authenticate],
      },
      async (request, reply) => {
        return reply.send({ user: request.user });
      }
    );

    // Without token
    const noAuth = await app.inject({
      method: 'GET',
      url: '/api/auth/me',
    });
    expect(noAuth.statusCode).toBe(401);

    // With valid token
    const token = app.jwt.sign({ userId: 'user-1', role: 'ADMIN' });
    const withAuth = await app.inject({
      method: 'GET',
      url: '/api/auth/me',
      cookies: { access_token: token },
    });
    expect(withAuth.statusCode).toBe(200);
    const body = JSON.parse(withAuth.body) as { user: { userId: string } };
    expect(body.user.userId).toBe('user-1');

    await app.close();
  });

  it('rejects malformed JWT token', async () => {
    const app = await buildTestApp();
    await app.register(cookie);
    await app.register(fjwt, {
      secret: testConfig.JWT_SECRET,
      sign: { expiresIn: testConfig.JWT_EXPIRES_IN },
      cookie: { cookieName: 'access_token', signed: false },
    });

    app.decorate('authenticate', async function (request: FastifyRequest) {
      await request.jwtVerify();
    });

    app.get('/api/auth/me', { preHandler: [app.authenticate] }, async (request, reply) => {
      return reply.send({ user: request.user });
    });

    const response = await app.inject({
      method: 'GET',
      url: '/api/auth/me',
      cookies: { access_token: 'not.a.valid.jwt.token' },
    });
    expect(response.statusCode).toBe(401);

    await app.close();
  });
});
