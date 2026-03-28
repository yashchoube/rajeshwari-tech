#!/bin/bash

# Vercel Environment Variables Setup using npx
echo "🚀 Setting up Vercel Environment Variables using npx..."
echo ""

# Check if user is logged in to Vercel
if ! npx vercel whoami > /dev/null 2>&1; then
    echo "❌ Please login to Vercel first:"
    npx vercel login
fi

echo "✅ Logged in to Vercel as: $(npx vercel whoami)"
echo ""

# Function to set environment variable
set_env_var() {
    local var_name=$1
    local var_value=$2
    
    echo "Setting $var_name..."
    echo "$var_value" | npx vercel env add "$var_name" production
    if [ $? -eq 0 ]; then
        echo "✅ $var_name set successfully"
    else
        echo "❌ Failed to set $var_name"
    fi
    echo ""
}

echo "🔧 Setting up environment variables for production..."
echo ""

# Database Configuration
echo "🗄️ Setting up database configuration..."
set_env_var "DATABASE_URL" "postgresql://neondb_owner:npg_nLDvM7ZQRlP5@ep-summer-sea-a1w8prbu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
set_env_var "DB_POOL_MIN" "2"
set_env_var "DB_POOL_MAX" "10"

# Admin Authentication
echo "🔐 Setting up admin authentication..."
set_env_var "ADMIN_USERNAME" "admin"
set_env_var "ADMIN_PASSWORD" "admin123!"
set_env_var "ADMIN_EMAIL" "admin@rajeshwaritech.com"

# Security Configuration
echo "🔒 Setting up security configuration..."
set_env_var "JWT_SECRET" "rajeshwari-tech-admin-secret-key-2024-production-$(date +%s)"
set_env_var "NEXTAUTH_SECRET" "nextauth-secret-$(date +%s)"
set_env_var "NEXTAUTH_URL" "https://rajeshwari-tech.vercel.app"

# Application URLs
echo "🌐 Setting up application URLs..."
set_env_var "NEXT_PUBLIC_BASE_URL" "https://rajeshwari-tech.vercel.app"

# Email Configuration
echo "📧 Setting up email configuration..."
set_env_var "SMTP_USER" "rajeshwaritechservice@gmail.com"
set_env_var "SMTP_PASS" "aueivyabpuykleaj"
set_env_var "EMAIL_FROM_NAME" "RajeshwariTech"
set_env_var "EMAIL_REPLY_TO" "rajeshwaritechservice@gmail.com"

# Rate Limiting
echo "⚡ Setting up rate limiting..."
set_env_var "RATE_LIMIT_MAX_REQUESTS" "100"
set_env_var "RATE_LIMIT_WINDOW_MS" "60000"

# CORS Configuration
echo "🔗 Setting up CORS configuration..."
set_env_var "ALLOWED_ORIGINS" "https://rajeshwari-tech.vercel.app,https://www.rajeshwaritech.com"

# Logging Configuration
echo "📊 Setting up logging configuration..."
set_env_var "LOG_LEVEL" "info"
set_env_var "NODE_ENV" "production"

# Security Settings
echo "🛡️ Setting up security settings..."
set_env_var "SESSION_TIMEOUT" "86400"
set_env_var "MAX_LOGIN_ATTEMPTS" "5"
set_env_var "LOGIN_ATTEMPT_WINDOW" "900000"

# Analytics
echo "📈 Setting up analytics..."
set_env_var "ANALYTICS_ENABLED" "true"
set_env_var "ANALYTICS_SAMPLE_RATE" "1.0"

# Cache
echo "💾 Setting up cache configuration..."
set_env_var "CACHE_TTL" "3600"
set_env_var "CACHE_MAX_SIZE" "1000"

# File Upload
echo "📁 Setting up file upload configuration..."
set_env_var "MAX_FILE_SIZE" "5242880"
set_env_var "ALLOWED_FILE_TYPES" "image/jpeg,image/png,image/gif,image/webp"

# Newsletter
echo "📰 Setting up newsletter configuration..."
set_env_var "NEWSLETTER_BATCH_SIZE" "50"
set_env_var "NEWSLETTER_DELAY_MS" "1000"

# Admin Panel
echo "👨‍💼 Setting up admin panel configuration..."
set_env_var "ADMIN_SESSION_TIMEOUT" "86400"
set_env_var "ADMIN_MAX_SESSIONS" "5"

# Development Tools (Production = false)
echo "🔧 Setting up development tools..."
set_env_var "DEBUG_MODE" "false"
set_env_var "VERBOSE_LOGGING" "false"

echo ""
echo "🎉 Environment variables setup complete!"
echo ""
echo "🔄 Next steps:"
echo "1. Vercel will automatically redeploy your project"
echo "2. Test all functionality after deployment"
echo "3. Verify admin login works"
echo "4. Test contact form and email notifications"
echo "5. Test image upload functionality"
echo ""
echo "📋 You can also check your environment variables in:"
echo "   Vercel Dashboard → Your Project → Settings → Environment Variables"
