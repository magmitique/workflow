export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  dashboard: {
    stats: ['dashboard', 'stats'] as const,
  },
  leads: {
    all: ['leads'] as const,
    list: (params: Record<string, unknown>) => ['leads', 'list', params] as const,
    detail: (id: string) => ['leads', 'detail', id] as const,
  },
  articles: {
    all: ['articles'] as const,
    list: (params: Record<string, unknown>) => ['articles', 'list', params] as const,
    detail: (id: string) => ['articles', 'detail', id] as const,
  },
  caseStudies: {
    all: ['case-studies'] as const,
    list: (params: Record<string, unknown>) => ['case-studies', 'list', params] as const,
    detail: (id: string) => ['case-studies', 'detail', id] as const,
  },
  users: {
    all: ['users'] as const,
    list: ['users', 'list'] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
  },
} as const;
