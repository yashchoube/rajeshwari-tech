

// ----------------------
// Update Type: Added
// Description: Created new Test Fix Robust JS for robust HTML sanitization testing
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

function sanitizeHtml(html) {
    if (!html) return '';

    const voidTags = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
    ]);

    const stack = [];
    let result = '';
    let lastIndex = 0;

    const tagRegex = /<\/?([a-z0-9]+)[^>]*>/gi;
    let match;

    while ((match = tagRegex.exec(html)) !== null) {
        result += html.substring(lastIndex, match.index);
        lastIndex = tagRegex.lastIndex;

        const fullTag = match[0];
        const tagName = match[1].toLowerCase();

        if (voidTags.has(tagName)) {
            result += fullTag;
            continue;
        }

        if (fullTag.startsWith('</')) {
            if (stack.length > 0 && stack[stack.length - 1] === tagName) {
                stack.pop();
                result += fullTag;
            } else {
                // Skip orphan closing tag
            }
        } else {
            stack.push(tagName);
            result += fullTag;
        }
    }

    result += html.substring(lastIndex);

    for (let i = stack.length - 1; i >= 0; i--) {
        result += `</${stack[i]}>`;
    }

    return result;
}

const testCases = [
    { input: '<div><p>Hello</div>', expected: '<div><p>Hello</p></div>' }, // Unclosed inner
    { input: '<div><p>Hello</p></div>', expected: '<div><p>Hello</p></div>' }, // Correct
    { input: '<div>Hello</div></div>', expected: '<div>Hello</div>' }, // Extra closing
    { input: '<div><p>Hello</div></p>', expected: '<div><p>Hello</p></div>' }, // Mismatched closing (p closed by div?, no, div closes p implicitly? No, our logic skips </div> because top is p. Then skips </p> because top is div? No wait.)
    // Trace <div><p>Hello</div></p>:
    // 1. <div> -> stack: [div]
    // 2. <p> -> stack: [div, p]
    // 3. </div> -> top is p. Mismatch. Skip </div>. stack: [div, p]
    // 4. </p> -> top is p. Match. Pop p. stack: [div]. Output: <div><p>Hello</p>
    // End. Stack has [div]. Append </div>. Result: <div><p>Hello</p></div>.
    // This is actually a valid repair!

    { input: '</div><div>Hello</div>', expected: '<div>Hello</div>' }, // Leading closing
];

testCases.forEach((tc, i) => {
    const output = sanitizeHtml(tc.input);
    console.log(`Case ${i + 1}:`);
    console.log(`Input:    ${tc.input}`);
    console.log(`Output:   ${output}`);
    console.log(`Expected: ${tc.expected}`);
    console.log(`Pass:     ${output === tc.expected}`);
    console.log('---');
});

// Test on actual DB content
const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
const db = new Database(dbPath);
const stmt = db.prepare('SELECT content FROM blogs ORDER BY created_at DESC LIMIT 1');
const blog = stmt.get();

if (blog && blog.content) {
    console.log('DB Content Test:');
    const fixed = sanitizeHtml(blog.content);
    console.log('Original length:', blog.content.length);
    console.log('Fixed length:   ', fixed.length);
    // Check for balanced divs in fixed content
    const openDivs = (fixed.match(/<div\b/gi) || []).length;
    const closeDivs = (fixed.match(/<\/div>/gi) || []).length;
    console.log(`Divs: ${openDivs} open, ${closeDivs} close`);
}
