'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#090D16]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo / Wordmark */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white font-black text-sm">
              S
            </div>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            SATYESH<span className="text-cyan-500 dark:text-cyan-400">.</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50/90 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Full-Stack Architect</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 bg-slate-100/60 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-white/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact">
            <Button size="sm" variant="primary" className="group">
              Start a Project
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none border border-slate-200 dark:border-white/10"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen ? (
        <div className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive(item.href)
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Start a Project
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

