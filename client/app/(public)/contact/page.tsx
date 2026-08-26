import React, { Suspense } from 'react';
import { Sparkles, Code2 } from 'lucide-react';
import { FreelanceContactHub } from '@/components/sections/freelance-contact-hub';

export const metadata = {
  title: 'Get in Touch — Satyesh | Freelance Full-Stack Engineer',
  description:
    'Start a project, get a fixed-price proposal, or book a free 30-minute discovery call with Satyesh — full-stack freelance engineer specializing in Next.js, Express, and MongoDB.',
};

function ContactHubFallback() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10 xl:gap-12">
      <div className="space-y-4">
        <div className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        <div className="h-96 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
      <div className="space-y-4">
        <div className="h-48 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        <div className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen relative">
      {/* Ambient background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.06] dark:bg-indigo-500/[0.08] blur-3xl animate-ambient-glow" />
        <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] rounded-full bg-blue-400/[0.05] dark:bg-blue-500/[0.06] blur-3xl" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-10 sm:space-y-14">
        {/* Page Header */}
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/50 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            Freelance Inquiry Portal
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Let&apos;s Build{' '}
            <span className="gradient-accent-text">Something</span>
            <br className="hidden sm:block" /> Exceptional Together
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-2xl">
            Whether you need a full-stack MVP, a high-performance business site, or an architecture consultation — share your goals and I&apos;ll respond with a precise, actionable plan within 24 hours.
          </p>

          {/* Social proof strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
            {[
              { icon: Code2, label: '3+ Years Engineering' },
              { icon: Sparkles, label: 'Fixed-Price Milestones' },
              { icon: Sparkles, label: '100% IP Ownership on Delivery' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                <item.icon className="w-3.5 h-3.5 text-indigo-500" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Contact Hub */}
        <Suspense fallback={<ContactHubFallback />}>
          <FreelanceContactHub />
        </Suspense>
      </div>
    </div>
  );
}
