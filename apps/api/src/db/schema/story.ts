import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { users } from "./user";
import { timestamps } from "@/utils/columnsHelper";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

export const stories = pgTable('stories', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  ...timestamps
});

export const insertStorySchema = createInsertSchema(stories);
export const updateStorySchema = createUpdateSchema(stories);
export type Story = typeof stories.$inferSelect;
export type StoryInsert = typeof stories.$inferInsert;