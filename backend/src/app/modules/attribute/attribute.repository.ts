import { Prisma, Attribute } from '../../../generated/prisma';
import { prisma } from '../../db_connection';

const create = async (data: Prisma.AttributeCreateInput): Promise<Attribute> => {
  return await (prisma as any).attribute.create({
    data,
    include: { values: true },
  });
};

const getAll = async (filters: any, options: any) => {
  // Coerce all pagination values to integers to prevent Prisma 'Expected Int, provided String'
  const page = Math.max(1, Math.floor(Number(options.page) || 1));
  const limit = Math.min(100, Math.max(1, Math.floor(Number(options.limit) || 10)));
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'sortOrder';
  const sortOrder = options.sortOrder || 'asc';

  const where: Prisma.AttributeWhereInput = {};
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { slug: { contains: filters.search, mode: 'insensitive' } },
    ];
  }
  if (filters.isActive !== undefined && filters.isActive !== '') {
    where.isActive = filters.isActive === 'true' || filters.isActive === true;
  }

  const [result, total] = await Promise.all([
    (prisma as any).attribute.findMany({
      where,
      skip,          // guaranteed integer
      take: limit,   // guaranteed integer
      orderBy: { [sortBy]: sortOrder },
      include: {
        values: {
          orderBy: { sortOrder: 'asc' },
        },
        _count: true,
      },
    }),
    (prisma as any).attribute.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getById = async (id: string): Promise<Attribute | null> => {
  return await (prisma as any).attribute.findUnique({
    where: { id },
    include: { values: { orderBy: { sortOrder: 'asc' } } },
  });
};

const update = async (id: string, data: Prisma.AttributeUpdateInput): Promise<Attribute> => {
  return await (prisma as any).attribute.update({
    where: { id },
    data,
    include: { values: true },
  });
};

const deleteById = async (id: string): Promise<Attribute> => {
  return await (prisma as any).attribute.delete({
    where: { id },
  });
};

const checkExists = async (name: string, excludeId?: string): Promise<boolean> => {
  const where: any = { name: { equals: name, mode: 'insensitive' } };
  if (excludeId) where.id = { not: excludeId };
  
  const count = await (prisma as any).attribute.count({ where });
  return count > 0;
};

export const AttributeRepository = {
  create,
  getAll,
  getById,
  update,
  deleteById,
  checkExists,
};
