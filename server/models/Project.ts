import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  projectType?: string;
  clientProject?: boolean;
  problem: string;
  goal?: string;
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
  engineeringArchitecture?: {
    frontend?: string;
    backend?: string;
    database?: string;
    auth?: string;
    storage?: string;
    deployment?: string;
  };
  engineeringDecisions?: Array<{
    decision: string;
    rationale: string;
  }>;
  contentBlocks?: Array<{ title: string; body: string }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
  };
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
    projectType: { type: String, default: '' },
    clientProject: { type: Boolean, default: false },
    problem: { type: String, default: '' },
    goal: { type: String, default: '' },
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
    engineeringArchitecture: {
      frontend: String,
      backend: String,
      database: String,
      auth: String,
      storage: String,
      deployment: String,
    },
    engineeringDecisions: [
      {
        decision: String,
        rationale: String,
      },
    ],
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
      ogImage: String,
      canonicalUrl: String,
    },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);
