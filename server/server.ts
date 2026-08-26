import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import { configureCloudinary } from './config/cloudinary';
import { errorHandler } from './middleware/errorHandler';

import projectRoutes from './routes/projectRoutes';
import serviceRoutes from './routes/serviceRoutes';
import experienceRoutes from './routes/experienceRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import settingsRoutes from './routes/settingsRoutes';
import uploadRoutes from './routes/uploadRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database & Cloudinary
connectDB();
configureCloudinary();

// Core Express Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'satyesh-portfolio-api',
    timestamp: new Date().toISOString(),
  });
});

// REST API Route Mounts
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server Listener
app.listen(PORT, () => {
  console.log(`🚀 Satyesh Portfolio Express REST API running on http://localhost:${PORT}`);
});

export default app;
