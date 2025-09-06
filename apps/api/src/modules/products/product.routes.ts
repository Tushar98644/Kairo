import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { productController } from './product.controller';

const router = Router();

router.use(requireAuth());

router.get('/', productController.getAllProducts);
router.get('/category/:category', productController.getProductsByCategory); 
router.get('/:id', productController.getProductById);         

router.post('/', productController.createProduct);
router.get('/seller/:email', productController.getProductsBySeller);

export default router;
