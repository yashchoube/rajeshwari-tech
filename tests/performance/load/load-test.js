import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests must complete below 2s
    http_req_failed: ['rate<0.1'],     // Error rate must be below 10%
  },
};

const BASE_URL = 'http://localhost:3001';

export default function() {
  // Test homepage
  let response = http.get(`${BASE_URL}/`);
  check(response, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage response time < 2s': (r) => r.timings.duration < 2000,
  });
  sleep(1);

  // Test courses page
  response = http.get(`${BASE_URL}/courses`);
  check(response, {
    'courses page status is 200': (r) => r.status === 200,
    'courses page response time < 2s': (r) => r.timings.duration < 2000,
  });
  sleep(1);

  // Test blogs page
  response = http.get(`${BASE_URL}/blogs`);
  check(response, {
    'blogs page status is 200': (r) => r.status === 200,
    'blogs page response time < 2s': (r) => r.timings.duration < 2000,
  });
  sleep(1);

  // Test API endpoints
  response = http.get(`${BASE_URL}/api/blogs`);
  check(response, {
    'blogs API status is 200': (r) => r.status === 200,
    'blogs API response time < 1s': (r) => r.timings.duration < 1000,
  });
  sleep(1);

  // Test course enrollment API
  let enrollmentData = {
    name: `Load Test User ${__VU}`,
    email: `loadtest${__VU}@example.com`,
    phone: '+1234567890',
    courseId: 'test-course',
    courseName: 'Test Course',
    experience: 'beginner',
    goals: 'Load testing',
    referral: 'Load Test'
  };

  response = http.post(`${BASE_URL}/api/enrollment`, JSON.stringify(enrollmentData), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(response, {
    'enrollment API status is 200': (r) => r.status === 200,
    'enrollment API response time < 1s': (r) => r.timings.duration < 1000,
  });
  sleep(1);

  // Test newsletter subscription API
  let subscriptionData = {
    email: `newsletter${__VU}@example.com`,
    name: `Newsletter Subscriber ${__VU}`,
    interests: ['Technology', 'Programming']
  };

  response = http.post(`${BASE_URL}/api/newsletter/subscribe`, JSON.stringify(subscriptionData), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(response, {
    'newsletter API status is 200': (r) => r.status === 200,
    'newsletter API response time < 1s': (r) => r.timings.duration < 1000,
  });
  sleep(1);

  // Test analytics tracking
  let analyticsData = {
    page: '/load-test',
    referrer: 'https://k6.io',
    userAgent: 'k6-load-test',
    timestamp: new Date().toISOString()
  };

  response = http.post(`${BASE_URL}/api/analytics/track`, JSON.stringify(analyticsData), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(response, {
    'analytics API status is 200': (r) => r.status === 200,
    'analytics API response time < 1s': (r) => r.timings.duration < 1000,
  });
  sleep(1);

  // Test enquiry API
  let enquiryData = {
    name: `Enquiry User ${__VU}`,
    email: `enquiry${__VU}@example.com`,
    phone: '+1234567890',
    company: `Test Company ${__VU}`,
    service: 'Corporate Training',
    participants: '25',
    duration: '3 months',
    budget: '$10,000',
    timeline: 'Q1 2024',
    needs: 'Load testing enquiry'
  };

  response = http.post(`${BASE_URL}/api/enquiry`, JSON.stringify(enquiryData), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(response, {
    'enquiry API status is 200': (r) => r.status === 200,
    'enquiry API response time < 1s': (r) => r.timings.duration < 1000,
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
    'load-test-results.json': JSON.stringify(data, null, 2),
    'load-test-results.html': htmlReport(data),
  };
}

function htmlReport(data) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Load Test Results</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .metric { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
          .success { background: #d4edda; }
          .warning { background: #fff3cd; }
          .error { background: #f8d7da; }
        </style>
      </head>
      <body>
        <h1>Load Test Results</h1>
        <div class="metric">
          <h3>Test Duration</h3>
          <p>${data.state.testRunDurationMs / 1000}s</p>
        </div>
        <div class="metric">
          <h3>Total Requests</h3>
          <p>${data.metrics.http_reqs.values.count}</p>
        </div>
        <div class="metric">
          <h3>Request Rate</h3>
          <p>${data.metrics.http_req_rate.values.rate.toFixed(2)} requests/second</p>
        </div>
        <div class="metric">
          <h3>Average Response Time</h3>
          <p>${data.metrics.http_req_duration.values.avg.toFixed(2)}ms</p>
        </div>
        <div class="metric">
          <h3>95th Percentile Response Time</h3>
          <p>${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms</p>
        </div>
        <div class="metric">
          <h3>Error Rate</h3>
          <p>${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%</p>
        </div>
      </body>
    </html>
  `;
}
