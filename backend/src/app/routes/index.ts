import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { productRoutes } from '../modules/product/product.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import { brandRoutes } from '../modules/brand/brand.routes';
import { marketingRoutes } from '../modules/marketing/marketing.routes';
import { userRoutes } from '../modules/user/user.routes';
import { wishlistRoutes } from '../modules/wishlist/wishlist.routes';
import { cartRoutes } from '../modules/cart/cart.routes';
import { orderRoutes } from '../modules/order/order.routes';
import { reviewRoutes } from '../modules/review/review.routes';
import { ticketRoutes } from '../modules/ticket/ticket.routes';
import { adminRoutes } from '../modules/admin/admin.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { vendorRoutes } from '../modules/vendor/vendor.routes';
import { subscriptionRoutes } from '../modules/subscription/subscription.routes';
import { AttributeRoutes } from '../modules/attribute/attribute.routes';
import { roleRoutes } from '../modules/role/role.routes';
import { homeBannerRoutes } from '../modules/homeBanner/homeBanner.routes';

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: authRouter },
  { path: '/admin', route: adminRoutes },
  { path: '/vendor', route: vendorRoutes },
  { path: '/subscriptions', route: subscriptionRoutes },
  { path: '/payments', route: paymentRoutes },
  { path: '/products', route: productRoutes },
  { path: '/attributes', route: AttributeRoutes },
  { path: '/home-banners', route: homeBannerRoutes },




  { path: '/categories', route: categoryRoutes },
  { path: '/brands', route: brandRoutes },
  { path: '/marketing', route: marketingRoutes },
  { path: '/users', route: userRoutes },
  { path: '/wishlist', route: wishlistRoutes },
  { path: '/cart', route: cartRoutes },
  { path: '/orders', route: orderRoutes },
  { path: '/reviews', route: reviewRoutes },
  { path: '/tickets', route: ticketRoutes },
  { path: '/roles', route: roleRoutes },
  { path: '/permissions', route: roleRoutes },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

