import { z } from 'zod';

const register = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    email: z.string({ message: 'Email is required' }).email('Invalid email'),
    password: z
      .string({ message: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
    role: z.enum(['CUSTOMER', 'VENDOR']).optional(),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string({ message: 'Email is required' }).email('Invalid email'),
    password: z.string({ message: 'Password is required' }),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({ message: 'Refresh token is required' }),
  }),
});

const forgotPassword = z.object({
  body: z.object({
    email: z.string({ message: 'Email is required' }).email('Invalid email'),
  }),
});

const verifyOtp = z.object({
  body: z.object({
    email: z.string({ message: 'Email is required' }).email('Invalid email'),
    otp: z.string({ message: 'OTP is required' }),
    purpose: z.enum(['EMAIL_VERIFY', 'PASSWORD_RESET']),
  }),
});

const resetPassword = z.object({
  body: z.object({
    email: z.string({ message: 'Email is required' }).email('Invalid email'),
    newPassword: z
      .string({ message: 'New password is required' })
      .min(6, 'Password must be at least 6 characters'),
    resetToken: z.string({ message: 'Reset token is required' }),
  }),
});

const changePassword = z.object({
  body: z.object({
    oldPassword: z.string({ message: 'Old password is required' }),
    newPassword: z.string({ message: 'New password is required' }),
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
