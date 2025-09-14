import { Router } from 'express';
import { BlockController } from './controller';
import { BlockService } from './service';

const blockService = new BlockService();
const blockController = new BlockController(blockService);

const router = Router();

router.route('/')
  .get(blockController.getAllBlocks)
  .post(blockController.createBlock)
  .put('/:id', blockController.updateBlock)
  .delete('/:id', blockController.deleteBlock)

export const blockRoutes = router;