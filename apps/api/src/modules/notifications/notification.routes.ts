import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { notificationController } from './notification.controller';

const router = Router();

router.get('/', notificationController.getNotifications);
router.post('/', notificationController.createNotification);

export default router;
