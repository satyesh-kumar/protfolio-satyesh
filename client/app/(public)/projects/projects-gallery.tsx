'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowUpRight, Github, Sparkles, Filter } from 'lucide-react';

interface ProjectsGalleryProps {
  initialProjects: Project[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'client', label: 'Client Projects' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'academic', label: 'Academic & EdTech' },
];

export function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = initialProjects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'client') return project.clientProject === true;
    if (activeFilter === 'fullstack') {
      return (
        project.category?.toLowerCase().includes('full') ||
        project.projectType?.toLowerCase().includes('full')
      );
    }
    if (activeFilter === 'academic') {
      return (
        project.category?.toLowerCase().includes('academic') ||
        project.projectType?.toLowerCase().includes('academic') ||
        project.slug === 'paperbridge'
      );
    }
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-blue-500" /> Filter:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {filteredProjects.map((project) => (
          <Card key={project._id} hoverable className="group flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
            <div>
              {/* Clickable Image Preview Linking to Live Project */}
              <a
                href={project.liveUrl || `/projects/${project.slug}`}
                target={project.liveUrl ? '_blank' : '_self'}
                rel={project.liveUrl ? 'noreferrer' : undefined}
                className="group/img block aspect-[1.95/1] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200/90 dark:border-slate-800 mb-6 relative shadow-md transition-all duration-300 hover:shadow-xl hover:border-blue-500/60 cursor-pointer"
                title={`Open live project for ${project.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover/img:scale-[1.02] transition-transform duration-500"
                />

                {/* Interactive hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 sm:p-4">
                  <span className="text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg shadow-md inline-flex items-center gap-1.5">
                    Open Live Project <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  {project.liveUrl ? (
                    <span className="text-[10px] sm:text-[11px] font-mono text-white/90 bg-black/70 px-2.5 py-1 rounded-md hidden xs:inline-block">
                      {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                  ) : null}
                </div>

                {project.clientProject ? (
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-amber-500 text-slate-950 shadow-md">
                      Client Project
                    </span>
                  </div>
                ) : null}
              </a>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="accent">{project.category}</Badge>
                {project.featured ? (
                  <Badge variant="outline" className="text-[10px]">
                    <Sparkles className="w-2.5 h-2.5 mr-1 text-blue-500" /> Featured
                  </Badge>
                ) : null}
                {project.projectType ? (
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    • {project.projectType}
                  </span>
                ) : null}
              </div>

              <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-xl sm:text-2xl">
                {project.title}
              </CardTitle>

              <CardDescription className="line-clamp-2 mt-2 text-xs sm:text-sm">
                {project.shortDescription}
              </CardDescription>

              <div className="flex flex-wrap gap-2 mt-5">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <CardFooter className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Link href={`/projects/${project.slug}`}>
                  <Button size="sm" variant="primary" className="text-xs font-semibold">
                    View Case Study
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline" className="group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-xs font-semibold">
                      Live Demo
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </a>
                ) : null}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
