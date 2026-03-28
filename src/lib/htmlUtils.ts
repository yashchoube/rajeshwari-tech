// typescript
// ----------------------
// Update Type: Added
// Description: Created new HTML Utils for sanitizing HTML content
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------
/**
 * Simple HTML tag balancer to prevent hydration errors
 */
export function sanitizeHtml(html: string): string {
    if (!html) return '';

    // List of void tags that don't need closing
    const voidTags = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
    ]);

    // Tags to completely remove (including content)
    const stripTags = new Set(['script', 'style', 'iframe', 'object', 'embed', 'form']);

    // Map of attributes to allow for specific tags
    const allowedAttributes: Record<string, string[]> = {
        'a': ['href', 'target', 'rel', 'title'],
        'img': ['src', 'alt', 'width', 'height', 'loading'],
        'td': ['colspan', 'rowspan'],
        'th': ['colspan', 'rowspan']
    };

    const stack: string[] = [];
    let result = '';
    let lastIndex = 0;

    // Regex to match tags and comments
    const tagRegex = /<!--[\s\S]*?-->|<\/?([a-z0-9]+)(\s+[^>]*)?>/gi;
    let match;

    while ((match = tagRegex.exec(html)) !== null) {
        // Append text content before the tag
        result += html.substring(lastIndex, match.index);
        lastIndex = tagRegex.lastIndex;

        const fullMatch = match[0];

        // Handle comments - skip them
        if (fullMatch.startsWith('<!--')) {
            continue;
        }

        const tagName = match[1].toLowerCase();
        const rawAttrs = match[2] || '';

        // Handle closing tags
        if (fullMatch.startsWith('</')) {
            if (stack.length > 0 && stack[stack.length - 1] === tagName) {
                stack.pop();
                result += `</${tagName}>`;
            }
            continue;
        }

        // Handle tags to strip completely
        if (stripTags.has(tagName)) {
            // Find closing tag to skip content
            const closingTagRegex = new RegExp(`</${tagName}>`, 'i');
            const closingMatch = closingTagRegex.exec(html.substring(tagRegex.lastIndex));
            if (closingMatch) {
                tagRegex.lastIndex += closingMatch.index + closingMatch[0].length;
                lastIndex = tagRegex.lastIndex;
            }
            continue;
        }

        // Process Attributes
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

        // Handle void tags
        if (voidTags.has(tagName)) {
            result += `<${tagName}${cleanAttrs} />`;
            continue;
        }

        // Handle normal opening tags
        stack.push(tagName);
        result += `<${tagName}${cleanAttrs}>`;
    }

    // Append remaining text
    result += html.substring(lastIndex);

    // Append missing closing tags
    for (let i = stack.length - 1; i >= 0; i--) {
        result += `</${stack[i]}>`;
    }

    return result;
}
