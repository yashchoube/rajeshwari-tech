const https = require('https');
const http = require('http');

// Test configuration
const BASE_URL = 'https://rajeshwari-tech.vercel.app';
const API_ENDPOINT = `${BASE_URL}/api/enrollment`;

console.log('🧪 RajeshwariTech Enrollment API Debug Test');
console.log('==========================================');

// Test data
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '1234567890',
  courseId: 'core-java-advanced',
  courseName: 'Core Java with Advanced Concepts',
  experience: 'Advanced',
  goals: 'Learn advanced Java concepts and prepare for technical interviews',
  referral: 'Website'
};

// Function to make HTTP request
function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': BASE_URL,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        ...options.headers
      }
    };
    
    const req = client.request(requestOptions, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          body: body
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test 1: Check if website is accessible
async function testWebsiteAccess() {
  console.log('\n📍 Test 1: Website Accessibility');
  console.log('--------------------------------');
  
  try {
    const response = await makeRequest(BASE_URL);
    console.log(`✅ Website Status: ${response.statusCode} ${response.statusMessage}`);
    
    if (response.statusCode === 200) {
      console.log('✅ Website is accessible');
      return true;
    } else {
      console.log(`❌ Website returned ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Website access failed: ${error.message}`);
    return false;
  }
}

// Test 2: Test enrollment API
async function testEnrollmentAPI() {
  console.log('\n📍 Test 2: Enrollment API Test');
  console.log('--------------------------------');
  
  try {
    console.log('📤 Sending enrollment request...');
    console.log('Request Data:', JSON.stringify(testData, null, 2));
    
    const response = await makeRequest(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, testData);
    
    console.log(`📡 Response Status: ${response.statusCode} ${response.statusMessage}`);
    console.log('📡 Response Headers:', JSON.stringify(response.headers, null, 2));
    console.log('📡 Response Body:', response.body);
    
    if (response.statusCode === 200) {
      console.log('✅ Enrollment API working correctly');
      return true;
    } else if (response.statusCode === 500) {
      console.log('❌ 500 Internal Server Error - Backend issue');
      console.log('🔍 Error details:', response.body);
      return false;
    } else {
      console.log(`❌ API returned ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Enrollment API failed: ${error.message}`);
    return false;
  }
}

// Test 3: Test other API endpoints
async function testOtherAPIs() {
  console.log('\n📍 Test 3: Other API Endpoints');
  console.log('--------------------------------');
  
  const endpoints = [
    '/api/blogs',
    '/api/demo-booking',
    '/api/newsletter/subscribe'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`🔍 Testing ${endpoint}...`);
      const response = await makeRequest(`${BASE_URL}${endpoint}`);
      console.log(`  Status: ${response.statusCode} ${response.statusMessage}`);
      
      if (response.statusCode === 200) {
        console.log(`  ✅ ${endpoint} working`);
      } else {
        console.log(`  ❌ ${endpoint} returned ${response.statusCode}`);
      }
    } catch (error) {
      console.log(`  ❌ ${endpoint} failed: ${error.message}`);
    }
  }
}

// Test 4: Check environment variables
async function testEnvironmentConfig() {
  console.log('\n📍 Test 4: Environment Configuration');
  console.log('------------------------------------');
  
  try {
    // Try to access admin endpoints to check if database is configured
    const response = await makeRequest(`${BASE_URL}/api/blogs?scope=admin`);
    console.log(`📊 Admin API Status: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log(`📊 Blogs count: ${data.blogs?.length || 0}`);
      console.log('✅ Database connection working');
    } else {
      console.log('❌ Database connection issue');
    }
  } catch (error) {
    console.log(`❌ Environment check failed: ${error.message}`);
  }
}

// Test 5: Detailed error analysis
async function analyzeError() {
  console.log('\n📍 Test 5: Error Analysis');
  console.log('------------------------');
  
  try {
    const response = await makeRequest(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, testData);
    
    console.log('🔍 Detailed Error Analysis:');
    console.log(`Status: ${response.statusCode}`);
    console.log(`Headers: ${JSON.stringify(response.headers, null, 2)}`);
    console.log(`Body: ${response.body}`);
    
    // Check for specific error patterns
    if (response.body.includes('database')) {
      console.log('❌ Database connection error detected');
    }
    if (response.body.includes('environment')) {
      console.log('❌ Environment variable error detected');
    }
    if (response.body.includes('validation')) {
      console.log('❌ Validation error detected');
    }
    if (response.body.includes('rate limit')) {
      console.log('❌ Rate limiting error detected');
    }
    
  } catch (error) {
    console.log(`❌ Error analysis failed: ${error.message}`);
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting comprehensive enrollment test...\n');
  
  const results = {
    websiteAccess: false,
    enrollmentAPI: false,
    otherAPIs: false,
    environment: false
  };
  
  // Run all tests
  results.websiteAccess = await testWebsiteAccess();
  results.enrollmentAPI = await testEnrollmentAPI();
  await testOtherAPIs();
  await testEnvironmentConfig();
  await analyzeError();
  
  // Summary
  console.log('\n📊 Test Summary');
  console.log('================');
  console.log(`Website Access: ${results.websiteAccess ? '✅' : '❌'}`);
  console.log(`Enrollment API: ${results.enrollmentAPI ? '✅' : '❌'}`);
  
  if (!results.enrollmentAPI) {
    console.log('\n🔧 Recommended Fixes:');
    console.log('1. Check database connection in Vercel');
    console.log('2. Verify environment variables are set');
    console.log('3. Check Vercel function logs for errors');
    console.log('4. Ensure database tables are created');
  }
  
  console.log('\n🏁 Test completed!');
}

// Run the tests
runAllTests().catch(console.error);
