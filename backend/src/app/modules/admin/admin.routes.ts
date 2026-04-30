import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import permission from '../../middlewares/permission';
import { adminControllers } from './admin.controller';
import { upload } from '../../utils/uploadHandler';
import { productValidation } from '../product/product.validation';
import validateRequest from '../../middlewares/validateRequest';


const router = Router();

// ── Dashboard ─────────────────────────────────────────────────────────────────
router.get('/overview',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('dashboard:view'),
  adminControllers.getDashboardOverview
);
router.get('/stats',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('dashboard:view'),
  adminControllers.getStats
);

// ── User Management ───────────────────────────────────────────────────────────
router.get('/users',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('users:view'),
  adminControllers.getAllUsers
);
router.patch('/users/:id/status',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('users:suspend'),
  adminControllers.toggleUserStatus
);
router.patch('/users/:id/roles',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('roles:edit'), // Assuming assigning roles requires roles:edit or users:edit
  adminControllers.assignUserRoles
);

// ── Product Management ────────────────────────────────────────────────────────
router.get('/products',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('products:view'),
  adminControllers.getAllProducts
);
router.post('/products',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('products:create'),
  upload.array('images', 10),
  validateRequest(productValidation.createProduct),
  adminControllers.createProduct
);
router.patch('/products/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('products:edit'),
  upload.array('images', 10),
  validateRequest(productValidation.updateProduct),
  adminControllers.updateProduct
);
router.delete('/products/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('products:delete'),
  adminControllers.deleteProduct
);

// ── Category Management ───────────────────────────────────────────────────────
router.get('/categories',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('categories:view'),
  adminControllers.getAllCategories
);
router.post('/categories',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('categories:create'),
  adminControllers.createCategory
);
router.patch('/categories/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('categories:edit'),
  adminControllers.updateCategory
);
router.delete('/categories/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('categories:delete'),
  adminControllers.deleteCategory
);

// ── Brand Management ──────────────────────────────────────────────────────────
router.get('/brands',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('brands:view'),
  adminControllers.getAllBrands
);
router.post('/brands',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('brands:create'),
  adminControllers.createBrand
);
router.patch('/brands/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('brands:edit'),
  adminControllers.updateBrand
);
router.delete('/brands/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('brands:delete'),
  adminControllers.deleteBrand
);

export const adminRoutes = router;
