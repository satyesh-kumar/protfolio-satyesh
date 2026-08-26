'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Service } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const res = await api.getServices();
    setServices(res);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (editingService._id) {
      setServices((prev) => prev.map((s) => (s._id === editingService._id ? ({ ...s, ...editingService } as Service) : s)));
    } else {
      const newSrv: Service = {
        _id: `srv-${Date.now()}`,
        title: editingService.title || 'New Service',
        slug: editingService.slug || 'new-service',
        shortDescription: editingService.shortDescription || '',
        description: editingService.description || '',
        features: editingService.features || ['Feature 1'],
        icon: editingService.icon || 'Code2',
        featured: editingService.featured ?? false,
        status: editingService.status || 'published',
        order: services.length + 1,
      };
      setServices((prev) => [...prev, newSrv]);
    }
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this service offering?')) {
      setServices((prev) => prev.filter((s) => s._id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-text dark:text-brand-dark-text">
            Services Offering CMS
          </h1>
          <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
            Manage freelance services, features, business outcomes, and order.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() =>
            setEditingService({
              title: '',
              slug: '',
              shortDescription: '',
              description: '',
              features: ['Custom Responsive Layout', 'Sub-second Load Times'],
              icon: 'Globe',
              featured: false,
              status: 'published',
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </Button>
      </div>

      {editingService ? (
        <Card className="p-8 border-brand-blue shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border dark:border-brand-dark-border">
            <h3 className="text-xl font-bold">{editingService._id ? 'Edit Service' : 'Add New Service'}</h3>
            <Button variant="ghost" size="sm" onClick={() => setEditingService(null)}><X className="w-4 h-4" /></Button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Service Title *"
                value={editingService.title || ''}
                onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                  })
                }
              />
              <Input
                label="Icon Name (Globe / Code2 / ShoppingBag / Wrench)"
                value={editingService.icon || 'Globe'}
                onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
              />
            </div>

            <Textarea
              label="Short Outcome Summary *"
              rows={2}
              value={editingService.shortDescription || ''}
              onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-brand-border dark:border-brand-dark-border">
              <Button type="button" variant="outline" onClick={() => setEditingService(null)}>Cancel</Button>
              <Button type="submit" variant="primary"><Check className="w-4 h-4 mr-2" /> Save Service</Button>
            </div>
          </form>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((srv) => (
          <Card key={srv._id} className="p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{srv.title}</h3>
                <Badge variant={srv.status === 'published' ? 'success' : 'outline'}>{srv.status}</Badge>
              </div>
              <p className="text-sm text-brand-muted dark:text-brand-dark-muted">{srv.shortDescription}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border dark:border-brand-dark-border flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditingService(srv)}><Edit className="w-4 h-4 mr-1.5" /> Edit</Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(srv._id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
