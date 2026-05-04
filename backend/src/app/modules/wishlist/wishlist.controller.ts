import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { wishlistRepository } from './wishlist.repository';

const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const result = await wishlistRepository.getWishlist(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist fetched successfully',
    data: result,
  });
});

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const result = await wishlistRepository.addToWishlist(req.user!.id, req.body.productId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product added to wishlist',
    data: result,
  });
});

const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
  await wishlistRepository.removeFromWishlist(req.user!.id, req.params.productId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product removed from wishlist',
    data: null,
  });
});

export const wishlistControllers = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
