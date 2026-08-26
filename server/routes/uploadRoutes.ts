import { Router } from 'express';
import { uploadMedia } from '../controllers/uploadController';
import { requireAuth } from '../middleware/auth';

const router = Router();
router.post('/', requireAuth, uploadMedia);

export default router;
