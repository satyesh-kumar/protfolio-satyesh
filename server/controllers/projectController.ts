import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project';

export async function getProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const projects = await Project.find({ status: 'published' }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
}

export async function getProjectBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    let project = await Project.findOne({ slug });
    if (!project) {
      if (slug === 'paperbridge') {
        project = await Project.findOne({ slug: { $in: ['paper-bridge', 'college-pyq-management-system'] } });
      } else if (slug === 'ecommerce-client') {
        project = await Project.findOne({ slug: 'manoj-traders' });
      } else if (slug === 'manoj-traders') {
        project = await Project.findOne({ slug: 'ecommerce-client' });
      }
    }
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project case study not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

export async function createProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    next(err);
  }
}
