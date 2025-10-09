import { Router } from "express";
import { StoryController } from "./controller.js";
import { augmentUser } from "../../middleware/augmentUser.js";

export const createStoryRouter = (storyController: StoryController, blockRoutes: Router) => {
  const router = Router();

  router.use(augmentUser);

  router
    .route("/")
    .get(storyController.getStories)
    .post(storyController.createStory);

  router
    .route("/:id")
    .get(storyController.getStoryById)
    .patch(storyController.updateStory)
    .delete(storyController.deleteStory);

  router.use("/:id/blocks", blockRoutes);

  return router;
};