import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dbPath = path.join(dataDir, 'rajeshwari-tech.db');
const db = new Database(dbPath);

const slugifyTitle = (title: string) => {
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // replace spaces with -
      .replace(/[^\w-]+/g, '');   // remove special chars
    
    // Add timestamp to ensure uniqueness
    const timestamp = Date.now();
    return `${baseSlug}-${timestamp}`;
  };

// Create tables if they don't exist
export const initDatabase = () => {
  // Create demo_bookings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS demo_bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      course TEXT NOT NULL,
      experience TEXT NOT NULL,
      preferred_time TEXT NOT NULL,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'pending'
    )
  `);

  // Create enrollments table
  db.exec(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      course_id TEXT NOT NULL,
      course_name TEXT NOT NULL,
      experience TEXT NOT NULL,
      goals TEXT,
      referral TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'pending'
    )
  `);

  // Create blogs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      featured_image TEXT,
      category TEXT NOT NULL,
      tags TEXT,
      status TEXT DEFAULT 'published',
      featured BOOLEAN DEFAULT 0,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create analytics table
  db.exec(`
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL,
      referrer TEXT,
      user_agent TEXT,
      visit_date DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create newsletter subscriptions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      interests TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_sent DATETIME
    )
  `);

  console.log('Database initialized successfully');
};

// Demo booking functions
export const saveDemoBooking = (bookingData: {
  name: string;
  email: string;
  phone: string;
  course: string;
  experience: string;
  preferredTime: string;
  message?: string;
}) => {
  const stmt = db.prepare(`
    INSERT INTO demo_bookings (name, email, phone, course, experience, preferred_time, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    bookingData.name,
    bookingData.email,
    bookingData.phone,
    bookingData.course,
    bookingData.experience,
    bookingData.preferredTime,
    bookingData.message || ''
  );
  
  return result.lastInsertRowid;
};

export const getAllDemoBookings = () => {
  const stmt = db.prepare('SELECT * FROM demo_bookings ORDER BY created_at DESC');
  return stmt.all();
};

// Enrollment functions
export const saveEnrollment = (enrollmentData: {
  name: string;
  email: string;
  phone: string;
  courseId: string;
  courseName: string;
  experience: string;
  goals?: string;
  referral?: string;
}) => {
  const stmt = db.prepare(`
    INSERT INTO enrollments (name, email, phone, course_id, course_name, experience, goals, referral)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    enrollmentData.name,
    enrollmentData.email,
    enrollmentData.phone,
    enrollmentData.courseId,
    enrollmentData.courseName,
    enrollmentData.experience,
    enrollmentData.goals || '',
    enrollmentData.referral || ''
  );
  
  return result.lastInsertRowid;
};

export const getAllEnrollments = () => {
  const stmt = db.prepare('SELECT * FROM enrollments ORDER BY created_at DESC');
  return stmt.all();
};

export const updateEnrollmentStatus = (id: number, status: string) => {
  const stmt = db.prepare('UPDATE enrollments SET status = ?, created_at = created_at WHERE id = ?');
  return stmt.run(status, id);
};

// Analytics tracking
export const trackPageVisit = (page: string, referrer?: string, userAgent?: string) => {
  const stmt = db.prepare(`
    INSERT INTO analytics (page, referrer, user_agent, visit_date) 
    VALUES (?, ?, ?, datetime('now'))
  `);
  return stmt.run(page, referrer || null, userAgent || null);
};

export const getAnalyticsData = () => {
  const stmt = db.prepare(`
    SELECT 
      page,
      COUNT(*) as visits,
      COUNT(DISTINCT referrer) as unique_referrers,
      MAX(visit_date) as last_visit
    FROM analytics 
    GROUP BY page 
    ORDER BY visits DESC
  `);
  return stmt.all();
};

export const getReferrerData = () => {
  const stmt = db.prepare(`
    SELECT 
      referrer,
      COUNT(*) as visits,
      MAX(visit_date) as last_visit
    FROM analytics 
    WHERE referrer IS NOT NULL AND referrer != ''
    GROUP BY referrer 
    ORDER BY visits DESC
    LIMIT 20
  `);
  return stmt.all();
};

