import { prisma } from '../../db_connection';

const findById = async (id: string) => {
  return await (prisma as any).brand.findUnique({
    where: { id },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
};

const findBySlug = async (slug: string) => {
  return await (prisma as any).brand.findUnique({
    where: { slug }
  });
};

const getPaginated = async (query: any) => {
  const { page = 1, limit = 10, search = '', isActive } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {
    OR: [
      { name: { contains: search, mode: 'insensitive' } },
      { slug: { contains: search, mode: 'insensitive' } }
    ]
  };

  if (isActive !== undefined) {
    where.isActive = isActive === 'true';
  }

  const [data, total] = await Promise.all([
    (prisma as any).brand.findMany({
      where,
      skip,
      take: Number(limit),
      include: {
        _count: { select: { products: true } }
      },
      orderBy: { createdAt: 'desc' }
    }),
    (prisma as any).brand.count({ where })
  ]);

  return {
    data,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPage: Math.ceil(total / Number(limit))
    }
  };
};

const getAllFlat = async () => {
  return await (prisma as any).brand.findMany({
    orderBy: { name: 'asc' }
  });
};

export const brandRepository = {
  findById,
  findBySlug,
  getPaginated,
  getAllFlat
};
