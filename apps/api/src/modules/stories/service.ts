import { db } from "../../db/client.js";
import { stories, StoryInsert, type Story } from "../../db/schema/story.js";
import { desc, eq } from "drizzle-orm";
import { createClient } from "redis";

type RedisClientType = ReturnType<typeof createClient>;
const CACHE_EXPIRATION_SECONDS = 3600;

export class StoryService {
  constructor(private redisClient: RedisClientType) {}

  public create = async (userId: string,title: string, description?: string) => {
    const [newStory] = await db.insert(stories).values({ userId, title, description }).returning();

    console.log(`- Invalidating cache for userStories:${userId}`);
    await this.redisClient.del(`userStories:${userId}`);

    return newStory;
  };

  public findAll = async (userId: string): Promise<Story[]> => {
    const cacheKey = `userStories:${userId}`;
    const cachedUserStories = await this.redisClient.get(cacheKey);
    
    if (cachedUserStories) {
      console.log(`✅ CACHE HIT for ${cacheKey}`);
      return JSON.parse(cachedUserStories);
    }

    console.log(`🐢 CACHE MISS for ${cacheKey}. Fetching from DB.`);
    const userStories = await db.select().from(stories).where(eq(stories.userId, userId)).orderBy(desc(stories.createdAt));

    await this.redisClient.setEx(cacheKey, CACHE_EXPIRATION_SECONDS, JSON.stringify(userStories));

    return userStories;
  };

  public findById = async (storyId: string) => {
    const cacheKey = `story:${storyId}`;
    const cachedStory = await this.redisClient.get(cacheKey);
    
    if (cachedStory) {
      console.log(`✅ CACHE HIT for ${cacheKey}`);
      return JSON.parse(cachedStory);
    }

    console.log(`🐢 CACHE MISS for ${cacheKey}. Fetching from DB.`);
    const [story] = await db.select().from(stories).where(eq(stories.id, storyId));
      
    if (story) {
      await this.redisClient.setEx(cacheKey, CACHE_EXPIRATION_SECONDS, JSON.stringify(story));
    }

    return story;
  };

  public update = async (storyId: string, data: Partial<StoryInsert>) => {
    const [updatedStory] = await db.update(stories).set({ ...data }).where(eq(stories.id, storyId)).returning();

    if (updatedStory) {
      const storyCacheKey = `story:${storyId}`;
      const listCacheKey = `userStories:${updatedStory.userId}`;
      console.log(`- Invalidating cache for ${storyCacheKey} and ${listCacheKey}`);
      await this.redisClient.del([storyCacheKey, listCacheKey]);
    }

    return updatedStory;
  };

  public delete = async (storyId: string) => {
    const [deletedStory] = await db.delete(stories).where(eq(stories.id, storyId)).returning();

    if (deletedStory) {
      const storyCacheKey = `story:${storyId}`;
      const listCacheKey = `userStories:${deletedStory.userId}`;
      console.log(`- Invalidating cache for ${storyCacheKey} and ${listCacheKey}`);
      await this.redisClient.del([storyCacheKey, listCacheKey]);
    }

    return deletedStory;
  };
}