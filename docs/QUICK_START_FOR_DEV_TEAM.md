# 🚀 Quick Start Guide for Dev Team

## 🎯 **IMMEDIATE NEXT STEPS**

### **Step 1: Get Your Neon Database Connection Details**

**Option A: From Vercel Dashboard**
1. Go to: https://vercel.com/dashboard
2. Select your project: `rajeshwari-tech`
3. Go to **Settings** → **Environment Variables**
4. Copy the `DATABASE_URL` value

**Option B: From Neon Console**
1. Go to: https://console.neon.tech/
2. Select your project: `rajeshwari-tech`
3. Go to **Connection Details** or **Dashboard**
4. Copy the connection string

### **Step 2: Install DBeaver**
1. Download: https://dbeaver.io/download/
2. Install DBeaver Community Edition (Free)

### **Step 3: Connect to Database**

**Your connection string looks like:**
```
postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**In DBeaver, enter:**
- **Host**: `ep-xxx-xxx.us-east-1.aws.neon.tech`
- **Port**: `5432`
- **Database**: `neondb`
- **Username**: [from connection string]
- **Password**: [from connection string]
- **SSL Mode**: `require`

---

## 🗄️ **DATABASE TABLES YOU'LL SEE**

| Table | Description | Sample Data |
|-------|-------------|-------------|
| `enrollments` | Course enrollments | 4 records |
| `demo_bookings` | Demo session bookings | 3 records |
| `blogs` | Blog posts | 2 records |
| `newsletter_subscriptions` | Newsletter subscribers | 2 records |
| `analytics` | Page visit tracking | Multiple records |
| `referrer_data` | Referrer tracking | Multiple records |

---

## 🔍 **USEFUL QUERIES TO START WITH**

### **View Recent Enrollments**
```sql
SELECT name, email, course_name, experience, created_at 
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

### **View Demo Bookings**
```sql
SELECT name, email, course, status, created_at 
FROM demo_bookings 
ORDER BY created_at DESC;
```

### **Check Blog Posts**
```sql
SELECT title, author, category, status, created_at 
FROM blogs 
ORDER BY created_at DESC;
```

---

## 🛠️ **ALTERNATIVE: LOCAL DEVELOPMENT**

If you want to work with a local database:

```bash
# Start local PostgreSQL
docker-compose -f docker-compose.local.yml up -d

# Connect to local database in DBeaver:
# Host: localhost
# Port: 5432
# Database: rajeshwari_tech_dev
# Username: dev_user
# Password: dev_password_123
```

---

## 📊 **CURRENT DATA STATUS**

Your production database currently has:
- ✅ **4 Course Enrollments** (including real user data)
- ✅ **3 Demo Bookings** (including real user data)
- ✅ **2 Newsletter Subscribers** (including real user data)
- ✅ **2 Blog Posts** (published content)
- ✅ **Analytics Data** (page visit tracking)

---

## 🎯 **WHAT YOU CAN DO NOW**

1. **View Real User Data** - See actual enrollments and bookings
2. **Analyze User Behavior** - Check analytics and referrer data
3. **Manage Content** - View and edit blog posts
4. **Track Subscribers** - See newsletter subscription data
5. **Test New Features** - Use local database for development

---

## 🚀 **QUICK COMMANDS**

```bash
# Get connection details
./get-vercel-env.sh

# Start local development database
docker-compose -f docker-compose.local.yml up -d

# Stop local database
docker-compose -f docker-compose.local.yml down

# View database logs
docker-compose -f docker-compose.local.yml logs
```

---

## 📞 **NEED HELP?**

1. **Check the detailed guide**: `DEVELOPER_SETUP_GUIDE.md`
2. **Run the setup script**: `./dev-setup.sh`
3. **View database schema**: `init-db.sql`

---

## 🎉 **YOU'RE READY TO GO!**

Your database is fully functional with:
- ✅ Real user data
- ✅ Newsletter subscriptions working
- ✅ Course enrollments active
- ✅ Blog content published
- ✅ Analytics tracking

**Start exploring your data with DBeaver!** 🚀
