import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderRepository } from './order.repository';

const getOrderHistory = catchAsync(async (req, res) => {
  const result = await orderRepository.getOrderHistory(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});

const getOrderDetails = catchAsync(async (req, res) => {
  const result = await orderRepository.getOrderDetails(req.params.id, req.user!.id);
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
