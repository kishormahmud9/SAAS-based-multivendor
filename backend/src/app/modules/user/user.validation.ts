import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }).min(2, 'Name must be at least 2 characters'),
    email: z.string({ message: 'Email is required' }).email('Invalid email address'),
    password: z.string({ message: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
    roleId: z.string({ message: 'Role ID is required' }),
    systemRole: z.enum(['SUPER_ADMIN', 'ADMIN', 'VENDOR', 'CUSTOMER', 'VENDOR_STAFF']).optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional(),
    dateOfBirth: z.string().optional().nullable(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION']).optional(),
    avatar: z.string().optional(),
    emailVerified: z.any().optional(), 
    phoneVerified: z.any().optional(),
    addresses: z.preprocess((val) => {
      if (typeof val === 'string') {
        try { return JSON.parse(val); } catch (e) { return val; }
      }
      return val;
    }, z.array(z.any()).optional()),
  }),
});

const updateUser = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email address').optional(),
    phone: z.string().optional(),
    roleId: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION']).optional(),
    systemRole: z.enum(['SUPER_ADMIN', 'ADMIN', 'VENDOR', 'CUSTOMER', 'VENDOR_STAFF']).optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional(),
    dateOfBirth: z.string().optional().nullable(),
    avatar: z.string().optional(),
    emailVerified: z.any().optional(), 
    phoneVerified: z.any().optional(),
    addresses: z.preprocess((val) => {
      if (typeof val === 'string') {
        try { return JSON.parse(val); } catch (e) { return val; }
      }
      return val;
    }, z.array(z.any()).optional()),
  }),
});

export const userValidation = {
  createUser,
  updateUser,
};
