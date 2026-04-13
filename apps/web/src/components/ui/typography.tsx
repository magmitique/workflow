import * as React from 'react';
import { cn } from '@/lib/cn';

function H1({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1 className={cn('text-3xl font-bold tracking-tight sm:text-4xl', className)} {...props} />
  );
}

function H2({ className, ...props }: React.ComponentProps<'h2'>) {
  return <h2 className={cn('text-xl font-bold', className)} {...props} />;
}

function H3({ className, ...props }: React.ComponentProps<'h3'>) {
  return <h3 className={cn('font-bold', className)} {...props} />;
}

function P({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('font-medium text-muted-foreground', className)} {...props} />;
}

function Blockquote({ className, ...props }: React.ComponentProps<'blockquote'>) {
  return <blockquote className={cn('border-l-4 border-primary pl-6', className)} {...props} />;
}

function UL({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={cn('space-y-3', className)} {...props} />;
}

function LI({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={cn('', className)} {...props} />;
}

function InlineCode({ className, ...props }: React.ComponentProps<'code'>) {
  return (
    <code
      className={cn('bg-muted rounded px-1.5 py-0.5 text-sm font-mono', className)}
      {...props}
    />
  );
}

export { H1, H2, H3, P, Blockquote, UL, LI, InlineCode };
