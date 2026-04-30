import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import permission from '../../middlewares/permission';
import validateRequest from '../../middlewares/validateRequest';
import { userControllers } from './user.controller';
import { userValidation } from './user.validation';

import { upload } from '../../utils/uploadHandler';

const router = Router();

// Admin Routes
router.get(
  '/', 
  requireAuth('ADMIN', 'SUPER_ADMIN'), 
  permission('users:view'), 
  userControllers.getUsers
);

router.post(
  '/', 
  requireAuth('ADMIN', 'SUPER_ADMIN'), 
  permission('users:create'), 
  upload.single('avatar'),
  validateRequest(userValidation.createUser),
  userControllers.createUser
);

router.get(
  '/:id', 
  requireAuth('ADMIN', 'SUPER_ADMIN'), 
  permission('users:view'), 
  userControllers.getUserById
);

router.patch(
  '/:id', 
  requireAuth('ADMIN', 'SUPER_ADMIN'), 
  permission('users:edit'), 
  upload.single('avatar'),
  validateRequest(userValidation.updateUser),
  userControllers.updateUser
);

router.patch(
  '/:id/status', 
  requireAuth('ADMIN', 'SUPER_ADMIN'), 
  permission('users:suspend'), 
  userControllers.updateStatus
);

router.post(
  '/:id/reset-password', 
  requireAuth('ADMIN', 'SUPER_ADMIN'), 
  permission('users:edit'), 
  userControllers.resetPassword
);

// Profile Routes
router.get('/profile', requireAuth(), userControllers.getProfile);
router.patch('/profile', requireAuth(), userControllers.updateProfile);

router.get('/addresses', requireAuth(), userControllers.getAddresses);
router.post('/addresses', requireAuth(), userControllers.createAddress);
router.patch('/addresses/:id', requireAuth(), userControllers.updateAddress);
router.delete('/addresses/:id', requireAuth(), userControllers.deleteAddress);

export const userRoutes = router;
