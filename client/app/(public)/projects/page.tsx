import { Metadata } from 'next';
import { api } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { ProjectsGallery } from './projects-gallery';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Selected Work & Technical Case Studies | Satyesh Kumar',
  description:
    'Explore production case studies including PaperBridge (academic PYQ platform) and Manoj Traders (production e-commerce client project) engineered by Satyesh Kumar.',
};

export default async function ProjectsPage() {
  const projects = await api.getProjects();
  const publishedProjects = projects
    .filter((p) => p.status === 'published')
    .sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header section */}
      <div className="max-w-3xl space-y-3">
        <Badge variant="accent">
          <Sparkles className="w-3 h-3 mr-1 text-blue-500" /> Proof of Engineering
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Featured Work &amp; Case Studies
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Real problems, live production deployments, and deep architectural case studies covering full-stack systems and freelance client deliverables.
        </p>
      </div>

      {/* Interactive Projects Gallery with Filter */}
      <ProjectsGallery initialProjects={publishedProjects} />
    </div>
  );
}
