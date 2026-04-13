'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

interface UploadResponse {
  url: string;
}

export function useUploadImage() {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadResponse> => {
      const formData = new FormData();
      formData.append('file', file);

      return apiClient<UploadResponse>('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
    },
  });
}

export function useDeleteImage() {
  return useMutation({
    mutationFn: async (url: string): Promise<void> => {
      await apiClient('/api/admin/upload', {
        method: 'DELETE',
        body: { url },
      });
    },
  });
}
