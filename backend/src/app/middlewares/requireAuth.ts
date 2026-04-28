import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { verifyToken } from '../utils/jwt';
import config from '../config';
import { prisma } from '../db_connection';

/**
 * requireAuth middleware
 * - Reads token from HTTP-only cookie (accessToken) or Bearer header
 * - Validates token, checks account status, detects password change invalidation
 * - Attaches { id, email, role, name } to req.user
 */
const requireAuth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Extract token — cookie first (HTTP-only), then Bearer header
      const token =
        req.cookies?.accessToken ||
        req.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // 2. Verify JWT
      const decoded = verifyToken(token, config.jwt.access_secret as string);

      // 3. Load user from DB (fresh check for status/lockout + store info)
      const user = await (prisma as any).user.findUnique({
        where: { id: decoded.id },
        include: { store: true },
      });

      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
      }
      if (user.isDeleted) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Account has been deleted');
      }
      if (user.status === 'BLOCKED') {
        throw new ApiError(httpStatus.FORBIDDEN, 'Your account has been blocked. Contact support.');
      }
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          `Account is locked until ${user.lockedUntil.toLocaleString()}`
        );
      }

      // 4. Detect token issued before password change (security: force re-login)
      if (user.passwordChangedAt && decoded.iat) {
        const passwordChangedAtTimestamp = Math.floor(
          user.passwordChangedAt.getTime() / 1000
        );
        if (passwordChangedAtTimestamp > decoded.iat) {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            'Password was recently changed. Please log in again.'
          );
        }
      }

      // 5. Role guard
      if (roles.length && !roles.includes(user.systemRole)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You do not have permission to access this resource'
        );
      }

      // 6. Attach sanitized user to request (including storeId for multi-tenancy)
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.systemRole,
        storeId: user.store?.id || null,
      };


      next();
    } catch (err) {
      next(err);
    }
  };
};

export default requireAuth;
