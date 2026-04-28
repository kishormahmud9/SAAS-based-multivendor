import { prisma } from '../../db_connection';

const getDashboardStats = async (storeId: string) => {
  const [totalProducts, totalOrders, revenue, wallet] = await Promise.all([
    (prisma as any).product.count({ where: { storeId, isDeleted: false } }),
    (prisma as any).vendorOrder.count({ where: { storeId } }),
    (prisma as any).vendorOrder.aggregate({
      _sum: { vendorEarns: true },
      where: { storeId, status: 'DELIVERED' },
    }),
    (prisma as any).store.findUnique({
      where: { id: storeId },
      select: { walletBalance: true, totalEarned: true },
    }),
  ]);

  return {
    totalProducts,
    totalOrders,
    totalRevenue: revenue._sum.vendorEarns || 0,
    walletBalance: wallet?.walletBalance || 0,
    totalEarned: wallet?.totalEarned || 0,
  };
};

const getVendorProducts = async (storeId: string, filters: any) => {
  return await (prisma as any).product.findMany({
    where: { ...filters, storeId, isDeleted: false },
    include: { category: true, brand: true },
    orderBy: { createdAt: 'desc' },
  });
};

const getVendorOrders = async (storeId: string) => {
  return await (prisma as any).vendorOrder.findMany({
    where: { storeId },
    include: {
      order: {
        include: { user: { select: { name: true, email: true } } },
      },
      items: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const createWithdrawalRequest = async (storeId: string, amount: number, method: string, accountDetails: string) => {
  const store = await (prisma as any).store.findUnique({ where: { id: storeId } });
  if (!store || Number(store.walletBalance) < amount) {
    throw new Error('Insufficient wallet balance');
  }

  return await (prisma as any).withdrawal.create({
    data: {
      storeId,
      amount,
      method,
      accountDetails,
      status: 'PENDING',
    },
  });
};

export const vendorRepository = {
  getDashboardStats,
  getVendorProducts,
  getVendorOrders,
  createWithdrawalRequest,
};
