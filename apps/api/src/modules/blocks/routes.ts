import { Router } from 'express';
import { BlockController } from './controller';
import { BlockService } from './service';

const blockService = new BlockService();
const blockController = new BlockController(blockService);

const router = Router();

router.route('/')
  .get(blockController.getBlocks)
  .put(blockController.syncBlocks)
  
router.route('/:id')
  .delete(blockController.deleteBlock)

export const blockRoutes = router;