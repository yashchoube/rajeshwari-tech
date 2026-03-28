# 🧪 Comprehensive Testing Guide

## Overview

This guide provides comprehensive testing strategies for the RajeshwariTech website, covering all aspects from UI automation to performance testing and newsletter functionality.

## 🎯 Testing Philosophy

### 1. Test Pyramid Strategy
```
    /\
   /  \     E2E Tests (Few)
  /____\    Integration Tests (Some)
 /      \   Unit Tests (Many)
/________\
```

### 2. Testing Principles
- **Test Early, Test Often**: Tests run on every commit
- **Test in Production-like Environment**: Staging environment mirrors production
- **Test User Journeys**: Focus on real user scenarios
- **Test Edge Cases**: Handle unexpected inputs and conditions
- **Test Performance**: Ensure system can handle expected load

## 🏗️ Test Architecture

### Test Categories

#### 1. UI Tests (Playwright)
- **Purpose**: Test user interface and user interactions
- **Coverage**: All pages, components, and user flows
- **Browsers**: Chrome, Firefox, Safari, Mobile
- **Features**: Screenshots, videos, traces, accessibility

#### 2. API Tests (Jest + Supertest)
- **Purpose**: Test backend API endpoints and database operations
- **Coverage**: All API endpoints, request/response validation
- **Features**: Mock external services, test error handling

#### 3. Newsletter Tests
- **Purpose**: Test email functionality, subscription management
- **Coverage**: Email tracking, subscription workflows, analytics
- **Features**: Email delivery testing, bounce handling, unsubscribe

#### 4. Integration Tests
- **Purpose**: Test complete user journeys and system integration
- **Coverage**: End-to-end workflows, cross-browser compatibility
- **Features**: Real user scenarios, business process validation

#### 5. Performance Tests (k6)
- **Purpose**: Test system performance under load
- **Coverage**: Load testing, stress testing, bottleneck identification
- **Features**: Response time monitoring, throughput testing

#### 6. Security Tests
- **Purpose**: Test security vulnerabilities and attack vectors
- **Coverage**: Authentication, injection attacks, authorization
- **Features**: Penetration testing, vulnerability scanning

## 🚀 Getting Started

### Prerequisites
```bash
# Node.js 18+
node --version

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install k6 (performance testing)
# macOS
brew install k6
# Ubuntu/Debian
sudo apt-get install k6
# Windows
choco install k6
```

### Environment Setup
```bash
# Copy environment variables
cp .env.example .env.test

# Set test environment
export NODE_ENV=test
export NEXT_PUBLIC_API_URL=http://localhost:3001
export DATABASE_URL=file:./test.db
```

## 📋 Test Execution

### Running All Tests
```bash
# Run comprehensive test suite
npm run test:all

# Run specific test categories
npm run test:ui          # UI tests
npm run test:api         # API tests
npm run test:newsletter  # Newsletter tests
npm run test:integration # Integration tests
npm run test:performance # Performance tests
npm run test:security    # Security tests
```

### Test Configuration

#### Playwright Configuration
```javascript
// tests/playwright.config.js
export default defineConfig({
  testDir: './tests/ui',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

#### Jest Configuration
```javascript
// tests/jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/tests/api/**/*.test.js'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 }
  }
};
```

## 🎭 UI Testing

### Page Object Pattern
```javascript
// tests/ui/pages/HomePage.js
class HomePage {
  constructor(page) {
    this.page = page;
    this.navigation = page.locator('nav');
    this.heroSection = page.locator('[data-testid="hero"]');
    this.coursesSection = page.locator('[data-testid="courses"]');
  }

  async navigateToCourses() {
    await this.page.click('a[href="/courses"]');
  }

