import { Schema, model, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  featured: boolean;
  status: 'draft' | 'published';
  order: number;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    avatar: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, default: 5 },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial = model<ITestimonial>('Testimonial', testimonialSchema);
