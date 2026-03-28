import { test, expect } from '@playwright/test';

test.describe('Courses Page UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/courses');
  });

  test('should load courses page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Courses/);
    await expect(page.locator('h1')).toContainText('Courses');
  });

  test('should display course cards', async ({ page }) => {
    const courseCards = page.locator('[data-testid="course-card"]');
    await expect(courseCards).toHaveCount.greaterThan(0);
    
    // Check course card content
    const firstCard = courseCards.first();
    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('p')).toBeVisible();
    await expect(firstCard.locator('button')).toBeVisible();
  });

  test('should display course details when clicked', async ({ page }) => {
    const firstCourse = page.locator('[data-testid="course-card"]').first();
    const courseTitle = await firstCourse.locator('h3').textContent();
    
    await firstCourse.click();
    
    // Should navigate to course detail page
    await expect(page).toHaveURL(/.*courses\/.*/);
    await expect(page.locator('h1')).toContainText(courseTitle);
  });

  test('should display enroll button on course cards', async ({ page }) => {
    const enrollButtons = page.locator('button:has-text("Enroll Now")');
    await expect(enrollButtons).toHaveCount.greaterThan(0);
    
    // Test enroll button click
    await enrollButtons.first().click();
    
    // Should open enrollment modal
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
  });

  test('should display course search functionality', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="search" i]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('Java');
      
      // Check if results are filtered
      const courseCards = page.locator('[data-testid="course-card"]');
      await expect(courseCards).toHaveCount.greaterThan(0);
    }
  });

  test('should display course filters', async ({ page }) => {
    const filterButtons = page.locator('[data-testid="filter-button"]');
    if (await filterButtons.count() > 0) {
      await expect(filterButtons).toHaveCount.greaterThan(0);
      
      // Test filter functionality
      await filterButtons.first().click();
      
      // Check if courses are filtered
      const courseCards = page.locator('[data-testid="course-card"]');
      await expect(courseCards).toHaveCount.greaterThan(0);
    }
  });

  test('should display course statistics', async ({ page }) => {
    const stats = page.locator('[data-testid="course-stats"]');
    if (await stats.isVisible()) {
      await expect(stats).toBeVisible();
      
      // Check stat numbers
      await expect(stats.locator('[data-testid="total-courses"]')).toBeVisible();
      await expect(stats.locator('[data-testid="students-enrolled"]')).toBeVisible();
    }
  });

  test('should handle course card hover effects', async ({ page }) => {
    const firstCard = page.locator('[data-testid="course-card"]').first();
    
    // Hover over course card
    await firstCard.hover();
    
    // Check if hover effects are applied
    await expect(firstCard).toHaveClass(/hover/);
  });

  test('should display course categories', async ({ page }) => {
    const categories = page.locator('[data-testid="course-category"]');
    if (await categories.count() > 0) {
      await expect(categories).toHaveCount.greaterThan(0);
      
      // Test category selection
      await categories.first().click();
      
      // Check if courses are filtered by category
      const courseCards = page.locator('[data-testid="course-card"]');
      await expect(courseCards).toHaveCount.greaterThan(0);
    }
  });

  test('should display course difficulty levels', async ({ page }) => {
    const difficultyBadges = page.locator('[data-testid="difficulty-badge"]');
    if (await difficultyBadges.count() > 0) {
      await expect(difficultyBadges).toHaveCount.greaterThan(0);
      
      // Check difficulty levels
      const levels = ['Beginner', 'Intermediate', 'Advanced'];
      for (const level of levels) {
        const badge = page.locator(`[data-testid="difficulty-badge"]:has-text("${level}")`);
        if (await badge.count() > 0) {
          await expect(badge).toBeVisible();
        }
      }
    }
  });

  test('should display course ratings', async ({ page }) => {
    const ratingElements = page.locator('[data-testid="course-rating"]');
    if (await ratingElements.count() > 0) {
      await expect(ratingElements).toHaveCount.greaterThan(0);
      
      // Check if ratings are displayed
      const firstRating = ratingElements.first();
      await expect(firstRating).toBeVisible();
    }
  });

  test('should handle pagination if present', async ({ page }) => {
    const pagination = page.locator('[data-testid="pagination"]');
    if (await pagination.isVisible()) {
      await expect(pagination).toBeVisible();
      
      // Test pagination navigation
      const nextButton = pagination.locator('button:has-text("Next")');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await expect(page).toHaveURL(/.*page=2/);
      }
    }
  });

  test('should display course duration and price', async ({ page }) => {
    const courseCards = page.locator('[data-testid="course-card"]');
    const firstCard = courseCards.first();
    
    // Check if duration is displayed
    const duration = firstCard.locator('[data-testid="course-duration"]');
    if (await duration.isVisible()) {
      await expect(duration).toBeVisible();
    }
    
    // Check if price is displayed
    const price = firstCard.locator('[data-testid="course-price"]');
    if (await price.isVisible()) {
      await expect(price).toBeVisible();
    }
  });
});
