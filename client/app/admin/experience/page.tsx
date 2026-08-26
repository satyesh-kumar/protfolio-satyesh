'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Experience } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';

export default function AdminExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);

  useEffect(() => {
    loadExperience();
  }, []);

  const loadExperience = async () => {
    const res = await api.getExperience();
    setExperience(res);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    if (editingExp._id) {
      setExperience((prev) => prev.map((exp) => (exp._id === editingExp._id ? ({ ...exp, ...editingExp } as Experience) : exp)));
    } else {
      const newExp: Experience = {
        _id: `exp-${Date.now()}`,
        company: editingExp.company || 'Client Work',
        role: editingExp.role || 'Full-Stack Developer',
        description: editingExp.description || '',
        technologies: editingExp.technologies || ['Next.js', 'React'],
        startDate: editingExp.startDate || '2023-01-01',
        current: editingExp.current ?? true,
        order: experience.length + 1,
      };
      setExperience((prev) => [newExp, ...prev]);
    }
    setEditingExp(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete experience item?')) {
      setExperience((prev) => prev.filter((exp) => exp._id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-text dark:text-brand-dark-text">
            Experience CMS
          </h1>
          <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
            Manage professional roles, client development work, and career milestones.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() =>
            setEditingExp({
              company: '',
              role: '',
              description: '',
              technologies: ['Next.js', 'Express', 'TypeScript'],
              startDate: '2023-01-01',
              current: true,
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Add Role
        </Button>
      </div>

      {editingExp ? (
        <Card className="p-8 border-brand-blue shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border dark:border-brand-dark-border">
            <h3 className="text-xl font-bold">{editingExp._id ? 'Edit Experience' : 'Add Experience Entry'}</h3>
            <Button variant="ghost" size="sm" onClick={() => setEditingExp(null)}><X className="w-4 h-4" /></Button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Role Title *"
                value={editingExp.role || ''}
                onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
              />
              <Input
                label="Company / Organization *"
                value={editingExp.company || ''}
                onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
              />
            </div>

            <Textarea
              label="Role Description & Achievements *"
              rows={3}
              value={editingExp.description || ''}
              onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-brand-border dark:border-brand-dark-border">
              <Button type="button" variant="outline" onClick={() => setEditingExp(null)}>Cancel</Button>
              <Button type="submit" variant="primary"><Check className="w-4 h-4 mr-2" /> Save Entry</Button>
            </div>
          </form>
        </Card>
      ) : null}

      <div className="space-y-4">
        {experience.map((exp) => (
          <Card key={exp._id} className="p-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold">{exp.role}</h3>
                <Badge variant="accent">{exp.company}</Badge>
              </div>
              <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditingExp(exp)}><Edit className="w-4 h-4" /></Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(exp._id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
