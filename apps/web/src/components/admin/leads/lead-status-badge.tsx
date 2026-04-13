'use client';

import { Badge } from '@/components/ui/badge';
import type { LeadStatus } from '@apio/shared';

const statusConfig: Record<
  LeadStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  NEW: { label: 'Nouveau', variant: 'default' },
  CONTACTED: { label: 'Contacté', variant: 'secondary' },
  MEETING: { label: 'Rendez-vous', variant: 'outline' },
  PROPOSAL: { label: 'Proposition', variant: 'outline' },
  WON: { label: 'Gagné', variant: 'default' },
  LOST: { label: 'Perdu', variant: 'destructive' },
};

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
