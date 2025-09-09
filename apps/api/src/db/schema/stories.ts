import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { timestamps } from "@/utils/columns.helper";

export const stories = pgTable('stories', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  ...timestamps
});