import Link from 'next/link';
import { NAV_ITEMS } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

import { MobileNav } from './mobile-nav';

export function PublicHeader() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-anthracite text-anthracite-foreground">
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4"
        >
          <Link href="/" aria-label="Apio systems - Accueil">
            <Logo variant="horizontal" height={52} priority className="-mt-1" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-anthracite-foreground/80 transition-colors hover:bg-white/10 hover:text-anthracite-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: 'sm' }), 'hidden md:inline-flex')}
            >
              Contact
            </Link>
            <MobileNav />
          </div>
        </nav>
        <div className="h-0.5 bg-gradient-to-r from-primary via-brand-yellow to-transparent" />
      </header>
    </>
  );
}
