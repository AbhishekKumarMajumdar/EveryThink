import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { registry } from '../swagger/registry';
import { validateRequest } from '../middleware/validate-request';
import {
  CreateProductRequestSchema,
  ProductInputSchema,
  ProductListSchema,
  ProductSchema
} from '../schemas/product.schema';
import type { z } from 'zod';

registry.registerPath({
  method: 'get',
  path: '/api/products',
  tags: ['Products'],
  responses: {
    200: {
      description: 'List of products',
      content: {
        'application/json': {
          schema: ProductListSchema
        }
      }
    }
  }
});

registry.registerPath({
  method: 'post',
  path: '/api/products',
  tags: ['Products'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ProductInputSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: 'The created product',
      content: {
        'application/json': {
          schema: ProductSchema
        }
      }
    },
    400: {
      description: 'Validation failure'
    }
  }
});

type Product = z.infer<typeof ProductSchema>;

const products: Product[] = [];

const router = Router();

router.get('/', (_req, res) => {
  res.json(products);
});

router.post('/', validateRequest(CreateProductRequestSchema), (req, res) => {
  const payload = req.body as z.infer<typeof ProductInputSchema>;

  const product: Product = {
    ...payload,
    currency: payload.currency.toUpperCase(),
    id: randomUUID(),
    createdAt: new Date().toISOString()
  };

  products.push(product);

  res.status(201).json(product);
});

export const productsRouter = router;
