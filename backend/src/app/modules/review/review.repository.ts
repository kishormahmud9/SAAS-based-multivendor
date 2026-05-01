import { prisma } from '../../db_connection';

const createReview = async (userId: string, data: any) => {
  return await (prisma as any).review.create({
    data: { ...data, userId },
  });
};

const getProductReviews = async (productId: string) => {
  return await (prisma as any).review.findMany({
    where: { productId, isApproved: true },
    include: {
      user: {
        select: { name: true, avatar: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const reviewRepository = {
  createReview,
  getProductReviews,
};
