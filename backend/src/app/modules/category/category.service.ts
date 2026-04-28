import { categoryRepository } from './category.repository';

const getAllCategories = async () => {
  return await categoryRepository.getAll();
};

export const categoryServices = {
  getAllCategories,
};
