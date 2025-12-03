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

    const stack: string[] = [];
    let result = '';
    let lastIndex = 0;

    // Regex to match tags and comments
    // Note: This regex is not perfect for all HTML but covers most cases
    const tagRegex = /<!--[\s\S]*?-->|<\/?([a-z0-9]+)[^>]*>/gi;
    let match;

    while ((match = tagRegex.exec(html)) !== null) {
        // Append text content before the tag/comment
        result += html.substring(lastIndex, match.index);
        lastIndex = tagRegex.lastIndex;

        const fullMatch = match[0];

        // Handle comments - skip them
        if (fullMatch.startsWith('<!--')) {
            continue;
        }

        const tagName = match[1].toLowerCase();

        if (stripTags.has(tagName)) {
            // Skip this tag completely
            // To skip content, we need to find the closing tag and update lastIndex
            if (!fullMatch.startsWith('</')) { // Only for opening tags
                const closingTagRegex = new RegExp(`</${tagName}>`, 'i');
                const closingMatch = closingTagRegex.exec(html.substring(tagRegex.lastIndex));
                if (closingMatch) {
                    tagRegex.lastIndex += closingMatch.index + closingMatch[0].length;
                    lastIndex = tagRegex.lastIndex; // Update lastIndex to skip content
                }
            }
            continue;
        }

        if (voidTags.has(tagName)) {
            result += fullMatch;
            continue;
        }

        if (fullMatch.startsWith('</')) {
            // Closing tag
            if (stack.length > 0 && stack[stack.length - 1] === tagName) {
                stack.pop();
                result += fullMatch;
            } else {
                // Skip orphan closing tag
            }
        } else {
            // Opening tag
            stack.push(tagName);
            result += fullMatch;
        }
    }

    result += html.substring(lastIndex);

    // Append missing closing tags
    for (let i = stack.length - 1; i >= 0; i--) {
        result += `</${stack[i]}>`;
    }

    return result;
}
