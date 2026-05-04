import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { marketingServices } from './marketing.service';

const getBanners = catchAsync(async (req: Request, res: Response) => {
  const result = await marketingServices.getBanners();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banners fetched successfully',
    data: result,
  });
});

const getOffers = catchAsync(async (req: Request, res: Response) => {
  const result = await marketingServices.getOffers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offers fetched successfully',
    data: result,
  });
});

const getUiSettings = catchAsync(async (req: Request, res: Response) => {
  const result = await marketingServices.getUiSettings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'UI Settings fetched successfully',
    data: result,
  });
});

export const marketingControllers = {
  getBanners,
  getOffers,
  getUiSettings,
};
