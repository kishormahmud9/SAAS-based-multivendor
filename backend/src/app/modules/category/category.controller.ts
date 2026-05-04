import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryServices } from './category.service';
import { prisma } from '../../db_connection';
import { optimizeAndSaveImage } from '../../utils/uploadHandler';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryData = req.body;

  if (req.file) {
    const imagePath = await optimizeAndSaveImage(req.file, 'category');
    categoryData.image = imagePath;
  }

  const result = await categoryServices.createCategory(categoryData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllTree = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getAllTree(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category tree fetched successfully',
    data: result,
  });
});

const getPaginated = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getPaginated(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Paginated categories fetched successfully',
    data: result.data,
    meta: result.meta
  });
});

const getAllFlat = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getAllFlat();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Flat categories fetched successfully',
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getSingleCategory(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category details fetched successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryData = req.body;

  if (req.file) {
    const imagePath = await optimizeAndSaveImage(req.file, 'category');
    categoryData.image = imagePath;
  }

  const result = await categoryServices.updateCategory(req.params.id as string, categoryData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await categoryServices.deleteCategory(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: null,
  });
});

const bulkStatusUpdate = catchAsync(async (req: Request, res: Response) => {
  const { ids, isActive } = req.body;
  await categoryServices.bulkStatusUpdate(ids, isActive);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bulk status updated successfully',
    data: null,
  });
});

const bulkDelete = catchAsync(async (req: Request, res: Response) => {
  const { ids } = req.body;
  await categoryServices.bulkDelete(ids);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bulk delete completed (categories with products/children were skipped)',
    data: null,
  });
});

const updateSortOrder = catchAsync(async (req: Request, res: Response) => {
  const { items } = req.body;
  await categoryServices.updateSortOrder(items);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sort order updated successfully',
    data: null,
  });
});

const getNextOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getNextSortOrder();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Next sort order fetched successfully',
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllTree,
  getPaginated,
  getAllFlat,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  bulkStatusUpdate,
  bulkDelete,
  updateSortOrder,
  getNextOrder,
  checkName: catchAsync(async (req: Request, res: Response) => {
    const { name } = req.query;
    if (!name) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Name is required',
        data: null,
      });
    }
    const slug = (name as string).toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const existing = await (prisma as any).category.findUnique({
      where: { slug }
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: existing ? 'Category exists' : 'Category available',
      data: { exists: !!existing },
    });
  })
};
