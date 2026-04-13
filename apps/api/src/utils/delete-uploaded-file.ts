import { unlink } from 'node:fs/promises';
import { join, basename, resolve } from 'node:path';

export async function deleteUploadedFile(uploadDir: string, url: string): Promise<void> {
  const filename = basename(url);
  const filepath = join(uploadDir, filename);

  if (!resolve(filepath).startsWith(resolve(uploadDir))) {
    return;
  }

  await unlink(filepath).catch(() => {});
}
