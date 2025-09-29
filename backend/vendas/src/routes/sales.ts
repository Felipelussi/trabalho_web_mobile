import { Router } from 'express';
import { SaleController } from '@controllers/SaleController';

const router = Router();

router.get('/', SaleController.list);
router.get('/:id', SaleController.get);
router.post('/', SaleController.create);
router.patch('/:id', SaleController.updateSale);
router.delete('/:id', SaleController.remove);


export default router;
