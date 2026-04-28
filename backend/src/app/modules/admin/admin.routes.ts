import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { adminControllers } from './admin.controller';

const router = Router();

// Dashboard
router.get('/overview', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.getDashboardOverview);
router.get('/stats', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.getStats);

// User Management
router.get('/users', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.getAllUsers);
router.patch('/users/:id/status', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.toggleUserStatus);

// Product Management (Admin can manage any product)
router.get('/products', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.getAllProducts);
router.post('/products', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.createProduct);
router.patch('/products/:id', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.updateProduct);
router.delete('/products/:id', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.deleteProduct);

// Category Management
router.get('/categories', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.getAllCategories);
router.post('/categories', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.createCategory);
router.patch('/categories/:id', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.updateCategory);
router.delete('/categories/:id', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.deleteCategory);

// Brand Management
router.get('/brands', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.getAllBrands);
router.post('/brands', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.createBrand);
router.patch('/brands/:id', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.updateBrand);
router.delete('/brands/:id', requireAuth('ADMIN', 'SUPER_ADMIN'), adminControllers.deleteBrand);

export const adminRoutes = router;
