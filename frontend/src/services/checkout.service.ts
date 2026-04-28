import { apiClient } from '../lib/api-client';

export const checkoutService = {
  validateCoupon: async (code: string): Promise<any> => {
    return apiClient(`/coupons/validate?code=${code}`, {
      method: 'GET',
    });
  },

  getShippingMethods: async (): Promise<any> => {
    return apiClient('/shipping/methods', {
      method: 'GET',
    });
  },

  getTaxRates: async (addressId: string): Promise<any> => {
    return apiClient(`/shipping/tax-rates?addressId=${addressId}`, {
      method: 'GET',
    });
  },
};
