import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsed = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
      cookies: req.cookies,
    });

    // Assign cleaned/transformed values back to request
    // This ensures that Zod defaults, trims, and transforms are persisted
    req.body = parsed.body;
    req.query = parsed.query;
    req.params = parsed.params;
    req.cookies = parsed.cookies;

    next();
  });
};

export default validateRequest;

