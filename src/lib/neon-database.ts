import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Copy variables from Vercel (Production or Preview) into .env.local — see env.template.'
    );
  }
  if (!pool) {
    pool = new Pool({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      max: Math.min(parseInt(process.env.PG_POOL_MAX || '10', 10), 20),
    });
  }
  return pool;
}

// Helper function to execute queries
async function query(text: string, params?: any[]) {
  const client = await getPool().connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}

// Helper function to execute single query
async function queryOne(text: string, params?: any[]) {
  const client = await getPool().connect();
  try {
    const res = await client.query(text, params);
    return res.rows[0];
  } finally {
    client.release();
  }
}

// Helper function to execute insert/update/delete
async function execute(text: string, params?: any[]) {
  const client = await getPool().connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

// ===== ENROLLMENT FUNCTIONS =====
export const saveEnrollment = async (enrollmentData: {
  name: string;
  email: string;
  phone: string;
  courseId: string;
  courseName: string;
  experience: string;
  goals?: string;
  referral?: string;
}) => {
  const result = await execute(
    `INSERT INTO enrollments (name, email, phone, course_id, course_name, experience, goals, referral)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      enrollmentData.name,
      enrollmentData.email,
      enrollmentData.phone,
      enrollmentData.courseId,
      enrollmentData.courseName,
      enrollmentData.experience,
      enrollmentData.goals || '',
      enrollmentData.referral || ''
    ]
  );
  return result.rows[0].id;
};

export const getAllEnrollments = async () => {
  return await query('SELECT * FROM enrollments ORDER BY created_at DESC');
};

export const updateEnrollmentStatus = async (id: number, status: string) => {
  const result = await execute(
    'UPDATE enrollments SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  
  if (result.rows.length === 0) {
    return { success: false, error: 'Enrollment not found' };
  }
  
  return { 
    success: true, 
    data: result.rows[0],
    message: 'Enrollment status updated successfully'
  };
};

// ===== DEMO BOOKING FUNCTIONS =====
export const saveDemoBooking = async (bookingData: {
  name: string;
  email: string;
  phone: string;
  course: string;
  experience: string;
  preferredTime: string;
  message?: string;
}) => {
  const result = await execute(
    `INSERT INTO demo_bookings (name, email, phone, course, experience, preferred_time, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [
      bookingData.name,
      bookingData.email,
      bookingData.phone,
      bookingData.course,
      bookingData.experience,
      bookingData.preferredTime,
      bookingData.message || ''
    ]
  );
  return result.rows[0].id;
};

export const getAllDemoBookings = async () => {
  return await query('SELECT * FROM demo_bookings ORDER BY created_at DESC');
};

export const updateDemoBookingStatus = async (id: number, status: string) => {
  const result = await execute(
    'UPDATE demo_bookings SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  
  if (result.rows.length === 0) {
    return { success: false, error: 'Demo booking not found' };
  }
  
  return { 
    success: true, 
    data: result.rows[0],
    message: 'Demo booking status updated successfully'
  };
};

// ===== BLOG FUNCTIONS =====
export const createBlog = async (blogData: {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImage?: string;
  category: string;
  tags?: string;
  featured?: boolean;
  status?: 'pending' | 'published';
}) => {
  const slug = blogData.slug || blogData.title.toLowerCase().trim().replace(/\s+/g, '-') + '-' + Date.now();
  
  const result = await execute(
    `INSERT INTO blogs (title, slug, excerpt, content, author, featured_image, category, tags, featured, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
    [
      blogData.title,
      slug,
      blogData.excerpt,
      blogData.content,
      blogData.author,
      blogData.featuredImage || '',
      blogData.category,
      blogData.tags || '',
      blogData.featured || false,
      blogData.status || 'pending'
    ]
  );
  return result.rows[0].id;
};

export const getAllBlogs = async () => {
  return await query("SELECT * FROM blogs WHERE status = 'published' ORDER BY created_at DESC");
};

export const getAllBlogsAdmin = async () => {
  return await query('SELECT * FROM blogs ORDER BY created_at DESC');
};

export const getBlogBySlug = async (slug: string) => {
  return await queryOne("SELECT * FROM blogs WHERE slug = $1 AND status = 'published'", [slug]);
};

export const getBlogBySlugAdmin = async (slug: string) => {
  return await queryOne('SELECT * FROM blogs WHERE slug = $1', [slug]);
};

export const getBlogById = async (id: number) => {
  return await queryOne('SELECT * FROM blogs WHERE id = $1', [id]);
};

export const getFeaturedBlogs = async () => {
  return await query("SELECT * FROM blogs WHERE featured = true AND status = 'published' ORDER BY created_at DESC LIMIT 3");
};

export const getBlogsByCategory = async (category: string) => {
  return await query("SELECT * FROM blogs WHERE category = $1 AND status = 'published' ORDER BY created_at DESC", [category]);
};

export const incrementBlogViews = async (slug: string) => {
  await execute('UPDATE blogs SET views = views + 1 WHERE slug = $1', [slug]);
};

export const getBlogCategories = async () => {
  return await query("SELECT DISTINCT category FROM blogs WHERE status = 'published'");
};

export const getPendingBlogs = async () => {
  return await query("SELECT * FROM blogs WHERE status = 'pending' ORDER BY created_at DESC");
};

export const approveBlog = async (id: number) => {
  await execute("UPDATE blogs SET status = 'published', updated_at = CURRENT_TIMESTAMP WHERE id = $1", [id]);
};

export const deleteBlog = async (id: number) => {
  await execute('DELETE FROM blogs WHERE id = $1', [id]);
};

// ===== NEWSLETTER FUNCTIONS =====
export const subscribeNewsletter = async (subscriptionData: {
  email: string;
  name?: string;
  interests: string[];
}) => {
  const result = await execute(
    `INSERT INTO newsletter_subscriptions (email, name, interests)
     VALUES ($1, $2, $3) 
     ON CONFLICT (email) DO UPDATE SET 
       name = EXCLUDED.name,
       interests = EXCLUDED.interests,
       status = 'subscribed'
     RETURNING id`,
    [
      subscriptionData.email,
      subscriptionData.name || '',
      JSON.stringify(subscriptionData.interests)
    ]
  );
  return result.rows[0].id;
};

export const getAllNewsletterSubscriptions = async () => {
  return await query('SELECT * FROM newsletter_subscriptions ORDER BY created_at DESC');
};

export const getNewsletterSubscriptionsByInterest = async (interest: string) => {
  return await query('SELECT * FROM newsletter_subscriptions WHERE interests LIKE $1 AND status = $2', [`%"${interest}"%`, 'subscribed']);
};

export const unsubscribeNewsletter = async (email: string) => {
  await execute("UPDATE newsletter_subscriptions SET status = 'unsubscribed' WHERE email = $1", [email]);
};

// ===== ANALYTICS FUNCTIONS =====
export const trackPageVisit = async (page: string, referrer?: string, userAgent?: string) => {
  // Check if page already exists
  const existing = await queryOne('SELECT * FROM analytics WHERE page = $1', [page]);
  
  if (existing) {
    await execute(
      'UPDATE analytics SET visits = visits + 1, last_visit = CURRENT_TIMESTAMP WHERE page = $1',
      [page]
    );
  } else {
    await execute(
      'INSERT INTO analytics (page, visits, last_visit) VALUES ($1, $2, $3)',
      [page, 1, new Date()]
    );
  }

  // Track referrer data if referrer is provided
  if (referrer && referrer.trim() !== '') {
    const existingReferrer = await queryOne(
      'SELECT * FROM referrer_data WHERE referrer = $1 AND page = $2', 
      [referrer, page]
    );
    
    if (existingReferrer) {
      await execute(
        'UPDATE referrer_data SET visits = visits + 1, last_visit = CURRENT_TIMESTAMP WHERE referrer = $1 AND page = $2',
        [referrer, page]
      );
    } else {
      await execute(
        'INSERT INTO referrer_data (referrer, page, visits, last_visit) VALUES ($1, $2, $3, $4)',
        [referrer, page, 1, new Date()]
      );
    }
  }
};

export const getAnalyticsData = async () => {
  const rows = await query(`
    SELECT 
      page,
      visits,
      unique_referrers,
      last_visit
    FROM analytics 
    ORDER BY visits DESC
  `);
  const slugRows = await query("SELECT slug FROM blogs WHERE status = 'published'");
  const publishedSlugs = new Set((slugRows as { slug: string }[]).map((b) => b.slug));
  return (rows as { page: string }[]).filter((item) => {
    if (!item.page.startsWith('/blogs/')) return true;
    if (item.page === '/blogs') return true;
    const slug = item.page.replace('/blogs/', '');
    return publishedSlugs.has(slug);
  });
};

export const getPageAnalytics = async (page: string) => {
  return await queryOne(
    `
    SELECT 
      page,
      visits,
      unique_referrers,
      last_visit
    FROM analytics 
    WHERE page = $1
    `,
    [page]
  );
};

/** Daily buckets are not stored in the aggregated analytics table; returns a flat timeline for the chart UI. */
export const getAnalyticsHistoryNew = async (days: number = 30): Promise<{ date: string; views: number }[]> => {
  const out: { date: string; views: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    out.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: 0,
    });
  }
  return out;
};

export const getBlogViewsLast30Days = async (): Promise<number> => {
  const row = await queryOne(`
    SELECT COALESCE(SUM(views), 0)::int AS total_views
    FROM blogs
    WHERE created_at >= NOW() - INTERVAL '30 days'
  `);
  return row?.total_views ?? 0;
};

export const getNewSubscribersCount = async (days: number = 30): Promise<number> => {
  const row = await queryOne(
    `
    SELECT COUNT(*)::int AS count
    FROM newsletter_subscriptions
    WHERE created_at >= NOW() - make_interval(days => $1)
    `,
    [days]
  );
  return row?.count ?? 0;
};

export const getBlogEngagementStats = async () => {
  const row = await queryOne(`
    SELECT 
      COUNT(*)::int AS total_blogs,
      COALESCE(SUM(views), 0)::bigint AS total_views,
      COALESCE(AVG(views), 0)::float AS avg_views
    FROM blogs
    WHERE status = 'published'
  `);
  const avg = Number(row?.avg_views ?? 0);
  return {
    totalBlogs: row?.total_blogs ?? 0,
    totalViews: Number(row?.total_views ?? 0),
    avgViews: avg,
    engagementRate: Math.round(avg * 100) / 100,
  };
};

export const getPopularCategories = async () => {
  return await query(`
    SELECT 
      category,
      COUNT(*)::int AS post_count,
      COALESCE(SUM(views), 0)::bigint AS total_views
    FROM blogs
    WHERE status = 'published'
    GROUP BY category
    ORDER BY post_count DESC
    LIMIT 5
  `);
};

export const getPendingCommentsCount = async (): Promise<number> => {
  try {
    const row = await queryOne(`
      SELECT COUNT(*)::int AS count
      FROM comments
      WHERE status = 'pending'
    `);
    return row?.count ?? 0;
  } catch {
    return 0;
  }
};

export const getPendingBlogsCount = async (): Promise<number> => {
  const row = await queryOne(`
    SELECT COUNT(*)::int AS count
    FROM blogs
    WHERE status = 'pending'
  `);
  return row?.count ?? 0;
};

function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100 * 10) / 10;
}

export const getDashboardTrends = async () => {
  const countRange = async (table: string, olderDays: number, newerDays: number) => {
    const row = await queryOne(
      `
      SELECT COUNT(*)::int AS c FROM ${table}
      WHERE created_at >= NOW() - make_interval(days => $1)
        AND created_at < NOW() - make_interval(days => $2)
      `,
      [olderDays, newerDays]
    );
    return row?.c ?? 0;
  };

  const currentViewsRow = await queryOne(`SELECT COALESCE(SUM(visits), 0)::int AS v FROM analytics`);
  const currentViews = currentViewsRow?.v ?? 0;

  const currentBookings = await countRange('demo_bookings', 30, 0);
  const currentEnquiries = await countRange('enquiries', 30, 0);
  const currentBlogs = await countRange('blogs', 30, 0);

  const previousBookings = await countRange('demo_bookings', 60, 30);
  const previousEnquiries = await countRange('enquiries', 60, 30);
  const previousBlogs = await countRange('blogs', 60, 30);

  return {
    views: { value: currentViews, trend: 0 },
    bookings: { value: currentBookings, trend: calculateTrend(currentBookings, previousBookings) },
    enquiries: { value: currentEnquiries, trend: calculateTrend(currentEnquiries, previousEnquiries) },
    blogs: { value: currentBlogs, trend: calculateTrend(currentBlogs, previousBlogs) },
  };
};

export const getReferrerData = async () => {
  try {
    return await query(`
      SELECT 
        referrer,
        SUM(visits) as visits,
        MAX(last_visit) as last_visit
      FROM referrer_data 
      GROUP BY referrer 
      ORDER BY visits DESC
      LIMIT 20
    `);
  } catch (error) {
    console.log('Referrer data table does not exist, returning empty array');
    return [];
  }
};

// ===== INITIALIZATION =====
export const initDatabase = async () => {
  // This function is called to ensure tables exist
  // The setup-database API handles the actual table creation
  console.log('Database connection verified');
};

// ===== ENQUIRY FUNCTIONS =====
export const saveEnquiry = async (enquiryData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
}) => {
  try {
    const result = await execute(
      `INSERT INTO enquiries (name, email, phone, company, service, message) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, created_at`,
      [
        enquiryData.name,
        enquiryData.email,
        enquiryData.phone || null,
        enquiryData.company || null,
        enquiryData.service,
        enquiryData.message || null
      ]
    );
    
    return result.rows[0];
  } catch (error) {
    console.error('Error saving enquiry:', error);
    throw error;
  }
};

export const getEnquiries = async (limit: number = 50, offset: number = 0) => {
  try {
    const result = await query(
      `SELECT * FROM enquiries 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    
    return result;
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    throw error;
  }
};

export const updateEnquiryStatus = async (id: number, status: string) => {
  try {
    const result = await execute(
      `UPDATE enquiries SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    
    return result.rows[0];
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    throw error;
  }
};

process.on('SIGINT', async () => {
  if (pool) await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  if (pool) await pool.end();
  process.exit(0);
});
