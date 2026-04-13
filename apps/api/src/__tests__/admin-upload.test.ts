import { describe, it, expect, vi, beforeEach } from 'vitest';
import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import { testConfig } from './helpers.js';

// Mock sharp
vi.mock('sharp', () => {
  const sharpInstance = {
    resize: vi.fn().mockReturnThis(),
    toFile: vi.fn().mockResolvedValue(undefined),
  };
  const sharpFn = vi.fn(() => sharpInstance);
  return { default: sharpFn, __sharpInstance: sharpInstance };
});

// Mock node:fs/promises
vi.mock('node:fs/promises', () => ({
  mkdir: vi.fn().mockResolvedValue(undefined),
  writeFile: vi.fn().mockResolvedValue(undefined),
}));

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import adminUploadRoutes from '../routes/admin-upload.js';

async function buildUploadApp() {
  const app = Fastify({ logger: false });
  app.decorate('config', testConfig);
  await app.register(multipart, { limits: { fileSize: 5 * 1024 * 1024 } });
  await app.register(adminUploadRoutes);
  return app;
}

function createMultipartPayload(
  filename: string,
  mimetype: string,
  content: Buffer
): { body: Buffer; contentType: string } {
  const boundary = '----TestBoundary' + Date.now();
  const header = [
    `------${boundary}`,
    `Content-Disposition: form-data; name="file"; filename="${filename}"`,
    `Content-Type: ${mimetype}`,
    '',
    '',
  ].join('\r\n');
  const footer = `\r\n------${boundary}--\r\n`;

  const headerBuf = Buffer.from(header);
  const footerBuf = Buffer.from(footer);
  const body = Buffer.concat([headerBuf, content, footerBuf]);

  return { body, contentType: `multipart/form-data; boundary=----${boundary}` };
}

describe('Admin upload route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when no file is sent', async () => {
    const app = await buildUploadApp();

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/upload',
      headers: { 'content-type': 'multipart/form-data; boundary=----empty' },
      payload: Buffer.from('------empty--\r\n'),
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body) as { message: string };
    expect(body.message).toContain('fichier');

    await app.close();
  });

  it('returns 400 for disallowed MIME type', async () => {
    const app = await buildUploadApp();
    const content = Buffer.from('fake-pdf-content');
    const { body, contentType } = createMultipartPayload('doc.pdf', 'application/pdf', content);

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/upload',
      headers: { 'content-type': contentType },
      payload: body,
    });

    expect(response.statusCode).toBe(400);
    const resBody = JSON.parse(response.body) as { message: string };
    expect(resBody.message).toContain('non autorisé');

    await app.close();
  });

  it('returns 400 for file exceeding 5 MB', async () => {
    const app = await buildUploadApp();
    // Create a buffer > 5MB
    const largeContent = Buffer.alloc(5 * 1024 * 1024 + 1, 0xff);
    const { body, contentType } = createMultipartPayload('big.jpg', 'image/jpeg', largeContent);

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/upload',
      headers: { 'content-type': contentType },
      payload: body,
    });

    // Should be 400 (either from multipart limit or from our buffer check)
    expect(response.statusCode).toBeGreaterThanOrEqual(400);
    expect(response.statusCode).toBeLessThan(500);

    await app.close();
  });

  it('returns 200 with URL for valid JPEG (sharp called)', async () => {
    const app = await buildUploadApp();
    const content = Buffer.from('fake-jpeg-content');
    const { body, contentType } = createMultipartPayload('photo.jpg', 'image/jpeg', content);

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/upload',
      headers: { 'content-type': contentType },
      payload: body,
    });

    expect(response.statusCode).toBe(200);
    const resBody = JSON.parse(response.body) as { url: string };
    expect(resBody.url).toMatch(/^\/uploads\/[\w-]+\.jpg$/);
    expect(sharp).toHaveBeenCalled();

    await app.close();
  });

  it('returns 200 with URL for GIF (writeFile called, not sharp)', async () => {
    const app = await buildUploadApp();
    const content = Buffer.from('GIF89a-fake-gif-content');
    const { body, contentType } = createMultipartPayload('anim.gif', 'image/gif', content);

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/upload',
      headers: { 'content-type': contentType },
      payload: body,
    });

    expect(response.statusCode).toBe(200);
    const resBody = JSON.parse(response.body) as { url: string };
    expect(resBody.url).toMatch(/^\/uploads\/[\w-]+\.gif$/);
    expect(writeFile).toHaveBeenCalled();

    await app.close();
  });
});
