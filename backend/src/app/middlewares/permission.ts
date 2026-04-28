import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import catchAsync from '../utils/catchAsync';
import { authRepository } from '../modules/auth/auth.repository';

/**
 * Granular Permission Middleware
 * - Checks if the authenticated user has all required permissions
 * - Automatically allows SUPER_ADMIN to bypass
 */
const permission = (...requiredPermissions: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // 1. SUPER_ADMIN bypass
    if (user.role === 'SUPER_ADMIN') {
      return next();
    }

    // 2. Fetch permissions from DB
    // In production, this should be cached (e.g. Redis) to avoid DB hits on every request
    const userPermissions = await authRepository.getUserPermissions(user.id as string);

    // 3. Verify all required permissions are present
    const hasPermission = requiredPermissions.every((perm) =>
      userPermissions.includes(perm),
    );

    if (!hasPermission) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'Access Denied: You do not have sufficient permissions to perform this action',
      );
    }

    next();
  });
};

export default permission;

