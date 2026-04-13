'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/cn';
import { adminNavigation } from '@/data/admin-navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

interface AdminSidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    window.location.href = '/login';
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="border-b border-sidebar-border px-4 py-4">
        <Link href="/admin" onClick={onClose}>
          <Logo variant="horizontal" height={36} />
        </Link>
      </div>

      <nav aria-label="Administration" className="flex-1 space-y-1 px-2 py-4">
        {adminNavigation.map((item) => {
          const isActive =
            item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        {user && <p className="mb-2 truncate text-sm text-sidebar-foreground/70">{user.name}</p>}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}
