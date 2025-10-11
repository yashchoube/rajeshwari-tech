import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP } from './rateLimit';
import { Validator } from './validation';

export interface SecurityConfig {
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
  requireAuth?: boolean;
  allowedOrigins?: string[];
}

export function createSecureAPI(config: SecurityConfig = {}) {
  return function secureAPIMiddleware(
    handler: (request: NextRequest) => Promise<NextResponse>
  ) {
    return async function securedHandler(request: NextRequest): Promise<NextResponse> {
      try {
        // 1. CORS Protection
        if (config.allowedOrigins) {
          const origin = request.headers.get('origin');
          if (origin && !config.allowedOrigins.includes(origin)) {
            return NextResponse.json(
              { error: 'CORS policy violation' },
              { status: 403 }
            );
          }
        }

        // 2. Rate Limiting
        if (config.rateLimit) {
          const clientIP = getClientIP(request);
          const rateLimitResult = rateLimit(
            clientIP,
            config.rateLimit.maxRequests,
            config.rateLimit.windowMs
          );

          if (!rateLimitResult.allowed) {
            return NextResponse.json(
              {
                error: 'Too many requests',
                retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
              },
              {
                status: 429,
                headers: {
                  'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
                }
              }
            );
          }
        }

        // 3. Authentication Check
        if (config.requireAuth) {
          const { AuthService } = await import('./auth');
          const user = await AuthService.getCurrentUser(request);
          
          if (!user) {
            return NextResponse.json(
              { error: 'Authentication required' },
              { status: 401 }
            );
          }
        }

        // 4. Input Sanitization (skip for FormData requests like file uploads)
        if ((request.method === 'POST' || request.method === 'PUT') && 
            !request.headers.get('content-type')?.includes('multipart/form-data')) {
          try {
            const body = await request.json();
            const sanitizedBody = sanitizeRequestBody(body);
            
            // Create new request with sanitized body
            const sanitizedRequest = new NextRequest(request.url, {
              method: request.method,
              headers: request.headers,
              body: JSON.stringify(sanitizedBody)
            });
            
            return handler(sanitizedRequest);
          } catch (error) {
            // If JSON parsing fails, continue with original request
            console.log('Skipping JSON sanitization for non-JSON request');
          }
        }

        return handler(request);

      } catch (error) {
        console.error('Security middleware error:', error);
        return NextResponse.json(
          { error: 'Security validation failed' },
          { status: 400 }
        );
      }
    };
  };
}

function sanitizeRequestBody(body: any): any {
  if (!body || typeof body !== 'object') return body;

  const sanitized: any = {};
  const validator = new Validator();

  for (const [key, value] of Object.entries(body)) {
    if (typeof value === 'string') {
      sanitized[key] = validator.sanitizeInput(key, value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

// Common security configurations
export const SECURITY_CONFIGS = {
  // For public forms (enrollment, demo booking, newsletter)
  PUBLIC_FORM: {
    rateLimit: {
      maxRequests: 200, // 200 requests per minute (generous for normal users)
      windowMs: 60 * 1000 // 1 minute window
    },
    allowedOrigins: [
      'https://www.rajeshwaritech.com', // Your custom domain
      'https://rajeshwari-tech.vercel.app',
      'https://rajeshwari-tech-*.vercel.app', // Allow all Vercel preview URLs
      'http://localhost:3000'
    ]
  },

  // For admin APIs
  ADMIN_API: {
    rateLimit: {
      maxRequests: 500, // 500 requests per minute (admin needs higher limits)
      windowMs: 60 * 1000 // 1 minute window
    },
    allowedOrigins: [
      'https://www.rajeshwaritech.com', // Your custom domain
      'https://rajeshwari-tech.vercel.app',
      'http://localhost:3000'
    ],
    requireAuth: true
  },

  // For blog APIs
  BLOG_API: {
    rateLimit: {
      maxRequests: 300, // 300 requests per minute (blog reading needs higher limits)
      windowMs: 60 * 1000 // 1 minute window
    },
    allowedOrigins: [
      'https://www.rajeshwaritech.com', // Your custom domain
      'https://rajeshwari-tech.vercel.app',
      'http://localhost:3000'
    ]
  },

  // For admin-only APIs (highest security)
  ADMIN_ONLY: {
    rateLimit: {
      maxRequests: 100, // 100 requests per minute (strict limit for admin)
      windowMs: 60 * 1000 // 1 minute window
    },
    allowedOrigins: [
      'https://www.rajeshwaritech.com', // Your custom domain
      'https://rajeshwari-tech.vercel.app',
      'http://localhost:3000'
    ],
    requireAuth: true
  }
};
