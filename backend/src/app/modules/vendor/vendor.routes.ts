import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { tenantContext } from '../../middlewares/tenantContext';
import { vendorControllers } from './vendor.controller';

const router = Router();

// Store Setup (Needs Auth but maybe not VENDOR role yet)
router.post('/setup-store', requireAuth(), vendorControllers.setupStore);

// Protected Vendor Routes (Require VENDOR role + Store Context)
router.get(
  '/dashboard/stats',
  requireAuth('VENDOR'),
  tenantContext(),
  vendorControllers.getDashboardStats
);

router.get(
  '/products',
  requireAuth('VENDOR'),
  tenantContext(),
  vendorControllers.getMyProducts
);

router.get(
  '/orders',
  requireAuth('VENDOR'),
  tenantContext(),
  vendorControllers.getMyOrders
);

router.post(
  '/withdrawals',
  requireAuth('VENDOR'),
  tenantContext(),
  vendorControllers.requestWithdrawal
);

export const vendorRoutes = router;
