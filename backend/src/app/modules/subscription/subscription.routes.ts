import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { tenantContext } from '../../middlewares/tenantContext';
import { subscriptionControllers } from './subscription.controller';

const router = Router();

// Publicly visible plans
router.get('/plans', subscriptionControllers.getAllPlans);

// Protected Vendor subscription routes
router.get(
  '/my-subscription',
  requireAuth('VENDOR'),
  tenantContext(),
  subscriptionControllers.getMySub
);

router.post(
  '/subscribe',
  requireAuth('VENDOR'),
  tenantContext(),
  subscriptionControllers.buySubscription
);

export const subscriptionRoutes = router;
