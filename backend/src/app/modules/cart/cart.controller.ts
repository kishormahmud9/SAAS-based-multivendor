import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { cartRepository } from './cart.repository';

const getCart = catchAsync(async (req: Request, res: Response) => {
  const result = await cartRepository.getCart(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart fetched successfully',
    data: result,
  });
});

const updateCart = catchAsync(async (req: Request, res: Response) => {
  const { productId, variantId, quantity } = req.body;
  await cartRepository.updateCartItem(req.user!.id, productId, variantId || null, quantity);
  const result = await cartRepository.getCart(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart updated successfully',
    data: result,
  });
});

const updateQuantity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { quantity } = req.body;
  await cartRepository.updateQuantity(req.user!.id, id, quantity);
  const result = await cartRepository.getCart(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quantity updated successfully',
    data: result,
  });
});

const removeItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  await cartRepository.removeItem(req.user!.id, id);
  const result = await cartRepository.getCart(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item removed successfully',
    data: result,
  });
});

const syncCart = catchAsync(async (req: Request, res: Response) => {
  await cartRepository.syncGuestCart(req.user!.id, req.body.items);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart synced successfully',
    data: null,
  });
});

export const cartControllers = {
  getCart,
  updateCart,
  syncCart,
  updateQuantity,
  removeItem,
};
