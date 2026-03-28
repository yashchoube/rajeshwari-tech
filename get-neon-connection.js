#!/usr/bin/env node

/**
 * Get Neon Database Connection Details
 * This script helps you extract connection details from your Neon database
 */

const { Pool } = require('pg');

async function getConnectionDetails() {
  try {
    console.log('🔍 Checking Neon Database Connection...\n');
    
    // This will use your existing DATABASE_URL from environment
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const client = await pool.connect();
    
    // Get database info
    const dbInfo = await client.query('SELECT current_database(), current_user, version()');
    const tableCount = await client.query(`
      SELECT COUNT(*) as table_count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('✅ Connection Successful!\n');
    console.log('📊 Database Information:');
    console.log(`   Database: ${dbInfo.rows[0].current_database}`);
    console.log(`   User: ${dbInfo.rows[0].current_user}`);
    console.log(`   Version: ${dbInfo.rows[0].version.split(' ')[0]}`);
    console.log(`   Tables: ${tableCount.rows[0].table_count}\n`);
    
    console.log('📋 Available Tables:');
    tables.rows.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.table_name}`);
    });

    // Extract connection details from DATABASE_URL
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      console.log('\n🔗 Connection Details for DBeaver:');
      const url = new URL(dbUrl);
      console.log(`   Host: ${url.hostname}`);
      console.log(`   Port: ${url.port || '5432'}`);
      console.log(`   Database: ${url.pathname.slice(1)}`);
      console.log(`   Username: ${url.username}`);
      console.log(`   Password: ${url.password}`);
      console.log(`   SSL Mode: require`);
    }

    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
    console.log('\n💡 Make sure your DATABASE_URL is set correctly in your environment variables.');
    console.log('   You can find it in your Vercel dashboard or Neon console.');
  }
}

// Run the script
getConnectionDetails();
