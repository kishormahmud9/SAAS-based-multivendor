import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { paymentControllers } from './payment.controller';

const router = Router();

router.post('/checkout', requireAuth(), paymentControllers.checkout);

// Webhooks (Public, but should be verified in controller/middleware)
router.post('/webhook/stripe', paymentControllers.stripeWebhook);
router.post('/sslcommerz/success', paymentControllers.sslSuccess);

export const paymentRoutes = router;
