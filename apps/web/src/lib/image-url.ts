const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

/** Resolve a relative upload path (e.g. `/uploads/uuid.jpg`) to an absolute URL. */
export function resolveImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path}`;
}
