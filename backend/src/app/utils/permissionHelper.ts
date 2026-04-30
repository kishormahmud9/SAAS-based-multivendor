/**
 * RBAC Permission Helper Utilities
 * ----------------------------------
 * Provides reusable helpers to check permissions from the req.user object
 * that is populated by requireAuth middleware.
 */

import { Request } from 'express';

/**
 * Check if the current request user has a specific permission.
 *
 * - SUPER_ADMIN always returns true (permissions = ['*'])
 * - All other roles are checked against the cached permissions array
 *
 * @example
 * if (!hasPermission(req, 'products:create')) {
 *   throw new ApiError(403, 'Forbidden');
 * }
 */
export const hasPermission = (req: Request, permission: string): boolean => {
  const user = req.user;
  if (!user) return false;

  // SUPER_ADMIN wildcard bypass
  if (user.permissions.includes('*')) return true;

  return user.permissions.includes(permission);
};

/**
 * Check if the current request user has ALL of the given permissions.
 */
export const hasAllPermissions = (req: Request, permissions: string[]): boolean => {
  const user = req.user;
  if (!user) return false;

  if (user.permissions.includes('*')) return true;

  return permissions.every((p) => user.permissions.includes(p));
};

/**
 * Check if the current request user has ANY of the given permissions.
 */
export const hasAnyPermission = (req: Request, permissions: string[]): boolean => {
  const user = req.user;
  if (!user) return false;

  if (user.permissions.includes('*')) return true;

  return permissions.some((p) => user.permissions.includes(p));
};
