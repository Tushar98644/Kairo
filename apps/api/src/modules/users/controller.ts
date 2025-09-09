import { Request, Response } from 'express';
import { verifyWebhook, WebhookEvent } from '@clerk/express/webhooks'
import { db } from '../../db/client'
import { users } from '../../db/schema/users';
import { eq } from 'drizzle-orm';

class UserController {
  clerkWebhookHandler = async (req: Request, res: Response) => {
    let evt: WebhookEvent;
  
    try {
      evt = await verifyWebhook(req);
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return res.status(400).send('Error: could not verify webhook');
    }

    const { id } = evt.data;
    const eventType = evt.type;

    try {
      switch (eventType) {
        case 'user.created':
          await db.insert(users).values({
            clerkId: evt.data.id,
            email: evt.data?.email_addresses[0]?.email_address ?? '',
            name: `${evt.data.first_name || ''} ${evt.data.last_name || ''}`.trim(),
          });
          break;

        case 'user.updated':
          await db.update(users)
            .set({
              email: evt.data?.email_addresses[0]?.email_address,
              name: `${evt.data.first_name || ''} ${evt.data.last_name || ''}`.trim(),
            })
            .where(eq(users.clerkId, id!));
          break;

        case 'user.deleted':
          await db.delete(users).where(eq(users.clerkId, id!));
          break;
      }
      console.log(`Processed webhook event: ${eventType} for user ${id}`);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(`Error handling webhook event ${eventType}:`, error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };
}

export const userController = new UserController();