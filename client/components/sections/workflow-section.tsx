'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search,
  Palette,
  Code,
  SlidersHorizontal,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface WorkflowStage {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  outcome: string;
  icon: React.ElementType;
  accentColor: string;
}

const workflowStages: WorkflowStage[] = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand',
    tagline: 'Discovery & Requirement Mapping',
    description: 'Define the business problem, target audience, technical feasibility, and core requirements before writing code.',
    deliverables: [
      'Business Problem & Objectives Scope',
      'Target Audience & User Story Mapping',
      'System Architecture Feasibility Analysis',
      'Feature Prioritization & Milestone Roadmap',
    ],
    outcome: 'Zero guesswork — complete alignment on deliverables, timeline, and architecture before engineering begins.',
    icon: Search,
    accentColor: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    tagline: 'Architecture & UX Blueprint',
    description: 'Turn requirements into a clear user experience, modular component hierarchy, and cohesive product direction.',
    deliverables: [
      'Information Architecture & Flow Layouts',
      'Editorial Design System & Typography Tokens',
      'Database Schema & Data Model Design',
      'REST API Contract & Endpoint Mapping',
    ],
    outcome: 'A validated, intuitive user interface paired with a rock-solid technical blueprint.',
    icon: Palette,
    accentColor: 'from-indigo-600 to-violet-600',
  },
  {
    id: 'build',
    number: '03',
    title: 'Build',
    tagline: 'Full-Stack Engineering & Integration',
    description: 'Develop the frontend, backend APIs, database models, and third-party services needed to make the product real.',
    deliverables: [
      'Next.js 14 App Router Frontend Interface',
      'Express.js RESTful API & Middleware',
      'MongoDB Schemas, Indexing & Mongoose ODM',
      'Clerk Auth & Cloudinary Media Integration',
    ],
    outcome: 'Clean, type-safe full-stack codebase engineered for modularity, speed, and maintainability.',
    icon: Code,
    accentColor: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'refine',
    number: '04',
    title: 'Refine',
    tagline: 'Performance, QA & Polish',
    description: 'Optimize responsiveness, load speeds, security authorization, accessibility, and overall product quality.',
    deliverables: [
      'Sub-Second Loading & Lighthouse 100/100 Tuning',
      'Cross-Device Mobile & Tablet QA Testing',
      'Server-Side Authorization & Input Sanitization',
      'WCAG Accessibility & Keyboard Navigation',
    ],
    outcome: 'A high-converting, accessible, and secure digital product that performs reliably under real-world load.',
    icon: SlidersHorizontal,
    accentColor: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'launch',
    number: '05',
    title: 'Launch',
    tagline: 'Deployment, Handover & Support',
    description: 'Deploy, verify live environments, document system architecture, and hand over a production-ready experience.',
    deliverables: [
      'Zero-Downtime Edge Deployment (Vercel & Render)',
      'Custom Domain, DNS, SSL & Security Headers',
      'Admin CMS Portal & Analytics Configuration',
      'Complete Code Documentation & Handover Walkthrough',
    ],
    outcome: 'A live, production-grade application actively driving business results and growth from day one.',
    icon: Rocket,
    accentColor: 'from-cyan-600 to-blue-600',
  },
];

export function WorkflowSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const currentStage = workflowStages[activeIdx];
  const IconComponent = currentStage.icon;

  const handleNext = () => {
    if (activeIdx < workflowStages.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIdx(index);
    } else if (e.key === 'ArrowRight' && activeIdx < workflowStages.length - 1) {
      e.preventDefault();
      setActiveIdx(activeIdx + 1);
    } else if (e.key === 'ArrowLeft' && activeIdx > 0) {
      e.preventDefault();
      setActiveIdx(activeIdx - 1);
    }
  };

  return (
    <section className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#070B13]/40 relative overflow-hidden select-none">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/5 dark:bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/5 dark:bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DEVELOPMENT WORKFLOW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              FROM IDEA TO PRODUCTION
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              I take a product from the first problem definition to a deployed, production-ready experience.
            </p>
          </div>

          {/* Quick Stage Stepper Navigator */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              disabled={activeIdx === 0}
              aria-label="Previous workflow stage"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white shadow-sm">
              <span className="text-blue-600 dark:text-blue-400 font-extrabold">{currentStage.number}</span>
              <span className="text-slate-400 mx-1.5">/</span>
              <span className="text-slate-500">05</span>
            </div>
            <button
              onClick={handleNext}
              disabled={activeIdx === workflowStages.length - 1}
              aria-label="Next workflow stage"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-Stage Interactive Stage Tab Bar (Horizontal, Responsive on all devices) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {workflowStages.map((stage, idx) => {
            const isActive = idx === activeIdx;
            const isCompleted = idx < activeIdx;
            const StageIcon = stage.icon;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveIdx(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                tabIndex={0}
                role="tab"
                aria-selected={isActive}
                aria-label={`Stage ${stage.number}: ${stage.title}`}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 border-blue-500 dark:border-blue-500 shadow-lg shadow-blue-500/10 -translate-y-1'
                    : 'bg-white/70 dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {stage.number}
                  </span>
                  <StageIcon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                    }`}
                  />
                </div>

                {/* Stage Title */}
                <div
                  className={`text-sm font-extrabold transition-colors ${
                    isActive
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {stage.title}
                </div>

                {/* Short Subtitle */}
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {stage.tagline}
                </div>

                {/* Bottom Active Glow Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeWorkflowIndicator"
                    className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-full"
                    transition={{ duration: shouldReduceMotion ? 0.1 : 0.25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Rich Active Stage Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 dark:shadow-black/30 relative overflow-hidden"
          >
            {/* Card Accent Top Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
              {/* Left Column: Stage Overview & Purpose */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                      PHASE {currentStage.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {currentStage.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {currentStage.description}
                </p>

                {/* Outcome Callout Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Target Outcome</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {currentStage.outcome}
                  </p>
                </div>
              </div>

              {/* Right Column: Key Deliverables & Action Items */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Key Deliverables &amp; Milestones
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">
                    {currentStage.deliverables.length} Key Outputs
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentStage.deliverables.map((item, idx) => (
                    <div
                      key={item}
                      className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-3 hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        {idx + 1}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Interactive Step Switcher Actions */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={handlePrev}
                    disabled={activeIdx === 0}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Phase</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {workflowStages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        aria-label={`Jump to stage ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-200 ${
                          i === activeIdx
                            ? 'w-6 bg-blue-600 dark:bg-blue-400'
                            : 'w-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={activeIdx === workflowStages.length - 1}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
