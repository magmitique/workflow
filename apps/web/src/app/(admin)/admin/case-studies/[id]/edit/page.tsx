'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import {
  useAdminCaseStudy,
  useUpdateCaseStudy,
  useDeleteCaseStudy,
} from '@/hooks/use-case-studies';
import { CaseStudyForm } from '@/components/admin/case-studies/case-study-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function EditSkeleton() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
        <div className="h-4 w-36 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-7 w-56 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-44 animate-pulse rounded bg-muted" />
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-10 w-full animate-pulse rounded bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EditCaseStudyPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: caseStudy, isLoading } = useAdminCaseStudy(params.id);
  const updateCaseStudy = useUpdateCaseStudy();
  const deleteCaseStudy = useDeleteCaseStudy();
  const [showDelete, setShowDelete] = useState(false);

  if (isLoading) {
    return <EditSkeleton />;
  }

  if (!caseStudy) {
    return (
      <div className="space-y-8">
        <div className="rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
          <Link
            href="/admin/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux cas clients
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Briefcase className="size-10 text-muted-foreground/30" />
          <p className="mt-3 text-sm font-medium">Cas client non trouvé</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Ce cas client n&apos;existe pas ou a été supprimé.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
        <div>
          <Link
            href="/admin/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux cas clients
          </Link>
          <h1 className="mt-3 text-2xl font-bold">Modifier le cas client</h1>
          <p className="mt-1 text-sm text-muted-foreground">{caseStudy.title}</p>
        </div>
        <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>
          Supprimer
        </Button>
      </div>

      <CaseStudyForm
        initialData={{
          ...caseStudy,
          techStack: Array.isArray(caseStudy.techStack) ? (caseStudy.techStack as string[]) : null,
        }}
        onSubmit={async (data) => {
          try {
            await updateCaseStudy.mutateAsync({ id: params.id, data });
            toast.success('Cas client mis à jour');
            router.push('/admin/case-studies');
          } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
          }
        }}
        isPending={updateCaseStudy.isPending}
        submitLabel="Enregistrer"
      />

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le cas client ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Le cas client sera définitivement supprimé.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              disabled={deleteCaseStudy.isPending}
              onClick={async () => {
                try {
                  await deleteCaseStudy.mutateAsync(params.id);
                  toast.success('Cas client supprimé');
                  router.push('/admin/case-studies');
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : 'Erreur lors de la suppression');
                }
              }}
            >
              {deleteCaseStudy.isPending ? 'Suppression...' : 'Supprimer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
