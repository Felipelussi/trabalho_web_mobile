import { Router } from 'express';
import { ProductController } from '@controllers/ProductController';
import { uploadProductImage } from '@middlewares/uploadMiddleware';

const router = Router();

// Basic CRUD routes
router.get('/', ProductController.list);
router.get('/:id', ProductController.get);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.remove);

// Image-specific routes
router.patch('/:id/image', ProductController.updateImage);
router.delete('/:id/image', ProductController.removeImage);
router.post('/:id/upload', uploadProductImage.single('image'), ProductController.uploadImage);

export default router;