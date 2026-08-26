'use client';

import { useState } from 'react';
import { Testimonial } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquareQuote, ShieldAlert, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    const newT: Testimonial = {
      _id: `t-${Date.now()}`,
      name: editingTestimonial.name || 'Client',
      role: editingTestimonial.role || 'Founder',
      company: editingTestimonial.company || 'Business',
      content: editingTestimonial.content || '',
      rating: 5,
      featured: true,
      status: 'published',
      order: testimonials.length + 1,
    };
    setTestimonials((prev) => [...prev, newT]);
    setEditingTestimonial(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-text dark:text-brand-dark-text">
            Testimonials CMS
          </h1>
          <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
            Manage genuine client reviews and testimonials.
          </p>
        </div>
        <Button variant="primary" onClick={() => setEditingTestimonial({ name: '', role: '', company: '', content: '' })}>
          <Plus className="w-4 h-4 mr-2" /> Add Real Testimonial
        </Button>
      </div>

      <Card className="bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 p-6 space-y-2">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
          <ShieldAlert className="w-4 h-4" /> Strict Compliance Rule (PDF Section 3 & Section 18)
        </div>
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          Antigravity must never invent fake client logos, fake statistics, or fabricated testimonials. Only genuine client feedback provided by Satyesh may be entered here.
        </p>
      </Card>

      {editingTestimonial ? (
        <Card className="p-8 border-brand-blue space-y-6">
          <h3 className="text-xl font-bold">Add Verified Testimonial</h3>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input label="Client Name *" value={editingTestimonial.name || ''} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} />
              <Input label="Client Role *" value={editingTestimonial.role || ''} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })} />
              <Input label="Company Name *" value={editingTestimonial.company || ''} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })} />
            </div>
            <Textarea label="Testimonial Quote *" rows={3} value={editingTestimonial.content || ''} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })} />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setEditingTestimonial(null)}>Cancel</Button>
              <Button type="submit" variant="primary">Save Testimonial</Button>
            </div>
          </form>
        </Card>
      ) : null}

      {testimonials.length === 0 ? (
        <Card className="p-12 text-center text-brand-muted dark:text-brand-dark-muted">
          <MessageSquareQuote className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-semibold">No testimonials entered yet. Add genuine client reviews when available.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <Card key={t._id} className="p-6 space-y-4">
              <p className="text-sm italic">&ldquo;{t.content}&rdquo;</p>
              <div className="pt-2 border-t border-brand-border dark:border-brand-dark-border flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">{t.name}</h4>
                  <p className="text-xs text-brand-muted">{t.role}, {t.company}</p>
                </div>
                <Button size="sm" variant="danger" onClick={() => setTestimonials((prev) => prev.filter((item) => item._id !== t._id))}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
