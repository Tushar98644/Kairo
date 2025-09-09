import { Router } from 'express';
import { userController } from './controller';
import express from 'express';

const router = Router();

router.post('/webhooks/clerk', express.raw({ type: 'application/json' }), userController.clerkWebhookHandler);

export const userRoutes = router;
