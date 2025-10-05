import { test, expect } from '@playwright/test';

test.describe('Enroll Modal Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/courses');
  });

  test('should open enroll modal when enroll button is clicked', async ({ page }) => {
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
  });

  test('should display modal form fields', async ({ page }) => {
    // Open modal
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Check form fields
    await expect(modal.locator('input[name="name"]')).toBeVisible();
    await expect(modal.locator('input[name="email"]')).toBeVisible();
    await expect(modal.locator('input[name="phone"]')).toBeVisible();
    await expect(modal.locator('select[name="experience"]')).toBeVisible();
    await expect(modal.locator('textarea[name="goals"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Open modal
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Try to submit without filling required fields
    const submitButton = modal.locator('button[type="submit"]');
    await submitButton.click();
    
    // Check for validation errors
    const errorMessages = modal.locator('[data-testid="error-message"]');
    await expect(errorMessages).toHaveCount.greaterThan(0);
  });

  test('should submit form with valid data', async ({ page }) => {
    // Open modal
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Fill form with valid data
    await modal.locator('input[name="name"]').fill('Test Student');
    await modal.locator('input[name="email"]').fill('test@example.com');
    await modal.locator('input[name="phone"]').fill('+1234567890');
    await modal.locator('select[name="experience"]').selectOption('beginner');
    await modal.locator('textarea[name="goals"]').fill('Learn new skills');
    
    // Submit form
    const submitButton = modal.locator('button[type="submit"]');
    await submitButton.click();
    
    // Check for success message
    const successMessage = modal.locator('[data-testid="success-message"]');
    await expect(successMessage).toBeVisible();
  });

  test('should close modal when close button is clicked', async ({ page }) => {
    // Open modal
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Click close button
    const closeButton = modal.locator('[data-testid="close-button"]');
    await closeButton.click();
    
    // Modal should be hidden
    await expect(modal).not.toBeVisible();
  });

  test('should close modal when clicking outside', async ({ page }) => {
    // Open modal
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Click outside modal
    await page.click('body', { position: { x: 10, y: 10 } });
    
    // Modal should be hidden
    await expect(modal).not.toBeVisible();
  });

  test('should close modal when escape key is pressed', async ({ page }) => {
    // Open modal
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Press escape key
    await page.keyboard.press('Escape');
    
    // Modal should be hidden
    await expect(modal).not.toBeVisible();
  });

  test('should display loading state during submission', async ({ page }) => {
    // Open modal
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Fill form
    await modal.locator('input[name="name"]').fill('Test Student');
    await modal.locator('input[name="email"]').fill('test@example.com');
    await modal.locator('input[name="phone"]').fill('+1234567890');
    await modal.locator('select[name="experience"]').selectOption('beginner');
    await modal.locator('textarea[name="goals"]').fill('Learn new skills');
    
    // Submit form
    const submitButton = modal.locator('button[type="submit"]');
    await submitButton.click();
    
    // Check for loading state
    const loadingSpinner = modal.locator('[data-testid="loading-spinner"]');
    await expect(loadingSpinner).toBeVisible();
  });

  test('should handle form validation errors', async ({ page }) => {
    // Open modal
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Fill form with invalid data
    await modal.locator('input[name="name"]').fill('');
    await modal.locator('input[name="email"]').fill('invalid-email');
    await modal.locator('input[name="phone"]').fill('');
    
    // Submit form
    const submitButton = modal.locator('button[type="submit"]');
    await submitButton.click();
    
    // Check for validation errors
    const errorMessages = modal.locator('[data-testid="error-message"]');
    await expect(errorMessages).toHaveCount.greaterThan(0);
  });

  test('should display course information in modal', async ({ page }) => {
    // Open modal
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Check if course information is displayed
    const courseInfo = modal.locator('[data-testid="course-info"]');
    await expect(courseInfo).toBeVisible();
    
    // Check course title
    const courseTitle = courseInfo.locator('h3');
    await expect(courseTitle).toBeVisible();
  });

  test('should handle form step navigation if multi-step', async ({ page }) => {
    // Open modal
    const enrollButton = page.locator('button:has-text("Enroll Now")').first();
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Check if it's a multi-step form
    const steps = modal.locator('[data-testid="form-step"]');
    if (await steps.count() > 1) {
      // Test step navigation
      const nextButton = modal.locator('button:has-text("Next")');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        
        // Check if we're on the next step
        const currentStep = modal.locator('[data-testid="current-step"]');
        await expect(currentStep).toBeVisible();
      }
    }
  });
});
