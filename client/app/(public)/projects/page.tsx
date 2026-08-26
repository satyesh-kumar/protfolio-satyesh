import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink, Github, Sparkles } from 'lucide-react';

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await api.getProjects();
  const publishedProjects = projects.filter((p) => p.status === 'published');

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-3xl space-y-4">
        <Badge variant="accent">
          <Sparkles className="w-3 h-3 mr-1 text-indigo-500" /> Technical Portfolio
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Featured Projects & Case Studies
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          Deep-dive case studies detailing real problem-solving, architectural design, technical challenges, and empirical results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {publishedProjects.map((project) => (
          <Card key={project._id} hoverable className="group flex flex-col justify-between p-6">
            <div>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 mb-6 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="accent">{project.category}</Badge>
                {project.featured ? <Badge variant="outline">Featured</Badge> : null}
              </div>

              <CardTitle className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-2xl">
                {project.title}
              </CardTitle>

              <CardDescription className="mt-2 leading-relaxed text-sm">
                {project.shortDescription}
              </CardDescription>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="default" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <CardFooter className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    aria-label="Live Demo Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : null}
              </div>

              <Link href={`/projects/${project.slug}`}>
                <Button size="sm" variant="primary">
                  View Full Case Study <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

