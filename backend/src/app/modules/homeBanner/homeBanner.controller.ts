import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { homeBannerServices } from './homeBanner.service';

const createHomeBanner = catchAsync(async (req, res) => {
  const result = await homeBannerServices.createHomeBanner(req.body, req.file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Home banner created successfully',
    data: result,
  });
});

const getAllBanners = catchAsync(async (req, res) => {
  const result = await homeBannerServices.getAllBanners(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Home banners fetched successfully',
    data: result,
  });
});

const getSingleBanner = catchAsync(async (req, res) => {
  const result = await homeBannerServices.getSingleBanner(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Home banner fetched successfully',
    data: result,
  });
});

const updateHomeBanner = catchAsync(async (req, res) => {
  const result = await homeBannerServices.updateHomeBanner(req.params.id as string, req.body, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Home banner updated successfully',
    data: result,
  });
});

const deleteHomeBanner = catchAsync(async (req, res) => {
  const result = await homeBannerServices.deleteHomeBanner(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Home banner deleted successfully',
    data: result,
  });
});

export const homeBannerControllers = {
  createHomeBanner,
  getAllBanners,
  getSingleBanner,
  updateHomeBanner,
  deleteHomeBanner,
};
