import { Router } from "express";
import { BlockController } from "./controller";

export const createBlocksRouter = (blockController: BlockController) => {
  const router = Router({ mergeParams: true });

  router
    .route("/")
    .get(blockController.getBlocks)
    .put(blockController.syncBlocks);

  router.route("/:id").delete(blockController.deleteBlock);

  return router;
};
