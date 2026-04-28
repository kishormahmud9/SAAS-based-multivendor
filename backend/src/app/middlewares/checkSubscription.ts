import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { prisma } from '../db_connection';

/**
 * Subscription Guard
 * - Checks if the vendor's store has an active subscription.
 * - Blocks access if subscription is expired or inactive.
 */
export const checkSubscription = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storeId = req.tenant?.storeId;

      if (!storeId) {
        return next(); // Not a tenant-specific request or not a vendor
      }

      const subscription = await (prisma as any).subscription.findFirst({
        where: {
          storeId,
          status: { in: ['ACTIVE', 'TRIAL'] },
          currentPeriodEnd: { gte: new Date() },
        },
        include: { plan: true },
      });

      if (!subscription) {
        throw new ApiError(
          httpStatus.PAYMENT_REQUIRED,
          'Your subscription has expired or is inactive. Please renew to continue using vendor features.',
        );
      }

      // Attach subscription and plan info to request for limit checks in controllers
      (req as any).subscription = subscription;

      next();
    } catch (err) {
      next(err);
    }
  };
};

/**
 * Limit Guard Utility
 * - Helper to check feature limits (e.g., product count)
 */
export const checkLimit = async (storeId: string, limitKey: string, currentCount: number) => {
  const subscription = await (prisma as any).subscription.findFirst({
    where: { storeId, status: { in: ['ACTIVE', 'TRIAL'] } },
    include: { plan: true },
  });

  if (!subscription || !subscription.plan.limits) return true;

  const limits = subscription.plan.limits as any;
  const maxAllowed = limits[limitKey];

  if (maxAllowed !== undefined && currentCount >= maxAllowed) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      `Limit exceeded: Your current plan allows only ${maxAllowed} ${limitKey}. Please upgrade your plan.`,
    );
  }

  return true;
};
