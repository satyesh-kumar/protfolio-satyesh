import { Request, Response, NextFunction } from 'express';
import { Testimonial } from '../models/Testimonial';

export async function getTestimonials(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await Testimonial.find({ status: 'published' }).sort({ order: 1 });
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
}

export async function createTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const item = new Testimonial(req.body);
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function updateTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function deleteTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) { next(err); }
}
