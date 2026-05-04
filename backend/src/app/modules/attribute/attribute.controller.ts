import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AttributeService } from './attribute.service';
import pick from '../../utils/pick';

const createAttribute = catchAsync(async (req: Request, res: Response) => {
  const result = await AttributeService.createAttribute(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute created successfully',
    data: result,
  });
});

const getAllAttributes = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['search', 'isActive']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AttributeService.getAllAttributes(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attributes fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAttributeById = catchAsync(async (req: Request, res: Response) => {
  const result = await AttributeService.getAttributeById(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute fetched successfully',
    data: result,
  });
});

const updateAttribute = catchAsync(async (req: Request, res: Response) => {
  const result = await AttributeService.updateAttribute(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute updated successfully',
    data: result,
  });
});

const deleteAttribute = catchAsync(async (req: Request, res: Response) => {
  const result = await AttributeService.deleteAttribute(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute deleted successfully',
    data: result,
  });
});

const checkName = catchAsync(async (req: Request, res: Response) => {
  const result = await AttributeService.checkName(req.query.name as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Check completed',
    data: result,
  });
});

export const AttributeController = {
  createAttribute,
  getAllAttributes,
  getAttributeById,
  updateAttribute,
  deleteAttribute,
  checkName,
};
