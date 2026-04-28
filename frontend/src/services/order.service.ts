import { apiClient } from '../lib/api-client';

export const orderService = {
  getOrders: async (): Promise<any> => {
    return apiClient('/orders', {
      method: 'GET',
    });
  },

  getOrderDetails: async (orderId: string): Promise<any> => {
    return apiClient(`/orders/${orderId}`, {
      method: 'GET',
    });
  },

  placeOrder: async (orderData: any): Promise<any> => {
    return apiClient('/orders', {
      method: 'POST',
      body: orderData,
    });
  },

  cancelOrder: async (orderId: string, reason: string): Promise<any> => {
    return apiClient(`/orders/${orderId}/cancel`, {
      method: 'POST',
      body: { reason },
    });
  },
};
