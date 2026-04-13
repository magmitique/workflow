'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import { useLeads } from '@/hooks/use-leads';
import { LeadTable } from '@/components/admin/leads/lead-table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { LeadStatus } from '@apio/shared';

function TableRowSkeleton({ cols }: { cols: number }) {
  return (
    <TableRow>
      {Array.from({ length: cols }, (_, i) => (
        <TableCell key={i}>
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function LeadsListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<LeadStatus | 'ALL'>('ALL');

  const { data, isLoading } = useLeads({
    page,
    limit: 20,
    search: search || undefined,
    status: status === 'ALL' ? undefined : status,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
        <h1 className="text-2xl font-bold">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gérez les contacts reçus via le site.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="sm:max-w-xs"
        />
        <Select
          value={status}
          onValueChange={(v) => {
            setStatus(v as LeadStatus | 'ALL');
            setPage(1);
          }}
        >
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tous les statuts</SelectItem>
            <SelectItem value="NEW">Nouveau</SelectItem>
            <SelectItem value="CONTACTED">Contacté</SelectItem>
            <SelectItem value="MEETING">Rendez-vous</SelectItem>
            <SelectItem value="PROPOSAL">Proposition</SelectItem>
            <SelectItem value="WON">Gagné</SelectItem>
            <SelectItem value="LOST">Perdu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Besoin</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 8 }, (_, i) => (
                  <TableRowSkeleton key={i} cols={6} />
                ))}
              </TableBody>
            </Table>
          ) : data?.data && data.data.length > 0 ? (
            <LeadTable data={data.data} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="size-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm font-medium">Aucun lead trouvé</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Ajustez vos filtres ou attendez de nouveaux contacts.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {data && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {data.pagination.page} sur {data.pagination.totalPages} ({data.pagination.total}{' '}
            résultats)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= data.pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
