import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, Globe, Code2, ShoppingBag, Wrench, Layers, Sparkles } from 'lucide-react';

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await api.getServices();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 relative overflow-hidden">
      {/* Background ambient flare */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-3xl space-y-4">
        <Badge variant="accent">
          <Sparkles className="w-3 h-3 mr-1 text-indigo-500" /> Freelance Offerings
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Services & Technical Capabilities
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          Comprehensive full-stack services engineered for small businesses, ambitious startups, and growth brands.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <Card key={service._id} id={service.slug} className="flex flex-col justify-between p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
                  {service.icon === 'Globe' && <Globe className="w-7 h-7" />}
                  {service.icon === 'Code2' && <Code2 className="w-7 h-7" />}
                  {service.icon === 'ShoppingBag' && <ShoppingBag className="w-7 h-7" />}
                  {service.icon === 'Wrench' && <Wrench className="w-7 h-7" />}
                  {!['Globe', 'Code2', 'ShoppingBag', 'Wrench'].includes(service.icon) && (
                    <Layers className="w-7 h-7" />
                  )}
                </div>
                {service.featured ? <Badge variant="accent">Primary Offering</Badge> : null}
              </div>

              <div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="mt-2 text-sm leading-relaxed">
                  {service.description || service.shortDescription}
                </CardDescription>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest">
                  Key Deliverables & Business Value
                </h4>
                <ul className="space-y-2.5">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Custom timeline & pricing quote available
              </span>
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                <Button size="sm" variant="primary">
                  Inquire Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

