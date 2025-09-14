import { pgTable, uuid, integer, jsonb, pgEnum, vector } from "drizzle-orm/pg-core";
import { stories } from "./story";

export const blockTypeEnum = pgEnum('block_type', ['heading', 'paragraph', 'image', 'video', 'quote', 'code']);

export const storyBlocks = pgTable('story_blocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  storyId: uuid('story_id').notNull().references(() => stories.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(), 
  type: blockTypeEnum('type').notNull(), 
  content: jsonb('content').notNull(),
  embedding: vector('embedding', { dimensions: 1536 }), 
});