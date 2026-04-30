import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { prisma } from '../../db_connection';
import { brandRepository } from './brand.repository';
import slugify from 'slugify';

const createBrand = async (payload: any) => {
  if (!payload.slug) {
    payload.slug = slugify(payload.name, { lower: true });
  }

  // Check if slug exists
  const existing = await brandRepository.findBySlug(payload.slug);
  if (existing) {
    throw new ApiError(httpStatus.CONFLICT, 'Brand name is already available');
  }

  return await (prisma as any).brand.create({ data: payload });
};

const updateBrand = async (id: string, payload: any) => {
  const brand = await brandRepository.findById(id);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  if (payload.name && !payload.slug) {
    payload.slug = slugify(payload.name, { lower: true });
    // Check if slug exists for other brands
    const existing = await (prisma as any).brand.findFirst({
      where: { slug: payload.slug, NOT: { id } }
    });
    if (existing) {
      throw new ApiError(httpStatus.CONFLICT, 'Brand name is already available');
    }
  }

  return await (prisma as any).brand.update({
    where: { id },
    data: payload
  });
};

const deleteBrand = async (id: string) => {
  const brand = await brandRepository.findById(id);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  // Check for products
  if (brand._count.products > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot delete brand with associated products');
  }

  return await (prisma as any).brand.delete({ where: { id } });
};

const getSingleBrand = async (id: string) => {
  const brand = await brandRepository.findById(id);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  return brand;
};

const getPaginated = async (query: any) => {
  return await brandRepository.getPaginated(query);
};

const getAllFlat = async () => {
  return await brandRepository.getAllFlat();
};

const bulkStatusUpdate = async (ids: string[], isActive: boolean) => {
  return await (prisma as any).brand.updateMany({
    where: { id: { in: ids } },
    data: { isActive }
  });
};

const bulkDelete = async (ids: string[]) => {
  return await (prisma as any).brand.deleteMany({
    where: { 
      id: { in: ids },
      products: { none: {} }
    }
  });
};

const checkName = async (name: string) => {
  const slug = slugify(name, { lower: true });
  const brand = await brandRepository.findBySlug(slug);
  return { exists: !!brand };
};

export const brandServices = {
  createBrand,
  updateBrand,
  deleteBrand,
  getSingleBrand,
  getPaginated,
  getAllFlat,
  bulkStatusUpdate,
  bulkDelete,
  checkName
};
