import { prisma } from '../../db_connection';

const getAll = async () => {
  return await (prisma as any).brand.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });
};

export const brandRepository = {
  getAll,
};
