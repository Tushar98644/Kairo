import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { createPaymentIntent } from './payment.controller';

const router = Router();
router.use(requireAuth());

router.post('/create-payment-intent', createPaymentIntent);

export default router;
