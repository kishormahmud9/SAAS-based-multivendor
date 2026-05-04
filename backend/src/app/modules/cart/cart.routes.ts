import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { cartControllers } from './cart.controller';

const router = Router();

router.get('/', requireAuth(), cartControllers.getCart);
router.post('/', requireAuth(), cartControllers.updateCart); // For adding/upserting
router.post('/update', requireAuth(), cartControllers.updateCart); // Keep legacy for compatibility
router.post('/sync', requireAuth(), cartControllers.syncCart);
router.patch('/:id', requireAuth(), cartControllers.updateQuantity);
router.delete('/:id', requireAuth(), cartControllers.removeItem);

export const cartRoutes = router;
