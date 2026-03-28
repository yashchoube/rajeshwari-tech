import { z } from 'zod';

const emptyToUndefined = (v: unknown) =>
  v === '' || v === undefined || v === null ? undefined : v;

/** Many dashboards store host-only values; URL() requires a scheme. */
function normalizeWebUrl(val: unknown): unknown {
  const v = emptyToUndefined(val);
  if (v === undefined) return undefined;
  const s = String(v).trim();
  if (!s) return undefined;
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s.replace(/^\/+/, '')}`;
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  ADMIN_USERNAME: z.preprocess(
    (v) => (String(v ?? '').trim() === '' ? undefined : v),
    z.string().default('admin')
  ),
  ADMIN_PASSWORD: z.preprocess(
    (v) => (String(v ?? '').trim() === '' ? undefined : v),
    z.string().default('admin123!')
  ),
  JWT_SECRET: z.preprocess(
    (v) => (String(v ?? '').trim() === '' ? undefined : v),
    z.string().default('your-super-secret-jwt-key-change-this-in-production')
  ),

  /** Prefer validating at connection time; connection strings vary by provider. */
  DATABASE_URL: z.preprocess(
    (v) => (emptyToUndefined(v) === undefined ? undefined : String(v).trim()),
    z.string().min(1).optional()
  ),

  NEXTAUTH_URL: z.preprocess(normalizeWebUrl, z.string().url().optional()),
  NEXTAUTH_SECRET: z.preprocess(emptyToUndefined, z.string().optional()),

  SMTP_HOST: z.preprocess(emptyToUndefined, z.string().optional()),
  SMTP_PORT: z.preprocess(
    (v) => (emptyToUndefined(v) === undefined ? undefined : String(v).trim()),
    z
      .string()
      .optional()
      .transform((v) => {
        if (v === undefined || v === '') return undefined;
        const n = parseInt(v, 10);
        return Number.isFinite(n) ? n : undefined;
      })
  ),
  SMTP_USER: z.preprocess(emptyToUndefined, z.string().optional()),
  SMTP_PASS: z.preprocess(emptyToUndefined, z.string().optional()),

  NEXT_PUBLIC_APP_URL: z.preprocess(
    (v) => {
      const n = normalizeWebUrl(v);
      if (n === undefined) return 'http://localhost:3000';
      return n;
    },
    z.string().url()
  ),

  ADMIN_COOKIE_DOMAIN: z.preprocess(emptyToUndefined, z.string().optional()),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('❌ Invalid environment variables:', JSON.stringify(_env.error.format(), null, 2));
  } else {
    console.warn(
      '⚠️ Environment variable validation had issues; using raw process.env for missing optional fields.',
      _env.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    );
  }
}

export const env = _env.success ? _env.data : (process.env as unknown as z.infer<typeof envSchema>);
