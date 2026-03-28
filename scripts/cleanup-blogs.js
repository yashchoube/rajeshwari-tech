const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data/rajeshwari-tech.db');
const db = new Database(dbPath);

// Include the logic from sanitizeHtml directly to avoid import issues
function sanitizeHtml(html) {
    if (!html) return '';

    const voidTags = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
    ]);

    const stripTags = new Set(['script', 'style', 'iframe', 'object', 'embed', 'form']);

    const allowedAttributes = {
        'a': ['href', 'target', 'rel', 'title'],
        'img': ['src', 'alt', 'width', 'height', 'loading'],
        'td': ['colspan', 'rowspan'],
        'th': ['colspan', 'rowspan']
    };

    const stack = [];
    let result = '';
    let lastIndex = 0;

    const tagRegex = /<!--[\s\S]*?-->|<\/?([a-z0-9]+)(\s+[^>]*)?>/gi;
    let match;

    while ((match = tagRegex.exec(html)) !== null) {
        result += html.substring(lastIndex, match.index);
        lastIndex = tagRegex.lastIndex;

        const fullMatch = match[0];
        if (fullMatch.startsWith('<!--')) continue;

        const tagName = match[1].toLowerCase();
        const rawAttrs = match[2] || '';

        if (fullMatch.startsWith('</')) {
            if (stack.length > 0 && stack[stack.length - 1] === tagName) {
                stack.pop();
                result += `</${tagName}>`;
            }
            continue;
        }

        if (stripTags.has(tagName)) {
            const closingTagRegex = new RegExp(`</${tagName}>`, 'i');
            const closingMatch = closingTagRegex.exec(html.substring(tagRegex.lastIndex));
            if (closingMatch) {
                tagRegex.lastIndex += closingMatch.index + closingMatch[0].length;
                lastIndex = tagRegex.lastIndex;
            }
            continue;
        }

        let cleanAttrs = '';
        if (rawAttrs) {
            const attrRegex = /([a-z0-9-]+)=(['"])(.*?)\2/gi;
            let attrMatch;
            const allowed = allowedAttributes[tagName] || [];

            while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
                const attrName = attrMatch[1].toLowerCase();
                if (allowed.includes(attrName)) {
                    cleanAttrs += ` ${attrMatch[1]}=${attrMatch[2]}${attrMatch[3]}${attrMatch[2]}`;
                }
            }
        }

        if (voidTags.has(tagName)) {
            result += `<${tagName}${cleanAttrs} />`;
            continue;
        }

        stack.push(tagName);
        result += `<${tagName}${cleanAttrs}>`;
    }

    result += html.substring(lastIndex);
    for (let i = stack.length - 1; i >= 0; i--) {
        result += `</${stack[i]}>`;
    }

    return result;
}

function cleanup() {
  console.log('--- Starting Blog Content Cleanup (Standalone) ---');
  
  const blogs = db.prepare('SELECT id, title, content FROM blogs').all();
  console.log(`Found ${blogs.length} blogs to check.`);

  let updatedCount = 0;

  for (const blog of blogs) {
    const originalContent = blog.content;
    const cleanContent = sanitizeHtml(originalContent);

    if (originalContent !== cleanContent) {
      console.log(`Cleaning blog [${blog.id}]: ${blog.title}`);
      db.prepare('UPDATE blogs SET content = ? WHERE id = ?').run(cleanContent, blog.id);
      updatedCount++;
    }
  }

  console.log(`--- Cleanup Finished: ${updatedCount} blogs updated ---`);
}

cleanup();
