'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Briefcase,
  Inbox,
  MessageSquareQuote,
  Settings,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';

const adminNav = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Services', href: '/admin/services', icon: Wrench },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-brand-bg-secondary/40 dark:bg-brand-dark-bg text-brand-text dark:text-brand-dark-text flex flex-col">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-50 bg-brand-card dark:bg-brand-dark-card border-b border-brand-border dark:border-brand-dark-border px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-brand-text dark:text-brand-dark-text">
              SATYESH<span className="text-brand-blue">.</span>
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-brand-blue border border-blue-200 dark:border-blue-800">
              Admin CMS
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/">
            <Button size="sm" variant="outline">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Public Site
            </Button>
          </Link>
        </div>
      </header>

      {/* Admin Navigation Sidebar & Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0 space-y-1">
          <div className="p-3 mb-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/60 text-xs text-brand-blue flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="font-semibold">Clerk Authorized Access</span>
          </div>

          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-brand-blue text-white shadow-sm font-semibold'
                      : 'text-brand-muted dark:text-brand-dark-muted hover:bg-brand-card dark:hover:bg-brand-dark-card hover:text-brand-text'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Admin Workspace Container */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
