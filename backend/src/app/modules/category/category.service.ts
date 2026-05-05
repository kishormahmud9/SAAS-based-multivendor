import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { prisma } from '../../db_connection';
import { categoryRepository } from './category.repository';
import slugify from 'slugify';

const createCategory = async (payload: any) => {
  if (!payload.slug) {
    payload.slug = slugify(payload.name, { lower: true });
  }

  // Check if slug exists
  const existing = await categoryRepository.findBySlug(payload.slug);
  if (existing) {
    throw new ApiError(httpStatus.CONFLICT, 'Category name is already available');
  }

  return await (prisma as any).category.create({ data: payload });
};

const updateCategory = async (id: string, payload: any) => {
  const category = await categoryRepository.findById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  // Prevent loop: parentId cannot be itself
  if (payload.parentId === id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A category cannot be its own parent');
  }

  // Prevent loop: parentId cannot be a descendant
  if (payload.parentId) {
    const descendants = await categoryRepository.getDescendants(id);
    if (descendants.includes(payload.parentId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'A category cannot be a child of its own descendant');
    }
  }

  if (payload.name && !payload.slug) {
    payload.slug = slugify(payload.name, { lower: true });
    // Check if slug exists for other categories
    const existing = await (prisma as any).category.findFirst({
      where: { slug: payload.slug, NOT: { id } }
    });
    if (existing) {
      throw new ApiError(httpStatus.CONFLICT, 'Category name is already available');
    }
  }

  return await (prisma as any).category.update({
    where: { id },
    data: payload
  });
};

const deleteCategory = async (id: string) => {
  const category = await categoryRepository.findById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  // Check for products
  if (category._count.products > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot delete category with associated products');
  }

  // Check for children
  if (category.children.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot delete category with sub-categories. Move children first.');
  }

  return await (prisma as any).category.delete({ where: { id } });
};

const getSingleCategory = async (id: string) => {
  const category = await categoryRepository.findById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

const getAllTree = async (filter: any) => {
  return await categoryRepository.getAllTree(filter);
};

const getPaginated = async (query: any) => {
  return await categoryRepository.getPaginated(query);
};

const getAllFlat = async () => {
  return await categoryRepository.getAllFlat();
};

const bulkStatusUpdate = async (ids: string[], isActive: boolean) => {
  return await (prisma as any).category.updateMany({
    where: { id: { in: ids } },
    data: { isActive }
  });
};

const bulkDelete = async (ids: string[]) => {
  // We should ideally check for products for each ID, but for bulk we'll filter out those with products
  // Or just try and let it fail if constraints exist.
  // A safer way is to delete those with 0 products.
  return await (prisma as any).category.deleteMany({
    where: {
      id: { in: ids },
      products: { none: {} },
      children: { none: {} }
    }
  });
};

const updateSortOrder = async (items: { id: string, sortOrder: number }[]) => {
  return await Promise.all(
    items.map(item =>
      (prisma as any).category.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder }
      })
    )
  );
};

const getNextSortOrder = async () => {
  const maxOrder = await categoryRepository.getMaxSortOrder();
  return maxOrder + 1;
};

const getAll = async () => {
  return await categoryRepository.getAll();
};

export const categoryServices = {
  createCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
  getAllTree,
  getPaginated,
  getAllFlat,
  bulkStatusUpdate,
  bulkDelete,
  updateSortOrder,
  getNextSortOrder,
  getAll
};
