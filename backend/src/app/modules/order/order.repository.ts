import { prisma } from '../../db_connection';

const getOrderHistory = async (userId: string) => {
  return await (prisma as any).order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
      payment: true,
      shipment: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getOrderDetails = async (orderId: string, userId: string) => {
  return await (prisma as any).order.findUnique({
    where: { id: orderId, userId },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
      payment: true,
      shipment: true,
      store: true,
    },
  });
};

export const orderRepository = {
  getOrderHistory,
  getOrderDetails,
};
