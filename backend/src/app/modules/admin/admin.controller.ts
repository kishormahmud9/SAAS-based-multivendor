import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminRepository } from './admin.repository';
import { logAudit } from '../../utils/auditLogger';
import { prisma } from '../../db_connection';

const getStats = catchAsync(async (req, res) => {
  const result = await adminRepository.getDashboardStats();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin stats fetched successfully',
    data: result,
  });
});

const getDashboardOverview = catchAsync(async (req, res) => {
  const stats = await adminRepository.getDashboardStats();
  const recentOrders = await adminRepository.getRecentOrders();
  const lowStock = await adminRepository.getLowStockProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin dashboard overview fetched successfully',
    data: { stats, recentOrders, lowStock },
  });
});

// User Management
const getAllUsers = catchAsync(async (req, res) => {
  const result = await (prisma as any).user.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: 'desc' },
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

const toggleUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const oldUser = await (prisma as any).user.findUnique({ where: { id } });
  const result = await (prisma as any).user.update({
    where: { id },
    data: { status },
  });

  await logAudit(req, {
    action: 'user.update_status',
    entity: 'User',
    entityId: id,
    oldValue: { status: oldUser.status },
    newValue: { status },
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status updated successfully',
    data: result,
  });
});

// Product Management
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const oldProduct = await (prisma as any).product.findUnique({ where: { id } });
  const result = await (prisma as any).product.update({
    where: { id },
    data: req.body,
  });

  await logAudit(req, {
    action: 'product.update',
    entity: 'Product',
    entityId: id,
    oldValue: oldProduct,
    newValue: result,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

export const adminControllers = {
  getStats,
  getDashboardOverview,
  getAllUsers,
  toggleUserStatus,
  updateProduct,
};
