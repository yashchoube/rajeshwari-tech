
const Database = require('better-sqlite3');
const path = require('path');

// ----------------------
// Update Type: Added
// Description: Created new Find Slug JS for searching blogs by slug
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
const db = new Database(dbPath);

const stmt = db.prepare("SELECT title, slug FROM blogs WHERE title LIKE '%crow%' OR slug LIKE '%crow%' LIMIT 1");
const blog = stmt.get();

if (blog) {
    console.log('Found Blog:', blog.title);
    console.log('Slug:', blog.slug);
} else {
    console.log('No blog found matching "crow"');
    // List all slugs
    const all = db.prepare("SELECT slug FROM blogs LIMIT 5").all();
    console.log('Available slugs:', all.map(b => b.slug));
}
