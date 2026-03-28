#!/bin/bash

# 🚀 RajeshwariTech Development Database Setup
# This script helps your dev team set up local database access

echo "🚀 RajeshwariTech Development Database Setup"
echo "=============================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "\n${BLUE}Choose your setup option:${NC}"
echo "1. Connect to Neon Database (Production data)"
echo "2. Set up local PostgreSQL with Docker"
echo "3. Get connection details for DBeaver"
echo "4. Test database connection"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo -e "\n${YELLOW}📡 Connecting to Neon Database...${NC}"
        echo "You'll need your Neon connection string from:"
        echo "1. Vercel Dashboard → Settings → Environment Variables"
        echo "2. Or Neon Console → Connection Details"
        echo ""
        echo "Your connection string should look like:"
        echo "postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
        echo ""
        echo "For DBeaver setup:"
        echo "- Host: ep-xxx-xxx.us-east-1.aws.neon.tech"
        echo "- Port: 5432"
        echo "- Database: neondb"
        echo "- Username: [from connection string]"
        echo "- Password: [from connection string]"
        echo "- SSL Mode: require"
        ;;
    2)
        echo -e "\n${YELLOW}🐳 Setting up local PostgreSQL with Docker...${NC}"
        
        # Check if Docker is installed
        if ! command -v docker &> /dev/null; then
            echo "❌ Docker is not installed. Please install Docker first:"
            echo "   https://docs.docker.com/get-docker/"
            exit 1
        fi
        
        # Check if docker-compose is available
        if ! command -v docker-compose &> /dev/null; then
            echo "❌ Docker Compose is not installed. Please install Docker Compose first."
            exit 1
        fi
        
        echo "Starting local PostgreSQL database..."
        docker-compose -f docker-compose.local.yml up -d
        
        echo -e "\n${GREEN}✅ Local database started!${NC}"
        echo "Connection details:"
        echo "- Host: localhost"
        echo "- Port: 5432"
        echo "- Database: rajeshwari_tech_dev"
        echo "- Username: dev_user"
        echo "- Password: dev_password_123"
        echo ""
        echo "pgAdmin is available at: http://localhost:8080"
        echo "- Email: admin@rajeshwaritech.com"
        echo "- Password: admin123"
        ;;
    3)
        echo -e "\n${YELLOW}🔧 DBeaver Connection Setup${NC}"
        echo ""
        echo "1. Download DBeaver: https://dbeaver.io/download/"
        echo "2. Open DBeaver and create new connection"
        echo "3. Select PostgreSQL"
        echo "4. Enter connection details:"
        echo ""
        echo "For Neon Database:"
        echo "- Host: [from your Neon connection string]"
        echo "- Port: 5432"
        echo "- Database: neondb"
        echo "- Username: [from connection string]"
        echo "- Password: [from connection string]"
        echo "- SSL Mode: require"
        echo ""
        echo "For Local Database:"
        echo "- Host: localhost"
        echo "- Port: 5432"
        echo "- Database: rajeshwari_tech_dev"
        echo "- Username: dev_user"
        echo "- Password: dev_password_123"
        ;;
    4)
        echo -e "\n${YELLOW}🧪 Testing database connection...${NC}"
        
        # Check if node is available
        if ! command -v node &> /dev/null; then
            echo "❌ Node.js is not installed. Please install Node.js first."
            exit 1
        fi
        
        # Check if DATABASE_URL is set
        if [ -z "$DATABASE_URL" ]; then
            echo "❌ DATABASE_URL environment variable is not set."
            echo "Please set it with your Neon connection string:"
            echo "export DATABASE_URL='postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require'"
            exit 1
        fi
        
        echo "Testing connection to: $DATABASE_URL"
        node get-neon-connection.js
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1-4."
        ;;
esac

echo -e "\n${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "Useful commands:"
echo "- View database logs: docker-compose -f docker-compose.local.yml logs"
echo "- Stop local database: docker-compose -f docker-compose.local.yml down"
echo "- Start local database: docker-compose -f docker-compose.local.yml up -d"
echo ""
echo "Need help? Check the setup-local-database.md file for detailed instructions."
