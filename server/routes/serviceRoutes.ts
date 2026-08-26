import { Router } from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController';
import { requireAuth } from '../middleware/auth';

const router = Router();
router.get('/', getServices);
router.post('/', requireAuth, createService);
router.put('/:id', requireAuth, updateService);
router.patch('/:id', requireAuth, updateService);
router.delete('/:id', requireAuth, deleteService);

export default router;
