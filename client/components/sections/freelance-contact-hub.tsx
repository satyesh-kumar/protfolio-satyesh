'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Linkedin,
  MessageCircle,
  ArrowUpRight,
  Zap,
  Calendar,
  ChevronDown,
  Copy,
  Check,
  Globe,
  Code2,
  ShoppingBag,
  Wrench,
  Target,
  Layers,
  Star,
  TrendingUp,
  Lock,
  Phone,
  FileText,
  Cpu,
  DollarSign,
  Timer,
  Award,
  ArrowRight,
} from 'lucide-react';

// ─── Utilities ───────────────────────────────────────────────────────────────

function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = 'scoper' | 'express' | 'discovery';

interface ScopeFeature {
  id: string;
  label: string;
  description: string;
  weight: number;
}

interface FormData {
  name: string;
  email: string;
  business: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  preferredContact?: string;
  agendaTopics?: string[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  { id: 'Business Website', label: 'Business Website', icon: Globe, color: 'blue' },
  { id: 'Full-Stack Web Application', label: 'Full-Stack App / SaaS', icon: Code2, color: 'violet' },
  { id: 'E-commerce Platform', label: 'E-commerce Store', icon: ShoppingBag, color: 'emerald' },
  { id: 'Website Maintenance & Upgrades', label: 'Maintenance & Upgrades', icon: Wrench, color: 'amber' },
  { id: 'Custom Development Project', label: 'Custom Project / API', icon: Cpu, color: 'rose' },
  { id: 'Strategy & Technical Consulting', label: 'Technical Consulting', icon: Target, color: 'cyan' },
];

const SCOPE_FEATURES: ScopeFeature[] = [
  { id: 'auth', label: 'Authentication / Auth Flows', description: 'User login, OAuth, role-based access', weight: 1 },
  { id: 'dashboard', label: 'Admin Dashboard', description: 'Data tables, charts, management panels', weight: 2 },
  { id: 'payments', label: 'Payment Integration', description: 'Stripe, subscriptions, invoices', weight: 2 },
  { id: 'api', label: 'Custom REST / GraphQL API', description: 'Backend services, external integrations', weight: 2 },
  { id: 'cms', label: 'Content Management', description: 'Blog, portfolio, dynamic content', weight: 1 },
  { id: 'seo', label: 'SEO & Performance Audit', description: 'Core Web Vitals, structured data', weight: 1 },
  { id: 'email', label: 'Email Automation', description: 'Transactional emails, drip campaigns', weight: 1 },
  { id: 'realtime', label: 'Real-time Features', description: 'WebSockets, live updates, notifications', weight: 3 },
  { id: 'mobile', label: 'Mobile Responsiveness', description: 'Full cross-device optimisation', weight: 1 },
  { id: 'analytics', label: 'Analytics & Tracking', description: 'GA4, Mixpanel, event funnels', weight: 1 },
];

const BUDGET_TIERS = [
  { value: '< $1,000', label: 'Starter', sublabel: 'Landing pages, quick fixes', color: 'slate' },
  { value: '$1,000 - $3,000', label: 'Professional', sublabel: 'Business sites, MVPs', color: 'blue' },
  { value: '$3,000 - $7,000', label: 'Premium', sublabel: 'Full-stack apps, platforms', color: 'violet' },
  { value: '$7,000+', label: 'Enterprise', sublabel: 'Complex SaaS, long-term', color: 'emerald' },
];

const TIMELINES = [
  { value: 'Urgent (< 1 Week)', label: 'Urgent', sublabel: '< 1 week', icon: Zap },
  { value: '1-2 Weeks', label: 'Fast-Track', sublabel: '1–2 weeks', icon: Timer },
  { value: '2-4 Weeks', label: 'Standard', sublabel: '2–4 weeks', icon: Clock },
  { value: '1-2 Months', label: 'Extended', sublabel: '1–2 months', icon: Calendar },
  { value: 'Flexible', label: 'Flexible', sublabel: 'Open schedule', icon: Star },
];

const DISCOVERY_TOPICS = [
  { id: 'scope', label: 'Define Project Scope', icon: Target },
  { id: 'tech', label: 'Tech Stack Recommendations', icon: Cpu },
  { id: 'architecture', label: 'Architecture Design', icon: Layers },
  { id: 'budget', label: 'Budget & Milestone Plan', icon: DollarSign },
  { id: 'timeline', label: 'Sprint Timeline Planning', icon: Calendar },
  { id: 'existing', label: 'Review Existing Codebase', icon: FileText },
];

const FAQS = [
  {
    q: 'How does your engagement process work?',
    a: 'I follow a 4-stage process: (1) Discovery & NDA — understanding your vision; (2) Architecture Proposal — technical blueprint with fixed-price milestones; (3) Agile Development Sprints — weekly demos and iterative progress; (4) Launch & 30-Day Warranty — ensuring zero post-launch surprises.',
  },
  {
    q: 'Do you work on fixed-price or hourly contracts?',
    a: 'I primarily offer fixed-price milestone contracts so you have full cost predictability. For ongoing retainers and maintenance, a monthly package is available. I avoid billing surprises — the scope is agreed before any code is written.',
  },
  {
    q: 'Who owns the code and IP after delivery?',
    a: '100% of code and intellectual property transfers to you upon final payment. You receive full repository access, clean documentation, and deployment credentials. No vendor lock-in, no licensing fees.',
  },
  {
    q: 'Do you sign NDAs for confidential projects?',
    a: 'Absolutely. An NDA is signed before any sensitive business or technical details are shared. I operate with strict client confidentiality as a professional standard.',
  },
  {
    q: 'What is your post-launch support policy?',
    a: 'Every project includes a 30-day post-launch warranty — I fix bugs or issues discovered in production within 48 hours at no extra charge. Extended maintenance retainers are also available.',
  },
  {
    q: 'What if I am not technical — can you guide me through the process?',
    a: 'Yes — a significant portion of my clients are non-technical founders and business owners. I translate complex engineering decisions into plain business language, and provide weekly progress reports you can actually understand.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function LiveClock() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const h = ist.getHours().toString().padStart(2, '0');
      const m = ist.getMinutes().toString().padStart(2, '0');
      const s = ist.getSeconds().toString().padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <span className="font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
      {time} IST
    </span>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
    >
      {copied ? (
        <><Check className="w-3.5 h-3.5 text-emerald-500" /><span className="text-emerald-600 dark:text-emerald-400">Copied!</span></>
      ) : (
        <><Copy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /><span>Copy Email</span></>
      )}
    </button>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
      >
        <span>{q}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300',
            open && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <p className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {a}
        </p>
      </div>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1.5">
      <AlertCircle className="w-3 h-3" /> {msg}
    </span>
  );
}

// ─── Smart Scoper Tab ────────────────────────────────────────────────────────

function SmartScopeTab({
  initialService,
  onSuccess,
}: {
  initialService: string;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [projectType, setProjectType] = useState(initialService || 'Full-Stack Web Application');
  const [features, setFeatures] = useState<string[]>([]);
  const [budget, setBudget] = useState('$1,000 - $3,000');
  const [timeline, setTimeline] = useState('2-4 Weeks');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email';
    if (!message.trim() || message.trim().length < 10)
      errs.message = 'Please describe your project (min 10 chars)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitting(true);
    setServerError('');
    const selectedFeatureLabels = SCOPE_FEATURES.filter((f) => features.includes(f.id))
      .map((f) => f.label)
      .join(', ');
    const fullMessage = `${message}\n\n--- Scope Details ---\nProject Type: ${projectType}\nKey Features: ${selectedFeatureLabels || 'Not specified'}\nBudget: ${budget}\nTimeline: ${timeline}`;
    try {
      const res = await api.submitInquiry({
        name,
        email,
        business: business || undefined,
        projectType,
        budget,
        timeline,
        message: fullMessage,
      });
      if (res.success) {
        onSuccess();
      } else {
        setServerError(res.message || 'Something went wrong.');
      }
    } catch (err: any) {
      setServerError(err.message || 'Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step indicators */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <button
              onClick={() => s < step && setStep(s as 1 | 2 | 3)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all',
                step === s
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                  : s < step
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 cursor-pointer hover:opacity-80'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              )}
            >
              {s < step ? <Check className="w-3 h-3" /> : s}
              <span className="hidden sm:inline">
                {s === 1 ? 'Project Type' : s === 2 ? 'Scope & Budget' : 'Your Details'}
              </span>
            </button>
            {s < 3 && <div className={cn('flex-1 h-px', step > s ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-slate-700')} />}
          </React.Fragment>
        ))}
      </div>

      {/* ── Step 1: Project Type ── */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">What are you building?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Select the project category that best describes your needs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROJECT_TYPES.map((pt) => {
              const Icon = pt.icon;
              const selected = projectType === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => setProjectType(pt.id)}
                  className={cn(
                    'relative flex items-center gap-3.5 p-4 rounded-xl border-2 text-left transition-all duration-200 group',
                    selected
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 shadow-md shadow-indigo-500/10'
                      : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/60 hover:border-indigo-300 dark:hover:border-indigo-600/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                    selected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn('text-sm font-bold', selected ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200')}>
                    {pt.label}
                  </span>
                  {selected && (
                    <div className="absolute top-3 right-3">
                      <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-500/25"
            >
              Next: Define Scope <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Features, Budget, Timeline ── */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">Scope & Budget</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Select all applicable features and your investment range.</p>
          </div>

          {/* Feature Pills */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Required Features</p>
            <div className="flex flex-wrap gap-2.5">
              {SCOPE_FEATURES.map((feat) => {
                const active = features.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    title={feat.description}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200',
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20'
                        : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                    )}
                  >
                    {active && <span className="mr-1">✓</span>}
                    {feat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Tiers */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Investment Range</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BUDGET_TIERS.map((tier) => {
                const selected = budget === tier.value;
                return (
                  <button
                    key={tier.value}
                    onClick={() => setBudget(tier.value)}
                    className={cn(
                      'flex flex-col items-start p-3.5 rounded-xl border-2 text-left transition-all duration-200',
                      selected
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-md shadow-indigo-500/10'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-700'
                    )}
                  >
                    <DollarSign className={cn('w-4 h-4 mb-1', selected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400')} />
                    <span className={cn('text-xs font-extrabold', selected ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200')}>
                      {tier.label}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{tier.sublabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Target Launch Timeline</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TIMELINES.map((tl) => {
                const Icon = tl.icon;
                const selected = timeline === tl.value;
                return (
                  <button
                    key={tl.value}
                    onClick={() => setTimeline(tl.value)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all duration-200',
                      selected
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-md shadow-indigo-500/10'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-700'
                    )}
                  >
                    <Icon className={cn('w-4 h-4', selected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400')} />
                    <span className={cn('text-[10px] font-bold', selected ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300')}>
                      {tl.label}
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500">{tl.sublabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button onClick={() => setStep(1)} className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-500/25"
            >
              Next: Your Details <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Contact Details ── */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">Your Details</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Almost done — just a few details so I can respond with a precise proposal.</p>
          </div>

          {serverError && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
              />
              <FieldError msg={errors.name} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@company.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
              />
              <FieldError msg={errors.email} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Business / Company (Optional)</label>
            <input
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              placeholder="e.g. Acme Innovations"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Project Overview & Goals *</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your vision, key features needed, existing tech or platform constraints, target audience, or any specific requirements..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition resize-none"
            />
            <FieldError msg={errors.message} />
          </div>

          {/* Scope Summary */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Your Scope Summary</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold">{projectType}</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">{budget}</span>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[11px] font-semibold">{timeline}</span>
              {features.slice(0, 3).map((fid) => {
                const feat = SCOPE_FEATURES.find((f) => f.id === fid);
                return feat ? (
                  <span key={fid} className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold">
                    {feat.label}
                  </span>
                ) : null;
              })}
              {features.length > 3 && (
                <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 text-[11px] font-semibold">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button onClick={() => setStep(2)} className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-bold hover:from-indigo-700 hover:to-blue-700 active:scale-95 transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? (
                <><span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending Proposal Request...</>
              ) : (
                <><Send className="w-4 h-4" />Submit Project Scope</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Express Message Tab ─────────────────────────────────────────────────────

function ExpressMessageTab({ initialService, onSuccess }: { initialService: string; onSuccess: () => void }) {
  const [form, setForm] = useState({
    name: '', email: '', business: '',
    projectType: initialService || 'Full-Stack Web Application',
    budget: '$1,000 - $3,000', timeline: '2-4 Weeks', message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Min 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError('');
    try {
      const res = await api.submitInquiry(form);
      if (res.success) onSuccess();
      else setServerError(res.message || 'Something went wrong.');
    } catch (err: any) {
      setServerError(err.message || 'Network error. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition";
  const selectCls = inputCls + " cursor-pointer appearance-none";
  const labelCls = "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />{serverError}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Sarah Jenkins" className={inputCls} />
          <FieldError msg={errors.name} />
        </div>
        <div>
          <label className={labelCls}>Email Address *</label>
          <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="sarah@company.com" className={inputCls} />
          <FieldError msg={errors.email} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Business / Company (Optional)</label>
          <input value={form.business} onChange={(e) => set('business', e.target.value)} placeholder="Acme Innovations" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Project Type</label>
          <select value={form.projectType} onChange={(e) => set('projectType', e.target.value)} className={selectCls}>
            {PROJECT_TYPES.map((pt) => <option key={pt.id} value={pt.id}>{pt.label}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Budget Range</label>
          <select value={form.budget} onChange={(e) => set('budget', e.target.value)} className={selectCls}>
            {BUDGET_TIERS.map((b) => <option key={b.value} value={b.value}>{b.value} — {b.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Target Timeline</label>
          <select value={form.timeline} onChange={(e) => set('timeline', e.target.value)} className={selectCls}>
            {TIMELINES.map((t) => <option key={t.value} value={t.value}>{t.label} ({t.sublabel})</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Project Overview & Requirements *</label>
        <textarea rows={5} value={form.message} onChange={(e) => set('message', e.target.value)}
          placeholder="Describe your project goals, key features, target audience, or existing website/tech details..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition resize-none"
        />
        <FieldError msg={errors.message} />
      </div>
      <div className="pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-bold hover:from-indigo-700 hover:to-blue-700 active:scale-95 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:pointer-events-none"
        >
          {submitting ? (
            <><span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</>
          ) : (
            <><Send className="w-4 h-4" />Send Inquiry</>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Discovery Call Tab ──────────────────────────────────────────────────────

function DiscoveryCallTab({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const toggleTopic = (id: string) =>
    setTopics((p) => (p.includes(id) ? p.filter((t) => t !== id) : [...p, id]));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError('');
    const selectedTopics = DISCOVERY_TOPICS.filter((t) => topics.includes(t.id)).map((t) => t.label).join(', ');
    const fullMessage = `Discovery Call Request\n\nAgenda Topics: ${selectedTopics || 'General discussion'}\n\nAdditional Context: ${message || 'None provided'}`;
    try {
      const res = await api.submitInquiry({
        name,
        email,
        business: business || undefined,
        projectType: 'Strategy & Technical Consulting',
        budget: 'TBD',
        timeline: 'Flexible',
        message: fullMessage,
      });
      if (res.success) onSuccess();
      else setServerError(res.message || 'Something went wrong.');
    } catch (err: any) {
      setServerError(err.message || 'Network error. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition";
  const labelCls = "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex items-start gap-3">
        <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200">Free 30-Minute Discovery Call</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5 font-medium">
            No sales pitch — a focused engineering conversation to understand your exact requirements, recommend the right stack, and outline a delivery roadmap.
          </p>
        </div>
      </div>

      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />{serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah Jenkins" className={inputCls} />
          <FieldError msg={errors.name} />
        </div>
        <div>
          <label className={labelCls}>Email Address *</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sarah@company.com" className={inputCls} />
          <FieldError msg={errors.email} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Business / Company (Optional)</label>
        <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Acme Innovations" className={inputCls} />
      </div>

      {/* Agenda Topics */}
      <div>
        <label className={labelCls}>What do you want to cover on the call?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {DISCOVERY_TOPICS.map((topic) => {
            const Icon = topic.icon;
            const active = topics.includes(topic.id);
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-3 rounded-xl border-2 text-left transition-all duration-200',
                  active
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-700'
                )}
              >
                <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400')} />
                <span className={cn('text-xs font-semibold', active ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300')}>
                  {topic.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={labelCls}>Additional Context (Optional)</label>
        <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder="Anything specific you'd like me to prepare or review before the call..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold hover:from-emerald-700 hover:to-teal-700 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-60 disabled:pointer-events-none"
      >
        {submitting ? (
          <><span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Booking...</>
        ) : (
          <><Calendar className="w-4 h-4" />Request Discovery Call</>
        )}
      </button>
    </form>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function FreelanceContactHub() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || 'Full-Stack Web Application';

  const [activeTab, setActiveTab] = useState<TabId>('scoper');
  const [submitted, setSubmitted] = useState(false);

  const onSuccess = useCallback(() => setSubmitted(true), []);

  const TABS: { id: TabId; label: string; icon: React.ElementType; sublabel: string }[] = [
    { id: 'scoper', icon: Sparkles, label: 'Smart Project Scoper', sublabel: 'Interactive estimator' },
    { id: 'express', icon: Zap, label: 'Express Message', sublabel: 'Quick direct inquiry' },
    { id: 'discovery', icon: Calendar, label: 'Book Discovery Call', sublabel: 'Free 30-min consult' },
  ];

  const TRUST_ITEMS = [
    { icon: Lock, label: '100% IP Ownership', desc: 'All code and assets transfer to you on delivery.' },
    { icon: ShieldCheck, label: 'NDA Executed First', desc: 'Confidentiality signed before any briefing.' },
    { icon: Award, label: '30-Day Post-Launch Warranty', desc: 'Production issues fixed within 48 hours.' },
    { icon: TrendingUp, label: 'Fixed-Price Milestones', desc: 'No surprise invoices — scope agreed upfront.' },
  ];

  if (submitted) {
    return (
      <div className="py-20 text-center space-y-6 max-w-xl mx-auto">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/30">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Inquiry Received — Thank You!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-sm mx-auto">
            Your submission has been saved. Satyesh will review your requirements and respond personally within <strong>24 hours</strong> with a tailored approach.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Submit Another Inquiry
          </button>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Hi Satyesh! I just submitted an inquiry on your portfolio and wanted to follow up directly.')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-500/20"
          >
            <MessageCircle className="w-4 h-4" /> Follow Up on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10 xl:gap-12 items-start">
      {/* ── Left Column: Main Form ── */}
      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="flex flex-col sm:flex-row gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200',
                  active
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-lg shadow-indigo-500/10'
                    : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20'
                )}
              >
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', active ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400')}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className={cn('text-xs font-extrabold truncate', active ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200')}>{tab.label}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{tab.sublabel}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0D1322] border border-slate-200/90 dark:border-slate-800/80 p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          {activeTab === 'scoper' && <SmartScopeTab initialService={initialService} onSuccess={onSuccess} />}
          {activeTab === 'express' && <ExpressMessageTab initialService={initialService} onSuccess={onSuccess} />}
          {activeTab === 'discovery' && <DiscoveryCallTab onSuccess={onSuccess} />}
        </div>

        {/* Client Onboarding Roadmap */}
        <div className="rounded-2xl bg-white dark:bg-[#0D1322] border border-slate-200/90 dark:border-slate-800/80 p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent pointer-events-none" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-5">How We Work Together</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Discovery & NDA', desc: 'Confidential brief, requirements gathering, and mutual NDA execution.', color: 'indigo' },
              { step: '02', title: 'Architecture Proposal', desc: 'Fixed-price technical blueprint with milestone breakdowns and timeline.', color: 'violet' },
              { step: '03', title: 'Agile Sprint Delivery', desc: 'Weekly progress demos, iterative builds, and continuous client visibility.', color: 'blue' },
              { step: '04', title: 'Launch + 30-Day Guarantee', desc: 'Full deployment, handoff, and post-launch warranty coverage.', color: 'emerald' },
            ].map((phase, idx) => (
              <div key={idx} className="relative flex flex-col gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] font-black tracking-widest text-indigo-500 dark:text-indigo-400 uppercase">{phase.step}</span>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">{phase.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="rounded-2xl bg-white dark:bg-[#0D1322] border border-slate-200/90 dark:border-slate-800/80 p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-5">Common Questions</p>
          <div className="space-y-2">
            {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </div>

      {/* ── Right Column: Sidebar ── */}
      <div className="space-y-5">
        {/* Availability Status */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0D1322] border border-slate-200/90 dark:border-slate-800/80 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Availability</p>
            <LiveClock />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-3 h-3">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
              <span className="relative block w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400/60" />
            </div>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">Available for New Projects</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">
            Accepting <strong className="text-slate-700 dark:text-slate-200">2 sprint slots</strong> for Q3/Q4 — spots fill fast.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/40">
              <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <p className="text-[10px] font-black text-blue-700 dark:text-blue-300">Response</p>
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">Under 2 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/40">
              <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-[10px] font-black text-indigo-700 dark:text-indigo-300">Location</p>
                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">Remote / Global</p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Contact */}
        <div className="rounded-2xl bg-white dark:bg-[#0D1322] border border-slate-200/90 dark:border-slate-800/80 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">Direct Contact</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-slate-900 dark:text-white mb-0.5">Direct Email</p>
                <a
                  href={`mailto:satyeshkumar578@gmail.com?subject=${encodeURIComponent('Project Inquiry — Satyesh Portfolio')}`}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all"
                >
                  satyeshkumar578@gmail.com
                </a>
                <div className="mt-1">
                  <CopyEmailButton email="satyeshkumar578@gmail.com" />
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white mb-0.5">WhatsApp / Phone</p>
                <a
                  href="https://api.whatsapp.com/send?phone=917307440594&text=Hi%20Satyesh,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  +91 7307440594 <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white mb-0.5">LinkedIn</p>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Connect on LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white mb-0.5">Location</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Prayagraj, Uttar Pradesh, India (Remote)</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Trust Guarantees */}
        <div className="rounded-2xl bg-white dark:bg-[#0D1322] border border-slate-200/90 dark:border-slate-800/80 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">Client Guarantees</p>
          <div className="space-y-3">
            {TRUST_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">{item.label}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            <strong className="text-slate-700 dark:text-slate-300">Privacy Guarantee.</strong> All inquiry data is submitted over SSL/TLS directly to a private MongoDB instance. Your information is never sold or shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}
