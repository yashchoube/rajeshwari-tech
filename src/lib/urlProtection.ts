// URL enumeration protection
export function validateSlug(slug: string): boolean {
  // Only allow alphanumeric characters, hyphens, and underscores
  const slugRegex = /^[a-zA-Z0-9-_]+$/;
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 100;
}

export function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-') // Replace invalid chars with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .substring(0, 100); // Limit length
}

export function validateBlogSlug(slug: string): boolean {
  // More restrictive for blog slugs
  const blogSlugRegex = /^[a-z0-9-]+$/;
  return blogSlugRegex.test(slug) && slug.length >= 3 && slug.length <= 50;
}

export function validateId(id: string | number): boolean {
  // Validate numeric IDs
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  return Number.isInteger(numId) && numId > 0 && numId < 2147483647; // Max 32-bit int
}

export function validateCategory(category: string): boolean {
  const allowedCategories = [
    'Programming', 'Technology', 'Career', 'Tutorials', 'Industry Insights'
  ];
  return allowedCategories.includes(category);
}

export function validateStatus(status: string): boolean {
  const allowedStatuses = [
    'pending', 'confirmed', 'enrolled', 'completed', 'cancelled'
  ];
  return allowedStatuses.includes(status);
}
