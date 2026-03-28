# Vercel Environment Variables Setup

## Required Environment Variables for Production

You need to set these environment variables in your Vercel dashboard:

### 1. Database Configuration
```
DATABASE_URL=postgresql://neondb_owner:npg_nLDvM7ZQRlP5@ep-summer-sea-a1w8prbu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 2. Admin Authentication
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123!
ADMIN_EMAIL=admin@rajeshwaritech.com
```

### 3. JWT Security (IMPORTANT: Change for production)
```
JWT_SECRET=rajeshwari-tech-admin-secret-key-2024-production
```

### 4. NextAuth Configuration
```
NEXTAUTH_URL=https://rajeshwari-tech.vercel.app
NEXTAUTH_SECRET=your-production-nextauth-secret-key
```

### 5. Application URLs
```
NEXT_PUBLIC_BASE_URL=https://rajeshwari-tech.vercel.app
```

### 6. Email Configuration (Gmail SMTP)
```
SMTP_USER=rajeshwaritechservice@gmail.com
SMTP_PASS=aueivyabpuykleaj
```

### 7. Rate Limiting Configuration
```
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=60000
```

### 8. CORS Configuration
```
ALLOWED_ORIGINS=https://rajeshwari-tech.vercel.app,https://www.rajeshwaritech.com
```

### 9. Database Pool Configuration
```
DB_POOL_MIN=2
DB_POOL_MAX=10
```

### 10. Logging Configuration
```
LOG_LEVEL=info
NODE_ENV=production
```

### 11. Security Configuration
```
SESSION_TIMEOUT=86400
MAX_LOGIN_ATTEMPTS=5
LOGIN_ATTEMPT_WINDOW=900000
```

### 12. Email Templates
```
EMAIL_FROM_NAME=RajeshwariTech
EMAIL_REPLY_TO=rajeshwaritechservice@gmail.com
```

### 13. Analytics Configuration
```
ANALYTICS_ENABLED=true
ANALYTICS_SAMPLE_RATE=1.0
```

### 14. Cache Configuration
```
CACHE_TTL=3600
CACHE_MAX_SIZE=1000
```

### 15. File Upload Configuration
```
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp
```

### 16. Newsletter Configuration
```
NEWSLETTER_BATCH_SIZE=50
NEWSLETTER_DELAY_MS=1000
```

### 17. Admin Panel Configuration
```
ADMIN_SESSION_TIMEOUT=86400
ADMIN_MAX_SESSIONS=5
```

### 18. Development Tools (Set to false for production)
```
DEBUG_MODE=false
VERBOSE_LOGGING=false
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project: `rajeshwari-tech`
3. Go to Settings → Environment Variables
4. Add each variable above with its value
5. Make sure to set the environment to "Production" for all variables
6. Click "Save" after adding each variable

## Important Notes

- **JWT_SECRET**: Generate a new, strong secret for production
- **NEXTAUTH_SECRET**: Generate a new, strong secret for production
- **NEXTAUTH_URL**: Update to your production domain
- **NEXT_PUBLIC_BASE_URL**: Update to your production domain
- **ALLOWED_ORIGINS**: Update to your production domains
- **NODE_ENV**: Set to "production"
- **DEBUG_MODE**: Set to "false" for production
- **VERBOSE_LOGGING**: Set to "false" for production

## After Setting Environment Variables

1. Redeploy your application in Vercel
2. Test all functionality in production
3. Verify admin login works
4. Test image upload functionality
5. Test contact form and newsletter subscription
