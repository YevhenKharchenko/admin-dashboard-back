import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getDashboardController } from '../controllers/dashboard.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getDashboardController));

export default router;
