import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// ----------------------
// Update Type: Changed
// Description: Updated Database Library to use SQLite and added new tables/functions
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

// Type definitions
export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featured_image?: string;
  category: string;
  tags?: string;
  status: 'pending' | 'published';
  featured: boolean | number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface DemoBooking {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  experience: string;
  preferred_time: string;
  message?: string;
  created_at: string;
  status: string;
}

export interface Enrollment {
  id: number;
  name: string;
  email: string;
  phone: string;
  course_id: string;
  course_name: string;
  experience: string;
  goals?: string;
  referral?: string;
  created_at: string;
  status: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
  status: string;
  created_at: string;
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  name?: string;
  interests: string;
  status: string;
  created_at: string;
  last_sent?: string;
}

export interface AnalyticsData {
  page: string;
  visits: number;
  unique_referrers: number;
  last_visit: string;
}

export interface ReferrerData {
  referrer: string;
  visits: number;
  last_visit: string;
}

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

  // Create enquiries table
  db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      service TEXT NOT NULL,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_data TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create comments table
  db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      blog_id INTEGER NOT NULL,
      author_name TEXT NOT NULL,
      author_email TEXT NOT NULL,
      content TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (blog_id) REFERENCES blogs (id) ON DELETE CASCADE
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

export const getAllDemoBookings = (): DemoBooking[] => {
  const stmt = db.prepare('SELECT * FROM demo_bookings ORDER BY created_at DESC');
  return stmt.all() as DemoBooking[];
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

export const getAllEnrollments = (): Enrollment[] => {
  const stmt = db.prepare('SELECT * FROM enrollments ORDER BY created_at DESC');
  return stmt.all() as Enrollment[];
};


// Analytics tracking
export const trackPageVisit = (page: string, referrer?: string, userAgent?: string) => {
  const stmt = db.prepare(`
    INSERT INTO analytics (page, referrer, user_agent, visit_date) 
    VALUES (?, ?, ?, datetime('now'))
  `);
  return stmt.run(page, referrer || null, userAgent || null);
};

export const getAnalyticsData = (): AnalyticsData[] => {
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
  const analytics = stmt.all() as AnalyticsData[];

  // Get all published blog slugs for filtering
  const blogStmt = db.prepare("SELECT slug FROM blogs WHERE status = 'published'");
  const publishedSlugs = new Set((blogStmt.all() as { slug: string }[]).map(b => b.slug));

  return analytics.filter(item => {
    // Always show non-blog pages
    if (!item.page.startsWith('/blogs/')) return true;

    // Show the main blogs listing page
    if (item.page === '/blogs') return true;

    // Extract slug from /blogs/slug
    const slug = item.page.replace('/blogs/', '');

    // Only show if the blog exists and is published
    return publishedSlugs.has(slug);
  });
};

export const getPageAnalytics = (page: string): AnalyticsData | undefined => {
  const stmt = db.prepare(`
    SELECT 
      page,
      COUNT(*) as visits,
      COUNT(DISTINCT referrer) as unique_referrers,
      MAX(visit_date) as last_visit
    FROM analytics 
    WHERE page = ?
    GROUP BY page 
  `);
  return stmt.get(page) as AnalyticsData | undefined;
};

export const getReferrerData = (): ReferrerData[] => {
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
  return stmt.all() as ReferrerData[];
};

// Fetch analytics history for the chart
export const getAnalyticsHistoryNew = (days: number = 30): { date: string; views: number }[] => {
  const stmt = db.prepare(`
    SELECT 
      strftime('%Y-%m-%d', visit_date) as date,
      COUNT(*) as views
    FROM analytics
    WHERE visit_date >= datetime('now', '-' || ? || ' days')
    GROUP BY date
    ORDER BY date ASC
  `);

  const results = stmt.all(days) as { date: string; views: number }[];

  // Format dates for display (e.g., "Nov 29")
  return results.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    views: item.views
  }));
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

export const getAllBlogs = (): Blog[] => {
  const stmt = db.prepare("SELECT * FROM blogs WHERE status = 'published' ORDER BY created_at DESC");
  return stmt.all() as Blog[];
};

