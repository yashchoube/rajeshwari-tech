#!/bin/bash

# Interactive Vercel Environment Variables Setup
echo "🚀 Interactive Vercel Environment Variables Setup"
echo "================================================="
echo ""

# Check if user is logged in to Vercel
if ! vercel whoami > /dev/null 2>&1; then
    echo "❌ Please login to Vercel first:"
    vercel login
fi

echo "✅ Logged in to Vercel as: $(vercel whoami)"
echo ""

# Function to set environment variable
set_env_var() {
    local var_name=$1
    local var_description=$2
    local default_value=$3
    
    echo "📝 $var_description"
    if [ -n "$default_value" ]; then
        echo "   Default: $default_value"
        read -p "   Enter value (press Enter for default): " value
        if [ -z "$value" ]; then
            value="$default_value"
        fi
    else
        read -p "   Enter value: " value
    fi
    
    echo "   Setting $var_name..."
    echo "$value" | vercel env add "$var_name" production
    echo "   ✅ $var_name set successfully"
    echo ""
}

echo "🔧 Setting up environment variables for production..."
echo ""

# Database Configuration
echo "🗄️ DATABASE CONFIGURATION"
echo "------------------------"
set_env_var "DATABASE_URL" "Database connection string" "postgresql://neondb_owner:npg_nLDvM7ZQRlP5@ep-summer-sea-a1w8prbu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
set_env_var "DB_POOL_MIN" "Database pool minimum connections" "2"
set_env_var "DB_POOL_MAX" "Database pool maximum connections" "10"

# Admin Authentication
echo "🔐 ADMIN AUTHENTICATION"
echo "----------------------"
set_env_var "ADMIN_USERNAME" "Admin username" "admin"
set_env_var "ADMIN_PASSWORD" "Admin password" "admin123!"
set_env_var "ADMIN_EMAIL" "Admin email" "admin@rajeshwaritech.com"

# Security Configuration
echo "🔒 SECURITY CONFIGURATION"
echo "------------------------"
echo "⚠️  IMPORTANT: Generate strong, unique secrets for production!"
set_env_var "JWT_SECRET" "JWT secret key (generate a strong one)" "rajeshwari-tech-admin-secret-key-2024-production-$(date +%s)"
set_env_var "NEXTAUTH_SECRET" "NextAuth secret key (generate a strong one)" "nextauth-secret-$(date +%s)"
set_env_var "NEXTAUTH_URL" "NextAuth URL" "https://rajeshwari-tech.vercel.app"

# Application URLs
echo "🌐 APPLICATION URLS"
echo "------------------"
set_env_var "NEXT_PUBLIC_BASE_URL" "Public base URL" "https://rajeshwari-tech.vercel.app"

# Email Configuration
echo "📧 EMAIL CONFIGURATION"
echo "---------------------"
set_env_var "SMTP_USER" "SMTP username" "rajeshwaritechservice@gmail.com"
set_env_var "SMTP_PASS" "SMTP password" "aueivyabpuykleaj"
set_env_var "EMAIL_FROM_NAME" "Email from name" "RajeshwariTech"
set_env_var "EMAIL_REPLY_TO" "Email reply-to address" "rajeshwaritechservice@gmail.com"

# Rate Limiting
echo "⚡ RATE LIMITING"
echo "---------------"
set_env_var "RATE_LIMIT_MAX_REQUESTS" "Max requests per window" "100"
set_env_var "RATE_LIMIT_WINDOW_MS" "Rate limit window (ms)" "60000"

# CORS Configuration
echo "🔗 CORS CONFIGURATION"
echo "--------------------"
set_env_var "ALLOWED_ORIGINS" "Allowed origins (comma-separated)" "https://rajeshwari-tech.vercel.app,https://www.rajeshwaritech.com"

# Logging and Environment
echo "📊 LOGGING & ENVIRONMENT"
echo "------------------------"
set_env_var "LOG_LEVEL" "Log level" "info"
set_env_var "NODE_ENV" "Node environment" "production"

# Security Settings
echo "🛡️ SECURITY SETTINGS"
echo "-------------------"
set_env_var "SESSION_TIMEOUT" "Session timeout (seconds)" "86400"
set_env_var "MAX_LOGIN_ATTEMPTS" "Max login attempts" "5"
set_env_var "LOGIN_ATTEMPT_WINDOW" "Login attempt window (ms)" "900000"

# Analytics
echo "📈 ANALYTICS"
echo "-----------"
set_env_var "ANALYTICS_ENABLED" "Enable analytics" "true"
set_env_var "ANALYTICS_SAMPLE_RATE" "Analytics sample rate" "1.0"

# Cache
echo "💾 CACHE CONFIGURATION"
echo "---------------------"
set_env_var "CACHE_TTL" "Cache TTL (seconds)" "3600"
set_env_var "CACHE_MAX_SIZE" "Cache max size" "1000"

# File Upload
echo "📁 FILE UPLOAD"
echo "-------------"
set_env_var "MAX_FILE_SIZE" "Max file size (bytes)" "5242880"
set_env_var "ALLOWED_FILE_TYPES" "Allowed file types" "image/jpeg,image/png,image/gif,image/webp"

# Newsletter
echo "📰 NEWSLETTER"
echo "------------"
set_env_var "NEWSLETTER_BATCH_SIZE" "Newsletter batch size" "50"
set_env_var "NEWSLETTER_DELAY_MS" "Newsletter delay (ms)" "1000"

# Admin Panel
echo "👨‍💼 ADMIN PANEL"
echo "-------------"
set_env_var "ADMIN_SESSION_TIMEOUT" "Admin session timeout (seconds)" "86400"
set_env_var "ADMIN_MAX_SESSIONS" "Max admin sessions" "5"

# Development Tools (Production = false)
echo "🔧 DEVELOPMENT TOOLS"
echo "-------------------"
set_env_var "DEBUG_MODE" "Debug mode (false for production)" "false"
set_env_var "VERBOSE_LOGGING" "Verbose logging (false for production)" "false"

echo ""
echo "🎉 Environment variables setup complete!"
echo ""
echo "🔄 Next steps:"
echo "1. Go to Vercel dashboard and redeploy your project"
echo "2. Test all functionality after deployment"
echo "3. Verify admin login works"
echo "4. Test contact form and email notifications"
echo "5. Test image upload functionality"
echo ""
echo "📋 You can also check your environment variables in:"
echo "   Vercel Dashboard → Your Project → Settings → Environment Variables"
