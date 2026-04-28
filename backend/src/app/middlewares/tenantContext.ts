import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

/**
 * Tenant Isolation Middleware
 * - Ensures that VENDOR users are restricted to their own store data.
 * - Injects 'storeId' into req.tenant for use in repositories.
 */
export const tenantContext = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication required');
      }

      // 1. If user is VENDOR, they MUST have an active storeId
      if (user.role === 'VENDOR') {
        if (!user.storeId) {
          throw new ApiError(
            httpStatus.FORBIDDEN,
            'Access Denied: Your vendor account is not yet associated with an active store.',
          );
        }
        req.tenant = { storeId: user.storeId };
      }

      // 2. If user is ADMIN, they might pass storeId in query/body for specific store management
      if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        req.tenant = { storeId: req.query.storeId || req.body.storeId || null };
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

