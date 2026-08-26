'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Project } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye, Check, X } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const res = await api.getProjects();
    setProjects(res);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (editingProject._id) {
      setProjects((prev) => prev.map((p) => (p._id === editingProject._id ? ({ ...p, ...editingProject } as Project) : p)));
    } else {
      const newProj: Project = {
        _id: `proj-${Date.now()}`,
        title: editingProject.title || 'Untitled Case Study',
        slug: editingProject.slug || `project-${Date.now()}`,
        shortDescription: editingProject.shortDescription || '',
        category: editingProject.category || 'Full-Stack Web Application',
        problem: editingProject.problem || '',
        solution: editingProject.solution || '',
        features: editingProject.features || [],
        challenges: editingProject.challenges || [],
        solutions: editingProject.solutions || [],
        results: editingProject.results || [],
        technologies: editingProject.technologies || ['Next.js', 'TypeScript'],
        coverImage: editingProject.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        gallery: editingProject.gallery || [],
        featured: editingProject.featured ?? true,
        status: editingProject.status || 'published',
        order: editingProject.order || projects.length + 1,
      };
      setProjects((prev) => [newProj, ...prev]);
    }

    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-text dark:text-brand-dark-text">
            Project Case Studies Manager
          </h1>
          <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
            Create, edit, feature, publish, or reorder technical case studies.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() =>
            setEditingProject({
              title: '',
              slug: '',
              shortDescription: '',
              category: 'Full-Stack Web Application',
              problem: '',
              solution: '',
              features: ['Feature 1'],
              challenges: ['Challenge 1'],
              solutions: ['Solution 1'],
              results: ['Result 1'],
              technologies: ['Next.js', 'TypeScript', 'Express', 'MongoDB'],
              status: 'published',
              featured: true,
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> New Case Study
        </Button>
      </div>

      {/* Editor Modal / Drawer Form */}
      {editingProject ? (
        <Card className="p-8 border-brand-blue shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border dark:border-brand-dark-border">
            <h3 className="text-xl font-bold">
              {editingProject._id ? 'Edit Case Study' : 'Create New Case Study'}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setEditingProject(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Project Title *"
                value={editingProject.title || ''}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                  })
                }
              />
              <Input
                label="Slug *"
                value={editingProject.slug || ''}
                onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
              />
            </div>

            <Textarea
              label="Short Description *"
              rows={2}
              value={editingProject.shortDescription || ''}
              onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Category"
                value={editingProject.category || ''}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
              />
              <Select
                label="Status"
                value={editingProject.status || 'published'}
                onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                options={[
                  { value: 'published', label: 'Published' },
                  { value: 'draft', label: 'Draft' },
                ]}
              />
            </div>

            <Textarea
              label="Problem Statement"
              rows={3}
              value={editingProject.problem || ''}
              onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
            />

            <Textarea
              label="Engineering Solution"
              rows={3}
              value={editingProject.solution || ''}
              onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
            />

            <Input
              label="Cover Image URL (Cloudinary / External)"
              value={editingProject.coverImage || ''}
              onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-brand-border dark:border-brand-dark-border">
              <Button type="button" variant="outline" onClick={() => setEditingProject(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                <Check className="w-4 h-4 mr-2" /> Save Case Study
              </Button>
            </div>
          </form>
        </Card>
      ) : null}

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card key={project._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-brand-text dark:text-brand-dark-text">{project.title}</h3>
                <Badge variant="accent">{project.category}</Badge>
                <Badge variant={project.status === 'published' ? 'success' : 'outline'}>{project.status}</Badge>
              </div>
              <p className="text-sm text-brand-muted dark:text-brand-dark-muted line-clamp-1">
                {project.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button variant="outline" size="sm" onClick={() => setEditingProject(project)}>
                <Edit className="w-4 h-4 mr-1.5" /> Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(project._id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
