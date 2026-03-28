
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// ----------------------
// Update Type: Added
// Description: Created new Dump Blog JS for dumping blog content to file
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
const db = new Database(dbPath);

const slug = 'ai-llm-1764428546444';
const stmt = db.prepare('SELECT * FROM blogs WHERE slug = ?');
const blog = stmt.get(slug);

if (blog) {
    console.log('Found Blog:', blog.title);
    console.log('Content Length:', blog.content ? blog.content.length : 0);

    if (blog.content) {
        fs.writeFileSync('blog_content_dump.html', blog.content);
        console.log('Content dumped to blog_content_dump.html');
    } else {
        console.log('Content is null or empty');
    }
} else {
    console.log('Blog not found');
}
