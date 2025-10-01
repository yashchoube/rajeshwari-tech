// Enterprise-grade API response utilities

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: string[];
  message?: string;
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

export class ApiResponseBuilder<T = any> {
  private response: ApiResponse<T> = {
    success: false,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: this.generateRequestId(),
      version: '1.0.0'
    }
  };

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  success(data?: T, message?: string): ApiResponse<T> {
    this.response.success = true;
    this.response.data = data;
    this.response.message = message;
    return { ...this.response };
  }

  error(error: string, errors?: string[]): ApiResponse<T> {
    this.response.success = false;
    this.response.error = error;
    this.response.errors = errors;
    return { ...this.response };
  }

  validationError(errors: string[]): ApiResponse<T> {
    this.response.success = false;
    this.response.error = 'Validation failed';
    this.response.errors = errors;
    return { ...this.response };
  }

  notFound(resource: string): ApiResponse<T> {
    this.response.success = false;
    this.response.error = `${resource} not found`;
    return { ...this.response };
  }

  unauthorized(message: string = 'Unauthorized'): ApiResponse<T> {
    this.response.success = false;
    this.response.error = message;
    return { ...this.response };
  }

  forbidden(message: string = 'Forbidden'): ApiResponse<T> {
    this.response.success = false;
    this.response.error = message;
    return { ...this.response };
  }

  internalError(message: string = 'Internal server error'): ApiResponse<T> {
    this.response.success = false;
    this.response.error = message;
    return { ...this.response };
  }
}

export const createResponse = <T = any>(): ApiResponseBuilder<T> => {
  return new ApiResponseBuilder<T>();
};
