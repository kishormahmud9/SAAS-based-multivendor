import { prisma } from '../../db_connection';

const getProfile = async (userId: string) => {
  return await (prisma as any).user.findUnique({
    where: { id: userId },
    include: {
      addresses: true,
      _count: {
        select: { orders: true, reviews: true, wishlist: true },
      },
    },
  });
};

const updateProfile = async (userId: string, data: any) => {
  return await (prisma as any).user.update({
    where: { id: userId },
    data,
  });
};

const createAddress = async (userId: string, data: any) => {
  if (data.isDefault) {
    await (prisma as any).address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }
  return await (prisma as any).address.create({
    data: { ...data, userId },
  });
};

const getAddresses = async (userId: string) => {
  return await (prisma as any).address.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

const updateAddress = async (addressId: string, userId: string, data: any) => {
  if (data.isDefault) {
    await (prisma as any).address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }
  return await (prisma as any).address.update({
    where: { id: addressId, userId },
    data,
  });
};

const deleteAddress = async (addressId: string, userId: string) => {
  return await (prisma as any).address.delete({
    where: { id: addressId, userId },
  });
};

export const userRepository = {
  getProfile,
  updateProfile,
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
};
