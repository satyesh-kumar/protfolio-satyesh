import { Schema, model, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  features: string[];
  icon: string;
  featured: boolean;
  status: 'draft' | 'published';
  order: number;
}

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    description: { type: String, default: '' },
    features: [{ type: String }],
    icon: { type: String, default: 'Globe' },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service = model<IService>('Service', serviceSchema);
