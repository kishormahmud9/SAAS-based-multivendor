import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import requireAuth from '../../middlewares/requireAuth';
import permission from '../../middlewares/permission';
import { categoryControllers } from './category.controller';
import { categoryValidation } from './category.validation';
import { upload } from '../../utils/uploadHandler';

const router = Router();

// ── Public Routes ─────────────────────────────────────────────────────────────
router.get('/tree', categoryControllers.getAllTree);
router.get('/flat', categoryControllers.getAllFlat);
router.get('/check-name', categoryControllers.checkName);
router.get('/next-order', categoryControllers.getNextOrder);
router.get('/', categoryControllers.getPaginated);
router.get('/:id', categoryControllers.getSingleCategory);

// ── Admin Protected Routes ────────────────────────────────────────────────────
router.post(
  '/',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('categories:create'),
  upload.single('image'),
  validateRequest(categoryValidation.createCategory),
  categoryControllers.createCategory
);

router.patch(
  '/bulk-status',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('categories:edit'),
  validateRequest(categoryValidation.bulkStatusUpdate),
  categoryControllers.bulkStatusUpdate
);

router.post(
  '/bulk-delete',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('categories:delete'),
  validateRequest(categoryValidation.bulkDelete),
  categoryControllers.bulkDelete
);

router.patch(
  '/sort-order',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('categories:edit'),
  validateRequest(categoryValidation.updateSortOrder),
  categoryControllers.updateSortOrder
);

router.patch(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('categories:edit'),
  upload.single('image'),
  validateRequest(categoryValidation.updateCategory),
  categoryControllers.updateCategory
);

router.delete(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('categories:delete'),
  categoryControllers.deleteCategory
);

export const categoryRoutes = router;
