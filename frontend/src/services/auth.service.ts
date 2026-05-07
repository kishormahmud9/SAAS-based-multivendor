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

  /**
   * Verify OTP for EMAIL_VERIFY or PASSWORD_RESET.
   * Backend expects: { email, otp, purpose: 'EMAIL_VERIFY' | 'PASSWORD_RESET' }
   */
  verifyOtp: async (payload: {
    email: string;
    otp: string;
    purpose: 'EMAIL_VERIFY' | 'PASSWORD_RESET';
  }): Promise<any> => {
    return apiClient('/auth/verify-otp', {
      method: 'POST',
      body: payload,
    });
  },

  /**
   * Resend email verification OTP.
   * Backend generates a new EMAIL_VERIFY OTP and sends it to the email.
   */
  resendVerificationOtp: async (email: string): Promise<any> => {
    return apiClient('/auth/resend-otp', {
      method: 'POST',
      body: { email },
    });
  },

  /**
   * Request a password reset OTP (forgot password flow).
   */
  forgotPassword: async (email: string): Promise<any> => {
    return apiClient('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    });
  },
};

