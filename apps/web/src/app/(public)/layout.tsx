import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { JourneyTracker } from '@/components/journey-tracker';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JourneyTracker />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Aller au contenu
      </a>
      <PublicHeader />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <PublicFooter />
    </>
  );
}
