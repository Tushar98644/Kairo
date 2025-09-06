import { timestamps } from '@/utils/columns.helper';
import { pgTable, text, varchar, boolean, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  recipientEmail: varchar('recipient_email', { length: 255 }).notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  ...timestamps
});

export const insertNotificationSchema = createInsertSchema(notifications);