  async getCourseCount() {
    return await this.coursesSection.locator('[data-testid="course-card"]').count();
  }
}
```

### Component Testing
```javascript
// tests/ui/components/EnrollModal.test.js
test('should open enroll modal', async ({ page }) => {
  await page.goto('/courses');
  await page.click('button:has-text("Enroll Now")');
  
  const modal = page.locator('[data-testid="enroll-modal"]');
  await expect(modal).toBeVisible();
});
```

### Accessibility Testing
```javascript
// tests/ui/accessibility/a11y.test.js
test('should be accessible', async ({ page }) => {
  await page.goto('/');
  
  // Check for accessibility issues
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

## 🔌 API Testing

### Endpoint Testing
```javascript
// tests/api/endpoints/blogs.test.js
test('should create blog post', async () => {
  const blogData = {
    title: 'Test Blog',
    excerpt: 'Test excerpt',
    content: '<p>Test content</p>',
    author: 'Test Author',
    category: 'Technology'
  };

  const response = await request(app)
    .post('/api/blogs')
    .send(blogData)
    .expect(200);

  expect(response.body.success).toBe(true);
  expect(response.body.data.blogId).toBeDefined();
});
```

### Database Testing
```javascript
// tests/api/database/database.test.js
test('should connect to database', async () => {
  const db = new Database('test.db');
  const result = db.prepare('SELECT 1 as test').get();
  expect(result.test).toBe(1);
});
```

### Validation Testing
```javascript
// tests/api/validation/validation.test.js
test('should validate required fields', async () => {
  const invalidData = { title: '', content: '' };
  
  const response = await request(app)
    .post('/api/blogs')
    .send(invalidData)
    .expect(400);

  expect(response.body.error).toContain('validation failed');
});
```

## 📧 Newsletter Testing

### Subscription Testing
```javascript
// tests/newsletter/subscription/newsletter.test.js
test('should subscribe to newsletter', async () => {
  const subscriptionData = {
    email: 'test@example.com',
    name: 'Test Subscriber',
    interests: ['Technology', 'Programming']
  };

  const response = await fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriptionData)
  });

  expect(response.status).toBe(200);
  const result = await response.json();
  expect(result.success).toBe(true);
});
```

### Email Tracking Testing
```javascript
// tests/newsletter/email-tracking/email-tracking.test.js
test('should track email opens', async () => {
  const trackingData = {
    email: 'test@example.com',
    campaign: 'newsletter',
    action: 'open',
    timestamp: new Date().toISOString()
  };

  const response = await fetch('/api/newsletter/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trackingData)
  });

  expect(response.status).toBe(200);
});
```

### Email Delivery Testing
```javascript
// tests/newsletter/email-delivery/email-delivery.test.js
test('should send welcome email', async () => {
  const emailData = {
    to: 'test@example.com',
    subject: 'Welcome to RajeshwariTech',
    template: 'welcome'
  };

  const response = await fetch('/api/newsletter/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emailData)
  });

  expect(response.status).toBe(200);
});
```

## 🔗 Integration Testing

### End-to-End User Journeys
```javascript
// tests/integration/e2e/user-journey.test.js
test('complete enrollment journey', async ({ page }) => {
  // 1. Visit homepage
  await page.goto('/');
  
  // 2. Navigate to courses
  await page.click('a[href="/courses"]');
  
  // 3. Select course
  await page.click('[data-testid="course-card"]:first-child');
  
  // 4. Enroll in course
  await page.click('button:has-text("Enroll Now")');
  
  // 5. Fill enrollment form
  await page.fill('input[name="name"]', 'Test Student');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="phone"]', '+1234567890');
  
  // 6. Submit enrollment
  await page.click('button[type="submit"]');
  
  // 7. Verify success
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

### Cross-Browser Testing
```javascript
// tests/integration/cross-browser/cross-browser.test.js
test('should work across all browsers', async ({ page, browserName }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  
  // Browser-specific assertions
  if (browserName === 'webkit') {
    // Safari-specific tests
  } else if (browserName === 'firefox') {
    // Firefox-specific tests
  }
});
```

## ⚡ Performance Testing

### Load Testing
```javascript
// tests/performance/load/load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.1'],
  },
};

