'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import {
  useAdminCaseStudies,
  useDeleteCaseStudy,
  useRestoreCaseStudy,
  useHardDeleteCaseStudy,
} from '@/hooks/use-case-studies';
import { CaseStudyTable } from '@/components/admin/case-studies/case-study-table';
import { DeleteConfirmDialog } from '@/components/admin/delete-confirm-dialog';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { contentStatusSchema } from '@apio/shared';
import type { ContentStatus } from '@apio/shared';
import { toast } from 'sonner';

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

export default function AdminCaseStudiesPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<ContentStatus | 'ALL'>('ALL');
  const [showTrash, setShowTrash] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [hardDeleteId, setHardDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useAdminCaseStudies({
    page,
    limit: 20,
    status: status === 'ALL' ? undefined : status,
    deleted: showTrash ? true : undefined,
  });

  const deleteMutation = useDeleteCaseStudy();
  const restoreMutation = useRestoreCaseStudy();
  const hardDeleteMutation = useHardDeleteCaseStudy();

  const handleDelete = async () => {
    if (!deleteId) return;
    deleteMutation.reset();
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Cas client mis en corbeille');
      setDeleteId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await restoreMutation.mutateAsync(id);
      toast.success('Cas client restauré');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur lors de la restauration');
    }
  };

  const handleHardDelete = async () => {
    if (!hardDeleteId) return;
    hardDeleteMutation.reset();
    try {
      await hardDeleteMutation.mutateAsync(hardDeleteId);
      toast.success('Cas client définitivement supprimé');
      setHardDeleteId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
        <div>
          <h1 className="text-2xl font-bold">
            {showTrash ? 'Corbeille - Cas clients' : 'Cas clients'}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {showTrash
              ? 'Cas clients supprimés. Restaurez ou supprimez définitivement.'
              : 'Publiez des études de cas pour valoriser vos réalisations.'}
          </p>
        </div>
        {!showTrash && (
          <Link href="/admin/case-studies/new" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau cas client
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {!showTrash && (
          <Select
            value={status}
            onValueChange={(v) => {
              const parsed = contentStatusSchema.safeParse(v);
              setStatus(parsed.success ? parsed.data : 'ALL');
              setPage(1);
            }}
          >
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tous les statuts</SelectItem>
              <SelectItem value="DRAFT">Brouillon</SelectItem>
              <SelectItem value="PUBLISHED">Publié</SelectItem>
            </SelectContent>
          </Select>
        )}
        <Button
          variant={showTrash ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            setShowTrash((v) => !v);
            setPage(1);
          }}
          className="sm:ml-auto"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Corbeille
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Secteur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 8 }, (_, i) => (
                  <TableRowSkeleton key={i} cols={6} />
                ))}
              </TableBody>
            </Table>
          ) : data?.data && data.data.length > 0 ? (
            <CaseStudyTable
              data={data.data}
              onDelete={(id) => setDeleteId(id)}
              isTrash={showTrash}
              onRestore={handleRestore}
              onHardDelete={(id) => setHardDeleteId(id)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Briefcase className="size-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm font-medium">
                {showTrash ? 'La corbeille est vide' : 'Aucun cas client trouvé'}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {showTrash
                  ? 'Les cas clients supprimés apparaîtront ici.'
                  : 'Créez votre première étude de cas ou ajustez vos filtres.'}
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

      {/* Soft-delete confirmation */}
      <DeleteConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        mutation={deleteMutation}
        title="Supprimer le cas client ?"
        description="Le cas client sera déplacé dans la corbeille. Vous pourrez le restaurer ultérieurement."
      />

      {/* Hard-delete confirmation */}
      <DeleteConfirmDialog
        open={!!hardDeleteId}
        onClose={() => setHardDeleteId(null)}
        onConfirm={handleHardDelete}
        mutation={hardDeleteMutation}
        title="Supprimer définitivement le cas client ?"
        description="Cette action est irréversible. Le cas client et ses images seront définitivement supprimés."
      />
    </div>
  );
}
