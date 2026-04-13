'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type {
  CaseStudy,
  CaseStudyListQuery,
  CaseStudyCreateInput,
  CaseStudyUpdateInput,
  CaseStudyResult,
  PaginatedResponse,
} from '@apio/shared';

interface CaseStudyWithResults extends CaseStudy {
  results: CaseStudyResult[];
}

export function useAdminCaseStudies(params: Partial<CaseStudyListQuery> = {}) {
  return useQuery<PaginatedResponse<CaseStudyWithResults>>({
    queryKey: queryKeys.caseStudies.list(params),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set('page', String(params.page));
      if (params.limit) searchParams.set('limit', String(params.limit));
      if (params.status) searchParams.set('status', params.status);
      if (params.sector) searchParams.set('sector', params.sector);
      if (params.featured !== undefined) searchParams.set('featured', String(params.featured));
      if (params.deleted !== undefined) searchParams.set('deleted', String(params.deleted));
      if (params.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      const qs = searchParams.toString();
      return apiClient<PaginatedResponse<CaseStudyWithResults>>(
        `/api/admin/case-studies${qs ? `?${qs}` : ''}`
      );
    },
  });
}

export function useAdminCaseStudy(id: string) {
  return useQuery<CaseStudyWithResults>({
    queryKey: queryKeys.caseStudies.detail(id),
    queryFn: () => apiClient<CaseStudyWithResults>(`/api/admin/case-studies/${id}`),
    enabled: !!id,
  });
}

export function useCreateCaseStudy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CaseStudyCreateInput) =>
      apiClient<CaseStudyWithResults>('/api/admin/case-studies', {
        method: 'POST',
        body: data,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
    },
  });
}

export function useUpdateCaseStudy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CaseStudyUpdateInput }) =>
      apiClient<CaseStudyWithResults>(`/api/admin/case-studies/${id}`, {
        method: 'PUT',
        body: data,
      }),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.caseStudies.detail(variables.id),
      });
    },
  });
}

export function useDeleteCaseStudy(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient<void>(`/api/admin/case-studies/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
      options?.onSuccess?.();
    },
  });
}

export function useRestoreCaseStudy(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient<{ ok: boolean }>(`/api/admin/case-studies/${id}/restore`, { method: 'PATCH' }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
      options?.onSuccess?.();
    },
  });
}

export function useHardDeleteCaseStudy(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient<void>(`/api/admin/case-studies/${id}/permanent`, { method: 'DELETE' }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
      options?.onSuccess?.();
    },
  });
}
