import bcrypt from 'bcrypt';
import crypto from 'crypto';
import httpStatus from 'http-status';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { generateToken, verifyToken } from '../../utils/jwt';
import { sendEmail } from '../../utils/sendEmail';
import { logger } from '../../../shared/logger';
import { authRepository } from './auth.repository';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const buildJwtPayload = (user: any) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.systemRole,
});

const generateTokenPair = (user: any) => {
  const payload = buildJwtPayload(user);
  const accessToken = generateToken(
    payload,
    config.jwt.access_secret as string,
    config.jwt.access_expires_in as string,
  );
  const refreshToken = generateToken(
    payload,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string,
  );
  return { accessToken, refreshToken };
};

const safeUser = (user: any) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.systemRole,
  status: user.status,
  emailVerified: user.emailVerified,
  avatar: user.avatar,
  lastLoginAt: user.lastLoginAt,
});

// ─── Register ─────────────────────────────────────────────────────────────────

const register = async (payload: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) => {
  const exists = await authRepository.findUserByEmail(payload.email);
  if (exists) {
    throw new ApiError(httpStatus.CONFLICT, 'An account with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  const user = await authRepository.createUser({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    phone: payload.phone,
    // systemRole defaults to CUSTOMER in schema
  });

  // Generate & store OTP for email verification
  const otp = crypto.randomInt(100000, 999999).toString();
  await authRepository.deleteOtps(user.email, 'EMAIL_VERIFY');
  await authRepository.createOtp({
    target: user.email,
    otp,
    purpose: 'EMAIL_VERIFY',
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
  });

  // Fire-and-forget email
  sendEmail({
    to: user.email,
    subject: 'Verify Your Email – ReadyMart',
    tempName: 'otp',
    tempData: { name: user.name, otp, purpose: 'Email Verification' },
  });

  logger.info(`New user registered: ${user.email}`);

  return safeUser(user);
};

// ─── Login ────────────────────────────────────────────────────────────────────

const login = async (
  payload: { email: string; password: string },
  meta: { ip?: string; userAgent?: string },
) => {
  const user = await authRepository.findUserByEmail(payload.email);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Account lockout check
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      `Account locked until ${user.lockedUntil.toLocaleString()}. Too many failed attempts.`,
    );
  }

  if (user.status === 'BLOCKED') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account has been blocked. Contact support.');
  }

  // Password verification
  const isMatch = await bcrypt.compare(payload.password, user.password as string);

  if (!isMatch) {
    const failedAttempts = user.failedLoginAttempts + 1;
    const shouldLock = failedAttempts >= 5;
    const lockedUntil = shouldLock ? new Date(Date.now() + 30 * 60 * 1000) : null;

    await authRepository.updateUser(user.id, {
      failedLoginAttempts: failedAttempts,
      lockedUntil,
    });

    if (shouldLock) {
      logger.warn(
        `[SUSPICIOUS LOGIN] Account locked after 5 failed attempts — email: ${user.email}, ip: ${meta.ip}`,
      );
    }

    const remaining = 5 - failedAttempts;
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      shouldLock
        ? 'Account locked for 30 minutes after 5 failed attempts'
        : `Invalid credentials. ${remaining > 0 ? `${remaining} attempt(s) remaining before lockout.` : ''}`,
    );
  }

  // Reset on success & update login metadata
  await authRepository.updateUser(user.id, {
    failedLoginAttempts: 0,
    lockedUntil: null,
    lastLoginAt: new Date(),
    lastLoginIp: meta.ip,
  });

  // Log suspicious login from new IP
  if (user.lastLoginIp && user.lastLoginIp !== meta.ip) {
    logger.warn(
      `[SUSPICIOUS LOGIN] New IP detected — email: ${user.email}, prev: ${user.lastLoginIp}, current: ${meta.ip}`,
    );
  }

  logger.info(`User logged in: ${user.email} from ${meta.ip}`);

  const { accessToken, refreshToken } = generateTokenPair(user);

  return { accessToken, refreshToken, user: safeUser(user) };
};

// ─── Refresh Token ────────────────────────────────────────────────────────────

