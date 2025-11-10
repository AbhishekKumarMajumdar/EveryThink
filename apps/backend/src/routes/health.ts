import { Router } from 'express';
import { formatIsoDate } from '@ecommerce/utils';
import { registry } from '../swagger/registry';

registry.registerPath({
  method: 'get',
  path: '/api/health',
  tags: ['System'],
  responses: {
    200: {
      description: 'Healthcheck response',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: { type: 'string', example: 'ok' },
              timestamp: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
  }
});

const router = Router();

router.get('/', (_req, res) => {
  res.json({ status: 'ok', timestamp: formatIsoDate(new Date()) });
});

export const healthRouter = router;
