import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Server,
  Database,
  Lock,
  Cloud,
  FileCode,
  Target,
} from 'lucide-react';

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await api.getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found | Satyesh Kumar',
    };
  }

  const title = project.seo?.metaTitle || `${project.title} | Satyesh Kumar`;
  const description = project.seo?.metaDescription || project.shortDescription;
  const ogImage = project.seo?.ogImage || project.coverImage;

  return {
    title,
    description,
    keywords: project.seo?.keywords,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: project.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const [project, allProjects] = await Promise.all([
    api.getProjectBySlug(params.slug),
    api.getProjects(),
  ]);

  if (!project) {
    return notFound();
  }

  // Related projects (exclude current project)
  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug && p.status === 'published')
    .slice(0, 2);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16 relative overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Navigation Breadcrumb */}
      <div>
        <Link href="/projects">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects Showcase
          </Button>
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          {project.clientProject ? (
            <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded-md bg-amber-500 text-slate-950 shadow-sm">
              Client Project
            </span>
          ) : null}
          <Badge variant="accent">{project.category}</Badge>
          {project.featured ? (
            <Badge variant="outline" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1 text-blue-500" /> Flagship Project
            </Badge>
          ) : null}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          {project.title}
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl">
          {project.shortDescription}
        </p>

        {/* Action Buttons & Tech Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-y border-slate-200/80 dark:border-slate-800 py-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mr-2">
              Technologies:
            </span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm" className="font-semibold">
                  <Github className="w-4 h-4 mr-2" /> Repository
                </Button>
              </a>
            ) : null}
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button variant="primary" size="sm" className="font-semibold">
                  Live Application <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* LARGE COVER HERO IMAGE (Clickable to Live Application) */}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="group/hero block aspect-[1.95/1] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xl relative shadow-inner cursor-pointer"
          title={`Open live application for ${project.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover/hero:scale-[1.015] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-6">
            <span className="text-xs sm:text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-xl shadow-lg inline-flex items-center gap-2">
              Launch Live Project <ExternalLink className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono text-white/90 bg-black/70 px-3 py-1.5 rounded-lg hidden xs:inline-block">
              {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </span>
          </div>
        </a>
      ) : (
        <div className="aspect-[1.95/1] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xl relative shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      {/* PROBLEM & GOAL SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The Problem */}
        <Card className="space-y-4 p-8 border-l-4 border-l-amber-500 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-lg">
            <AlertTriangle className="w-5 h-5" /> The Problem &amp; Context
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {project.problem}
          </p>
        </Card>

        {/* The Goal */}
        <Card className="space-y-4 p-8 border-l-4 border-l-blue-500 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg">
            <Target className="w-5 h-5" /> Objective &amp; Goal
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {project.goal || project.solution}
          </p>
        </Card>
      </div>

      {/* THE ENGINEERING SOLUTION */}
      <Card className="p-8 sm:p-10 space-y-4 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl">
          <Lightbulb className="w-6 h-6" /> The Engineering Solution
        </div>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {project.solution}
        </p>
      </Card>

      {/* VERIFIED KEY FEATURES */}
      <div className="space-y-6">
        <div className="border-b border-slate-200/80 dark:border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Key Features &amp; Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.features.map((feat, i) => (
            <Card key={i} className="flex items-start gap-3.5 p-5 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {feat}
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* RECRUITER-FOCUSED ENGINEERING ARCHITECTURE */}
      {project.engineeringArchitecture ? (
        <div className="space-y-6">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Engineering Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.engineeringArchitecture.frontend ? (
              <Card className="p-6 space-y-3 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <FileCode className="w-4 h-4" /> Frontend Architecture
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.engineeringArchitecture.frontend}
                </p>
              </Card>
            ) : null}

            {project.engineeringArchitecture.backend ? (
              <Card className="p-6 space-y-3 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Server className="w-4 h-4" /> Backend &amp; API Layer
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.engineeringArchitecture.backend}
                </p>
              </Card>
            ) : null}

            {project.engineeringArchitecture.database ? (
              <Card className="p-6 space-y-3 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Database className="w-4 h-4" /> Database Schema
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.engineeringArchitecture.database}
                </p>
              </Card>
            ) : null}

            {project.engineeringArchitecture.auth ? (
              <Card className="p-6 space-y-3 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Lock className="w-4 h-4" /> Auth &amp; Access Control
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.engineeringArchitecture.auth}
                </p>
              </Card>
            ) : null}

            {project.engineeringArchitecture.storage ? (
              <Card className="p-6 space-y-3 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Cloud className="w-4 h-4" /> Media &amp; Storage
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.engineeringArchitecture.storage}
                </p>
              </Card>
            ) : null}

            {project.engineeringArchitecture.deployment ? (
              <Card className="p-6 space-y-3 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <ExternalLink className="w-4 h-4" /> Hosting &amp; Delivery
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.engineeringArchitecture.deployment}
                </p>
              </Card>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* ENGINEERING DECISIONS & RATIONALE */}
      {project.engineeringDecisions && project.engineeringDecisions.length > 0 ? (
        <div className="space-y-6">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Key Engineering Decisions
            </h2>
          </div>

          <div className="space-y-4">
            {project.engineeringDecisions.map((item, idx) => (
              <Card key={idx} className="p-6 space-y-2 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  {item.decision}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-8">
                  {item.rationale}
                </p>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {/* SCREENSHOT GALLERY */}
      {project.gallery && project.gallery.length > 0 ? (
        <div className="space-y-6">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Interface &amp; Product Views
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.gallery.map((imgUrl, i) => (
              <a
                key={i}
                href={project.liveUrl || imgUrl}
                target="_blank"
                rel="noreferrer"
                className="block aspect-[1.95/1] rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md bg-slate-950 relative group cursor-pointer"
                title={`View ${project.title} live interface`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl}
                  alt={`${project.title} view ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-white bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md inline-flex items-center gap-1.5">
                    View Live <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {/* MEASURED RESULTS & VERIFICATION */}
      {project.results && project.results.length > 0 ? (
        <Card className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-blue-50/80 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-blue-950/30 border-blue-200 dark:border-blue-900/60 p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold text-xl">
            <TrendingUp className="w-6 h-6" /> Verified Production Results
          </div>
          <ul className="space-y-3">
            {project.results.map((res, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-1.5" />
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {/* RELATED WORK */}
      {relatedProjects.length > 0 ? (
        <div className="space-y-6 pt-6 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              More Work
            </h3>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="font-semibold text-xs">
                View All Projects <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedProjects.map((rel) => (
              <Card key={rel._id} hoverable className="p-6 flex flex-col justify-between bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {rel.clientProject ? (
                      <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-amber-500 text-slate-950">
                        Client Project
                      </span>
                    ) : null}
                    <Badge variant="accent" className="text-[10px]">{rel.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{rel.title}</CardTitle>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                    {rel.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <Link href={`/projects/${rel.slug}`}>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                      Read Case Study <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {/* FINAL CASE STUDY CTA */}
      <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Need a similar full-stack application or business solution?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Let&apos;s discuss scope, architecture, timeline, and pricing.
          </p>
        </div>
        <Link href="/contact">
          <Button variant="primary" size="lg" className="font-semibold text-sm">
            Start a Project with Satyesh
          </Button>
        </Link>
      </div>
    </article>
  );
}
