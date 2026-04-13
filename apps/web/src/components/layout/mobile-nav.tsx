'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-anthracite-foreground hover:bg-white/10"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-20 z-50 bg-anthracite shadow-lg">
          <nav className="flex flex-col px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-anthracite-foreground transition-colors hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants(), 'mt-4')}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
