import { pgTable, uuid, integer, jsonb, vector } from "drizzle-orm/pg-core";
import { stories } from "./story";
import { createInsertSchema } from "drizzle-zod";

export const storyBlocks = pgTable('story_blocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  storyId: uuid('story_id').notNull().references(() => stories.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(), 
  content: jsonb('content').notNull(),
  embedding: vector('embedding', { dimensions: 1536 }), 
});

export const insertBlockSchema = createInsertSchema(storyBlocks);
export type StoryBlock = typeof storyBlocks.$inferSelect;
export type StoryBlockInsert = typeof storyBlocks.$inferInsert;