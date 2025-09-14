import { db } from '../../db/client';
import { eq } from 'drizzle-orm';
import { storyBlocks } from '@/db/schema/block';

export class BlockService {
  public async getAll(storyId: string) {
    const blocks = await db.select().from(storyBlocks).where(eq(storyBlocks.storyId, storyId));
    return blocks;
  }
  async create() {
    
  }
}