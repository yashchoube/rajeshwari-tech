
const Database = require('better-sqlite3');
const path = require('path');

// ----------------------
// Update Type: Added
// Description: Created new Test Fix JS for testing HTML sanitization fix
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
const db = new Database(dbPath);

const stmt = db.prepare('SELECT content FROM blogs ORDER BY created_at DESC LIMIT 1');
const blog = stmt.get();

function sanitizeHtml(html) {
    if (!html) return '';

    const voidTags = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
    ]);

    const stack = [];
    const tagRegex = /<\/?([a-z0-9]+)[^>]*>/gi;

    let match;

    while ((match = tagRegex.exec(html)) !== null) {
        const fullTag = match[0];
        const tagName = match[1].toLowerCase();

        if (voidTags.has(tagName)) continue;

        if (fullTag.startsWith('</')) {
            if (stack.length > 0 && stack[stack.length - 1] === tagName) {
                stack.pop();
            }
        } else {
            stack.push(tagName);
        }
    }

    let fixedHtml = html;
    while (stack.length > 0) {
        const tagName = stack.pop();
        fixedHtml += `</${tagName}>`;
    }

    return fixedHtml;
}

if (blog && blog.content) {
    const content = blog.content;
    console.log('Original Content length:', content.length);

    const fixedContent = sanitizeHtml(content);
    console.log('Fixed Content length:', fixedContent.length);

    const openDivs = (fixedContent.match(/<div\b/gi) || []).length;
    const closeDivs = (fixedContent.match(/<\/div>/gi) || []).length;

    console.log('Fixed Open divs:', openDivs);
    console.log('Fixed Close divs:', closeDivs);

    if (openDivs !== closeDivs) {
        console.log('MISMATCH: Still unbalanced!');
    } else {
        console.log('Divs are now balanced.');
    }
} else {
    console.log('No content found.');
}
