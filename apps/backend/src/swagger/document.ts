import type { OpenAPIObject } from 'openapi3-ts/oas30';
import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { registry } from './registry';

export const generateOpenApiDocument = (): OpenAPIObject => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.3',
    info: {
      version: '0.1.0',
      title: 'Ecommerce Platform API',
      description: 'API documentation for the ecommerce backend service.'
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local development server'
      }
    ]
  });
};
