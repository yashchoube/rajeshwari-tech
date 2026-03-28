# 🚀 RajeshwariTech Developer Database Setup Guide

## 🎯 **Quick Start Options**

### **Option 1: Connect to Neon Database (Recommended)**
Access your production database directly for real data.

### **Option 2: Local PostgreSQL with Docker**
Set up a local database for development and testing.

---

## 🔗 **Option 1: Neon Database Access**

### **Step 1: Get Your Neon Connection Details**

1. **Go to Neon Console**: https://console.neon.tech/
2. **Select your project**: `rajeshwari-tech`
3. **Go to "Connection Details"** or "Dashboard"
4. **Copy the connection string** (looks like):
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### **Step 2: DBeaver Setup**

1. **Download DBeaver**: https://dbeaver.io/download/
2. **Open DBeaver** → New Connection
3. **Select PostgreSQL**
4. **Enter connection details**:
   - **Host**: `ep-xxx-xxx.us-east-1.aws.neon.tech`
   - **Port**: `5432`
   - **Database**: `neondb`
   - **Username**: [from connection string]
   - **Password**: [from connection string]
   - **SSL Mode**: `require`

### **Step 3: Test Connection**
- Click "Test Connection"
- If successful, click "Finish"

---

## 🐳 **Option 2: Local PostgreSQL with Docker**

### **Step 1: Prerequisites**
```bash
# Install Docker (if not installed)
# macOS: brew install docker
# Ubuntu: sudo apt-get install docker.io
# Windows: Download from https://docker.com
```

### **Step 2: Start Local Database**
```bash
# Start local PostgreSQL
docker-compose -f docker-compose.local.yml up -d

# Check if running
docker ps
```

### **Step 3: Connect with DBeaver**
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `rajeshwari_tech_dev`
- **Username**: `dev_user`
- **Password**: `dev_password_123`

### **Step 4: Access pgAdmin (Optional)**
- **URL**: http://localhost:8080
- **Email**: admin@rajeshwaritech.com
- **Password**: admin123

---

## 🛠️ **Quick Setup Script**

Run this command to get started:
```bash
./dev-setup.sh
```

This will guide you through the setup process.

---

## 📊 **Database Tables You'll See**

Once connected, you'll have access to:

| Table | Description |
|-------|-------------|
| `enrollments` | Course enrollments |
| `demo_bookings` | Demo session bookings |
| `blogs` | Blog posts |
| `newsletter_subscriptions` | Newsletter subscribers |
| `analytics` | Page visit tracking |
| `referrer_data` | Referrer tracking |

---

## 🔍 **Useful SQL Queries**

### **View Recent Enrollments**
```sql
SELECT name, email, course_name, created_at 
FROM enrollments 
ORDER BY created_at DESC 
LIMIT 10;
```

### **Check Newsletter Subscribers**
```sql
SELECT email, name, interests, created_at 
FROM newsletter_subscriptions 
ORDER BY created_at DESC;
```

### **View All Tables**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

### **Check Demo Bookings**
```sql
SELECT name, email, course, status, created_at 
FROM demo_bookings 
ORDER BY created_at DESC;
```

---

## 🔧 **Environment Variables**

### **For Local Development**
Create `.env.local`:
```bash
# Option 1: Use Neon (production data)
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require

# Option 2: Use local database
DATABASE_URL=postgresql://dev_user:dev_password_123@localhost:5432/rajeshwari_tech_dev
```

### **For Production**
Your Vercel deployment already has the correct `DATABASE_URL` set.

---

## 🚀 **Development Workflow**

### **Recommended Approach**
1. **Use Neon for production data** - Real user data, enrollments, etc.
2. **Use local database for development** - Test schema changes, new features
3. **Migrate changes to Neon** when ready

### **Daily Development**
```bash
# Start local database
docker-compose -f docker-compose.local.yml up -d

# Work on your code
npm run dev

# Stop when done
docker-compose -f docker-compose.local.yml down
```

---

## 🛡️ **Security Best Practices**

1. **Never commit connection strings** to version control
2. **Use environment variables** for database credentials
3. **Use different databases** for development and production
4. **Regular backups** of important data
5. **Limit access** to production database

---

## 📞 **Troubleshooting**

### **Connection Issues**
- Check if Docker is running: `docker ps`
- Verify connection string format
- Ensure SSL is enabled for Neon
- Check firewall settings

### **Permission Issues**
- Ensure user has proper database permissions
- Check if database exists
- Verify connection string credentials

### **Performance Issues**
- Use connection pooling
- Optimize queries with indexes
- Monitor database performance

---

## 🎯 **Next Steps**

1. **Choose your setup option** (Neon or Local)
2. **Install DBeaver** for database management
3. **Run the setup script** to get started
4. **Explore the database** with the provided queries
5. **Start developing** with confidence!

---

## 📚 **Additional Resources**

- **DBeaver Documentation**: https://dbeaver.io/docs/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Docker Documentation**: https://docs.docker.com/
- **Neon Documentation**: https://neon.tech/docs

---

**Need help?** Check the `setup-local-database.md` file for more detailed instructions or contact the development team!
