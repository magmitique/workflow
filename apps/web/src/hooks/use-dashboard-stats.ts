'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type { Lead } from '@apio/shared';

interface DashboardStats {
  total: number;
  byStatus: Record<string, number>;
  recent: Lead[];
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: queryKeys.dashboard.stats,
    queryFn: () => apiClient<DashboardStats>('/api/admin/leads/stats'),
  });
}
