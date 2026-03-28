# 🗄️ Local Database Setup for Dev Team

## Option 1: Connect to Neon Database (Recommended)

### 1. Get Neon Connection String
1. Go to your [Neon Console](https://console.neon.tech/)
2. Select your project: `rajeshwari-tech`
3. Go to "Connection Details" or "Dashboard"
4. Copy the connection string (it looks like):
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### 2. DBeaver Setup
1. **Download DBeaver**: https://dbeaver.io/download/
2. **Open DBeaver** and create new connection
3. **Select PostgreSQL** as database type
4. **Enter connection details**:
   - **Host**: `ep-xxx-xxx.us-east-1.aws.neon.tech` (from your connection string)
   - **Port**: `5432`
   - **Database**: `neondb` (or your database name)
   - **Username**: Your Neon username
   - **Password**: Your Neon password
   - **SSL Mode**: `require`

### 3. Test Connection
- Click "Test Connection" to verify
- If successful, click "Finish" to save

## Option 2: Local PostgreSQL with Docker

### 1. Create Docker Compose File
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    container_name: rajeshwari-tech-local
    environment:
      POSTGRES_DB: rajeshwari_tech_dev
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_password_123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### 2. Start Local Database
```bash
docker-compose up -d
```

### 3. Connect with DBeaver
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `rajeshwari_tech_dev`
- **Username**: `dev_user`
- **Password**: `dev_password_123`

## Option 3: Hybrid Approach (Best for Development)

### 1. Use Neon for Production Data
- Connect to Neon database for real data
- Use for testing with actual user data

### 2. Use Local Database for Development
- Create local PostgreSQL for development
- Test schema changes locally first
- Migrate to Neon when ready

## 🔧 Environment Variables Setup

### For Local Development
Create `.env.local`:
```bash
# Local Database (if using local PostgreSQL)
DATABASE_URL=postgresql://dev_user:dev_password_123@localhost:5432/rajeshwari_tech_dev

# Or use Neon directly
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 📊 Database Tables You'll See

Once connected, you'll see these tables:
- `enrollments` - Course enrollments
- `demo_bookings` - Demo session bookings  
- `blogs` - Blog posts
- `newsletter_subscriptions` - Newsletter subscribers
- `analytics` - Page visit tracking
- `referrer_data` - Referrer tracking

## 🚀 Quick Start Commands

### Connect to Neon:
```bash
# Install psql if not installed
brew install postgresql  # macOS
# or
sudo apt-get install postgresql-client  # Ubuntu

# Connect using connection string
psql "postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### Local Docker Setup:
```bash
# Start local database
docker-compose up -d

# Connect to local database
psql -h localhost -U dev_user -d rajeshwari_tech_dev
```

## 🔍 Useful DBeaver Queries

### View All Tables:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Check Recent Enrollments:
```sql
SELECT * FROM enrollments 
ORDER BY created_at DESC 
LIMIT 10;
```

### Check Newsletter Subscribers:
```sql
SELECT email, name, interests, created_at 
FROM newsletter_subscriptions 
ORDER BY created_at DESC;
```

## 🛡️ Security Notes

1. **Never commit connection strings** to version control
2. **Use environment variables** for database credentials
3. **Use different databases** for development and production
4. **Regular backups** of important data

## 📞 Support

If you need help with:
- DBeaver connection issues
- Database schema questions
- Migration from local to Neon
- Performance optimization

Just let me know!
