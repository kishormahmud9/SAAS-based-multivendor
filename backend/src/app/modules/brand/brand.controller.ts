import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { brandServices } from './brand.service';
import { optimizeAndSaveImage } from '../../utils/uploadHandler';

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const brandData = req.body;

  if (req.file) {
    const logoPath = await optimizeAndSaveImage(req.file, 'brand');
    brandData.logo = logoPath;
  }

  const result = await brandServices.createBrand(brandData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Brand created successfully',
    data: result,
  });
});

const getPaginated = catchAsync(async (req: Request, res: Response) => {
  const result = await brandServices.getPaginated(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Paginated brands fetched successfully',
    data: result.data,
    meta: result.meta
  });
});

const getAllFlat = catchAsync(async (req: Request, res: Response) => {
  const result = await brandServices.getAllFlat();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Flat brands fetched successfully',
    data: result,
  });
});

const getSingleBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandServices.getSingleBrand(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand details fetched successfully',
    data: result,
  });
});

const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const brandData = req.body;

  if (req.file) {
    const logoPath = await optimizeAndSaveImage(req.file, 'brand');
    brandData.logo = logoPath;
  }

  const result = await brandServices.updateBrand(req.params.id as string, brandData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand updated successfully',
    data: result,
  });
});

const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  await brandServices.deleteBrand(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand deleted successfully',
    data: null,
  });
});

const bulkStatusUpdate = catchAsync(async (req: Request, res: Response) => {
  const { ids, isActive } = req.body;
  await brandServices.bulkStatusUpdate(ids, isActive);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bulk status updated successfully',
    data: null,
  });
});

const bulkDelete = catchAsync(async (req: Request, res: Response) => {
  const { ids } = req.body;
  await brandServices.bulkDelete(ids);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bulk delete completed (brands with products were skipped)',
    data: null,
  });
});

const checkName = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.query;
  const result = await brandServices.checkName(name as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result.exists ? 'Brand exists' : 'Brand available',
    data: result,
  });
});

export const brandControllers = {
  createBrand,
  getPaginated,
  getAllFlat,
  getSingleBrand,
  updateBrand,
  deleteBrand,
  bulkStatusUpdate,
  bulkDelete,
  checkName
};
