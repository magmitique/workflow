'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type { User, UserCreateInput, UserUpdateInput } from '@apio/shared';

export function useUsers() {
  return useQuery<User[]>({
    queryKey: queryKeys.users.list,
    queryFn: () => apiClient<User[]>('/api/admin/users'),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, UserCreateInput>({
    mutationFn: (data) => apiClient<User>('/api/admin/users', { method: 'POST', body: data }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, { id: string; data: UserUpdateInput }>({
    mutationFn: ({ id, data }) =>
      apiClient<User>(`/api/admin/users/${id}`, { method: 'PUT', body: data }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient<void>(`/api/admin/users/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}