const refreshAccessToken = async (token: string) => {
  let decoded: any;
  try {
    decoded = verifyToken(token, config.jwt.refresh_secret as string);
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired refresh token');
  }

  const user = await authRepository.findUserByEmail(decoded.email);
  if (!user || user.isDeleted || user.status === 'BLOCKED') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
  }

  const accessToken = generateToken(
    buildJwtPayload(user),
    config.jwt.access_secret as string,
    config.jwt.access_expires_in as string,
  );

  return { accessToken };
};

// ─── /me — Session Check ──────────────────────────────────────────────────────

const getMe = async (userId: string) => {
  const user = await authRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return safeUser(user);
};

// ─── Forgot Password ──────────────────────────────────────────────────────────

const forgotPassword = async (email: string) => {
  // Always return 200 to prevent email enumeration attacks
  const user = await authRepository.findUserByEmail(email);
  if (!user) return; // silent fail

  const otp = crypto.randomInt(100000, 999999).toString();
  await authRepository.deleteOtps(email, 'PASSWORD_RESET');
  await authRepository.createOtp({
    target: email,
    otp,
    purpose: 'PASSWORD_RESET',
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
  });

  sendEmail({
    to: email,
    subject: 'Reset Your Password – ReadyMart',
    tempName: 'otp',
    tempData: { name: user.name, otp, purpose: 'Password Reset' },
  });
};

// ─── Verify OTP ───────────────────────────────────────────────────────────────

const verifyOtp = async (payload: {
  email: string;
  otp: string;
  purpose: 'EMAIL_VERIFY' | 'PASSWORD_RESET';
}) => {
  const { email, otp, purpose } = payload;

  const record = await authRepository.findRecentOtp(email, purpose);

  if (!record || record.otp !== otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid OTP');
  }

  if (record.expiresAt < new Date()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'OTP has expired. Please request a new one.');
  }

  // Mark OTP as used
  await authRepository.verifyOtp(record.id);

  if (purpose === 'EMAIL_VERIFY') {
    const user = await authRepository.findUserByEmail(email);
    if (user && !user.emailVerified) {
      await authRepository.updateUser(user.id, {
        status: 'ACTIVE',
        emailVerified: new Date(),
      });
      logger.info(`Email verified for: ${email}`);
    }
    return { message: 'Email verified successfully' };
  }

  if (purpose === 'PASSWORD_RESET') {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Issue short-lived password reset token (one-time use intent)
    const resetToken = generateToken(
      buildJwtPayload(user),
      config.jwt.access_secret as string,
      '15m',
    );

    // Store token in DB for one-time use verification
    await authRepository.createVerificationToken({
      email,
      token: resetToken,
      type: 'PASSWORD_RESET',
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
    });

    return { resetToken };
  }
};

// ─── Reset Password ───────────────────────────────────────────────────────────

const resetPassword = async (payload: {
  email: string;
  newPassword: string;
  resetToken: string;
}) => {
  const { email, newPassword, resetToken } = payload;

  // 1. Verify reset token integrity (JWT)
  try {
    const decoded = verifyToken(resetToken, config.jwt.access_secret as string);
    if (decoded.email !== email) {
      throw new Error('Token email mismatch');
    }
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired reset token');
  }

  // 2. Verify one-time use from DB
  const tokenRecord = await authRepository.findVerificationToken(
    resetToken,
    'PASSWORD_RESET',
  );

  if (!tokenRecord) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Reset token has already been used or is invalid',
    );
  }

  if (tokenRecord.expiresAt < new Date()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Reset token has expired');
  }

  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));

  await authRepository.updateUser(user.id, {
    password: hashedPassword,
    passwordChangedAt: new Date(), // invalidates all existing sessions
  });

  // 3. Mark token as used
  await authRepository.useVerificationToken(tokenRecord.id);

  // Clean up OTPs
  await authRepository.deleteOtps(email, 'PASSWORD_RESET');

  logger.info(`Password reset for: ${email}`);
};

// ─── Change Password (Authenticated) ─────────────────────────────────────────

const changePassword = async (
  userId: string,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await authRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isMatch = await bcrypt.compare(payload.oldPassword, user.password as string);
  if (!isMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Old password is incorrect');
  }

  const hashed = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

  await authRepository.updateUser(user.id, {
    password: hashed,
    passwordChangedAt: new Date(), // force all other sessions to re-authenticate
  });

  logger.info(`Password changed for: ${user.email}`);
};

export const authServices = {
  register,
  login,
  refreshAccessToken,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword,
  changePassword,
};