export const getBlogBySlug = (slug: string): Blog | undefined => {
  const stmt = db.prepare("SELECT * FROM blogs WHERE slug = ? AND status = 'published'");
  return stmt.get(slug) as Blog | undefined;
};

export const getBlogBySlugAdmin = (slug: string): Blog | undefined => {
  const stmt = db.prepare('SELECT * FROM blogs WHERE slug = ?');
  return stmt.get(slug) as Blog | undefined;
};

export const getBlogById = (id: number): Blog | undefined => {
  const stmt = db.prepare('SELECT * FROM blogs WHERE id = ?');
  return stmt.get(id) as Blog | undefined;
};

export const getFeaturedBlogs = (): Blog[] => {
  const stmt = db.prepare("SELECT * FROM blogs WHERE featured = 1 AND status = 'published' ORDER BY created_at DESC LIMIT 3");
  return stmt.all() as Blog[];
};

export const getBlogsByCategory = (category: string): Blog[] => {
  const stmt = db.prepare("SELECT * FROM blogs WHERE category = ? AND status = 'published' ORDER BY created_at DESC");
  return stmt.all(category) as Blog[];
};

export const incrementBlogViews = (slug: string) => {
  const stmt = db.prepare('UPDATE blogs SET views = views + 1 WHERE slug = ?');
  stmt.run(slug);
};

export const getBlogCategories = (): { category: string }[] => {
  const stmt = db.prepare("SELECT DISTINCT category FROM blogs WHERE status = 'published'");
  return stmt.all() as { category: string }[];
};

// Admin/moderation helpers
export const getAllBlogsAdmin = (): Blog[] => {
  const stmt = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC');
  return stmt.all() as Blog[];
};

