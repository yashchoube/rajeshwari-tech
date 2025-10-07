# 🗄️ Database Structure - RajeshwariTech

## 📊 **Database Overview**
- **Type**: SQLite Database
- **File**: `data/rajeshwari-tech.db`
- **Tables**: 5 main tables
- **Relationships**: Independent tables with foreign key references

## 🏗️ **Table Structure**

### **1. `demo_bookings` Table**
**Purpose**: Store demo class booking requests

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique booking ID |
| `name` | TEXT | NOT NULL | Student's full name |
| `email` | TEXT | NOT NULL | Student's email address |
| `phone` | TEXT | NOT NULL | Student's phone number |
| `course` | TEXT | NOT NULL | Course name for demo |
| `experience` | TEXT | NOT NULL | Student's experience level |
| `preferred_time` | TEXT | NOT NULL | Preferred demo time |
| `message` | TEXT | NULL | Additional message from student |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Booking creation time |
| `status` | TEXT | DEFAULT 'pending' | Booking status |

**Sample Data**:
```sql
INSERT INTO demo_bookings (name, email, phone, course, experience, preferred_time, message) 
VALUES ('John Doe', 'john@example.com', '+1234567890', 'Java Programming', 'Beginner', 'Morning', 'Interested in learning Java');
```

### **2. `enrollments` Table**
**Purpose**: Store course enrollment data

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique enrollment ID |
| `name` | TEXT | NOT NULL | Student's full name |
| `email` | TEXT | NOT NULL | Student's email address |
| `phone` | TEXT | NOT NULL | Student's phone number |
| `course_id` | TEXT | NOT NULL | Course identifier |
| `course_name` | TEXT | NOT NULL | Course name |
| `experience` | TEXT | NOT NULL | Student's experience level |
| `goals` | TEXT | NULL | Student's learning goals |
| `referral` | TEXT | NULL | How student heard about us |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Enrollment creation time |
| `status` | TEXT | DEFAULT 'pending' | Enrollment status |

**Sample Data**:
```sql
INSERT INTO enrollments (name, email, phone, course_id, course_name, experience, goals, referral) 
VALUES ('Jane Smith', 'jane@example.com', '+1234567890', 'java-advanced', 'Core Java + Competitive Programming', 'Intermediate', 'Get job in tech', 'Website');
```

