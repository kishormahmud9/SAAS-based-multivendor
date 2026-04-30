import { z } from 'zod';

const createBrandZodSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Name is required',
    }).min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
    slug: z.string().optional(),
    logo: z.string().optional(),
    description: z.string().max(500, 'Description too long').optional(),
    isActive: z.preprocess((val) => {
      if (typeof val === 'string') return val === 'true';
      return val;
    }, z.boolean().optional().default(true)),
  }),
});

const updateBrandZodSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    slug: z.string().optional(),
    logo: z.string().optional(),
    description: z.string().max(500).optional(),
    isActive: z.preprocess((val) => {
      if (typeof val === 'string') return val === 'true';
      return val;
    }, z.boolean().optional()),
  }),
});

export const BrandValidation = {
  createBrandZodSchema,
  updateBrandZodSchema,
};
