import { test, expect } from '@playwright/test';

test.describe('Homepage UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/RajeshwariTech/);
    await expect(page.locator('h1')).toContainText('RajeshwariTech');
  });

  test('should display navigation menu', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check main navigation items
    await expect(page.locator('a[href="/"]')).toBeVisible();
    await expect(page.locator('a[href="/courses"]')).toBeVisible();
    await expect(page.locator('a[href="/blogs"]')).toBeVisible();
    await expect(page.locator('a[href="/contact"]')).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    
    // Check hero content
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('p')).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    const features = page.locator('[data-testid="features"]');
    await expect(features).toBeVisible();
    
    // Check feature cards
    const featureCards = page.locator('[data-testid="feature-card"]');
    await expect(featureCards).toHaveCount(3);
  });

  test('should display statistics section', async ({ page }) => {
    const stats = page.locator('[data-testid="statistics"]');
    await expect(stats).toBeVisible();
    
    // Check stat numbers
    await expect(page.locator('[data-testid="students-trained"]')).toBeVisible();
    await expect(page.locator('[data-testid="placement-rate"]')).toBeVisible();
    await expect(page.locator('[data-testid="experience-years"]')).toBeVisible();
  });

  test('should display courses section', async ({ page }) => {
    const courses = page.locator('[data-testid="courses"]');
    await expect(courses).toBeVisible();
    
    // Check course cards
    const courseCards = page.locator('[data-testid="course-card"]');
    await expect(courseCards).toHaveCount.greaterThan(0);
  });

  test('should display testimonials section', async ({ page }) => {
    const testimonials = page.locator('[data-testid="testimonials"]');
    await expect(testimonials).toBeVisible();
    
    // Check testimonial cards
    const testimonialCards = page.locator('[data-testid="testimonial-card"]');
    await expect(testimonialCards).toHaveCount.greaterThan(0);
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check footer links
    await expect(page.locator('footer a')).toHaveCount.greaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile navigation
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
  });

  test('should handle navigation clicks', async ({ page }) => {
    // Test navigation to courses
    await page.click('a[href="/courses"]');
    await expect(page).toHaveURL(/.*courses/);
    
    // Go back to homepage
    await page.goto('http://localhost:3001');
    
    // Test navigation to blogs
    await page.click('a[href="/blogs"]');
    await expect(page).toHaveURL(/.*blogs/);
  });

  test('should handle scroll behavior', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check if footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    
    // Check if hero section is visible
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });
});
