import { db } from "../../db/client";
import { stories, type Story } from "../../db/schema/stories";
import { desc, eq } from "drizzle-orm";

class StoryService {
  createStoryForUser = async (userId: string, title: string, description?: string) => {
    const [newStory] = await db.insert(stories).values({ userId, title, description }).returning();
    return newStory;
  };
  
  findStoriesByUserId = async (userId: string): Promise<Story[]> => {
    const userStories = await db.select().from(stories).where(eq(stories.userId, userId)).orderBy(desc(stories.createdAt));
    return userStories; 
  };
}

export const storyService = new StoryService();