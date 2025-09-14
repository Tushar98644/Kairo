import { Request, Response } from 'express';
import { BlockService } from './service';

export class BlockController {
  constructor(private blockService: BlockService) { }
  
  public getAllBlocks = async (req: Request, res: Response) => {
    try {
      const blocks = await this.blockService.getAll();
      return res.status(200).json(blocks);
    } catch (error) {
      console.error(`Error getting all blocks: ${error}`);
      return res.status(500).json({ error: 'There was an error getting all blocks' });
    }
  }
  
  public createBlock = async (req: Request, res: Response) => {
    try {
      const storyId = req.params.id;
      const { content } = req.body;
      
      const block = await this.blockService.create(storyId, content);
      return res.status(201).json(block);
    } catch (error) {
      console.error(`Error creating block: ${error}`);
      return res.status(500).json({ error: 'There was an error creating the block' });
    }
  }
  
  public updateBlock = async (req: Request, res: Response) => {
    try {
      
    } catch (error) {
      console.error(`Error updating block: ${error}`);
      return res.status(500).json({ error: 'There was an error updating the block' });
    }
  }
  
  public deleteBlock = async (req: Request, res: Response) => {
    try {
      const blockId = req.params.id;
      await this.blockService.delete(blockId);
      return res.status(200).json({ message: 'Block deleted successfully' });
    } catch (error) {
      console.error(`Error deleting block: ${error}`);
      return res.status(500).json({ error: 'There was an error deleting the block' });
    }
  }
}