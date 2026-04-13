'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminArticle, useUpdateArticle, useDeleteArticle } from '@/hooks/use-articles';
import { ArticleForm } from '@/components/admin/articles/article-form';
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
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
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

export default function EditArticlePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: article, isLoading } = useAdminArticle(params.id);
  const updateArticle = useUpdateArticle();
  const deleteArticle = useDeleteArticle();
  const [showDelete, setShowDelete] = useState(false);

  if (isLoading) {
    return <EditSkeleton />;
  }

  if (!article) {
    return (
      <div className="space-y-8">
        <div className="rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FileText className="size-10 text-muted-foreground/30" />
          <p className="mt-3 text-sm font-medium">Article non trouvé</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Cet article n&apos;existe pas ou a été supprimé.
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
            href="/admin/articles"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>
          <h1 className="mt-3 text-2xl font-bold">Modifier l&apos;article</h1>
          <p className="mt-1 text-sm text-muted-foreground">{article.title}</p>
        </div>
        <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>
          Supprimer
        </Button>
      </div>

      <ArticleForm
        initialData={article}
        onSubmit={async (data) => {
          try {
            await updateArticle.mutateAsync({ id: params.id, data });
            toast.success('Article mis à jour');
            router.push('/admin/articles');
          } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
          }
        }}
        isPending={updateArticle.isPending}
        submitLabel="Enregistrer"
      />

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer l&apos;article ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. L&apos;article sera définitivement supprimé.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              disabled={deleteArticle.isPending}
              onClick={async () => {
                try {
                  await deleteArticle.mutateAsync(params.id);
                  toast.success('Article supprimé');
                  router.push('/admin/articles');
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : 'Erreur lors de la suppression');
                }
              }}
            >
              {deleteArticle.isPending ? 'Suppression...' : 'Supprimer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
