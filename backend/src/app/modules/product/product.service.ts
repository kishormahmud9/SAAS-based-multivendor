import { IPaginationOptions } from '../../interfaces/pagination';
import { productRepository } from './product.repository';

const getAllProducts = async (filters: any, options: IPaginationOptions) => {
  return await productRepository.findAll(filters, options);
};

const getProductBySlug = async (slug: string) => {
  return await productRepository.findBySlug(slug);
};

export const productServices = {
  getAllProducts,
  getProductBySlug,
};
