import { Request, Response, NextFunction } from 'express';
import { Experience } from '../models/Experience';

export async function getExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const list = await Experience.find().sort({ order: 1, startDate: -1 });
    res.json({ success: true, data: list });
  } catch (err) { next(err); }
}

export async function createExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const item = new Experience(req.body);
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function updateExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function deleteExperience(req: Request, res: Response, next: NextFunction) {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Experience entry deleted' });
  } catch (err) { next(err); }
}
