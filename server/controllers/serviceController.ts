import { Request, Response, NextFunction } from 'express';
import { Service } from '../models/Service';

export async function getServices(req: Request, res: Response, next: NextFunction) {
  try {
    const services = await Service.find({ status: 'published' }).sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (err) { next(err); }
}

export async function createService(req: Request, res: Response, next: NextFunction) {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ success: true, data: service });
  } catch (err) { next(err); }
}

export async function updateService(req: Request, res: Response, next: NextFunction) {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: service });
  } catch (err) { next(err); }
}

export async function deleteService(req: Request, res: Response, next: NextFunction) {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) { next(err); }
}
