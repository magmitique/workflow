'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { login as loginFn, logout as logoutFn, fetchCurrentUser } from '@/lib/auth';
import { queryKeys } from '@/lib/query-keys';
import type { LoginInput, User } from '@apio/shared';

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: queryKeys.auth.me,
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const login = useCallback(
    async (credentials: LoginInput) => {
      const { user: loggedInUser } = await loginFn(credentials);
      queryClient.setQueryData(queryKeys.auth.me, loggedInUser);
      return loggedInUser;
    },
    [queryClient]
  );

  const logout = useCallback(async () => {
    await logoutFn();
    queryClient.clear();
  }, [queryClient]);

  return {
    user: user ?? null,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
