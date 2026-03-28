
const { Validator } = require('./src/lib/validation');

// ----------------------
// Update Type: Added
// Description: Created new Test Validation JS for testing validation logic
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

const validator = new Validator();
const largeContent = 'a'.repeat(5000); // 5000 characters
const sanitized = validator.sanitizeInput('content', largeContent);

console.log('Original Length:', largeContent.length);
console.log('Sanitized Length:', sanitized.length);

if (sanitized.length === largeContent.length) {
    console.log('SUCCESS: Content was not truncated.');
} else {
    console.log('FAILURE: Content was truncated.');
}

const shortExcerpt = 'a'.repeat(6000);
const sanitizedExcerpt = validator.sanitizeInput('excerpt', shortExcerpt);
console.log('Excerpt Original:', shortExcerpt.length);
console.log('Excerpt Sanitized:', sanitizedExcerpt.length);
if (sanitizedExcerpt.length === 5000) {
    console.log('SUCCESS: Excerpt truncated correctly.');
} else {
    console.log('FAILURE: Excerpt truncation failed.');
}
