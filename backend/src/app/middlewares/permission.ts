import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import catchAsync from '../utils/catchAsync';

/**
 * Granular Permission Middleware (Phase 3 — Hardened)
 * ────────────────────────────────────────────────────
 * MUST be used AFTER requireAuth, which caches permissions on req.user.
 *
 * - SUPER_ADMIN (permissions = ['*']) always bypasses
 * - All other roles are checked against the pre-loaded permissions cache
 * - No additional DB queries required
 *
 * Usage:
 *   router.post('/', requireAuth('ADMIN'), permission('products:create'), handler)
 *   router.delete('/:id', requireAuth('ADMIN', 'VENDOR'), permission('orders:delete'), handler)
 */
const permission = (...requiredPermissions: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication required');
    }

    // ── SUPER_ADMIN wildcard bypass ─────────────────────────────────────────
    if (user.permissions.includes('*')) {
      return next();
    }

    // ── Check each required permission against cached list ──────────────────
    const missing = requiredPermissions.filter(
      (perm) => !user.permissions.includes(perm)
    );

    if (missing.length > 0) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        `Access Denied: Missing permission${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`
      );
    }

    next();
  });
};

export default permission;
