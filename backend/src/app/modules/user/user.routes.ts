import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { userControllers } from './user.controller';

const router = Router();

router.get('/profile', requireAuth(), userControllers.getProfile);
router.patch('/profile', requireAuth(), userControllers.updateProfile);

router.get('/addresses', requireAuth(), userControllers.getAddresses);
router.post('/addresses', requireAuth(), userControllers.createAddress);
router.patch('/addresses/:id', requireAuth(), userControllers.updateAddress);
router.delete('/addresses/:id', requireAuth(), userControllers.deleteAddress);

export const userRoutes = router;
