import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import requireAuth from '../../middlewares/requireAuth';
import permission from '../../middlewares/permission';
import { brandControllers } from './brand.controller';
import { BrandValidation } from './brand.validation';
import { upload } from '../../utils/uploadHandler';

const router = Router();

// ── Public Routes ─────────────────────────────────────────────────────────────
router.get('/flat', brandControllers.getAllFlat);
router.get('/check-name', brandControllers.checkName);
router.get('/', brandControllers.getPaginated);
router.get('/:id', brandControllers.getSingleBrand);

// ── Admin Protected Routes ────────────────────────────────────────────────────
router.post(
  '/',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('brands:create'),
  upload.single('image'),
  validateRequest(BrandValidation.createBrandZodSchema),
  brandControllers.createBrand
);

router.patch(
  '/bulk-status',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('brands:edit'),
  brandControllers.bulkStatusUpdate
);

router.post(
  '/bulk-delete',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('brands:delete'),
  brandControllers.bulkDelete
);

router.patch(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('brands:edit'),
  upload.single('image'),
  validateRequest(BrandValidation.updateBrandZodSchema),
  brandControllers.updateBrand
);

router.delete(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('brands:delete'),
  brandControllers.deleteBrand
);

export const brandRoutes = router;
