import { db } from "../../db/client.js";
import { storyBlocks, StoryBlock } from "../../db/schema/block.js";
import { eq, asc } from "drizzle-orm";
import { type StoryBlockInsert } from "../../db/schema/block.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { createClient } from "redis";

type RedisClientType = ReturnType<typeof createClient>;
const CACHE_EXPIRATION_SECONDS = 3600; 

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY || "",
  model: "embedding-001",
});

export class BlockService {
  constructor(private redisClient: RedisClientType) {}

  public async findByStoryId(storyId: string): Promise<StoryBlock[]> {
    const cacheKey = `blocks:${storyId}`;
    
    const cachedBlocks = await this.redisClient.get(cacheKey);
    if (cachedBlocks) {
      console.log(`✅ CACHE HIT for ${cacheKey}`);
      return JSON.parse(cachedBlocks);
    }
    
    console.log(`🐢 CACHE MISS for ${cacheKey}. Fetching from DB.`);
    const blocks = await db.select().from(storyBlocks).where(eq(storyBlocks.storyId, storyId)).orderBy(asc(storyBlocks.position));

    await this.redisClient.setEx(cacheKey, CACHE_EXPIRATION_SECONDS, JSON.stringify(blocks));
    
    return blocks;
  }

  public async sync(storyId: string, blocks: any) {
    const newBlocks = await db.transaction(async (tx) => {
      await tx.delete(storyBlocks).where(eq(storyBlocks.storyId, storyId));

      if (blocks.length === 0) {
        return [];
      }
      
      const contentToEmbed = blocks.map((block:any) => JSON.stringify(block.content));
      const blockEmbeddings = await embeddings.embedDocuments(contentToEmbed);

      const blocksToInsert: StoryBlockInsert[] = blocks.map((block: any, index: number) => ({
        storyId: storyId,
        type: block.type,
        content: block.content,
        position: index,
        embedding: blockEmbeddings[index],
      }));

      return tx.insert(storyBlocks).values(blocksToInsert).returning();
    });

    const cacheKey = `blocks:${storyId}`;
    console.log(`- Invalidating cache for ${cacheKey}`);
    await this.redisClient.del(cacheKey);
    
    return newBlocks;
  }

  public async delete(blockId: string) {
    const [deletedBlock] = await db.delete(storyBlocks).where(eq(storyBlocks.id, blockId)).returning();

    if (deletedBlock) {
      const cacheKey = `blocks:${deletedBlock.storyId}`;
      console.log(`- Invalidating cache for ${cacheKey}`);
      await this.redisClient.del(cacheKey);
    }
    
    return deletedBlock || null;
  }
}