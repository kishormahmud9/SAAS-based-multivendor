import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { cartControllers } from './cart.controller';

const router = Router();

router.get('/', requireAuth(), cartControllers.getCart);
router.post('/update', requireAuth(), cartControllers.updateCart);
router.post('/sync', requireAuth(), cartControllers.syncCart);

export const cartRoutes = router;
