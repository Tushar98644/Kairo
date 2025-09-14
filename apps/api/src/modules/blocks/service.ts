import { db } from "../../db/client";
import { storyBlocks, StoryBlock } from "../../db/schema/block";
import { eq, asc } from "drizzle-orm";
import { type StoryBlockInsert } from "../../db/schema/block";
// import { GoogleGenerativeAI } from "@google/generative-ai";

export class BlockService {
  // private generativeAI: GoogleGenerativeAI;

  // constructor() {
  //   this.generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  // }

  public async findByStoryId(storyId: string): Promise<StoryBlock[]> {
    return db.select().from(storyBlocks).where(eq(storyBlocks.storyId, storyId)).orderBy(asc(storyBlocks.position));
  }

  public async sync(storyId: string, blocks: any) {
    return db.transaction(async (tx) => {

      await tx.delete(storyBlocks).where(eq(storyBlocks.storyId, storyId));

      if (blocks.length === 0) {
        return []; 
      }

      const blocksToInsert: StoryBlockInsert[] = [];
      for (const block of blocks) {
        // let embedding: number[] | null = null;
        // if (['paragraph', 'heading', 'quote'].includes(block.type) && (block.content as any)?.text) {
        //   embedding = await this.generateEmbedding((block.content as any).text);
        // }

        blocksToInsert.push({
          storyId: storyId,
          content: block.content,
          position: block.position,
          embedding: null,
        });
      }
      
      const newBlocks = await tx.insert(storyBlocks).values(blocksToInsert).returning();
      
      return newBlocks;
    });
  }

  public async delete(blockId: string) {
    const deletedResult = await db.delete(storyBlocks).where(eq(storyBlocks.id, blockId)).returning();
    
    return deletedResult[0] || null;
  }
  
  // private async generateEmbedding(text: string): Promise<number[] | null> {
  //   if (!text || text.trim().length < 10) {
  //     return null;
  //   }
  //   try {
  //     const model = this.generativeAI.getGenerativeModel({ model: "text-embedding-004" });
  //     const result = await model.embedContent(text);
  //     return result.embedding.values;
  //   } catch (error) {
  //     console.error("Error generating embedding:", error);
  //     return null;
  //   }
  // }
}
