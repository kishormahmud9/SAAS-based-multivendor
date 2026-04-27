import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";

const requireRole = (...roles: string[]) => {
  return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      if (roles.length && !roles.includes(req.user.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "You do not have permission to access this resource!");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default requireRole;
