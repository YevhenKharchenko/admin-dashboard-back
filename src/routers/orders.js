import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getOrdersController } from '../controllers/orders.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getOrdersController));

export default router;
