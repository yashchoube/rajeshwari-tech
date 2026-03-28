# 🚀 Vercel Environment Variables - Quick Setup Guide

## **Step 1: Access Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Login to your account
3. Find your project: `rajeshwari-tech`
4. Click on the project name

## **Step 2: Navigate to Environment Variables**

1. Click on **"Settings"** tab
2. Click on **"Environment Variables"** in the left sidebar
3. You'll see a list of current environment variables

## **Step 3: Add Missing Environment Variables**

Click **"Add New"** for each variable below:

### **🔑 Critical Variables (Must Have)**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_nLDvM7ZQRlP5@ep-summer-sea-a1w8prbu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` | Database connection |
| `ADMIN_USERNAME` | `admin` | Admin login username |
| `ADMIN_PASSWORD` | `admin123!` | Admin login password |
| `ADMIN_EMAIL` | `admin@rajeshwaritech.com` | Admin email |
| `JWT_SECRET` | `rajeshwari-tech-admin-secret-key-2024-production` | JWT secret for auth |
| `NEXTAUTH_SECRET` | `nextauth-secret-production-2024` | NextAuth secret |
| `NEXTAUTH_URL` | `https://www.rajeshwaritech.com` | Production URL |
| `NEXT_PUBLIC_BASE_URL` | `https://www.rajeshwaritech.com` | Public base URL |

### **📧 Email Configuration**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `SMTP_USER` | `rajeshwaritechservice@gmail.com` | Gmail username |
| `SMTP_PASS` | `aueivyabpuykleaj` | Gmail app password |
| `EMAIL_FROM_NAME` | `RajeshwariTech` | Email sender name |
| `EMAIL_REPLY_TO` | `rajeshwaritechservice@gmail.com` | Reply-to email |

### **🔒 Security & CORS**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `ALLOWED_ORIGINS` | `https://www.rajeshwaritech.com,https://rajeshwari-tech.vercel.app` | Allowed domains |
| `NODE_ENV` | `production` | Environment mode |
| `DEBUG_MODE` | `false` | Debug mode (false for production) |
| `VERBOSE_LOGGING` | `false` | Verbose logging (false for production) |

### **⚡ Performance & Limits**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate limit window (1 minute) |
| `MAX_FILE_SIZE` | `5242880` | Max file size (5MB) |
| `ALLOWED_FILE_TYPES` | `image/jpeg,image/png,image/gif,image/webp` | Allowed file types |

### **📊 Database & Cache**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `DB_POOL_MIN` | `2` | Min database connections |
| `DB_POOL_MAX` | `10` | Max database connections |
| `CACHE_TTL` | `3600` | Cache time-to-live (1 hour) |
| `CACHE_MAX_SIZE` | `1000` | Max cache size |

### **📰 Newsletter & Admin**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `NEWSLETTER_BATCH_SIZE` | `50` | Newsletter batch size |
| `NEWSLETTER_DELAY_MS` | `1000` | Newsletter delay |
| `ADMIN_SESSION_TIMEOUT` | `86400` | Admin session timeout (24 hours) |
| `ADMIN_MAX_SESSIONS` | `5` | Max admin sessions |

### **📈 Analytics & Logging**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `LOG_LEVEL` | `info` | Log level |
| `ANALYTICS_ENABLED` | `true` | Enable analytics |
| `ANALYTICS_SAMPLE_RATE` | `1.0` | Analytics sample rate |

## **Step 4: Important Notes**

### **🔐 Security Secrets**
- **JWT_SECRET**: Generate a strong, unique secret for production
- **NEXTAUTH_SECRET**: Generate a strong, unique secret for production
- You can use: `openssl rand -base64 32` to generate random secrets

### **🌐 URLs**
- Make sure all URLs point to your production domain: `https://www.rajeshwaritech.com`
- Update CORS origins to include your domain

### **📧 Email**
- Gmail App Password: `aueivyabpuykleaj` (already generated)
- Make sure Gmail 2FA is enabled

## **Step 5: After Adding Variables**

1. **Redeploy**: Go to "Deployments" tab and click "Redeploy" on the latest deployment
2. **Test**: Wait for deployment to complete, then test:
   - Admin login: `https://www.rajeshwaritech.com/admin/login`
   - Contact form: `https://www.rajeshwaritech.com/contact`
   - Newsletter signup

## **Step 6: Verify Variables Are Set**

You can check if variables are set by looking at the Vercel dashboard - they should all show as "Production" environment.

## **🚨 Common Issues**

1. **Missing DATABASE_URL**: Contact form won't save to database
2. **Missing SMTP credentials**: Email notifications won't work
3. **Wrong CORS origins**: API calls might be blocked
4. **Missing JWT_SECRET**: Admin authentication won't work

## **✅ Quick Test Checklist**

After setting variables and redeploying:

- [ ] Admin login works: `/admin/login`
- [ ] Contact form saves to database
- [ ] Email notifications are sent
- [ ] Newsletter subscription works
- [ ] Image upload in admin panel works
- [ ] Blog creation and preview works

---

**Need Help?** If any feature doesn't work after setting these variables, check the Vercel function logs for error messages.
