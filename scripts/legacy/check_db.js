
const Database = require('better-sqlite3');
const path = require('path');

// ----------------------
// Update Type: Added
// Description: Created new Check DB Script for verifying database content
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
const db = new Database(dbPath);

const stmt = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC LIMIT 1');
const blog = stmt.get();

console.log('Latest Blog Post:');
if (blog) {
    console.log('ID:', blog.id);
    console.log('Title:', blog.title);
    console.log('Slug:', blog.slug);
    console.log('Content Length:', blog.content ? blog.content.length : 0);
    console.log('Content Preview:', blog.content ? blog.content.substring(0, 200) : 'NULL');
    console.log('Featured Image:', blog.featured_image);
} else {
    console.log('No blogs found.');
}