export default function() {
  let response = http.get('http://localhost:3001/');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });
  sleep(1);
}
```

### Stress Testing
```javascript
// tests/performance/stress/stress-test.js
export let options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '2m', target: 50 },
    { duration: '1m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '1m', target: 0 },
  ],
};
```

## 🔒 Security Testing

### Authentication Testing
```javascript
// tests/security/auth/auth.test.js
test('should require authentication for admin endpoints', async () => {
  const response = await fetch('/api/admin/blogs', {
    method: 'GET',
    headers: { 'Authorization': 'Bearer invalid-token' }
  });
  
  expect(response.status).toBe(401);
});
```

### Injection Testing
```javascript
// tests/security/injection/sql-injection.test.js
test('should prevent SQL injection', async () => {
  const maliciousInput = "'; DROP TABLE blogs; --";
  
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: maliciousInput })
  });
  
  expect(response.status).toBe(400);
});
```

### XSS Testing
```javascript
// tests/security/injection/xss.test.js
test('should prevent XSS attacks', async () => {
  const maliciousScript = '<script>alert("XSS")</script>';
  
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: maliciousScript })
  });
  
  expect(response.status).toBe(400);
});
```

## 📊 Test Reporting

### HTML Reports
- **UI Tests**: `test-results/ui-report.html`
- **API Tests**: `test-results/api-report.html`
- **Coverage**: `coverage/index.html`

### JSON Reports
- **Results**: `test-results/results.json`
- **Coverage**: `coverage/coverage-final.json`

### Performance Reports
- **Load Test**: `test-results/load-test-results.html`
- **Metrics**: Response times, throughput, error rates

## 🐛 Debugging Tests

### Debug Mode
```bash
# Debug UI tests
npx playwright test --debug

# Debug API tests
npm run test:api -- --verbose

# Debug with traces
npx playwright test --trace on
```

### Common Issues

#### 1. Port Conflicts
```bash
# Check if port 3001 is available
lsof -i :3001

# Kill process if needed
kill -9 $(lsof -t -i:3001)
```

#### 2. Browser Issues
```bash
# Update Playwright browsers
npx playwright install

# Clear browser cache
npx playwright test --headed
```

#### 3. Database Issues
```bash
# Check database file
ls -la data/rajeshwari-tech.db

# Reset test database
rm data/rajeshwari-tech.db
```

#### 4. Network Issues
```bash
# Test API endpoints
curl http://localhost:3001/api/blogs

# Check server logs
npm run dev
```

## 🎯 Best Practices

### Test Writing
1. **Write descriptive test names**
2. **Use page object pattern for UI tests**
3. **Mock external dependencies**
4. **Clean up test data**
5. **Test edge cases and error conditions**

### Test Maintenance
1. **Regular test updates**
2. **Performance monitoring**
3. **Coverage tracking**
4. **Documentation updates**

### Test Organization
1. **Group related tests**
2. **Use consistent naming**
3. **Separate test data**
4. **Version control test files**

## 📈 Continuous Integration

### GitHub Actions
```yaml
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test:all
```

### Test Parallelization
- **UI Tests**: Parallel browser execution
- **API Tests**: Concurrent request testing
- **Performance**: Distributed load testing

## 🚀 Advanced Features

### AI-Powered Testing
- **Smart test generation**
- **Visual regression detection**
- **Intelligent test selection**
- **Automated test maintenance**

### Test Analytics
- **Test execution trends**
- **Performance baselines**
- **Coverage analysis**
- **Flaky test detection**

### Test Automation
- **Scheduled test runs**
- **Automatic test updates**
- **Smart test selection**
- **Parallel execution**

## 📞 Support

### Documentation
- **Test Guide**: This document
- **API Documentation**: `/docs/api`
- **Component Library**: `/docs/components`

### Getting Help
- **GitHub Issues**: Create issue for bugs
- **Discussions**: Use GitHub discussions
- **Email**: Contact development team
- **Slack**: #testing channel

### Contributing
- **Test Contributions**: Submit PR with tests
- **Bug Reports**: Use GitHub issues
- **Feature Requests**: Use GitHub discussions
- **Documentation**: Submit PR for docs

---

**Happy Testing! 🚀**

*This guide is continuously updated. Please check for the latest version.*
