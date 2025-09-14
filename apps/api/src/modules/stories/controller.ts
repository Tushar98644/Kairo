import { Request, Response } from "express";
import { StoryService } from "./service";
import { insertStorySchema, updateStorySchema } from "../../db/schema/story";

export class StoryController {
  constructor(private storyService: StoryService) {}
 
  public getAllStories = async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const userStories = await this.storyService.findAll(userId);
      return res.status(200).json(userStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  public getStoryById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "No Story ID provided" });
      }
      
      const story = await this.storyService.findById(id);
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      
      return res.status(200).json(story);
    } catch (error) {
      console.error("Error fetching story:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  public createStory = async (req: Request, res: Response) => {
    try {
      const validation = insertStorySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid input", errors: validation.error.issues });
      }

      const { title, description } = validation.data;
      const userId = req.user!.id;

      if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
      }

      const newStory = await this.storyService.create(
        userId,
        title,
        description,
      );
      return res.status(201).json(newStory);
    } catch (error) {
      console.error("Error creating story:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  public updateStory = async(req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "No Story ID provided" });
      }
      
      const validation = updateStorySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid input", errors: validation.error.issues });
      }
      
      if (Object.keys(validation.data).length === 0) {
        return res.status(400).json({ message: "No fields to update provided." });
      }
            
      const updatedStory = await this.storyService.update(id,validation.data);
      if (!updatedStory) {
        return res.status(404).json({ message: "Story not found or you do not have permission to update it." });
      }
      
      return res.status(200).json(updatedStory);
    } catch(error) {
      console.error("Error updating story:", error);
      return res.status(500).json({ message: "Failed to update story" });
    }
  }
  
  public deleteStory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "No Story ID provided" });
      }
      
      const deletedStory = await this.storyService.delete(id);
      if (!deletedStory) {
        return res.status(404).json({ message: "Story not found or you do not have permission to delete it." });
      }
      
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting story:", error);
      return res.status(500).json({ message: "Failed to delete story" });
    }
  }
}