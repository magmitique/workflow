const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function attemptRefresh(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

function buildFetchInit(
  body: unknown,
  headers: HeadersInit | undefined,
  rest: Omit<FetchOptions, 'body' | 'headers'>
): RequestInit {
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  return {
    headers: {
      ...(body !== undefined && !isFormData && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    credentials: 'include',
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  };
}

export async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, buildFetchInit(body, headers, rest));

  // Handle 401 - attempt silent refresh and retry once
  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = attemptRefresh().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    // C1: Capture reference before await to avoid race with finally() nullifying it
    const currentRefreshPromise = refreshPromise;
    const refreshed = await currentRefreshPromise;
    if (refreshed) {
      // Retry original request
      const retryResponse = await fetch(
        `${API_BASE_URL}${endpoint}`,
        buildFetchInit(body, headers, rest)
      );

      if (retryResponse.ok) {
        if (retryResponse.status === 204) return undefined as T;
        return retryResponse.json() as Promise<T>;
      }

      // C2: Retry failed with actual error - throw it instead of masking as "session expired"
      const retryError = (await retryResponse.json().catch(() => ({}))) as { message?: string };
      throw new Error(retryError.message ?? `API error: ${retryResponse.status}`);
    }

    // Refresh itself failed - redirect to login (client-side only, skip if already on login)
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
      window.location.href = '/login';
    }
    throw new Error('Session expirée. Veuillez vous reconnecter.');
  }

  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(error.message ?? `API error: ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
