class ApiError extends Error {
  statusCode: number;
  errors?: { field: string | number; message: string }[];

  constructor(
    statusCode: number, 
    message: string | undefined, 
    errors?: { field: string | number; message: string }[], 
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;