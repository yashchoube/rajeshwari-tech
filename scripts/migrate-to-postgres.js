/**
 * Database Migration Script: SQLite to PostgreSQL
 * Run this script to migrate your data from SQLite to PostgreSQL
 */

const Database = require('better-sqlite3');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// SQLite database path
const sqlitePath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
const sqliteDb = new Database(sqlitePath);

// PostgreSQL connection (update with your Vercel Postgres URL)
const pgClient = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/rajeshwari_tech'
});

async function migrateDatabase() {
  try {
    console.log('🚀 Starting database migration...');
    
    // Connect to PostgreSQL
    await pgClient.connect();
    console.log('✅ Connected to PostgreSQL');

    // Create tables in PostgreSQL
    await createPostgresTables();
    
    // Migrate data
    await migrateData();
    
    console.log('✅ Database migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await pgClient.end();
    sqliteDb.close();
  }
}

async function createPostgresTables() {
  console.log('📋 Creating PostgreSQL tables...');
  
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

  await pgClient.query(createTablesSQL);
  console.log('✅ PostgreSQL tables created');
}

async function migrateData() {
  console.log('📦 Migrating data...');
  
  // Migrate demo bookings
  const demoBookings = sqliteDb.prepare('SELECT * FROM demo_bookings').all();
  for (const booking of demoBookings) {
    await pgClient.query(`
      INSERT INTO demo_bookings (id, name, email, phone, course, experience, preferred_time, message, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO NOTHING
    `, [
      booking.id, booking.name, booking.email, booking.phone, 
      booking.course, booking.experience, booking.preferred_time, 
      booking.message, booking.status, booking.created_at, booking.updated_at
    ]);
  }
  console.log(`✅ Migrated ${demoBookings.length} demo bookings`);

  // Migrate enrollments
  const enrollments = sqliteDb.prepare('SELECT * FROM enrollments').all();
  for (const enrollment of enrollments) {
    await pgClient.query(`
      INSERT INTO enrollments (id, name, email, phone, course_name, experience, goals, referral, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO NOTHING
    `, [
      enrollment.id, enrollment.name, enrollment.email, enrollment.phone,
      enrollment.course_name, enrollment.experience, enrollment.goals,
      enrollment.referral, enrollment.status, enrollment.created_at, enrollment.updated_at
    ]);
  }
  console.log(`✅ Migrated ${enrollments.length} enrollments`);

  // Migrate blogs
  const blogs = sqliteDb.prepare('SELECT * FROM blogs').all();
  for (const blog of blogs) {
    await pgClient.query(`
      INSERT INTO blogs (id, title, slug, excerpt, content, author, featured_image, category, tags, status, featured, views, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (id) DO NOTHING
    `, [
      blog.id, blog.title, blog.slug, blog.excerpt, blog.content,
      blog.author, blog.featured_image, blog.category, blog.tags,
      blog.status, blog.featured, blog.views, blog.created_at, blog.updated_at
    ]);
  }
  console.log(`✅ Migrated ${blogs.length} blogs`);

  // Migrate analytics
  const analytics = sqliteDb.prepare('SELECT * FROM analytics').all();
  for (const analytic of analytics) {
    await pgClient.query(`
      INSERT INTO analytics (id, page, visits, unique_referrers, last_visit, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO NOTHING
    `, [
      analytic.id, analytic.page, analytic.visits, analytic.unique_referrers,
      analytic.last_visit, analytic.created_at
    ]);
  }
  console.log(`✅ Migrated ${analytics.length} analytics records`);

  // Migrate newsletter subscriptions
  const subscriptions = sqliteDb.prepare('SELECT * FROM newsletter_subscriptions').all();
  for (const subscription of subscriptions) {
    await pgClient.query(`
      INSERT INTO newsletter_subscriptions (id, email, name, interests, status, created_at, last_sent)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (email) DO NOTHING
    `, [
      subscription.id, subscription.email, subscription.name,
      subscription.interests, subscription.status, subscription.created_at, subscription.last_sent
    ]);
  }
  console.log(`✅ Migrated ${subscriptions.length} newsletter subscriptions`);
}

// Run migration
if (require.main === module) {
  migrateDatabase();
}

module.exports = { migrateDatabase };
