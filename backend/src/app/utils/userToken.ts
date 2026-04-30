import config from "../config";
import { generateToken, TJwtPayload } from "./jwt";


export const createUserToken = (payload: Partial<TJwtPayload>) => {
  const data: TJwtPayload = {
    id: payload.id!,
    email: payload.email!,
    name: payload.name!,
    role: payload.role!,
  };

  const accessToken = generateToken(
    data,
    config.jwt.access_secret as string,
    config.jwt.access_expires_in as string,
  );
  const refreshToken = generateToken(
    data,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};
