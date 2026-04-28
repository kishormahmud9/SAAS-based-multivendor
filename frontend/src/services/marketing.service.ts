import { apiClient } from '../lib/api-client';

export const marketingService = {
  getBanners: async (): Promise<any> => {
    return apiClient('/marketing/banners', {
      method: 'GET',
    });
  },
  getOffers: async (): Promise<any> => {
    return apiClient('/marketing/offers', {
      method: 'GET',
    });
  },
  getUiSettings: async (): Promise<any> => {
    return apiClient('/marketing/ui-settings', {
      method: 'GET',
    });
  }
};
