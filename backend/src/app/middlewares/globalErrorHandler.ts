import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import config from '../config';
import ApiError from '../errors/ApiError';
import { errorLogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let statusCode: any = httpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong!';
  let errors: { field: string | number; message: string }[] = [];

  if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = 'Validation Error';
    errors = err.issues.map((issue) => ({
      field: String(issue.path[issue.path.length - 1] ?? ''),
      message: issue.message,
    }));
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    
    if (err.errors && err.errors.length > 0) {
      errors = err.errors;
    } else {
      // Heuristic to extract field from message if not provided
      let field = '';
      const msg = err.message.toLowerCase();
      if (msg.includes('category name') || msg.includes('brand name') || msg.includes('attribute name')) field = 'name';
      else if (msg.includes('slug')) field = 'slug';
      else if (msg.includes('description')) field = 'description';
      else if (msg.includes('image') || msg.includes('logo')) field = 'image';
      else if (msg.includes('sort order') || msg.includes('display order')) field = 'sortOrder';
      else if (msg.includes('meta title')) field = 'metaTitle';
      else if (msg.includes('meta desc')) field = 'metaDesc';

      errors = err?.message ? [{ field, message: err.message }] : [];
    }
  } else if (err.constructor.name === 'PrismaClientKnownRequestError') {
    statusCode = httpStatus.BAD_REQUEST;
    if (err.code === 'P2002') {
      message = 'Unique constraint violation';
      const target = (err.meta?.target as string[]) || [];
      errors = target.map(field => ({ field, message: `${field} already exists` }));
    } else if (err.code === 'P2003') {
      message = 'Foreign key constraint violation';
      errors = [{ field: 'parentId', message: 'The selected parent does not exist' }];
    } else if (err.code === 'P2021') {
      message = 'Database table missing. Please run migrations.';
      errors = [{ field: '', message: 'Table does not exist in the database' }];
    } else if (err.code === 'P2025') {
      message = 'Record not found';
      errors = [{ field: '', message: 'The requested record does not exist' }];
    } else {
      message = err.message;
      errors = [{ field: '', message: err.message }];
    }
  } else if (err instanceof Error) {
    message = err?.message;
    errors = err?.message ? [{ field: '', message: err.message }] : [];
  }

  // Log error
  if (config.env === 'development') {
    console.error('💥 Error:', err);
  } else {
    errorLogger.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: config.env === 'development' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;