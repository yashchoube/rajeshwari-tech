
const Database = require('better-sqlite3');
const path = require('path');

// ----------------------
// Update Type: Added
// Description: Created new Check HTML Script for verifying HTML content structure
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
const db = new Database(dbPath);

const stmt = db.prepare('SELECT content FROM blogs ORDER BY created_at DESC LIMIT 1');
const blog = stmt.get();

if (blog && blog.content) {
    const content = blog.content;
    console.log('Content length:', content.length);

    // Simple check for balanced divs
    const openDivs = (content.match(/<div\b/gi) || []).length;
    const closeDivs = (content.match(/<\/div>/gi) || []).length;

    console.log('Open divs:', openDivs);
    console.log('Close divs:', closeDivs);

    if (openDivs !== closeDivs) {
        console.log('MISMATCH: Unbalanced divs detected!');
    } else {
        console.log('Divs appear balanced.');
    }
} else {
    console.log('No content found.');
}
