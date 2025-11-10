import { registry } from '../swagger/registry';
import { z } from 'zod';

export const ProductInputSchema = registry.register(
  'ProductInput',
  z
    .object({
      name: z
        .string()
        .min(3, 'Name must be at least 3 characters long.')
        .max(120, 'Name must be 120 characters or fewer.')
        .openapi({ example: 'Acme Wireless Headphones' }),
      price: z
        .number({ invalid_type_error: 'Price must be a number.' })
        .positive('Price must be greater than 0.')
        .finite()
        .openapi({ example: 199.99 }),
      currency: z
        .string()
        .length(3, 'Currency must be a 3 character ISO code.')
        .regex(/^[A-Za-z]{3}$/)
        .transform((value) => value.toUpperCase())
        .openapi({ example: 'USD' }),
      description: z
        .string()
        .max(1024, 'Description must be 1024 characters or fewer.')
        .optional()
        .openapi({ example: 'Premium noise-cancelling headphones with 30h battery life.' }),
      sku: z
        .string()
        .min(3)
        .max(64)
        .optional()
        .openapi({ example: 'ACME-HDPH-001' })
    })
    .strict()
);

export const ProductSchema = registry.register(
  'Product',
  ProductInputSchema.extend({
    id: z.string().uuid().openapi({ example: '1f8be2e4-3c3b-4a47-92c1-3d67b8a4fb40' }),
    createdAt: z.string().datetime().openapi({ example: '2025-11-10T17:00:00.000Z' })
  })
);

export const ProductListSchema = registry.register(
  'ProductList',
  z.array(ProductSchema).openapi({ description: 'Collection of products.' })
);

export const CreateProductRequestSchema = z.object({
  body: ProductInputSchema
});
