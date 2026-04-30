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
        /**
         * Cached permission keys loaded by requireAuth.
         * e.g. ['products:view', 'orders:create']
         * SUPER_ADMIN will have ['*'] meaning all-access bypass.
         */
        permissions: string[];
      } | null;
      tenant?: {
        storeId: string | null;
      };
    }
  }
}
