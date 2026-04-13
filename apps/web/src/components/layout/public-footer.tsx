import Link from 'next/link';
import { Heart } from 'lucide-react';
import { FOOTER_NAV } from '@/data/navigation';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/ui/logo';
import { P, UL, LI } from '@/components/ui/typography';

export function PublicFooter() {
  return (
    <footer className="bg-anthracite text-anthracite-foreground">
      <div className="h-0.5 bg-gradient-to-l from-primary via-brand-yellow to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div>
            <Logo variant="rectangular" height={88} />
            <P className="mt-4 max-w-xs text-sm text-anthracite-foreground/70">
              Votre DSI externalisé pour Artisans, TPE et PME. Audit, infogérance, présence en ligne,
              délivrabilité email.
            </P>
          </div>
          <nav
            aria-label="Pied de page"
            className="col-span-full grid gap-8 md:col-span-3 md:grid-cols-2 lg:col-span-4 lg:grid-cols-4"
          >
            {FOOTER_NAV.map((group) => (
              <div key={group.label}>
                <P className="text-sm font-semibold">{group.label}</P>
                <UL className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <LI key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-anthracite-foreground/60 transition-colors hover:text-anthracite-foreground"
                      >
                        {item.label}
                      </Link>
                    </LI>
                  ))}
                </UL>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <Separator className="bg-anthracite-foreground/15" />
      <div className="flex flex-col items-center gap-1 px-4 py-4 text-xs text-anthracite-foreground/60">
        <span>&copy; 2015 - {new Date().getFullYear()} Apio systems. Tous droits réservés.</span>
        <span className="inline-flex items-center gap-1">
          Fait avec{' '}
          <Heart className="inline h-3 w-3 fill-red-500 text-red-500" aria-label="amour" /> par{' '}
          <a
            href="https://datarooster.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-anthracite-foreground"
          >
            Data Rooster
          </a>
        </span>
      </div>
    </footer>
  );
}
