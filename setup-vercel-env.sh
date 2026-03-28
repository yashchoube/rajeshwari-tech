#!/bin/bash

# Vercel Environment Variables Setup Script
# This script will set all required environment variables for production

echo "🚀 Setting up Vercel Environment Variables..."

# First, login to Vercel (if not already logged in)
echo "📝 Please login to Vercel first..."
vercel login

# Database Configuration
echo "🗄️ Setting up database configuration..."
vercel env add DATABASE_URL production
vercel env add DB_POOL_MIN production
vercel env add DB_POOL_MAX production

# Admin Authentication
echo "🔐 Setting up admin authentication..."
vercel env add ADMIN_USERNAME production
vercel env add ADMIN_PASSWORD production
vercel env add ADMIN_EMAIL production

# JWT Security (Generate new secrets for production)
echo "🔒 Setting up security configuration..."
vercel env add JWT_SECRET production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production

# Application URLs
echo "🌐 Setting up application URLs..."
vercel env add NEXT_PUBLIC_BASE_URL production

# Email Configuration
echo "📧 Setting up email configuration..."
vercel env add SMTP_USER production
vercel env add SMTP_PASS production
vercel env add EMAIL_FROM_NAME production
vercel env add EMAIL_REPLY_TO production

# Rate Limiting
echo "⚡ Setting up rate limiting..."
vercel env add RATE_LIMIT_MAX_REQUESTS production
vercel env add RATE_LIMIT_WINDOW_MS production

# CORS Configuration
echo "🔗 Setting up CORS configuration..."
vercel env add ALLOWED_ORIGINS production

# Logging Configuration
echo "📊 Setting up logging configuration..."
vercel env add LOG_LEVEL production
vercel env add NODE_ENV production

# Security Configuration
echo "🛡️ Setting up security settings..."
vercel env add SESSION_TIMEOUT production
vercel env add MAX_LOGIN_ATTEMPTS production
vercel env add LOGIN_ATTEMPT_WINDOW production

# Analytics Configuration
echo "📈 Setting up analytics..."
vercel env add ANALYTICS_ENABLED production
vercel env add ANALYTICS_SAMPLE_RATE production

# Cache Configuration
echo "💾 Setting up cache configuration..."
vercel env add CACHE_TTL production
vercel env add CACHE_MAX_SIZE production

# File Upload Configuration
echo "📁 Setting up file upload configuration..."
vercel env add MAX_FILE_SIZE production
vercel env add ALLOWED_FILE_TYPES production

# Newsletter Configuration
echo "📰 Setting up newsletter configuration..."
vercel env add NEWSLETTER_BATCH_SIZE production
vercel env add NEWSLETTER_DELAY_MS production

# Admin Panel Configuration
echo "👨‍💼 Setting up admin panel configuration..."
vercel env add ADMIN_SESSION_TIMEOUT production
vercel env add ADMIN_MAX_SESSIONS production

# Development Tools (Set to false for production)
echo "🔧 Setting up development tools..."
vercel env add DEBUG_MODE production
vercel env add VERBOSE_LOGGING production

echo "✅ Environment variables setup complete!"
echo "🔄 Please redeploy your application in Vercel dashboard"
echo "🧪 Test all functionality after deployment"
