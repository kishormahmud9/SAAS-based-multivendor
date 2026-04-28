import { brandRepository } from './brand.repository';

const getAllBrands = async () => {
  return await brandRepository.getAll();
};

export const brandServices = {
  getAllBrands,
};
