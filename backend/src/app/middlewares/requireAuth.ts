import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { verifyToken } from "../utils/jwt";
import config from "../config";
import { prisma } from "../db_connection";

const requireAuth = () => {
  return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const decoded = verifyToken(token, config.JWT_ACCESS_TOKEN as string);

      const db = prisma as any;
      const user = await db.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
      if (user.isDeleted) throw new ApiError(httpStatus.FORBIDDEN, "User account is deleted");
      if (user.status === 'BLOCKED' || (user.lockedUntil && user.lockedUntil > new Date())) {
        throw new ApiError(httpStatus.FORBIDDEN, "Account is currently locked or blocked");
      }

      if (user.passwordChangedAt && decoded.iat) {
        const passwordChangedTime = parseInt((user.passwordChangedAt.getTime() / 1000).toString(), 10);
        if (passwordChangedTime > decoded.iat) {
          throw new ApiError(httpStatus.UNAUTHORIZED, "Password was changed recently. Please log in again.");
        }
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.systemRole,
        storeId: user.storeId
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default requireAuth;
