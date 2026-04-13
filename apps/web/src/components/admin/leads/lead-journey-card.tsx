'use client';

import type { Lead } from '@apio/shared';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPageName } from '@/lib/page-names';

interface LeadJourneyCardProps {
  lead: Lead;
}

export function LeadJourneyCard({ lead }: LeadJourneyCardProps) {
  const pagesViewed = Array.isArray(lead.pagesViewed) ? (lead.pagesViewed as string[]) : [];
  const hasJourneyData = pagesViewed.length > 0 || lead.timeOnSite || lead.referrer || lead.source;
  const hasUtm = lead.utmSource || lead.utmMedium || lead.utmCampaign;

  if (!hasJourneyData && !hasUtm) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Parcours visiteur</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {lead.source && (
          <div>
            <p className="text-sm text-muted-foreground">Source</p>
            <p className="text-sm font-medium">{lead.source}</p>
          </div>
        )}
        {lead.referrer && (
          <div>
            <p className="text-sm text-muted-foreground">Referrer</p>
            <p className="text-sm font-medium break-all">{lead.referrer}</p>
          </div>
        )}
        {lead.timeOnSite != null && (
          <div>
            <p className="text-sm text-muted-foreground">Temps sur le site</p>
            <p className="text-sm font-medium">
              {Math.floor(lead.timeOnSite / 60)}min {lead.timeOnSite % 60}s
            </p>
          </div>
        )}
        {pagesViewed.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Pages vues ({pagesViewed.length})</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5">
              {pagesViewed.map((page, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Badge variant={i === pagesViewed.length - 1 ? 'default' : 'outline'}>
                    {i + 1}. {getPageName(page)}
                  </Badge>
                  {i < pagesViewed.length - 1 && (
                    <>
                      <ChevronRight className="hidden sm:block size-4 text-muted-foreground shrink-0" />
                      <ChevronDown className="sm:hidden size-4 text-muted-foreground shrink-0" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {hasUtm && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">UTM</p>
            <div className="space-y-0.5 text-sm">
              {lead.utmSource && (
                <p>
                  <span className="text-muted-foreground">source:</span> {lead.utmSource}
                </p>
              )}
              {lead.utmMedium && (
                <p>
                  <span className="text-muted-foreground">medium:</span> {lead.utmMedium}
                </p>
              )}
              {lead.utmCampaign && (
                <p>
                  <span className="text-muted-foreground">campaign:</span> {lead.utmCampaign}
                </p>
              )}
              {lead.utmTerm && (
                <p>
                  <span className="text-muted-foreground">term:</span> {lead.utmTerm}
                </p>
              )}
              {lead.utmContent && (
                <p>
                  <span className="text-muted-foreground">content:</span> {lead.utmContent}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
