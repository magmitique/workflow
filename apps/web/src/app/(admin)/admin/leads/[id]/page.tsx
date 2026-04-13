'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';
import { toast } from 'sonner';
import { useLead, useUpdateLeadStatus } from '@/hooks/use-leads';
import { LeadStatusBadge } from '@/components/admin/leads/lead-status-badge';
import { LeadInfoCard } from '@/components/admin/leads/lead-info-card';
import { LeadJourneyCard } from '@/components/admin/leads/lead-journey-card';
import { LeadNotes } from '@/components/admin/leads/lead-notes';
import { LeadReplyForm } from '@/components/admin/leads/lead-reply-form';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { LeadStatus } from '@apio/shared';

function DetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-7 w-64 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-48 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {Array.from({ length: 4 }, (_, j) => (
                  <div key={j} className="h-4 w-full animate-pulse rounded bg-muted" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: lead, isLoading } = useLead(id);
  const updateStatus = useUpdateLeadStatus();

  async function handleStatusChange(newStatus: string) {
    try {
      await updateStatus.mutateAsync({ id, status: newStatus as LeadStatus });
      toast.success('Statut mis à jour');
    } catch {
      toast.error('Erreur lors de la mise à jour du statut');
    }
  }

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!lead) {
    return (
      <div className="space-y-8">
        <div className="rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux leads
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <User className="size-10 text-muted-foreground/30" />
          <p className="mt-3 text-sm font-medium">Lead non trouvé</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Ce lead n&apos;existe pas ou a été supprimé.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux leads
        </Link>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{lead.email}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Créé le {new Date(lead.createdAt).toLocaleString('fr-FR')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LeadStatusBadge status={lead.status} />
            <Select value={lead.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">Nouveau</SelectItem>
                <SelectItem value="CONTACTED">Contacté</SelectItem>
                <SelectItem value="MEETING">Rendez-vous</SelectItem>
                <SelectItem value="PROPOSAL">Proposition</SelectItem>
                <SelectItem value="WON">Gagné</SelectItem>
                <SelectItem value="LOST">Perdu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <LeadInfoCard lead={lead} />
          <LeadJourneyCard lead={lead} />
        </div>
        <div className="space-y-6">
          <LeadReplyForm leadId={id} leadEmail={lead.email} />
          <LeadNotes leadId={id} notes={lead.notes} />
        </div>
      </div>
    </div>
  );
}
