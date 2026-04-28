import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { wishlistControllers } from './wishlist.controller';

const router = Router();

router.get('/', requireAuth(), wishlistControllers.getWishlist);
router.post('/', requireAuth(), wishlistControllers.addToWishlist);
router.delete('/:productId', requireAuth(), wishlistControllers.removeFromWishlist);

export const wishlistRoutes = router;
