import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { verifyToken } from '../utils/jwt';
import config from '../config';
import { prisma } from '../db_connection';

/**
 * requireAuth middleware (Phase 3 — RBAC enhanced)
 * ─────────────────────────────────────────────────
 * - Reads token from HTTP-only cookie (accessToken) or Bearer header
 * - Validates token, checks account status, detects password-change invalidation
 * - Loads user with their role->permission chain in ONE query
 * - Attaches { id, email, role, name, storeId, permissions } to req.user
 * - SUPER_ADMIN gets permissions = ['*'] (wildcard bypass — no DB permission load needed)
 */
const requireAuth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ── 1. Extract token ────────────────────────────────────────────────────
      const token =
        req.cookies?.accessToken ||
        req.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // ── 2. Verify JWT ───────────────────────────────────────────────────────
      const decoded = verifyToken(token, config.jwt.access_secret as string);

      // ── 3. Load user + role assignments + permissions (single DB query) ─────
      const user = await (prisma as any).user.findUnique({
        where: { id: decoded.id },
        include: {
          store: { select: { id: true } },
          roleAssignments: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: { permission: true },
                  },
                },
              },
            },
          },
        },
      });

      // ── 4. Account status checks ────────────────────────────────────────────
      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
      }
      if (user.isDeleted) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Account has been deleted');
      }
      if (user.status === 'SUSPENDED') {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'Your account has been suspended. Contact support.'
        );
      }
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          `Account is locked until ${user.lockedUntil.toLocaleString()}`
        );
      }

      // ── 5. Detect token issued before password change ───────────────────────
      if (user.passwordChangedAt && decoded.iat) {
        const pwChangedTs = Math.floor(user.passwordChangedAt.getTime() / 1000);
        if (pwChangedTs > decoded.iat) {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            'Password was recently changed. Please log in again.'
          );
        }
      }

      // ── 6. System role guard (coarse-grained) ──────────────────────────────
      if (roles.length && !roles.includes(user.systemRole)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You do not have permission to access this resource'
        );
      }

      // ── 7. Build permission cache ───────────────────────────────────────────
      let permissions: string[];

      if (user.systemRole === 'SUPER_ADMIN') {
        // SUPER_ADMIN gets wildcard — no need to compute individual perms
        permissions = ['*'];
      } else {
        // Flatten role → permissions chain into unique permission name strings
        const permSet = new Set<string>();
        for (const assignment of user.roleAssignments) {
          for (const rp of assignment.role.permissions) {
            permSet.add(rp.permission.name);
          }
        }
        permissions = [...permSet];
      }

      // ── 8. Attach sanitized user to request ────────────────────────────────
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.systemRole,
        storeId: user.store?.id || null,
        permissions,
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default requireAuth;
