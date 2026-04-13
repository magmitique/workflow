import type { FastifyInstance } from 'fastify';

export async function revalidatePaths(fastify: FastifyInstance, paths: string[]): Promise<void> {
  const { REVALIDATION_URL, REVALIDATION_SECRET } = fastify.config;
  if (!REVALIDATION_URL || !REVALIDATION_SECRET) return;

  try {
    await fetch(REVALIDATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidation-secret': REVALIDATION_SECRET,
      },
      body: JSON.stringify({ paths }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    fastify.log.warn({ err, paths }, 'Failed to revalidate frontend cache');
  }
}
