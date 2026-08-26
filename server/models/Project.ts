import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
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
  contentBlocks?: Array<{ title: string; body: string }>;
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
  featured: boolean;
  status: 'draft' | 'published';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    shortDescription: { type: String, required: true },
    category: { type: String, required: true },
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    features: [{ type: String }],
    challenges: [{ type: String }],
    solutions: [{ type: String }],
    results: [{ type: String }],
    technologies: [{ type: String }],
    coverImage: { type: String, default: '' },
    gallery: [{ type: String }],
    videoUrl: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    contentBlocks: [
      {
        title: String,
        body: String,
      },
    ],
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);
