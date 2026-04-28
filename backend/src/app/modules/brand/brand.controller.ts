import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { brandServices } from './brand.service';

const getAllBrands = catchAsync(async (req, res) => {
  const result = await brandServices.getAllBrands();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands fetched successfully',
    data: result,
  });
});

export const brandControllers = {
  getAllBrands,
};
