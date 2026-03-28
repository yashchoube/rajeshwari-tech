#!/usr/bin/env node

/**
 * Local API Testing Script for Rajeshwari Tech
 * Run this to test all your APIs locally
 */

const baseUrl = 'http://localhost:3000';

// Test data
const testData = {
  enrollment: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    courseId: 'core-java-advanced',
    courseName: 'Core Java Advanced',
    experience: 'Beginner',
    goals: 'Learn Java programming',
    referral: 'Google Search'
  },
  demoBooking: {
    name: 'Demo User',
    email: 'demo@example.com',
    phone: '+1234567891',
    course: 'Python Full Stack',
    experience: 'Intermediate',
    preferredTime: 'Morning',
    message: 'Interested in Python course'
  },
  enquiry: {
    name: 'Enquiry User',
    email: 'enquiry@example.com',
    phone: '+1234567892',
    company: 'Test Company',
    service: 'Corporate Training',
    message: 'Interested in corporate training'
  },
  newsletter: {
    email: 'newsletter@example.com',
    name: 'Newsletter User',
    interests: '["Programming", "Web Development"]'
  }
};

// Helper function to make API calls
async function testAPI(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(`${baseUrl}${endpoint}`, options);
    const result = await response.json();
    
    return {
      success: response.ok,
      status: response.status,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Test functions
async function testBlogsAPI() {
  console.log('\n📝 Testing Blogs API...');
  
  // Test get all blogs
  const blogsResult = await testAPI('/api/blogs');
  console.log('✅ GET /api/blogs:', blogsResult.success ? 'PASS' : 'FAIL');
  
  // Test get blog by slug (if blogs exist)
  if (blogsResult.success && blogsResult.data.blogs && blogsResult.data.blogs.length > 0) {
    const firstBlog = blogsResult.data.blogs[0];
    const blogResult = await testAPI(`/api/blogs/${firstBlog.slug}`);
    console.log('✅ GET /api/blogs/[slug]:', blogResult.success ? 'PASS' : 'FAIL');
  }
}

async function testEnrollmentAPI() {
  console.log('\n🎓 Testing Enrollment API...');
  
  const result = await testAPI('/api/enrollment', 'POST', testData.enrollment);
  console.log('✅ POST /api/enrollment:', result.success ? 'PASS' : 'FAIL');
  if (!result.success) {
    console.log('   Error:', result.error || result.data);
  }
}

async function testDemoBookingAPI() {
  console.log('\n📅 Testing Demo Booking API...');
  
  const result = await testAPI('/api/demo-booking', 'POST', testData.demoBooking);
  console.log('✅ POST /api/demo-booking:', result.success ? 'PASS' : 'FAIL');
  if (!result.success) {
    console.log('   Error:', result.error || result.data);
  }
}

async function testEnquiryAPI() {
  console.log('\n📧 Testing Enquiry API...');
  
  const result = await testAPI('/api/enquiry', 'POST', testData.enquiry);
  console.log('✅ POST /api/enquiry:', result.success ? 'PASS' : 'FAIL');
  if (!result.success) {
    console.log('   Error:', result.error || result.data);
  }
}

async function testNewsletterAPI() {
  console.log('\n📰 Testing Newsletter API...');
  
  const result = await testAPI('/api/newsletter/subscribe', 'POST', testData.newsletter);
  console.log('✅ POST /api/newsletter/subscribe:', result.success ? 'PASS' : 'FAIL');
  if (!result.success) {
    console.log('   Error:', result.error || result.data);
  }
}

async function testAnalyticsAPI() {
  console.log('\n📊 Testing Analytics API...');
  
  const result = await testAPI('/api/analytics/track', 'POST', {
    page: '/test',
    referrer: 'test'
  });
  console.log('✅ POST /api/analytics/track:', result.success ? 'PASS' : 'FAIL');
  if (!result.success) {
    console.log('   Error:', result.error || result.data);
  }
}

async function testUtilityAPIs() {
  console.log('\n🔧 Testing Utility APIs...');
  
  // Test syllabus download
  const syllabusResult = await testAPI('/api/download-syllabus?courseId=core-java-advanced');
  console.log('✅ GET /api/download-syllabus:', syllabusResult.success ? 'PASS' : 'FAIL');
  
  // Test cache clear
  const cacheResult = await testAPI('/api/clear-cache', 'POST');
  console.log('✅ POST /api/clear-cache:', cacheResult.success ? 'PASS' : 'FAIL');
}

async function testDatabaseConnection() {
  console.log('\n🗄️ Testing Database Connection...');
  
  const result = await testAPI('/api/setup-database', 'POST');
  console.log('✅ POST /api/setup-database:', result.success ? 'PASS' : 'FAIL');
  if (result.success) {
    console.log('   Database tables created successfully!');
  } else {
    console.log('   Error:', result.error || result.data);
  }
}

// Main test function
async function runAllTests() {
  console.log('🚀 Starting Local API Tests for Rajeshwari Tech');
  console.log('=' .repeat(50));
  
  // Test database connection first
  await testDatabaseConnection();
  
  // Test all APIs
  await testBlogsAPI();
  await testEnrollmentAPI();
  await testDemoBookingAPI();
  await testEnquiryAPI();
  await testNewsletterAPI();
  await testAnalyticsAPI();
  await testUtilityAPIs();
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ All tests completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Check your browser at http://localhost:3000');
  console.log('2. Test the contact form');
  console.log('3. Test course enrollment');
  console.log('4. Test blog functionality');
  console.log('5. Check admin panel at http://localhost:3000/admin');
}

// Run tests
runAllTests().catch(console.error);
