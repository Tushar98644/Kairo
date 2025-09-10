import { Router } from 'express';
import { storyController } from './controller';
import { augmentUser } from '../../middleware/augment.user';

const router = Router();

router.use(augmentUser);

router.route('/')
  .post(storyController.createStory)
  .get(storyController.getStories);

export const storyRoutes = router;
