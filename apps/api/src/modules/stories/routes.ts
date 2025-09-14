import { Router } from 'express';
import { StoryController } from './controller';
import { StoryService } from './service';
import { augmentUser } from '../../middleware/augmentUser';
import { blockRoutes } from '../blocks/routes';

const router = Router();

const storyService = new StoryService();
const storyController = new StoryController(storyService);

router.use(augmentUser);

router.route('/')
  .get(storyController.getStories)
  .post(storyController.createStory)
  
router.route('/:id')
  .get(storyController.getStoryById)
  .patch(storyController.updateStory)
  .delete(storyController.deleteStory)

router.use('/:storyId/blocks', blockRoutes);

export const storyRoutes = router;
