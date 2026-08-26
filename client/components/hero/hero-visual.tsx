'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  Cpu,
  Activity,
  Sparkles,
  ShieldCheck,
  Zap,
  Star,
  Layers,
  Globe,
  TrendingUp,
  BarChart3,
  Server,
  Database,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Smartphone,
  Check,
} from 'lucide-react';

export function HeroVisual() {
  const [activeTab, setActiveTab] = useState<'apps' | 'radar' | 'metrics'>('apps');
  const [activeApp, setActiveApp] = useState<'saas' | 'ecommerce' | 'ai'>('saas');
  const [selectedTech, setSelectedTech] = useState<string>('Next.js 14');
  const [hotspotInfo, setHotspotInfo] = useState<string | null>(null);

  const appsData = {
    saas: {
      name: 'Analytics SaaS Platform',
      revenue: '$148,290',
      growth: '+32.4%',
      users: '18.4k',
      hotspots: [
        { label: 'Next.js 14 SSR', detail: 'Sub-50ms initial page load with edge caching' },
        { label: 'Clerk Auth', detail: 'Enterprise-grade user authentication & role RBAC' },
        { label: 'MongoDB Cluster', detail: 'Scalable document schema with auto-indexing' },
      ],
    },
    ecommerce: {
      name: 'E-Commerce Storefront',
      revenue: '$89,400',
      growth: '+18.6%',
      users: '12.1k',
      hotspots: [
        { label: 'Stripe Payments', detail: 'Secure multi-currency checkout workflow' },
        { label: 'Tailwind UI', detail: '100% responsive fluid mobile design system' },
        { label: 'Cloudinary CDN', detail: 'Auto-optimized webp image compression' },
      ],
    },
    ai: {
      name: 'AI Automation Dashboard',
      revenue: '$210,000',
      growth: '+45.2%',
      users: '24.9k',
      hotspots: [
        { label: 'Express REST API', detail: 'Asynchronous event-driven microservices' },
        { label: 'TypeScript Strict', detail: '100% type-safe payload validation' },
        { label: 'WebSockets', detail: 'Real-time bidirectional streaming updates' },
      ],
    },
  };

  const techDetails: Record<string, { role: string; desc: string }> = {
    'Next.js 14': { role: 'Frontend Framework', desc: 'App Router, Server Components & Edge SSR for maximum speed.' },
    'React 18': { role: 'UI Library', desc: 'Concurrent rendering, custom hooks, and reactive UI state.' },
    'TypeScript': { role: 'Type Safety', desc: '100% strict type safety eliminating runtime type bugs.' },
    'Node.js': { role: 'Backend Runtime', desc: 'High-throughput asynchronous JavaScript server engine.' },
    'Express.js': { role: 'API Framework', desc: 'Robust RESTful API endpoints and middleware architecture.' },
    'MongoDB': { role: 'Database', desc: 'Flexible NoSQL document store with optimized Mongoose schemas.' },
    'Tailwind CSS': { role: 'Styling', desc: 'Custom design systems, glassmorphism, and responsive utility layout.' },
    'Clerk Auth': { role: 'Security', desc: 'Secure session management, OAuth 2.0, and protected routes.' },
  };

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Ambient Radial Lighting Backdrop */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-400 rounded-[2.5rem] blur-2xl opacity-30 dark:opacity-40 animate-ambient-glow pointer-events-none" />

      {/* Main Glass Visual Container */}
      <div className="relative rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Studio Window Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0D1322] border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center gap-1 bg-[#060911] p-1 rounded-xl border border-slate-800/90 text-xs font-sans">
            <button
              onClick={() => setActiveTab('apps')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'apps'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Apps Showcase</span>
            </button>

            <button
              onClick={() => setActiveTab('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'radar'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Tech Radar</span>
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'metrics'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Metrics</span>
            </button>
          </div>

          {/* Status Indicator Pill */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Production SLA</span>
          </div>
        </div>

        {/* Tab Canvas Content */}
        <div className="p-6 min-h-[400px] flex flex-col justify-between relative font-sans text-xs text-slate-300">
          <AnimatePresence mode="wait">
            {/* TAB 1: FEATURED APPS SHOWCASE */}
            {activeTab === 'apps' && (
              <motion.div
                key="apps-tab"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* App View Sub-Selector */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(['saas', 'ecommerce', 'ai'] as const).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          setActiveApp(key);
                          setHotspotInfo(null);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                          activeApp === key
                            ? 'bg-slate-800 text-indigo-300 border border-indigo-500/40'
                            : 'text-slate-400 hover:text-slate-200 bg-slate-900/50 border border-slate-800'
                        }`}
                      >
                        {key === 'saas' ? 'Analytics SaaS' : key === 'ecommerce' ? 'E-Commerce' : 'AI Platform'}
                      </button>
                    ))}
                  </div>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Live Preview
                  </span>
                </div>

                {/* Mockup Dashboard Card */}
                <div className="p-5 rounded-2xl bg-[#060911] border border-slate-800 space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        {appsData[activeApp].name}
                        <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 text-[10px]">v2.4 Active</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">High-conversion web app built with Next.js 14</div>
                    </div>
                    <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {appsData[activeApp].growth}
                    </span>
                  </div>

                  {/* Dashboard Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Arr / Revenue</div>
                      <div className="text-base font-extrabold text-white mt-1">{appsData[activeApp].revenue}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Active Users</div>
                      <div className="text-base font-extrabold text-indigo-300 mt-1">{appsData[activeApp].users}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Performance</div>
                      <div className="text-base font-extrabold text-emerald-400 mt-1">99.8% Speed</div>
                    </div>
                  </div>

                  {/* Feature Hotspots Pill Row */}
                  <div className="pt-2">
                    <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Click Feature Hotspots to Inspect:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {appsData[activeApp].hotspots.map((hs) => (
                        <button
                          key={hs.label}
                          onClick={() => setHotspotInfo(hotspotInfo === hs.detail ? null : hs.detail)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                            hotspotInfo === hs.detail
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/40'
                              : 'bg-indigo-950/40 text-indigo-300 border-indigo-800/60 hover:border-indigo-500'
                          }`}
                        >
                          <Zap className="w-3 h-3 text-indigo-400" />
                          <span>{hs.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hotspot Tooltip Detail Banner */}
                  {hotspotInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 text-xs flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{hotspotInfo}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 2: TECH RADAR ORBIT */}
            {activeTab === 'radar' && (
              <motion.div
                key="radar-tab"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="text-center text-slate-400 text-xs">
                  Click any technology node to view architectural role
                </div>

                {/* Tech Chips Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.keys(techDetails).map((tech) => {
                    const isSelected = selectedTech === tech;
                    return (
                      <button
                        key={tech}
                        onClick={() => setSelectedTech(tech)}
                        className={`p-3 rounded-xl text-center font-semibold text-xs transition-all border ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 scale-[1.03]'
                            : 'bg-[#060911] text-slate-300 border-slate-800 hover:border-indigo-500/50'
                        }`}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Tech Card */}
                {selectedTech && techDetails[selectedTech] && (
                  <motion.div
                    key={selectedTech}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-[#060911] border border-indigo-500/40 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{selectedTech}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 text-[11px] font-semibold border border-indigo-800/60">
                        {techDetails[selectedTech].role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {techDetails[selectedTech].desc}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* TAB 3: SYSTEM METRICS */}
            {activeTab === 'metrics' && (
              <motion.div
                key="metrics-tab"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="text-center text-slate-400 text-xs">
                  Real-time production system performance analytics
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Gauge 1: Lighthouse */}
                  <div className="p-4 rounded-2xl bg-[#060911] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold text-xs">Lighthouse Perf</span>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-400">100/100</div>
                    <p className="text-[11px] text-slate-400">Optimized asset bundles &amp; SSR</p>
                  </div>

                  {/* Gauge 2: Latency */}
                  <div className="p-4 rounded-2xl bg-[#060911] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold text-xs">API Response</span>
                      <Zap className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-3xl font-extrabold text-indigo-400">24 ms</div>
                    <p className="text-[11px] text-slate-400">Sub-50ms database queries</p>
                  </div>

                  {/* Gauge 3: Security */}
                  <div className="p-4 rounded-2xl bg-[#060911] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold text-xs">Security Rating</span>
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="text-3xl font-extrabold text-white">Grade A+</div>
                    <p className="text-[11px] text-slate-400">Clerk OAuth &amp; CORS protection</p>
                  </div>

                  {/* Gauge 4: Uptime */}
                  <div className="p-4 rounded-2xl bg-[#060911] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold text-xs">Production SLA</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-400">99.99%</div>
                    <p className="text-[11px] text-slate-400">Vercel &amp; Cloud infrastructure</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Bar */}
          <div className="pt-4 border-t border-slate-800/90 flex items-center justify-between text-xs text-slate-400 font-sans">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full-Stack Engineering Excellence</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Check className="w-3.5 h-3.5" /> 100% Production Grade
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
