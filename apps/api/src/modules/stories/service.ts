import { db } from "../../db/client";
import { stories, StoryInsert, type Story } from "../../db/schema/story";
import { desc, eq } from "drizzle-orm";

export class StoryService {
  public create = async (userId: string, title: string, description?: string) => {
    const [newStory] = await db.insert(stories).values({ userId, title, description }).returning();
    return newStory;
  };
  
  public findAll = async (userId: string): Promise<Story[]> => {
    const userStories = await db.select().from(stories).where(eq(stories.userId, userId)).orderBy(desc(stories.createdAt));
    return userStories; 
  };
  
  public findById = async (storyId: string) => {
    const story = await db.select().from(stories).where(eq(stories.id, storyId));
    return story;
  }
  
  public update = async (storyId: string, data: Partial<StoryInsert>) => {
    const [updatedStory] = await db.update(stories).set({ ...data }).where(eq(stories.id, storyId)).returning();
    return updatedStory;
  }
  
  public delete = async (storyId: string) => {
    const deletedStory = await db.delete(stories).where(eq(stories.id, storyId)).returning();
    return deletedStory;
  }
}