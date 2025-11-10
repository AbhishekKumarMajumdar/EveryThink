import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodEffects } from 'zod';

export type RequestSchema = AnyZodObject | ZodEffects<AnyZodObject>;

export const validateRequest = (schema: RequestSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params
    });

    if (!result.success) {
      const issues = result.error.issues.map((issue) => ({
        path: issue.path.join('.') || 'root',
        message: issue.message
      }));

      res.status(400).json({
        message: 'Validation failed',
        issues
      });
      return;
    }

    if (result.data.body) {
      req.body = result.data.body;
    }

    if (result.data.query) {
      req.query = result.data.query;
    }

    if (result.data.params) {
      req.params = result.data.params;
    }

    next();
  };
