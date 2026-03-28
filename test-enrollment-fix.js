const https = require('https');

console.log('🧪 Testing Enrollment Fix - 200 requests/minute');
console.log('================================================');

const BASE_URL = 'https://rajeshwari-tech.vercel.app';
const API_ENDPOINT = `${BASE_URL}/api/enrollment`;

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
        'Origin': BASE_URL
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
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
    
    const response = await makeRequest(API_ENDPOINT, testData);
    
    console.log(`📡 Status: ${response.status}`);
    console.log(`📡 Response: ${response.body}`);
    
    if (response.status === 200) {
      console.log('✅ SUCCESS! Enrollment API is working');
    } else if (response.status === 429) {
      console.log('❌ Still rate limited - need to deploy fix');
    } else {
      console.log(`❌ Error: ${response.status}`);
    }
    
  } catch (error) {
    console.log(`❌ Test failed: ${error.message}`);
  }
}

testEnrollment();
