'use client';

import { Badge } from '@/components/ui/badge';
import type { ContentStatus } from '@apio/shared';

const statusConfig: Record<
  ContentStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  DRAFT: { label: 'Brouillon', variant: 'secondary' },
  PUBLISHED: { label: 'Publié', variant: 'default' },
};

interface ContentStatusBadgeProps {
  status: ContentStatus;
}

export function ContentStatusBadge({ status }: ContentStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
