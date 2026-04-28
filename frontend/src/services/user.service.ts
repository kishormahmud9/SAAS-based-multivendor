import { apiClient } from '../lib/api-client';

export const userService = {
  getAddresses: async (): Promise<any> => {
    return apiClient('/user/addresses', {
      method: 'GET',
    });
  },

  addAddress: async (addressData: any): Promise<any> => {
    return apiClient('/user/addresses', {
      method: 'POST',
      body: addressData,
    });
  },

  updateAddress: async (id: string, addressData: any): Promise<any> => {
    return apiClient(`/user/addresses/${id}`, {
      method: 'PATCH',
      body: addressData,
    });
  },

  deleteAddress: async (id: string): Promise<any> => {
    return apiClient(`/user/addresses/${id}`, {
      method: 'DELETE',
    });
  },

  getProfile: async (): Promise<any> => {
    return apiClient('/user/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (data: any): Promise<any> => {
    return apiClient('/user/profile', {
      method: 'PATCH',
      body: data,
    });
  },

  changePassword: async (data: any): Promise<any> => {
    return apiClient('/user/profile/password', {
      method: 'PATCH',
      body: data,
    });
  },
};
