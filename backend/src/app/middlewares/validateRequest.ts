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
    // We use Object.assign for query, params and cookies because they are often read-only getters
    if (parsed.body) {
      req.body = parsed.body;
    }

    if (parsed.query) {
      Object.keys(req.query).forEach((key) => delete req.query[key]);
      Object.assign(req.query, parsed.query);
    }

    if (parsed.params) {
      Object.keys(req.params).forEach((key) => delete req.params[key]);
      Object.assign(req.params, parsed.params);
    }

    if (parsed.cookies) {
      Object.keys(req.cookies).forEach((key) => delete req.cookies[key]);
      Object.assign(req.cookies, parsed.cookies);
    }

    next();
  });
};

export default validateRequest;

