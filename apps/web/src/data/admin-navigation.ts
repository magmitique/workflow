import { LayoutDashboard, Users, FileText, Briefcase, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const adminNavigation: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Articles', href: '/admin/articles', icon: FileText },
  { label: 'Cas clients', href: '/admin/case-studies', icon: Briefcase },
  { label: 'Administrateurs', href: '/admin/users', icon: Shield },
];
