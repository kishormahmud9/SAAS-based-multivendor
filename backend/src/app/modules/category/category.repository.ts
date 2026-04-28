import { prisma } from '../../db_connection';

const getAll = async () => {
  return await (prisma as any).category.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });
};

export const categoryRepository = {
  getAll,
};
