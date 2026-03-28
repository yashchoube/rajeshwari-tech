

// ----------------------
// Update Type: Added
// Description: Created new Test Strip JS for testing tag stripping
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

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

    const tagRegex = /<\/?([a-z0-9]+)[^>]*>/gi;
    let match;

    while ((match = tagRegex.exec(html)) !== null) {
        result += html.substring(lastIndex, match.index);
        lastIndex = tagRegex.lastIndex;

        const fullTag = match[0];
        const tagName = match[1].toLowerCase();

        if (stripTags.has(tagName)) {
            if (!fullTag.startsWith('</')) {
                // To correctly strip content including nested tags, we need to find the corresponding closing tag.
                // This requires a more robust parsing than a simple regex for nested structures.
                // For simplicity and to match the original intent of finding the *next* closing tag,
                // we'll keep the regex but acknowledge its limitation for deeply nested identical tags.
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
            result += fullTag;
            continue;
        }

        if (fullTag.startsWith('</')) {
            if (stack.length > 0 && stack[stack.length - 1] === tagName) {
                stack.pop();
                result += fullTag;
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
    { input: '<div><script>alert("xss")</script>Hello</div>', expected: '<div>Hello</div>' },
    { input: '<div><style>body { color: red; }</style>Hello</div>', expected: '<div>Hello</div>' },
    { input: '<p>Hello <iframe src="evil.com"></iframe>World</p>', expected: '<p>Hello World</p>' },
    { input: '<div><script>nested <script> tags?</script></div>', expected: '<div></div>' }, // Simple regex might fail nested, but let's see
    { input: '<div>Normal content</div>', expected: '<div>Normal content</div>' },
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
