import { apiClient } from '../lib/api-client';
import { IProductResponse, IProduct } from '../types/product';

export const productService = {
  getProducts: async (params: string = ''): Promise<IProductResponse> => {
    return apiClient(`/products${params ? `?${params}` : ''}`, {
      method: 'GET',
    });
  },

  getProductBySlug: async (slug: string): Promise<{ success: boolean; data: IProduct }> => {
    return apiClient(`/products/${slug}`, {
      method: 'GET',
    });
  },

  getCategories: async (params: string = ''): Promise<any> => {
    return apiClient(`/categories${params ? `?${params}` : ''}`, {
      method: 'GET',
    });
  },

  getAllCategories: async (): Promise<any> => {
    return apiClient('/categories/get-all', {
      method: 'GET',
    });
  },

  getBrands: async (): Promise<any> => {
    return apiClient('/brands', {
      method: 'GET',
    });
  },

  getReviews: async (productId: string): Promise<any> => {
    return apiClient(`/products/${productId}/reviews`, {
      method: 'GET',
    });
  },

  submitReview: async (productId: string, reviewData: any): Promise<any> => {
    return apiClient(`/products/${productId}/reviews`, {
      method: 'POST',
      body: reviewData,
    });
  },
};

