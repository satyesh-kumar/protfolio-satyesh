import { Schema, model, Document } from 'mongoose';

export type InquiryStatusType = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST';

export interface IInquiry extends Document {
  name: string;
  email: string;
  business?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: InquiryStatusType;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    business: { type: String, trim: true },
    projectType: { type: String, required: true },
    budget: { type: String },
    timeline: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST'],
      default: 'NEW',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Inquiry = model<IInquiry>('Inquiry', inquirySchema);