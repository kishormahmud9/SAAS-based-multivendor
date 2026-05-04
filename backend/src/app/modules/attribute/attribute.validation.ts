import { z } from 'zod';
import { AttributeType } from '@prisma/client';

const attributeValueSchema = z.object({
  id: z.string().optional(),
  value: z.string().min(1, "Value is required").trim(),
  slug: z.string().optional(),
  sortOrder: z.coerce.number().int().optional().default(0),
});

const createAttributeZodSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Name is required',
    }).min(2, 'Name must be at least 2 characters').max(50, 'Name too long').trim(),
    slug: z.string().optional(),
    description: z.string().max(500, 'Description too long').optional(),
    type: z.nativeEnum(AttributeType).default(AttributeType.SELECT),
    isActive: z.preprocess((val) => {
      if (typeof val === 'string') return val === 'true';
      return val;
    }, z.boolean().optional().default(true)),
    values: z.array(attributeValueSchema).min(1, "At least one value is required"),
  }),
});

const updateAttributeZodSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).trim().optional(),
    slug: z.string().optional(),
    description: z.string().max(500).optional(),
    type: z.nativeEnum(AttributeType).optional(),
    isActive: z.preprocess((val) => {
      if (typeof val === 'string') return val === 'true';
      return val;
    }, z.boolean().optional()),
    values: z.array(attributeValueSchema).optional(),
  }),
});

export const AttributeValidation = {
  createAttributeZodSchema,
  updateAttributeZodSchema,
};
