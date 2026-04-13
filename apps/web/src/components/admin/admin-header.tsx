'use client';

import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function AdminHeader({ sidebarOpen, onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="flex h-14 items-center border-b bg-background px-4 lg:hidden">
      <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
        {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        <span className="sr-only">Menu</span>
      </Button>
      <div className="ml-3">
        <Logo variant="horizontal" height={32} />
      </div>
    </header>
  );
}