export const getPendingBlogs = (): Blog[] => {
  const stmt = db.prepare("SELECT * FROM blogs WHERE status = 'pending' ORDER BY created_at DESC");
  return stmt.all() as Blog[];
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

export const getAllNewsletterSubscriptions = (): NewsletterSubscription[] => {
  const stmt = db.prepare('SELECT * FROM newsletter_subscriptions ORDER BY created_at DESC');
  return stmt.all() as NewsletterSubscription[];
};

export const getNewsletterSubscriptionsByInterest = (interest: string): NewsletterSubscription[] => {
  const stmt = db.prepare('SELECT * FROM newsletter_subscriptions WHERE interests LIKE ? AND status = "active"');
  return stmt.all(`%"${interest}"%`) as NewsletterSubscription[];
};

export const unsubscribeNewsletter = (email: string) => {
  const stmt = db.prepare('UPDATE newsletter_subscriptions SET status = "unsubscribed" WHERE email = ?');
  return stmt.run(email);
};

// Status update functions for admin
export const getEnquiries = (limit: number = 50, offset: number = 0): Enquiry[] => {
  const stmt = db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT ? OFFSET ?');
  return stmt.all(limit, offset) as Enquiry[];
};

export const saveEnquiry = (enquiryData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
}) => {
  const stmt = db.prepare(`
    INSERT INTO enquiries (name, email, phone, company, service, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    enquiryData.name,
    enquiryData.email,
    enquiryData.phone || null,
    enquiryData.company || null,
    enquiryData.service,
    enquiryData.message || null
  );

  return { id: Number(result.lastInsertRowid), ...enquiryData };
};

export const updateEnquiryStatus = (id: number, status: string) => {
  const stmt = db.prepare('UPDATE enquiries SET status = ? WHERE id = ?');
  const result = stmt.run(status, id);

  if (result.changes === 0) {
    throw new Error('Enquiry not found');
  }

  return db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);
};

export const updateDemoBookingStatus = (id: number, status: string) => {
  try {
    const stmt = db.prepare('UPDATE demo_bookings SET status = ? WHERE id = ?');
    const result = stmt.run(status, id);

    if (result.changes === 0) {
      return { success: false, error: 'Demo booking not found' };
    }

    // Get updated record
    const updatedRecord = db.prepare('SELECT * FROM demo_bookings WHERE id = ?').get(id);

    return {
      success: true,
      data: updatedRecord,
      message: 'Demo booking status updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const updateEnrollmentStatus = (id: number, status: string) => {
  try {
    const stmt = db.prepare('UPDATE enrollments SET status = ? WHERE id = ?');
    const result = stmt.run(status, id);

    if (result.changes === 0) {
      return { success: false, error: 'Enrollment not found' };
    }

    // Get updated record
    const updatedRecord = db.prepare('SELECT * FROM enrollments WHERE id = ?').get(id);

    return {
      success: true,
      data: updatedRecord,
      message: 'Enrollment status updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};


// Session management functions
export const createSession = (sessionId: string, userData: any, expiresAt: number) => {
  const stmt = db.prepare(`
    INSERT INTO sessions (id, user_data, expires_at)
    VALUES (?, ?, ?)
  `);
  return stmt.run(sessionId, JSON.stringify(userData), expiresAt);
};

export const getSession = (sessionId: string) => {
  const stmt = db.prepare('SELECT * FROM sessions WHERE id = ?');
  const session = stmt.get(sessionId) as any;

  if (!session) return null;

  return {
    ...session,
    user: JSON.parse(session.user_data)
  };
};

export const deleteSession = (sessionId: string) => {
  const stmt = db.prepare('DELETE FROM sessions WHERE id = ?');
  return stmt.run(sessionId);
};

export const cleanupExpiredSessions = () => {
  const now = Date.now();
  const stmt = db.prepare('DELETE FROM sessions WHERE expires_at < ?');
  return stmt.run(now);
};

// Statistics functions for admin dashboard
export const getBlogViewsLast30Days = (): number => {
  const stmt = db.prepare(`
    SELECT SUM(views) as total_views
    FROM blogs
    WHERE created_at >= datetime('now', '-30 days')
  `);
  const result = stmt.get() as { total_views: number | null };
  return result.total_views || 0;
};

export const getNewSubscribersCount = (days: number = 30): number => {
  const stmt = db.prepare(`
    SELECT COUNT(*) as count
    FROM newsletter_subscriptions
    WHERE created_at >= datetime('now', '-' || ? || ' days')
  `);
  const result = stmt.get(days) as { count: number };
  return result.count || 0;
};

export const getBlogEngagementStats = () => {
  const stmt = db.prepare(`
    SELECT 
      COUNT(*) as total_blogs,
      SUM(views) as total_views,
      AVG(views) as avg_views
    FROM blogs
    WHERE status = 'published'
  `);
  const result = stmt.get() as {
    total_blogs: number;
    total_views: number;
    avg_views: number;
  };

  // Calculate engagement rate (simplified as avg views per blog)
  const engagementRate = result.avg_views || 0;
  return {
    totalBlogs: result.total_blogs || 0,
    totalViews: result.total_views || 0,
    avgViews: result.avg_views || 0,
    engagementRate: Math.round(engagementRate * 100) / 100
  };
};

export const getPopularCategories = () => {
  const stmt = db.prepare(`
    SELECT 
      category,
      COUNT(*) as post_count,
      SUM(views) as total_views
    FROM blogs
    WHERE status = 'published'
    GROUP BY category
    ORDER BY post_count DESC
    LIMIT 5
  `);
  return stmt.all() as Array<{
    category: string;
    post_count: number;
    total_views: number;
  }>;
};

export const getPendingCommentsCount = (): number => {
  const stmt = db.prepare(`
    SELECT COUNT(*) as count
    FROM comments
    WHERE status = 'pending'
  `);
  const result = stmt.get() as { count: number };
  return result.count || 0;
};

export const getPendingBlogsCount = (): number => {
  const stmt = db.prepare(`
    SELECT COUNT(*) as count
    FROM blogs
    WHERE status = 'pending'
  `);
  const result = stmt.get() as { count: number };
  return result.count || 0;
};

// Initialize database on import
initDatabase();