### **3. `blogs` Table**
**Purpose**: Store blog posts and articles

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique blog ID |
| `title` | TEXT | NOT NULL | Blog post title |
| `slug` | TEXT | UNIQUE, NOT NULL | URL-friendly identifier |
| `excerpt` | TEXT | NOT NULL | Short description |
| `content` | TEXT | NOT NULL | Full blog content (HTML) |
| `author` | TEXT | NOT NULL | Author name |
| `featured_image` | TEXT | NULL | Featured image URL |
| `category` | TEXT | NOT NULL | Blog category |
| `tags` | TEXT | NULL | Comma-separated tags |
| `status` | TEXT | DEFAULT 'published' | Publication status |
| `featured` | BOOLEAN | DEFAULT 0 | Featured post flag |
| `views` | INTEGER | DEFAULT 0 | View count |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation time |
| `updated_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update time |

**Sample Data**:
```sql
INSERT INTO blogs (title, slug, excerpt, content, author, category, tags, featured) 
VALUES ('Java Programming Tips', 'java-programming-tips-1234567890', 'Learn essential Java programming tips', '<p>Content here...</p>', 'Tech Writer', 'Programming', 'java,programming,tips', 1);
```

### **4. `analytics` Table**
**Purpose**: Track website analytics and user behavior

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique analytics ID |
| `page` | TEXT | NOT NULL | Page URL visited |
| `referrer` | TEXT | NULL | Referring website |
| `user_agent` | TEXT | NULL | Browser information |
| `visit_date` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Visit timestamp |

**Sample Data**:
```sql
INSERT INTO analytics (page, referrer, user_agent) 
VALUES ('/courses', 'https://google.com', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
```

### **5. `newsletter_subscriptions` Table**
**Purpose**: Manage newsletter subscriptions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique subscription ID |
| `email` | TEXT | UNIQUE, NOT NULL | Subscriber email |
| `name` | TEXT | NULL | Subscriber name |
| `interests` | TEXT | NOT NULL | JSON array of interests |
| `status` | TEXT | DEFAULT 'active' | Subscription status |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Subscription date |
| `last_sent` | DATETIME | NULL | Last newsletter sent |

**Sample Data**:
```sql
INSERT INTO newsletter_subscriptions (email, name, interests) 
VALUES ('subscriber@example.com', 'John Doe', '["Technology", "Programming", "Web Development"]');
```

## 🔗 **Table Relationships**

### **Independent Tables**
All tables are currently independent with no foreign key relationships. This design allows for:
- **Flexibility**: Easy to modify individual tables
- **Performance**: No complex joins required
- **Scalability**: Simple to add new features

### **Data Flow**
```
User Actions → API Endpoints → Database Functions → Tables
```

## 📈 **Data Statistics**

### **Current Data Volume** (Estimated)
- **Demo Bookings**: ~50-100 records
- **Enrollments**: ~200-500 records  
- **Blogs**: ~20-50 records
- **Analytics**: ~1000-5000 records
- **Newsletter**: ~100-300 records

### **Growth Projections**
- **Daily**: 10-20 new enrollments, 5-10 demo bookings
- **Weekly**: 2-5 new blog posts
- **Monthly**: 50-100 new newsletter subscribers

## 🛠️ **Database Functions**

### **Demo Bookings**
- `saveDemoBooking()` - Create new booking
- `getAllDemoBookings()` - Retrieve all bookings

### **Enrollments**
- `saveEnrollment()` - Create new enrollment
- `getAllEnrollments()` - Retrieve all enrollments
- `updateEnrollmentStatus()` - Update enrollment status

### **Blogs**
- `createBlog()` - Create new blog post
- `getAllBlogs()` - Get published blogs
- `getBlogBySlug()` - Get specific blog
- `getFeaturedBlogs()` - Get featured posts
- `getBlogsByCategory()` - Filter by category
- `incrementBlogViews()` - Track views
- `approveBlog()` - Approve pending blogs
- `deleteBlog()` - Remove blog post

### **Analytics**
- `trackPageVisit()` - Record page visit
- `getAnalyticsData()` - Get page statistics
- `getReferrerData()` - Get referrer statistics

### **Newsletter**
- `subscribeNewsletter()` - Add new subscription
- `getAllNewsletterSubscriptions()` - Get all subscribers
- `getNewsletterSubscriptionsByInterest()` - Filter by interest
- `unsubscribeNewsletter()` - Unsubscribe user

## 🔍 **Query Examples**

### **Get Recent Enrollments**
```sql
SELECT * FROM enrollments 
ORDER BY created_at DESC 
LIMIT 10;
```

### **Get Popular Blog Posts**
```sql
SELECT title, views, created_at 
FROM blogs 
WHERE status = 'published' 
ORDER BY views DESC 
LIMIT 5;
```

### **Get Analytics Summary**
```sql
SELECT 
  page,
  COUNT(*) as visits,
  COUNT(DISTINCT referrer) as unique_referrers
FROM analytics 
GROUP BY page 
ORDER BY visits DESC;
```

### **Get Newsletter Subscribers by Interest**
```sql
SELECT email, name, interests 
FROM newsletter_subscriptions 
WHERE interests LIKE '%"Programming"%' 
AND status = 'active';
```

## 🚀 **Performance Optimizations**

### **Indexes** (Recommended)
```sql
-- Blog performance
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_status ON blogs(status);
CREATE INDEX idx_blogs_category ON blogs(category);

-- Analytics performance  
CREATE INDEX idx_analytics_page ON analytics(page);
CREATE INDEX idx_analytics_date ON analytics(visit_date);

-- Newsletter performance
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscriptions(status);
```

### **Query Optimization**
- Use LIMIT for large result sets
- Filter by status for published content
- Use prepared statements for security
- Batch operations for analytics

## 🔒 **Security Considerations**

### **Data Protection**
- All user inputs sanitized
- Prepared statements prevent SQL injection
- Email addresses stored securely
- Personal data encrypted in transit

### **Access Control**
- Admin authentication required for sensitive operations
- API endpoints protected with authentication
- Rate limiting on data access
- Audit logging for data changes

## 📊 **Admin Dashboard Data**

### **Dashboard Metrics**
- Total enrollments count
- Pending demo bookings
- Newsletter subscriber count
- Blog post statistics
- Page visit analytics
- Referrer data

### **Data Export**
- CSV export for enrollments
- Newsletter subscriber lists
- Analytics reports
- Blog content backup

## 🎯 **Future Enhancements**

### **Planned Features**
- User accounts and profiles
- Course progress tracking
- Payment integration
- Advanced analytics
- Email campaign management
- Content management system

### **Database Scaling**
- Consider PostgreSQL for production
- Implement database replication
- Add caching layer (Redis)
- Optimize for high traffic

---

**Database is fully functional and ready for production use! 🚀**
