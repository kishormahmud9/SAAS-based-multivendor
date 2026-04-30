import { z } from 'zod';

const getAllProducts = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    searchTerm: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
  }),
});

const createProduct = z.object({
  body: z.object({
    name: z.string({ required_error: 'Product name is required' }),
    categoryId: z.string({ required_error: 'Category is required' }),
    brandId: z.string().optional().nullable(),
    description: z.string({ required_error: 'Description is required' }),
    shortDescription: z.string().optional(),
    sku: z.string().optional(),
    productType: z.enum(['SIMPLE', 'VARIABLE']).default('SIMPLE'),
    price: z.preprocess((val) => Number(val), z.number()),
    salePrice: z.preprocess((val) => (val ? Number(val) : undefined), z.number().optional()),
    stock: z.preprocess((val) => Number(val), z.number().int()),
    isActive: z.preprocess((val) => val === 'true' || val === true, z.boolean()).optional(),
    isFeatured: z.preprocess((val) => val === 'true' || val === true, z.boolean()).optional(),
    // Nested Arrays
    attributes: z.preprocess(
      (val) => (typeof val === 'string' ? JSON.parse(val) : val),
      z.array(z.object({
        name: z.string(),
        value: z.string()
      }))
    ).optional(),
    variants: z.preprocess(
      (val) => (typeof val === 'string' ? JSON.parse(val) : val),
      z.array(z.object({
        sku: z.string(),
        name: z.string(),
        price: z.number(),
        salePrice: z.number().optional(),
        stock: z.number().int(),
        options: z.any() // JSON object { color: "Red" }
      }))
    ).optional(),
    // SEO
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.preprocess(
      (val) => (typeof val === 'string' ? JSON.parse(val) : val),
      z.array(z.string())
    ).optional(),
  })
});

const updateProduct = createProduct.partial();

export const productValidation = {
  getAllProducts,
  createProduct,
  updateProduct,
};
