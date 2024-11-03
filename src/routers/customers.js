import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCustomerByIdController,
  getCustomersController,
} from '../controllers/customers.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getCustomersController));

router.get(
  '/:customerId',
  validateMongoId('customerId'),
  ctrlWrapper(getCustomerByIdController),
);

export default router;
