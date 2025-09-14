import { Router } from 'express';
import { storyController } from './controller';
import { augmentUser } from '../../middleware/augmentUser';

const router = Router();

router.use(augmentUser);

router.route('/')
  .post(storyController.createStory)
  .get(storyController.getStories);

export const storyRoutes = router;
