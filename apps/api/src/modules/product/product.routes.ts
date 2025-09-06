import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  getMyProducts,
  getProductsByCategory 
} from './product.controller';

const router = Router();

router.use(requireAuth());

router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory); 
router.get('/:id', getProductById);            

router.post('/', createProduct);
router.get('/:email', getMyProducts);

export default router;
