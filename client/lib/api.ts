import { Project, Service, Experience, Inquiry, Testimonial, SiteSettings } from '@/types';
import { mockProjects, mockServices, mockExperience, mockTestimonials, mockSiteSettings } from '@/data/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchWithFallback<T>(url: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    // Graceful fallback to static specification mock data
    return fallbackData;
  }
}

export const api = {
  // Public API Endpoints
  async getProjects(): Promise<Project[]> {
    return fetchWithFallback<Project[]>('/projects', mockProjects);
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find((p) => p.slug === slug) || null;
  },

  async getServices(): Promise<Service[]> {
    return fetchWithFallback<Service[]>('/services', mockServices);
  },

  async getExperience(): Promise<Experience[]> {
    return fetchWithFallback<Experience[]>('/experience', mockExperience);
  },

  async getTestimonials(): Promise<Testimonial[]> {
    return fetchWithFallback<Testimonial[]>('/testimonials', mockTestimonials);
  },

  async getSettings(): Promise<SiteSettings> {
    return fetchWithFallback<SiteSettings>('/settings', mockSiteSettings);
  },

  // Public Lead Inquiry Submission
  async submitInquiry(data: Partial<Inquiry>): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorJson = await res.json();
        throw new Error(errorJson.message || 'Failed to submit inquiry');
      }
      return await res.json();
    } catch (err: any) {
      // Local development simulated response if backend server is offline
      console.warn('API error submitting inquiry, fallback simulated:', err);
      return {
        success: true,
        message: 'Inquiry received successfully! (Simulated submission)',
      };
    }
  },
};
