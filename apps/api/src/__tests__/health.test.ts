import { describe, it, expect } from 'vitest';
import { buildApp } from '../app.js';
import { testConfig } from './helpers.js';

describe('Health route', () => {
  it('returns 200 with status ok', async () => {
    const app = await buildApp({
      config: testConfig,
      skipDb: true,
    });

    const response = await app.inject({
      method: 'GET',
      url: '/api/health',
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body) as {
      status: string;
      timestamp: string;
      uptime: number;
      version: string;
    };
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeDefined();
    expect(body.uptime).toBeTypeOf('number');
    expect(body.version).toBe('0.0.0');

    await app.close();
  });
});
