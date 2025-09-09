import { db } from '@repo/db/client';
import { stories } from '@repo/db/schema';
import { eq } from 'drizzle-orm';

export const createStoryForUser = async (userId: number, title: string, description?: string) => {
  const [newStory] = await db.insert(stories).values({ userId, title, description }).returning();
  return newStory;
};

export const findStoriesByUserId = async (userId: number) => {
  const userStories = await db.query.stories.findMany({
    where: eq(stories.userId, userId),
    orderBy: (stories, { desc }) => [desc(stories.createdAt)],
  });
  return userStories;
};