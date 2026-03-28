import { z } from 'zod';

const emptyToUndefined = (v: unknown) => (v === '' || v === undefined ? undefined : v);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  ADMIN_USERNAME: z.string().default('admin'),
  ADMIN_PASSWORD: z.string().default('admin123!'),
  JWT_SECRET: z.string().default('your-super-secret-jwt-key-change-this-in-production'),

  DATABASE_URL: z.preprocess(
    emptyToUndefined,
    z.string().url().optional()
  ),

  NEXTAUTH_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
  NEXTAUTH_SECRET: z.preprocess(emptyToUndefined, z.string().optional()),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined)),
  SMTP_USER: z.preprocess(emptyToUndefined, z.string().optional()),
  SMTP_PASS: z.string().optional(),

  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),

  /** Set only for a fixed custom domain (e.g. .rajeshwaritech.com). Leave unset for *.vercel.app and localhost. */
  ADMIN_COOKIE_DOMAIN: z.preprocess(emptyToUndefined, z.string().optional()),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(_env.error.format(), null, 2));
  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '⚠️ WARNING: Running in production with invalid environment variables. This may cause runtime errors.'
    );
  }
}

export const env = _env.success ? _env.data : (process.env as unknown as z.infer<typeof envSchema>);
