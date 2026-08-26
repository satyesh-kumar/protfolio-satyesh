import { Router } from 'express';
import {
  submitInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController';
import { requireAuth } from '../middleware/auth';
import { inquiryRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public lead submission (validated & rate limited)
router.post('/', inquiryRateLimiter, submitInquiry);

// Protected admin lead management routes
router.get('/', requireAuth, getInquiries);
router.patch('/:id', requireAuth, updateInquiryStatus);
router.delete('/:id', requireAuth, deleteInquiry);

export default router;
