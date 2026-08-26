import Link from 'next/link';
import { api } from '@/lib/api';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FolderKanban,
  CheckCircle2,
  Wrench,
  Inbox,
  Plus,
  ArrowRight,
  Eye,
  Settings,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [projects, services, experience] = await Promise.all([
    api.getProjects(),
    api.getServices(),
    api.getExperience(),
  ]);

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.status === 'published').length;
  const totalServices = services.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-text dark:text-brand-dark-text">
          CMS Overview Dashboard
        </h1>
        <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
          Manage dynamic portfolio content, case studies, service offerings, and incoming client leads.
        </p>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-brand-dark-muted">
              Total Projects
            </p>
            <h3 className="text-3xl font-extrabold mt-1">{totalProjects}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-brand-blue flex items-center justify-center">
            <FolderKanban className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-brand-dark-muted">
              Published Projects
            </p>
            <h3 className="text-3xl font-extrabold mt-1">{publishedProjects}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-brand-dark-muted">
              Active Services
            </p>
            <h3 className="text-3xl font-extrabold mt-1">{totalServices}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-brand-dark-muted">
              Lead Inquiries
            </p>
            <h3 className="text-3xl font-extrabold mt-1">Active</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Quick Action Controls */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text">Quick CMS Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projects">
            <Button size="sm" variant="primary">
              <Plus className="w-4 h-4 mr-1.5" /> Manage Case Studies
            </Button>
          </Link>
          <Link href="/admin/inquiries">
            <Button size="sm" variant="outline">
              <Inbox className="w-4 h-4 mr-1.5" /> View Lead Pipeline
            </Button>
          </Link>
          <Link href="/admin/services">
            <Button size="sm" variant="outline">
              <Wrench className="w-4 h-4 mr-1.5" /> Edit Services
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button size="sm" variant="ghost">
              <Settings className="w-4 h-4 mr-1.5" /> Site Settings
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Projects Table Preview */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Projects in Content System</h3>
          <Link href="/admin/projects">
            <Button size="sm" variant="ghost" className="text-xs">
              View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-brand-border dark:border-brand-dark-border text-xs text-brand-muted uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Featured</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border dark:divide-brand-dark-border">
              {projects.map((p) => (
                <tr key={p._id} className="hover:bg-brand-bg-secondary/50 dark:hover:bg-brand-dark-bg/50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-brand-text dark:text-brand-dark-text">{p.title}</td>
                  <td className="py-3.5 px-4"><Badge variant="accent">{p.category}</Badge></td>
                  <td className="py-3.5 px-4">
                    <Badge variant={p.status === 'published' ? 'success' : 'outline'}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">{p.featured ? 'Yes' : 'No'}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/projects/${p.slug}`}>
                      <Button size="sm" variant="ghost" className="h-8 px-2">
                        <Eye className="w-4 h-4 text-brand-muted hover:text-brand-blue" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
