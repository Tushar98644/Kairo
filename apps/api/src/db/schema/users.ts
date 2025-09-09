import { timestamps } from '@/utils/columns.helper';
import { pgTable, text, integer, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull(),
  email: text('email').unique().notNull(),
  name: text('name'),
  credits: integer('credits').default(10).notNull(),
  ...timestamps
});