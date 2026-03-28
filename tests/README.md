# RajeshwariTech Testing Suite

Comprehensive testing suite for the RajeshwariTech website with modern AI-powered testing tools and frameworks.

## 🏗️ Test Structure

```
tests/
├── ui/                          # Web UI Automation Tests
│   ├── pages/                   # Page-specific tests
│   │   ├── homepage.test.js
│   │   ├── courses.test.js
│   │   └── blogs.test.js
│   ├── components/              # Component tests
│   │   ├── enroll-modal.test.js
│   │   ├── navigation.test.js
│   │   └── forms.test.js
│   └── user-flows/              # User journey tests
│       ├── registration.test.js
│       ├── enrollment.test.js
│       └── newsletter.test.js
├── api/                         # API & Backend Tests
│   ├── endpoints/               # API endpoint tests
│   │   ├── blogs.test.js
│   │   ├── enrollment.test.js
│   │   ├── enquiry.test.js
│   │   └── analytics.test.js
│   ├── database/                # Database tests
│   │   ├── connection.test.js
│   │   ├── queries.test.js
│   │   └── migrations.test.js
│   └── validation/              # Validation tests
│       ├── input-validation.test.js
│       ├── data-integrity.test.js
│       └── security.test.js
├── newsletter/                  # Newsletter Testing
│   ├── subscription/            # Subscription tests
│   │   ├── newsletter.test.js
│   │   ├── validation.test.js
│   │   └── duplicate.test.js
│   ├── email-tracking/          # Email tracking tests
│   │   ├── email-tracking.test.js
│   │   ├── open-tracking.test.js
│   │   ├── click-tracking.test.js
│   │   └── unsubscribe.test.js
│   └── unsubscribe/             # Unsubscribe tests
│       ├── unsubscribe.test.js
│       ├── bounce-handling.test.js
│       └── spam-reports.test.js
├── integration/                 # Integration Tests
│   ├── e2e/                     # End-to-end tests
│   │   ├── user-journey.test.js
│   │   ├── complete-flow.test.js
│   │   └── cross-browser.test.js
│   └── workflows/               # Workflow tests
│       ├── blog-workflow.test.js
│       ├── enrollment-workflow.test.js
│       └── newsletter-workflow.test.js
├── performance/                 # Performance Tests
│   ├── load/                    # Load testing
│   │   ├── load-test.js
│   │   ├── stress-test.js
│   │   └── spike-test.js
│   └── stress/                  # Stress testing
│       ├── memory-test.js
│       ├── cpu-test.js
│       └── database-test.js
└── security/                    # Security Tests
    ├── auth/                    # Authentication tests
    │   ├── login.test.js
    │   ├── session.test.js
    │   └── permissions.test.js
    └── injection/               # Injection tests
        ├── sql-injection.test.js
        ├── xss.test.js
        └── csrf.test.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Chrome/Firefox/Safari browsers
- k6 (for performance testing)

### Installation
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install k6 (for performance testing)
# macOS
brew install k6
# Ubuntu/Debian
sudo apt-get install k6
# Windows
choco install k6
```

### Running Tests

#### All Tests
```bash
npm run test:all
```

#### UI Tests (Playwright)
```bash
npm run test:ui
```

#### API Tests (Jest)
```bash
npm run test:api
```

#### Newsletter Tests
```bash
npm run test:newsletter
```

#### Integration Tests
```bash
npm run test:integration
```

#### Performance Tests
```bash
npm run test:performance
```

#### Security Tests
```bash
npm run test:security
```

## 🧪 Test Categories

### 1. Web UI Automation Tests
- **Framework**: Playwright
- **Coverage**: All pages, components, and user interactions
- **Browsers**: Chrome, Firefox, Safari, Mobile
- **Features**: Screenshots, videos, traces, accessibility

### 2. API & Backend Tests
- **Framework**: Jest + Supertest
- **Coverage**: All API endpoints, database operations
- **Features**: Request/response validation, error handling

### 3. Newsletter Testing
- **Email Tracking**: Open rates, click rates, conversions
- **Subscription Management**: Signup, unsubscribe, bounce handling
- **Analytics**: Campaign performance, user engagement

### 4. Integration Tests
- **End-to-End**: Complete user journeys
- **Cross-Browser**: Multi-browser compatibility
- **Workflow**: Business process validation

### 5. Performance Tests
- **Load Testing**: k6-based load testing
- **Stress Testing**: System limits and breaking points
- **Monitoring**: Response times, throughput, resource usage

### 6. Security Tests
- **Authentication**: Login, session management
- **Injection**: SQL injection, XSS, CSRF protection
- **Authorization**: Permission and access control

## 📊 Test Reports

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

## 🔧 Configuration

### Environment Variables
```bash
# Test environment
NODE_ENV=test
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=file:./test.db

# Email testing
MAILOSAUR_API_KEY=your-api-key
MAILOSAUR_SERVER_ID=your-server-id
```

### Test Data
- **Fixtures**: `tests/fixtures/`
- **Mock Data**: `tests/mocks/`
- **Test Database**: `test.db`

## 🤖 AI-Powered Testing Features

### 1. Intelligent Test Generation
- Auto-generate tests from user stories
- Smart test case creation
- Coverage gap analysis

### 2. Visual Testing
- Screenshot comparison
- Layout regression detection
- Cross-browser visual validation

### 3. Accessibility Testing
- WCAG compliance checking
- Screen reader compatibility
- Keyboard navigation testing

### 4. Performance Monitoring
- Real-time performance metrics
- Bottleneck identification
- Optimization recommendations

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

## 🐛 Debugging

### Test Debugging
```bash
# Debug specific test
npm run test:ui -- --debug

# Run tests in headed mode
npm run test:ui -- --headed

# Generate test traces
npm run test:ui -- --trace on
```

### Common Issues
1. **Port Conflicts**: Ensure port 3001 is available
2. **Browser Issues**: Update Playwright browsers
3. **Database**: Check test database permissions
4. **Network**: Verify API endpoints are accessible

## 📚 Best Practices

### Test Writing
- Write descriptive test names
- Use page object pattern for UI tests
- Mock external dependencies
- Clean up test data

### Maintenance
- Regular test updates
- Performance monitoring
- Coverage tracking
- Documentation updates

### Reporting
- Generate comprehensive reports
- Track test trends
- Monitor flaky tests
- Performance baselines

## 🎯 Coverage Goals

- **UI Tests**: 90%+ page coverage
- **API Tests**: 100% endpoint coverage
- **Newsletter**: 100% feature coverage
- **Integration**: 100% user journey coverage
- **Performance**: All critical paths tested
- **Security**: All attack vectors covered

## 📞 Support

For questions or issues:
- **Documentation**: Check this README
- **Issues**: Create GitHub issue
- **Discussions**: Use GitHub discussions
- **Email**: Contact development team

---

**Happy Testing! 🚀**
# Install dependencies
npm install

# Run all tests
npm run test:all

# Run specific test categories
npm run test:ui          # UI tests
npm run test:api         # API tests
npm run test:newsletter  # Newsletter tests
npm run test:integration # Integration tests
npm run test:performance # Performance tests
npm run test:security    # Security tests