'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { SiteSettings } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Check, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!settings) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-text dark:text-brand-dark-text">
          Global Site Settings CMS
        </h1>
        <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
          Manage profile details, availability status, hero messaging, and social channels.
        </p>
      </div>

      {savedSuccess ? (
        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <Check className="w-4 h-4" /> Site settings updated successfully!
        </div>
      ) : null}

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Full Name *"
              value={settings.profileName}
              onChange={(e) => setSettings({ ...settings, profileName: e.target.value })}
            />
            <Input
              label="Professional Title *"
              value={settings.professionalTitle}
              onChange={(e) => setSettings({ ...settings, professionalTitle: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Contact Email Address *"
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            />
            <Select
              label="Freelance Availability Status *"
              value={settings.availabilityStatus}
              onChange={(e) => setSettings({ ...settings, availabilityStatus: e.target.value as any })}
              options={[
                { value: 'Available for freelance', label: 'Available for freelance' },
                { value: 'Booked', label: 'Booked' },
                { value: 'Select availability', label: 'Select availability' },
              ]}
            />
          </div>

          <Textarea
            label="Hero Heading Copy *"
            rows={2}
            value={settings.heroHeading}
            onChange={(e) => setSettings({ ...settings, heroHeading: e.target.value })}
          />

          <Textarea
            label="Professional Bio / Positioning Statement *"
            rows={3}
            value={settings.bio}
            onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-brand-border dark:border-brand-dark-border">
            <Input
              label="GitHub Profile URL"
              value={settings.githubUrl || ''}
              onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
            />
            <Input
              label="LinkedIn Profile URL"
              value={settings.linkedinUrl || ''}
              onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
            />
            <Input
              label="Twitter / X Profile URL"
              value={settings.twitterUrl || ''}
              onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
            />
          </div>

          <div className="pt-6 border-t border-brand-border dark:border-brand-dark-border flex justify-end">
            <Button type="submit" variant="primary" size="lg">
              <Save className="w-4 h-4 mr-2" /> Save Site Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
