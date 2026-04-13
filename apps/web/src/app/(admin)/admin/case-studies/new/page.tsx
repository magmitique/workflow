'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateCaseStudy } from '@/hooks/use-case-studies';
import { CaseStudyForm } from '@/components/admin/case-studies/case-study-form';

export default function NewCaseStudyPage() {
  const router = useRouter();
  const createCaseStudy = useCreateCaseStudy();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
        <Link
          href="/admin/case-studies"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux cas clients
        </Link>
        <h1 className="mt-3 text-2xl font-bold">Nouveau cas client</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Créez une étude de cas pour valoriser une réalisation.
        </p>
      </div>

      <CaseStudyForm
        onSubmit={async (data) => {
          try {
            await createCaseStudy.mutateAsync(data);
            toast.success('Cas client créé');
            router.push('/admin/case-studies');
          } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Erreur lors de la création');
          }
        }}
        isPending={createCaseStudy.isPending}
        submitLabel="Créer le cas client"
      />
    </div>
  );
}
