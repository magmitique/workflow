import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { Section } from '@/components/ui/section';
import { H1, P } from '@/components/ui/typography';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <PublicHeader />
      <main className="flex-1">
        <Section className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <FileQuestion className="h-24 w-24 text-primary/30" />
            <H1 className="mt-6 text-3xl font-bold">Page introuvable</H1>
            <P className="mt-3 max-w-md text-muted-foreground">
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
            </P>
            <Link href="/" className={buttonVariants({ size: 'lg', className: 'mt-8' })}>
              Retour à l&apos;accueil
            </Link>
          </div>
        </Section>
      </main>
      <PublicFooter />
    </>
  );
}
