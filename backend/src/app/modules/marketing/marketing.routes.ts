import { Router } from 'express';
import { marketingControllers } from './marketing.controller';

const router = Router();

router.get('/banners', marketingControllers.getBanners);
router.get('/offers', marketingControllers.getOffers);
router.get('/ui-settings', marketingControllers.getUiSettings);

export const marketingRoutes = router;
