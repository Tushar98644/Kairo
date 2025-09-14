import { Router } from 'express';
import { UserController } from './controller';
import express from 'express';

const userController = new UserController();

const router = Router();

router.post('/webhooks/clerk', express.raw({ type: 'application/json' }), userController.clerkWebhookHandler);

export const userRoutes = router;
