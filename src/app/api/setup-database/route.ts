import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// This API endpoint creates database tables in production
// Call this once after deployment to set up your database

export async function POST(request: NextRequest) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔧 Creating database tables in production...');
    
    // Create enrollments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        course_id VARCHAR(255) NOT NULL,
        course_name VARCHAR(255) NOT NULL,
        experience VARCHAR(255) NOT NULL,
        goals TEXT,
        referral VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Enrollments table created');

    // Create demo_bookings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS demo_bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        course VARCHAR(255) NOT NULL,
        experience VARCHAR(255) NOT NULL,
        preferred_time VARCHAR(255),
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Demo bookings table created');

    // Create blogs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT,
        author VARCHAR(255),
        featured_image VARCHAR(255),
        category VARCHAR(255),
        tags TEXT,
        status VARCHAR(50) DEFAULT 'draft',
        featured BOOLEAN DEFAULT FALSE,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Blogs table created');

    // Create newsletter_subscriptions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        interests TEXT,
        status VARCHAR(50) DEFAULT 'subscribed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_sent TIMESTAMP
      )
    `);
    console.log('✅ Newsletter subscriptions table created');

    // Create analytics table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS analytics (
        id SERIAL PRIMARY KEY,
        page VARCHAR(255) NOT NULL,
        visits INTEGER DEFAULT 0,
        unique_referrers INTEGER DEFAULT 0,
        last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Analytics table created');

    // Create enquiries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(255),
        service VARCHAR(255) NOT NULL,
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Enquiries table created');

    await pool.end();
    
    return NextResponse.json({
      success: true,
      message: 'All database tables created successfully!',
      tables: [
        'enrollments',
        'demo_bookings', 
        'blogs',
        'newsletter_subscriptions',
        'analytics',
        'enquiries'
      ]
    });

  } catch (error) {
    console.error('❌ Error creating tables:', error);
    await pool.end();
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
