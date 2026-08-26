import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeroSection } from '@/components/hero/hero-section';
import { WorkflowSection } from '@/components/sections/workflow-section';
import { TechArchitectureSystem } from '@/components/sections/tech-architecture';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Code2,
  ShoppingBag,
  Wrench,
  Layers,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, projects, services, experience, testimonials] = await Promise.all([
    api.getSettings(),
    api.getProjects(),
    api.getServices(),
    api.getExperience(),
    api.getTestimonials(),
  ]);

  const featuredProjects = projects.filter((p) => p.featured || p.status === 'published').slice(0, 4);
  const featuredServices = services.slice(0, 4);

  return (
    <div className="space-y-12 pb-20 relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <HeroSection settings={settings} />

      {/* 2. WORKFLOW SECTION */}
      <ScrollReveal>
        <WorkflowSection />
      </ScrollReveal>

      {/* 3. TECHNOLOGY SYSTEM */}
      <ScrollReveal>
        <TechArchitectureSystem />
      </ScrollReveal>

      {/* 4. SELECTED WORK */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                PROOF OF ENGINEERING
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                SELECTED WORK
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
                A selection of products and experiences I&apos;ve designed and built.
              </p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className="group font-semibold text-xs sm:text-sm">
                <span>View All Projects</span>
                <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {featuredProjects.map((project) => (
              <Card key={project._id} hoverable className="group flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div>
                  <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 mb-6 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="accent">{project.category}</Badge>
                  </div>

                  <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-xl sm:text-2xl">
                    {project.title}
                  </CardTitle>

                  <CardDescription className="line-clamp-2 mt-2 text-xs sm:text-sm">
                    {project.shortDescription}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <CardFooter className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Case Study Available
                  </span>
                  <Link href={`/projects/${project.slug}`}>
                    <Button size="sm" variant="outline" className="group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-xs font-semibold">
                      Read Case Study
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 5. SERVICES & SOLUTIONS */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="max-w-2xl mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              OFFERINGS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineering Offerings
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
              Tailored full-stack services engineered for high conversion rates and maintainable codebases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <Card key={service._id} hoverable className="flex flex-col justify-between p-6 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5 shadow-sm">
                    {service.icon === 'Globe' && <Globe className="w-6 h-6" />}
                    {service.icon === 'Code2' && <Code2 className="w-6 h-6" />}
                    {service.icon === 'ShoppingBag' && <ShoppingBag className="w-6 h-6" />}
                    {service.icon === 'Wrench' && <Wrench className="w-6 h-6" />}
                    {!['Globe', 'Code2', 'ShoppingBag', 'Wrench'].includes(service.icon) && (
                      <Layers className="w-6 h-6" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="mt-2 text-xs leading-relaxed">
                    {service.shortDescription}
                  </CardDescription>

                  <ul className="mt-4 space-y-2">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <Link href="/contact">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                      Request Consultation <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 6. EXPERIENCE TIMELINE */}
      {experience.length > 0 ? (
        <ScrollReveal>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="max-w-2xl mb-8 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                TRACK RECORD
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Experience &amp; History
              </h2>
            </div>

            <div className="space-y-4">
              {experience.map((exp) => (
                <Card key={exp._id} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-7 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{exp.role}</h3>
                      <Badge variant="outline">{exp.company}</Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-3xl font-medium">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="accent" className="text-[10px]">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                    <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                    <span>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </ScrollReveal>
      ) : null}
    </div>
  );
}
