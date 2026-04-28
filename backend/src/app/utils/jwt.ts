import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export type TJwtPayload = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export const generateToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn: string,
): string => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
