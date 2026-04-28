import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './product.service';

const getAllProducts = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'category', 'brand', 'minPrice', 'maxPrice', 'isFeatured', 'status']);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await productServices.getAllProducts(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getProductBySlug = catchAsync(async (req, res) => {
  const result = await productServices.getProductBySlug(req.params.slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

export const productControllers = {
  getAllProducts,
  getProductBySlug,
};
