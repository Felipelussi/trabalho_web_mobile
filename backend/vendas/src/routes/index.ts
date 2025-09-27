import { Router } from 'express';
import salesRouter from './sales';
import productsRouter from './products';

const router = Router();

router.use('/sales', salesRouter);
router.use('/products', productsRouter);

export default router;
