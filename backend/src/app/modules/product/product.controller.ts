import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './product.service';
import { reviewRepository } from '../review/review.repository';

const getAllProducts = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'category', 'brand', 'minPrice', 'maxPrice', 'isFeatured', 'status']);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await productServices.getAllProducts(filters, options as any);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getProductBySlug = catchAsync(async (req, res) => {
  const result = await productServices.getProductBySlug(req.params.slug as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

const getProductReviews = catchAsync(async (req, res) => {
  const { id } = req.params as { id: string };
  const result = await reviewRepository.getProductReviews(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fetched successfully',
    data: result,
  });
});

export const productControllers = {
  getAllProducts,
  getProductBySlug,
  getProductReviews,
};
