import { Router } from 'express';
import { SaleController } from '@controllers/SaleController';

const router = Router();

router.get('/', SaleController.list);
router.get('/:id', SaleController.get);
router.post('/', SaleController.create);
router.delete('/:id', SaleController.remove);

// Product management routes
router.post('/:id/products', SaleController.addProduct);
router.delete('/:id/products', SaleController.removeProduct);
router.put('/:id/products', SaleController.updateProductQuantity);

export default router;
