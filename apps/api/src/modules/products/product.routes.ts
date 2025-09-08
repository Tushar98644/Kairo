import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/category/:category', productController.getProductsByCategory); 
router.get('/:id', productController.getProductById);         

router.post('/', productController.createProduct);
router.get('/seller/:email', productController.getProductsBySeller);

export default router;
