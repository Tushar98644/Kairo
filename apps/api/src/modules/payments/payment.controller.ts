import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

const paymentService = new PaymentService();

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, currency = 'usd', serviceRequestId } = req.body;
    if (!amount || !serviceRequestId) {
      res.status(400).json({ message: 'Amount and serviceRequestId are required.' });
      return;
    }

    const { clientSecret } = await paymentService.createPaymentIntent(amount, currency, serviceRequestId);
    res.status(201).json({ clientSecret });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
