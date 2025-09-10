import { Request, Response } from 'express';
import { storyService } from './service';
import { insertStorySchema } from '../../db/schema/stories';

class StoryController {
  createStory = async (req: Request, res: Response) => {
    try {
      const validation = insertStorySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: 'Invalid input', errors: validation.error.issues });
      }
      
      const { title, description } = req.body;
      const userId = req.user!.id;
  
      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }
  
      const newStory = await storyService.createStoryForUser(userId, title, description);
      return res.status(201).json(newStory);
    } catch (error) {
      console.error('Error creating story:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  getStories = async (req: Request, res: Response) => {
      try {
          const userId = req.user!.id;
          const userStories = await storyService.findStoriesByUserId(userId);
          return res.status(200).json(userStories);
      } catch (error) {
          console.error('Error fetching stories:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }
  };
}

export const storyController = new StoryController();