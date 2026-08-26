import { Request, Response, NextFunction } from 'express';
import { SiteSettings } from '../models/SiteSettings';

export async function getSettings(req: Request, res: Response, next: NextFunction) {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({
        profileName: 'Satyesh',
        professionalTitle: 'Full-Stack Software Engineer & Web Developer',
        tagline: 'I turn ideas into production-ready web applications.',
        bio: 'Full-stack software engineer specializing in scalable Next.js applications, Express APIs, and modern cloud architecture.',
        contactEmail: 'contact@satyesh-portfolio.com',
        location: 'Remote / Global',
        availabilityStatus: 'Available for freelance',
      });
    }
    res.json({ success: true, data: settings });
  } catch (err) { next(err); }
}

export async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json({ success: true, data: settings });
  } catch (err) { next(err); }
}
