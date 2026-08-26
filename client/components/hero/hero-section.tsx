'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteSettings } from '@/types';
import { HeroVisual } from './hero-visual';
import { Button } from '@/components/ui/button';
import { InteractiveGrid } from '@/components/ui/interactive-grid';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Linkedin,
  MessageCircle,
  Trophy,
  Code2,
} from 'lucide-react';

interface HeroSectionProps {
  settings: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Background Lighting Spotlights & Interactive Grid */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/15 dark:bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-indigo-600/15 dark:bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />
      <InteractiveGrid />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
        {/* Left Column - High Impact Hero Messaging & Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-7 sm:space-y-8"
        >
          {/* Status & Trust Connection Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Availability Badge */}
            <div className="h-9 px-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/60 backdrop-blur-md text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-sm flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>{settings.availabilityStatus || 'Available for New Opportunities'}</span>
            </div>

            {/* Direct LinkedIn Pill */}
            <a
              href={settings.linkedinUrl || 'https://linkedin.com'}
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3.5 rounded-full border border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/50 backdrop-blur-md text-xs font-semibold text-blue-600 dark:text-blue-400 hover:border-blue-500/60 hover:-translate-y-0.5 transition-all duration-200 shadow-sm flex items-center gap-1.5"
              title="Connect directly on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 fill-current shrink-0" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 opacity-70 shrink-0" />
            </a>

            {/* Direct WhatsApp Pill */}
            <a
              href={settings.whatsappUrl || 'https://api.whatsapp.com/send?phone=917307440594&text=Hi%20Satyesh,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!'}
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/50 backdrop-blur-md text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/60 hover:-translate-y-0.5 transition-all duration-200 shadow-sm flex items-center gap-1.5"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Headline & High-Impact Subtitle */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12] sm:leading-[1.1]">
              I build{' '}
              <span className="gradient-accent-text font-serif italic font-normal">
                production-ready
              </span>{' '}
              full stack web applications.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-medium">
              Full Stack MERN Developer specializing in React.js, Node.js, Express.js, MongoDB, and secure RESTful API architectures.
            </p>
          </div>

          {/* Magnetic Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link href="/contact">
              <Button
                size="lg"
                className="h-12 sm:h-13 px-7 sm:px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-extrabold shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group border-0 flex items-center gap-2.5"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </Button>
            </Link>

            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-13 px-7 sm:px-8 rounded-2xl border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800/90 text-slate-900 dark:text-white text-sm font-bold shadow-md hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200 flex items-center gap-2 backdrop-blur-md"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-500" />
              </Button>
            </Link>
          </div>

          {/* Interactive Metric Cards Strip */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-xl">
            {/* Metric 1 */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0B101D]/90 border border-slate-200/90 dark:border-slate-800 backdrop-blur-xl transition-all duration-200 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 group flex flex-col justify-between">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white flex items-center justify-between">
                <span>250+</span>
                <Sparkles className="w-4 h-4 text-indigo-500 group-hover:rotate-12 group-hover:scale-110 transition-transform shrink-0" />
              </div>
              <div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mt-1.5">DSA Problems</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">Java Problem Solver</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0B101D]/90 border border-slate-200/90 dark:border-slate-800 backdrop-blur-xl transition-all duration-200 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 group flex flex-col justify-between">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white flex items-center justify-between">
                <span>Rank 30</span>
                <Trophy className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform shrink-0" />
              </div>
              <div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mt-1.5">GeeksforGeeks</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">Institute Rank</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0B101D]/90 border border-slate-200/90 dark:border-slate-800 backdrop-blur-xl transition-all duration-200 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 group flex flex-col justify-between">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white flex items-center justify-between">
                <span>MERN</span>
                <Code2 className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
              <div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mt-1.5">Full Stack</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">CodeVirus Intern</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Hero Visual Interactive Studio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
