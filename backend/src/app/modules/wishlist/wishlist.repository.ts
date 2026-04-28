import { prisma } from '../../db_connection';

const getWishlist = async (userId: string) => {
  return await (prisma as any).wishlist.findMany({
    where: { userId },
    include: {
      product: true,
    },
  });
};

const addToWishlist = async (userId: string, productId: string) => {
  return await (prisma as any).wishlist.upsert({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    update: {},
    create: {
      userId,
      productId,
    },
  });
};

const removeFromWishlist = async (userId: string, productId: string) => {
  return await (prisma as any).wishlist.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

export const wishlistRepository = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
