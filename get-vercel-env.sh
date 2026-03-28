#!/bin/bash

# 🔍 Get Vercel Environment Variables
# This script helps you get your DATABASE_URL from Vercel

echo "🔍 Getting Vercel Environment Variables..."
echo "=========================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "Install it with: npm install -g vercel"
    echo "Or visit: https://vercel.com/cli"
    exit 1
fi

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel."
    echo "Please run: vercel login"
    exit 1
fi

echo "✅ Vercel CLI is installed and you're logged in."
echo ""

echo "📋 Getting environment variables from Vercel..."
echo ""

# Get environment variables
echo "🔗 Your DATABASE_URL from Vercel:"
vercel env ls --scope=production 2>/dev/null | grep DATABASE_URL || echo "DATABASE_URL not found in production environment"

echo ""
echo "📊 All environment variables:"
vercel env ls --scope=production 2>/dev/null || echo "Could not fetch environment variables"

echo ""
echo "💡 To get your Neon connection details:"
echo "1. Go to Vercel Dashboard: https://vercel.com/dashboard"
echo "2. Select your project: rajeshwari-tech"
echo "3. Go to Settings → Environment Variables"
echo "4. Copy the DATABASE_URL value"
echo ""
echo "Or visit Neon Console: https://console.neon.tech/"
echo "Select your project and go to 'Connection Details'"
