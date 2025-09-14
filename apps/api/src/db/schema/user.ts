import { timestamps } from '@/utils/columnsHelper';
import { pgTable, text, integer, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull().notNull(),
  name: text('name').notNull(),
  credits: integer('credits').default(10).notNull(),
  ...timestamps
});