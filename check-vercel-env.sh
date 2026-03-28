#!/bin/bash

echo "🔍 Checking Vercel Environment Variables..."
echo "=========================================="
echo ""

# Check if user is logged in to Vercel
if ! npx vercel whoami > /dev/null 2>&1; then
    echo "❌ Please login to Vercel first:"
    npx vercel login
    echo ""
fi

echo "✅ Logged in to Vercel as: $(npx vercel whoami)"
echo ""

# List current environment variables
echo "📋 Current Environment Variables:"
echo "================================="
npx vercel env ls

echo ""
echo "🔍 Checking Critical Variables:"
echo "==============================="

# Check critical variables
critical_vars=(
    "DATABASE_URL"
    "ADMIN_USERNAME"
    "ADMIN_PASSWORD"
    "JWT_SECRET"
    "NEXTAUTH_SECRET"
    "SMTP_USER"
    "SMTP_PASS"
    "NEXT_PUBLIC_BASE_URL"
    "NODE_ENV"
)

for var in "${critical_vars[@]}"; do
    if npx vercel env ls | grep -q "$var"; then
        echo "✅ $var - Set"
    else
        echo "❌ $var - Missing"
    fi
done

echo ""
echo "📝 Next Steps:"
echo "=============="
echo "1. If any variables are missing, add them using the Vercel dashboard"
echo "2. Or use the VERCEL_ENV_QUICK_SETUP.md guide"
echo "3. After adding variables, redeploy your project"
echo "4. Test the functionality"
