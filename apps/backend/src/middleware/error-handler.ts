import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/app-error';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Validation failed',
      issues: error.issues.map((issue) => ({
        path: issue.path.join('.') || 'root',
        message: issue.message
      }))
    });
    return;
  }

  if (isDuplicateKeyError(error)) {
    const duplicateField = Object.keys(error.keyValue ?? {})[0];

    res.status(409).json({
      message: duplicateField ? `${duplicateField} already exists` : 'Duplicate value conflict'
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.expose ? error.message : 'Unexpected error'
    });
    return;
  }

  if (error instanceof Error) {
    // eslint-disable-next-line no-console
    console.error('[UnhandledError]', error);
  } else {
    // eslint-disable-next-line no-console
    console.error('[UnknownError]', error);
  }

  res.status(500).json({
    message: 'Unexpected error'
  });
};

type DuplicateKeyError = {
  code?: number;
  keyValue?: Record<string, unknown>;
};

function isDuplicateKeyError(error: unknown): error is DuplicateKeyError {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  if (!('code' in error)) {
    return false;
  }

  const code = Number((error as { code?: number | string }).code);

  return Number.isInteger(code) && code === 11000;
}

