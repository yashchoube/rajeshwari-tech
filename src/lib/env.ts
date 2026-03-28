import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Admin Security
  ADMIN_USERNAME: z.string().default('admin'),
  ADMIN_PASSWORD: z.string().default('admin123!'),
  JWT_SECRET: z.string().default('your-super-secret-jwt-key-change-this-in-production'),
  
  // Database (Optional for now as it defaults to SQLite local file)
  DATABASE_URL: z.string().url().optional(),
  
  // Email (SMTP)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform((v) => parseInt(v, 10)).optional(),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASS: z.string().optional(),
  
  // App Config
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
});

/**
 * Validates process.env and exports a type-safe env object.
 * This should be imported early in the application lifecycle.
 */
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  
  // In production, we should throw to prevent broken startup
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Invalid environment variables');
  }
}

export const env = _env.success ? _env.data : (process.env as any);
