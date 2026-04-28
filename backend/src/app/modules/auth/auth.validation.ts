import { z } from 'zod';

const register = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
    role: z.enum(['CUSTOMER', 'VENDOR']).optional(),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

const forgotPassword = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
  }),
});

const verifyOtp = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    otp: z.string({ required_error: 'OTP is required' }),
    purpose: z.enum(['EMAIL_VERIFY', 'PASSWORD_RESET']),
  }),
});

const resetPassword = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(6, 'Password must be at least 6 characters'),
    resetToken: z.string({ required_error: 'Reset token is required' }),
  }),
});

const changePassword = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'New password is required' }),
  }),
});

export const authValidation = {
  register,
  login,
  refreshToken,
  forgotPassword,
  verifyOtp,
  resetPassword,
  changePassword,
};
