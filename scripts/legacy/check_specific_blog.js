const Database = require('better-sqlite3');
const path = require('path');

// ----------------------
// Update Type: Added
// Description: Created new Check Specific Blog JS for verifying specific blog content
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
const db = new Database(dbPath);

function sanitizeHtml(html) {
    if (!html) return '';

    const voidTags = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
    ]);

    const stripTags = new Set(['script', 'style', 'iframe', 'object', 'embed', 'form']);

    const stack = [];
    let result = '';
    let lastIndex = 0;

    const tagRegex = /<!--[\s\S]*?-->|<\/?([a-z0-9]+)[^>]*>/gi;
    let match;

    while ((match = tagRegex.exec(html)) !== null) {
        result += html.substring(lastIndex, match.index);
        lastIndex = tagRegex.lastIndex;

        const fullMatch = match[0];

        if (fullMatch.startsWith('<!--')) {
            continue;
        }

        const tagName = match[1].toLowerCase();

        if (stripTags.has(tagName)) {
            if (!fullMatch.startsWith('</')) {
                const closingTagRegex = new RegExp(`</${tagName}>`, 'i');
                const closingMatch = closingTagRegex.exec(html.substring(tagRegex.lastIndex));
                if (closingMatch) {
                    tagRegex.lastIndex += closingMatch.index + closingMatch[0].length;
                    lastIndex = tagRegex.lastIndex;
                }
            }
            continue;
        }

        if (voidTags.has(tagName)) {
            result += fullMatch;
            continue;
        }

        if (fullMatch.startsWith('</')) {
            if (stack.length > 0 && stack[stack.length - 1] === tagName) {
                stack.pop();
                result += fullMatch;
            }
        } else {
            stack.push(tagName);
            result += fullMatch;
        }
    }

    result += html.substring(lastIndex);

    for (let i = stack.length - 1; i >= 0; i--) {
        result += `</${stack[i]}>`;
    }

    return result;
}

// Search for slug starting with 'gvd'
const stmt = db.prepare("SELECT * FROM blogs WHERE slug LIKE 'gvd%'");
const blog = stmt.get();

if (blog) {
    console.log('Found Blog:');
    console.log('Title:', blog.title);
    console.log('Slug:', blog.slug);
    console.log('Content Length:', blog.content ? blog.content.length : 0);

    const content = blog.content || '';
    console.log('Original Content Check:');
    const openDivs = (content.match(/<div\b/gi) || []).length;
    const closeDivs = (content.match(/<\/div>/gi) || []).length;
    console.log(`Divs: ${openDivs} open, ${closeDivs} close`);

    const fixed = sanitizeHtml(content);
    console.log('Fixed Content Check:');
    const fixedOpen = (fixed.match(/<div\b/gi) || []).length;
    const fixedClose = (fixed.match(/<\/div>/gi) || []).length;
    console.log(`Divs: ${fixedOpen} open, ${fixedClose} close`);
    console.log('Fixed Length:', fixed.length);

    if (fixedOpen === fixedClose) {
        console.log('SUCCESS: Content is balanced.');
    } else {
        console.log('FAILURE: Content is still unbalanced.');
    }
} else {
    console.log('No blog found with slug starting with gvd');
}
