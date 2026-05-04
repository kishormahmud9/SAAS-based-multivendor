import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { homeBannerRepository } from './homeBanner.repository';
import { optimizeAndSaveImage } from '../../utils/uploadHandler';

const createHomeBanner = async (data: any, file: Express.Multer.File | undefined) => {
  let imageUrl = data.image;

  if (file) {
    imageUrl = await optimizeAndSaveImage(file, 'banners');
  } else if (data.backgroundType === 'IMAGE' && !data.image) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Banner image is required for image background');
  }

  const bannerData: any = {
    ...data,
    image: imageUrl,
    isActive: data.isActive === 'true' || data.isActive === true,
    order: data.order ? parseInt(data.order, 10) : 0,
  };

  if (data.targetDate) {
    bannerData.targetDate = new Date(data.targetDate);
  }

  return await homeBannerRepository.create(bannerData);
};

const getAllBanners = async (query: any) => {
  const filters: any = {};
  if (query.isActive !== undefined) {
    filters.isActive = query.isActive === 'true';
  }
  return await homeBannerRepository.getAll(filters);
};

const getSingleBanner = async (id: string) => {
  const banner = await homeBannerRepository.getById(id);
  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }
  return banner;
};

const updateHomeBanner = async (id: string, data: any, file: Express.Multer.File | undefined) => {
  const isExist = await homeBannerRepository.getById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }

  const updateData: any = { ...data };
  
  if (file) {
    updateData.image = await optimizeAndSaveImage(file, 'banners');
  }

  if (updateData.isActive !== undefined) {
    updateData.isActive = updateData.isActive === 'true' || updateData.isActive === true;
  }

  if (updateData.order !== undefined) {
    updateData.order = parseInt(updateData.order, 10);
  }

  if (data.targetDate) {
    updateData.targetDate = new Date(data.targetDate);
  }

  return await homeBannerRepository.update(id, updateData);
};

const deleteHomeBanner = async (id: string) => {
  const isExist = await homeBannerRepository.getById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }
  return await homeBannerRepository.deleteById(id);
};

export const homeBannerServices = {
  createHomeBanner,
  getAllBanners,
  getSingleBanner,
  updateHomeBanner,
  deleteHomeBanner,
};
