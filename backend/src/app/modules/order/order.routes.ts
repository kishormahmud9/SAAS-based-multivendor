import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { orderControllers } from './order.controller';

const router = Router();

router.get('/history', requireAuth(), orderControllers.getOrderHistory);
router.get('/:id', requireAuth(), orderControllers.getOrderDetails);

export const orderRoutes = router;
