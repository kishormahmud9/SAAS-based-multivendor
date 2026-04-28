import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { setAuthCookies, clearAuthCookies } from '../../utils/cookieHelper';
import { authServices } from './auth.service';

// ─── POST /api/v1/auth/register ───────────────────────────────────────────────
const register = catchAsync(async (req, res) => {
  const result = await authServices.register(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Registration successful! Please check your email for the verification OTP.',
    data: result,
  });
});

// ─── POST /api/v1/auth/login ──────────────────────────────────────────────────
const login = catchAsync(async (req, res) => {
  const meta = {
    ip: req.ip || req.headers['x-forwarded-for']?.toString(),
    userAgent: req.headers['user-agent'],
  };

  const { accessToken, refreshToken, user } = await authServices.login(req.body, meta);

  // Set HTTP-only cookies
  setAuthCookies(res, accessToken, refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      user,
      accessToken, // also returned in body for mobile/SPA clients
    },
  });
});

// ─── POST /api/v1/auth/logout ─────────────────────────────────────────────────
const logout = catchAsync(async (req, res) => {
  clearAuthCookies(res);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged out successfully',
    data: null,
  });
});

// ─── POST /api/v1/auth/refresh-token ─────────────────────────────────────────
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;

  const { accessToken } = await authServices.refreshAccessToken(token);

  // Issue a fresh access-token cookie using standard helper
  // Since we only have the new accessToken, we pass the existing refreshToken to keep it in sync
  setAuthCookies(res, accessToken, token);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token refreshed',
    data: { accessToken },
  });
});

// ─── GET /api/v1/auth/me ──────────────────────────────────────────────────────
const getMe = catchAsync(async (req, res) => {
  const user = await authServices.getMe(req.user!.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Session valid',
    data: user,
  });
});

// ─── POST /api/v1/auth/forgot-password ───────────────────────────────────────
const forgotPassword = catchAsync(async (req, res) => {
  await authServices.forgotPassword(req.body.email);

  // Always respond 200 to prevent email enumeration
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'If this email is registered, a password reset OTP has been sent.',
    data: null,
  });
});

// ─── POST /api/v1/auth/verify-otp ────────────────────────────────────────────
const verifyOtp = catchAsync(async (req, res) => {
  const result = await authServices.verifyOtp(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OTP verified successfully',
    data: result, // contains resetToken if purpose === PASSWORD_RESET
  });
});

// ─── POST /api/v1/auth/reset-password ────────────────────────────────────────
const resetPassword = catchAsync(async (req, res) => {
  await authServices.resetPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully. Please log in with your new password.',
    data: null,
  });
});

// ─── PATCH /api/v1/auth/change-password ──────────────────────────────────────
const changePassword = catchAsync(async (req, res) => {
  await authServices.changePassword(req.user!.id as string, req.body);

  // Invalidate cookies — user must re-login
  clearAuthCookies(res);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully. Please log in again.',
    data: null,
  });
});

export const authControllers = {
  register,
  login,
  logout,
  refreshToken,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword,
  changePassword,
};
