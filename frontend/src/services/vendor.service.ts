import { apiClient } from '../lib/api-client';

export const vendorService = {
  getStats: async (): Promise<any> => {
    return apiClient('/vendor/stats', {
      method: 'GET',
    });
  },

  getProducts: async (params?: any): Promise<any> => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/vendor/products?${query}`, {
      method: 'GET',
    });
  },

  getProduct: async (id: string): Promise<any> => {
    return apiClient(`/vendor/products/${id}`, {
      method: 'GET',
    });
  },

  createProduct: async (productData: any): Promise<any> => {
    return apiClient('/vendor/products', {
      method: 'POST',
      body: productData,
    });
  },

  updateProduct: async (id: string, productData: any): Promise<any> => {
    return apiClient(`/vendor/products/${id}`, {
      method: 'PATCH',
      body: productData,
    });
  },

  deleteProduct: async (id: string): Promise<any> => {
    return apiClient(`/vendor/products/${id}`, {
      method: 'DELETE',
    });
  },

  getOrders: async (params?: any): Promise<any> => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/vendor/orders?${query}`, {
      method: 'GET',
    });
  },

  updateOrderStatus: async (orderId: string, status: string): Promise<any> => {
    return apiClient(`/vendor/orders/${orderId}/status`, {
      method: 'PATCH',
      body: { status },
    });
  },
};
