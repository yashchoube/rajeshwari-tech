import { test, expect } from '@playwright/test';

test.describe('End-to-End User Journey Tests', () => {
  test('complete user journey from homepage to enrollment', async ({ page }) => {
    // Step 1: Visit homepage
    await page.goto('http://localhost:3001');
    await expect(page).toHaveTitle(/RajeshwariTech/);
    
    // Step 2: Navigate to courses
    await page.click('a[href="/courses"]');
    await expect(page).toHaveURL(/.*courses/);
    
    // Step 3: View course details
    const firstCourse = page.locator('[data-testid="course-card"]').first();
    const courseTitle = await firstCourse.locator('h3').textContent();
    await firstCourse.click();
    await expect(page).toHaveURL(/.*courses\/.*/);
    await expect(page.locator('h1')).toContainText(courseTitle);
    
    // Step 4: Enroll in course
    const enrollButton = page.locator('button:has-text("Enroll Now")');
    await enrollButton.click();
    
    const modal = page.locator('[data-testid="enroll-modal"]');
    await expect(modal).toBeVisible();
    
    // Step 5: Fill enrollment form
    await modal.locator('input[name="name"]').fill('Test Student');
    await modal.locator('input[name="email"]').fill('test@example.com');
    await modal.locator('input[name="phone"]').fill('+1234567890');
    await modal.locator('select[name="experience"]').selectOption('beginner');
    await modal.locator('textarea[name="goals"]').fill('Learn new skills');
    
    // Step 6: Submit enrollment
    const submitButton = modal.locator('button[type="submit"]');
    await submitButton.click();
    
    // Step 7: Verify success
    const successMessage = modal.locator('[data-testid="success-message"]');
    await expect(successMessage).toBeVisible();
  });

  test('complete blog reading journey', async ({ page }) => {
    // Step 1: Visit homepage
    await page.goto('http://localhost:3001');
    
    // Step 2: Navigate to blogs
    await page.click('a[href="/blogs"]');
    await expect(page).toHaveURL(/.*blogs/);
    
    // Step 3: View blog list
    const blogCards = page.locator('[data-testid="blog-card"]');
    await expect(blogCards).toHaveCount.greaterThan(0);
    
    // Step 4: Click on first blog
    const firstBlog = blogCards.first();
    const blogTitle = await firstBlog.locator('h3').textContent();
    await firstBlog.click();
    
    // Step 5: Read blog content
    await expect(page.locator('h1')).toContainText(blogTitle);
    await expect(page.locator('[data-testid="blog-content"]')).toBeVisible();
    
    // Step 6: Check blog metadata
    await expect(page.locator('[data-testid="blog-author"]')).toBeVisible();
    await expect(page.locator('[data-testid="blog-date"]')).toBeVisible();
    await expect(page.locator('[data-testid="blog-category"]')).toBeVisible();
  });

  test('complete newsletter subscription journey', async ({ page }) => {
    // Step 1: Visit homepage
    await page.goto('http://localhost:3001');
    
    // Step 2: Find newsletter subscription form
    const newsletterForm = page.locator('[data-testid="newsletter-form"]');
    await expect(newsletterForm).toBeVisible();
    
    // Step 3: Fill subscription form
    await newsletterForm.locator('input[name="email"]').fill('newsletter@example.com');
    await newsletterForm.locator('input[name="name"]').fill('Newsletter Subscriber');
    
    // Step 4: Select interests
    const interestCheckboxes = newsletterForm.locator('input[type="checkbox"]');
    await interestCheckboxes.first().check();
    
    // Step 5: Submit subscription
    const subscribeButton = newsletterForm.locator('button[type="submit"]');
    await subscribeButton.click();
    
    // Step 6: Verify success message
    const successMessage = page.locator('[data-testid="subscription-success"]');
    await expect(successMessage).toBeVisible();
  });

  test('complete service enquiry journey', async ({ page }) => {
    // Step 1: Visit homepage
    await page.goto('http://localhost:3001');
    
    // Step 2: Navigate to services
    await page.hover('a:has-text("Services")');
    await page.click('a[href="/services/corporate"]');
    await expect(page).toHaveURL(/.*services\/corporate/);
    
    // Step 3: Find enquiry form
    const enquiryForm = page.locator('[data-testid="enquiry-form"]');
    await expect(enquiryForm).toBeVisible();
    
    // Step 4: Fill enquiry form
    await enquiryForm.locator('input[name="name"]').fill('Company Name');
    await enquiryForm.locator('input[name="email"]').fill('company@example.com');
    await enquiryForm.locator('input[name="phone"]').fill('+1234567890');
    await enquiryForm.locator('input[name="company"]').fill('Test Corp');
    await enquiryForm.locator('select[name="service"]').selectOption('Corporate Training');
    await enquiryForm.locator('input[name="participants"]').fill('25');
    await enquiryForm.locator('input[name="budget"]').fill('$10,000');
    await enquiryForm.locator('textarea[name="needs"]').fill('Java training for our team');
    
    // Step 5: Submit enquiry
    const submitButton = enquiryForm.locator('button[type="submit"]');
    await submitButton.click();
    
    // Step 6: Verify success message
    const successMessage = page.locator('[data-testid="enquiry-success"]');
    await expect(successMessage).toBeVisible();
  });

  test('complete course search and filter journey', async ({ page }) => {
    // Step 1: Visit courses page
    await page.goto('http://localhost:3001/courses');
    
    // Step 2: Use search functionality
    const searchInput = page.locator('input[placeholder*="search" i]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('Java');
      
      // Step 3: Verify search results
      const courseCards = page.locator('[data-testid="course-card"]');
      await expect(courseCards).toHaveCount.greaterThan(0);
    }
    
    // Step 4: Use filter functionality
    const filterButtons = page.locator('[data-testid="filter-button"]');
    if (await filterButtons.count() > 0) {
      await filterButtons.first().click();
      
      // Step 5: Verify filtered results
      const filteredCards = page.locator('[data-testid="course-card"]');
      await expect(filteredCards).toHaveCount.greaterThan(0);
    }
  });

  test('complete mobile navigation journey', async ({ page }) => {
    // Step 1: Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3001');
    
    // Step 2: Open mobile menu
    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
    await mobileMenuButton.click();
    
    // Step 3: Navigate using mobile menu
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
    
    // Step 4: Navigate to courses
    await page.click('a[href="/courses"]');
    await expect(page).toHaveURL(/.*courses/);
    
    // Step 5: Navigate to blogs
    await page.click('a[href="/blogs"]');
    await expect(page).toHaveURL(/.*blogs/);
    
    // Step 6: Navigate to contact
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/.*contact/);
  });

  test('complete accessibility journey with keyboard navigation', async ({ page }) => {
    // Step 1: Visit homepage
    await page.goto('http://localhost:3001');
    
    // Step 2: Navigate using Tab key
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Step 3: Navigate to courses using Enter key
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/.*courses/);
    
    // Step 4: Navigate back using browser back button
    await page.goBack();
    await expect(page).toHaveURL(/.*\/$/);
    
    // Step 5: Navigate to blogs using keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/.*blogs/);
  });

  test('complete error handling journey', async ({ page }) => {
    // Step 1: Visit non-existent page
    await page.goto('http://localhost:3001/non-existent-page');
    
    // Step 2: Verify 404 page
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('a[href="/"]')).toBeVisible();
    
    // Step 3: Navigate back to homepage
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(/.*\/$/);
    
    // Step 4: Test form validation
    await page.goto('http://localhost:3001/contact');
    const contactForm = page.locator('[data-testid="contact-form"]');
    if (await contactForm.isVisible()) {
      // Submit form without filling required fields
      const submitButton = contactForm.locator('button[type="submit"]');
      await submitButton.click();
      
      // Verify validation errors
      const errorMessages = contactForm.locator('[data-testid="error-message"]');
      await expect(errorMessages).toHaveCount.greaterThan(0);
    }
  });
});
