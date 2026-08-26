'use client';

import { useState } from 'react';
import { Inquiry, InquiryStatus } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Inbox, Mail, Building, Calendar, DollarSign, Trash2, CheckCircle2 } from 'lucide-react';

const mockInquiriesList: Inquiry[] = [
  {
    _id: 'inq-1',
    name: 'Alex Mercer',
    email: 'alex@startuptech.io',
    business: 'StartupTech Inc',
    projectType: 'Full-Stack Web Application',
    budget: '$3,000 - $7,000',
    timeline: '2-4 Weeks',
    message: 'We need a custom SaaS MVP built with Next.js App Router, Express API, MongoDB, and Clerk authentication.',
    status: 'NEW',
    notes: 'High potential client inquiry.',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'inq-2',
    name: 'Elena Rostova',
    email: 'elena@designstudio.co',
    business: 'DesignStudio Agency',
    projectType: 'Business Website',
    budget: '$1,000 - $3,000',
    timeline: '1-2 Weeks',
    message: 'Looking for a premium editorial off-white brand website with sub-second page loads and custom typography.',
    status: 'CONTACTED',
    notes: 'Sent initial response email.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiriesList);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this inquiry permanently?')) {
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
    }
  };

  const filteredInquiries = filterStatus === 'ALL'
    ? inquiries
    : inquiries.filter((inq) => inq.status === filterStatus);

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'NEW': return <Badge variant="accent">NEW</Badge>;
      case 'CONTACTED': return <Badge variant="warning">CONTACTED</Badge>;
      case 'QUALIFIED': return <Badge variant="default">QUALIFIED</Badge>;
      case 'PROPOSAL': return <Badge variant="default">PROPOSAL</Badge>;
      case 'WON': return <Badge variant="success">WON</Badge>;
      case 'LOST': return <Badge variant="outline">LOST</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-text dark:text-brand-dark-text">
            Freelance Lead Pipeline Manager
          </h1>
          <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
            Track inquiries, update pipeline status (`NEW` → `CONTACTED` → `QUALIFIED` → `PROPOSAL` → `WON`/`LOST`), and record internal client notes.
          </p>
        </div>

        <div className="w-48">
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Inquiries' },
              { value: 'NEW', label: 'NEW' },
              { value: 'CONTACTED', label: 'CONTACTED' },
              { value: 'QUALIFIED', label: 'QUALIFIED' },
              { value: 'PROPOSAL', label: 'PROPOSAL' },
              { value: 'WON', label: 'WON' },
              { value: 'LOST', label: 'LOST' },
            ]}
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredInquiries.length === 0 ? (
          <Card className="p-12 text-center text-brand-muted dark:text-brand-dark-muted">
            <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-semibold">No inquiries found matching filter.</p>
          </Card>
        ) : (
          filteredInquiries.map((inq) => (
            <Card key={inq._id} className="p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-brand-border dark:border-brand-dark-border">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-brand-text dark:text-brand-dark-text">{inq.name}</h3>
                    {getStatusBadge(inq.status)}
                    <Badge variant="outline">{inq.projectType}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-brand-muted dark:text-brand-dark-muted mt-2">
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {inq.email}</span>
                    {inq.business ? <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {inq.business}</span> : null}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-40">
                    <Select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq._id, e.target.value as InquiryStatus)}
                      options={[
                        { value: 'NEW', label: 'Status: NEW' },
                        { value: 'CONTACTED', label: 'Status: CONTACTED' },
                        { value: 'QUALIFIED', label: 'Status: QUALIFIED' },
                        { value: 'PROPOSAL', label: 'Status: PROPOSAL' },
                        { value: 'WON', label: 'Status: WON' },
                        { value: 'LOST', label: 'Status: LOST' },
                      ]}
                    />
                  </div>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(inq._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Inquiry Metadata Pills */}
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-brand-muted dark:text-brand-dark-muted">
                <span className="flex items-center gap-1 px-3 py-1 rounded bg-brand-bg-secondary dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border">
                  <DollarSign className="w-3.5 h-3.5 text-brand-blue" /> Budget: {inq.budget || 'Unspecified'}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded bg-brand-bg-secondary dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border">
                  <Calendar className="w-3.5 h-3.5 text-brand-blue" /> Timeline: {inq.timeline || 'Unspecified'}
                </span>
              </div>

              {/* Inquiry Message */}
              <div className="bg-brand-bg-secondary/60 dark:bg-brand-dark-bg/60 p-4 rounded-lg border border-brand-border dark:border-brand-dark-border space-y-1">
                <span className="text-xs font-semibold text-brand-muted dark:text-brand-dark-muted uppercase tracking-widest">
                  Client Message
                </span>
                <p className="text-sm text-brand-text dark:text-brand-dark-text leading-relaxed">
                  {inq.message}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
