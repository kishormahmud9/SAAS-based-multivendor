import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/ApiError';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Check if token is present
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Verify token
    let decodedUser: JwtPayload;
    try {
      decodedUser = jwt.verify(token, config.JWT_ACCESS_TOKEN as string) as JwtPayload;
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }

    const { role } = decodedUser;

    // Check if user has required roles
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to access this resource');
    }

    // Add user to request object
    req.user = decodedUser;
    next();
  });
};

export default auth;
