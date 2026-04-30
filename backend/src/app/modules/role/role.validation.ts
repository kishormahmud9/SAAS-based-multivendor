import { z } from 'zod';

const createRole = z.object({
  body: z.object({
    name: z.string({ message: 'Role name is required' }).min(2, 'Name must be at least 2 characters'),
    description: z.string().optional(),
    permissionIds: z.array(z.string()).optional(),
  }),
});

const updateRole = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    description: z.string().optional(),
    permissionIds: z.array(z.string()).optional(),
  }),
});

export const roleValidation = {
  createRole,
  updateRole,
};
