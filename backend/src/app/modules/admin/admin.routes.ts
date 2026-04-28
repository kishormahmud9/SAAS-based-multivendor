import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { adminControllers } from './admin.controller';

const router = Router();

// Dashboard
router.get('/overview', requireAuth('ADMIN'), adminControllers.getDashboardOverview);
router.get('/stats', requireAuth('ADMIN'), adminControllers.getStats);

// User Management
router.get('/users', requireAuth('ADMIN'), adminControllers.getAllUsers);
router.patch('/users/:id/status', requireAuth('ADMIN'), adminControllers.toggleUserStatus);

// Product Management (Admin can update any product)
router.patch('/products/:id', requireAuth('ADMIN'), adminControllers.updateProduct);

export const adminRoutes = router;
