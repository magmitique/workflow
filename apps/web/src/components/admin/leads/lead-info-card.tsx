'use client';

import type { Lead } from '@apio/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LeadInfoCardProps {
  lead: Lead;
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  );
}

export function LeadInfoCard({ lead }: LeadInfoCardProps) {
  const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Informations contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <InfoRow label="Nom" value={name || null} />
        <InfoRow label="Email" value={lead.email} />
        <InfoRow label="Téléphone" value={lead.phone} />
        <InfoRow label="Entreprise" value={lead.company} />
        <InfoRow label="Taille" value={lead.companySize} />
        <InfoRow label="Secteur" value={lead.sector} />
        <InfoRow label="Besoin" value={lead.needType} />
        <InfoRow label="Budget" value={lead.budgetRange} />
        <InfoRow label="Délai" value={lead.timeline} />
        {lead.message && (
          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-1">Message</p>
            <p className="text-sm whitespace-pre-wrap rounded bg-muted p-3">{lead.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
