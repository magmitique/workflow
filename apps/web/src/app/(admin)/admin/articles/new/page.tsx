'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateArticle } from '@/hooks/use-articles';
import { ArticleForm } from '@/components/admin/articles/article-form';

export default function NewArticlePage() {
  const router = useRouter();
  const createArticle = useCreateArticle();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux articles
        </Link>
        <h1 className="mt-3 text-2xl font-bold">Nouvel article</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Rédigez et publiez un nouvel article de blog.
        </p>
      </div>

      <ArticleForm
        onSubmit={async (data) => {
          try {
            await createArticle.mutateAsync(data);
            toast.success('Article créé');
            router.push('/admin/articles');
          } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Erreur lors de la création');
          }
        }}
        isPending={createArticle.isPending}
        submitLabel="Créer l'article"
      />
    </div>
  );
}
