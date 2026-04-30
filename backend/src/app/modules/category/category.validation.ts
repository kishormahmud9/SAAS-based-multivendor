import { z } from 'zod';

const createCategory = z.object({
  body: z.object({
    name: z.string({
      message: 'Name is required',
    }),
    slug: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url('Invalid image URL').optional().or(z.literal('')),
    parentId: z.preprocess((val) => (val === "" ? null : val), z.string().optional().nullable()),
    sortOrder: z.coerce.number().int().default(0),
    isActive: z.preprocess((val) => val === 'true' || val === true, z.boolean()).default(true),
    metaTitle: z.string().max(70, 'Meta title too long').optional(),
    metaDesc: z.string().max(160, 'Meta description too long').optional(),
  }),
});

const updateCategory = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url('Invalid image URL').optional().or(z.literal('')),
    parentId: z.preprocess((val) => (val === "" ? null : val), z.string().optional().nullable()),
    sortOrder: z.coerce.number().int().optional(),
    isActive: z.preprocess((val) => val === 'true' || val === true, z.boolean()).optional(),
    metaTitle: z.string().max(70, 'Meta title too long').optional(),
    metaDesc: z.string().max(160, 'Meta description too long').optional(),
  }),
});

const bulkStatusUpdate = z.object({
  body: z.object({
    ids: z.array(z.string()),
    isActive: z.boolean(),
  }),
});

const bulkDelete = z.object({
  body: z.object({
    ids: z.array(z.string()),
  }),
});

const updateSortOrder = z.object({
  body: z.object({
    items: z.array(
      z.object({
        id: z.string(),
        sortOrder: z.number().int(),
      })
    ),
  }),
});

export const categoryValidation = {
  createCategory,
  updateCategory,
  bulkStatusUpdate,
  bulkDelete,
  updateSortOrder,
};
