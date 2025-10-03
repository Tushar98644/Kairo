import { Request, Response } from "express";
import { BlockService } from "./service";
import { insertBlockSchema } from "@/db/schema/block";

export class BlockController {
  constructor(private blockService: BlockService) {}
  
  public getBlocks = async (req: Request, res: Response) => {
    try {
      const { id: storyId } = req.params;
      if (!storyId) {
        return res.status(400).json({ message: "No Story ID provided" });
      }

      const blocks = await this.blockService.findByStoryId(storyId);
      return res.status(200).json(blocks);
    } catch (error) {
      console.error("Error fetching blocks:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public syncBlocks = async (req: Request, res: Response) => {
    try {
      const { id: storyId } = req.params;
      if (!storyId) {
        return res.status(400).json({ message: "No Story ID provided" });
      }

      const { blocks } = req.body;

      // const validation = insertBlockSchema.safeParse(req.body);
      // if (!validation.success) {
      //   return res.status(400).json({ message: "Invalid input", errors: validation.error.issues });
      // }
      
      const syncedBlocks = await this.blockService.sync(storyId, blocks);

      if (!syncedBlocks) {
        return res.status(404).json({ message: "Story not found or you do not have permission to edit it." });
      }

      return res.status(200).json(syncedBlocks);
    } catch (error) {
      console.error("Error synchronizing blocks:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public deleteBlock = async (req: Request, res: Response) => {
    try {
      const { id: blockId } = req.params;
      
      if (!blockId) {
        return res.status(400).json({ message: "No Block ID provided" });
      }
      
      const deletedBlock = await this.blockService.delete(blockId);
      
      if (!deletedBlock) {
        return res.status(404).json({ message: "Block not found or you do not have permission to delete it." });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting block:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
