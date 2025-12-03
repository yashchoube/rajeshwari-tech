/**
 * Utility functions for handling blog images with fallback support
 */

// ----------------------
// Update Type: Added
// Description: Created new Image Utils for handling image validation and fallbacks
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

/**
 * Default placeholder image path
 */
export const BLOG_PLACEHOLDER = '/images/blog-placeholder.svg';

/**
 * Handle image loading errors by setting a fallback placeholder
 * @param event - The error event from the img element
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.currentTarget;
    if (img.src !== BLOG_PLACEHOLDER) {
        img.src = BLOG_PLACEHOLDER;
        img.onerror = null; // Prevent infinite loop if placeholder also fails
    }
};

/**
 * Get image URL with validation
 * @param url - The image URL to validate
 * @returns The validated URL or placeholder if invalid
 */
export const getValidImageUrl = (url: string | undefined | null): string => {
    if (!url || url.trim() === '') {
        return BLOG_PLACEHOLDER;
    }
    return url;
};

/**
 * Check if an image URL is valid and exists
 * @param url - The image URL to check
 * @returns Promise that resolves to true if image exists, false otherwise
 */
export const checkImageExists = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
};
