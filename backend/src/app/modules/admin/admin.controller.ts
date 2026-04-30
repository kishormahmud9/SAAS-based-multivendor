import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminRepository } from './admin.repository';
import { logAudit } from '../../utils/auditLogger';
import { prisma } from '../../db_connection';
import { optimizeAndSaveImage } from '../../utils/uploadHandler';
import slugify from 'slugify';
import ApiError from '../../errors/ApiError';

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
    include: {
      roleAssignments: {
        include: {
          role: { select: { id: true, name: true } }
        }
      }
    },
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
  const { id } = req.params as { id: string };
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

const assignUserRoles = catchAsync(async (req, res) => {
  const { id } = req.params as { id: string };
  const { roleIds } = req.body as { roleIds: string[] };

  const user = await (prisma as any).user.findUnique({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }

  // Delete existing roles and insert new ones
  await (prisma as any).roleAssignment.deleteMany({
    where: { userId: id }
  });

  if (roleIds && roleIds.length > 0) {
    await (prisma as any).roleAssignment.createMany({
      data: roleIds.map(roleId => ({
        userId: id,
        roleId,
        grantedBy: req.user?.id
      }))
    });
  }

  const updatedUser = await (prisma as any).user.findUnique({
    where: { id },
    include: {
      roleAssignments: {
        include: {
          role: { select: { id: true, name: true } }
        }
      }
    }
  });

  await logAudit(req, {
    action: 'user.assign_roles',
    entity: 'User',
    entityId: id,
    newValue: { roleIds },
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User roles assigned successfully',
    data: updatedUser,
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
  let { storeId, attributes, variants, metaKeywords, ...productData } = req.body;

  // 1. Handle Images
  const images: string[] = [];
  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files as Express.Multer.File[]) {
      const url = await optimizeAndSaveImage(file, 'products');
      images.push(url);
    }
  }

  // 2. Default Store (Admin Store)
  if (!storeId) {
    const adminStore = await (prisma as any).store.findFirst({
      where: { vendor: { systemRole: 'SUPER_ADMIN' } }
    });
    if (!adminStore) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Admin official store not found. Please run seeds.');
    }
    storeId = adminStore.id;
  }

  // 3. Slugify
  if (!productData.slug) {
    productData.slug = slugify(productData.name, { lower: true });
  }

  // 4. Database Persistence
  const result = await (prisma as any).product.create({
    data: {
      ...productData,
      storeId,
      images,
      thumbnail: images[0] || null,
      metaKeywords: metaKeywords || [],
      attributes: {
        create: attributes || []
      },
      variants: {
        create: variants?.map((v: any) => ({
          ...v,
          images: v.images || [], // For now, variants use main images or none
        })) || []
      }
    },
    include: {
      attributes: true,
      variants: true,
      category: { select: { name: true } },
      brand: { select: { name: true } }
    }
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
  const { id } = req.params as { id: string };
  let { attributes, variants, metaKeywords, ...productData } = req.body;

  const oldProduct = await (prisma as any).product.findUnique({ 
    where: { id },
    include: { attributes: true, variants: true }
  });

  if (!oldProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // 1. Handle New Images (if any)
  let images = oldProduct.images;
  if (req.files && Array.isArray(req.files) && (req.files as any[]).length > 0) {
    const newImages: string[] = [];
    for (const file of req.files as Express.Multer.File[]) {
      const url = await optimizeAndSaveImage(file, 'products');
      newImages.push(url);
    }
    images = [...images, ...newImages];
  }

  // 2. Update Basic Data
  const updateData: any = {
    ...productData,
    images,
    thumbnail: images[0] || null,
    metaKeywords: metaKeywords || oldProduct.metaKeywords,
  };

  // 3. Handle Nested Updates (Simplified: Delete and Recreate)
  if (attributes) {
    updateData.attributes = {
      deleteMany: {},
      create: attributes
    };
  }

  if (variants) {
    updateData.variants = {
      deleteMany: {},
      create: variants.map((v: any) => ({
        ...v,
        images: v.images || [],
      }))
    };
  }

  const result = await (prisma as any).product.update({
    where: { id },
    data: updateData,
    include: {
      attributes: true,
      variants: true,
      category: { select: { name: true } },
      brand: { select: { name: true } }
    }
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
  const { id } = req.params as { id: string };
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
  assignUserRoles,
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
