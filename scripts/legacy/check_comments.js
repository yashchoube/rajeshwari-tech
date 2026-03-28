
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
const db = new Database(dbPath);

const stmt = db.prepare("SELECT * FROM blogs WHERE slug LIKE 'gvd%'");
const blog = stmt.get();

if (blog) {
    console.log('Found Blog:', blog.title);
    const content = blog.content || '';

    const commentStart = (content.match(/<!--/g) || []).length;
    const commentEnd = (content.match(/-->/g) || []).length;

    console.log(`Comments: ${commentStart} start, ${commentEnd} end`);

    if (commentStart !== commentEnd) {
        console.log('WARNING: Unbalanced comments detected!');
    }

    // Also check for unclosed comment at the end
    if (content.lastIndexOf('<!--') > content.lastIndexOf('-->')) {
        console.log('WARNING: Last comment is unclosed!');
    }
}
