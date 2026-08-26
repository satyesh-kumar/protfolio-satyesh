import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/satyesh-portfolio';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully:', mongoUri);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    // Graceful continuation for development without active local MongoDB instance
  }
}
