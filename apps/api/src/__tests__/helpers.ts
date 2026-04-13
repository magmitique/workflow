import Fastify from 'fastify';
import cors from '@fastify/cors';
import errorHandlerPlugin from '../plugins/error-handler.js';
import type { Env } from '../config/env.js';

export const testConfig: Env = {
  NODE_ENV: 'test',
  PORT: 0,
  HOST: '0.0.0.0',
  DATABASE_URL: 'mysql://test:test@localhost:3306/test',
  JWT_SECRET: 'test-secret-that-is-at-least-32-chars-long',
  JWT_EXPIRES_IN: '15m',
  JWT_REFRESH_EXPIRES_IN: '7d',
  CORS_ORIGIN: 'http://localhost:3000',
  UPLOAD_DIR: './uploads',
};

export async function buildTestApp() {
  const app = Fastify({ logger: false });
  app.decorate('config', testConfig);
  await app.register(cors);
  await app.register(errorHandlerPlugin);
  return app;
}
