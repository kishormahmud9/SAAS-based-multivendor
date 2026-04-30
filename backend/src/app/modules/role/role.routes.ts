import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import requireAuth from '../../middlewares/requireAuth';
import permission from '../../middlewares/permission';
import { roleControllers } from './role.controller';
import { roleValidation } from './role.validation';

const router = Router();

// Get all permissions (useful for creating/editing roles on frontend)
router.get(
  '/permissions',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('roles:view'),
  roleControllers.getAllPermissions
);

router.post(
  '/',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('roles:create'),
  validateRequest(roleValidation.createRole),
  roleControllers.createRole
);

router.get(
  '/',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('roles:view'),
  roleControllers.getRoles
);

router.get(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('roles:view'),
  roleControllers.getRoleById
);

router.patch(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('roles:edit'),
  validateRequest(roleValidation.updateRole),
  roleControllers.updateRole
);

router.delete(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('roles:delete'),
  roleControllers.deleteRole
);

export const roleRoutes = router;
