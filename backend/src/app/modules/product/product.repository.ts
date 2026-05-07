import { Prisma } from '@prisma/client';
import { prisma } from '../../db_connection';
import { IPaginationOptions } from '../../interfaces/pagination';
import { paginationHelpers } from '../../utils/paginationHelper';

const findAll = async (filters: any, options: IPaginationOptions) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, category, brand, ...filterData } = filters;

  const andConditions: Prisma.ProductWhereInput[] = [{ isDeleted: false, status: 'ACTIVE' }];

  if (searchTerm) {
    andConditions.push({
      OR: ['name', 'description', 'slug'].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (category) {
    const categorySlugs = category.split(',');
    andConditions.push({
      category: {
        slug: {
          in: categorySlugs,
        },
      },
    });
  }

  if (brand) {
    const brandSlugs = brand.split(',');
    andConditions.push({
      brand: {
        slug: {
          in: brandSlugs,
        },
      },
    });
  }

  if (minPrice || maxPrice) {
    andConditions.push({
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        let value = (filterData as any)[key];
        if (key === 'isFeatured') {
          value = value === 'true';
        }
        return {
          [key]: {
            equals: value,
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await (prisma as any).product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      category: true,
      brand: true,
      store: {
        select: {
          id: true,
          name: true,
          slug: true,
          logo: true,
        },
      },
    },
  });

  const total = await (prisma as any).product.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const findBySlug = async (slug: string) => {
  return await (prisma as any).product.findFirst({
    where: {
      slug,
      isDeleted: false,
      status: 'ACTIVE',
    },
    include: {
      category: true,
      brand: true,
      store: true,
      variants: true,
      attributes: true,
      reviews: {
        where: { isApproved: true },
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
};

export const productRepository = {
  findAll,
  findBySlug,
};
