import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  DATABASE_URL: z.string().describe('PostgreSQL connection string'),
  JWT_ACCESS_TOKEN: z.string().describe('JWT Access Token Secret'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('1d'),
  JWT_REFRESH_TOKEN: z.string().describe('JWT Refresh Token Secret'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
  BCRYPT_SALT_ROUNDS: z.string().default('12'),
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.string().optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
  FRONTEND_URL: z.string().optional(),
});

const envVars = envVarsSchema.safeParse(process.env);

if (!envVars.success) {
  throw new Error(`Config validation error: ${envVars.error.message}`);
}

const config = envVars.data;

export default {
  env: config.NODE_ENV,
  port: config.PORT,
  database_url: config.DATABASE_URL,
  jwt: {
    access_secret: config.JWT_ACCESS_TOKEN,
    access_expires_in: config.JWT_ACCESS_EXPIRES_IN,
    refresh_secret: config.JWT_REFRESH_TOKEN,
    refresh_expires_in: config.JWT_REFRESH_EXPIRES_IN,
  },
  bcrypt_salt_rounds: config.BCRYPT_SALT_ROUNDS,
  email: {
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    user: config.EMAIL_USER,
    from: config.EMAIL_FROM,
    password: config.EMAIL_PASSWORD,
  },
  frontend_url: config.FRONTEND_URL,
};
