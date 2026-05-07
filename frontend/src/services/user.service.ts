import { apiClient } from '../lib/api-client';

export const userService = {
  getAddresses: async (): Promise<any> => {
    return apiClient('/users/addresses', {
      method: 'GET',
    });
  },

  addAddress: async (addressData: any): Promise<any> => {
    return apiClient('/users/addresses', {
      method: 'POST',
      body: addressData,
    });
  },

  updateAddress: async (id: string, addressData: any): Promise<any> => {
    return apiClient(`/users/addresses/${id}`, {
      method: 'PATCH',
      body: addressData,
    });
  },

  deleteAddress: async (id: string): Promise<any> => {
    return apiClient(`/users/addresses/${id}`, {
      method: 'DELETE',
    });
  },

  getProfile: async (): Promise<any> => {
    return apiClient('/users/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (data: any): Promise<any> => {
    return apiClient('/users/profile', {
      method: 'PATCH',
      body: data,
    });
  },

  changePassword: async (data: any): Promise<any> => {
    return apiClient('/users/profile/password', {
      method: 'PATCH',
      body: data,
    });
  },
};
