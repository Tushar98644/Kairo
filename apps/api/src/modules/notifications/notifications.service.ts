import { db } from '../../db/client';
import { notifications } from '../../db/schema/notification';
import { eq, desc } from 'drizzle-orm';

type NewNotificationData = typeof notifications.$inferInsert;
type Notification = typeof notifications.$inferSelect;

export class NotificationService {
  public async create(data: NewNotificationData): Promise<any> {

    const [newNotification] = await db
      .insert(notifications)
      .values(data)
      .returning();

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
