# 🚀 Vercel Deployment Guide for RajeshwariTech

## 📋 **PRE-DEPLOYMENT CHECKLIST**

### ✅ **Step 1: Fix Critical Issues**
Before deploying, fix these critical TypeScript errors:

```bash
# Fix TypeScript errors
npm run lint --fix

# Or disable strict mode temporarily
# Add to tsconfig.json: "strict": false
```

### ✅ **Step 2: Environment Variables Setup**

#### **Required Environment Variables for Vercel:**

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables

2. **Add these variables:**

```bash
# Database (Vercel Postgres)
DATABASE_URL=postgresql://username:password@host:port/database

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123!

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Next.js Configuration
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-here

# Email Configuration (for newsletter)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### ✅ **Step 3: Database Migration**

#### **Option A: Quick Deploy (SQLite → PostgreSQL)**
1. **Set up Vercel Postgres:**
   - Go to Vercel Dashboard → Storage → Create Database
   - Choose PostgreSQL
   - Copy the connection string

2. **Run migration script:**
   ```bash
   # Install migration dependencies
   npm install pg @types/pg

   # Run migration (update DATABASE_URL first)
   node scripts/migrate-to-postgres.js
   ```

#### **Option B: Manual Migration**
1. **Export SQLite data:**
   ```bash
   sqlite3 data/rajeshwari-tech.db .dump > data/export.sql
   ```

2. **Import to PostgreSQL:**
   - Use pgAdmin or psql to import the data
   - Update your database connection in the code

### ✅ **Step 4: Deploy to Vercel**

#### **Method 1: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### **Method 2: GitHub Integration**
1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Configure environment variables
   - Deploy!

### ✅ **Step 5: Post-Deployment Configuration**

#### **1. Update Database Connection**
Replace SQLite with PostgreSQL in your code:

```typescript
// src/lib/database.ts - Update to use PostgreSQL
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
```

#### **2. Update Image Storage**
- Move uploaded images to a cloud storage (AWS S3, Cloudinary, or Vercel Blob)
- Update image URLs in your database

#### **3. Set up Custom Domain**
- Go to Vercel Dashboard → Domains
- Add your custom domain
- Update DNS settings

## 🛠️ **DEPLOYMENT COMMANDS**

### **Quick Deploy Script:**
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting Vercel deployment..."

# Fix TypeScript errors
echo "📝 Fixing TypeScript errors..."
npm run lint --fix

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
```

### **Environment Setup:**
```bash
# Install dependencies
npm install

# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## 📊 **MONITORING & ANALYTICS**

### **1. Vercel Analytics**
- Automatically enabled on Vercel
- View in Vercel Dashboard → Analytics

### **2. Error Monitoring**
- Add Sentry for error tracking
- Monitor API routes and performance

### **3. Database Monitoring**
- Use Vercel Postgres dashboard
- Monitor query performance

## 🔧 **TROUBLESHOOTING**

### **Common Issues:**

1. **Build Fails:**
   ```bash
   # Fix TypeScript errors
   npm run lint --fix
   
   # Or disable strict mode
   # Update tsconfig.json
   ```

2. **Database Connection Issues:**
   - Check DATABASE_URL format
   - Ensure SSL is configured correctly
   - Test connection locally first

3. **Image Upload Issues:**
   - Move to cloud storage
   - Update image URLs
   - Configure CORS

4. **Environment Variables:**
   - Check all required variables are set
   - Restart deployment after adding variables

## 🎯 **NEXT STEPS AFTER DEPLOYMENT**

1. **Test all functionality:**
   - Admin login
   - Blog creation
   - Form submissions
   - Image uploads

2. **Set up monitoring:**
   - Error tracking
   - Performance monitoring
   - Database monitoring

3. **Optimize performance:**
   - Image optimization
   - Caching strategies
   - CDN configuration

4. **Security:**
   - Enable HTTPS
   - Set up proper authentication
   - Regular security updates

## 📞 **SUPPORT**

If you encounter issues:
1. Check Vercel deployment logs
2. Review environment variables
3. Test database connection
4. Verify all dependencies are installed

---

**Ready to deploy? Run these commands:**

```bash
# 1. Fix TypeScript errors
npm run lint --fix

# 2. Install Vercel CLI
npm i -g vercel

# 3. Login to Vercel
vercel login

# 4. Deploy
vercel --prod
```

**Your website will be live at: `https://your-project.vercel.app`** 🎉
