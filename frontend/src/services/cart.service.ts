import { apiClient } from '../lib/api-client';

export const cartService = {
  getCart: async (): Promise<any> => {
    return apiClient('/cart', {
      method: 'GET',
    });
  },

  addToCart: async (productId: string, quantity: number, variantId?: string): Promise<any> => {
    return apiClient('/cart', {
      method: 'POST',
      body: { productId, quantity, variantId },
    });
  },

  updateQuantity: async (itemId: string, quantity: number): Promise<any> => {
    return apiClient(`/cart/${itemId}`, {
      method: 'PATCH',
      body: { quantity },
    });
  },

  removeFromCart: async (itemId: string): Promise<any> => {
    return apiClient(`/cart/${itemId}`, {
      method: 'DELETE',
    });
  },

  syncCart: async (localItems: any[]): Promise<any> => {
    return apiClient('/cart/sync', {
      method: 'POST',
      body: { items: localItems },
    });
  },
};
