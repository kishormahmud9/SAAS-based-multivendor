import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { cartRepository } from './cart.repository';

const getCart = catchAsync(async (req, res) => {
  const result = await cartRepository.getCart(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart fetched successfully',
    data: result,
  });
});

const updateCart = catchAsync(async (req, res) => {
  const { productId, variantId, quantity } = req.body;
  const result = await cartRepository.updateCartItem(req.user!.id, productId, variantId || null, quantity);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart updated successfully',
    data: result,
  });
});

const syncCart = catchAsync(async (req, res) => {
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
};
