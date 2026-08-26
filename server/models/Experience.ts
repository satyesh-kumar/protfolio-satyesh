import { Schema, model, Document } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  role: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  order: number;
}

const experienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    startDate: { type: String, required: true },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience = model<IExperience>('Experience', experienceSchema);
