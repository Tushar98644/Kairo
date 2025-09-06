import { db } from '../../db/client';
import { notifications, type Notification, type NewNotification } from '../../db/schema/notification';
import { eq, desc } from 'drizzle-orm';

class NotificationService {
  public async create(data: NewNotification): Promise<Notification> {

    const [newNotification] = await db
      .insert(notifications)
      .values(data)
      .returning();
    
    if (!newNotification) {
      throw new Error('Failed to create notification');
    }

    return newNotification;
  }

  public async getForUser(userEmail: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.recipientEmail, userEmail))
      .orderBy(desc(notifications.createdAt));
  }
}

export const notificationService = new NotificationService();