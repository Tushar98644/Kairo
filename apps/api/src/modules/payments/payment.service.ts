import Stripe from 'stripe';
import { db } from '../../db/client';
import { payments } from '../../db/schema/payments';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export class PaymentService {
  public async createPaymentIntent(amount: number, currency: string, serviceRequestId: string): Promise<{ clientSecret: string; paymentIntentId: string }> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), 
        currency,
        metadata: { serviceRequestId },
      });

      await db.insert(payments).values({
        id: paymentIntent.id,
        serviceRequestId,
        amount,
        currency,
        status: 'PENDING',
      });

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      console.error('Error creating Payment Intent:', error);
      throw new Error('Could not initiate payment.');
    }
  }
}
