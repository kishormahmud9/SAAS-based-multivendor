import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { vendorRepository } from './vendor.repository';
import { prisma } from '../../db_connection';

const getDashboardStats = catchAsync(async (req, res) => {
  const result = await vendorRepository.getDashboardStats(req.tenant!.storeId!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vendor stats fetched successfully',
    data: result,
  });
});

const getMyProducts = catchAsync(async (req, res) => {
  const result = await vendorRepository.getVendorProducts(req.tenant!.storeId!, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully',
    data: result,
  });
});

const getMyOrders = catchAsync(async (req, res) => {
  const result = await vendorRepository.getVendorOrders(req.tenant!.storeId!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vendor orders fetched successfully',
    data: result,
  });
});

const requestWithdrawal = catchAsync(async (req, res) => {
  const { amount, method, accountDetails } = req.body;
  const result = await vendorRepository.createWithdrawalRequest(req.tenant!.storeId!, amount, method, accountDetails);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Withdrawal request submitted',
    data: result,
  });
});

const setupStore = catchAsync(async (req, res) => {
  // logic to create store if not exists and update user systemRole to VENDOR
  const { name, slug, description } = req.body;
  const userId = req.user!.id;

  const result = await (prisma as any).$transaction(async (tx: any) => {
    const store = await tx.store.create({
      data: {
        vendorId: userId,
        name,
        slug,
        description,
        status: 'PENDING_REVIEW',
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { systemRole: 'VENDOR' },
    });

    return store;
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Store created successfully. Awaiting approval.',
    data: result,
  });
});

export const vendorControllers = {
  getDashboardStats,
  getMyProducts,
  getMyOrders,
  requestWithdrawal,
  setupStore,
};
