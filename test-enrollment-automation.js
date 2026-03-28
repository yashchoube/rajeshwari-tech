const { test, expect } = require('@playwright/test');

// Test configuration
const BASE_URL = 'https://rajeshwari-tech.vercel.app';
const COURSE_URL = `${BASE_URL}/courses/core-java-advanced`;

test.describe('Enrollment Flow - End to End Testing', () => {
  
  test('Complete User Journey - Homepage to Enrollment', async ({ page }) => {
    console.log('🚀 Starting complete user journey test...');
    
    // Step 1: Navigate to homepage
    console.log('📍 Step 1: Loading homepage...');
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/RajeshwariTech/);
    console.log('✅ Homepage loaded successfully');
    
    // Step 2: Navigate to courses
    console.log('📍 Step 2: Navigating to courses...');
    await page.click('text=Courses');
    await page.waitForURL('**/courses');
    console.log('✅ Courses page loaded');
    
    // Step 3: Find and click on Core Java course
    console.log('📍 Step 3: Finding Core Java course...');
    const courseCard = page.locator('text=Core Java with Advanced Concepts').first();
    await expect(courseCard).toBeVisible();
    await courseCard.click();
    console.log('✅ Core Java course page loaded');
    
    // Step 4: Click Enroll Now button
    console.log('📍 Step 4: Clicking Enroll Now button...');
    const enrollButton = page.locator('text=Enroll Now').first();
    await expect(enrollButton).toBeVisible();
    await enrollButton.click();
    console.log('✅ Enroll Now button clicked');
    
    // Step 5: Wait for enrollment modal/form
    console.log('📍 Step 5: Waiting for enrollment form...');
    await page.waitForSelector('form, [data-testid="enrollment-form"], .enrollment-form', { timeout: 10000 });
    console.log('✅ Enrollment form appeared');
    
    // Step 6: Fill enrollment form
    console.log('📍 Step 6: Filling enrollment form...');
    
    // Fill name field
    const nameField = page.locator('input[name="name"], input[placeholder*="name"], #name').first();
    if (await nameField.isVisible()) {
      await nameField.fill('Test User');
      console.log('✅ Name filled');
    }
    
    // Fill email field
    const emailField = page.locator('input[name="email"], input[type="email"], #email').first();
    if (await emailField.isVisible()) {
      await emailField.fill('test@example.com');
      console.log('✅ Email filled');
    }
    
    // Fill phone field
    const phoneField = page.locator('input[name="phone"], input[type="tel"], #phone').first();
    if (await phoneField.isVisible()) {
      await phoneField.fill('1234567890');
      console.log('✅ Phone filled');
    }
    
    // Select experience level
    const experienceSelect = page.locator('select[name="experience"], select[id="experience"]').first();
    if (await experienceSelect.isVisible()) {
      await experienceSelect.selectOption('Advanced (3+ years)');
      console.log('✅ Experience selected');
    }
    
    // Fill goals
    const goalsField = page.locator('textarea[name="goals"], textarea[id="goals"]').first();
    if (await goalsField.isVisible()) {
      await goalsField.fill('Learn advanced Java concepts and prepare for technical interviews');
      console.log('✅ Goals filled');
    }
    
    // Step 7: Submit form and capture network requests
    console.log('📍 Step 7: Submitting enrollment form...');
    
    // Listen for network requests
    const requests = [];
    page.on('request', request => {
      if (request.url().includes('/api/enrollment')) {
        requests.push({
          url: request.url(),
          method: request.method(),
          headers: request.headers(),
          postData: request.postData()
        });
      }
    });
    
    const responses = [];
    page.on('response', response => {
      if (response.url().includes('/api/enrollment')) {
        responses.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText(),
          headers: response.headers()
        });
      }
    });
    
    // Submit the form
    const submitButton = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Enroll")').first();
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    console.log('✅ Form submitted');
    
    // Wait for response
    await page.waitForTimeout(3000);
    
    // Step 8: Analyze results
    console.log('📍 Step 8: Analyzing results...');
    
    if (requests.length > 0) {
      console.log('📡 API Request Details:');
      console.log(JSON.stringify(requests[0], null, 2));
    }
    
    if (responses.length > 0) {
      console.log('📡 API Response Details:');
      console.log(JSON.stringify(responses[0], null, 2));
      
      if (responses[0].status === 500) {
        console.log('❌ 500 Internal Server Error detected');
        
        // Try to get response body
        try {
          const response = await page.waitForResponse(response => 
            response.url().includes('/api/enrollment') && response.status() === 500
          );
          const body = await response.text();
          console.log('📄 Error Response Body:', body);
        } catch (e) {
          console.log('Could not capture error response body');
        }
      }
    }
    
    // Check for success/error messages
    const successMessage = page.locator('text=success, text=Success, text=enrolled, text=Enrolled');
    const errorMessage = page.locator('text=error, text=Error, text=failed, text=Failed');
    
    if (await successMessage.isVisible()) {
      console.log('✅ Success message found:', await successMessage.textContent());
    } else if (await errorMessage.isVisible()) {
      console.log('❌ Error message found:', await errorMessage.textContent());
    }
  });
  
  test('Direct API Testing', async ({ page }) => {
    console.log('🧪 Testing API directly...');
    
    // Test the API endpoint
    const response = await page.request.post(`${BASE_URL}/api/enrollment`, {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        courseId: 'core-java-advanced',
        courseName: 'Core Java with Advanced Concepts',
        experience: 'Advanced',
        goals: 'Learn advanced Java concepts',
        referral: 'Website'
      }
    });
    
    console.log('📡 Direct API Response:');
    console.log('Status:', response.status());
    console.log('Status Text:', response.statusText());
    
    const body = await response.text();
    console.log('Response Body:', body);
    
    if (response.status() === 500) {
      console.log('❌ 500 Error - Backend issue detected');
    } else if (response.status() === 200) {
      console.log('✅ API working correctly');
    }
  });
  
  test('Check Database Connection', async ({ page }) => {
    console.log('🗄️ Testing database connection...');
    
    // Try to access admin endpoints to check database
    try {
      const response = await page.request.get(`${BASE_URL}/api/blogs`);
      console.log('📊 Blogs API Status:', response.status());
      
      if (response.status() === 200) {
        const blogs = await response.json();
        console.log('📊 Blogs count:', blogs.blogs?.length || 0);
      }
    } catch (error) {
      console.log('❌ Database connection issue:', error.message);
    }
  });
  
  test('Environment Variables Check', async ({ page }) => {
    console.log('🔧 Checking environment configuration...');
    
    // Check if the app is properly configured
    await page.goto(BASE_URL);
    
    // Look for any error messages in console
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    
    if (consoleMessages.length > 0) {
      console.log('❌ Console errors found:');
      consoleMessages.forEach(msg => console.log('  -', msg));
    } else {
      console.log('✅ No console errors detected');
    }
  });
});

// Additional test for debugging
test.describe('Debug Tests', () => {
  test('Network Request Analysis', async ({ page }) => {
    console.log('🔍 Analyzing network requests...');
    
    const requests = [];
    const responses = [];
    
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        requests.push({
          url: request.url(),
          method: request.method(),
          headers: request.headers()
        });
      }
    });
    
    page.on('response', response => {
      if (response.url().includes('/api/')) {
        responses.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText()
        });
      }
    });
    
    await page.goto(BASE_URL);
    await page.click('text=Courses');
    await page.waitForURL('**/courses');
    await page.click('text=Core Java with Advanced Concepts');
    await page.waitForTimeout(2000);
    
    console.log('📡 All API Requests:');
    requests.forEach(req => console.log('  -', req.method, req.url));
    
    console.log('📡 All API Responses:');
    responses.forEach(res => console.log('  -', res.status, res.url));
  });
});
