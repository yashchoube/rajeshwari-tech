import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { apiResponse } from './api-utils';

export type ApiHandler = (request: NextRequest, ...args: any[]) => Promise<Response>;

/**
 * Higher-Order Function for API routes to handle errors consistently
 */
export const withApiHandler = (handler: ApiHandler) => {
  return async (request: NextRequest, ...args: any[]) => {
    try {
      return await handler(request, ...args);
    } catch (error) {
      console.error('[API Error]:', error);

      if (error instanceof ZodError) {
        return apiResponse.validationError(
          error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code,
          }))
        );
      }

      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      return apiResponse.error(message, 'INTERNAL_SERVER_ERROR', 500);
    }
  };
};
