import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createSupplierController,
  getSuppliersController,
  updateSupplierController,
} from '../controllers/suppliers.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createSupplierSchema,
  updateSupplierSchema,
} from '../validation/suppliers.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getSuppliersController));

router.post(
  '/',
  validateBody(createSupplierSchema),
  ctrlWrapper(createSupplierController),
);

router.put(
  '/:supplierId',
  validateMongoId('supplierId'),
  validateBody(updateSupplierSchema),
  ctrlWrapper(updateSupplierController),
);

export default router;
