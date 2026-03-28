import { NextResponse } from 'next/server';

export type ApiErrorResponse = {
  success: false;
  error: string;
  code: string;
  details?: any;
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export const apiResponse = {
  success: <T>(data: T, message?: string, status: number = 200) => {
    return NextResponse.json(
      {
        success: true,
        data,
        message,
      } as ApiSuccessResponse<T>,
      { status }
    );
  },

  error: (message: string, code: string = 'INTERNAL_ERROR', status: number = 500, details?: any) => {
    return NextResponse.json(
      {
        success: false,
        error: message,
        code,
        details,
      } as ApiErrorResponse,
      { status }
    );
  },

  validationError: (details: any) => {
    return apiResponse.error('Validation failed', 'VALIDATION_ERROR', 400, details);
  },

  notFound: (resource: string = 'Resource') => {
    return apiResponse.error(`${resource} not found`, 'NOT_FOUND', 404);
  },

  unauthorized: (message: string = 'Unauthorized access') => {
    return apiResponse.error(message, 'UNAUTHORIZED', 401);
  },

  forbidden: (message: string = 'Forbidden access') => {
    return apiResponse.error(message, 'FORBIDDEN', 403);
  },
};
