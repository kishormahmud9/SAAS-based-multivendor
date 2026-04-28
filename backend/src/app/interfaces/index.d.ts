import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        role: string;
        name: string;
        storeId?: string | null;
      } | null;
      tenant?: {
        storeId: string | null;
      };
    }
  }
}

