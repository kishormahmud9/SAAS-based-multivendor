import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { roleServices } from './role.service';

const createRole = catchAsync(async (req, res) => {
  const result = await roleServices.createRole(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Role created successfully',
    data: result,
  });
});

const getRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getRoles(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Roles fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getRoleById = catchAsync(async (req, res) => {
  const result = await roleServices.getRoleById(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role details fetched successfully',
    data: result,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const result = await roleServices.updateRole(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role updated successfully',
    data: result,
  });
});

const deleteRole = catchAsync(async (req, res) => {
  await roleServices.deleteRole(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role deleted successfully',
    data: null,
  });
});

const getAllPermissions = catchAsync(async (req, res) => {
  const result = await roleServices.getAllPermissions();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Permissions fetched successfully',
    data: result,
  });
});

const getRolePermissions = catchAsync(async (req, res) => {
  const result = await roleServices.getRolePermissions(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role permissions fetched successfully',
    data: result,
  });
});

const updateRolePermissions = catchAsync(async (req, res) => {
  const result = await roleServices.updateRolePermissions(req.params.id as string, req.body.permissionIds);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role permissions updated successfully',
    data: result,
  });
});

export const roleControllers = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  getAllPermissions,
  getRolePermissions,
  updateRolePermissions
};
