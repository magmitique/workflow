'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type {
  Lead,
  LeadListQuery,
  LeadStatus,
  PaginatedResponse,
  LeadReplyInput,
} from '@apio/shared';

interface LeadWithNotes extends Lead {
  notes: Array<{
    id: string;
    content: string;
    leadId: string;
    authorId: string;
    createdAt: string;
    author: { id: string; name: string };
  }>;
}

export function useLeads(params: Partial<LeadListQuery> = {}) {
  return useQuery<PaginatedResponse<Lead>>({
    queryKey: queryKeys.leads.list(params),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set('page', String(params.page));
      if (params.limit) searchParams.set('limit', String(params.limit));
      if (params.status) searchParams.set('status', params.status);
      if (params.search) searchParams.set('search', params.search);
      if (params.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      const qs = searchParams.toString();
      return apiClient<PaginatedResponse<Lead>>(`/api/admin/leads${qs ? `?${qs}` : ''}`);
    },
  });
}

export function useLead(id: string) {
  return useQuery<LeadWithNotes>({
    queryKey: queryKeys.leads.detail(id),
    queryFn: () => apiClient<LeadWithNotes>(`/api/admin/leads/${id}`),
    enabled: !!id,
  });
}

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) =>
      apiClient<Lead>(`/api/admin/leads/${id}/status`, {
        method: 'PATCH',
        body: { status },
      }),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.leads.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.leads.detail(variables.id) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats });
    },
  });
}

export function useAddLeadNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      apiClient(`/api/admin/leads/${id}/notes`, {
        method: 'POST',
        body: { content },
      }),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.leads.detail(variables.id) });
    },
  });
}

export function useSendLeadReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...body }: { id: string } & LeadReplyInput) =>
      apiClient<{ success: boolean }>(`/api/admin/leads/${id}/reply`, {
        method: 'POST',
        body,
      }),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.leads.detail(variables.id) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.leads.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats });
    },
  });
}
