export interface Project {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  technologies: string[];
  coverImage: string;
  gallery: string[];
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  contentBlocks?: Array<{
    title: string;
    body: string;
  }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  featured: boolean;
  status: 'draft' | 'published';
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  features: string[];
  icon: string;
  featured: boolean;
  status: 'draft' | 'published';
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export type InquiryStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST';

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  business?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: InquiryStatus;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  featured: boolean;
  status: 'draft' | 'published';
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  _id?: string;
  profileName: string;
  professionalTitle: string;
  tagline: string;
  bio: string;
  contactEmail: string;
  location: string;
  availabilityStatus: 'Available for freelance' | 'Booked' | 'Select availability';
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  whatsappUrl?: string;
  heroHeading: string;
  heroSubheading: string;
  metaDefaults?: {
    title?: string;
    description?: string;
  };
}
