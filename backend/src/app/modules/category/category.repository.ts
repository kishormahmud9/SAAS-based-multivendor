import { prisma } from '../../db_connection';

const findById = async (id: string) => {
  return await (prisma as any).category.findUnique({
    where: { id },
    include: {
      parent: true,
      children: true,
      _count: {
        select: { products: true }
      }
    }
  });
};

const findBySlug = async (slug: string) => {
  return await (prisma as any).category.findUnique({
    where: { slug }
  });
};

const getAllTree = async (filter: any = {}) => {
  // Fetch all and build tree in service or fetch only roots and include children
  // For scalability, recursive fetch might be better for small trees, 
  // but for massive ones we should use a flat fetch and map.
  return await (prisma as any).category.findMany({
    where: { ...filter, parentId: null },
    include: {
      children: {
        include: {
          children: true
        }
      }
    },
    orderBy: { sortOrder: 'asc' }
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
    (prisma as any).category.findMany({
      where,
      skip,
      take: Number(limit),
      include: {
        parent: { select: { name: true } },
        _count: { select: { products: true } }
      },
      orderBy: { createdAt: 'desc' }
    }),
    (prisma as any).category.count({ where })
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
  return await (prisma as any).category.findMany({
    orderBy: { name: 'asc' }
  });
};

const getDescendants = async (id: string): Promise<string[]> => {
  const category = await (prisma as any).category.findUnique({
    where: { id },
    include: { children: true }
  });

  if (!category || !category.children.length) return [];

  let descendantIds: string[] = category.children.map((c: any) => c.id);
  
  for (const child of category.children) {
    const subDescendants = await getDescendants(child.id);
    descendantIds = [...descendantIds, ...subDescendants];
  }

  return descendantIds;
};

const getMaxSortOrder = async () => {
  const result = await (prisma as any).category.aggregate({
    _max: {
      sortOrder: true
    }
  });
  return result._max.sortOrder || 0;
};

export const categoryRepository = {
  findById,
  findBySlug,
  getAllTree,
  getPaginated,
  getAllFlat,
  getDescendants,
  getMaxSortOrder
};
