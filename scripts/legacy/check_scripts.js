
const Database = require('better-sqlite3');
const path = require('path');

// ----------------------
// Update Type: Added
// Description: Created new Check Scripts JS for verifying script tags in blogs
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
const db = new Database(dbPath);

// Search for slug starting with 'ai-' based on the error log "blogs/ai-..."
const stmt = db.prepare("SELECT * FROM blogs WHERE slug LIKE 'ai-%'");
const blog = stmt.get();

if (blog) {
    console.log('Found Blog:');
    console.log('Title:', blog.title);
    console.log('Slug:', blog.slug);

    const content = blog.content || '';
    console.log('Content Length:', content.length);

    const hasScript = content.toLowerCase().includes('<script');
    console.log('Has <script> tag:', hasScript);

    if (hasScript) {
        console.log('Script tag locations:', content.match(/<script/gi));
        console.log('Snippet:', content.substring(content.toLowerCase().indexOf('<script'), content.toLowerCase().indexOf('<script') + 100));
    }
} else {
    console.log('No blog found with slug starting with ai-');

    // Check latest just in case
    const stmt2 = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC LIMIT 1');
    const latest = stmt2.get();
    if (latest) {
        console.log('Latest Blog:');
        console.log('Title:', latest.title);
        const hasScript = (latest.content || '').toLowerCase().includes('<script');
        console.log('Has <script> tag:', hasScript);
    }
}
