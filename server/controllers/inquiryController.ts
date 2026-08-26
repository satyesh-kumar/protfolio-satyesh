import { Request, Response, NextFunction } from 'express';
import { Inquiry } from '../models/Inquiry';
import nodemailer from 'nodemailer';

export async function submitInquiry(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, business, projectType, budget, timeline, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Name, email, and message are required fields.',
      });
    }

    const inquiry = new Inquiry({
      name,
      email,
      business,
      projectType,
      budget,
      timeline,
      message,
      status: 'NEW',
    });

    await inquiry.save();

    // Trigger asynchronous email notification if SMTP is configured
    if (process.env.SMTP_HOST && process.env.ADMIN_EMAIL) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Lead System" <${process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: `🔔 New Freelance Lead: ${name} (${projectType})`,
          text: `Name: ${name}\nEmail: ${email}\nBusiness: ${business || 'N/A'}\nBudget: ${budget}\nTimeline: ${timeline}\nMessage: ${message}`,
        });
      } catch (mailErr) {
        console.warn('Email notification dispatch failed:', mailErr);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully and persisted to database.',
      data: { id: inquiry._id },
    });
  } catch (err) {
    next(err);
  }
}

export async function getInquiries(req: Request, res: Response, next: NextFunction) {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (err) {
    next(err);
  }
}

export async function updateInquiryStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { status, notes } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(notes !== undefined && { notes }) },
      { new: true }
    );
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, data: inquiry });
  } catch (err) {
    next(err);
  }
}

export async function deleteInquiry(req: Request, res: Response, next: NextFunction) {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    next(err);
  }
}
