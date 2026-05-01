import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productControllers } from './product.controller';
import { productValidation } from './product.validation';

const router = Router();

router.get(
  '/',
  validateRequest(productValidation.getAllProducts),
  productControllers.getAllProducts
);

router.get('/:slug', productControllers.getProductBySlug);
router.get('/:id/reviews', productControllers.getProductReviews);

export const productRoutes = router;
