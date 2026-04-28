import { apiClient } from '../lib/api-client';
import { IAuthResponse } from '../types/auth';

export const authService = {
  login: async (credentials: any): Promise<IAuthResponse> => {
    return apiClient('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },

  register: async (userData: any): Promise<IAuthResponse> => {
    return apiClient('/auth/register', {
      method: 'POST',
      body: userData,
    });
  },

  logout: async () => {
    return apiClient('/auth/logout', {
      method: 'POST',
    });
  },

  getMe: async (): Promise<IAuthResponse> => {
    return apiClient('/auth/me', {
      method: 'GET',
    });
  },
};
