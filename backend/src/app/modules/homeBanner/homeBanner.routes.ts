import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import permission from '../../middlewares/permission';
import { upload } from '../../utils/uploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { homeBannerControllers } from './homeBanner.controller';
import { homeBannerValidation } from './homeBanner.validation';

const router = Router();

router.get('/', homeBannerControllers.getAllBanners);

router.get('/:id', homeBannerControllers.getSingleBanner);

router.post(
  '/',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('marketing:create'),
  upload.single('image'),
  validateRequest(homeBannerValidation.createHomeBanner),
  homeBannerControllers.createHomeBanner
);

router.patch(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('marketing:edit'),
  upload.single('image'),
  validateRequest(homeBannerValidation.updateHomeBanner),
  homeBannerControllers.updateHomeBanner
);

router.delete(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('marketing:delete'),
  homeBannerControllers.deleteHomeBanner
);

export const homeBannerRoutes = router;
