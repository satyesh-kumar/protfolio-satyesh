'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Globe,
  Server,
  Database,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  role: string;
  description: string;
  layerId: string;
}

interface TechLayer {
  id: string;
  title: string;
  icon: React.ElementType;
  items: TechItem[];
}

const techLayers: TechLayer[] = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    icon: Globe,
    items: [
      {
        id: 'react',
        name: 'React',
        role: 'Component Architecture',
        description: 'Component-driven interfaces for maintainable and scalable frontend experiences.',
        layerId: 'frontend',
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        role: 'App Framework',
        description: 'Routing, rendering and production-ready web application architecture.',
        layerId: 'frontend',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        role: 'Strict Type System',
        description: 'Static type safety across components, API contracts and server models.',
        layerId: 'frontend',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        role: 'Styling Engine',
        description: 'Design tokens, accessible utility styling and fluid responsive layouts.',
        layerId: 'frontend',
      },
    ],
  },
  {
    id: 'backend',
    title: 'BACKEND & CORE',
    icon: Server,
    items: [
      {
        id: 'java',
        name: 'Java (DSA)',
        role: 'Core Algorithms',
        description: 'Strong foundation in Data Structures and Algorithms with 250+ solved problems.',
        layerId: 'backend',
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        role: 'Runtime Environment',
        description: 'Server-side JavaScript runtime for backend APIs and application services.',
        layerId: 'backend',
      },
      {
        id: 'express',
        name: 'Express',
        role: 'API Framework',
        description: 'Lightweight REST API layer for application logic and backend services.',
        layerId: 'backend',
      },
      {
        id: 'python',
        name: 'Python',
        role: 'Programming Language',
        description: 'Scripting, algorithmic logic, and data processing capabilities.',
        layerId: 'backend',
      },
    ],
  },
  {
    id: 'data',
    title: 'DATA',
    icon: Database,
    items: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        role: 'Document Storage',
        description: 'Document-oriented storage for application data and CMS content.',
        layerId: 'data',
      },
      {
        id: 'mongoose',
        name: 'Mongoose',
        role: 'Schema ODM',
        description: 'Schema definition, validation, and typed query execution for data integrity.',
        layerId: 'data',
      },
    ],
  },
  {
    id: 'services',
    title: 'SECURITY & AUTH',
    icon: ShieldCheck,
    items: [
      {
        id: 'jwt',
        name: 'JWT & RBAC',
        role: 'Security & Auth',
        description: 'JSON Web Token authentication and Role-Based Access Control.',
        layerId: 'services',
      },
      {
        id: 'clerk',
        name: 'Clerk / OAuth',
        role: 'Managed Auth',
        description: 'Managed authentication and session infrastructure.',
        layerId: 'services',
      },
    ],
  },
  {
    id: 'tools',
    title: 'TOOLS & DEPLOY',
    icon: Wrench,
    items: [
      {
        id: 'git',
        name: 'Git & GitHub',
        role: 'Version Control',
        description: 'Version control, repository management, and collaborative workflows.',
        layerId: 'tools',
      },
      {
        id: 'postman',
        name: 'Postman',
        role: 'API Testing',
        description: 'Comprehensive RESTful API testing, endpoint mocking, and contract verification.',
        layerId: 'tools',
      },
      {
        id: 'vercel',
        name: 'Vercel',
        role: 'Edge Platform',
        description: 'Edge network deployment, automated CI/CD and serverless compute.',
        layerId: 'tools',
      },
      {
        id: 'render',
        name: 'Render',
        role: 'Cloud Hosting',
        description: 'Managed cloud hosting for backend services and background processes.',
        layerId: 'tools',
      },
    ],
  },
];

export function TechArchitectureSystem() {
  const [activeTechId, setActiveTechId] = useState<string>('nextjs');
  const [expandedLayerId, setExpandedLayerId] = useState<string>('frontend');
  const shouldReduceMotion = useReducedMotion();

  const allTechItems = techLayers.flatMap((l) => l.items);
  const currentTech = allTechItems.find((t) => t.id === activeTechId) || allTechItems[0];

  const handleKeyDown = (e: React.KeyboardEvent, techId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTechId(techId);
    }
  };

  return (
    <section className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            TECHNOLOGY SYSTEM
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            ENGINEERED WITH PRODUCTION-GRADE TECHNOLOGIES
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Modern products need more than a good interface. I work across the stack to build reliable, maintainable web experiences.
          </p>
        </div>

        {/* DESKTOP & TABLET VIEW: 5-Layer Interactive Architecture Grid */}
        <div className="hidden md:block space-y-8">
          <div className="grid grid-cols-5 gap-4 lg:gap-5">
            {techLayers.map((layer) => {
              const LayerIcon = layer.icon;
              return (
                <div
                  key={layer.id}
                  className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white font-extrabold text-xs">
                    <LayerIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="truncate">{layer.title}</span>
                  </div>

                  <div className="space-y-2">
                    {layer.items.map((tech) => {
                      const isActive = tech.id === activeTechId;
                      return (
                        <button
                          key={tech.id}
                          tabIndex={0}
                          onClick={() => setActiveTechId(tech.id)}
                          onKeyDown={(e) => handleKeyDown(e, tech.id)}
                          onMouseEnter={() => setActiveTechId(tech.id)}
                          aria-selected={isActive}
                          aria-label={`View ${tech.name} role details`}
                          className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            isActive
                              ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20 -translate-y-1 scale-[1.015]'
                              : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:border-blue-500/40 hover:bg-slate-100/80 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{tech.name}</span>
                            {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
                          </div>
                          <div
                            className={`text-[10px] mt-0.5 font-normal ${
                              isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {tech.role}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Tech Dynamic Detail Reveal Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTech.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -5 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-blue-500/30 shadow-md space-y-2 relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {currentTech.name}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800">
                    {currentTech.role}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Production-Grade Architecture</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium pt-1">
                {currentTech.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* MOBILE VIEW: Accessible Expandable Groups */}
        <div className="block md:hidden space-y-3">
          {techLayers.map((layer) => {
            const LayerIcon = layer.icon;
            const isExpanded = expandedLayerId === layer.id;
            return (
              <div
                key={layer.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setExpandedLayerId(isExpanded ? '' : layer.id)}
                  className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-2.5 text-sm font-extrabold text-slate-900 dark:text-white">
                    <LayerIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{layer.title}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 font-semibold">
                      {layer.items.length} Tech
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    {layer.items.map((tech) => (
                      <div
                        key={tech.id}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-900 dark:text-white text-xs">
                            {tech.name}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                            {tech.role}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                          {tech.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
