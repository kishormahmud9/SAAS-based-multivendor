import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T> & Record<string, any>) => {
  const responseData: any = {
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  };

  // Add any other top-level fields (like 'summary', 'token', etc.)
  Object.keys(data).forEach((key) => {
    if (!['statusCode', 'success', 'message', 'meta', 'data'].includes(key)) {
      responseData[key] = data[key];
    }
  });

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
