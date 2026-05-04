import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderRepository } from './order.repository';

const getOrderHistory = catchAsync(async (req: Request, res: Response) => {
  const result = await orderRepository.getOrderHistory(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});

const getOrderDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await orderRepository.getOrderDetails(req.params.id as string, req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order details fetched successfully',
    data: result,
  });
});

export const orderControllers = {
  getOrderHistory,
  getOrderDetails,
};
