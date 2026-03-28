const https = require('https');

console.log('🔍 RajeshwariTech Enrollment Debug');
console.log('==================================');

const BASE_URL = 'https://rajeshwari-tech.vercel.app';
const API_ENDPOINT = `${BASE_URL}/api/enrollment`;

// Test data
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '1234567890',
  courseId: 'core-java-advanced',
  courseName: 'Core Java with Advanced Concepts',
  experience: 'Advanced',
  goals: 'Learn advanced Java concepts',
  referral: 'Website'
};

function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Origin': BASE_URL,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function testEnrollment() {
  try {
    console.log('📤 Testing enrollment API...');
    console.log('Request data:', JSON.stringify(testData, null, 2));
    
    const response = await makeRequest(API_ENDPOINT, testData);
    
    console.log('\n📡 Response:');
    console.log(`Status: ${response.status}`);
    console.log(`Headers:`, JSON.stringify(response.headers, null, 2));
    console.log(`Body:`, response.body);
    
    if (response.status === 500) {
      console.log('\n❌ 500 Error Analysis:');
      
      // Check for common error patterns
      if (response.body.includes('database')) {
        console.log('🔍 Issue: Database connection problem');
      }
      if (response.body.includes('environment')) {
        console.log('🔍 Issue: Environment variables missing');
      }
      if (response.body.includes('validation')) {
        console.log('🔍 Issue: Input validation error');
      }
      if (response.body.includes('rate limit')) {
        console.log('🔍 Issue: Rate limiting');
      }
      
      console.log('\n🔧 Possible Solutions:');
      console.log('1. Check Vercel environment variables');
      console.log('2. Verify database connection');
      console.log('3. Check Vercel function logs');
      console.log('4. Ensure database tables exist');
    } else if (response.status === 200) {
      console.log('\n✅ API working correctly!');
    }
    
  } catch (error) {
    console.log(`❌ Test failed: ${error.message}`);
  }
}

// Run the test
testEnrollment();
