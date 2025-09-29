import { Router } from 'express';
import { ProductController } from '@controllers/ProductController';

const router = Router();

// Basic CRUD routes
router.get('/', ProductController.list);
router.get('/:id', ProductController.get);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.remove);



export default router;