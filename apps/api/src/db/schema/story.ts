import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { users } from "./user";
import { timestamps } from "@/utils/columnsHelper";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const stories = pgTable('stories', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  ...timestamps
});

const baseInsertStorySchema = createInsertSchema(stories);
export const insertStorySchema = baseInsertStorySchema.extend({
  userId: z.uuid().optional(),
});
export const updateStorySchema = createUpdateSchema(stories);
export type Story = typeof stories.$inferSelect;
export type StoryInsert = typeof stories.$inferInsert;