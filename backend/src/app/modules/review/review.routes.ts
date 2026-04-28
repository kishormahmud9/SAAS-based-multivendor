import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { reviewControllers } from './review.controller';

const router = Router();

router.post('/', requireAuth(), reviewControllers.createReview);

export const reviewRoutes = router;
