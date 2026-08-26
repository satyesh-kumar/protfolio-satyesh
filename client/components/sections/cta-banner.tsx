'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Linkedin,
} from 'lucide-react';

export function CallToActionBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6">
      {/* Outer Gradient Glowing Frame */}
      <div className="p-[1px] rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 shadow-2xl shadow-indigo-500/20">
        {/* Inner Card Container */}
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-slate-950 dark:bg-[#060912] text-white p-10 md:p-16 text-center space-y-7 backdrop-blur-2xl">
          {/* Ambient Lighting Spotlights */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-r from-blue-600/30 via-indigo-600/35 to-cyan-400/25 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/70 text-xs font-semibold text-emerald-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Available for New Freelance &amp; Contract Work</span>
            </div>

            {/* Main Display Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Have a project in mind? <br />
              <span className="gradient-accent-text font-serif italic font-normal">Let&apos;s build</span> something extraordinary.
            </h2>

            {/* Action Buttons Row */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
              <Link href="/contact">
                <Button size="lg" variant="primary" className="h-12 px-7 rounded-xl text-sm font-bold shadow-xl shadow-indigo-500/30 group">
                  Start a Project
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <a
                href="https://api.whatsapp.com/send?text=Hi%20Satyesh,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!"
                target="_blank"
                rel="noreferrer"
                className="h-12 px-5 rounded-xl border border-emerald-500/40 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 text-sm font-bold flex items-center gap-2 transition-all shadow-md"
                title="Chat directly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Chat</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-12 px-5 rounded-xl border border-blue-500/40 bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 text-sm font-bold flex items-center gap-2 transition-all shadow-md"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-current text-blue-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
