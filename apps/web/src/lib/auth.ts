import { apiClient } from './api-client';
import type { LoginInput, User } from '@apio/shared';

export async function login(credentials: LoginInput): Promise<{ user: User }> {
  return apiClient<{ user: User }>('/api/auth/login', {
    method: 'POST',
    body: credentials,
  });
}

export async function logout(): Promise<void> {
  await apiClient<{ success: boolean }>('/api/auth/logout', {
    method: 'POST',
  });
}

export async function fetchCurrentUser(): Promise<User> {
  const data = await apiClient<{ user: User }>('/api/auth/me');
  return data.user;
}
