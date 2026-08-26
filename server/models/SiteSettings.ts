import { Schema, model, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  profileName: string;
  professionalTitle: string;
  tagline: string;
  bio: string;
  contactEmail: string;
  location: string;
  availabilityStatus: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  whatsappUrl?: string;
  heroHeading: string;
  heroSubheading: string;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    profileName: { type: String, default: 'Satyesh' },
    professionalTitle: { type: String, default: 'Full-Stack Software Engineer & Web Developer' },
    tagline: { type: String, default: 'I turn ideas into production-ready web applications.' },
    bio: { type: String, default: '' },
    contactEmail: { type: String, default: 'satyeshkumar578@gmail.com' },
    location: { type: String, default: 'Remote / Global' },
    availabilityStatus: { type: String, default: 'Available for freelance' },
    githubUrl: { type: String, default: 'https://github.com' },
    linkedinUrl: { type: String, default: 'https://linkedin.com' },
    twitterUrl: { type: String, default: 'https://twitter.com' },
    whatsappUrl: { type: String, default: 'https://api.whatsapp.com/send?text=Hi%20Satyesh,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!' },
    heroHeading: { type: String, default: 'I turn ideas into production-ready web applications.' },
    heroSubheading: { type: String, default: 'Full-stack engineering for businesses, startups, and personal brands.' },
  },
  { timestamps: true }
);

export const SiteSettings = model<ISiteSettings>('SiteSettings', siteSettingsSchema);
