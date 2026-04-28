import { Router } from 'express';
import { authControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authRateLimiter } from '../../middlewares/rateLimiter';
import requireAuth from '../../middlewares/requireAuth';

const router = Router();

/**
 * ─── Auth API Routes (/api/v1/auth) ──────────────────────────────────────────
 *
 * Public Routes
 * ─────────────────────────────────────────────────────────────────────────────
 * POST   /register           — Create new account, send email verification OTP
 * POST   /login              — Login, returns access+refresh in HTTP-only cookies
 * POST   /logout             — Clear auth cookies
 * POST   /refresh-token      — Issue new access token using refresh token
 * POST   /forgot-password    — Send OTP to email for password reset
 * POST   /verify-otp         — Validate OTP, return resetToken if PASSWORD_RESET
 * POST   /reset-password     — Set new password using resetToken
 *
 * Protected Routes (require valid accessToken)
 * ─────────────────────────────────────────────────────────────────────────────
 * GET    /me                 — Return current authenticated user session
 * PATCH  /change-password    — Change password while authenticated (forces re-login)
 */

// ── Public ────────────────────────────────────────────────────────────────────

router.post(
  '/register',
  authRateLimiter,
  validateRequest(authValidation.register),
  authControllers.register,
);


router.post(
  '/login',
  authRateLimiter,
  validateRequest(authValidation.login),
  authControllers.login,
);

router.post('/logout', authControllers.logout);

router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshToken),
  authControllers.refreshToken,
);

router.post(
  '/forgot-password',
  authRateLimiter,
  validateRequest(authValidation.forgotPassword),
  authControllers.forgotPassword,
);

router.post(
  '/verify-otp',
  authRateLimiter,
  validateRequest(authValidation.verifyOtp),
  authControllers.verifyOtp,
);

router.post(
  '/reset-password',
  validateRequest(authValidation.resetPassword),
  authControllers.resetPassword,
);

// ── Protected ─────────────────────────────────────────────────────────────────

router.get('/me', requireAuth(), authControllers.getMe);

router.patch(
  '/change-password',
  requireAuth(),
  validateRequest(authValidation.changePassword),
  authControllers.changePassword,
);

export const authRouter = router;
