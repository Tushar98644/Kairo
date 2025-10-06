import { db } from "../../db/client";
import { storyBlocks, StoryBlock } from "../../db/schema/block";
import { eq, asc } from "drizzle-orm";
import { type StoryBlockInsert } from "../../db/schema/block";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY || "",
  model: "gemini-embedding-001",
});

export class BlockService {
  public async findByStoryId(storyId: string): Promise<StoryBlock[]> {
    const blocks = await db.select().from(storyBlocks).where(eq(storyBlocks.storyId, storyId)).orderBy(asc(storyBlocks.position));
    return blocks;
  }

  public async sync(storyId: string, blocks: any) {
    return db.transaction(async (tx) => {

      await tx.delete(storyBlocks).where(eq(storyBlocks.storyId, storyId));

      if (blocks.length === 0) {
        return []; 
      }
      
      const contentToEmbed = blocks.map((block:any) => JSON.stringify(block.content));
      const blockEmbeddings = await embeddings.embedDocuments(contentToEmbed);

      const blocksToInsert: StoryBlockInsert[] = blocks.map((block: any, index: number) => {
        return {
          storyId: storyId,
          type: block.type,
          content: block.content,
          position: index,    
          embedding: blockEmbeddings[index],
        };
      });

      const newBlocks = await tx.insert(storyBlocks).values(blocksToInsert).returning();
      return newBlocks;
    });
  }

  public async delete(blockId: string) {
    const deletedResult = await db.delete(storyBlocks).where(eq(storyBlocks.id, blockId)).returning();
    return deletedResult[0] || null;
  }
}
