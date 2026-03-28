import { test, expect } from '@playwright/test';

test.describe('Header Dropdown Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('should open and close courses dropdown on hover', async ({ page }) => {
    // Hover over courses dropdown
    await page.hover('button:has-text("Courses")');
    
    // Check if dropdown is visible
    const coursesDropdown = page.locator('[data-dropdown="courses"] .absolute');
    await expect(coursesDropdown).toBeVisible();
    
    // Check if chevron is rotated
    const chevron = page.locator('[data-dropdown="courses"] .rotate-180');
    await expect(chevron).toBeVisible();
    
    // Move mouse away from dropdown
    await page.mouse.move(0, 0);
    
    // Wait for dropdown to close
    await page.waitForTimeout(200);
    await expect(coursesDropdown).not.toBeVisible();
  });

  test('should open and close services dropdown on hover', async ({ page }) => {
    // Hover over services dropdown
    await page.hover('button:has-text("Services")');
    
    // Check if dropdown is visible
    const servicesDropdown = page.locator('[data-dropdown="services"] .absolute');
    await expect(servicesDropdown).toBeVisible();
    
    // Check if chevron is rotated
    const chevron = page.locator('[data-dropdown="services"] .rotate-180');
    await expect(chevron).toBeVisible();
    
    // Move mouse away from dropdown
    await page.mouse.move(0, 0);
    
    // Wait for dropdown to close
    await page.waitForTimeout(200);
    await expect(servicesDropdown).not.toBeVisible();
  });

  test('should close dropdown when clicking outside', async ({ page }) => {
    // Open courses dropdown
    await page.hover('button:has-text("Courses")');
    const coursesDropdown = page.locator('[data-dropdown="courses"] .absolute');
    await expect(coursesDropdown).toBeVisible();
    
    // Click outside the dropdown
    await page.click('body', { position: { x: 10, y: 10 } });
    
    // Check if dropdown is closed
    await expect(coursesDropdown).not.toBeVisible();
  });

  test('should close dropdown when pressing Escape key', async ({ page }) => {
    // Open courses dropdown
    await page.hover('button:has-text("Courses")');
    const coursesDropdown = page.locator('[data-dropdown="courses"] .absolute');
    await expect(coursesDropdown).toBeVisible();
    
    // Press Escape key
    await page.keyboard.press('Escape');
    
    // Check if dropdown is closed
    await expect(coursesDropdown).not.toBeVisible();
  });

  test('should not get stuck when quickly moving mouse in and out', async ({ page }) => {
    // Rapidly hover in and out of courses dropdown
    for (let i = 0; i < 5; i++) {
      await page.hover('button:has-text("Courses")');
      await page.mouse.move(0, 0);
      await page.waitForTimeout(50);
    }
    
    // Check that dropdown is closed
    const coursesDropdown = page.locator('[data-dropdown="courses"] .absolute');
    await expect(coursesDropdown).not.toBeVisible();
  });

  test('should close dropdown when opening mobile menu', async ({ page }) => {
    // Open courses dropdown
    await page.hover('button:has-text("Courses")');
    const coursesDropdown = page.locator('[data-dropdown="courses"] .absolute');
    await expect(coursesDropdown).toBeVisible();
    
    // Open mobile menu
    await page.click('button[aria-label="Menu"]');
    
    // Check that dropdown is closed
    await expect(coursesDropdown).not.toBeVisible();
  });

  test('should display course links in dropdown', async ({ page }) => {
    // Open courses dropdown
    await page.hover('button:has-text("Courses")');
    
    // Check if course links are visible
    const courseLinks = page.locator('[data-dropdown="courses"] a');
    await expect(courseLinks).toHaveCount.greaterThan(0);
    
    // Check specific course links
    await expect(page.locator('a[href="/courses/core-java-advanced"]')).toBeVisible();
    await expect(page.locator('a[href="/courses/python-fullstack"]')).toBeVisible();
  });

  test('should display service links in dropdown', async ({ page }) => {
    // Open services dropdown
    await page.hover('button:has-text("Services")');
    
    // Check if service links are visible
    const serviceLinks = page.locator('[data-dropdown="services"] a');
    await expect(serviceLinks).toHaveCount.greaterThan(0);
    
    // Check specific service links
    await expect(page.locator('a[href="/services/corporate"]')).toBeVisible();
    await expect(page.locator('a[href="/services/freelance"]')).toBeVisible();
  });

  test('should navigate to course page when clicking course link', async ({ page }) => {
    // Open courses dropdown
    await page.hover('button:has-text("Courses")');
    
    // Click on first course link
    await page.click('a[href="/courses/core-java-advanced"]');
    
    // Check if navigated to course page
    await expect(page).toHaveURL(/.*courses\/core-java-advanced/);
  });

  test('should navigate to service page when clicking service link', async ({ page }) => {
    // Open services dropdown
    await page.hover('button:has-text("Services")');
    
    // Click on first service link
    await page.click('a[href="/services/corporate"]');
    
    // Check if navigated to service page
    await expect(page).toHaveURL(/.*services\/corporate/);
  });

  test('should handle dropdown hover with proper timing', async ({ page }) => {
    // Test the hover delay
    await page.hover('button:has-text("Courses")');
    const coursesDropdown = page.locator('[data-dropdown="courses"] .absolute');
    await expect(coursesDropdown).toBeVisible();
    
    // Move mouse to dropdown content
    await page.hover('[data-dropdown="courses"] .absolute');
    await expect(coursesDropdown).toBeVisible();
    
    // Move mouse away
    await page.mouse.move(0, 0);
    
    // Wait for the delay
    await page.waitForTimeout(200);
    await expect(coursesDropdown).not.toBeVisible();
  });
});
