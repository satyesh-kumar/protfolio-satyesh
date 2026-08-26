import rateLimit from 'express-rate-limit';

export const inquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // Limit each IP to 5 inquiry submissions per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many inquiry submissions from this IP. Please try again after 15 minutes.',
  },
});
