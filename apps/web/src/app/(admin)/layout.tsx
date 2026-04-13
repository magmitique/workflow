'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Toaster } from '@/components/ui/sonner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Redirection...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r lg:block">
        <AdminSidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </>
      )}

      <div className="flex flex-1 flex-col">
        <AdminHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 bg-muted/40 p-6">{children}</main>
      </div>

      <Toaster />
    </div>
  );
}
