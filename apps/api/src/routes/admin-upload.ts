import type { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';
import { deleteUploadedFile } from '../utils/delete-uploaded-file.js';

const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export default async function adminUploadRoutes(fastify: FastifyInstance) {
  const uploadDir = fastify.config.UPLOAD_DIR;

  // Ensure upload directory exists
  await mkdir(uploadDir, { recursive: true });

  fastify.post('/api/admin/upload', async (request, reply) => {
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ message: 'Aucun fichier envoyé.' });
    }

    if (!ALLOWED_MIMES.has(data.mimetype)) {
      return reply.status(400).send({
        message: 'Type de fichier non autorisé. Formats acceptés : JPEG, PNG, WebP, GIF.',
      });
    }

    const buffer = await data.toBuffer();

    if (buffer.byteLength > MAX_FILE_SIZE) {
      return reply.status(400).send({
        message: `Fichier trop volumineux. Taille maximale : ${MAX_FILE_SIZE / 1024 / 1024} Mo.`,
      });
    }

    const ext = MIME_TO_EXT[data.mimetype] ?? extname(data.filename);
    const filename = `${randomUUID()}${ext}`;
    const filepath = join(uploadDir, filename);

    if (data.mimetype === 'image/gif') {
      await writeFile(filepath, buffer);
    } else {
      await sharp(buffer)
        .resize({ width: 1600, height: 1200, fit: 'inside', withoutEnlargement: true })
        .toFile(filepath);
    }

    return reply.send({ url: `/uploads/${filename}` });
  });

  fastify.delete('/api/admin/upload', async (request, reply) => {
    const { url } = request.body as { url: string };

    if (typeof url !== 'string' || !url) {
      return reply.status(400).send({ message: 'URL manquante.' });
    }

    await deleteUploadedFile(uploadDir, url);
    return reply.send({ ok: true });
  });
}
