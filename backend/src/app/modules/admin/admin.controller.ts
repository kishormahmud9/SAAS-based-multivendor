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
const getAllProducts = catchAsync(async (req, res) => {
  const result = await (prisma as any).product.findMany({
    where: { isDeleted: false },
    include: {
      category: { select: { name: true } },
      brand: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully',
    data: result,
  });
});

const createProduct = catchAsync(async (req, res) => {
  let { storeId, ...productData } = req.body;

  // If storeId is not provided, find the admin's official store
  if (!storeId) {
    const adminStore = await (prisma as any).store.findFirst({
      where: { vendor: { systemRole: 'SUPER_ADMIN' } }
    });
    if (!adminStore) {
      throw new Error('Admin official store not found. Please run seeds.');
    }
    storeId = adminStore.id;
  }

  const result = await (prisma as any).product.create({
    data: {
      ...productData,
      storeId,
    },
  });

  await logAudit(req, {
    action: 'product.create',
    entity: 'Product',
    entityId: result.id,
    newValue: result,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

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

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await (prisma as any).product.update({
    where: { id },
    data: { isDeleted: true },
  });

  await logAudit(req, {
    action: 'product.delete',
    entity: 'Product',
    entityId: id,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

// Category Management
const getAllCategories = catchAsync(async (req, res) => {
  const result = await (prisma as any).category.findMany({
    orderBy: { name: 'asc' },
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});

const createCategory = catchAsync(async (req, res) => {
  const result = await (prisma as any).category.create({ data: req.body });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await (prisma as any).category.update({
    where: { id },
    data: req.body,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  await (prisma as any).category.delete({ where: { id } });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: null,
  });
});

// Brand Management
const getAllBrands = catchAsync(async (req, res) => {
  const result = await (prisma as any).brand.findMany({
    orderBy: { name: 'asc' },
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands fetched successfully',
    data: result,
  });
});

const createBrand = catchAsync(async (req, res) => {
  const result = await (prisma as any).brand.create({ data: req.body });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Brand created successfully',
    data: result,
  });
});

const updateBrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await (prisma as any).brand.update({
    where: { id },
    data: req.body,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand updated successfully',
    data: result,
  });
});

const deleteBrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  await (prisma as any).brand.delete({ where: { id } });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand deleted successfully',
    data: null,
  });
});

export const adminControllers = {
  getStats,
  getDashboardOverview,
  getAllUsers,
  toggleUserStatus,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};
