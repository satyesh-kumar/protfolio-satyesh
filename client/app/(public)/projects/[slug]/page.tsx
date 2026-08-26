import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

export const revalidate = 60;

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await api.getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <article className="max-w-5xl mx-auto px-6 py-16 space-y-16 relative overflow-hidden">
      {/* Ambient background flare */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Back Link */}
      <div>
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects Showcase
          </Button>
        </Link>
      </div>

      {/* Case Study Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="accent">{project.category}</Badge>
          {project.featured ? (
            <Badge variant="outline">
              <Sparkles className="w-3 h-3 mr-1 text-indigo-500" /> Featured Project
            </Badge>
          ) : null}
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {project.title}
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {project.shortDescription}
        </p>

        {/* External Links & Stack Pills */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-y border-slate-200/80 dark:border-white/10 py-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mr-2">
              Stack:
            </span>
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="default">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">
                  <Github className="w-4 h-4 mr-2" /> GitHub Repository
                </Button>
              </a>
            ) : null}
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button variant="primary" size="sm">
                  Live Application <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Cover Image Banner */}
      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xl relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Case Study Deep Dive Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The Problem */}
        <Card className="space-y-4 p-8 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-lg">
            <AlertTriangle className="w-5 h-5" /> The Challenge & Context
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {project.problem}
          </p>
        </Card>

        {/* The Solution */}
        <Card className="space-y-4 p-8 border-l-4 border-l-indigo-500">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
            <Lightbulb className="w-5 h-5" /> The Engineering Solution
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {project.solution}
          </p>
        </Card>
      </div>

      {/* Technical Features & Architecture */}
      <div className="space-y-8">
        <div className="border-b border-slate-200/80 dark:border-white/10 pb-4">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-indigo-500" /> Key Technical Capabilities & Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.features.map((feat, i) => (
            <Card key={i} className="flex items-start gap-3 p-5">
              <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {feat}
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* Technical Challenges & Solutions */}
      {project.challenges && project.challenges.length > 0 ? (
        <div className="space-y-8">
          <div className="border-b border-slate-200/80 dark:border-white/10 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-indigo-500" /> Engineering Challenges & Resolution
            </h2>
          </div>

          <div className="space-y-6">
            {project.challenges.map((ch, idx) => (
              <Card key={idx} className="space-y-4 p-6 bg-slate-50/60 dark:bg-slate-900/40">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest">
                    Challenge #{idx + 1}
                  </h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {ch}
                  </p>
                </div>
                {project.solutions && project.solutions[idx] ? (
                  <div className="space-y-2 pt-3 border-t border-slate-200/80 dark:border-white/10">
                    <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                      Applied Technical Resolution
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {project.solutions[idx]}
                    </p>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {/* Results & Verification */}
      {project.results && project.results.length > 0 ? (
        <Card className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-blue-50/80 dark:from-indigo-950/40 dark:via-blue-950/30 dark:to-indigo-950/40 border-indigo-200 dark:border-indigo-800/60 p-8 space-y-6 shadow-md">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xl">
            <TrendingUp className="w-6 h-6" /> Measured Results & Business Impact
          </div>
          <ul className="space-y-3">
            {project.results.map((res, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-800 dark:text-slate-200 font-semibold">
                <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-2" />
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {/* Image Gallery */}
      {project.gallery && project.gallery.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Project Screenshots & Views</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.gallery.map((imgUrl, i) => (
              <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgUrl} alt={`Gallery view ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Final Case Study CTA */}
      <div className="pt-8 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Need a similar full-stack application built?</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">Let&apos;s discuss architecture, scope, timeline, and pricing.</p>
        </div>
        <Link href="/contact">
          <Button variant="primary" size="lg">
            Start a Project with Satyesh
          </Button>
        </Link>
      </div>
    </article>
  );
}

