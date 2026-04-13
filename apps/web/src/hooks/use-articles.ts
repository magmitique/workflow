'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type {
  Article,
  ArticleListQuery,
  ArticleCreateInput,
  ArticleUpdateInput,
  Tag,
  PaginatedResponse,
} from '@apio/shared';

interface ArticleWithTags extends Article {
  author: { id: string; name: string };
  tags: Tag[];
}

export function useAdminArticles(params: Partial<ArticleListQuery> = {}) {
  return useQuery<PaginatedResponse<ArticleWithTags>>({
    queryKey: queryKeys.articles.list(params),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set('page', String(params.page));
      if (params.limit) searchParams.set('limit', String(params.limit));
      if (params.status) searchParams.set('status', params.status);
      if (params.tag) searchParams.set('tag', params.tag);
      if (params.search) searchParams.set('search', params.search);
      if (params.deleted !== undefined) searchParams.set('deleted', String(params.deleted));
      if (params.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      const qs = searchParams.toString();
      return apiClient<PaginatedResponse<ArticleWithTags>>(
        `/api/admin/articles${qs ? `?${qs}` : ''}`
      );
    },
  });
}

export function useAdminArticle(id: string) {
  return useQuery<ArticleWithTags>({
    queryKey: queryKeys.articles.detail(id),
    queryFn: () => apiClient<ArticleWithTags>(`/api/admin/articles/${id}`),
    enabled: !!id,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ArticleCreateInput) =>
      apiClient<ArticleWithTags>('/api/admin/articles', {
        method: 'POST',
        body: data,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ArticleUpdateInput }) =>
      apiClient<ArticleWithTags>(`/api/admin/articles/${id}`, {
        method: 'PUT',
        body: data,
      }),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.articles.detail(variables.id),
      });
    },
  });
}

export function useDeleteArticle(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient<void>(`/api/admin/articles/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      options?.onSuccess?.();
    },
  });
}

export function useRestoreArticle(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient<{ ok: boolean }>(`/api/admin/articles/${id}/restore`, { method: 'PATCH' }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      options?.onSuccess?.();
    },
  });
}

export function useHardDeleteArticle(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient<void>(`/api/admin/articles/${id}/permanent`, { method: 'DELETE' }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      options?.onSuccess?.();
    },
  });
}
