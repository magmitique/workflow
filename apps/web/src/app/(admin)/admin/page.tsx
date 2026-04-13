'use client';

import Link from 'next/link';
import { Users, UserPlus, Handshake, Trophy, ArrowRight } from 'lucide-react';
import { useDashboardStats } from '@/hooks/use-dashboard-stats';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

const statusLabels: Record<string, string> = {
  NEW: 'Nouveau',
  CONTACTED: 'Contacté',
  MEETING: 'Rendez-vous',
  PROPOSAL: 'Proposition',
  WON: 'Gagné',
  LOST: 'Perdu',
};

const statusVariants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  NEW: 'default',
  CONTACTED: 'secondary',
  MEETING: 'outline',
  PROPOSAL: 'outline',
  WON: 'default',
  LOST: 'destructive',
};

const statCards = [
  {
    key: 'total',
    label: 'Total leads',
    description: 'Tous les contacts',
    icon: Users,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    key: 'new',
    label: 'Nouveaux',
    description: 'En attente de contact',
    icon: UserPlus,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
  },
  {
    key: 'inProgress',
    label: 'En cours',
    description: 'Contactés + rendez-vous',
    icon: Handshake,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600',
  },
  {
    key: 'won',
    label: 'Gagnés',
    description: 'Convertis en clients',
    icon: Trophy,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600',
  },
] as const;

function StatCardSkeleton() {
  return (
    <Card className="hover:shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            <div className="h-7 w-12 animate-pulse rounded bg-muted" />
            <div className="h-3 w-28 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TableRowSkeleton() {
  return (
    <TableRow>
      {Array.from({ length: 4 }, (_, i) => (
        <TableCell key={i}>
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();
  const { user } = useAuth();

  const newCount = stats?.byStatus['NEW'] ?? 0;
  const contactedCount = stats?.byStatus['CONTACTED'] ?? 0;
  const meetingCount = stats?.byStatus['MEETING'] ?? 0;
  const wonCount = stats?.byStatus['WON'] ?? 0;

  const statValues: Record<string, number> = {
    total: stats?.total ?? 0,
    new: newCount,
    inProgress: contactedCount + meetingCount,
    won: wonCount,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
        <h1 className="text-2xl font-bold">
          {user?.name
            ? `${new Date().getHours() < 12 ? 'Bonjour' : new Date().getHours() < 18 ? 'Bon après-midi' : 'Bonsoir'}, ${user.name.split(' ')[0]}`
            : 'Dashboard'}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vue d&apos;ensemble de votre activité commerciale.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => <StatCardSkeleton key={i} />)
          : statCards.map((card) => (
              <Card key={card.key} className="hover:shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                        card.iconBg
                      )}
                    >
                      <card.icon className={cn('size-6', card.iconColor)} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                      <p className="text-3xl font-bold tracking-tight">{statValues[card.key]}</p>
                      <p className="text-xs text-muted-foreground">{card.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Recent leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Leads récents</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Les derniers contacts reçus via le site.
            </p>
          </div>
          <Link href="/admin/leads" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            Voir tout
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }, (_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </TableBody>
            </Table>
          ) : stats?.recent && stats.recent.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recent.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {lead.email}
                      </Link>
                    </TableCell>
                    <TableCell>{lead.company ?? '-'}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[lead.status] ?? 'secondary'}>
                        {statusLabels[lead.status] ?? lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="size-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm font-medium">Aucun lead pour le moment</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Les contacts apparaîtront ici dès qu&apos;un formulaire sera soumis.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
