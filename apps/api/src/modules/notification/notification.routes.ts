import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { getNotifications } from './notification.controller';

const router = Router();
router.use(requireAuth());

router.get('/', getNotifications);

export default router;
