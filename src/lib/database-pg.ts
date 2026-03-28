import { Client } from 'pg';

// PostgreSQL database connection
let client: Client | null = null;

export const getClient = () => {
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
  }
  return client;
};

export const connectDB = async () => {
  const client = getClient();
  if (!client) {
    throw new Error('Database client not initialized');
  }
  
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL database');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

export const disconnectDB = async () => {
  if (client) {
    await client.end();
    client = null;
    console.log('✅ Disconnected from PostgreSQL database');
  }
};

// Database initialization
export const initDatabase = async () => {
  const client = getClient();
  
  const createTablesSQL = `
    -- Demo bookings table
    CREATE TABLE IF NOT EXISTS demo_bookings (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      course TEXT NOT NULL,
      experience TEXT NOT NULL,
      preferred_time TEXT NOT NULL,
      message TEXT,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Enrollments table
    CREATE TABLE IF NOT EXISTS enrollments (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      course_name TEXT NOT NULL,
      experience TEXT NOT NULL,
      goals TEXT,
      referral TEXT,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Blogs table
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      featured_image TEXT,
      category TEXT,
      tags TEXT,
      status TEXT DEFAULT 'draft',
      featured BOOLEAN DEFAULT FALSE,
      views INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Analytics table
    CREATE TABLE IF NOT EXISTS analytics (
      id SERIAL PRIMARY KEY,
      page TEXT NOT NULL,
      visits INTEGER DEFAULT 1,
      unique_referrers INTEGER DEFAULT 0,
      last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Newsletter subscriptions table
    CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      interests TEXT,
      status TEXT DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_sent TIMESTAMP
    );
  `;

  try {
    await client.query(createTablesSQL);
    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// CRUD operations for demo bookings
export const saveDemoBooking = async (bookingData: any) => {
  const client = getClient();
  const query = `
    INSERT INTO demo_bookings (name, email, phone, course, experience, preferred_time, message, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  
  const values = [
    bookingData.name,
    bookingData.email,
    bookingData.phone,
    bookingData.course,
    bookingData.experience,
    bookingData.preferred_time,
    bookingData.message || null,
    bookingData.status || 'pending'
  ];
  
  const result = await client.query(query, values);
  return result.rows[0];
};

export const getAllDemoBookings = async () => {
  const client = getClient();
  const result = await client.query('SELECT * FROM demo_bookings ORDER BY created_at DESC');
  return result.rows;
};

export const updateDemoBookingStatus = async (id: number, status: string) => {
  const client = getClient();
  const query = `
    UPDATE demo_bookings 
    SET status = $1, updated_at = CURRENT_TIMESTAMP 
    WHERE id = $2 
    RETURNING *
  `;
  
  const result = await client.query(query, [status, id]);
  
  if (result.rows.length === 0) {
    return { success: false, error: 'Demo booking not found' };
  }
  
  return { 
    success: true, 
    data: result.rows[0],
    message: 'Demo booking status updated successfully'
  };
};

// CRUD operations for enrollments
export const saveEnrollment = async (enrollmentData: any) => {
  const client = getClient();
  const query = `
    INSERT INTO enrollments (name, email, phone, course_name, experience, goals, referral, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  
  const values = [
    enrollmentData.name,
    enrollmentData.email,
    enrollmentData.phone,
    enrollmentData.course_name,
    enrollmentData.experience,
    enrollmentData.goals || null,
    enrollmentData.referral || null,
    enrollmentData.status || 'pending'
  ];
  
  const result = await client.query(query, values);
  return result.rows[0];
};

export const getAllEnrollments = async () => {
  const client = getClient();
  const result = await client.query('SELECT * FROM enrollments ORDER BY created_at DESC');
  return result.rows;
};

export const updateEnrollmentStatus = async (id: number, status: string) => {
  const client = getClient();
  const query = `
    UPDATE enrollments 
    SET status = $1, updated_at = CURRENT_TIMESTAMP 
    WHERE id = $2 
    RETURNING *
  `;
  
  const result = await client.query(query, [status, id]);
  
  if (result.rows.length === 0) {
    return { success: false, error: 'Enrollment not found' };
  }
  
  return { 
    success: true, 
    data: result.rows[0],
    message: 'Enrollment status updated successfully'
  };
};

// CRUD operations for blogs
export const createBlog = async (blogData: any) => {
  const client = getClient();
  const query = `
    INSERT INTO blogs (title, slug, excerpt, content, author, featured_image, category, tags, status, featured)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;
  
  const values = [
    blogData.title,
    blogData.slug,
    blogData.excerpt,
    blogData.content,
    blogData.author,
    blogData.featured_image || null,
    blogData.category,
    blogData.tags || '',
    blogData.status || 'draft',
    blogData.featured || false
  ];
  
  const result = await client.query(query, values);
  return result.rows[0];
};

export const getAllBlogs = async () => {
  const client = getClient();
  const result = await client.query("SELECT * FROM blogs WHERE status = 'published' ORDER BY created_at DESC");
  return result.rows;
};

export const getAllBlogsAdmin = async () => {
  const client = getClient();
  const result = await client.query('SELECT * FROM blogs ORDER BY created_at DESC');
  return result.rows;
};

export const getBlogBySlug = async (slug: string) => {
  const client = getClient();
  const result = await client.query('SELECT * FROM blogs WHERE slug = $1', [slug]);
  return result.rows[0];
};

// Newsletter operations
export const subscribeToNewsletter = async (subscriptionData: any) => {
  const client = getClient();
  const query = `
    INSERT INTO newsletter_subscriptions (email, name, interests, status)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (email) DO UPDATE SET
      name = EXCLUDED.name,
      interests = EXCLUDED.interests,
      status = EXCLUDED.status,
      created_at = CURRENT_TIMESTAMP
    RETURNING *
  `;
  
  const values = [
    subscriptionData.email,
    subscriptionData.name || null,
    subscriptionData.interests || '',
    subscriptionData.status || 'active'
  ];
  
  const result = await client.query(query, values);
  return result.rows[0];
};

export const getAllNewsletterSubscriptions = async () => {
  const client = getClient();
  const result = await client.query('SELECT * FROM newsletter_subscriptions ORDER BY created_at DESC');
  return result.rows;
};

// Analytics operations
export const trackPageView = async (page: string) => {
  const client = getClient();
  const query = `
    INSERT INTO analytics (page, visits, unique_referrers, last_visit)
    VALUES ($1, 1, 1, CURRENT_TIMESTAMP)
    ON CONFLICT (page) DO UPDATE SET
      visits = analytics.visits + 1,
      last_visit = CURRENT_TIMESTAMP
    RETURNING *
  `;
  
  const result = await client.query(query, [page]);
  return result.rows[0];
};

export const getAnalyticsData = async () => {
  const client = getClient();
  const result = await client.query('SELECT * FROM analytics ORDER BY visits DESC');
  return result.rows;
};

export const getReferrerData = async () => {
  const client = getClient();
  const result = await client.query(`
    SELECT 
      page as referrer,
      SUM(visits) as visits,
      MAX(last_visit) as last_visit
    FROM analytics 
    GROUP BY page 
    ORDER BY visits DESC
  `);
  return result.rows;
};
