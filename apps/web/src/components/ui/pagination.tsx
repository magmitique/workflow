import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildUrl: (page: number) => string;
}

export function Pagination({ currentPage, totalPages, buildUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1">
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
          aria-label="Page précédente"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'pointer-events-none opacity-50'
          )}
          aria-disabled="true"
        >
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">
            &hellip;
          </span>
        ) : (
          <Link
            key={page}
            href={buildUrl(page as number)}
            className={cn(
              buttonVariants({ variant: page === currentPage ? 'default' : 'ghost', size: 'icon' })
            )}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
          aria-label="Page suivante"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'pointer-events-none opacity-50'
          )}
          aria-disabled="true"
        >
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}

/** Build a compact page number list with ellipsis: [1, '...', 4, 5, 6, '...', 10] */
function getPageNumbers(current: number, total: number): Array<number | '...'> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: Array<number | '...'> = [1];

  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push('...');

  pages.push(total);

  return pages;
}
