import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import type { Env } from './config/env.js';
import errorHandlerPlugin from './plugins/error-handler.js';
import healthRoutes from './routes/health.js';

declare module 'fastify' {
  interface FastifyInstance {
    config: Env;
  }
}

export interface BuildAppOptions {
  config: Env;
  /** Skip database connection (for tests without DB) */
  skipDb?: boolean;
}

export async function buildApp(options: BuildAppOptions) {
  const { config, skipDb = false } = options;

  const app = Fastify({
    logger: config.NODE_ENV !== 'test' && {
      level: config.NODE_ENV === 'development' ? 'info' : 'warn',
      transport:
        config.NODE_ENV === 'development'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    },
  });

  app.decorate('config', config);

  // strictPreflight: false is required because @fastify/cors v11 cannot resolve
  // parametric routes (e.g. /api/admin/articles/:id) during OPTIONS preflight,
  // causing CORS failures on DELETE/PUT for admin routes.
  await app.register(cors, {
    origin: config.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    strictPreflight: false,
  });

  await app.register(multipart, {
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  });

  await app.register(errorHandlerPlugin);

  if (!skipDb) {
    const { default: prismaPlugin } = await import('./plugins/prisma.js');
    const { default: authPlugin } = await import('./plugins/auth.js');
    await app.register(prismaPlugin);
    await app.register(authPlugin);

    // Serve uploaded files in dev (in prod, Nginx handles /uploads/)
    if (config.NODE_ENV === 'development') {
      const { default: fastifyStatic } = await import('@fastify/static');
      const { resolve } = await import('node:path');
      await app.register(fastifyStatic, {
        root: resolve(config.UPLOAD_DIR),
        prefix: '/uploads/',
        decorateReply: false,
      });
    }

    // Auth routes (public - login, refresh, logout + protected me)
    const { default: authRoutes } = await import('./routes/auth.js');
    await app.register(authRoutes);

    // Public routes
    const { default: leadsRoutes } = await import('./routes/leads.js');
    const { default: articlesRoutes } = await import('./routes/articles.js');
    const { default: caseStudiesRoutes } = await import('./routes/case-studies.js');
    await app.register(leadsRoutes);
    await app.register(articlesRoutes);
    await app.register(caseStudiesRoutes);

    // Admin scope - all routes require authentication
    await app.register(async function adminScope(admin) {
      admin.addHook('onRequest', async (request) => {
        if (request.method === 'OPTIONS') return;
        await admin.authenticate(request);
      });

      const { default: adminArticlesRoutes } = await import('./routes/admin-articles.js');
      const { default: adminCaseStudiesRoutes } = await import('./routes/admin-case-studies.js');
      const { default: adminLeadsRoutes } = await import('./routes/admin-leads.js');
      const { default: adminUploadRoutes } = await import('./routes/admin-upload.js');
      const { default: adminUsersRoutes } = await import('./routes/admin-users.js');
      await admin.register(adminArticlesRoutes);
      await admin.register(adminCaseStudiesRoutes);
      await admin.register(adminLeadsRoutes);
      await admin.register(adminUploadRoutes);
      await admin.register(adminUsersRoutes);
    });
  }

  await app.register(healthRoutes);

  return app;
}
