import { Response } from 'express';
import config from '../config';
import { parseTimeToMs } from './timeParser';

const isProduction = config.env === 'production';

/**
 * Standardized helper to set authentication cookies.
 * Synchronizes maxAge with JWT expiry strings (e.g., '1d', '30d').
 */
export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  const accessMaxAge = parseTimeToMs(config.jwt.access_expires_in as string);
  const refreshMaxAge = parseTimeToMs(config.jwt.refresh_expires_in as string);

  // Access Token cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: accessMaxAge || 15 * 60 * 1000, // Fallback to 15m if parsing fails
  });

  // Refresh Token cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: refreshMaxAge || 30 * 24 * 60 * 60 * 1000, // Fallback to 30d if parsing fails
  });
};

/**
 * Standardized helper to clear authentication cookies.
 */
export const clearAuthCookies = (res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
  };
  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
};

