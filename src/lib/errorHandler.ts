// Enterprise-grade error handling

import { NextResponse } from 'next/server';
import { logger } from './logger';
import { createResponse } from './response';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, any>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 400, true, context);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, context?: Record<string, any>) {
    super(`${resource} not found`, 404, true, context);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', context?: Record<string, any>) {
    super(message, 401, true, context);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', context?: Record<string, any>) {
    super(message, 403, true, context);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 409, true, context);
  }
}

export const handleApiError = (error: unknown, requestId?: string): NextResponse => {
  // Log the error
  logger.error('API Error occurred', {
    requestId,
    error: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    context: error instanceof AppError ? error.context : undefined
  });

  // Handle known error types
  if (error instanceof AppError) {
    const response = createResponse().error(error.message, error.context ? [JSON.stringify(error.context)] : undefined);
    return NextResponse.json(response, { status: error.statusCode });
  }

  // Handle validation errors
  if (error instanceof Error && error.name === 'ValidationError') {
    const response = createResponse().validationError([error.message]);
    return NextResponse.json(response, { status: 400 });
  }

  // Handle database errors
  if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
    const response = createResponse().error('Resource already exists', ['A resource with this identifier already exists']);
    return NextResponse.json(response, { status: 409 });
  }

  // Handle generic errors
  const response = createResponse().internalError('An unexpected error occurred');
  return NextResponse.json(response, { status: 500 });
};

export const asyncHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
