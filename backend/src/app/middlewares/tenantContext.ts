import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";

export const tenantContext = () => {
  return async (req: Request & { user?: any, tenant?: any }, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.storeId) {
        throw new ApiError(httpStatus.FORBIDDEN, "Tenant access denied. You are not associated with a store.");
      }
      
      // Inject storeId directly into req.body or a dedicated context object 
      req.tenant = { storeId: req.user.storeId };
      
      next();
    } catch (err) {
      next(err);
    }
  };
};
