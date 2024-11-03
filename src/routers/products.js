import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createProductController,
  deleteProductController,
  getProductsController,
  updateProductController,
} from '../controllers/products.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/products.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getProductsController));

router.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);

router.put(
  '/:productId',
  validateMongoId('productId'),
  validateBody(updateProductSchema),
  ctrlWrapper(updateProductController),
);

router.delete(
  '/:productId',
  validateMongoId('productId'),
  ctrlWrapper(deleteProductController),
);

export default router;