// Blog functions
export const createBlog = (blogData: {
  title: string;
  slug?: string;   // allow manual slug if needed
  excerpt: string;
  content: string;
  author: string;
  featuredImage?: string;
  category: string;
  tags?: string;
  featured?: boolean;
  status?: 'pending' | 'published';
}) => {
  // Use provided slug or generate from title
  const safeSlug = slugifyTitle(blogData.slug || blogData.title);

  const stmt = db.prepare(`
    INSERT INTO blogs (title, slug, excerpt, content, author, featured_image, category, tags, featured, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    blogData.title,
    safeSlug,
    blogData.excerpt,
    blogData.content,
    blogData.author,
    blogData.featuredImage || '',
    blogData.category,
    blogData.tags || '',
    blogData.featured ? 1 : 0,
    blogData.status || 'pending'
  );

  return result.lastInsertRowid;
};

export const getAllBlogs = () => {
  const stmt = db.prepare("SELECT * FROM blogs WHERE status = 'published' ORDER BY created_at DESC");
  return stmt.all();
};

export const getBlogBySlug = (slug: string) => {
  const stmt = db.prepare("SELECT * FROM blogs WHERE slug = ? AND status = 'published'");
  return stmt.get(slug);
};

export const getBlogBySlugAdmin = (slug: string) => {
  const stmt = db.prepare('SELECT * FROM blogs WHERE slug = ?');
  return stmt.get(slug);
};

export const getFeaturedBlogs = () => {
  const stmt = db.prepare("SELECT * FROM blogs WHERE featured = 1 AND status = 'published' ORDER BY created_at DESC LIMIT 3");
  return stmt.all();
};

export const getBlogsByCategory = (category: string) => {
  const stmt = db.prepare("SELECT * FROM blogs WHERE category = ? AND status = 'published' ORDER BY created_at DESC");
  return stmt.all(category);
};

export const incrementBlogViews = (slug: string) => {
  const stmt = db.prepare('UPDATE blogs SET views = views + 1 WHERE slug = ?');
  stmt.run(slug);
};

export const getBlogCategories = () => {
  const stmt = db.prepare("SELECT DISTINCT category FROM blogs WHERE status = 'published'");
  return stmt.all();
};

// Admin/moderation helpers
export const getAllBlogsAdmin = () => {
  const stmt = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC');
  return stmt.all();
};

export const getPendingBlogs = () => {
  const stmt = db.prepare("SELECT * FROM blogs WHERE status = 'pending' ORDER BY created_at DESC");
  return stmt.all();
};

export const approveBlog = (id: number) => {
  const stmt = db.prepare("UPDATE blogs SET status = 'published', updated_at = CURRENT_TIMESTAMP WHERE id = ?");
  return stmt.run(id);
};

export const deleteBlog = (id: number) => {
  const stmt = db.prepare('DELETE FROM blogs WHERE id = ?');
  return stmt.run(id);
};

// Newsletter subscription functions
export const subscribeNewsletter = (subscriptionData: {
  email: string;
  name?: string;
  interests: string[];
}) => {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO newsletter_subscriptions (email, name, interests)
    VALUES (?, ?, ?)
  `);
  
  const result = stmt.run(
    subscriptionData.email,
    subscriptionData.name || '',
    JSON.stringify(subscriptionData.interests)
  );
  
  return result.lastInsertRowid;
};

export const getAllNewsletterSubscriptions = () => {
  const stmt = db.prepare('SELECT * FROM newsletter_subscriptions ORDER BY created_at DESC');
  return stmt.all();
};

export const getNewsletterSubscriptionsByInterest = (interest: string) => {
  const stmt = db.prepare('SELECT * FROM newsletter_subscriptions WHERE interests LIKE ? AND status = "active"');
  return stmt.all(`%"${interest}"%`);
};

export const unsubscribeNewsletter = (email: string) => {
  const stmt = db.prepare('UPDATE newsletter_subscriptions SET status = "unsubscribed" WHERE email = ?');
  return stmt.run(email);
};

// Initialize database on import
initDatabase();
